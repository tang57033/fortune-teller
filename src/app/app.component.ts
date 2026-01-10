import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';

type TimeMode = 'time' | 'shichen';
type Gender = 'male' | 'female' | 'other';
type FunctionKey =
  | 'fortune'
  | 'match'
  | 'palm'
  | 'face'
  | 'fengshui'
  | 'naming'
  | 'divination'
  | 'astrology';
type TabKey = 'input' | 'output';

interface Trigram {
  name: string;
  pinyin: string;
  element: string;
  nature: string;
  direction: string;
  traits: string[];
  lineKey: string;
  lines: number[];
}

interface LineDisplay {
  value: number;
  lineIndex: number;
}

interface FortuneSection {
  title: string;
  description: string;
  advice: string;
}

interface HexagramInfo {
  symbol: string;
  name: string;
  gong: string;
  element: string;
}

interface FortuneResult {
  birthLabel: string;
  timeLabel: string;
  name: string;
  genderLabel: string;
  baseHexagram: HexagramInfo;
  changedHexagram: HexagramInfo;
  upper: Trigram;
  lower: Trigram;
  changedUpper: Trigram;
  changedLower: Trigram;
  movingLine: number;
  baseLines: LineDisplay[];
  changedLines: LineDisplay[];
  summary: string;
  elementBalance: string;
  fateNotes: string[];
  sections: FortuneSection[];
  advice: string;
}

interface MatchResult {
  maleLabel: string;
  femaleLabel: string;
  summary: string;
  details: string[];
  advice: string[];
}

interface PalmResult {
  summary: string;
  details: string[];
  advice: string[];
}

interface FaceResult {
  summary: string;
  details: string[];
  advice: string[];
}

interface FengshuiResult {
  summary: string;
  details: string[];
  advice: string[];
}

interface NameOption {
  name: string;
  meaning: string;
  reason: string;
}

interface NamingResult {
  summary: string;
  options: NameOption[];
  advice: string[];
}

interface DivinationResult {
  baseHexagram: HexagramInfo;
  changedHexagram: HexagramInfo;
  movingLine: number;
  baseLines: LineDisplay[];
  changedLines: LineDisplay[];
  summary: string;
  details: string[];
  advice: string[];
  stick: BambooStick;
}

interface HandMetrics {
  palmRatio: number;
  fingerRatio: number;
  thumbRatio: number;
  symmetryScore: number;
}

interface FaceMetrics {
  faceRatio: number;
  eyeRatio: number;
  symmetryScore: number;
}

interface BambooStick {
  number: number;
  grade: string;
  meaning: string;
  pattern: string;
  astro: string;
}

interface AstrologySection {
  title: string;
  text: string;
}

interface AstrologyResult {
  summary: string;
  sign: string;
  rising: string;
  sections: AstrologySection[];
  advice: string[];
}

const TRIGRAMS: Trigram[] = [
  {
    name: '乾',
    pinyin: 'Qian',
    element: '金',
    nature: '天',
    direction: '西北',
    traits: ['开创', '自信', '高远'],
    lineKey: '111',
    lines: [1, 1, 1]
  },
  {
    name: '兑',
    pinyin: 'Dui',
    element: '金',
    nature: '泽',
    direction: '正西',
    traits: ['悦泽', '沟通', '亲和'],
    lineKey: '110',
    lines: [1, 1, 0]
  },
  {
    name: '离',
    pinyin: 'Li',
    element: '火',
    nature: '火',
    direction: '正南',
    traits: ['明晰', '热情', '表达'],
    lineKey: '101',
    lines: [1, 0, 1]
  },
  {
    name: '震',
    pinyin: 'Zhen',
    element: '木',
    nature: '雷',
    direction: '正东',
    traits: ['行动', '突破', '生发'],
    lineKey: '100',
    lines: [1, 0, 0]
  },
  {
    name: '巽',
    pinyin: 'Xun',
    element: '木',
    nature: '风',
    direction: '东南',
    traits: ['渗透', '柔韧', '进取'],
    lineKey: '011',
    lines: [0, 1, 1]
  },
  {
    name: '坎',
    pinyin: 'Kan',
    element: '水',
    nature: '水',
    direction: '正北',
    traits: ['深潜', '洞察', '适应'],
    lineKey: '010',
    lines: [0, 1, 0]
  },
  {
    name: '艮',
    pinyin: 'Gen',
    element: '土',
    nature: '山',
    direction: '东北',
    traits: ['稳固', '收敛', '守成'],
    lineKey: '001',
    lines: [0, 0, 1]
  },
  {
    name: '坤',
    pinyin: 'Kun',
    element: '土',
    nature: '地',
    direction: '西南',
    traits: ['包容', '滋养', '顺势'],
    lineKey: '000',
    lines: [0, 0, 0]
  }
];

const SHICHEN_OPTIONS = [
  { label: '子时 (23:00-00:59)', index: 0 },
  { label: '丑时 (01:00-02:59)', index: 1 },
  { label: '寅时 (03:00-04:59)', index: 2 },
  { label: '卯时 (05:00-06:59)', index: 3 },
  { label: '辰时 (07:00-08:59)', index: 4 },
  { label: '巳时 (09:00-10:59)', index: 5 },
  { label: '午时 (11:00-12:59)', index: 6 },
  { label: '未时 (13:00-14:59)', index: 7 },
  { label: '申时 (15:00-16:59)', index: 8 },
  { label: '酉时 (17:00-18:59)', index: 9 },
  { label: '戌时 (19:00-20:59)', index: 10 },
  { label: '亥时 (21:00-22:59)', index: 11 }
];

const GENDER_OPTIONS = [
  { value: 'male', label: '男性' },
  { value: 'female', label: '女性' },
  { value: 'other', label: '其他' }
];

const TRIGRAM_SYMBOL_BY_NAME: Record<string, string> = {
  乾: '☰',
  兑: '☱',
  离: '☲',
  震: '☳',
  巽: '☴',
  坎: '☵',
  艮: '☶',
  坤: '☷'
};

const TRIGRAM_ORDER = ['☰', '☳', '☵', '☶', '☷', '☴', '☲', '☱'];

const HEXAGRAMS = [
  '䷀',
  '䷡',
  '䷄',
  '䷙',
  '䷊',
  '䷈',
  '䷍',
  '䷪',
  '䷘',
  '䷲',
  '䷂',
  '䷚',
  '䷗',
  '䷩',
  '䷔',
  '䷐',
  '䷅',
  '䷧',
  '䷜',
  '䷃',
  '䷆',
  '䷺',
  '䷿',
  '䷮',
  '䷠',
  '䷽',
  '䷦',
  '䷳',
  '䷎',
  '䷴',
  '䷷',
  '䷞',
  '䷋',
  '䷏',
  '䷇',
  '䷖',
  '䷁',
  '䷓',
  '䷢',
  '䷬',
  '䷫',
  '䷟',
  '䷯',
  '䷑',
  '䷭',
  '䷸',
  '䷱',
  '䷛',
  '䷌',
  '䷶',
  '䷾',
  '䷕',
  '䷣',
  '䷤',
  '䷝',
  '䷰',
  '䷉',
  '䷵',
  '䷻',
  '䷨',
  '䷒',
  '䷼',
  '䷥',
  '䷹'
];

const HEXAGRAM_NAMES = [
  '乾',
  '大壯',
  '需',
  '大畜',
  '泰',
  '小畜',
  '大有',
  '夬',
  '無妄',
  '震',
  '屯',
  '頤',
  '復',
  '益',
  '噬嗑',
  '隨',
  '訟',
  '解',
  '坎',
  '蒙',
  '師',
  '渙',
  '未濟',
  '困',
  '遯',
  '小過',
  '蹇',
  '艮',
  '謙',
  '漸',
  '旅',
  '咸',
  '否',
  '豫',
  '比',
  '剝',
  '坤',
  '觀',
  '晉',
  '萃',
  '姤',
  '恆',
  '井',
  '蠱',
  '升',
  '巽',
  '鼎',
  '大過',
  '同人',
  '豐',
  '既濟',
  '賁',
  '明夷',
  '家人',
  '離',
  '革',
  '履',
  '歸妹',
  '節',
  '損',
  '臨',
  '中孚',
  '睽',
  '兌'
];

const BAGONG_BAGUA = [
  { gua: ['䷀', '䷫', '䷠', '䷋', '䷓', '䷖', '䷢', '䷍'], gong: '䷀' },
  { gua: ['䷹', '䷮', '䷬', '䷞', '䷦', '䷎', '䷽', '䷵'], gong: '䷹' },
  { gua: ['䷝', '䷷', '䷱', '䷿', '䷃', '䷺', '䷅', '䷌'], gong: '䷝' },
  { gua: ['䷲', '䷏', '䷧', '䷟', '䷭', '䷯', '䷛', '䷐'], gong: '䷲' },
  { gua: ['䷸', '䷈', '䷤', '䷩', '䷘', '䷔', '䷚', '䷑'], gong: '䷸' },
  { gua: ['䷜', '䷻', '䷂', '䷾', '䷰', '䷶', '䷣', '䷆'], gong: '䷜' },
  { gua: ['䷳', '䷕', '䷙', '䷨', '䷥', '䷉', '䷼', '䷴'], gong: '䷳' },
  { gua: ['䷁', '䷗', '䷒', '䷊', '䷡', '䷪', '䷄', '䷇'], gong: '䷁' }
];

