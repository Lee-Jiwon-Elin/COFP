import { SITUATIONS } from '../data/situations';
import type { ProgressData } from '../domain/types';
import { BadgeIcon } from '../presentation/badge-icons';

interface Props {
  progress: ProgressData;
  onHome: () => void;
}

export function BadgesScreen({ progress, onHome }: Props) {
  return (
    <section className="screen active">
      <div className="top-bar">
        <button className="icon-btn" onClick={onHome}>← 홈으로</button>
        <span className="crumb">내 배지</span>
        <span style={{ width: 80 }} />
      </div>
      <div style={{ textAlign: 'center', margin: '12px 0 4px' }}>
        <h2 className="display" style={{ fontSize: 32, color: 'var(--primary-dark)' }}>잘하고 있어요!</h2>
        <p style={{ color: 'var(--ink-soft)' }}>사과를 연습할 때마다 배지를 모을 수 있어요.</p>
      </div>
      <div className="badge-grid">
        {SITUATIONS.map((sit) => {
          const earned = progress.badges.find((b) => b.name === sit.badge.name);
          return (
            <div key={sit.id} className={`badge-card${earned ? '' : ' locked'}`}>
              <BadgeIcon emoji={sit.badge.emoji} />
              <div className="name">{sit.badge.name}</div>
              <div className="desc">{earned ? '획득 완료' : '아직 잠김'}</div>
            </div>
          );
        })}
      </div>
    </section>
  );
}
