import type { ReactNode } from 'react';

interface Props {
  open: boolean;
  children: ReactNode;
}

export function Overlay({ open, children }: Props) {
  return (
    <div className={`overlay${open ? ' active' : ''}`}>
      <div className="overlay-card">{children}</div>
    </div>
  );
}
