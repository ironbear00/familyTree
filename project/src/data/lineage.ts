import type { FamilyMember } from "@/types/family";

/**
 * Founders of each family line: members with no parent, excluding spouses
 * (a spouse is drawn next to its partner, so it is skipped when the partner
 * has a parent or was already taken as a root).
 */
export function getRootMembers(members: FamilyMember[]): FamilyMember[] {
  const byId = new Map(members.map((m) => [m.id, m]));
  const taken = new Set<string>();
  const roots: FamilyMember[] = [];
  members.forEach((m) => {
    if (m.parentId) return;
    const partner = m.spouseId ? byId.get(m.spouseId) : undefined;
    if (partner && (partner.parentId || taken.has(partner.id))) return;
    taken.add(m.id);
    roots.push(m);
  });
  return roots;
}

/** The founder, every descendant, and each of their spouses. */
export function getLineage(members: FamilyMember[], rootId: string): FamilyMember[] {
  const byId = new Map(members.map((m) => [m.id, m]));
  const keep = new Set<string>();
  const visit = (id: string) => {
    if (keep.has(id) || !byId.has(id)) return;
    keep.add(id);
    const spouseId = byId.get(id)!.spouseId;
    if (spouseId && byId.has(spouseId)) keep.add(spouseId);
    members.filter((m) => m.parentId === id).forEach((c) => visit(c.id));
  };
  visit(rootId);
  return members.filter((m) => keep.has(m.id));
}
