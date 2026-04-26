import type { JSX } from 'react';

type SceneKey = 'foot' | 'block' | 'water';

const Foot = (
  <>
    <ellipse cx="100" cy="148" rx="80" ry="6" fill="#F4D9A8" opacity="0.6" />
    <g>
      <circle cx="65" cy="55" r="18" fill="#FFD27D" />
      <rect x="53" y="73" width="24" height="44" rx="6" fill="#85B7EB" />
      <rect x="55" y="117" width="9" height="20" rx="3" fill="#5F4A3A" />
      <rect x="66" y="117" width="9" height="20" rx="3" fill="#5F4A3A" />
      <ellipse cx="60" cy="55" rx="2" ry="3" fill="#3D2E20" />
      <ellipse cx="70" cy="55" rx="2" ry="3" fill="#3D2E20" />
      <path d="M58 62 Q65 67 72 62" stroke="#3D2E20" strokeWidth="2" fill="none" strokeLinecap="round" />
    </g>
    <g>
      <circle cx="135" cy="55" r="18" fill="#FFB6C1" />
      <rect x="123" y="73" width="24" height="44" rx="6" fill="#FF9FAE" />
      <rect x="125" y="117" width="9" height="20" rx="3" fill="#5F4A3A" />
      <rect x="136" y="117" width="9" height="20" rx="3" fill="#5F4A3A" />
      <ellipse cx="130" cy="55" rx="2" ry="3" fill="#3D2E20" />
      <ellipse cx="140" cy="55" rx="2" ry="3" fill="#3D2E20" />
      <path d="M127 64 Q135 60 143 64" stroke="#3D2E20" strokeWidth="2" fill="none" strokeLinecap="round" />
    </g>
    <path d="M75 134 L122 134" stroke="#E8746A" strokeWidth="3" strokeLinecap="round" />
    <g transform="translate(155 25)">
      <path d="M0 0 L8 -8 M8 0 L0 -8" stroke="#E8746A" strokeWidth="2.5" strokeLinecap="round" />
      <path d="M4 8 L4 14" stroke="#E8746A" strokeWidth="2.5" strokeLinecap="round" />
    </g>
  </>
);

const Block = (
  <>
    <ellipse cx="100" cy="148" rx="80" ry="6" fill="#F4D9A8" opacity="0.6" />
    <g>
      <circle cx="55" cy="55" r="18" fill="#FFD27D" />
      <rect x="43" y="73" width="24" height="44" rx="6" fill="#7FCBA9" />
      <rect x="45" y="117" width="9" height="20" rx="3" fill="#5F4A3A" />
      <rect x="56" y="117" width="9" height="20" rx="3" fill="#5F4A3A" />
      <ellipse cx="50" cy="55" rx="2" ry="3" fill="#3D2E20" />
      <ellipse cx="60" cy="55" rx="2" ry="3" fill="#3D2E20" />
      <path d="M48 64 L62 64" stroke="#3D2E20" strokeWidth="2" strokeLinecap="round" />
    </g>
    <g transform="translate(95 80) rotate(15)">
      <rect x="0" y="0" width="28" height="22" rx="3" fill="#FF9FAE" />
      <rect x="40" y="-10" width="28" height="22" rx="3" fill="#85B7EB" transform="rotate(25)" />
      <rect x="65" y="20" width="28" height="22" rx="3" fill="#FFD27D" transform="rotate(45)" />
    </g>
    <g>
      <circle cx="170" cy="60" r="14" fill="#FFB6C1" />
      <ellipse cx="166" cy="60" rx="2" ry="3" fill="#3D2E20" />
      <ellipse cx="174" cy="60" rx="2" ry="3" fill="#3D2E20" />
      <ellipse cx="170" cy="68" rx="3" ry="2" fill="#3D2E20" />
    </g>
  </>
);

const Water = (
  <>
    <ellipse cx="100" cy="148" rx="80" ry="6" fill="#F4D9A8" opacity="0.6" />
    <rect x="30" y="90" width="140" height="14" rx="2" fill="#C9A678" />
    <rect x="30" y="104" width="140" height="6" fill="#A88656" />
    <rect x="50" y="68" width="50" height="22" rx="2" fill="white" stroke="#A88656" strokeWidth="1.5" />
    <line x1="58" y1="76" x2="92" y2="76" stroke="#C9A678" strokeWidth="1" />
    <line x1="58" y1="82" x2="88" y2="82" stroke="#C9A678" strokeWidth="1" />
    <g transform="translate(110 50) rotate(40)">
      <rect x="0" y="0" width="22" height="28" rx="3" fill="#85B7EB" />
      <ellipse cx="11" cy="0" rx="11" ry="3" fill="#5DA5DA" />
    </g>
    <ellipse cx="100" cy="92" rx="22" ry="5" fill="#85B7EB" opacity="0.7" />
    <ellipse cx="105" cy="89" rx="14" ry="3" fill="#5DA5DA" opacity="0.5" />
    <circle cx="120" cy="86" r="3" fill="#85B7EB" />
    <circle cx="84" cy="88" r="2" fill="#85B7EB" />
    <g>
      <circle cx="160" cy="60" r="14" fill="#FFB6C1" />
      <ellipse cx="156" cy="60" rx="2" ry="3" fill="#3D2E20" />
      <ellipse cx="164" cy="60" rx="2" ry="3" fill="#3D2E20" />
      <path d="M156 68 Q160 65 164 68" stroke="#3D2E20" strokeWidth="1.8" fill="none" strokeLinecap="round" />
    </g>
  </>
);

const SCENES: Record<SceneKey, JSX.Element> = { foot: Foot, block: Block, water: Water };

export function Scene({ name }: { name: SceneKey }) {
  return (
    <svg className="scene" viewBox="0 0 200 160" aria-hidden="true">
      {SCENES[name]}
    </svg>
  );
}
