import type { Badge, ProgressData } from '../domain/types';

const KEY = 'insayak.progress.v1';
const EMPTY: ProgressData = { badges: [], completedSituations: [] };

export const Storage = {
  load(): ProgressData {
    try {
      const raw = localStorage.getItem(KEY);
      return raw ? (JSON.parse(raw) as ProgressData) : { ...EMPTY };
    } catch {
      return { ...EMPTY };
    }
  },
  save(data: ProgressData): void {
    localStorage.setItem(KEY, JSON.stringify(data));
  },
  earnBadge(badge: Badge): ProgressData {
    const data = Storage.load();
    if (!data.badges.find((b) => b.name === badge.name)) {
      data.badges.push({ ...badge, earnedAt: Date.now() });
      Storage.save(data);
    }
    return data;
  },
  completeSituation(id: string): ProgressData {
    const data = Storage.load();
    if (!data.completedSituations.includes(id)) {
      data.completedSituations.push(id);
      Storage.save(data);
    }
    return data;
  }
};
