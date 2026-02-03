import { CharacterProfile, WorldLore, DialogueFrame, CommunityPost, GalleryData } from './types';

export const INTRO_TEXTS = [
  "영원한 삶을 사는 고대의 존재여...",
  "500년의 잠에서 깨어난 기분은 어떤가요?",
  "피는 물보다 진하지만,",
  "황금은 그 피보다 빛나는 법.",
  "탐욕의 도시 천류(天流)의 지하 금고.",
  "카시미 자매가 당신을 '소유'합니다."
];

export const PROLOGUE_SCRIPT: DialogueFrame[] = [
  { id: 1, speakerId: 'lin', text: "어머, 드디어 눈을 뜨셨네? 우리의 비싼 '고대 유물' 님." },
  { id: 2, speakerId: 'ran', text: "...구속 마법, 정상 작동 중. 반항하면 바로 힘줄을 끊을게.", expression: 'guard' },
  { id: 3, speakerId: 'lin', text: "란, 손님에게 예의를 지켜야지. 무려 500년 묵은 '진조(True Ancestor)' 뱀파이어시라구." },
  { id: 4, speakerId: 'lin', text: "당신을 관짝에서 꺼내느라 든 비용이 얼만지 알아요? 인부들 입막음 비용만 금화 5천 닢이었어.", expression: 'arrogant' },
  { id: 5, speakerId: 'ran', text: "언니, 이 녀석... 위험해. 피 냄새가... 평범한 마물과는 달라.", expression: 'guard' },
  { id: 6, speakerId: 'lin', text: "그러니까 돈이 되는 거야. 그 고귀한 피, 한 방울도 남김없이 팔아치울 거니까.", expression: 'seduction' },
  { id: 7, speakerId: 'lin', text: "자, 환영해요. 카시미 백작가의 지하 감... 아니, '살롱'에 온 걸." },
  { id: 8, speakerId: 'lin', text: "이제부터 당신은 제 '자산'이에요. 거부는... 거절할게요?", expression: 'seduction' },
];

export const INITIAL_COMMUNITY_POSTS: CommunityPost[] = [
  {
    id: 'post-1',
    author: '익명의_용병',
    avatarColor: 'bg-stone-600',
    content: '야, 이번에 카시미 가문이 북쪽 유적지에서 뭔가 엄청난 걸 건져왔다던데? 관짝 하나 옮기는데 호위만 50명이 붙었대.',
    likes: 124,
    comments: [
      { id: 'c1', author: '호기심_천국', avatarColor: 'bg-green-700', content: '보물인가요? 아니면 마수?', timestamp: '방금 전' },
      { id: 'c2', author: '생존자', avatarColor: 'bg-red-800', content: '피 냄새가 진동을 하더군요. 가까이 가지 마세요.', timestamp: '10분 전' }
    ],
    timestamp: '2시간 전',
    tags: ['소문', '유물']
  },
  {
    id: 'post-2',
    author: '홍등가_정보상',
    avatarColor: 'bg-purple-900',
    content: '린 백작님이 최근 고대어 번역가를 비밀리에 구하신답니다. 보수는 선불 금화 100닢. 근데 살아서 나온 번역가가 없다는 소문이...',
    likes: 56,
    comments: [
      { id: 'c3', author: '겁쟁이_학자', avatarColor: 'bg-pink-800', content: '고대 흡혈귀 언어 아닌가요? 난 안 갈래...', timestamp: '1시간 전' }
    ],
    timestamp: '5시간 전',
    tags: ['구인', '위험']
  },
  {
    id: 'post-3',
    author: '경비병A',
    avatarColor: 'bg-blue-800',
    content: '오늘 새벽에 저택 지하에서 쾅! 하는 소리 들리지 않았음? 란 님이 피 묻은 가위 들고 나오는 거 봤는데... 소름 돋네.',
    likes: 289,
    comments: [
      { id: 'c4', author: '기사단장(진)', avatarColor: 'bg-stone-500', content: '헛소문 퍼뜨리면 영창이다. 쥐새끼 잡은 거겠지.', timestamp: '30분 전' },
      { id: 'c5', author: '경비병A', avatarColor: 'bg-blue-800', content: '아니 쥐새끼가 사람만 하다니까요;;', timestamp: '29분 전' }
    ],
    timestamp: '어제',
    tags: ['목격담']
  }
];

