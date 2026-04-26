class TtsService {
  enabled = true;
  private voice: SpeechSynthesisVoice | null = null;

  init() {
    if (!('speechSynthesis' in window)) {
      this.enabled = false;
      return;
    }
    const pickVoice = () => {
      const voices = speechSynthesis.getVoices();
      this.voice =
        voices.find((v) => v.lang === 'ko-KR') ||
        voices.find((v) => v.lang.startsWith('ko')) ||
        null;
    };
    pickVoice();
    speechSynthesis.onvoiceschanged = pickVoice;
  }

  speak(text: string) {
    if (!this.enabled || !('speechSynthesis' in window)) return;
    speechSynthesis.cancel();
    const u = new SpeechSynthesisUtterance(text);
    u.lang = 'ko-KR';
    u.rate = 0.95;
    u.pitch = 1.05;
    if (this.voice) u.voice = this.voice;
    speechSynthesis.speak(u);
  }

  stop() {
    if ('speechSynthesis' in window) speechSynthesis.cancel();
  }

  toggle(): boolean {
    this.enabled = !this.enabled;
    if (!this.enabled) this.stop();
    return this.enabled;
  }
}

export const Tts = new TtsService();
