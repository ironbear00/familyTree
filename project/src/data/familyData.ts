import type { FamilyData } from "@/types/family";

export const familyData: FamilyData = {
  members: [
    // ===== 1세대 =====
    { id: "1", name: "최천조", gender: "male", generation: 1, spouseId: "1-S", occupation: "미상", bio: "1세대 시조", avatarColor: "#1e6091" },
    { id: "1-S", name: "배우자", gender: "female", generation: 1, spouseId: "1", occupation: "미상", bio: "1세대 배우자", avatarColor: "#b5476b" },

    { id: "2", name: "최전달", gender: "male", generation: 1, spouseId: "2-S", occupation: "미상", bio: "1세대 시조", avatarColor: "#1e6091" },
    { id: "2-S", name: "배우자", gender: "female", generation: 1, spouseId: "2", occupation: "미상", bio: "1세대 배우자", avatarColor: "#b5476b" },

    { id: "3", name: "최규달", gender: "male", generation: 1, spouseId: "3-S", occupation: "미상", bio: "1세대 시조", avatarColor: "#1e6091" },
    { id: "3-S", name: "배우자", gender: "female", generation: 1, spouseId: "3", occupation: "미상", bio: "1세대 배우자", avatarColor: "#b5476b" },

    // ===== 2세대 (최천조 자녀) =====
    { id: "1-1", name: "최경자", gender: "female", generation: 2, parentId: "1", occupation: "미상", bio: "", avatarColor: "#b5476b" },
    { id: "1-2", name: "최명숙", gender: "female", generation: 2, parentId: "1", spouseId: "1-2-S", occupation: "미상", bio: "", avatarColor: "#b5476b" },
    { id: "1-2-S", name: "김호웅", gender: "male", generation: 2, spouseId: "1-2", occupation: "미상", bio: "", avatarColor: "#1e6091" },
    { id: "1-3", name: "최명남", gender: "female", generation: 2, parentId: "1", spouseId: "1-3-S", occupation: "미상", bio: "", avatarColor: "#b5476b" },
    { id: "1-3-S", name: "김문석", gender: "male", generation: 2, spouseId: "1-3", occupation: "미상", bio: "", avatarColor: "#1e6091" },
    { id: "1-4", name: "최시훈", gender: "male", generation: 2, parentId: "1", spouseId: "1-4-S", occupation: "미상", bio: "", avatarColor: "#1e6091" },
    { id: "1-4-S", name: "배우자", gender: "female", generation: 2, spouseId: "1-4", occupation: "미상", bio: "", avatarColor: "#b5476b" },

    // ===== 2세대 (최전달 자녀) =====
    { id: "2-1", name: "최현숙", gender: "female", generation: 2, parentId: "2", spouseId: "2-1-S", occupation: "미상", bio: "", avatarColor: "#b5476b" },
    { id: "2-1-S", name: "남규호", gender: "male", generation: 2, spouseId: "2-1", occupation: "미상", bio: "", avatarColor: "#1e6091" },

    { id: "2-2", name: "최명숙", gender: "female", generation: 2, parentId: "2", spouseId: "2-2-S", occupation: "미상", bio: "", avatarColor: "#b5476b" },
    { id: "2-2-S", name: "김영국", gender: "male", generation: 2, spouseId: "2-2", occupation: "미상", bio: "", avatarColor: "#1e6091" },

    { id: "2-3", name: "최명랑", gender: "female", generation: 2, parentId: "2", spouseId: "2-3-S", occupation: "미상", bio: "", avatarColor: "#b5476b" },
    { id: "2-3-S", name: "김광남", gender: "male", generation: 2, spouseId: "2-3", occupation: "미상", bio: "", avatarColor: "#1e6091" },

    { id: "2-4", name: "최춘석", gender: "male", generation: 2, parentId: "2", spouseId: "2-4-S", occupation: "미상", bio: "", avatarColor: "#1e6091" },
    { id: "2-4-S", name: "이성미", gender: "female", generation: 2, spouseId: "2-4", occupation: "미상", bio: "", avatarColor: "#b5476b" },

    { id: "2-5", name: "최문석", gender: "male", generation: 2, parentId: "2", spouseId: "2-5-S", occupation: "미상", bio: "", avatarColor: "#1e6091" },
    { id: "2-5-S", name: "김혜영", gender: "female", generation: 2, spouseId: "2-5", occupation: "미상", bio: "", avatarColor: "#b5476b" },

    // ===== 2세대 (최규달 자녀) =====
    { id: "3-1", name: "최희순", gender: "female", generation: 2, parentId: "3", spouseId: "3-1-S", occupation: "미상", bio: "", avatarColor: "#b5476b" },
    { id: "3-1-S", name: "이유락", gender: "male", generation: 2, spouseId: "3-1", occupation: "미상", bio: "", avatarColor: "#1e6091" },

    { id: "3-2", name: "최정호", gender: "male", generation: 2, parentId: "3", spouseId: "3-2-S", occupation: "미상", bio: "", avatarColor: "#1e6091" },
    { id: "3-2-S", name: "이정애", gender: "female", generation: 2, spouseId: "3-2", occupation: "미상", bio: "", avatarColor: "#b5476b" },

    { id: "3-3", name: "최철호", gender: "male", generation: 2, parentId: "3", occupation: "미상", bio: "", avatarColor: "#1e6091" },

    { id: "3-4", name: "최성호", gender: "male", generation: 2, parentId: "3", spouseId: "3-4-S", occupation: "미상", bio: "", avatarColor: "#1e6091" },
    { id: "3-4-S", name: "조현주", gender: "female", generation: 2, spouseId: "3-4", occupation: "미상", bio: "", avatarColor: "#b5476b" },

    // ===== 3세대 (최시훈 자녀) =====
    { id: "1-4-1", name: "언니", gender: "female", generation: 3, parentId: "1-4", occupation: "미상", bio: "", avatarColor: "#b5476b" },
    { id: "1-4-2", name: "오빠", gender: "male", generation: 3, parentId: "1-4", occupation: "미상", bio: "", avatarColor: "#1e6091" },

    // ===== 3세대 (최현숙 자녀) =====
    { id: "2-1-1", name: "남종모", gender: "male", generation: 3, parentId: "2-1", spouseId: "2-1-1-S", occupation: "미상", bio: "", avatarColor: "#1e6091" },
    { id: "2-1-1-S", name: "박상현", gender: "female", generation: 3, spouseId: "2-1-1", occupation: "미상", bio: "", avatarColor: "#b5476b" },
    { id: "2-1-2", name: "남효진", gender: "female", generation: 3, parentId: "2-1", spouseId: "2-1-2-S", occupation: "미상", bio: "", avatarColor: "#b5476b" },
    { id: "2-1-2-S", name: "김용범", gender: "male", generation: 3, spouseId: "2-1-2", occupation: "미상", bio: "", avatarColor: "#1e6091" },

    // ===== 3세대 (최명숙 자녀) =====
    { id: "2-2-1", name: "김지형", gender: "male", generation: 3, parentId: "2-2", spouseId: "2-2-1-S", occupation: "미상", bio: "", avatarColor: "#1e6091" },
    { id: "2-2-1-S", name: "띠아", gender: "female", generation: 3, spouseId: "2-2-1", occupation: "미상", bio: "", avatarColor: "#b5476b" },
    { id: "2-2-2", name: "김민경", gender: "female", generation: 3, parentId: "2-2", occupation: "미상", bio: "", avatarColor: "#b5476b" },

    // ===== 3세대 (최명랑 자녀) =====
    { id: "2-3-1", name: "김소희", gender: "female", generation: 3, parentId: "2-3", occupation: "미상", bio: "", avatarColor: "#b5476b" },
    { id: "2-3-2", name: "김현정", gender: "female", generation: 3, parentId: "2-3", spouseId: "2-3-2-S", occupation: "미상", bio: "", avatarColor: "#b5476b" },
    { id: "2-3-2-S", name: "시릴", gender: "male", generation: 3, spouseId: "2-3-2", occupation: "미상", bio: "", avatarColor: "#1e6091" },

    // ===== 3세대 (최춘석 자녀) =====
    { id: "2-4-1", name: "최진혁", gender: "male", generation: 3, parentId: "2-4", spouseId: "2-4-1-S", occupation: "미상", bio: "", avatarColor: "#1e6091" },
    { id: "2-4-1-S", name: "최가윤", gender: "female", generation: 3, spouseId: "2-4-1", occupation: "미상", bio: "", avatarColor: "#b5476b" },
    { id: "2-4-2", name: "최진영", gender: "male", generation: 3, parentId: "2-4", occupation: "미상", bio: "", avatarColor: "#1e6091" },

    // ===== 3세대 (최문석 자녀) =====
    { id: "2-5-1", name: "최진호", gender: "male", generation: 3, parentId: "2-5", occupation: "미상", bio: "", avatarColor: "#1e6091" },
    { id: "2-5-2", name: "최소정", gender: "female", generation: 3, parentId: "2-5", occupation: "미상", bio: "본인", avatarColor: "#b5476b" },

    // ===== 3세대 (최희순 자녀) =====
    { id: "3-1-1", name: "이??", gender: "male", generation: 3, parentId: "3-1", occupation: "미상", bio: "", avatarColor: "#1e6091" },
    { id: "3-1-2", name: "이??", gender: "male", generation: 3, parentId: "3-1", occupation: "미상", bio: "", avatarColor: "#1e6091" },

    // ===== 3세대 (최정호 자녀) =====
    { id: "3-2-1", name: "최재원", gender: "male", generation: 3, parentId: "3-2", spouseId: "3-2-1-S", occupation: "미상", bio: "", avatarColor: "#1e6091" },
    { id: "3-2-1-S", name: "채은", gender: "female", generation: 3, spouseId: "3-2-1", occupation: "미상", bio: "", avatarColor: "#b5476b" },
    { id: "3-2-2", name: "최재혁", gender: "male", generation: 3, parentId: "3-2", spouseId: "3-2-2-S", occupation: "미상", bio: "", avatarColor: "#1e6091" },
    { id: "3-2-2-S", name: "예울", gender: "female", generation: 3, spouseId: "3-2-2", occupation: "미상", bio: "", avatarColor: "#b5476b" },

    // ===== 3세대 (최철호 자녀) =====
    { id: "3-3-1", name: "최소윤", gender: "female", generation: 3, parentId: "3-3", occupation: "미상", bio: "", avatarColor: "#b5476b" },
    { id: "3-3-2", name: "최원재", gender: "male", generation: 3, parentId: "3-3", occupation: "미상", bio: "", avatarColor: "#1e6091" },

    // ===== 3세대 (최성호 자녀) =====
    { id: "3-4-1", name: "최정윤", gender: "female", generation: 3, parentId: "3-4", spouseId: "3-4-1-S", occupation: "미상", bio: "", avatarColor: "#b5476b" },
    { id: "3-4-1-S", name: "배우자", gender: "male", generation: 3, spouseId: "3-4-1", occupation: "미상", bio: "", avatarColor: "#1e6091" },
    { id: "3-4-2", name: "최연규", gender: "male", generation: 3, parentId: "3-4", spouseId: "3-4-2-S", occupation: "미상", bio: "", avatarColor: "#1e6091" },
    { id: "3-4-2-S", name: "배우자", gender: "female", generation: 3, spouseId: "3-4-2", occupation: "미상", bio: "", avatarColor: "#b5476b" },

    // ===== 4세대 =====
    // (남종모 자녀)
    { id: "2-1-1-1", name: "남현준로건", gender: "male", generation: 4, parentId: "2-1-1", occupation: "미상", bio: "", avatarColor: "#1e6091" },

    // (남효진 자녀)
    { id: "2-1-2-1", name: "김지아", gender: "female", generation: 4, parentId: "2-1-2", occupation: "미상", bio: "", avatarColor: "#b5476b" },
    { id: "2-1-2-2", name: "김지성", gender: "male", generation: 4, parentId: "2-1-2", occupation: "미상", bio: "", avatarColor: "#1e6091" },
    { id: "2-1-2-3", name: "김지호", gender: "male", generation: 4, parentId: "2-1-2", occupation: "미상", bio: "", avatarColor: "#1e6091" },

    // (김현정 자녀)
    { id: "2-3-2-1", name: "민석", gender: "male", generation: 4, parentId: "2-3-2", occupation: "미상", bio: "", avatarColor: "#1e6091" },
    { id: "2-3-2-2", name: "딸", gender: "female", generation: 4, parentId: "2-3-2", occupation: "미상", bio: "", avatarColor: "#b5476b" },

    // (최재원 자녀)
    { id: "3-2-1-1", name: "텐텐", gender: "male", generation: 4, parentId: "3-2-1", occupation: "미상", bio: "", avatarColor: "#1e6091" },

    // (최재혁 자녀)
    { id: "3-2-2-1", name: "자녀", gender: "male", generation: 4, parentId: "3-2-2", occupation: "미상", bio: "", avatarColor: "#1e6091" },

    // (최정윤 자녀)
    { id: "3-4-1-1", name: "수호", gender: "male", generation: 4, parentId: "3-4-1", occupation: "미상", bio: "", avatarColor: "#1e6091" },

    // (최연규 자녀)
    { id: "3-4-2-1", name: "최예린", gender: "female", generation: 4, parentId: "3-4-2", occupation: "미상", bio: "", avatarColor: "#b5476b" },
    { id: "3-4-2-2", name: "자녀", gender: "male", generation: 4, parentId: "3-4-2", occupation: "미상", bio: "", avatarColor: "#1e6091" },
  ],
};
