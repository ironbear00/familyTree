import type { FamilyMember, FamilyData } from "@/types/family";
import { X, Briefcase, Calendar, Users, Heart, User as UserIcon } from "lucide-react";
import { generationColor } from "@/data/colors";

interface MemberDetailProps {
  member: FamilyMember;
  data: FamilyData;
  onClose: () => void;
  onSelectMember: (m: FamilyMember) => void;
}

export default function MemberDetail({ member, data, onClose, onSelectMember }: MemberDetailProps) {
  const members = data.members;
  const spouse = member.spouseId ? members.find((m) => m.id === member.spouseId) : null;
  const parent = member.parentId ? members.find((m) => m.id === member.parentId) : null;
  const children = members.filter((m) => m.parentId === member.id);
  const siblings = parent ? members.filter((m) => m.parentId === parent.id && m.id !== member.id) : [];

  const ageText = member.birthYear
    ? member.deathYear
      ? `${member.deathYear - member.birthYear}세 (별세)`
      : `${new Date().getFullYear() - member.birthYear}세`
    : null;

  return (
    <div className="fixed inset-0 z-40 flex justify-end">
      <div className="absolute inset-0 bg-slate-900/30 backdrop-blur-sm" onClick={onClose} />
      <div className="relative w-full max-w-md h-full bg-white shadow-2xl overflow-y-auto animate-slide-in-right">
        {/* Header */}
        <div className="relative px-6 pt-8 pb-6" style={{ background: `linear-gradient(135deg, ${generationColor(member.generation)}, ${generationColor(member.generation)}cc)` }}>
          <button
            onClick={onClose}
            className="absolute top-4 right-4 w-9 h-9 rounded-full bg-white/20 hover:bg-white/30 transition-colors flex items-center justify-center text-white"
          >
            <X size={20} />
          </button>
          <div className="w-20 h-20 rounded-full bg-white/25 backdrop-blur-sm flex items-center justify-center text-white text-3xl font-bold mb-3">
            {member.name.charAt(0)}
          </div>
          <h2 className="text-2xl font-bold text-white">{member.name}</h2>
          <div className="flex items-center gap-2 mt-2 text-white/90 text-sm">
            <span className="px-2.5 py-0.5 rounded-full bg-white/20 backdrop-blur-sm">
              {member.gender === "male" ? "남성" : "여성"}
            </span>
            <span className="px-2.5 py-0.5 rounded-full bg-white/20 backdrop-blur-sm">
              {member.generation}세대
            </span>
            {ageText && <span className="px-2.5 py-0.5 rounded-full bg-white/20 backdrop-blur-sm">{ageText}</span>}
          </div>
        </div>

        {/* Body */}
        <div className="px-6 py-6 space-y-5">
          {/* Bio */}
          {member.bio && (
            <div>
              <h3 className="text-sm font-semibold text-slate-400 uppercase tracking-wide mb-2">소개</h3>
              <p className="text-slate-700 leading-relaxed text-sm">{member.bio}</p>
            </div>
          )}

          {/* Info */}
          <div className="space-y-3">
            {member.occupation && (
              <div className="flex items-center gap-3 text-slate-700">
                <div className="w-9 h-9 rounded-lg bg-amber-50 flex items-center justify-center text-amber-600">
                  <Briefcase size={18} />
                </div>
                <div>
                  <div className="text-xs text-slate-400">직업</div>
                  <div className="text-sm font-medium">{member.occupation}</div>
                </div>
              </div>
            )}
            {member.birthYear && (
              <div className="flex items-center gap-3 text-slate-700">
                <div className="w-9 h-9 rounded-lg bg-blue-50 flex items-center justify-center text-blue-600">
                  <Calendar size={18} />
                </div>
                <div>
                  <div className="text-xs text-slate-400">생몰</div>
                  <div className="text-sm font-medium">
                    {member.birthYear}{member.deathYear ? ` ~ ${member.deathYear}` : " ~ 현재"}
                  </div>
                </div>
              </div>
            )}
          </div>

          {/* Relationships */}
          <div className="space-y-4 pt-2">
            {parent && (
              <div>
                <h3 className="text-sm font-semibold text-slate-400 uppercase tracking-wide mb-2 flex items-center gap-1.5">
                  <UserIcon size={14} /> 부모
                </h3>
                <button
                  onClick={() => onSelectMember(parent)}
                  className="flex items-center gap-3 p-3 rounded-lg bg-slate-50 hover:bg-slate-100 transition-colors w-full text-left"
                >
                  <div className="w-10 h-10 rounded-full flex items-center justify-center text-white font-bold text-sm" style={{ background: generationColor(parent.generation) }}>
                    {parent.name.charAt(0)}
                  </div>
                  <div>
                    <div className="text-sm font-medium text-slate-800">{parent.name}</div>
                    <div className="text-xs text-slate-400">{parent.occupation || `${parent.generation}세대`}</div>
                  </div>
                </button>
              </div>
            )}

            {spouse && (
              <div>
                <h3 className="text-sm font-semibold text-slate-400 uppercase tracking-wide mb-2 flex items-center gap-1.5">
                  <Heart size={14} /> 배우자
                </h3>
                <button
                  onClick={() => onSelectMember(spouse)}
                  className="flex items-center gap-3 p-3 rounded-lg bg-rose-50 hover:bg-rose-100 transition-colors w-full text-left"
                >
                  <div className="w-10 h-10 rounded-full flex items-center justify-center text-white font-bold text-sm" style={{ background: generationColor(spouse.generation) }}>
                    {spouse.name.charAt(0)}
                  </div>
                  <div>
                    <div className="text-sm font-medium text-slate-800">{spouse.name}</div>
                    <div className="text-xs text-slate-400">{spouse.occupation || ""}</div>
                  </div>
                </button>
              </div>
            )}

            {siblings.length > 0 && (
              <div>
                <h3 className="text-sm font-semibold text-slate-400 uppercase tracking-wide mb-2 flex items-center gap-1.5">
                  <Users size={14} /> 형제자매 ({siblings.length})
                </h3>
                <div className="flex flex-wrap gap-2">
                  {siblings.map((s) => (
                    <button
                      key={s.id}
                      onClick={() => onSelectMember(s)}
                      className="flex items-center gap-2 px-3 py-2 rounded-lg bg-slate-50 hover:bg-slate-100 transition-colors text-left"
                    >
                      <div className="w-8 h-8 rounded-full flex items-center justify-center text-white font-bold text-xs" style={{ background: generationColor(s.generation) }}>
                        {s.name.charAt(0)}
                      </div>
                      <span className="text-sm font-medium text-slate-700">{s.name}</span>
                    </button>
                  ))}
                </div>
              </div>
            )}

            {children.length > 0 && (
              <div>
                <h3 className="text-sm font-semibold text-slate-400 uppercase tracking-wide mb-2 flex items-center gap-1.5">
                  <Users size={14} /> 자녀 ({children.length})
                </h3>
                <div className="flex flex-wrap gap-2">
                  {children.map((c) => (
                    <button
                      key={c.id}
                      onClick={() => onSelectMember(c)}
                      className="flex items-center gap-2 px-3 py-2 rounded-lg bg-emerald-50 hover:bg-emerald-100 transition-colors text-left"
                    >
                      <div className="w-8 h-8 rounded-full flex items-center justify-center text-white font-bold text-xs" style={{ background: generationColor(c.generation) }}>
                        {c.name.charAt(0)}
                      </div>
                      <span className="text-sm font-medium text-slate-700">{c.name}</span>
                    </button>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