const DIZHI_WUXING: Record<string, string> = {
  子: '水',
  丑: '土',
  寅: '木',
  卯: '木',
  辰: '土',
  巳: '火',
  午: '火',
  未: '土',
  申: '金',
  酉: '金',
  戌: '土',
  亥: '水'
};

const WUXING_ORDER = ['土', '金', '水', '木', '火'];

const LINE_LABELS = ['初爻', '二爻', '三爻', '四爻', '五爻', '上爻'];

const ELEMENT_GENERATES: Record<string, string> = {
  木: '火',
  火: '土',
  土: '金',
  金: '水',
  水: '木'
};

const ELEMENT_CONTROLS: Record<string, string> = {
  木: '土',
  土: '水',
  水: '火',
  火: '金',
  金: '木'
};

const LINE_MESSAGES = [
  '初爻动，万事从微处起，适合稳步铺垫。',
  '二爻动，得中守正，行动宜循序渐进。',
  '三爻动，临界之势，注意节奏与边界。',
  '四爻动，上下相应，协作可成大事。',
  '五爻动，中正得位，机遇成熟可担当。',
  '上爻动，事至转折，宜收敛再布局。'
];

const OVERALL_TONES = [
  '气势渐升，利于启动新计划，但需把握节奏与边界，先稳住核心再扩展外缘。',
  '内外平衡，适合稳扎稳打，逐步累积成果，保持持续输出会更容易被看见。',
  '局面多变，灵活应对会带来突破与新资源，适合用小步试错换来大幅优化。',
  '能量内敛，适合深耕与沉淀，打基础比抢速度更重要，耐心会换来质变。',
  '外放推进，贵人运显现，重在抓住关键窗口，果断行动但要留出回旋空间。'
];

const CAREER_DESCRIPTIONS = [
  '事业上宜定目标、定时间表，持续推进重点事项，减少分支项目的干扰。',
  '协作关系是关键，角色分工越清晰，推进越顺畅，关键节点记得同步进度。',
  '适合调整策略或学习新技能，为转型做准备，短期内先补齐能力短板。',
  '专注细节能赢得认可，避免分心与拖延，用可交付成果建立可信度。',
  '敢于承担核心任务，可获得更大舞台，同时也要提前评估资源与风险。'
];

const CAREER_ADVICE = [
  '建议：把本周最重要的交付提前锁定，避免被琐事分散精力。',
  '建议：明确每个人的职责边界，周内做一次对齐会议。',
  '建议：优先学习能立刻上手的技能，先解决眼前瓶颈。',
  '建议：建立任务清单与里程碑，完成一个就及时复盘。',
  '建议：接住机会的同时准备备选方案，稳住节奏再发力。'
];

const LOVE_DESCRIPTIONS = [
  '爱情上保持真诚与稳定，关系更易升温，慢下来听对方的需求更有助于靠近。',
  '适合主动表达关心，细节会带来安全感，简单的陪伴胜过复杂的承诺。',
  '沟通需更柔和，避免情绪化判断，先共情再讨论问题更容易达成一致。',
  '守护彼此边界，尊重差异即可长久，给关系留出呼吸感会更舒适。',
  '新的缘分靠近，留意社交场合的信号，真诚互动会带来更清晰的进展。'
];

const LOVE_ADVICE = [
  '建议：用实际行动表达在意，例如一次专注的陪伴或倾听。',
  '建议：多制造轻松的交流场景，让关系自然升温。',
  '建议：先说感受再谈问题，避免把沟通变成争辩。',
  '建议：保持适度独立，给彼此空间才能更长久。',
  '建议：别急于下结论，循序渐进地建立信任。'
];

const FAMILY_DESCRIPTIONS = [
  '家庭氛围偏稳，适合安排共享时光与小聚，增进了解能减少误会。',
  '家中协作更顺，适合一起处理长期事务，分工明确会让效率更高。',
  '多留意长辈需求，关心会带来和气，温和的沟通比立场更重要。',
  '家务与责任需重新分配，清晰沟通更省心，别把压力都揽在自己身上。',
  '家运有上扬感，适合整理居住与生活节奏，改善环境有助于情绪稳定。'
];

const FAMILY_ADVICE = [
  '建议：主动提出一起完成的小目标，增强家庭凝聚力。',
  '建议：把重要事务写下来同步，减少遗漏与误解。',
  '建议：多问一句“需要我做什么”，更容易获得理解。',
  '建议：设定轮值或分工表，让责任清晰可见。',
  '建议：整理居家动线与收纳，让家更有秩序感。'
];

const CHILDREN_DESCRIPTIONS = [
  '子女相处需耐心引导，鼓励比责备更有效，给出可执行的小目标。',
  '适合陪伴学习与兴趣培养，小投入见成效，重在建立持续的习惯。',
  '多留意情绪变化，给予安全感与支持，倾听会比说教更能被接受。',
  '规则与自由要平衡，建立稳定的日常节律，温和但一致的规则最有效。',
  '成长机会显现，适合规划新的成长目标，阶段性复盘能看见进步。'
];

const CHILDREN_ADVICE = [
  '建议：用肯定反馈强化积极行为，少用否定式比较。',
  '建议：每天固定一小段亲子陪伴时间，重在持续。',
  '建议：先倾听再给意见，让孩子感到被尊重。',
  '建议：规则不要太多，但要长期一致地执行。',
  '建议：与孩子一起设定阶段目标并记录进步。'
];

const WEALTH_DESCRIPTIONS = [
  '财务以稳为主，避免情绪性消费，预算清晰能减少不必要的波动。',
  '适合整理资产结构，给未来留出弹性，优先保证流动性与安全边际。',
  '小额尝试更合适，保持现金流清晰，先验证再扩大投入规模。',
  '守成比冒进更稳健，谨慎评估风险，回报与风险比需做到心中有数。',
  '机会型收益显现，但要有退出计划，设好止盈止损更安心。'
];

const WEALTH_ADVICE = [
  '建议：先列支出清单，再决定可投入的范围。',
  '建议：把资金分层管理，核心资金保持稳健。',
  '建议：试水要有上限，避免一口气投入过大。',
  '建议：先评估最坏情况，再决定是否推进。',
  '建议：机会出现时保持冷静，设好止盈线。'
];

const HEALTH_DESCRIPTIONS = [
  '注意作息节律，规律比强度更重要，固定的休息时间能提升恢复效率。',
  '身心需要舒展，适合温和运动与冥想，拉伸与呼吸能缓解紧绷感。',
  '留意饮食与情绪波动，避免过度刺激，清淡与规律更适合当下。',
  '适合慢慢调养，保持稳定睡眠，优先修复精力再提高强度。',
  '行动力足，但别透支，留出恢复时间，运动后补水与放松很关键。'
];

const HEALTH_ADVICE = [
  '建议：尽量固定入睡和起床时间，先稳作息。',
  '建议：每天 10-15 分钟舒缓拉伸，缓解压力。',
  '建议：控制咖啡因与辛辣，饮食宜清淡有序。',
  '建议：先保证睡眠质量，再提高运动强度。',
  '建议：别连续高强度安排，留出恢复间隔。'
];

const IDENTITY_NOTES = [
  '以%s之名，气场更偏稳健型，适合先稳后动。',
  '以%s之名，敏锐度提升，善用直觉能打开局面。',
  '以%s之名，行动更果断，但要留意节奏控制。',
  '以%s之名，重视秩序与边界，循序渐进更稳。',
  '以%s之名，外缘助力增强，主动沟通更有利。'
];

const FUNCTION_MENU = [
  { key: 'fortune' as FunctionKey, label: '命理卦象', hint: '八卦推演个人命势' },
  { key: 'match' as FunctionKey, label: '合婚测算', hint: '两人卦象合参' },
  { key: 'palm' as FunctionKey, label: '看手相', hint: '手相结构与线象' },
  { key: 'face' as FunctionKey, label: '看面相', hint: '五官气质断语' },
  { key: 'fengshui' as FunctionKey, label: '看风水', hint: '场域与环境格局' },
  { key: 'naming' as FunctionKey, label: '新生儿取名', hint: '姓名寓意与气质' },
  { key: 'divination' as FunctionKey, label: '大事摇卦占卜', hint: '随机摇卦解象' },
  { key: 'astrology' as FunctionKey, label: '占星术', hint: '星盘轨迹解析' }
];

const DIRECTION_OPTIONS = [
  '正东',
  '东南',
  '正南',
  '西南',
  '正西',
  '西北',
  '正北',
  '东北'
];

const DIRECTION_ELEMENTS: Record<string, string> = {
  正东: '木',
  东南: '木',
  正南: '火',
  西南: '土',
  正西: '金',
  西北: '金',
  正北: '水',
  东北: '土'
};

const NAME_POOL = [
  { char: '安', meaning: '平安稳健', tags: ['health', 'steady'] },
  { char: '宁', meaning: '安宁从容', tags: ['steady'] },
  { char: '宸', meaning: '乾象高远', tags: ['noble'] },
  { char: '辰', meaning: '星辰守护', tags: ['fortune'] },
  { char: '睿', meaning: '聪慧敏锐', tags: ['wisdom'] },
  { char: '澄', meaning: '清澈明朗', tags: ['mind'] },
  { char: '煦', meaning: '温暖向阳', tags: ['warm'] },
  { char: '泽', meaning: '润泽有福', tags: ['fortune'] },
  { char: '瑾', meaning: '美玉光华', tags: ['noble'] },
  { char: '熙', meaning: '兴盛光明', tags: ['fortune'] },
  { char: '彦', meaning: '才德出众', tags: ['talent'] },
  { char: '恒', meaning: '恒心坚韧', tags: ['steady'] },
  { char: '朗', meaning: '明朗正气', tags: ['mind'] },
  { char: '怡', meaning: '和悦安然', tags: ['warm'] },
  { char: '雅', meaning: '雅正端庄', tags: ['noble'] },
  { char: '嘉', meaning: '嘉许祥瑞', tags: ['fortune'] },
  { char: '祺', meaning: '吉庆福气', tags: ['fortune'] },
  { char: '昕', meaning: '晨光初升', tags: ['hope'] },
  { char: '昊', meaning: '广阔高远', tags: ['noble'] },
  { char: '芊', meaning: '草木茂盛', tags: ['growth'] }
];

