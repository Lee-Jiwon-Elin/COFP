import { useEffect, useState } from 'react';

const COLORS = ['#FF8B6B', '#6FCFB1', '#B79CED', '#FF9FAE', '#FFD27D', '#85B7EB'];

interface Piece {
  id: number;
  left: number;
  color: string;
  delay: number;
  duration: number;
}

interface Props {
  trigger: number; // 트리거 카운터 — 변경될 때마다 새 컨페티 발사
}

export function Confetti({ trigger }: Props) {
  const [pieces, setPieces] = useState<Piece[]>([]);

  useEffect(() => {
    if (trigger === 0) return;
    const next: Piece[] = Array.from({ length: 60 }, (_, i) => ({
      id: trigger * 1000 + i,
      left: Math.random() * 100,
      color: COLORS[i % COLORS.length],
      delay: Math.random() * 0.4,
      duration: 2 + Math.random() * 1.5
    }));
    setPieces(next);
    const t = window.setTimeout(() => setPieces([]), 3500);
    return () => window.clearTimeout(t);
  }, [trigger]);

  return (
    <div className="confetti-holder" aria-hidden="true">
      {pieces.map((p) => (
        <div
          key={p.id}
          className="confetti go"
          style={{
            left: `${p.left}%`,
            background: p.color,
            animationDelay: `${p.delay}s`,
            animationDuration: `${p.duration}s`
          }}
        />
      ))}
    </div>
  );
}
