// Utility to manage sounds using Web Audio API and SpeechSynthesis

const synth = window.speechSynthesis;

const getJapaneseVoice = () => {
    const voices = synth.getVoices();
    // Try to find a Japanese voice, otherwise fallback to default
    return voices.find(voice => voice.lang.includes('ja')) || voices[0];
};

export const playRefereeCommand = (text) => {
    if (!synth) return;

    // Cancel previous speech to avoid queueing
    synth.cancel();

    // Process text to ensure Japanese pronunciation
    const commandMap = {
        "Hajime": "はじめ", // Hajime
        "Yame": "やめ", // Yame
        "Aka No Kachi": "あかの かち", // Aka no Kachi
        "Ao No Kachi": "あおの かち",  // Ao no Kachi
        "Atoshi Baraku": "あと しばらく" // Atoshi Baraku (Ato Shibaraku)
    };
    const textToSpeak = commandMap[text] || text;

    const utterance = new SpeechSynthesisUtterance(textToSpeak);
    const voice = getJapaneseVoice();
    if (voice) utterance.voice = voice;

    utterance.lang = 'ja-JP';
    utterance.rate = 1.1; // Slightly faster for command authority
    utterance.pitch = 0.8; // Slightly deeper
    utterance.volume = 1.0;

    synth.speak(utterance);
};

export const playBuzzer = () => {
    try {
        const AudioContext = window.AudioContext || window.webkitAudioContext;
        if (!AudioContext) return;

        const ctx = new AudioContext();
        const osc = ctx.createOscillator();
        const gain = ctx.createGain();

        osc.connect(gain);
        gain.connect(ctx.destination);

        // Simulation of a heavy buzzer/gong
        osc.type = 'square';
        osc.frequency.setValueAtTime(150, ctx.currentTime);
        osc.frequency.exponentialRampToValueAtTime(40, ctx.currentTime + 1.5);

        gain.gain.setValueAtTime(0.5, ctx.currentTime);
        gain.gain.exponentialRampToValueAtTime(0.01, ctx.currentTime + 1.5);

        osc.start();
        osc.stop(ctx.currentTime + 1.5);
    } catch (e) {
        console.error("Audio Playback Error:", e);
    }
};

export const playTaikoHit = () => {
    try {
        const AudioContext = window.AudioContext || window.webkitAudioContext;
        if (!AudioContext) return;

        const ctx = new AudioContext();
        const osc = ctx.createOscillator();
        const gain = ctx.createGain();

        osc.connect(gain);
        gain.connect(ctx.destination);

        // Simulation of a drum hit
        osc.type = 'sine';
        osc.frequency.setValueAtTime(100, ctx.currentTime);
        osc.frequency.exponentialRampToValueAtTime(0.01, ctx.currentTime + 0.5);

        gain.gain.setValueAtTime(1, ctx.currentTime);
        gain.gain.exponentialRampToValueAtTime(0.01, ctx.currentTime + 0.5);

        osc.start();
        osc.stop(ctx.currentTime + 0.5);
    } catch (e) {
        console.error("Audio Playback Error:", e);
    }
}
