import { useEffect, useRef, useCallback, useState } from "react";
import * as d3 from "d3";
import type { TreeNode, FamilyMember, FamilyData } from "@/types/family";
import { getRootMembers } from "@/data/lineage";
import { GENERATION_LEGEND, generationColor } from "@/data/colors";

interface FamilyTreeProps {
  data: FamilyData;
  onSelectMember: (member: FamilyMember) => void;
  selectedId?: string;
  searchQuery: string;
}

const NODE_WIDTH = 120;
const NODE_HEIGHT = 80;
const GAP_X = 50;
const GAP_Y = 170;

function buildTree(members: FamilyMember[]): TreeNode[] {
  const map = new Map<string, TreeNode>();
  members.forEach((m) => {
    map.set(m.id, { ...m, children: [], spouse: null });
  });

  // Spouse links
  members.forEach((m) => {
    if (m.spouseId && map.has(m.spouseId)) {
      map.get(m.id)!.spouse = map.get(m.spouseId)!;
    }
  });

  // Parent-child links
  members.forEach((m) => {
    if (m.parentId && map.has(m.parentId)) {
      const parent = map.get(m.parentId)!;
      if (!parent.children.find((c) => c.id === m.id)) {
        parent.children.push(map.get(m.id)!);
      }
    }
  });

  return getRootMembers(members).map((m) => map.get(m.id)!);
}

// Custom tree layout that positions nodes by generation (y) and packs horizontally (x)
function layoutTree(roots: TreeNode[]): { nodes: TreeNode[]; links: { source: TreeNode; target: TreeNode; type: "parent" | "spouse" }[]; width: number; height: number } {
  const nodes: TreeNode[] = [];
  const links: { source: TreeNode; target: TreeNode; type: "parent" | "spouse" }[] = [];

  // Assign generation levels
  const maxGenNodeWidths: Record<number, number> = {};

  // First, traverse and collect nodes with their generation
  function traverse(node: TreeNode, isSpouse = false) {
    if (!node) return;
    if (!isSpouse) {
      nodes.push(node);
      if (node.spouse) {
        nodes.push(node.spouse);
        links.push({ source: node, target: node.spouse, type: "spouse" });
      }
    }

    // Count width for this generation
    const coupleWidth = node.spouse ? NODE_WIDTH * 2 + 40 : NODE_WIDTH;
    maxGenNodeWidths[node.generation] = (maxGenNodeWidths[node.generation] || 0) + coupleWidth + GAP_X;

    node.children.forEach((child) => {
      links.push({ source: node, target: child, type: "parent" });
      traverse(child);
    });
  }

  roots.forEach((r) => traverse(r));

  // Group nodes by generation
  const byGeneration: Record<number, TreeNode[]> = {};
  nodes.forEach((n) => {
    if (!byGeneration[n.generation]) byGeneration[n.generation] = [];
    byGeneration[n.generation].push(n);
  });

  // Position nodes: x is horizontal, y is vertical by generation
  const generations = Object.keys(byGeneration).map(Number).sort((a, b) => a - b);

  // We need to compute x positions in a way that subtrees don't overlap.
  // Use a recursive subtree-width approach.
  function subtreeWidth(node: TreeNode): number {
    if (!node.children || node.children.length === 0) {
      return node.spouse ? NODE_WIDTH * 2 + 40 : NODE_WIDTH;
    }
    let childrenWidth = 0;
    node.children.forEach((c, i) => {
      childrenWidth += subtreeWidth(c);
      if (i < node.children.length - 1) childrenWidth += GAP_X;
    });
    const selfWidth = node.spouse ? NODE_WIDTH * 2 + 40 : NODE_WIDTH;
    return Math.max(selfWidth, childrenWidth);
  }

  function assignX(node: TreeNode, startX: number, gen: number): number {
    const sw = subtreeWidth(node);
    const selfWidth = node.spouse ? NODE_WIDTH * 2 + 40 : NODE_WIDTH;

    if (!node.children || node.children.length === 0) {
      node._x = startX + selfWidth / 2;
      if (node.spouse) {
        node.spouse._x = startX + selfWidth - NODE_WIDTH / 2;
      }
      return sw;
    }

    // Position children
    let childrenTotal = 0;
    node.children.forEach((c, i) => {
      childrenTotal += subtreeWidth(c);
      if (i < node.children.length - 1) childrenTotal += GAP_X;
    });

    let childX = startX + (sw - childrenTotal) / 2;
    node.children.forEach((c) => {
      const cw = subtreeWidth(c);
      assignX(c, childX, gen + 1);
      childX += cw + GAP_X;
    });

    // Position self centered above children
    const childrenCenterX = node.children[0]._x! + (node.children[node.children.length - 1]._x! - node.children[0]._x!) / 2;

    if (node.spouse) {
      const leftX = childrenCenterX - 20 - NODE_WIDTH / 2; // blood parent on left
      const rightX = childrenCenterX + 20 + NODE_WIDTH / 2; // spouse on right
      // Determine which is blood parent (the one with parentId chain)
      // Blood parent is the node itself (has children attached); spouse is the other
      node._x = leftX;
      node.spouse._x = rightX;
    } else {
      node._x = childrenCenterX;
    }

    return sw;
  }

  let offsetX = 0;
  roots.forEach((r) => {
    offsetX += assignX(r, offsetX, 0) + GAP_X * 2;
  });

  // Assign Y based on generation
  generations.forEach((gen, gi) => {
    byGeneration[gen].forEach((n) => {
      n._y = gi * GAP_Y + 60;
    });
  });

  // Normalize: ensure all x >= 0
  let minX = Infinity;
  nodes.forEach((n) => {
    if (n._x! < minX) minX = n._x!;
  });
  nodes.forEach((n) => {
    n._x = n._x! - minX + NODE_WIDTH;
  });

  let maxX = 0;
  let maxY = 0;
  nodes.forEach((n) => {
    if (n._x! > maxX) maxX = n._x!;
    if (n._y! > maxY) maxY = n._y!;
  });

  return { nodes, links, width: maxX + NODE_WIDTH * 2, height: maxY + NODE_HEIGHT + 80 };
}

