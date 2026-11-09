export type Gender = "male" | "female";

/** Named avatar colors, so the data file doesn't carry raw hex codes. */
export const AvatarColor = {
  Male: "#1e6091",
  Female: "#b5476b",
} as const;
export type AvatarColor = (typeof AvatarColor)[keyof typeof AvatarColor];

/** Every member has all of these fields; unknown values are null. */
export interface FamilyMember {
  id: string;
  name: string;
  gender: Gender;
  generation: number;
  parentId: string | null;
  occupation: string | null;
  bio: string | null;
  spouseId: string | null;
  avatarColor: AvatarColor;
  birthYear?: number;
  deathYear?: number;
}

export interface FamilyData {
  members: FamilyMember[];
}

export interface TreeNode extends FamilyMember {
  children: TreeNode[];
  spouse?: TreeNode | null;
  _x?: number;
  _y?: number;
}
