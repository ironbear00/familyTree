import { useState, useMemo } from "react";
import { Search, GitBranch, Users } from "lucide-react";
import FamilyTree from "@/components/FamilyTree";
import MemberDetail from "@/components/MemberDetail";
import { familyData } from "@/data/familyData";
import type { FamilyMember } from "@/types/family";
import { getRootMembers, getLineage } from "@/data/lineage";

const ALL = "all";

export default function App() {
  const [selectedMember, setSelectedMember] = useState<FamilyMember | null>(null);
  const [searchQuery, setSearchQuery] = useState("");
  const [activeRoot, setActiveRoot] = useState<string>(ALL);

  const roots = useMemo(() => getRootMembers(familyData.members), []);

  const visibleData = useMemo(
    () => (activeRoot === ALL ? familyData : { members: getLineage(familyData.members, activeRoot) }),
    [activeRoot],
  );

  const memberCount = visibleData.members.length;
  const generationCount = useMemo(() => new Set(visibleData.members.map((m) => m.generation)).size, [visibleData]);

  const tabs = [{ id: ALL, label: "전체" }, ...roots.map((r) => ({ id: r.id, label: r.name }))];

  const selectTab = (id: string) => {
    setActiveRoot(id);
    setSelectedMember(null);
  };

  return (
    <div className="h-screen flex flex-col bg-slate-50">
      {/* Header */}
      <header className="flex-shrink-0 bg-white border-b border-slate-200 px-4 sm:px-6 py-3 flex items-center gap-3 sm:gap-4 shadow-sm z-30">
        <div className="flex items-center gap-2.5 flex-shrink-0">
          <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-slate-700 to-slate-900 flex items-center justify-center text-white">
            <GitBranch size={22} />
          </div>
          <div className="hidden sm:block">
            <h1 className="text-lg font-bold text-slate-800 leading-tight">최가네 가족 가계도</h1>
            <p className="text-xs text-slate-400">족보</p>
          </div>
          <h1 className="sm:hidden text-base font-bold text-slate-800 leading-tight">가계도</h1>
        </div>

        {/* Stats */}
        <div className="hidden md:flex items-center gap-4 ml-4 pl-4 border-l border-slate-200">
          <div className="flex items-center gap-1.5 text-sm text-slate-600">
            <Users size={16} className="text-slate-400" />
            <span className="font-semibold text-slate-800">{memberCount}</span>명
          </div>
          <div className="flex items-center gap-1.5 text-sm text-slate-600">
            <GitBranch size={16} className="text-slate-400" />
            <span className="font-semibold text-slate-800">{generationCount}</span>세대
          </div>
        </div>

        {/* Search */}
        <div className="flex-1 max-w-xs ml-auto relative">
          <Search size={18} className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400 pointer-events-none" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="이름 검색..."
            className="w-full pl-10 pr-3 py-2 text-sm rounded-lg border border-slate-200 focus:border-slate-400 focus:ring-2 focus:ring-slate-200 outline-none transition-all bg-slate-50"
          />
        </div>
      </header>

      {/* Family line tabs */}
      <nav className="flex-shrink-0 bg-white border-b border-slate-200 px-4 sm:px-6 z-20">
        <div role="tablist" aria-label="1세대 가족 선택" className="flex gap-1 overflow-x-auto -mb-px">
          {tabs.map((tab) => {
            const active = tab.id === activeRoot;
            return (
              <button
                key={tab.id}
                role="tab"
                aria-selected={active}
                onClick={() => selectTab(tab.id)}
                className={`flex-shrink-0 px-4 py-2.5 text-sm font-medium border-b-2 transition-colors whitespace-nowrap ${
                  active
                    ? "border-slate-800 text-slate-900"
                    : "border-transparent text-slate-500 hover:text-slate-800 hover:border-slate-300"
                }`}
              >
                {tab.id === ALL ? tab.label : `${tab.label} 가족`}
              </button>
            );
          })}
        </div>
      </nav>

      {/* Tree canvas */}
      <main className="flex-1 relative">
        <FamilyTree
          data={visibleData}
          onSelectMember={setSelectedMember}
          selectedId={selectedMember?.id}
          searchQuery={searchQuery}
        />

        {/* Credits */}
        <footer className="absolute bottom-3 right-4 z-20 text-right text-[11px] leading-relaxed text-slate-400 pointer-events-none select-none">
          <div>정보 수정 문의: 최소정</div>
          <div>© {new Date().getFullYear()} ironbear. All rights reserved.</div>
        </footer>
      </main>

      {/* Mobile hint */}
      <div className="md:hidden flex-shrink-0 bg-slate-800 text-white/80 text-xs text-center py-1.5 px-4">
        두 손가락으로 확대/축소, 드래그로 이동
      </div>

      {/* Detail panel */}
      {selectedMember && (
        <MemberDetail
          member={selectedMember}
          data={familyData}
          onClose={() => setSelectedMember(null)}
          onSelectMember={setSelectedMember}
        />
      )}
    </div>
  );
}
