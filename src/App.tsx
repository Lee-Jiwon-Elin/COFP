import { useEffect, useState } from 'react';
import { Tts } from './application/tts';
import { Storage } from './data/storage';
import type { ProgressData, ScreenId } from './domain/types';
import { HomeScreen } from './components/HomeScreen';
import { GameScreen } from './components/GameScreen';
import { BadgesScreen } from './components/BadgesScreen';
import { Confetti } from './components/Confetti';

export default function App() {
  const [screen, setScreen] = useState<ScreenId>('home');
  const [progress, setProgress] = useState<ProgressData>(() => Storage.load());
  const [muted, setMuted] = useState(!Tts.enabled);
  const [confettiKey, setConfettiKey] = useState(0);

  useEffect(() => {
    Tts.init();
  }, []);

  const goHome = () => {
    Tts.stop();
    setProgress(Storage.load());
    setScreen('home');
  };

  return (
    <div id="app">
      <button
        id="muteBtn"
        title="음성 켜기/끄기"
        aria-label="음성"
        onClick={() => {
          const enabled = Tts.toggle();
          setMuted(!enabled);
        }}
      >
        {muted ? '🔇' : '🔊'}
      </button>

      {screen === 'home' && (
        <HomeScreen
          badgeCount={progress.badges.length}
          onStart={() => setScreen('game')}
          onShowBadges={() => setScreen('badges')}
        />
      )}

      {screen === 'game' && (
        <GameScreen
          startIndex={0}
          onHome={goHome}
          onProgressChange={setProgress}
          onConfetti={() => setConfettiKey((k) => k + 1)}
        />
      )}

      {screen === 'badges' && <BadgesScreen progress={progress} onHome={goHome} />}

      <Confetti trigger={confettiKey} />
    </div>
  );
}
