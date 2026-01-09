import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';

type TimeMode = 'time' | 'shichen';

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
  text: string;
}

interface FortuneResult {
  birthLabel: string;
  timeLabel: string;
  upper: Trigram;
  lower: Trigram;
  changedUpper: Trigram;
  changedLower: Trigram;
  movingLine: number;
  baseLines: LineDisplay[];
  changedLines: LineDisplay[];
  summary: string;
  elementBalance: string;
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
  '气势渐升，利于启动新计划，但需保持节奏。',
  '内外平衡，适合稳扎稳打，逐步累积成果。',
  '局面多变，灵活应对会带来突破与新资源。',
  '能量内敛，适合深耕与沉淀，等待时机。',
  '外放推进，贵人运显现，重在抓住关键窗口。'
];

const CAREER_TONES = [
  '事业上宜定目标、定时间表，持续推进。',
  '协作关系是关键，沟通清晰可加速进展。',
  '适合调整策略或学习新技能，为转型做准备。',
  '专注细节能赢得认可，避免分心与拖延。',
  '敢于承担核心任务，可获得更大舞台。'
];

const RELATION_TONES = [
  '情感上保持真诚与稳定，关系更易升温。',
  '适合主动表达关心，细节会带来安全感。',
  '沟通需更柔和，避免情绪化判断。',
  '守护彼此边界，尊重差异即可长久。',
  '新的缘分靠近，留意社交场合的信号。'
];

const WEALTH_TONES = [
  '财务以稳为主，避免情绪性消费。',
  '适合整理资产结构，给未来留出弹性。',
  '小额尝试更合适，保持现金流清晰。',
  '守成比冒进更稳健，谨慎评估风险。',
  '机会型收益显现，但要有退出计划。'
];

const HEALTH_TONES = [
  '注意作息节律，规律比强度更重要。',
  '身心需要舒展，适合温和运动与冥想。',
  '留意饮食与情绪波动，避免过度刺激。',
  '适合慢慢调养，保持稳定睡眠。',
  '行动力足，但别透支，留出恢复时间。'
];

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  birthDate = '';
  birthTime = '12:00';
  timeMode: TimeMode = 'time';
  shichenIndex = 6;
  shichenOptions = SHICHEN_OPTIONS;
  result?: FortuneResult;
  errorMessage = '';

  calculate(): void {
    this.errorMessage = '';
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

    this.result = this.buildFortune(date.year, date.month, date.day, hourIndex);
  }

  reset(): void {
    this.birthDate = '';
    this.birthTime = '12:00';
    this.timeMode = 'time';
    this.shichenIndex = 6;
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

  private buildFortune(year: number, month: number, day: number, hourIndex: number): FortuneResult {
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

    const toneIndex = (upperIndex * 3 + lowerIndex * 2 + movingLine) % 5;
    const summary = OVERALL_TONES[toneIndex];

    const elementBalance = this.getElementBalance(upper.element, lower.element);
    const advice = LINE_MESSAGES[movingLine];

    const sections: FortuneSection[] = [
      { title: '事业', text: CAREER_TONES[toneIndex] },
      { title: '情感', text: RELATION_TONES[toneIndex] },
      { title: '财运', text: WEALTH_TONES[toneIndex] },
      { title: '健康', text: HEALTH_TONES[toneIndex] }
    ];

    const birthLabel = `${year}年${month}月${day}日`;
    const timeLabel = this.getTimeLabel(hourIndex);

    return {
      birthLabel,
      timeLabel,
      upper,
      lower,
      changedUpper,
      changedLower,
      movingLine,
      baseLines: this.toDisplayLines(baseLinesRaw),
      changedLines: this.toDisplayLines(changedLinesRaw),
      summary,
      elementBalance,
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
}
