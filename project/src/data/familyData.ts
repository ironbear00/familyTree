import { AvatarColor, type FamilyData } from "@/types/family";

export const familyData: FamilyData = {
  members: [
    // ===== 1세대 =====
    { id: "1", name: "최천조", gender: "male", generation: 1, parentId: null, occupation: null, bio: "학산 할아버지", spouseId: "1-S", avatarColor: AvatarColor.Male },
    { id: "1-S", name: "정위옥", gender: "female", generation: 1, parentId: null, occupation: null, bio: "학산 할머니", spouseId: "1", avatarColor: AvatarColor.Female },

    { id: "2", name: "최전달", gender: "male", generation: 1, parentId: null, occupation: null, bio: null, spouseId: "2-S", avatarColor: AvatarColor.Male },
    { id: "2-S", name: "박금하", gender: "female", generation: 1, parentId: null, occupation: null, bio: "오도 출신", spouseId: "2", avatarColor: AvatarColor.Female },

    { id: "3", name: "최규달", gender: "male", generation: 1, parentId: null, occupation: null, bio: "구지 할아버지", spouseId: "3-S", avatarColor: AvatarColor.Male },
    { id: "3-S", name: "박영자", gender: "female", generation: 1, parentId: null, occupation: null, bio: "구지 할머니", spouseId: "3", avatarColor: AvatarColor.Female },

    // ===== 2세대 (최천조 자녀) =====
    { id: "1-1", name: "최경자", gender: "female", generation: 2, parentId: "1", occupation: null, bio: null, spouseId: "1-1-S", avatarColor: AvatarColor.Female },
    { id: "1-1-S", name: "이인수", gender: "male", generation: 2, parentId: null, occupation: null, bio: null, spouseId: "1-1", avatarColor: AvatarColor.Male },
    { id: "1-2", name: "최명숙", gender: "female", generation: 2, parentId: "1", occupation: null, bio: null, spouseId: "1-2-S", avatarColor: AvatarColor.Female },
    { id: "1-2-S", name: "김호웅", gender: "male", generation: 2, parentId: null, occupation: null, bio: null, spouseId: "1-2", avatarColor: AvatarColor.Male },
    { id: "1-3", name: "최명남", gender: "female", generation: 2, parentId: "1", occupation: null, bio: null, spouseId: "1-3-S", avatarColor: AvatarColor.Female },
    { id: "1-3-S", name: "김문석", gender: "male", generation: 2, parentId: null, occupation: null, bio: null, spouseId: "1-3", avatarColor: AvatarColor.Male },
    { id: "1-4", name: "최시훈", gender: "male", generation: 2, parentId: "1", occupation: null, bio: "학산", spouseId: "1-4-S", avatarColor: AvatarColor.Male },
    { id: "1-4-S", name: "이명숙", gender: "female", generation: 2, parentId: null, occupation: null, bio: "학산", spouseId: "1-4", avatarColor: AvatarColor.Female },

    // ===== 2세대 (최전달 자녀) =====
    { id: "2-1", name: "최현숙", gender: "female", generation: 2, parentId: "2", occupation: null, bio: "죽도, 수가성", spouseId: "2-1-S", avatarColor: AvatarColor.Female },
    { id: "2-1-S", name: "남규호", gender: "male", generation: 2, parentId: null, occupation: null, bio: "죽도, 수가성", spouseId: "2-1", avatarColor: AvatarColor.Male },

    { id: "2-2", name: "최명숙", gender: "female", generation: 2, parentId: "2", occupation: null, bio: "여주", spouseId: "2-2-S", avatarColor: AvatarColor.Female },
    { id: "2-2-S", name: "김영국", gender: "male", generation: 2, parentId: null, occupation: null, bio: "여주", spouseId: "2-2", avatarColor: AvatarColor.Male },

    { id: "2-3", name: "최명랑", gender: "female", generation: 2, parentId: "2", occupation: null, bio: "울산", spouseId: "2-3-S", avatarColor: AvatarColor.Female },
    { id: "2-3-S", name: "김광남", gender: "male", generation: 2, parentId: null, occupation: null, bio: "울산", spouseId: "2-3", avatarColor: AvatarColor.Male },

    { id: "2-4", name: "최춘석", gender: "male", generation: 2, parentId: "2", occupation: null, bio: "우방", spouseId: "2-4-S", avatarColor: AvatarColor.Male },
    { id: "2-4-S", name: "이성미", gender: "female", generation: 2, parentId: null, occupation: null, bio: "우방", spouseId: "2-4", avatarColor: AvatarColor.Female },

    { id: "2-5", name: "최문석", gender: "male", generation: 2, parentId: "2", occupation: null, bio: "부산", spouseId: "2-5-S", avatarColor: AvatarColor.Male },
    { id: "2-5-S", name: "김혜영", gender: "female", generation: 2, parentId: null, occupation: null, bio: "부산", spouseId: "2-5", avatarColor: AvatarColor.Female },

    // ===== 2세대 (최규달 자녀) =====
    { id: "3-1", name: "최희순", gender: "female", generation: 2, parentId: "3", occupation: null, bio: "경주", spouseId: "3-1-S", avatarColor: AvatarColor.Female },
    { id: "3-1-S", name: "이유락", gender: "male", generation: 2, parentId: null, occupation: null, bio: "경주", spouseId: "3-1", avatarColor: AvatarColor.Male },

    { id: "3-2", name: "최정호", gender: "male", generation: 2, parentId: "3", occupation: null, bio: "구룡포", spouseId: "3-2-S", avatarColor: AvatarColor.Male },
    { id: "3-2-S", name: "이정애", gender: "female", generation: 2, parentId: null, occupation: null, bio: "구룡포", spouseId: "3-2", avatarColor: AvatarColor.Female },

    { id: "3-3", name: "최철호", gender: "male", generation: 2, parentId: "3", occupation: null, bio: null, spouseId: null, avatarColor: AvatarColor.Male },

    { id: "3-4", name: "최성호", gender: "male", generation: 2, parentId: "3", occupation: null, bio: "청주", spouseId: "3-4-S", avatarColor: AvatarColor.Male },
    { id: "3-4-S", name: "조현주", gender: "female", generation: 2, parentId: null, occupation: null, bio: "청주", spouseId: "3-4", avatarColor: AvatarColor.Female },

    // ===== 3세대 (최경자 자녀) =====
    { id: "1-1-1", name: "이은실", gender: "female", generation: 3, parentId: "1-1", occupation: null, bio: null, spouseId: "1-1-1-S", avatarColor: AvatarColor.Female },
    { id: "1-1-1-S", name: "황헌구", gender: "male", generation: 3, parentId: null, occupation: null, bio: null, spouseId: "1-1-1", avatarColor: AvatarColor.Male },

    // ===== 3세대 (최명숙 자녀) =====
    { id: "1-2-1", name: "김혜련", gender: "female", generation: 3, parentId: "1-2", occupation: null, bio: null, spouseId: "1-2-1-S", avatarColor: AvatarColor.Female },
    { id: "1-2-1-S", name: "김규범", gender: "male", generation: 3, parentId: null, occupation: null, bio: null, spouseId: "1-2-1", avatarColor: AvatarColor.Male },

    // ===== 3세대 (최명남 자녀) =====
    { id: "1-3-1", name: "김지은", gender: "female", generation: 3, parentId: "1-3", occupation: null, bio: null, spouseId: null, avatarColor: AvatarColor.Female },
    { id: "1-3-2", name: "김세용", gender: "male", generation: 3, parentId: "1-3", occupation: null, bio: null, spouseId: "1-3-2-S", avatarColor: AvatarColor.Male },
    { id: "1-3-2-S", name: "???", gender: "female", generation: 3, parentId: null, occupation: null, bio: null, spouseId: "1-3-2", avatarColor: AvatarColor.Female },

    // ===== 3세대 (최시훈 자녀) =====
    { id: "1-4-1", name: "최수빈", gender: "female", generation: 3, parentId: "1-4", occupation: null, bio: null, spouseId: null, avatarColor: AvatarColor.Female },
    { id: "1-4-2", name: "최리", gender: "male", generation: 3, parentId: "1-4", occupation: null, bio: null, spouseId: null, avatarColor: AvatarColor.Male },

    // ===== 3세대 (최현숙 자녀) =====
    { id: "2-1-1", name: "남종모", gender: "male", generation: 3, parentId: "2-1", occupation: null, bio: "미국", spouseId: "2-1-1-S", avatarColor: AvatarColor.Male },
    { id: "2-1-1-S", name: "박상현", gender: "female", generation: 3, parentId: null, occupation: null, bio: "영덕출신 미국", spouseId: "2-1-1", avatarColor: AvatarColor.Female },
    { id: "2-1-2", name: "남효진", gender: "female", generation: 3, parentId: "2-1", occupation: null, bio: "서울 마곡", spouseId: "2-1-2-S", avatarColor: AvatarColor.Female },
    { id: "2-1-2-S", name: "김용범", gender: "male", generation: 3, parentId: null, occupation: null, bio: "서울 마곡", spouseId: "2-1-2", avatarColor: AvatarColor.Male },

    // ===== 3세대 (최명숙 자녀) =====
    { id: "2-2-1", name: "김지형", gender: "male", generation: 3, parentId: "2-2", occupation: null, bio: "라오스", spouseId: "2-2-1-S", avatarColor: AvatarColor.Male },
    { id: "2-2-1-S", name: "띠아", gender: "female", generation: 3, parentId: null, occupation: null, bio: "라오스", spouseId: "2-2-1", avatarColor: AvatarColor.Female },
    { id: "2-2-2", name: "김민경", gender: "female", generation: 3, parentId: "2-2", occupation: null, bio: "일본", spouseId: null, avatarColor: AvatarColor.Female },

    // ===== 3세대 (최명랑 자녀) =====
    { id: "2-3-1", name: "김소희", gender: "female", generation: 3, parentId: "2-3", occupation: null, bio: "서울", spouseId: null, avatarColor: AvatarColor.Female },
    { id: "2-3-2", name: "김현정", gender: "female", generation: 3, parentId: "2-3", occupation: null, bio: "제네바", spouseId: "2-3-2-S", avatarColor: AvatarColor.Female },
    { id: "2-3-2-S", name: "시릴 휴즈", gender: "male", generation: 3, parentId: null, occupation: null, bio: "제네바", spouseId: "2-3-2", avatarColor: AvatarColor.Male },

    // ===== 3세대 (최춘석 자녀) =====
    { id: "2-4-1", name: "최진혁", gender: "male", generation: 3, parentId: "2-4", occupation: null, bio: null, spouseId: "2-4-1-S", avatarColor: AvatarColor.Male },
    { id: "2-4-1-S", name: "허가윤", gender: "female", generation: 3, parentId: null, occupation: null, bio: null, spouseId: "2-4-1", avatarColor: AvatarColor.Female },
    { id: "2-4-2", name: "최진영", gender: "male", generation: 3, parentId: "2-4", occupation: "척척박사", bio: null, spouseId: null, avatarColor: AvatarColor.Male },

    // ===== 3세대 (최문석 자녀) =====
    { id: "2-5-1", name: "최진호", gender: "male", generation: 3, parentId: "2-5", occupation: null, bio: "천안아산", spouseId: null, avatarColor: AvatarColor.Male },
    { id: "2-5-2", name: "최소정", gender: "female", generation: 3, parentId: "2-5", occupation: null, bio: "문의는 저에게", spouseId: null, avatarColor: AvatarColor.Female },

    // ===== 3세대 (최희순 자녀) =====
    { id: "3-1-1", name: "이선아", gender: "female", generation: 3, parentId: "3-1", occupation: null, bio: null, spouseId: null, avatarColor: AvatarColor.Female },
    { id: "3-1-2", name: "이영준", gender: "male", generation: 3, parentId: "3-1", occupation: null, bio: null, spouseId: null, avatarColor: AvatarColor.Male },

    // ===== 3세대 (최정호 자녀) =====
    { id: "3-2-1", name: "최재원", gender: "male", generation: 3, parentId: "3-2", occupation: null, bio: null, spouseId: "3-2-1-S", avatarColor: AvatarColor.Male },
    { id: "3-2-1-S", name: "김채은", gender: "female", generation: 3, parentId: null, occupation: null, bio: null, spouseId: "3-2-1", avatarColor: AvatarColor.Female },
    { id: "3-2-2", name: "최재혁", gender: "male", generation: 3, parentId: "3-2", occupation: null, bio: "서울", spouseId: "3-2-2-S", avatarColor: AvatarColor.Male },
    { id: "3-2-2-S", name: "김예울", gender: "female", generation: 3, parentId: null, occupation: null, bio: "서울", spouseId: "3-2-2", avatarColor: AvatarColor.Female },

    // ===== 3세대 (최철호 자녀) =====
    { id: "3-3-1", name: "최소윤", gender: "female", generation: 3, parentId: "3-3", occupation: null, bio: null, spouseId: null, avatarColor: AvatarColor.Female },
    { id: "3-3-2", name: "최원재", gender: "male", generation: 3, parentId: "3-3", occupation: null, bio: null, spouseId: null, avatarColor: AvatarColor.Male },

    // ===== 3세대 (최성호 자녀) =====
    { id: "3-4-1", name: "최정윤", gender: "female", generation: 3, parentId: "3-4", occupation: null, bio: null, spouseId: "3-4-1-S", avatarColor: AvatarColor.Female },
    { id: "3-4-1-S", name: "연승주", gender: "male", generation: 3, parentId: null, occupation: null, bio: null, spouseId: "3-4-1", avatarColor: AvatarColor.Male },
    { id: "3-4-2", name: "최영규", gender: "male", generation: 3, parentId: "3-4", occupation: null, bio: null, spouseId: "3-4-2-S", avatarColor: AvatarColor.Male },
    { id: "3-4-2-S", name: "양은하", gender: "female", generation: 3, parentId: null, occupation: null, bio: null, spouseId: "3-4-2", avatarColor: AvatarColor.Female },

    // ===== 4세대 =====
    // (이은실 자녀)
    { id: "1-1-1-1", name: "황서영", gender: "female", generation: 4, parentId: "1-1-1", occupation: null, bio: null, spouseId: null, avatarColor: AvatarColor.Female },
    { id: "1-1-1-2", name: "황수영", gender: "female", generation: 4, parentId: "1-1-1", occupation: null, bio: null, spouseId: null, avatarColor: AvatarColor.Female },

    // (김혜련 자녀)
    { id: "1-2-1-1", name: "김태영", gender: "male", generation: 4, parentId: "1-2-1", occupation: null, bio: null, spouseId: null, avatarColor: AvatarColor.Male },
    { id: "1-2-1-2", name: "김태성", gender: "male", generation: 4, parentId: "1-2-1", occupation: null, bio: null, spouseId: null, avatarColor: AvatarColor.Male },
    { id: "1-2-1-3", name: "김??", gender: "male", generation: 4, parentId: "1-2-1", occupation: null, bio: "미국 거주", spouseId: null, avatarColor: AvatarColor.Male },
    { id: "1-2-1-4", name: "김??", gender: "male", generation: 4, parentId: "1-2-1", occupation: null, bio: "미국 거주", spouseId: null, avatarColor: AvatarColor.Male },

    // (김지은 자녀)
    { id: "1-3-1-1", name: "김채은", gender: "female", generation: 4, parentId: "1-3-1", occupation: null, bio: null, spouseId: null, avatarColor: AvatarColor.Female },

    // (김세용 자녀)
    { id: "1-3-2-1", name: "???", gender: "male", generation: 4, parentId: "1-3-2", occupation: null, bio: null, spouseId: null, avatarColor: AvatarColor.Male },
    { id: "1-3-2-2", name: "???", gender: "male", generation: 4, parentId: "1-3-2", occupation: null, bio: null, spouseId: null, avatarColor: AvatarColor.Male },

    // (남종모 자녀)
    { id: "2-1-1-1", name: "남현준로건", gender: "male", generation: 4, parentId: "2-1-1", occupation: "응애", bio: "미국", spouseId: null, avatarColor: AvatarColor.Male },

    // (남효진 자녀)
    { id: "2-1-2-1", name: "김지아", gender: "female", generation: 4, parentId: "2-1-2", occupation: "어린이", bio: null, spouseId: null, avatarColor: AvatarColor.Female },
    { id: "2-1-2-2", name: "김지성", gender: "male", generation: 4, parentId: "2-1-2", occupation: "어린이", bio: null, spouseId: null, avatarColor: AvatarColor.Male },
    { id: "2-1-2-3", name: "김지호", gender: "male", generation: 4, parentId: "2-1-2", occupation: "어린이", bio: null, spouseId: null, avatarColor: AvatarColor.Male },

    // (김현정 자녀)
    { id: "2-3-2-1", name: "휴즈 민석", gender: "male", generation: 4, parentId: "2-3-2", occupation: "어린이", bio: null, spouseId: null, avatarColor: AvatarColor.Male },
    { id: "2-3-2-2", name: "휴즈 민준", gender: "male", generation: 4, parentId: "2-3-2", occupation: "응애", bio: null, spouseId: null, avatarColor: AvatarColor.Female },

    // (최재원 자녀)
    { id: "3-2-1-1", name: "최우준", gender: "male", generation: 4, parentId: "3-2-1", occupation: "응애", bio: null, spouseId: null, avatarColor: AvatarColor.Male },

    // (최재혁 자녀)
    { id: "3-2-2-1", name: "최설아", gender: "female", generation: 4, parentId: "3-2-2", occupation: "응애", bio: null, spouseId: null, avatarColor: AvatarColor.Female },

    // (최정윤 자녀)
    { id: "3-4-1-1", name: "연수호", gender: "male", generation: 4, parentId: "3-4-1", occupation: "응애", bio: null, spouseId: null, avatarColor: AvatarColor.Male },

    // (최영규 자녀)
    { id: "3-4-2-1", name: "최예린", gender: "female", generation: 4, parentId: "3-4-2", occupation: "응애", bio: null, spouseId: null, avatarColor: AvatarColor.Female },
    { id: "3-4-2-2", name: "최하준", gender: "male", generation: 4, parentId: "3-4-2", occupation: "응애", bio: null, spouseId: null, avatarColor: AvatarColor.Male },
  ],
};
