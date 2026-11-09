import type { FamilyMember } from "@/types/family";
import { AvatarColor } from "@/types/family";
import { getRootMembers } from "./lineage";

const FIELD_ORDER = ["id", "name", "gender", "generation", "parentId", "occupation", "bio", "spouseId", "avatarColor"];

/** Returns a list of human-readable problems in the family data (empty when valid). */
export function validateFamilyData(members: FamilyMember[]): string[] {
  const errors: string[] = [];
  const label = (m: FamilyMember) => `${m.name} (${m.id})`;

  // Duplicate ids
  const counts = new Map<string, number>();
  members.forEach((m) => counts.set(m.id, (counts.get(m.id) ?? 0) + 1));
  counts.forEach((n, id) => {
    if (n > 1) errors.push(`id "${id}"가 ${n}번 쓰였어요. id는 사람마다 달라야 해요.`);
  });
  const byId = new Map(members.map((m) => [m.id, m]));

  members.forEach((m) => {
    // Every field present, in order
    const keys = Object.keys(m).filter((k) => FIELD_ORDER.includes(k));
    const missing = FIELD_ORDER.filter((k) => !(k in m));
    if (missing.length) errors.push(`${label(m)}: 필드가 빠졌어요 → ${missing.join(", ")}`);
    else if (keys.join() !== FIELD_ORDER.join()) errors.push(`${label(m)}: 필드 순서가 달라요. ${FIELD_ORDER.join(", ")} 순서로 적어주세요.`);

    // Unknown values must be null, not ""
    (Object.entries(m) as [string, unknown][]).forEach(([k, v]) => {
      if (v === "") errors.push(`${label(m)}: ${k}가 빈 문자열("")이에요. 모르면 null로 적어주세요.`);
    });

    if (m.gender !== "male" && m.gender !== "female") errors.push(`${label(m)}: gender는 "male" 또는 "female"이어야 해요.`);
    const expectedColor = m.gender === "male" ? AvatarColor.Male : AvatarColor.Female;
    if (m.avatarColor !== expectedColor)
      errors.push(`${label(m)}: avatarColor가 성별과 안 맞아요 → AvatarColor.${m.gender === "male" ? "Male" : "Female"}`);

    // Parent link
    if (m.parentId) {
      const parent = byId.get(m.parentId);
      if (!parent) errors.push(`${label(m)}: parentId "${m.parentId}"인 사람이 없어요.`);
      else if (parent.generation + 1 !== m.generation)
        errors.push(`${label(m)}: ${m.generation}세대인데 부모 ${label(parent)}는 ${parent.generation}세대예요.`);
    }

    // Spouse link must be mutual
    if (m.spouseId) {
      const spouse = byId.get(m.spouseId);
      if (!spouse) errors.push(`${label(m)}: spouseId "${m.spouseId}"인 사람이 없어요.`);
      else if (spouse.spouseId !== m.id)
        errors.push(`${label(m)}: 배우자 ${label(spouse)} 쪽에도 spouseId: "${m.id}"를 적어야 해요.`);
    }
  });

  // Everyone must end up on the tree
  const placed = new Set<string>();
  const visit = (id: string) => {
    if (placed.has(id)) return;
    placed.add(id);
    const spouseId = byId.get(id)?.spouseId;
    if (spouseId && byId.has(spouseId)) placed.add(spouseId);
    members.filter((c) => c.parentId === id).forEach((c) => visit(c.id));
  };
  getRootMembers(members).forEach((r) => visit(r.id));
  members
    .filter((m) => !placed.has(m.id))
    .forEach((m) => errors.push(`${label(m)}: 가계도 어디에도 연결되지 않아 화면에 안 나와요. parentId나 spouseId를 확인해 주세요.`));

  return errors;
}
