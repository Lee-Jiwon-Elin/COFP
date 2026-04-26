import { useEffect, useMemo, useState } from 'react';
import { Tts } from '../application/tts';
import { shuffle } from '../application/shuffle';
import { Storage } from '../data/storage';
import { SITUATIONS } from '../data/situations';
import type { Badge, ProgressData, Situation } from '../domain/types';
import { Scene } from '../presentation/scenes';
import { BadgeIcon } from '../presentation/badge-icons';
import { Overlay } from './Overlay';

type FeedbackMode = null | 'step' | 'situation';

interface Props {
  startIndex?: number;
  onHome: () => void;
  onProgressChange: (p: ProgressData) => void;
  onConfetti: () => void;
}

export function GameScreen({ startIndex = 0, onHome, onProgressChange, onConfetti }: Props) {
  const [situationIndex, setSituationIndex] = useState(startIndex);
  const [stepIndex, setStepIndex] = useState(0);
  const [filled, setFilled] = useState<(string | null)[]>([null, null, null]);
  const [wrongIdx, setWrongIdx] = useState<number | null>(null);
  const [rightIdx, setRightIdx] = useState<number | null>(null);
  const [locked, setLocked] = useState(false);
  const [feedback, setFeedback] = useState<FeedbackMode>(null);

  const situation: Situation = SITUATIONS[situationIndex];
  const step = situation.steps[stepIndex];

  // 매 단계마다 옵션 셔플 — 정답 위치가 매번 무작위.
  const shuffledOptions = useMemo(
    () => shuffle(step.options),
    [situationIndex, stepIndex] // eslint-disable-line react-hooks/exhaustive-deps
  );

  const speakCurrent = () => {
    Tts.speak(`${situation.description} ${step.before} 빈칸 ${step.after}`);
  };

  // 단계가 바뀔 때마다 자동 음성 재생
  useEffect(() => {
    const id = window.setTimeout(speakCurrent, 300);
    return () => window.clearTimeout(id);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [situationIndex, stepIndex]);

  const handlePick = (optionValue: string, idx: number) => {
    if (locked) return;
    if (optionValue === step.correctAnswer) {
      setRightIdx(idx);
      setLocked(true);
      Tts.speak(optionValue);
      window.setTimeout(() => {
        setFilled((prev) => {
          const next = [...prev];
          next[stepIndex] = optionValue;
          return next;
        });
        window.setTimeout(() => setFeedback('step'), 600);
      }, 500);
    } else {
      setWrongIdx(idx);
      Tts.speak('다시 한번 골라봐요');
      window.setTimeout(() => setWrongIdx(null), 600);
    }
  };

  const advanceStep = () => {
    setFeedback(null);
    setRightIdx(null);
    setLocked(false);
    if (stepIndex < 2) {
      setStepIndex((s) => s + 1);
      return;
    }
    completeSituation();
  };

  const completeSituation = () => {
    Storage.completeSituation(situation.id);
    const updated = Storage.earnBadge(situation.badge);
    onProgressChange(updated);
    onConfetti();
    setFeedback('situation');
    Tts.speak(`사과 완성! ${fullSentenceForCompletion}`);
  };

  const goNextSituation = () => {
    const next = situationIndex + 1;
    if (next >= SITUATIONS.length) {
      goHomeFromComplete();
      return;
    }
    setSituationIndex(next);
    setStepIndex(0);
    setFilled([null, null, null]);
    setRightIdx(null);
    setLocked(false);
    setFeedback(null);
  };

  const goHomeFromComplete = () => {
    Tts.stop();
    setFeedback(null);
    onHome();
  };

  const fullSentenceForCompletion = buildFullApology(situation, [
    filled[0] ?? situation.steps[0].correctAnswer,
    filled[1] ?? situation.steps[1].correctAnswer,
    step.correctAnswer
  ]);

  const hasNext = situationIndex + 1 < SITUATIONS.length;

  return (
    <section className="screen active">
      <div className="top-bar">
        <button
          className="icon-btn"
          onClick={() => {
            Tts.stop();
            onHome();
          }}
        >
          ← 홈으로
        </button>
        <span className="crumb">상황 {situationIndex + 1} / {SITUATIONS.length}</span>
        <button
          className="icon-btn"
          onClick={() =>
            alert(
              '교사 모드 (프로토타입)\n\n• 상황 건너뛰기\n• 진도 초기화\n• 음성 속도 조절\n\n실제 빌드에서는 이 곳에 컨트롤 패널이 표시됩니다.'
            )
          }
        >
          교사 모드
        </button>
      </div>

      <div className="step-indicator">
        {situation.steps.flatMap((s, i) => {
          const cls = ['step-pill', s.type.cls];
          if (i === stepIndex) cls.push('active');
          if (i < stepIndex) cls.push('done');
          const pill = (
            <div key={s.type.key} className={cls.join(' ')}>
              {s.type.label}
            </div>
          );
          if (i === situation.steps.length - 1) return [pill];
          return [
            pill,
            <div key={`conn-${i}`} className={`step-conn${i < stepIndex ? ' done' : ''}`} />
          ];
        })}
      </div>

      <div className="game-body">
        <div className="situation-card">
          <Scene name={situation.scene} />
          <div className="text">
            <div className="label">상황 · {situation.title}</div>
            <p>{situation.description}</p>
            <button className="play-btn" onClick={speakCurrent}>
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                <path d="M11 5L6 9H2v6h4l5 4V5z" />
                <path d="M15.54 8.46a5 5 0 0 1 0 7.07" />
                <path d="M19.07 4.93a10 10 0 0 1 0 14.14" />
              </svg>
              <span>다시 듣기</span>
            </button>
          </div>
        </div>

        <p className="helper-text">{step.type.helper}</p>

        <div className="sentence-card">
          <div className="sentence">
            {step.before}{' '}
            {filled[stepIndex] ? (
              <span className="blank filled">{filled[stepIndex]}</span>
            ) : (
              <span className={`blank${wrongIdx !== null ? ' shake' : ''}`}>＿＿＿</span>
            )}{' '}
            {step.after}
          </div>
        </div>

        <div className="word-tray">
          {shuffledOptions.map((opt, i) => {
            const cls = ['word-block'];
            if (rightIdx === i) cls.push('right');
            if (wrongIdx === i) cls.push('wrong');
            if (locked && rightIdx !== i) cls.push('disabled');
            return (
              <button key={opt} className={cls.join(' ')} onClick={() => handlePick(opt, i)}>
                {opt}
              </button>
            );
          })}
        </div>
      </div>

      <Overlay open={feedback === 'step'}>
        <svg className="feedback-icon" viewBox="0 0 90 90">
          <circle cx="45" cy="45" r="40" fill="#E8F6F0" stroke="#3FA88A" strokeWidth="3" />
          <path d="M28 46 L40 58 L62 34" stroke="#3FA88A" strokeWidth="6" fill="none" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
        <h2>잘했어요!</h2>
        <p className="feedback-text">{step.praise}</p>
        <button className="big-btn" onClick={advanceStep}>
          {stepIndex === 2 ? '사과 완성하기 →' : '다음 단계로 →'}
        </button>
      </Overlay>

      <Overlay open={feedback === 'situation'}>
        <CompletionContent
          badge={situation.badge}
          fullText={fullSentenceForCompletion}
          hasNext={hasNext}
          onNext={goNextSituation}
          onHome={goHomeFromComplete}
        />
      </Overlay>
    </section>
  );
}

function CompletionContent({
  badge,
  fullText,
  hasNext,
  onNext,
  onHome
}: {
  badge: Badge;
  fullText: string;
  hasNext: boolean;
  onNext: () => void;
  onHome: () => void;
}) {
  return (
    <>
      <BadgeIcon emoji={badge.emoji} className="feedback-icon" />
      <h2>사과 완성!</h2>
      <p className="feedback-text">'{badge.name}' 배지를 얻었어요!</p>
      <div className="full-sentence">{fullText}</div>
      <div>
        {hasNext && (
          <button className="big-btn" onClick={onNext}>다음 상황으로 →</button>
        )}
        <button className="big-btn secondary" onClick={onHome}>홈으로</button>
      </div>
    </>
  );
}

function buildFullApology(situation: Situation, words: string[]): string {
  return situation.steps
    .map((s, i) => `${s.before} ${words[i]} ${s.after}`.replace(/\s+/g, ' ').trim())
    .join(' ');
}
