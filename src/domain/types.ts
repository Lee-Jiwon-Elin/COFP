export type StepKey = 'acknowledge' | 'apologize' | 'promise';

export interface StepType {
  key: StepKey;
  label: string;
  cls: 's1' | 's2' | 's3';
  helper: string;
}

export const STEP_TYPES: Record<StepKey, StepType> = {
  acknowledge: { key: 'acknowledge', label: '① 인정', cls: 's1', helper: '친구의 마음을 알아주세요' },
  apologize:   { key: 'apologize',   label: '② 사과', cls: 's2', helper: '진심으로 미안한 마음을 전해요' },
  promise:     { key: 'promise',     label: '③ 약속', cls: 's3', helper: '같은 실수를 하지 않겠다고 약속해요' }
};

export interface Step {
  type: StepType;
  before: string;
  after: string;
  options: string[];
  correctAnswer: string;
  praise: string;
}

export interface Badge {
  name: string;
  desc: string;
  emoji: 'foot' | 'block' | 'water';
}

export interface Situation {
  id: string;
  title: string;
  description: string;
  badge: Badge;
  scene: 'foot' | 'block' | 'water';
  steps: [Step, Step, Step];
}

export interface EarnedBadge extends Badge {
  earnedAt: number;
}

export interface ProgressData {
  badges: EarnedBadge[];
  completedSituations: string[];
}

export type ScreenId = 'home' | 'game' | 'badges';