const NAME_TAG_THEMES = [
  { tag: 'health', label: '健康安稳' },
  { tag: 'fortune', label: '富贵吉顺' },
  { tag: 'wisdom', label: '聪慧灵动' },
  { tag: 'steady', label: '沉稳持守' },
  { tag: 'warm', label: '温润和气' },
  { tag: 'talent', label: '才华出众' },
  { tag: 'noble', label: '气质高雅' },
  { tag: 'hope', label: '前景光明' },
  { tag: 'growth', label: '生机旺盛' },
  { tag: 'mind', label: '心性明朗' }
];

const ZODIAC_SIGNS = [
  { name: '白羊座', start: [3, 21] },
  { name: '金牛座', start: [4, 20] },
  { name: '双子座', start: [5, 21] },
  { name: '巨蟹座', start: [6, 21] },
  { name: '狮子座', start: [7, 23] },
  { name: '处女座', start: [8, 23] },
  { name: '天秤座', start: [9, 23] },
  { name: '天蝎座', start: [10, 23] },
  { name: '射手座', start: [11, 22] },
  { name: '摩羯座', start: [12, 22] },
  { name: '水瓶座', start: [1, 20] },
  { name: '双鱼座', start: [2, 19] }
];

const ZODIAC_ELEMENTS: Record<string, string> = {
  白羊座: '火',
  狮子座: '火',
  射手座: '火',
  金牛座: '土',
  处女座: '土',
  摩羯座: '土',
  双子座: '风',
  天秤座: '风',
  水瓶座: '风',
  巨蟹座: '水',
  天蝎座: '水',
  双鱼座: '水'
};

const RISING_SIGNS = ['上升白羊', '上升金牛', '上升双子', '上升巨蟹', '上升狮子', '上升处女', '上升天秤', '上升天蝎', '上升射手', '上升摩羯', '上升水瓶', '上升双鱼'];

const BAMBOO_STICK_GRADES = [
  { range: [1, 18], grade: '上上', tone: '吉' },
  { range: [19, 36], grade: '上中', tone: '吉' },
  { range: [37, 54], grade: '中平', tone: '平' },
  { range: [55, 72], grade: '中下', tone: '慎' },
  { range: [73, 90], grade: '下中', tone: '谨' },
  { range: [91, 108], grade: '下下', tone: '警' }
];

