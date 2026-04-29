/**
 * Hook to play a notification beep sound using Web Audio API.
 * No external audio files needed.
 */
export const useNotificationSound = () => {
  const playNotification = () => {
    try {
      const audioCtx = new (window.AudioContext || (window as any).webkitAudioContext)();

      // First beep
      const playBeep = (startTime: number, frequency: number, duration: number) => {
        const oscillator = audioCtx.createOscillator();
        const gainNode = audioCtx.createGain();
        oscillator.connect(gainNode);
        gainNode.connect(audioCtx.destination);
        oscillator.frequency.value = frequency;
        oscillator.type = "sine";
        gainNode.gain.setValueAtTime(0.3, startTime);
        gainNode.gain.exponentialRampToValueAtTime(0.01, startTime + duration);
        oscillator.start(startTime);
        oscillator.stop(startTime + duration);
      };

      const now = audioCtx.currentTime;
      playBeep(now, 880, 0.15);        // A5
      playBeep(now + 0.18, 1100, 0.15); // C#6
      playBeep(now + 0.36, 1320, 0.2);  // E6

    } catch (e) {
      console.warn("Could not play notification sound:", e);
    }
  };

  // Soft recurring "ping" used as a reminder while users are waiting for action
  const playWaitingPing = () => {
    try {
      const audioCtx = new (window.AudioContext || (window as any).webkitAudioContext)();
      const playBeep = (startTime: number, frequency: number, duration: number, vol = 0.18) => {
        const osc = audioCtx.createOscillator();
        const gain = audioCtx.createGain();
        osc.connect(gain);
        gain.connect(audioCtx.destination);
        osc.frequency.value = frequency;
        osc.type = "triangle";
        gain.gain.setValueAtTime(vol, startTime);
        gain.gain.exponentialRampToValueAtTime(0.001, startTime + duration);
        osc.start(startTime);
        osc.stop(startTime + duration);
      };
      const now = audioCtx.currentTime;
      playBeep(now, 1320, 0.12);
      playBeep(now + 0.14, 990, 0.18);
    } catch (e) {
      console.warn("Could not play waiting ping:", e);
    }
  };

  return { playNotification, playWaitingPing };
};
