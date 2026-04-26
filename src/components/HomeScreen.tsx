import { Mascot } from './Mascot';

interface Props {
  badgeCount: number;
  onStart: () => void;
  onShowBadges: () => void;
}

export function HomeScreen({ badgeCount, onStart, onShowBadges }: Props) {
  return (
    <section className="screen home active">
      <Mascot />
      <h1 className="title display">
        <span>인</span><span>사</span><span>약</span>
      </h1>
      <p className="subtitle">진심을 담은 사과 연습</p>
      <div className="progress-pill">
        <span>오늘까지 모은 배지</span>
        <b>{badgeCount}</b>
        <span>개</span>
      </div>
      <div className="home-actions">
        <button className="big-btn" onClick={onStart}>시작하기</button>
        <button className="big-btn secondary" onClick={onShowBadges}>내 배지 보기</button>
      </div>
    </section>
  );
}