const BAMBOO_STICK_PATTERNS = ['cloud', 'river', 'mountain', 'sun', 'moon', 'star'];
const BAMBOO_STICK_MOTIFS = ['龙', '凤', '麟', '龟', '鹤', '松', '竹', '梅', '鹊', '莲', '琴', '印'];
const PLANET_SIGNS = ['日', '月', '火星', '水星', '木星', '金星', '土星'];

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  activeFunction: FunctionKey = 'fortune';
  activeTab: TabKey = 'input';
  functionMenu = FUNCTION_MENU;
  name = '';
  birthDate = '';
  birthTime = '12:00';
  timeMode: TimeMode = 'time';
  shichenIndex = 6;
  shichenOptions = SHICHEN_OPTIONS;
  gender = '';
  genderOptions = GENDER_OPTIONS;
  result?: FortuneResult;
  errorMessage = '';
  maleName = '';
  maleBirthDate = '';
  maleBirthTime = '12:00';
  maleTimeMode: TimeMode = 'time';
  maleShichenIndex = 6;
  femaleName = '';
  femaleBirthDate = '';
  femaleBirthTime = '12:00';
  femaleTimeMode: TimeMode = 'time';
  femaleShichenIndex = 6;
  matchResult?: MatchResult;
  matchError = '';
  palmGender = '';
  palmLeftFile?: File;
  palmRightFile?: File;
  palmLeftUrl = '';
  palmRightUrl = '';
  palmResult?: PalmResult;
  palmError = '';
  faceGender = '';
  facePhotoFile?: File;
  facePhotoUrl = '';
  faceResult?: FaceResult;
  faceError = '';
  fengshuiPhotoFile?: File;
  fengshuiPhotoUrl = '';
  fengshuiSpace = '卧室';
  fengshuiDirection = '正南';
  fengshuiFloor = '';
  fengshuiRoad = 'unknown';
  fengshuiWater = 'unknown';
  fengshuiMountain = 'unknown';
  fengshuiDescription = '';
  fengshuiConcern = '';
  fengshuiResult?: FengshuiResult;
  fengshuiError = '';
  namingSurname = '';
  namingFather = '';
  namingMother = '';
  namingMiddle = '';
  namingLength = '3';
  namingBirthDate = '';
  namingBirthTime = '12:00';
  namingTimeMode: TimeMode = 'time';
  namingShichenIndex = 6;
  namingResult?: NamingResult;
  namingError = '';
  divinationName = '';
  divinationGender = '';
  divinationBirthDate = '';
  divinationBirthTime = '12:00';
  divinationTimeMode: TimeMode = 'time';
  divinationShichenIndex = 6;
  divinationTopic = '';
  divinationResult?: DivinationResult;
  divinationError = '';
  divinationCasting = false;
  divinationStick?: BambooStick;
  mediapipeReady = false;
  mediapipeLoading?: Promise<void>;
  handsModel?: any;
  faceMeshModel?: any;
  astrologyName = '';
  astrologyGender = '';
  astrologyBirthDate = '';
  astrologyBirthTime = '12:00';
  astrologyTimeMode: TimeMode = 'time';
  astrologyShichenIndex = 6;
  astrologyLocation = '';
  astrologyFocus = '';
  astrologyResult?: AstrologyResult;
  astrologyError = '';

  calculate(): void {
    this.errorMessage = '';
    if (!this.name.trim()) {
      this.result = undefined;
      this.errorMessage = '请输入姓名。';
      return;
    }
    if (!this.gender) {
      this.result = undefined;
      this.errorMessage = '请选择性别。';
      return;
    }
    const date = this.parseDate(this.birthDate);
    if (!date) {
      this.result = undefined;
      this.errorMessage = '请输入有效的出生日期。';
      return;
    }

    const hourIndex = this.getHourIndex(this.timeMode, this.birthTime, this.shichenIndex);
    if (hourIndex === null) {
      this.result = undefined;
      this.errorMessage = '请输入有效的出生时间或选择时辰。';
      return;
    }

    this.result = this.buildFortune(
      this.name.trim(),
      this.gender as Gender,
      date.year,
      date.month,
      date.day,
      hourIndex
    );
    this.activeTab = 'output';
  }

  calculateMatch(): void {
    this.matchError = '';
    if (!this.maleName.trim() || !this.femaleName.trim()) {
      this.matchResult = undefined;
      this.matchError = '请输入男女双方姓名。';
      return;
    }
    const maleDate = this.parseDate(this.maleBirthDate);
    const femaleDate = this.parseDate(this.femaleBirthDate);
    if (!maleDate || !femaleDate) {
      this.matchResult = undefined;
      this.matchError = '请输入有效的出生日期。';
      return;
    }
    const maleHourIndex = this.getHourIndex(this.maleTimeMode, this.maleBirthTime, this.maleShichenIndex);
    const femaleHourIndex = this.getHourIndex(
      this.femaleTimeMode,
      this.femaleBirthTime,
      this.femaleShichenIndex
    );
    if (maleHourIndex === null || femaleHourIndex === null) {
      this.matchResult = undefined;
      this.matchError = '请输入有效的出生时间或选择时辰。';
      return;
    }

    this.matchResult = this.buildMatch(
      this.maleName.trim(),
      maleDate.year,
      maleDate.month,
      maleDate.day,
      maleHourIndex,
      this.femaleName.trim(),
      femaleDate.year,
      femaleDate.month,
      femaleDate.day,
      femaleHourIndex
    );
    this.activeTab = 'output';
  }

  setActiveFunction(key: FunctionKey): void {
    this.activeFunction = key;
    this.activeTab = 'input';
  }

  setActiveTab(tab: TabKey): void {
    this.activeTab = tab;
  }

  getActiveMenu() {
    return this.functionMenu.find((item) => item.key === this.activeFunction) ?? this.functionMenu[0];
  }

  async onPalmFileChange(event: Event, side: 'left' | 'right'): Promise<void> {
    const input = event.target as HTMLInputElement;
    const file = input.files?.[0];
    if (!file) {
      return;
    }
    const url = await this.readFileAsDataUrl(file);
    if (side === 'left') {
      this.palmLeftFile = file;
      this.palmLeftUrl = url;
    } else {
      this.palmRightFile = file;
      this.palmRightUrl = url;
    }
  }

  async onFaceFileChange(event: Event): Promise<void> {
    const input = event.target as HTMLInputElement;
    const file = input.files?.[0];
    if (!file) {
      return;
    }
    this.facePhotoFile = file;
    this.facePhotoUrl = await this.readFileAsDataUrl(file);
  }

  async onFengshuiFileChange(event: Event): Promise<void> {
    const input = event.target as HTMLInputElement;
    const file = input.files?.[0];
    if (!file) {
      return;
    }
    this.fengshuiPhotoFile = file;
    this.fengshuiPhotoUrl = await this.readFileAsDataUrl(file);
  }

  reset(): void {
    this.name = '';
    this.birthDate = '';
    this.birthTime = '12:00';
    this.timeMode = 'time';
    this.shichenIndex = 6;
    this.gender = '';
    this.result = undefined;
    this.errorMessage = '';
  }

  resetMatch(): void {
    this.maleName = '';
    this.maleBirthDate = '';
    this.maleBirthTime = '12:00';
    this.maleTimeMode = 'time';
    this.maleShichenIndex = 6;
    this.femaleName = '';
    this.femaleBirthDate = '';
    this.femaleBirthTime = '12:00';
    this.femaleTimeMode = 'time';
    this.femaleShichenIndex = 6;
    this.matchResult = undefined;
    this.matchError = '';
  }

  calculatePalm(): void {
    this.palmError = '';
    if (!this.palmGender) {
      this.palmResult = undefined;
      this.palmError = '请选择性别。';
      return;
    }
    if (!this.palmLeftFile || !this.palmRightFile) {
      this.palmResult = undefined;
      this.palmError = '请上传或拍摄左右手清晰照片。';
      return;
    }
    this.runPalmAnalysis();
  }

  resetPalm(): void {
    this.palmGender = '';
    this.palmLeftFile = undefined;
    this.palmRightFile = undefined;
    this.palmLeftUrl = '';
    this.palmRightUrl = '';
    this.palmResult = undefined;
    this.palmError = '';
  }

  calculateFace(): void {
    this.faceError = '';
    if (!this.faceGender) {
      this.faceResult = undefined;
      this.faceError = '请选择性别。';
      return;
    }
    if (!this.facePhotoFile) {
      this.faceResult = undefined;
      this.faceError = '请上传或拍摄清晰正面照片。';
      return;
    }
    this.runFaceAnalysis();
  }

  resetFace(): void {
    this.faceGender = '';
    this.facePhotoFile = undefined;
    this.facePhotoUrl = '';
    this.faceResult = undefined;
    this.faceError = '';
  }

  calculateFengshui(): void {
    this.fengshuiError = '';
    if (!this.fengshuiPhotoFile) {
      this.fengshuiResult = undefined;
      this.fengshuiError = '请上传清晰环境照片。';
      return;
    }
    if (!this.fengshuiDescription.trim()) {
      this.fengshuiResult = undefined;
      this.fengshuiError = '请补充环境说明。';
      return;
    }

    const directionElement = DIRECTION_ELEMENTS[this.fengshuiDirection] ?? '土';
    const roadNote =
      this.fengshuiRoad === 'main'
        ? '临主干道，气口旺盛，需以遮挡缓冲冲煞。'
        : this.fengshuiRoad === 'alley'
          ? '临小路，气流平缓，宜聚气。'
          : '道路情况不明，需结合现场判断。';
    const waterNote =
      this.fengshuiWater === 'near'
        ? '近水有财气，宜保持清净通畅。'
        : this.fengshuiWater === 'none'
          ? '无明显水势，可用软装引导气流。'
          : '水势信息不足，建议补充。';
    const mountainNote =
      this.fengshuiMountain === 'near'
        ? '背有山势，主有靠山，稳中求进。'
        : this.fengshuiMountain === 'none'
          ? '无靠山，宜以屏风或高柜作依。'
          : '山势信息不足，建议补充。';

    const details = [
      `空间类型：${this.fengshuiSpace}，朝向${this.fengshuiDirection}，五行属${directionElement}。`,
      roadNote,
      waterNote,
      mountainNote,
      `重点关注：${this.fengshuiConcern.trim() || '整体气场与睡卧区稳定性'}。`
    ];
    const advice = [
      '保持通风与光线稳定，动线通畅可聚气。',
      '避免镜面直冲床位或门窗，宜以柔化为主。',
      '如需细断，可补充房门与床位的相对位置。'
    ];

    this.fengshuiResult = {
      summary: '风水以藏风聚气为本，气场稳定则人心安。',
      details,
      advice
    };
    this.activeTab = 'output';
  }

  resetFengshui(): void {
    this.fengshuiPhotoFile = undefined;
    this.fengshuiPhotoUrl = '';
    this.fengshuiSpace = '卧室';
    this.fengshuiDirection = '正南';
    this.fengshuiFloor = '';
    this.fengshuiRoad = 'unknown';
    this.fengshuiWater = 'unknown';
    this.fengshuiMountain = 'unknown';
    this.fengshuiDescription = '';
    this.fengshuiConcern = '';
    this.fengshuiResult = undefined;
    this.fengshuiError = '';
  }

  calculateNaming(): void {
    this.namingError = '';
    if (!this.namingSurname.trim()) {
      this.namingResult = undefined;
      this.namingError = '请输入姓氏。';
      return;
    }
    const nameLength = Number(this.namingLength);
    if (Number.isNaN(nameLength) || nameLength < 2 || nameLength > 3) {
      this.namingResult = undefined;
      this.namingError = '姓名长度需为2或3字。';
      return;
    }
    const hasBirthDate = Boolean(this.namingBirthDate);
    const birthNote = hasBirthDate ? '已结合出生时间偏向调和五行。' : '未提供出生时间，偏重寓意与音律。';
    const options = this.buildNameOptions(nameLength, this.namingMiddle.trim());

    this.namingResult = {
      summary: `以${this.namingSurname}姓为本，${birthNote}`,
      options,
      advice: ['建议避免生僻字与生硬搭配，保持朗朗上口。', '可结合家族辈分或父母寄望微调。']
    };
    this.activeTab = 'output';
  }

  resetNaming(): void {
    this.namingSurname = '';
    this.namingFather = '';
    this.namingMother = '';
    this.namingMiddle = '';
    this.namingLength = '3';
    this.namingBirthDate = '';
    this.namingBirthTime = '12:00';
    this.namingTimeMode = 'time';
    this.namingShichenIndex = 6;
    this.namingResult = undefined;
    this.namingError = '';
  }

  calculateDivination(): void {
    this.divinationError = '';
    if (!this.divinationName.trim()) {
      this.divinationResult = undefined;
      this.divinationError = '请输入姓名。';
      return;
    }
    if (!this.divinationGender) {
      this.divinationResult = undefined;
      this.divinationError = '请选择性别。';
      return;
    }
    const date = this.parseDate(this.divinationBirthDate);
    if (!date) {
      this.divinationResult = undefined;
      this.divinationError = '请输入有效的出生日期。';
      return;
    }
    const hourIndex = this.getHourIndex(
      this.divinationTimeMode,
      this.divinationBirthTime,
      this.divinationShichenIndex
    );
    if (hourIndex === null) {
      this.divinationResult = undefined;
      this.divinationError = '请输入有效的出生时间或选择时辰。';
      return;
    }
    if (!this.divinationTopic.trim()) {
      this.divinationResult = undefined;
      this.divinationError = '请填写所问之事。';
      return;
    }

    const reading = this.getReading(date.year, date.month, date.day, hourIndex);
    const baseHexagram = reading.baseHexagram;
    const changedHexagram = reading.changedHexagram;
    const movingLine = reading.movingLine;
    const stick = this.pickBambooStick();
    const sign = this.getZodiacSign(date.month, date.day);
    const detailLines = [
      `本卦${baseHexagram.name}，变卦${changedHexagram.name}，动爻在${LINE_LABELS[movingLine]}。`,
      `抽得第${stick.number}签（${stick.grade}），象征${stick.meaning}之势。`,
      `星象为${stick.astro}，与${sign}星性同参，主调为${ZODIAC_ELEMENTS[sign]}。`,
      '本卦示当前之势，变卦为后续转机，动爻为关键节点。'
    ];
    const adviceLines = [
      '所问之事宜明其核心目标，避免多线并进。',
      '出现变卦之象时，先小试探再做大决定。',
      '星象示势，心性为主，宜守正不躁。'
    ];

    this.divinationCasting = true;
    window.setTimeout(() => {
      this.divinationCasting = false;
    }, 900);
    this.divinationStick = stick;
    this.divinationResult = {
      baseHexagram,
      changedHexagram,
      movingLine,
      baseLines: this.toDisplayLines(reading.baseLinesRaw),
      changedLines: this.toDisplayLines(reading.changedLinesRaw),
      summary: `所问「${this.divinationTopic.trim()}」以卦象为凭，主势已定，机变在后。`,
      details: detailLines,
      advice: adviceLines,
      stick
    };
    this.activeTab = 'output';
  }

  resetDivination(): void {
    this.divinationName = '';
    this.divinationGender = '';
    this.divinationBirthDate = '';
    this.divinationBirthTime = '12:00';
    this.divinationTimeMode = 'time';
    this.divinationShichenIndex = 6;
    this.divinationTopic = '';
    this.divinationResult = undefined;
    this.divinationError = '';
    this.divinationCasting = false;
    this.divinationStick = undefined;
  }

  private async runPalmAnalysis(): Promise<void> {
    try {
      await this.ensureMediapipeLoaded();
      const leftMetrics = await this.analyzeHandImage(this.palmLeftUrl);
      const rightMetrics = await this.analyzeHandImage(this.palmRightUrl);
      if (!leftMetrics || !rightMetrics) {
        this.palmResult = undefined;
        this.palmError = '未能识别清晰的手部，请重新拍摄。';
        return;
      }
      const genderLabel = this.getGenderLabel(this.palmGender as Gender);
      const detailLines = [
        `${genderLabel}手相以掌形比例与指节比例为主断，左右手互为内外之象。`,
        `左手掌指比为${leftMetrics.fingerRatio.toFixed(2)}，右手掌指比为${rightMetrics.fingerRatio.toFixed(
          2
        )}。`,
        leftMetrics.fingerRatio > 1.1
          ? '指长于掌，多主思虑细致，重计划与分析。'
          : '指掌比例均衡，主稳健务实，重行动落地。',
        leftMetrics.palmRatio > 1.2
          ? '掌长偏长，主理想与志向较强。'
          : '掌形偏方，主守成与执行力。',
        Math.abs(leftMetrics.symmetryScore - rightMetrics.symmetryScore) > 0.15
          ? '左右手差异明显，先天与后天侧重不同，后天运势更为关键。'
          : '左右手协调度高，内外一致，行事较顺。'
      ];
      const adviceLines = [
        '拍摄时保持手掌舒展与光线均匀，避免阴影遮挡纹路。',
        '如需细断，请补充掌纹特征（生命线、智慧线、感情线）及掌丘高低。'
      ];
      this.palmResult = {
        summary: '手相以纹路为纲、掌形为势，合参左右手可得整体走势。',
        details: detailLines,
        advice: adviceLines
      };
      this.activeTab = 'output';
    } catch {
      this.palmResult = undefined;
      this.palmError = '手相分析初始化失败，请稍后重试。';
    }
  }

  private async runFaceAnalysis(): Promise<void> {
    try {
      await this.ensureMediapipeLoaded();
      const metrics = await this.analyzeFaceImage(this.facePhotoUrl);
      if (!metrics) {
        this.faceResult = undefined;
        this.faceError = '未能识别清晰的面部轮廓，请重新拍摄。';
        return;
      }
      const detailLines = [
        `面部纵横比为${metrics.faceRatio.toFixed(2)}，眼距比例为${metrics.eyeRatio.toFixed(2)}。`,
        metrics.faceRatio > 1.35
          ? '面形偏长，主思虑深远，善谋定而后动。'
          : metrics.faceRatio < 1.15
            ? '面形偏阔，主执行力强，重实效。'
            : '面形平衡，主稳健中正。',
        metrics.eyeRatio > 0.38
          ? '眼距偏开，主心胸开阔，重视格局。'
          : '眼距偏聚，主专注内敛，重视细节。',
        metrics.symmetryScore > 0.85 ? '对称度良好，多主气质稳定。' : '对称度一般，易受情绪影响。'
      ];
      this.faceResult = {
        summary: '面相以三庭五眼为纲，五官协调为吉，偏颇则需调和。',
        details: detailLines,
        advice: [
          '拍摄时正面平视，露出双耳，避免佩戴眼镜与饰品。',
          '如需更细致判断，可补充近期精神状态与作息情况。'
        ]
      };
      this.activeTab = 'output';
    } catch {
      this.faceResult = undefined;
      this.faceError = '面相分析初始化失败，请稍后重试。';
    }
  }

  private async ensureMediapipeLoaded(): Promise<void> {
    if (this.mediapipeReady) {
      return;
    }
    if (this.mediapipeLoading) {
      return this.mediapipeLoading;
    }
    this.mediapipeLoading = Promise.all([
      this.loadScript('https://cdn.jsdelivr.net/npm/@mediapipe/hands/hands.js'),
      this.loadScript('https://cdn.jsdelivr.net/npm/@mediapipe/face_mesh/face_mesh.js')
    ])
      .then(() => {
        const handsCtor = (window as any).Hands;
        const faceCtor = (window as any).FaceMesh;
        if (!handsCtor || !faceCtor) {
          throw new Error('mediapipe not available');
        }
        this.handsModel = new handsCtor({
          locateFile: (file: string) => `https://cdn.jsdelivr.net/npm/@mediapipe/hands/${file}`
        });
        this.handsModel.setOptions({
          maxNumHands: 1,
          modelComplexity: 1,
          minDetectionConfidence: 0.6,
          minTrackingConfidence: 0.6
        });
        this.faceMeshModel = new faceCtor({
          locateFile: (file: string) => `https://cdn.jsdelivr.net/npm/@mediapipe/face_mesh/${file}`
        });
        this.faceMeshModel.setOptions({
          maxNumFaces: 1,
          refineLandmarks: true,
          minDetectionConfidence: 0.6,
          minTrackingConfidence: 0.6
        });
        this.mediapipeReady = true;
      })
      .catch(() => {
        this.mediapipeReady = false;
      })
      .finally(() => {
        this.mediapipeLoading = undefined;
      });
    return this.mediapipeLoading;
  }

  private loadScript(src: string): Promise<void> {
    return new Promise((resolve, reject) => {
      if (document.querySelector(`script[src=\"${src}\"]`)) {
        resolve();
        return;
      }
      const script = document.createElement('script');
      script.src = src;
      script.async = true;
      script.onload = () => resolve();
      script.onerror = () => reject(new Error('load failed'));
      document.body.appendChild(script);
    });
  }

  private async analyzeHandImage(url: string): Promise<HandMetrics | null> {
    const image = await this.loadImage(url);
    if (!this.handsModel) {
      return this.estimateHandMetrics(image);
    }
    return new Promise((resolve) => {
      this.handsModel.onResults((results: any) => {
        const landmarks = results.multiHandLandmarks?.[0];
        if (!landmarks) {
          resolve(this.estimateHandMetrics(image));
          return;
        }
        const palmWidth = this.distance(landmarks[5], landmarks[17]);
        const palmLength = this.distance(landmarks[0], landmarks[9]);
        const indexLen = this.distance(landmarks[5], landmarks[8]);
        const middleLen = this.distance(landmarks[9], landmarks[12]);
        const ringLen = this.distance(landmarks[13], landmarks[16]);
        const pinkyLen = this.distance(landmarks[17], landmarks[20]);
        const thumbLen = this.distance(landmarks[2], landmarks[4]);
        const fingerAvg = (indexLen + middleLen + ringLen + pinkyLen) / 4;
        const palmRatio = palmLength / (palmWidth || 1);
        const fingerRatio = fingerAvg / (palmLength || 1);
        const thumbRatio = thumbLen / (palmWidth || 1);
        const symmetryScore = 1 - Math.min(Math.abs(palmRatio - 1.2), 0.4);
        resolve({ palmRatio, fingerRatio, thumbRatio, symmetryScore });
      });
      this.handsModel.send({ image });
    });
  }

  private async analyzeFaceImage(url: string): Promise<FaceMetrics | null> {
    const image = await this.loadImage(url);
    if (!this.faceMeshModel) {
      return this.estimateFaceMetrics(image);
    }
    return new Promise((resolve) => {
      this.faceMeshModel.onResults((results: any) => {
        const landmarks = results.multiFaceLandmarks?.[0];
        if (!landmarks) {
          resolve(this.estimateFaceMetrics(image));
          return;
        }
        const forehead = landmarks[10];
        const chin = landmarks[152];
        const leftCheek = landmarks[234];
        const rightCheek = landmarks[454];
        const leftEye = landmarks[33];
        const rightEye = landmarks[263];
        const nose = landmarks[1];
        const faceHeight = this.distance(forehead, chin);
        const faceWidth = this.distance(leftCheek, rightCheek);
        const eyeDist = this.distance(leftEye, rightEye);
        const leftDiff = this.distance(nose, leftCheek);
        const rightDiff = this.distance(nose, rightCheek);
        const symmetryScore = 1 - Math.min(Math.abs(leftDiff - rightDiff), 0.4);
        resolve({
          faceRatio: faceHeight / (faceWidth || 1),
          eyeRatio: eyeDist / (faceWidth || 1),
          symmetryScore
        });
      });
      this.faceMeshModel.send({ image });
    });
  }

  private loadImage(url: string): Promise<HTMLImageElement> {
    return new Promise((resolve, reject) => {
      const image = new Image();
      image.onload = () => resolve(image);
      image.onerror = () => reject(new Error('image load failed'));
      image.src = url;
    });
  }

  private distance(a: { x: number; y: number }, b: { x: number; y: number }): number {
    return Math.hypot(a.x - b.x, a.y - b.y);
  }

  private estimateHandMetrics(image: HTMLImageElement): HandMetrics {
    const stats = this.getImageStats(image);
    const palmRatio = image.naturalHeight / (image.naturalWidth || 1);
    const fingerRatio = this.clamp(0.9 + stats.contrast * 0.6, 0.75, 1.4);
    const thumbRatio = this.clamp(0.28 + stats.brightness * 0.2, 0.2, 0.5);
    const symmetryScore = this.clamp(0.7 + (1 - Math.abs(stats.brightness - 0.5)) * 0.3, 0.6, 0.98);
    return { palmRatio, fingerRatio, thumbRatio, symmetryScore };
  }

  private estimateFaceMetrics(image: HTMLImageElement): FaceMetrics {
    const stats = this.getImageStats(image);
    const faceRatio = image.naturalHeight / (image.naturalWidth || 1);
    const eyeRatio = this.clamp(0.3 + stats.contrast * 0.15, 0.25, 0.45);
    const symmetryScore = this.clamp(0.68 + (1 - Math.abs(stats.brightness - 0.5)) * 0.28, 0.6, 0.95);
    return { faceRatio, eyeRatio, symmetryScore };
  }

  private getImageStats(image: HTMLImageElement): { brightness: number; contrast: number } {
    const canvas = document.createElement('canvas');
    const ctx = canvas.getContext('2d');
    if (!ctx) {
      return { brightness: 0.5, contrast: 0.5 };
    }
    const targetSize = 120;
    canvas.width = targetSize;
    canvas.height = targetSize;
    ctx.drawImage(image, 0, 0, targetSize, targetSize);
    const data = ctx.getImageData(0, 0, targetSize, targetSize).data;
    let sum = 0;
    let sumSq = 0;
    const count = data.length / 4;
    for (let i = 0; i < data.length; i += 4) {
      const v = (data[i] + data[i + 1] + data[i + 2]) / 3 / 255;
      sum += v;
      sumSq += v * v;
    }
    const mean = sum / count;
    const variance = sumSq / count - mean * mean;
    const contrast = Math.sqrt(Math.max(variance, 0));
    return { brightness: mean, contrast };
  }

  private clamp(value: number, min: number, max: number): number {
    return Math.min(max, Math.max(min, value));
  }

  private readFileAsDataUrl(file: File): Promise<string> {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.onload = () => resolve(String(reader.result ?? ''));
      reader.onerror = () => reject(new Error('read failed'));
      reader.readAsDataURL(file);
    });
  }

  calculateAstrology(): void {
    this.astrologyError = '';
    if (!this.astrologyName.trim()) {
      this.astrologyResult = undefined;
      this.astrologyError = '请输入姓名。';
      return;
    }
    if (!this.astrologyGender) {
      this.astrologyResult = undefined;
      this.astrologyError = '请选择性别。';
      return;
    }
    const date = this.parseDate(this.astrologyBirthDate);
    if (!date) {
      this.astrologyResult = undefined;
      this.astrologyError = '请输入有效的出生日期。';
      return;
    }
    const hourIndex = this.getHourIndex(
      this.astrologyTimeMode,
      this.astrologyBirthTime,
      this.astrologyShichenIndex
    );
    if (hourIndex === null) {
      this.astrologyResult = undefined;
      this.astrologyError = '请输入有效的出生时间或选择时辰。';
      return;
    }
    if (!this.astrologyLocation.trim()) {
      this.astrologyResult = undefined;
      this.astrologyError = '请填写出生地或常住地。';
      return;
    }

    const sign = this.getZodiacSign(date.month, date.day);
    const rising = RISING_SIGNS[hourIndex % RISING_SIGNS.length];
    const element = ZODIAC_ELEMENTS[sign];
    const focus = this.astrologyFocus.trim() || '整体运势';
    const seed = (date.year + date.month + date.day + hourIndex) % 5;
    const mood = ['行星入旺，势强', '星轨平稳，守中', '星势偏转，宜调和', '星能内收，宜蓄势', '星象跃动，宜把握'][seed];

    this.astrologyResult = {
      summary: `${this.astrologyName}的太阳星座为${sign}，${rising}为外显气质，${element}象主调。`,
      sign,
      rising,
      sections: [
        { title: '星象解运', text: `主调为${element}象，${mood}，${focus}宜以稳中求进。` },
        { title: '星辰占卜', text: `太阳星座${sign}主心性，${rising}主行事风格，内外合参得势。` },
        { title: '星轨命理', text: `星轨强调节律，近期宜先稳基础，再寻突破之机。` },
        { title: '星图解命', text: `出生地${this.astrologyLocation.trim()}为参考点，星盘重在气机流转。` }
      ],
      advice: ['保持作息与节律稳定，行星势能更易发挥。', '聚焦一到两项核心目标，避免分心耗散。']
    };
    this.activeTab = 'output';
  }

  resetAstrology(): void {
    this.astrologyName = '';
    this.astrologyGender = '';
    this.astrologyBirthDate = '';
    this.astrologyBirthTime = '12:00';
    this.astrologyTimeMode = 'time';
    this.astrologyShichenIndex = 6;
    this.astrologyLocation = '';
    this.astrologyFocus = '';
    this.astrologyResult = undefined;
    this.astrologyError = '';
  }

  private parseDate(dateStr: string): { year: number; month: number; day: number } | null {
    const parts = dateStr.split('-').map((part) => Number(part));
    if (parts.length !== 3 || parts.some((part) => Number.isNaN(part))) {
      return null;
    }
    const [year, month, day] = parts;
    if (!year || !month || !day) {
      return null;
    }
    return { year, month, day };
  }

  private getHourIndex(timeMode: TimeMode, birthTime: string, shichenIndex: number): number | null {
    if (timeMode === 'shichen') {
      return shichenIndex;
    }
    if (!birthTime) {
      return null;
    }
    const parts = birthTime.split(':').map((part) => Number(part));
    if (parts.length < 2 || parts.some((part) => Number.isNaN(part))) {
      return null;
    }
    const [hour, minute] = parts;
    if (hour < 0 || hour > 23 || minute < 0 || minute > 59) {
      return null;
    }
    if (hour === 23) {
      return 0;
    }
    return Math.floor((hour + 1) / 2);
  }

  private buildFortune(
    name: string,
    gender: Gender,
    year: number,
    month: number,
    day: number,
    hourIndex: number
  ): FortuneResult {
    const reading = this.getReading(year, month, day, hourIndex);
    const {
      upper,
      lower,
      changedUpper,
      changedLower,
      movingLine,
      baseLinesRaw,
      changedLinesRaw,
      baseHexagram,
      changedHexagram
    } = reading;

    const nameSeed = this.getNameSeed(name);
    const genderSeed = this.getGenderSeed(gender);
    const toneIndex =
      (reading.upperIndex * 3 + reading.lowerIndex * 2 + movingLine + nameSeed + genderSeed) % 5;
    const identityNote = this.getIdentityNote(name, gender, toneIndex);
    const summary = `本卦为${baseHexagram.name}，变卦为${changedHexagram.name}。${OVERALL_TONES[toneIndex]}${identityNote}`;

    const elementBalance = this.getElementBalance(upper.element, lower.element);
    const advice = LINE_MESSAGES[movingLine];

    const lineRelations = this.getLineRelations(baseHexagram.symbol, reading.upperSymbol, reading.lowerSymbol);
    const relationCounts = this.countRelations(lineRelations);
    const movingRelation = lineRelations[movingLine]?.relation ?? '';
    const fateNotes = this.buildFateNotes(
      baseHexagram,
      changedHexagram,
      relationCounts,
      movingRelation,
      gender,
      movingLine
    );

    const sections: FortuneSection[] = [
      {
        title: '健康',
        description: this.buildHealthDescription(relationCounts, movingRelation),
        advice: HEALTH_ADVICE[toneIndex]
      },
      {
        title: '爱情',
        description: this.buildLoveDescription(gender, relationCounts, movingRelation),
        advice: LOVE_ADVICE[toneIndex]
      },
      {
        title: '家庭',
        description: this.buildFamilyDescription(relationCounts, movingRelation),
        advice: FAMILY_ADVICE[toneIndex]
      },
      {
        title: '子女',
        description: this.buildChildrenDescription(relationCounts, movingRelation),
        advice: CHILDREN_ADVICE[toneIndex]
      },
      {
        title: '事业',
        description: this.buildCareerDescription(relationCounts, movingRelation),
        advice: CAREER_ADVICE[toneIndex]
      },
      {
        title: '财运',
        description: this.buildWealthDescription(relationCounts, movingRelation),
        advice: WEALTH_ADVICE[toneIndex]
      }
    ];

    const birthLabel = `${year}年${month}月${day}日`;
    const timeLabel = this.getTimeLabel(hourIndex);
    const genderLabel = this.getGenderLabel(gender);

    return {
      birthLabel,
      timeLabel,
      name,
      genderLabel,
      baseHexagram,
      changedHexagram,
      upper,
      lower,
      changedUpper,
      changedLower,
      movingLine,
      baseLines: this.toDisplayLines(baseLinesRaw),
      changedLines: this.toDisplayLines(changedLinesRaw),
      summary,
      elementBalance,
      fateNotes,
      sections,
      advice
    };
  }

  private buildMatch(
    maleName: string,
    maleYear: number,
    maleMonth: number,
    maleDay: number,
    maleHourIndex: number,
    femaleName: string,
    femaleYear: number,
    femaleMonth: number,
    femaleDay: number,
    femaleHourIndex: number
  ): MatchResult {
    const maleReading = this.getReading(maleYear, maleMonth, maleDay, maleHourIndex);
    const femaleReading = this.getReading(femaleYear, femaleMonth, femaleDay, femaleHourIndex);
    const maleRelationCounts = this.countRelations(
      this.getLineRelations(maleReading.baseHexagram.symbol, maleReading.upperSymbol, maleReading.lowerSymbol)
    );
    const femaleRelationCounts = this.countRelations(
      this.getLineRelations(femaleReading.baseHexagram.symbol, femaleReading.upperSymbol, femaleReading.lowerSymbol)
    );

    const elementRelation = this.getElementRelation(maleReading.baseHexagram.element, femaleReading.baseHexagram.element);
    const gongMatch = maleReading.baseHexagram.gong === femaleReading.baseHexagram.gong;
    const lineGap = Math.abs(maleReading.movingLine - femaleReading.movingLine);
    const rhythmNote =
      lineGap === 0 ? '动爻同位，步调相近，彼此更易同频。' : lineGap >= 3 ? '动爻相隔较远，节奏差异明显。' : '动爻差距不大，磨合后更顺。';

    const score = elementRelation.score + (gongMatch ? 2 : 0) + (lineGap <= 1 ? 1 : 0);
    const summary =
      score >= 6
        ? '八字相合偏吉，相处易成，幸福指数高。'
        : score >= 3
          ? '八字相合中平，需多经营，顺则长久。'
          : '八字相克偏重，易有摩擦，需谨慎调和。';

    const details = [
      '合婚以卦象五行推断八字相合度，供参考。',
      `男方本卦${maleReading.baseHexagram.name}（卦宫${maleReading.baseHexagram.gong}，五行${maleReading.baseHexagram.element}），女方本卦${femaleReading.baseHexagram.name}（卦宫${femaleReading.baseHexagram.gong}，五行${femaleReading.baseHexagram.element}）。`,
      `五行关系：${elementRelation.label}。${elementRelation.description}`,
      `男方子孙爻${this.describeCount(maleRelationCounts.child)}，女方子孙爻${this.describeCount(
        femaleRelationCounts.child
      )}，子息缘份强弱可由此窥见。`,
      `男方姻缘星${this.describeMarriageStar(maleRelationCounts, 'male')}，女方姻缘星${this.describeMarriageStar(
        femaleRelationCounts,
        'female'
      )}。`,
      rhythmNote
    ];

    const advice = [
      '同气则顺，相克则需以柔化刚，少以情绪对抗。',
      gongMatch ? '卦宫同气，适合共同规划长期目标。' : '卦宫不同，宜在生活节奏上多做协调。',
      '合婚以互补为贵，彼此短板由对方补足方能长久。'
    ];

    const maleLabel = `${maleName} · ${maleYear}年${maleMonth}月${maleDay}日 · ${this.getTimeLabel(maleHourIndex)}`;
    const femaleLabel = `${femaleName} · ${femaleYear}年${femaleMonth}月${femaleDay}日 · ${this.getTimeLabel(
      femaleHourIndex
    )}`;

    return {
      maleLabel,
      femaleLabel,
      summary,
      details,
      advice
    };
  }

  private getReading(year: number, month: number, day: number, hourIndex: number) {
    const upperIndex = (year + month + day) % 8;
    const lowerIndex = (month + day + hourIndex) % 8;
    const movingLine = (year + month + day + hourIndex) % 6;

    const upper = TRIGRAMS[upperIndex];
    const lower = TRIGRAMS[lowerIndex];
    const upperSymbol = this.getTrigramSymbol(upper.name);
    const lowerSymbol = this.getTrigramSymbol(lower.name);
    const baseLinesRaw = [...lower.lines, ...upper.lines];
    const changedLinesRaw = baseLinesRaw.map((value, index) =>
      index === movingLine ? 1 - value : value
    );

    const changedLower = this.matchTrigram(changedLinesRaw.slice(0, 3));
    const changedUpper = this.matchTrigram(changedLinesRaw.slice(3));
    const baseHexagram = this.getHexagramInfo(upper, lower);
    const changedHexagram = this.getHexagramInfo(changedUpper, changedLower);

    return {
      upperIndex,
      lowerIndex,
      movingLine,
      upper,
      lower,
      upperSymbol,
      lowerSymbol,
      baseLinesRaw,
      changedLinesRaw,
      changedUpper,
      changedLower,
      baseHexagram,
      changedHexagram
    };
  }

  private matchTrigram(lines: number[]): Trigram {
    const key = lines.join('');
    return TRIGRAMS.find((trigram) => trigram.lineKey === key) ?? TRIGRAMS[0];
  }

  private toDisplayLines(lines: number[]): LineDisplay[] {
    return lines
      .slice()
      .reverse()
      .map((value, index) => ({ value, lineIndex: 5 - index }));
  }

  private getElementBalance(upperElement: string, lowerElement: string): string {
    if (upperElement === lowerElement) {
      return `上下同气，${upperElement}势强，贵在专注与坚定。`;
    }
    if (ELEMENT_GENERATES[lowerElement] === upperElement) {
      return `下卦生上卦，气势上行，适合借势扩展与表达。`;
    }
    if (ELEMENT_CONTROLS[lowerElement] === upperElement) {
      return `下卦制上卦，稳中求进，先守后攻更有利。`;
    }
    return `上下互补，先求协调，再择机突破。`;
  }

  private getTimeLabel(hourIndex: number): string {
    const option = SHICHEN_OPTIONS.find((item) => item.index === hourIndex);
    return option ? option.label : '未知时辰';
  }

  private getNameSeed(name: string): number {
    return Array.from(name).reduce((sum, char) => sum + char.charCodeAt(0), 0) % 5;
  }

  private getGenderSeed(gender: Gender): number {
    if (gender === 'female') {
      return 1;
    }
    if (gender === 'other') {
      return 2;
    }
    return 0;
  }

  private getGenderLabel(gender: Gender): string {
    return GENDER_OPTIONS.find((option) => option.value === gender)?.label ?? '未知';
  }

  private getIdentityNote(name: string, gender: Gender, toneIndex: number): string {
    const genderLabel = this.getGenderLabel(gender);
    const template = IDENTITY_NOTES[toneIndex] ?? IDENTITY_NOTES[0];
    return ` ${template.replace('%s', `${genderLabel}${name}`)}`;
  }

  private getTrigramSymbol(name: string): string {
    return TRIGRAM_SYMBOL_BY_NAME[name] ?? '☰';
  }

  private getHexagramInfo(upper: Trigram, lower: Trigram): HexagramInfo {
    const upperSymbol = this.getTrigramSymbol(upper.name);
    const lowerSymbol = this.getTrigramSymbol(lower.name);
    const symbol = this.trigramToHexagram(upperSymbol, lowerSymbol);
    const name = this.getHexagramName(symbol);
    const gong = this.getGongName(symbol);
    const element = this.getGongElement(gong);
    return { symbol, name, gong, element };
  }

  private trigramToHexagram(upperSymbol: string, lowerSymbol: string): string {
    const upperIndex = TRIGRAM_ORDER.indexOf(upperSymbol);
    const lowerIndex = TRIGRAM_ORDER.indexOf(lowerSymbol);
    if (upperIndex < 0 || lowerIndex < 0) {
      return HEXAGRAMS[0];
    }
    return HEXAGRAMS[lowerIndex * 8 + upperIndex];
  }

  private getHexagramName(symbol: string): string {
    const index = HEXAGRAMS.indexOf(symbol);
    return HEXAGRAM_NAMES[index] ?? '未知';
  }

  private getGongName(symbol: string): string {
    for (const entry of BAGONG_BAGUA) {
      if (entry.gua.includes(symbol)) {
        return this.getHexagramName(entry.gong);
      }
    }
    return '未知';
  }

  private getGongElement(gongName: string): string {
    return TRIGRAMS.find((item) => item.name === gongName)?.element ?? '土';
  }

  private getNaJia(trigramSymbol: string, position: 'lower' | 'upper'): string[] {
    switch (trigramSymbol) {
      case '☰':
        return position === 'lower' ? ['辰', '寅', '子'] : ['戌', '申', '午'];
      case '☱':
        return position === 'lower' ? ['丑', '卯', '巳'] : ['未', '酉', '亥'];
      case '☲':
        return position === 'lower' ? ['亥', '丑', '卯'] : ['巳', '未', '酉'];
      case '☳':
        return position === 'lower' ? ['辰', '寅', '子'] : ['戌', '申', '午'];
      case '☴':
        return position === 'lower' ? ['酉', '亥', '丑'] : ['卯', '巳', '未'];
      case '☵':
        return position === 'lower' ? ['午', '辰', '寅'] : ['子', '戌', '申'];
      case '☶':
        return position === 'lower' ? ['申', '午', '辰'] : ['寅', '子', '戌'];
      case '☷':
        return position === 'lower' ? ['卯', '巳', '未'] : ['酉', '亥', '丑'];
      default:
        return ['子', '寅', '辰'];
    }
  }

  private getLineRelations(hexagramSymbol: string, upperSymbol: string, lowerSymbol: string) {
    const lower = this.getNaJia(lowerSymbol, 'lower').slice().reverse();
    const upper = this.getNaJia(upperSymbol, 'upper').slice().reverse();
    const branches = lower.concat(upper);
    return branches.map((branch, index) => ({
      lineIndex: index,
      branch,
      relation: this.getLiuqin(branch, hexagramSymbol)
    }));
  }

  private getLiuqin(dizhi: string, hexagramSymbol: string): string {
    const dizhiWuxing = DIZHI_WUXING[dizhi];
    const gongName = this.getGongName(hexagramSymbol);
    const hexagramWuxing = this.getGongElement(gongName);
    const dizhiIndex = WUXING_ORDER.indexOf(dizhiWuxing);
    const hexagramIndex = WUXING_ORDER.indexOf(hexagramWuxing);
    const diff = dizhiIndex - hexagramIndex;
    switch (diff) {
      case 0:
        return '兄弟';
      case -1:
        return '父母';
      case -2:
        return '官鬼';
      case 1:
        return '子孙';
      case 2:
        return '妻财';
      case -3:
        return '妻财';
      case -4:
        return '子孙';
      case 3:
        return '官鬼';
      case 4:
        return '父母';
      default:
        return '兄弟';
    }
  }

  private countRelations(
    lines: { relation: string }[]
  ): { wealth: number; official: number; child: number; parent: number; sibling: number } {
    return lines.reduce(
      (acc, line) => {
        switch (line.relation) {
          case '妻财':
            acc.wealth += 1;
            break;
          case '官鬼':
            acc.official += 1;
            break;
          case '子孙':
            acc.child += 1;
            break;
          case '父母':
            acc.parent += 1;
            break;
          case '兄弟':
            acc.sibling += 1;
            break;
        }
        return acc;
      },
      { wealth: 0, official: 0, child: 0, parent: 0, sibling: 0 }
    );
  }

  private buildFateNotes(
    baseHexagram: HexagramInfo,
    changedHexagram: HexagramInfo,
    counts: { wealth: number; official: number; child: number; parent: number; sibling: number },
    movingRelation: string,
    gender: Gender,
    movingLine: number
  ): string[] {
    const notes: string[] = [];
    notes.push(`卦宫属${baseHexagram.element}，本卦${baseHexagram.name}，变卦${changedHexagram.name}，气机有进有变。`);

    if (counts.wealth >= 2) {
      notes.push('财星入卦，财有库，聚财之势渐起。');
    } else if (counts.wealth === 1) {
      notes.push('财星见卦，财可求，宜稳取。');
    } else {
      notes.push('财星不显，财以守为先，忌躁进。');
    }

    if (counts.child >= 2) {
      notes.push('子孙爻旺，子息缘厚，家道可承。');
    } else if (counts.child === 1) {
      notes.push('子孙爻见，命中有一子女之缘。');
    } else {
      notes.push('子孙爻隐，子息缘薄，宜顺势而行。');
    }

    const relation = gender === 'female' ? '官鬼' : '妻财';
    const loveCount = relation === '官鬼' ? counts.official : counts.wealth;
    if (loveCount >= 1) {
      notes.push('姻缘星入卦，命中有一配，感情可成。');
    } else {
      notes.push('姻缘星伏，婚缘偏迟，需静待时机。');
    }

    const turningAge = 22 + movingLine * 7;
    notes.push(`动爻在${LINE_LABELS[movingLine]}，约${turningAge}岁左右有转折。`);

    if (movingRelation === '官鬼' || counts.official >= 2) {
      notes.push('官鬼动或官鬼多，人生有一关，谨慎则可过。');
    }

    return notes;
  }

  private buildWealthDescription(
    counts: { wealth: number },
    movingRelation: string
  ): string {
    const base =
      counts.wealth >= 2
        ? '财星旺而有库，求财有门路，利于积累。'
        : counts.wealth === 1
          ? '财星见爻，财运可得，宜稳取。'
          : '财星不显，财运以守为先，重在节流。';
    const moving =
      movingRelation === '妻财' ? ' 动爻临财星，财因变而动，利于把握时机。' : '';
    return `${base}${moving}`;
  }

  private buildCareerDescription(
    counts: { official: number },
    movingRelation: string
  ): string {
    const base =
      counts.official >= 2
        ? '官星旺，事业有位，有责有压亦有名。'
        : counts.official === 1
          ? '官星现，事业可进，宜以稳致远。'
          : '官星不显，事业需蓄势，勿急求高位。';
    const moving =
      movingRelation === '官鬼' ? ' 动爻临官星，职位或方向有变化之象。' : '';
    return `${base}${moving}`;
  }

  private buildLoveDescription(
    gender: Gender,
    counts: { wealth: number; official: number },
    movingRelation: string
  ): string {
    const relation = gender === 'female' ? '官鬼' : '妻财';
    const count = relation === '官鬼' ? counts.official : counts.wealth;
    const base =
      count >= 2
        ? '姻缘星旺，感情有根，缘分较深。'
        : count === 1
          ? '姻缘星现，命中有一配，感情可成。'
          : '姻缘星伏，感情进展缓，宜以真诚待缘。';
    const moving = movingRelation === relation ? ' 动爻临姻缘星，感情在动中有变。' : '';
    return `${base}${moving}`;
  }

  private buildChildrenDescription(
    counts: { child: number },
    movingRelation: string
  ): string {
    const base =
      counts.child >= 2
        ? '子孙爻旺，子息缘厚，喜讯可期。'
        : counts.child === 1
          ? '子孙爻见，命中有一子女缘。'
          : '子孙爻隐，子息缘薄，顺势而行。';
    const moving =
      movingRelation === '子孙' ? ' 动爻临子孙爻，子女之事有进展。' : '';
    return `${base}${moving}`;
  }

  private buildFamilyDescription(
    counts: { parent: number; sibling: number },
    movingRelation: string
  ): string {
    const base =
      counts.parent >= 2
        ? '父母爻旺，家门有靠，长辈助力明显。'
        : counts.parent === 1
          ? '父母爻见，家中可得帮助。'
          : '父母爻不显，家运需自撑，多靠自立。';
    const siblingNote =
      counts.sibling >= 2 ? ' 兄弟爻多，人情往来频繁，需分配好精力。' : '';
    const moving = movingRelation === '父母' ? ' 动爻临父母爻，家事有变动。' : '';
    return `${base}${siblingNote}${moving}`;
  }

  private buildHealthDescription(
    counts: { official: number },
    movingRelation: string
  ): string {
    const base =
      counts.official >= 2
        ? '官鬼旺而叠，体力易劳，需慎防劳疾。'
        : counts.official === 1
          ? '官鬼见爻，需留意小病小伤。'
          : '官鬼不显，气机平稳，保养得法则安。';
    const moving =
      movingRelation === '官鬼' ? ' 动爻临官鬼爻，易有一时波折，宜静养。' : '';
    return `${base}${moving}`;
  }

  private getElementRelation(a: string, b: string): { label: string; score: number; description: string } {
    if (a === b) {
      return { label: '同气', score: 2, description: '五行同气，基础相近，默契更易建立。' };
    }
    if (ELEMENT_GENERATES[a] === b) {
      return { label: '相生', score: 3, description: '男方生女方，气机相扶，互助之象。' };
    }
    if (ELEMENT_GENERATES[b] === a) {
      return { label: '相生', score: 2, description: '女方生男方，能互相成就，但需平衡付出。' };
    }
    if (ELEMENT_CONTROLS[a] === b) {
      return { label: '相克', score: 0, description: '男方克女方，易有压制感，需注意沟通。' };
    }
    if (ELEMENT_CONTROLS[b] === a) {
      return { label: '相克', score: 0, description: '女方克男方，易生不服之气，宜相互尊重。' };
    }
    return { label: '中平', score: 1, description: '五行关系中平，顺势经营可稳。' };
  }

  private describeCount(count: number): string {
    if (count >= 2) {
      return '旺';
    }
    if (count === 1) {
      return '现';
    }
    return '伏';
  }

  private describeMarriageStar(counts: { wealth: number; official: number }, gender: 'male' | 'female'): string {
    const relationCount = gender === 'female' ? counts.official : counts.wealth;
    return this.describeCount(relationCount);
  }

  private buildNameOptions(length: number, middle: string): NameOption[] {
    const targetLength = length - 1;
    const basePool = NAME_POOL.filter((item) => item.char !== middle);
    const filtered = middle ? basePool : NAME_POOL;
    const picks: NameOption[] = [];
    const seed = Math.floor(Math.random() * 1000);
    for (let i = 0; i < filtered.length && picks.length < 5; i += 1) {
      const index = (seed + i * 7) % filtered.length;
      const first = filtered[index];
      const second = filtered[(index + 5) % filtered.length];
      let given = '';
      if (targetLength === 1) {
        given = middle || first.char;
      } else {
        given = middle ? `${middle}${first.char}` : `${first.char}${second.char}`;
      }
      const name = `${this.namingSurname}${given}`;
      const meaning = `${first.meaning}${targetLength === 2 && !middle ? '，' + second.meaning : ''}`;
      const reason = `偏重「${this.mapNameTheme(first.tags)}」的寓意，音律顺口。`;
      picks.push({ name, meaning, reason });
    }
    return picks;
  }

  private mapNameTheme(tags: string[]): string {
    const matched = NAME_TAG_THEMES.find((item) => tags.includes(item.tag));
    return matched ? matched.label : '和顺雅正';
  }

  private getZodiacSign(month: number, day: number): string {
    const matches = ZODIAC_SIGNS.find((sign, index) => {
      const [startMonth, startDay] = sign.start;
      const next = ZODIAC_SIGNS[(index + 1) % ZODIAC_SIGNS.length];
      const [nextMonth, nextDay] = next.start;
      if (startMonth === 12) {
        return (month === 12 && day >= startDay) || (month === 1 && day < nextDay);
      }
      if (month === startMonth && day >= startDay) {
        return true;
      }
      if (month === nextMonth && day < nextDay) {
        return true;
      }
      return month > startMonth && month < nextMonth;
    });
    return matches?.name ?? '未知';
  }

  private pickBambooStick(): BambooStick {
    const number = Math.floor(Math.random() * 108) + 1;
    const gradeInfo =
      BAMBOO_STICK_GRADES.find((item) => number >= item.range[0] && number <= item.range[1]) ??
      BAMBOO_STICK_GRADES[2];
    const sign = ZODIAC_SIGNS[number % ZODIAC_SIGNS.length].name;
    const planet = PLANET_SIGNS[number % PLANET_SIGNS.length];
    const motif = BAMBOO_STICK_MOTIFS[number % BAMBOO_STICK_MOTIFS.length];
    const meaning = `${motif}象${gradeInfo.tone}`;
    const pattern = BAMBOO_STICK_PATTERNS[number % BAMBOO_STICK_PATTERNS.length];
    const astro = `${planet}守${sign}`;
    return {
      number,
      grade: gradeInfo.grade,
      meaning,
      pattern,
      astro
    };
  }
}