export const GALLERY_CONTENT: GalleryData = {
  lin: {
    daily: [
      { title: '기본 초상화', url: 'https://i.ifh.cc/t4RLSk.webp' },
      { title: '업무중', url: 'https://i.ifh.cc/mHVjfw.png' },
      { title: '미소', url: 'https://i.ifh.cc/3l2RSs.png' },
      { title: '유혹', url: 'https://i.ifh.cc/G750b2.png' },
      { title: '욕정', url: 'https://i.ifh.cc/RwS8wC.png' },
      { title: '부끄러움', url: 'https://i.ifh.cc/MWYRjS.png' },
      { title: '수줍음', url: 'https://i.ifh.cc/96PSoZ.png' },
      { title: '놀람', url: 'https://i.ifh.cc/aOJTv3.png' },
      { title: '분노', url: 'https://i.ifh.cc/mt6Cb9.png' },
      { title: '눈물', url: 'https://i.ifh.cc/Xs8lVq.png' },
      { title: '지침', url: 'https://i.ifh.cc/hPDLxT.png' },
      { title: '흡혈당함', url: 'https://i.ifh.cc/dv8jzm.png' },
      { title: '각성', url: 'https://i.ifh.cc/AVCdMK.png' },
      { title: '전투 (근접)', url: 'https://i.ifh.cc/VS2TZZ.png' },
      { title: '전투 (원거리)', url: 'https://i.ifh.cc/lrK3cB.png' },
    ],
    r18: [] // Placeholder
  },
  ran: {
    daily: [
      { title: '기본 초상화', url: 'https://i.ifh.cc/YtQX5s.png' },
      { title: '경계', url: 'https://i.ifh.cc/cd1kvN.png' },
      { title: '호기심', url: 'https://i.ifh.cc/2sHG5t.png' },
      { title: '고민', url: 'https://i.ifh.cc/Jl7z3o.png' },
      { title: '자신만만', url: 'https://i.ifh.cc/74lCat.png' },
      { title: '과시', url: 'https://i.ifh.cc/y7LZQX.png' },
      { title: '눈물', url: 'https://i.ifh.cc/5PWPSJ.png' },
      { title: '졸림', url: 'https://i.ifh.cc/H6ADtB.png' },
      { title: '부끄러움', url: 'https://i.ifh.cc/VfmPJN.png' },
      { title: '미소', url: 'https://i.ifh.cc/l2sRcy.png' },
      { title: '전투 (근접)', url: 'https://i.ifh.cc/1VKvlD.png' },
      { title: '전투 (원거리)', url: 'https://i.ifh.cc/gBchl3.png' },
      { title: '흡혈당함', url: 'https://i.ifh.cc/sKlKtG.png' },
    ],
    r18: [] // Placeholder
  }
};

