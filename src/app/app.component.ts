import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';

type TimeMode = 'time' | 'shichen';
type Gender = 'male' | 'female' | 'other';

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

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
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

    const hourIndex = this.getHourIndex();
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

  private getHourIndex(): number | null {
    if (this.timeMode === 'shichen') {
      return this.shichenIndex;
    }
    if (!this.birthTime) {
      return null;
    }
    const parts = this.birthTime.split(':').map((part) => Number(part));
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
    const upperIndex = (year + month + day) % 8;
    const lowerIndex = (month + day + hourIndex) % 8;
    const movingLine = (year + month + day + hourIndex) % 6;

    const upper = TRIGRAMS[upperIndex];
    const lower = TRIGRAMS[lowerIndex];
    const baseLinesRaw = [...lower.lines, ...upper.lines];
    const changedLinesRaw = baseLinesRaw.map((value, index) =>
      index === movingLine ? 1 - value : value
    );

    const changedLower = this.matchTrigram(changedLinesRaw.slice(0, 3));
    const changedUpper = this.matchTrigram(changedLinesRaw.slice(3));

    const baseHexagram = this.getHexagramInfo(upper, lower);
    const changedHexagram = this.getHexagramInfo(changedUpper, changedLower);

    const nameSeed = this.getNameSeed(name);
    const genderSeed = this.getGenderSeed(gender);
    const toneIndex = (upperIndex * 3 + lowerIndex * 2 + movingLine + nameSeed + genderSeed) % 5;
    const identityNote = this.getIdentityNote(name, gender, toneIndex);
    const summary = `本卦为${baseHexagram.name}，变卦为${changedHexagram.name}。${OVERALL_TONES[toneIndex]}${identityNote}`;

    const elementBalance = this.getElementBalance(upper.element, lower.element);
    const advice = LINE_MESSAGES[movingLine];

    const lineRelations = this.getLineRelations(
      baseHexagram.symbol,
      this.getTrigramSymbol(upper.name),
      this.getTrigramSymbol(lower.name)
    );
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
}