export default function FamilyTree({ data, onSelectMember, selectedId, searchQuery }: FamilyTreeProps) {
  const svgRef = useRef<SVGSVGElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const [transform, setTransform] = useState<d3.ZoomTransform>(d3.zoomIdentity);
  const zoomBehaviorRef = useRef<d3.ZoomBehavior<SVGSVGElement, unknown> | null>(null);

  const { nodes, links, width, height } = (() => {
    const roots = buildTree(data.members);
    if (roots.length === 0) return { nodes: [], links: [], width: 0, height: 0 };
    return layoutTree(roots);
  })();

  const fitToScreen = useCallback(() => {
    const el = svgRef.current;
    const container = containerRef.current;
    if (!el || !container || !zoomBehaviorRef.current) return;
    const svg = d3.select<SVGSVGElement, unknown>(el);
    const cw = container.clientWidth;
    const ch = container.clientHeight;
    const scale = Math.min(cw / width, ch / height, 1) * 0.9;
    const tx = (cw - width * scale) / 2;
    const ty = (ch - height * scale) / 2;
    svg.transition().duration(600).call(zoomBehaviorRef.current.transform as never, d3.zoomIdentity.translate(tx, ty).scale(scale));
  }, [width, height]);

  useEffect(() => {
    const el = svgRef.current;
    const container = containerRef.current;
    if (!el || !container) return;
    const svg = d3.select<SVGSVGElement, unknown>(el);

    const zoom = d3
      .zoom<SVGSVGElement, unknown>()
      .scaleExtent([0.15, 3])
      .on("zoom", (event) => {
        setTransform(event.transform);
        svg.select<SVGGElement>("#tree-content").attr("transform", event.transform.toString());
      });

    zoomBehaviorRef.current = zoom;
    svg.call(zoom);

    // Initial fit
    const cw = container.clientWidth;
    const ch = container.clientHeight;
    const scale = Math.min(cw / width, ch / height, 1) * 0.9;
    const tx = (cw - width * scale) / 2;
    const ty = (ch - height * scale) / 2;
    const initial = d3.zoomIdentity.translate(tx, ty).scale(scale);
    svg.call(zoom.transform, initial);
    setTransform(initial);

    return () => {
      svg.on(".zoom", null);
    };
  }, [width, height]);

  const zoomIn = () => {
    const el = svgRef.current;
    if (!el || !zoomBehaviorRef.current) return;
    d3.select<SVGSVGElement, unknown>(el).transition().duration(300).call(zoomBehaviorRef.current.scaleBy as never, 1.3);
  };
  const zoomOut = () => {
    const el = svgRef.current;
    if (!el || !zoomBehaviorRef.current) return;
    d3.select<SVGSVGElement, unknown>(el).transition().duration(300).call(zoomBehaviorRef.current.scaleBy as never, 1 / 1.3);
  };

  const searchLower = searchQuery.trim().toLowerCase();
  const matches = (n: TreeNode) => !searchLower || n.name.toLowerCase().includes(searchLower);

  return (
    <div ref={containerRef} className="relative w-full h-full overflow-hidden bg-gradient-to-br from-slate-50 to-slate-100">
      {/* Controls */}
      <div className="absolute top-4 right-4 z-20 flex flex-col gap-2">
        <button onClick={zoomIn} className="w-11 h-11 bg-white rounded-lg shadow-md hover:bg-slate-50 active:scale-95 transition-all flex items-center justify-center text-slate-700 border border-slate-200">
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round"><path d="M12 5v14M5 12h14" /></svg>
        </button>
        <button onClick={zoomOut} className="w-11 h-11 bg-white rounded-lg shadow-md hover:bg-slate-50 active:scale-95 transition-all flex items-center justify-center text-slate-700 border border-slate-200">
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round"><path d="M5 12h14" /></svg>
        </button>
        <button onClick={fitToScreen} className="w-11 h-11 bg-white rounded-lg shadow-md hover:bg-slate-50 active:scale-95 transition-all flex items-center justify-center text-slate-700 border border-slate-200" title="전체 보기">
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M3 7V5a2 2 0 0 1 2-2h2M17 3h2a2 2 0 0 1 2 2v2M21 17v2a2 2 0 0 1-2 2h-2M7 21H5a2 2 0 0 1-2-2v-2" /></svg>
        </button>
      </div>

      {/* Zoom indicator */}
      <div className="absolute bottom-4 left-4 z-20 bg-white/90 backdrop-blur-sm rounded-lg px-3 py-1.5 text-xs font-medium text-slate-600 shadow-md border border-slate-200">
        {Math.round(transform.k * 100)}%
      </div>

      {/* Generation labels */}
      <div className="absolute left-4 top-4 z-20 bg-white/90 backdrop-blur-sm rounded-lg px-3 py-2 text-xs text-slate-600 shadow-md border border-slate-200">
        <div className="font-semibold text-slate-800 mb-1">세대 안내</div>
        {GENERATION_LEGEND.map(({ label, color }) => (
          <div key={label} className="flex items-center gap-1.5">
            <span className="inline-block w-2.5 h-2.5 rounded-full" style={{ background: color }} />
            {label}
          </div>
        ))}
      </div>

      <svg ref={svgRef} className="w-full h-full" style={{ touchAction: "none" }}>
        <defs>
          <filter id="nodeShadow" x="-20%" y="-20%" width="140%" height="140%">
            <feDropShadow dx="0" dy="2" stdDeviation="3" floodOpacity="0.15" />
          </filter>
        </defs>
        <g id="tree-content">
          {/* Links */}
          <g id="links">
            {links.map((link, i) => {
              if (link.type === "spouse") {
                const s = link.source;
                const t = link.target;
                if (s._x == null || t._x == null || s._y == null || t._y == null) return null;
                const midX = (s._x + t._x) / 2;
                return (
                  <line
                    key={`spouse-${i}`}
                    x1={s._x}
                    y1={s._y + NODE_HEIGHT / 2}
                    x2={t._x}
                    y2={t._y + NODE_HEIGHT / 2}
                    stroke="#d4a373"
                    strokeWidth="3"
                    strokeDasharray="0"
                  />
                );
              }
              // parent-child link: from bottom-center of parent (or midpoint of couple) to top of child
              const p = link.source;
              const c = link.target;
              if (p._x == null || c._x == null || p._y == null || c._y == null) return null;

              let startX = p._x;
              const startY = p._y + NODE_HEIGHT / 2;
              if (p.spouse && p.spouse._x != null) {
                startX = (p._x + p.spouse._x) / 2;
              }
              const endX = c._x;
              const endY = c._y - NODE_HEIGHT / 2;
              const midY = (startY + endY) / 2;

              return (
                <path
                  key={`parent-${i}`}
                  d={`M${startX},${startY} C${startX},${midY} ${endX},${midY} ${endX},${endY}`}
                  fill="none"
                  stroke="#94a3b8"
                  strokeWidth="2"
                />
              );
            })}
          </g>

          {/* Nodes */}
          <g id="nodes">
            {nodes.map((node) => {
              if (node._x == null || node._y == null) return null;
              const isSelected = selectedId === node.id;
              const isMatch = matches(node);
              const dim = searchLower && !isMatch;
              return (
                <g
                  key={node.id}
                  transform={`translate(${node._x - NODE_WIDTH / 2}, ${node._y - NODE_HEIGHT / 2})`}
                  className="cursor-pointer"
                  onClick={() => onSelectMember(node)}
                  opacity={dim ? 0.25 : 1}
                  style={{ transition: "opacity 0.2s" }}
                >
                  {/* Highlight ring if selected */}
                  {isSelected && <rect x={-4} y={-4} width={NODE_WIDTH + 8} height={NODE_HEIGHT + 8} rx={14} fill="none" stroke="#f59e0b" strokeWidth="3" />}
                  <rect
                    width={NODE_WIDTH}
                    height={NODE_HEIGHT}
                    rx={12}
                    fill="white"
                    filter="url(#nodeShadow)"
                    stroke={isMatch && searchLower ? "#f59e0b" : "#e2e8f0"}
                    strokeWidth={isMatch && searchLower ? 2 : 1}
                  />
                  {/* Avatar circle: generation color, matching the legend */}
                  <circle cx={NODE_WIDTH / 2} cy={22} r={16} fill={generationColor(node.generation)} />
                  <text x={NODE_WIDTH / 2} y={27} textAnchor="middle" fill="white" fontSize="14" fontWeight="600" pointerEvents="none">
                    {node.name.charAt(0)}
                  </text>
                  {/* Name */}
                  <text x={NODE_WIDTH / 2} y={52} textAnchor="middle" fill="#1e293b" fontSize="13" fontWeight="600" pointerEvents="none">
                    {node.name}
                  </text>
                  {/* Years */}
                  <text x={NODE_WIDTH / 2} y={68} textAnchor="middle" fill="#64748b" fontSize="10" pointerEvents="none">
                    {node.birthYear ? `${node.birthYear}${node.deathYear ? ` - ${node.deathYear}` : ""}` : ""}
                  </text>
                </g>
              );
            })}
          </g>
        </g>
      </svg>

      {nodes.length === 0 && (
        <div className="absolute inset-0 flex items-center justify-center text-slate-400">
          가계도 데이터가 없습니다.
        </div>
      )}
    </div>
  );
}
