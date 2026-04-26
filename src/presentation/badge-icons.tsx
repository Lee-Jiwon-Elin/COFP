import type { Badge } from '../domain/types';

interface Props {
  emoji: Badge['emoji'];
  className?: string;
}

export function BadgeIcon({ emoji, className }: Props) {
  if (emoji === 'foot') {
    return (
      <svg viewBox="0 0 64 64" className={className}>
        <circle cx="32" cy="32" r="30" fill="#FFE4B5" stroke="#E66A4A" strokeWidth="2" />
        <ellipse cx="26" cy="38" rx="9" ry="14" fill="#FFD27D" />
        <circle cx="22" cy="22" r="3" fill="#FFD27D" />
        <circle cx="28" cy="20" r="3" fill="#FFD27D" />
        <circle cx="34" cy="22" r="3" fill="#FFD27D" />
        <circle cx="40" cy="26" r="3.5" fill="#FFD27D" />
      </svg>
    );
  }
  if (emoji === 'block') {
    return (
      <svg viewBox="0 0 64 64" className={className}>
        <circle cx="32" cy="32" r="30" fill="#E8F6F0" stroke="#3FA88A" strokeWidth="2" />
        <rect x="20" y="34" width="11" height="11" fill="#FF9FAE" stroke="#3D2E20" strokeWidth="1" />
        <rect x="33" y="34" width="11" height="11" fill="#85B7EB" stroke="#3D2E20" strokeWidth="1" />
        <rect x="26" y="22" width="11" height="11" fill="#FFD27D" stroke="#3D2E20" strokeWidth="1" />
      </svg>
    );
  }
  return (
    <svg viewBox="0 0 64 64" className={className}>
      <circle cx="32" cy="32" r="30" fill="#E8F2FF" stroke="#5DA5DA" strokeWidth="2" />
      <path
        d="M32 14 C24 26, 20 34, 20 42 C20 50, 26 54, 32 54 C38 54, 44 50, 44 42 C44 34, 40 26, 32 14 Z"
        fill="#85B7EB"
        stroke="#3D2E20"
        strokeWidth="1.5"
      />
      <ellipse cx="28" cy="40" rx="3" ry="5" fill="white" opacity="0.6" />
    </svg>
  );
}
