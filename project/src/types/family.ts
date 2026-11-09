export interface FamilyMember {
  id: string;
  name: string;
  gender: "male" | "female";
  birthYear?: number;
  deathYear?: number;
  spouseId?: string;
  parentId?: string;
  generation: number;
  occupation?: string;
  bio?: string;
  avatarColor?: string;
}

export interface FamilyData {
  members: FamilyMember[];
}

export interface TreeNode {
  id: string;
  name: string;
  gender: "male" | "female";
  birthYear?: number;
  deathYear?: number;
  spouseId?: string;
  parentId?: string;
  generation: number;
  occupation?: string;
  bio?: string;
  avatarColor?: string;
  children: TreeNode[];
  spouse?: TreeNode | null;
  _x?: number;
  _y?: number;
}