export const CHARACTERS: CharacterProfile[] = [
  {
    id: 'lin',
    name: '린 카시미',
    engName: 'Lin Cashimi',
    title: '천류(天流)의 마녀 | 자색 독사',
    quote: "피는 물보다 진하지만, 황금은 그 피보다 빛나는 법이죠.",
    colorTheme: 'purple',
    imagePlaceholder: 'https://i.ifh.cc/t4RLSk.webp', 
    expressions: {
      arrogant: 'https://i.ifh.cc/mt6Cb9.png', 
      seduction: 'https://i.ifh.cc/G750b2.png'
    },
    description: "카시미 백작가의 가주 대행이자 천재적인 대상인. 아름다운 외모 뒤에 철저한 계산과 탐욕을 숨기고 있다. 대담한 통솔자(ENTJ-A)이자 쾌락주의자(7w8)인 그녀에게 세상은 거대한 장기판이며, 모든 인간은 가격표가 붙은 말일 뿐이다. '비겁함'은 그녀에게 욕이 아니라 최고의 칭찬이다. 오직 여동생 란에게만은 계산기를 두드리지 않고 헌신하는 극도의 시스콤.",
    
    stats: {
      rank: '2성역 (재력/지략)',
      str: '★☆☆☆☆ (1성역)',
      int: '★★★★★ (모략)',
      cha: '★★★★★ (매수)',
      special: '자색 안개 (환각/맹독)',
    },

    personalInfo: {
      age: "22세 (271년 12월 18일생)",
      height: "162cm / 49kg (D컵)",
      appearance: "허리까지 내려오는 자색 히메컷 생머리. 율 국의 기모노 라인과 오르테나의 코르셋/레이스를 결합한 파격적인 퓨전 의상(오프숄더, 옆트임). 감정과 마력에 따라 색이 변하는 날카로운 고양이상 눈매(주로 자색). 왼쪽 눈 밑에 눈물점이 있다.",
      personality: "돈벌레, 쾌락주의, 내로남불, 계산적, 워커홀릭. 여동생에게 집착한다.",
      likes: ["담배(곰방대)", "돈(황금)", "란(여동생)", "업무", "홍차"],
      dislikes: ["외상", "가난", "명예를 들먹이는 기사", "쓴 약"],
    },

    combatInfo: {
      style: "아이템 유저(Item User) & 환술사. 돈으로 바른 아티팩트와 스크롤을 난사한다.",
      weakness: "근접전, 란이 인질로 잡히는 상황.",
      weapon: "최고급 비단 부채, 기다란 곰방대, 장부(대륙 주요 인사의 약점 기록).",
      abilities: [
        "자색 안개(Purple Haze): 곰방대에서 뿜어내는 특수 신경독. 환각을 보게 하거나 마비를 일으킨다.",
        "부적 도술: 율 국 스타일의 폭발/방어 부적.",
        "매수(Bribery): 적을 돈으로 매수하여 아군으로 만든다.",
        "골든 실드: 최고급 방어 스크롤을 찢어 절대 방어막 형성."
      ]
    },

    history: "율 국의 조공국이었던 (구)카시미 왕국 출신. 243년 율 국의 내전 당시 조국을 배신하고 오르테나로 망명했다. 어린 시절 귀족들의 멸시와 아버지의 질투를 받았으나, 오히려 그 아버지를 정치 공작으로 무너뜨리고 가주 대행의 자리에 올랐다. 현재 천류 지구의 살롱 드 비올레를 운영하며 막대한 부를 축적 중이다.",

    voiceLines: [
      { label: "첫 만남", text: "어서 오세요, 카시미 상회에. 무엇을 팔러 오셨나요? 양심? 아니면... 목숨?" },
      { label: "전투 개시", text: "어머, 제 드레스에 피가 튀면 세탁비 청구할 거예요." },
      { label: "자산 선언", text: "이제부터 당신은 제 '자산'이에요. 거부는... 거절할게요?" },
      { label: "동생 관련", text: "나의 예쁜 그림자, 란. 건드리면 아주 비싼 값을 치르게 될 거야." }
    ],

    relationships: [
      { targetId: 'ran', name: '란 카시미', relation: '나의 예쁜 그림자', description: "유일하게 계산기 두드리지 않고 사랑하는 존재. 란을 위해서라면 전 재산을 태울 수도 있다." },
      { targetId: 'vercia', name: '베르시아 공주', relation: '우아한 호구님', description: "왕실의 사치품을 전담 공급하며 막대한 이득을 챙기는 중." },
      { targetId: 'knights', name: '기사단', relation: '멍청이들', description: "명예 타령하다가 빚 갚으러 올 때가 제일 웃겨." }
    ],

    episode: {
      title: "검보다 비싼 스테이크",
      content: "오르테나의 강경파 백작이 '매국노의 계집'이라며 행패를 부렸을 때, 린은 미소 지으며 스테이크를 대접했다. 백작이 고기를 썰기 위해 나이프를 집어 들었을 때, 그는 경악했다. 그 나이프는 빚 때문에 경매에 넘어갔던 자신의 '가문 보검'을 녹여 만든 것이었기 때문이다. \n\n'어머, 절삭력이 좋아서 고기가 잘 썰리죠? 역시 명검이라니까요♥.' \n\n백작은 거품을 물고 쓰러졌고, 린은 유유히 곰방대 연기를 내뿜었다."
    }
  },
  {
    id: 'ran',
    name: '란 카시미',
    engName: 'Ran Cashimi',
    title: '천류(天流)의 유령 | 침묵의 가위',
    quote: "언니가 너무 눈부셔서... 아무도 날 못 찾았으면 좋겠어.",
    colorTheme: 'slate',
    imagePlaceholder: 'https://i.ifh.cc/YtQX5s.png', 
    expressions: {
      guard: 'https://i.ifh.cc/cd1kvN.png'
    },
    description: "린의 전용 비서이자 가문 관리자, 그리고 암살자. 린과 정반대로 말이 없고 내향적(ISTP-T)이다. 살인을 감정이 없는 '청소'나 '업무'로 여기는 잔혹한 순수함을 가졌다. 언니 린을 자신의 세상이자 전부로 여기며 맹목적으로 헌신한다. 평소엔 존재감이 희미하여 '유령'이라 불린다.",
    
    stats: {
      rank: '3성역 (무력)',
      str: '★★★☆☆ (신체능력)',
      int: '★★★☆☆ (전술)',
      cha: '★☆☆☆☆ (공포)',
      special: '무영사 (보이지 않는 실)',
    },

    personalInfo: {
      age: "22세 (271년 12월 18일생)",
      height: "162cm / 49kg (E컵/압박붕대)",
      appearance: "린과 거의 똑같은 외모지만 허리까지 내려오는 검푸른 생머리를 가졌다. 감정과 마력에 따라 색이 변하는 눈(주로 검푸른색). 경계심 많은 날카로운 고양이상. 가슴을 압박붕대로 감고 있으며, 율 국 스타일의 오프숄더 기모노를 입는다.",
      personality: "내향적, 효율주의, 언니바라기, 대인기피, 잔혹한 순수함.",
      likes: ["린(언니)", "가위", "뜨개질", "고양이"],
      dislikes: ["시끄러운 사람", "복잡한 계산", "언니를 욕하는 자", "매운 음식"],
    },

    combatInfo: {
      style: "암살자 & 퍼펫 마스터. 기척을 지우고 접근하여 급소를 노린다.",
      weakness: "린이 위험한 상황(이성을 잃음), 화염 마법.",
      weapon: "카타나, 속박 부적, 소매와 머리카락에 숨겨둔 무수한 독침.",
      abilities: [
        "암살 검술: 소리 없이 적의 목을 베는 기술.",
        "무영사(Shadow Thread): 눈에 보이지 않는 실로 적을 베거나 묶는다.",
        "마리오네트: 실을 연결하여 적의 시체나 산 사람을 조종한다.",
        "속박형 부적: 적의 움직임을 봉쇄한다."
      ]
    },

    history: "린과 함께 (구)카시미 왕국에서 태어났다. 린이 빛나는 곳에서 활약할 때, 그림자 속에서 더러운 일들을 도맡아 처리해왔다. 하지만 이를 희생이라 생각하지 않으며, 오히려 언니가 더러운 것을 보지 않게 하려는 자발적인 헌신이다.",

    voiceLines: [
      { label: "헌신", text: "이 손은... 언니가 더러운 거 만지기 싫어해서 있는 거야. 언니는 예쁜 것만 만져. 더러운 건 내가 다 치울게." },
      { label: "임무 수행", text: "아저씨 사연은... 폐기 처분 보고서에 들어갈 칸이 없어요. 조용히 해주세요. 시끄러우면 예쁘게 안 썰리거든요." },
      { label: "진심", text: "응. 언니가 너무 눈부셔서... 아무도 날 못 찾았으면 좋겠어." },
      { label: "경고", text: "더 다가오면... 잘라버립니다." }
    ],

    relationships: [
      { targetId: 'lin', name: '린 카시미', relation: '나의 세상, 내 언니', description: "망설임 없이 목숨마저 걸 수 있는 내 쌍둥이 언니. 언니에게 안겨있는 것을 가장 좋아한다." },
      { targetId: 'father', name: '카시미 백작', relation: '제거 대상', description: "아버지가 언니를 귀찮게 하면 조용히 수면제를 타서 재워버린다." },
      { targetId: 'cats', name: '길고양이', relation: '친구', description: "유일하게 마음을 여는 인간 외의 존재들." }
    ],

    episode: {
      title: "환불은 불가합니다",
      content: "한 귀족이 도자기가 가짜라며 린에게 행패를 부린 날 밤, 그는 천장에 매달린 채 눈을 떴다. 보이지 않는 실이 사지를 묶고 있었고, 어둠 속에서 하얀 가면을 쓴 여자가 뜨개질 바늘을 닦고 있었다. \n\n'저기요... 고객님? 저희 언니 얼굴은 도자기보다 비싸거든요...?' \n\n다음 날 귀족은 전 재산을 기부하고 출가했다. 란은 그 '합의금'으로 언니에게 줄 보라색 목도리를 떴다."
    }
  }
];

export const WORLD_LORE: WorldLore[] = [
  {
    title: "카시미 백작가",
    subtitle: "황금 동전을 휘감은 쌍두사",
    content: "'명예보다는 돈, 돈보다는 목숨.' 동방과 서방의 경계, 탐욕의 도시 천류(天流)를 지배하는 실리주의 가문.",
    tags: ["상인", "정보", "암살", "중립", "쌍생아의 저주"],
    clearanceLevel: "Level 4 (Confidential)",
    details: [
      "카시미 가문은 구 동방 율 국의 속령, 카시미아 왕국의 후예입니다. 50년 전(243년) 율 국의 내전 당시 '평화적 배신'으로 오르테나 왕국에 망명하여 백작 작위를 받았습니다. 이들에게 '비겁함'은 욕이 아니라 생존을 위한 최고의 칭찬입니다.",
      "가문의 상징인 '황금 동전을 휘감은 쌍두사'는 각각 동방(정보)과 서방(자본)을 바라보며, 몸통은 이익을 놓치지 않겠다는 탐욕을 상징합니다. 현재 오르테나 왕국 재정의 40%를 담당하는 '왕국의 지갑'이자, 뒷세계 최고의 정보 길드입니다.",
      "그들은 정규 기사단 대신 돈으로 매수한 용병대 '금의 용병대'와 란 카시미 직속의 암살 부대 '가위(The Scissors)'를 운용합니다."
    ],
    secretNote: "가문에는 '쌍생아의 저주'가 있다. 쌍둥이가 태어나면 가문은 번성하지만, 둘 중 하나는 '빛(가주)'이 되고 다른 하나는 '그림자(호위)'가 되어 희생해야 한다는 징크스다. 린과 란 자매는 이 썩어빠진 전통을 끊고 함께 행복해지기 위해 발버둥 치고 있다."
  },
  {
    title: "천류 (天流) 지구",
    subtitle: "욕망의 하수구이자 은하수",
    content: "대륙의 모든 욕망이 흘러들어오는 곳. 오르테나 왕국 동쪽 끝, 율 국과 맞닿은 협곡에 건설된 중립 무역 도시.",
    tags: ["무역", "홍등가", "카시미 영지", "치외법권"],
    clearanceLevel: "Level 2 (Restricted)",
    details: [
      "오르테나 왕국 동쪽 끝 거대한 협곡에 건설된 천류 지구는 율 국과 서방을 잇는 유일한 관문입니다. 50년 전의 고풍스러운 건물들과 최신 마도 공학이 결합된 기묘한 풍경을 자랑합니다.",
      "도시의 '홍등(Red Lantern) 거리'는 율 국 풍의 유흥가로, 인간으로 둔갑한 요괴들이 손님을 맞이하기도 합니다. 반면 '황금 항구'는 하루에 오가는 금화의 양이 왕국 1년 예산과 맞먹는 물류 허브입니다.",
      "영지 중앙에는 카시미 가문의 저택 '살롱 드 비올레'가, 지하에는 노예 경매와 불법 아티팩트 거래가 이루어지는 '검은 창고'가 존재합니다. 이곳은 왕국의 법이 닿지 않는 치외법권 구역입니다."
    ],
    secretNote: "최근 천류 지구 지하 하수도에서 마왕군 첩자들이 목격되었다는 보고가 있다. 린 카시미가 마왕군과 비밀리에 접촉하여 '전쟁이 나더라도 우리 상단은 건드리지 않는다'는 보험을 들어두었다는 소문이 사실로 확인되고 있다."
  },
  {
    title: "동방 제국 율(Yul)",
    subtitle: "안개 속의 신비 제국",
    content: "법칙이 흐트러진 곳에 요괴가 깃들고, 규율이 선 곳에 신령이 깃든다. 인간과 요괴가 공존하는 법치 국가.",
    tags: ["동양 판타지", "도술", "요괴", "운백령"],
    clearanceLevel: "Level 5 (Top Secret)",
    details: [
      "오르테나 왕국의 동쪽, '침묵의 바다' 건너편에 위치한 거대한 제국입니다. 서양의 마법 대신 '도술'과 '기(氣)'를 사용하며, 인간과 요괴가 황제의 법 아래 공존하는 독특한 사회 체계를 가집니다.",
      "수도 '운경'은 구름 위에 떠 있는 공중 도시이며, 통치자 황제 운백령은 '천리와 법치'를 절대적인 가치로 여깁니다. 서방 국가들을 야만인이라 부르며 경멸하지만, 카시미 가문을 통해 서방의 문물을 받아들이고 있습니다.",
      "제국의 모든 요괴는 '신명록'에 이름을 등록해야 하며, 등록되지 않은 요괴는 마물로 규정되어 '착호갑사'에게 토벌당합니다."
    ],
    secretNote: "황제 운백령은 현세의 정점인 '백룡'의 힘을 계승한 초월적 존재다. 그는 배신자 가문의 후예인 린과 란이 서방 세계를 휘젓고 다니며 균열을 내주기를 기대하고 있다. 특히 란에게 내재된 고대 요괴의 힘을 눈여겨보고 있으며, 언젠가 이를 회수할 계획이다."
  },
  {
    title: "오르테나 왕국",
    subtitle: "부패한 황금 사자",
    content: "빛바랜 영광의 사자, 썩어가는 황금의 옥좌. 기사도를 숭상하지만 내부의 부패와 마왕군의 침투로 무너져가는 서방의 맹주.",
    tags: ["서양 판타지", "기사", "부패", "마왕군 침투"],
    clearanceLevel: "Level 3 (Secret)",
    details: [
      "대륙 중앙에 위치한 서양 판타지 기반의 왕국입니다. '신앙과 기사도'를 이념으로 삼고 있으나, 현재는 극심한 빈부격차와 귀족들의 부정부패로 곪아가고 있습니다.",
      "국왕은 허수아비이며, 실권자인 베르시아 공주가 고군분투하고 있지만 국가 재정의 40%를 카시미 가문에 빚지고 있는 상황입니다. '사자의 송곳니' 기사단과 '푸른 탑' 마법사 부대 등 강력한 무력을 보유하고 있지만, 지휘 체계의 난맥상으로 인해 효율적인 작전 수행이 불가능합니다.",
      "최근 북부 국경 '아이기스 방어선'에서의 마물 침공이 잦아지며 국가적 위기감이 고조되고 있습니다."
    ],
    secretNote: "국왕은 이미 수년 전 사망했고, 지금 옥좌에 앉아있는 것은 마왕군 흑마법사가 조종하는 시체 인형이라는 첩보가 있다. 베르시아 공주는 이 사실을 알고도 왕국의 붕괴를 막기 위해 침묵하고 있으며, 카시미 가문에게 막대한 빚을 지면서까지 이 비밀을 유지하려 한다."
  }
];