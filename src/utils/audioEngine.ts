/**
 * Vedic Audio Engine for Bhagavad Gita Recitation
 * Features:
 * 1. Web Audio Tanpura (Tambura) Meditative Drone Synthesizer
 * 2. Divine Bansuri (Flute) Melodic Synthesizer for Sri Krishna's soft presence
 * 3. Sacred Temple Bell / Shankh Chime Synthesizer
 * 4. Multi-Voice Persona Engine with Sri Krishna Soft Divine Voice
 * 5. Robust Cross-Browser TTS with Automatic Phonetic Fallback (Devanagari + Romanized)
 */

export type VoicePersona = 'krishna' | 'saraswati' | 'rishi' | 'yogi';
export type RecitationLanguageMode = 'sanskrit_auto' | 'sanskrit_devanagari' | 'sanskrit_phonetic' | 'english' | 'hindi';

export interface VoiceProfile {
  id: VoicePersona;
  name: string;
  hindiName: string;
  subtitle: string;
  rate: number;
  pitch: number;
  volume: number;
  gender: 'male' | 'female';
  description: string;
  sampleQuoteDevanagari: string;
  sampleQuotePhonetic: string;
}

export const VOICE_PROFILES: Record<VoicePersona, VoiceProfile> = {
  krishna: {
    id: 'krishna',
    name: 'Sri Krishna Soft Voice',
    hindiName: 'श्रीकृष्ण मृदु स्वर',
    subtitle: 'Gentle, Divine & Serene',
    rate: 0.82,
    pitch: 0.98,
    volume: 0.95,
    gender: 'male',
    description: 'Soft, compassionate, and tranquil voice of the Lord soothing warrior Arjuna on the chariot.',
    sampleQuoteDevanagari: 'मामेकं शरणं व्रज अहं त्वां सर्वपापेभ्यो मोक्षयिष्यामि मा शुचः',
    sampleQuotePhonetic: 'Mām ekam sharanam vraja, aham tvām sarva pāpebhyo mokshayishyāmi, mā shuchah.'
  },
  saraswati: {
    id: 'saraswati',
    name: 'Devi Divine Voice',
    hindiName: 'देवी मधुर स्वर',
    subtitle: 'Melodious & Pure',
    rate: 0.85,
    pitch: 1.15,
    volume: 0.92,
    gender: 'female',
    description: 'Sweet, crystalline, and melodic feminine spiritual recitation.',
    sampleQuoteDevanagari: 'कर्मण्येवाधिकारस्ते मा फलेषु कदाचन',
    sampleQuotePhonetic: 'Karmany evādhikāras te mā phaleshu kadāchana.'
  },
  rishi: {
    id: 'rishi',
    name: 'Vedic Rishi Chanting',
    hindiName: 'ऋषि गंभीर स्वर',
    subtitle: 'Deep & Traditional',
    rate: 0.88,
    pitch: 0.85,
    volume: 0.95,
    gender: 'male',
    description: 'Resonant, authoritative, and classical temple chant with Vedic cadences.',
    sampleQuoteDevanagari: 'यदा यदा हि धर्मस्य ग्लानिर्भवति भारत',
    sampleQuotePhonetic: 'Yadā yadā hi dharmasya glānir bhavati bhārata.'
  },
  yogi: {
    id: 'yogi',
    name: 'Dhyana Yogi Voice',
    hindiName: 'ध्यान शांत स्वर',
    subtitle: 'Meditative & Quiet',
    rate: 0.78,
    pitch: 0.92,
    volume: 0.88,
    gender: 'male',
    description: 'Slow, whisper-soft, and introspective voice ideal for deep contemplation.',
    sampleQuoteDevanagari: 'यतो यतो निश्चरति मनश्चञ्चलमस्थिरम्',
    sampleQuotePhonetic: 'Yato yato nishcharati manash chañchalam asthiram.'
  }
};

class TanpuraDrone {
  private ctx: AudioContext | null = null;
  private isPlaying = false;
  private masterGain: GainNode | null = null;
  private intervalId: number | null = null;
  private stringIndex = 0;
  private volume = 0.35;

  private readonly frequencies = [207.65, 277.18, 277.18, 138.59];

  private getContext(): AudioContext {
    if (!this.ctx) {
      const AudioCtx = window.AudioContext || (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext;
      this.ctx = new AudioCtx();
    }
    if (this.ctx.state === 'suspended') {
      this.ctx.resume();
    }
    return this.ctx;
  }

  public setVolume(vol: number) {
    this.volume = Math.max(0, Math.min(1, vol));
    if (this.masterGain && this.ctx) {
      this.masterGain.gain.setTargetAtTime(this.volume, this.ctx.currentTime, 0.05);
    }
  }

  public getIsPlaying(): boolean {
    return this.isPlaying;
  }

  public start() {
    if (this.isPlaying) return;
    try {
      const ctx = this.getContext();
      this.masterGain = ctx.createGain();
      this.masterGain.gain.setValueAtTime(this.volume, ctx.currentTime);
      this.masterGain.connect(ctx.destination);
      this.isPlaying = true;

      this.strumNextString();
      this.intervalId = window.setInterval(() => {
        if (this.isPlaying) {
          this.strumNextString();
        }
      }, 1400);
    } catch {
      // Audio context might fail without user gesture
    }
  }

  private strumNextString() {
    if (!this.ctx || !this.masterGain) return;
    const ctx = this.ctx;
    const baseFreq = this.frequencies[this.stringIndex];
    this.stringIndex = (this.stringIndex + 1) % this.frequencies.length;

    const now = ctx.currentTime;
    const noteGain = ctx.createGain();
    noteGain.gain.setValueAtTime(0, now);
    noteGain.gain.linearRampToValueAtTime(0.18, now + 0.08);
    noteGain.gain.exponentialRampToValueAtTime(0.0001, now + 4.2);

    const filter = ctx.createBiquadFilter();
    filter.type = 'lowpass';
    filter.frequency.setValueAtTime(1400, now);

    const osc1 = ctx.createOscillator();
    osc1.type = 'sawtooth';
    osc1.frequency.setValueAtTime(baseFreq, now);

    const osc2 = ctx.createOscillator();
    osc2.type = 'sine';
    osc2.frequency.setValueAtTime(baseFreq * 2, now);

    const osc3 = ctx.createOscillator();
    osc3.type = 'triangle';
    osc3.frequency.setValueAtTime(baseFreq * 3, now);

    osc1.connect(noteGain);
    osc2.connect(noteGain);
    osc3.connect(noteGain);

    noteGain.connect(filter);
    filter.connect(this.masterGain);

    osc1.start(now);
    osc2.start(now);
    osc3.start(now);

    osc1.stop(now + 4.5);
    osc2.stop(now + 4.5);
    osc3.stop(now + 4.5);
  }

  public stop() {
    if (!this.isPlaying) return;
    if (this.intervalId !== null) {
      clearInterval(this.intervalId);
      this.intervalId = null;
    }
    if (this.masterGain && this.ctx) {
      try {
        this.masterGain.gain.setTargetAtTime(0, this.ctx.currentTime, 0.3);
      } catch {
        // ignore
      }
    }
    this.isPlaying = false;
  }
}

/**
 * Divine Bansuri Flute Synthesizer
 */
class DivineFluteSynth {
  private ctx: AudioContext | null = null;

  private getContext(): AudioContext {
    if (!this.ctx) {
      const AudioCtx = window.AudioContext || (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext;
      this.ctx = new AudioCtx();
    }
    if (this.ctx.state === 'suspended') {
      this.ctx.resume();
    }
    return this.ctx;
  }

  public playKrishnaFluteChime() {
    try {
      const ctx = this.getContext();
      const now = ctx.currentTime;

      const notes = [
        { freq: 277.18, time: 0, dur: 0.6 },     // Sa
        { freq: 349.23, time: 0.28, dur: 0.7 },  // Ga
        { freq: 415.30, time: 0.60, dur: 1.4 },  // Pa
      ];

      notes.forEach(({ freq, time, dur }) => {
        const start = now + time;
        const osc = ctx.createOscillator();
        const vibrato = ctx.createOscillator();
        const vibratoGain = ctx.createGain();
        const gain = ctx.createGain();
        const filter = ctx.createBiquadFilter();

        osc.type = 'sine';
        osc.frequency.setValueAtTime(freq, start);

        vibrato.frequency.setValueAtTime(5, start);
        vibratoGain.gain.setValueAtTime(3.5, start);
        vibrato.connect(osc.frequency);

        filter.type = 'lowpass';
        filter.frequency.setValueAtTime(1800, start);

        gain.gain.setValueAtTime(0, start);
        gain.gain.linearRampToValueAtTime(0.12, start + 0.12);
        gain.gain.exponentialRampToValueAtTime(0.0001, start + dur);

        osc.connect(filter);
        filter.connect(gain);
        gain.connect(ctx.destination);

        vibrato.start(start);
        osc.start(start);
        vibrato.stop(start + dur);
        osc.stop(start + dur);
      });
    } catch {
      // AudioContext fallback
    }
  }
}

class TempleBellChime {
  private ctx: AudioContext | null = null;

  private getContext(): AudioContext {
    if (!this.ctx) {
      const AudioCtx = window.AudioContext || (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext;
      this.ctx = new AudioCtx();
    }
    if (this.ctx.state === 'suspended') {
      this.ctx.resume();
    }
    return this.ctx;
  }

  public playBell() {
    try {
      const ctx = this.getContext();
      const now = ctx.currentTime;
      const freqs = [784, 1568, 2349];
      const master = ctx.createGain();
      master.gain.setValueAtTime(0.25, now);
      master.connect(ctx.destination);

      freqs.forEach((f, i) => {
        const osc = ctx.createOscillator();
        const gain = ctx.createGain();
        osc.type = i === 0 ? 'sine' : 'triangle';
        osc.frequency.setValueAtTime(f, now);

        gain.gain.setValueAtTime(0.2 / (i + 1), now);
        gain.gain.exponentialRampToValueAtTime(0.0001, now + 2.8);

        osc.connect(gain);
        gain.connect(master);
        osc.start(now);
        osc.stop(now + 3.0);
      });
    } catch {
      // AudioContext fallback
    }
  }

  public playJapaBeadClick() {
    try {
      const ctx = this.getContext();
      const now = ctx.currentTime;
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();
      osc.type = 'triangle';
      osc.frequency.setValueAtTime(440, now);
      osc.frequency.exponentialRampToValueAtTime(110, now + 0.05);

      gain.gain.setValueAtTime(0.18, now);
      gain.gain.exponentialRampToValueAtTime(0.001, now + 0.06);

      osc.connect(gain);
      gain.connect(ctx.destination);
      osc.start(now);
      osc.stop(now + 0.08);
    } catch {
      // ignore
    }
  }
}

export type PlaybackState = 'idle' | 'playing' | 'paused' | 'ended';

/**
 * Normalizes Romanized transliteration text so any standard TTS engine
 * pronounces Sanskrit verses smoothly without choking on diacritics
 */
function toPhoneticReadable(text: string): string {
  return text
    .replace(/[॥।]/g, '')
    .replace(/[āĀ]/g, 'aa')
    .replace(/[īĪ]/g, 'ee')
    .replace(/[ūŪ]/g, 'oo')
    .replace(/[ṛṚ]/g, 'ri')
    .replace(/[ñÑṇṆṅṄ]/g, 'n')
    .replace(/[śŚṣṢ]/g, 'sh')
    .replace(/[ṭṬ]/g, 't')
    .replace(/[ḍḌ]/g, 'd')
    .replace(/[ḥḤ]/g, 'h')
    .replace(/[-]/g, ' ')
    .replace(/\s+/g, ' ')
    .trim();
}

function cleanDevanagari(text: string): string {
  // Strip Sanskrit double danda and single danda which crash certain browser TTS engines
  return text.replace(/[॥।]/g, ' ').replace(/\s+/g, ' ').trim();
}

export class GitaAudioPlayer {
  public static tanpura = new TanpuraDrone();
  public static bell = new TempleBellChime();
  public static flute = new DivineFluteSynth();

  private currentUtterance: SpeechSynthesisUtterance | null = null;
  private currentShlokaId: string | null = null;
  private currentLineIndex = 0;
  private state: PlaybackState = 'idle';

  private activePersona: VoicePersona = 'krishna';
  private selectedVoiceUri: string | null = null;
  private recitationMode: RecitationLanguageMode = 'sanskrit_auto';
  private userRateMultiplier = 1.0;
  private repeatTimes = 1;
  private currentRepeatCount = 0;
  private isTranslationEnabled = false;

  private onStateChangeCb?: (state: PlaybackState) => void;
  private onLineChangeCb?: (lineIdx: number) => void;
  private onRepeatCountChangeCb?: (count: number) => void;
  private onCompleteCb?: () => void;

  constructor() {
    try {
      const savedPersona = localStorage.getItem('gita_voice_persona') as VoicePersona;
      if (savedPersona && VOICE_PROFILES[savedPersona]) {
        this.activePersona = savedPersona;
      }
      const savedUri = localStorage.getItem('gita_voice_uri');
      if (savedUri) {
        this.selectedVoiceUri = savedUri;
      }
      const savedMode = localStorage.getItem('gita_recitation_mode') as RecitationLanguageMode;
      if (savedMode) {
        this.recitationMode = savedMode;
      }
    } catch {
      // fallback
    }

    // Keep voices warm
    if (typeof window !== 'undefined' && 'speechSynthesis' in window) {
      window.speechSynthesis.getVoices();
      window.speechSynthesis.onvoiceschanged = () => {
        window.speechSynthesis.getVoices();
      };
    }
  }

  public setCallbacks(cbs: {
    onStateChange?: (state: PlaybackState) => void;
    onLineChange?: (lineIdx: number) => void;
    onRepeatCountChange?: (count: number) => void;
    onComplete?: () => void;
  }) {
    this.onStateChangeCb = cbs.onStateChange;
    this.onLineChangeCb = cbs.onLineChange;
    this.onRepeatCountChangeCb = cbs.onRepeatCountChange;
    this.onCompleteCb = cbs.onComplete;
  }

  public setPersona(persona: VoicePersona) {
    if (VOICE_PROFILES[persona]) {
      this.activePersona = persona;
      try {
        localStorage.setItem('gita_voice_persona', persona);
      } catch {
        // ignore
      }
    }
  }

  public getPersona(): VoicePersona {
    return this.activePersona;
  }

  public setRecitationMode(mode: RecitationLanguageMode) {
    this.recitationMode = mode;
    try {
      localStorage.setItem('gita_recitation_mode', mode);
    } catch {
      // ignore
    }
  }

  public getRecitationMode(): RecitationLanguageMode {
    return this.recitationMode;
  }

  public setSpecificVoiceUri(uri: string | null) {
    this.selectedVoiceUri = uri;
    try {
      if (uri) {
        localStorage.setItem('gita_voice_uri', uri);
      } else {
        localStorage.removeItem('gita_voice_uri');
      }
    } catch {
      // ignore
    }
  }

  public getSpecificVoiceUri(): string | null {
    return this.selectedVoiceUri;
  }

  public setRateMultiplier(multiplier: number) {
    this.userRateMultiplier = Math.max(0.7, Math.min(1.4, multiplier));
  }

  public setRate(newRate: number) {
    this.userRateMultiplier = Math.max(0.7, Math.min(1.4, newRate));
  }

  public setRepeatTimes(times: number) {
    this.repeatTimes = times;
  }

  public setIncludeTranslation(enabled: boolean) {
    this.isTranslationEnabled = enabled;
  }

  public getState(): PlaybackState {
    return this.state;
  }

  public getCurrentShlokaId(): string | null {
    return this.currentShlokaId;
  }

  public getCurrentLineIndex(): number {
    return this.currentLineIndex;
  }

  public stop() {
    if (typeof window !== 'undefined' && window.speechSynthesis) {
      window.speechSynthesis.cancel();
    }
    this.state = 'idle';
    this.currentLineIndex = 0;
    this.currentRepeatCount = 0;
    this.currentShlokaId = null;
    this.onStateChangeCb?.('idle');
    this.onLineChangeCb?.(0);
    this.onRepeatCountChangeCb?.(0);
  }

  public pause() {
    if (window.speechSynthesis && this.state === 'playing') {
      window.speechSynthesis.pause();
      this.state = 'paused';
      this.onStateChangeCb?.('paused');
    }
  }

  public resume() {
    if (window.speechSynthesis && this.state === 'paused') {
      window.speechSynthesis.resume();
      this.state = 'playing';
      this.onStateChangeCb?.('playing');
    }
  }

  /**
   * Universal Shloka player that takes both Sanskrit Devanagari and Roman transliteration lines
   */
  public playShloka(
    shlokaId: string,
    sanskritLines: string[],
    transliterationLines?: string[],
    hindiTranslation?: string,
    englishTranslation?: string
  ) {
    this.stop();

    if (!('speechSynthesis' in window)) {
      alert('Speech audio is not supported in this browser. Please try Chrome, Edge, or Safari.');
      return;
    }

    // Chrome unpause safety
    window.speechSynthesis.resume();

    this.currentShlokaId = shlokaId;
    this.currentRepeatCount = 1;
    this.onRepeatCountChangeCb?.(1);

    // Play auspicious Krishna Flute or Temple Bell chime
    if (this.activePersona === 'krishna') {
      GitaAudioPlayer.flute.playKrishnaFluteChime();
    } else {
      GitaAudioPlayer.bell.playBell();
    }

    // Give the chime 700ms, then begin speech recitation
    setTimeout(() => {
      this.chantVerseLines(
        shlokaId,
        sanskritLines,
        transliterationLines || sanskritLines,
        0,
        hindiTranslation,
        englishTranslation
      );
    }, 700);
  }

  /**
   * Preview a voice profile with Krishna's comforting sacred words
   */
  public previewVoice(persona: VoicePersona) {
    if (!('speechSynthesis' in window)) return;
    window.speechSynthesis.cancel();
    window.speechSynthesis.resume();

    const profile = VOICE_PROFILES[persona];
    const { voice, isIndicSupported } = this.resolveVoiceAndSupport(persona);

    // Choose text based on whether Indic voice is available
    const textToSpeak = isIndicSupported 
      ? profile.sampleQuoteDevanagari 
      : profile.sampleQuotePhonetic;

    const utterance = new SpeechSynthesisUtterance(textToSpeak);
    if (voice) utterance.voice = voice;
    utterance.lang = voice?.lang || (isIndicSupported ? 'hi-IN' : 'en-US');
    utterance.rate = profile.rate;
    utterance.pitch = profile.pitch;
    utterance.volume = profile.volume;

    (window as unknown as { _gitaVoiceUtterance: SpeechSynthesisUtterance })._gitaVoiceUtterance = utterance;

    if (persona === 'krishna') {
      GitaAudioPlayer.flute.playKrishnaFluteChime();
      setTimeout(() => {
        window.speechSynthesis.resume();
        window.speechSynthesis.speak(utterance);
      }, 600);
    } else {
      GitaAudioPlayer.bell.playBell();
      setTimeout(() => {
        window.speechSynthesis.resume();
        window.speechSynthesis.speak(utterance);
      }, 400);
    }
  }

  public getAvailableVoices(): SpeechSynthesisVoice[] {
    if (!('speechSynthesis' in window)) return [];
    return window.speechSynthesis.getVoices();
  }

  /**
   * Resolves the best voice and determines whether the system can speak native Indic script
   */
  public resolveVoiceAndSupport(persona: VoicePersona): {
    voice: SpeechSynthesisVoice | null;
    isIndicSupported: boolean;
  } {
    if (!('speechSynthesis' in window)) {
      return { voice: null, isIndicSupported: false };
    }
    const voices = window.speechSynthesis.getVoices();
    if (!voices.length) {
      return { voice: null, isIndicSupported: false };
    }

    // Explicit user-chosen voice
    if (this.selectedVoiceUri) {
      const explicit = voices.find(v => v.voiceURI === this.selectedVoiceUri);
      if (explicit) {
        const isIndic = explicit.lang.startsWith('hi') || explicit.lang.includes('sa') || explicit.name.toLowerCase().includes('hindi');
        return { voice: explicit, isIndicSupported: isIndic };
      }
    }

    const profile = VOICE_PROFILES[persona];

    // Check for Hindi/Sanskrit voices
    const hindiVoices = voices.filter(v => 
      v.lang.startsWith('hi') || 
      v.lang.startsWith('sa') || 
      v.name.toLowerCase().includes('hindi') || 
      v.name.toLowerCase().includes('india')
    );

    if (hindiVoices.length > 0) {
      if (profile.gender === 'female') {
        const female = hindiVoices.find(v => 
          v.name.toLowerCase().includes('female') || 
          v.name.toLowerCase().includes('kalpana') || 
          v.name.toLowerCase().includes('swara')
        );
        return { voice: female || hindiVoices[0], isIndicSupported: true };
      } else {
        const male = hindiVoices.find(v => 
          v.name.toLowerCase().includes('male') || 
          v.name.toLowerCase().includes('madhav') || 
          v.name.toLowerCase().includes('ravi')
        );
        return { voice: male || hindiVoices[0], isIndicSupported: true };
      }
    }

    // Fallback: Indian English voices (good with phonetic Sanskrit)
    const indianEnglish = voices.find(v => v.lang === 'en-IN' || v.name.toLowerCase().includes('india'));
    if (indianEnglish) {
      return { voice: indianEnglish, isIndicSupported: false };
    }

    // General English/System default voice
    const generalDefault = voices.find(v => v.default) || voices.find(v => v.lang.startsWith('en')) || voices[0];
    return { voice: generalDefault || null, isIndicSupported: false };
  }

  private chantVerseLines(
    shlokaId: string,
    sanskritLines: string[],
    translitLines: string[],
    lineIndex: number,
    hindiTranslation?: string,
    englishTranslation?: string
  ) {
    if (this.currentShlokaId !== shlokaId) return;

    if (lineIndex < sanskritLines.length) {
      this.currentLineIndex = lineIndex;
      this.state = 'playing';
      this.onStateChangeCb?.('playing');
      this.onLineChangeCb?.(lineIndex);

      const profile = VOICE_PROFILES[this.activePersona];
      const { voice, isIndicSupported } = this.resolveVoiceAndSupport(this.activePersona);

      // Determine text to speak based on mode & voice support
      let textToSpeak: string;
      if (this.recitationMode === 'sanskrit_devanagari' && isIndicSupported) {
        textToSpeak = cleanDevanagari(sanskritLines[lineIndex]);
      } else if (this.recitationMode === 'sanskrit_phonetic' || !isIndicSupported) {
        // Use smooth phonetic roman transliteration for 100% universal speech output
        textToSpeak = toPhoneticReadable(translitLines[lineIndex] || sanskritLines[lineIndex]);
      } else {
        // Auto: use Devanagari if Indic voice is present, else Phonetic
        textToSpeak = isIndicSupported 
          ? cleanDevanagari(sanskritLines[lineIndex])
          : toPhoneticReadable(translitLines[lineIndex]);
      }

      const utterance = new SpeechSynthesisUtterance(textToSpeak);
      if (voice) utterance.voice = voice;
      utterance.lang = voice?.lang || (isIndicSupported ? 'hi-IN' : 'en-US');

      // Calibrated serene pacing and gentle Krishna pitch
      utterance.rate = profile.rate * this.userRateMultiplier;
      utterance.pitch = profile.pitch;
      utterance.volume = profile.volume;

      utterance.onend = () => {
        const pauseMs = this.activePersona === 'krishna' ? 500 : 400;
        setTimeout(() => {
          if (this.currentShlokaId === shlokaId) {
            this.chantVerseLines(shlokaId, sanskritLines, translitLines, lineIndex + 1, hindiTranslation, englishTranslation);
          }
        }, pauseMs);
      };

      // Auto-fallback: if Devanagari throws error on user's machine, retry with Phonetic text
      utterance.onerror = (err) => {
        console.warn('SpeechSynthesis error on primary recitation:', err);
        // If not already using phonetic, try phonetic transliteration once
        if (textToSpeak !== toPhoneticReadable(translitLines[lineIndex])) {
          const fallbackText = toPhoneticReadable(translitLines[lineIndex]);
          const fallbackUtterance = new SpeechSynthesisUtterance(fallbackText);
          fallbackUtterance.rate = profile.rate * this.userRateMultiplier;
          fallbackUtterance.pitch = profile.pitch;
          fallbackUtterance.volume = profile.volume;
          fallbackUtterance.onend = () => {
            setTimeout(() => {
              if (this.currentShlokaId === shlokaId) {
                this.chantVerseLines(shlokaId, sanskritLines, translitLines, lineIndex + 1, hindiTranslation, englishTranslation);
              }
            }, 500);
          };
          window.speechSynthesis.resume();
          window.speechSynthesis.speak(fallbackUtterance);
        } else {
          // If still failing, advance to next line after brief pause
          setTimeout(() => {
            if (this.currentShlokaId === shlokaId) {
              this.chantVerseLines(shlokaId, sanskritLines, translitLines, lineIndex + 1, hindiTranslation, englishTranslation);
            }
          }, 800);
        }
      };

      this.currentUtterance = utterance;
      (window as unknown as { _gitaVoiceUtterance: SpeechSynthesisUtterance })._gitaVoiceUtterance = utterance;

      // Chrome safe resume before speaking
      window.speechSynthesis.resume();
      window.speechSynthesis.speak(utterance);
    } else {
      // Completed Sanskrit lines
      if (this.isTranslationEnabled && (hindiTranslation || englishTranslation)) {
        this.speakTranslation(shlokaId, sanskritLines, translitLines, hindiTranslation || englishTranslation || '');
      } else {
        this.handleVerseFinished(shlokaId, sanskritLines, translitLines, hindiTranslation, englishTranslation);
      }
    }
  }

  private speakTranslation(
    shlokaId: string,
    sanskritLines: string[],
    translitLines: string[],
    translationText: string
  ) {
    const cleanText = translationText.replace(/[॥।]/g, ' ').trim();
    const utterance = new SpeechSynthesisUtterance(cleanText);
    const profile = VOICE_PROFILES[this.activePersona];
    const { voice } = this.resolveVoiceAndSupport(this.activePersona);

    if (voice) utterance.voice = voice;
    utterance.lang = voice?.lang || 'hi-IN';
    utterance.rate = Math.max(0.75, profile.rate * this.userRateMultiplier * 1.05);
    utterance.pitch = profile.pitch;
    utterance.volume = profile.volume;

    utterance.onend = () => {
      this.handleVerseFinished(shlokaId, sanskritLines, translitLines, translationText);
    };

    utterance.onerror = () => {
      this.handleVerseFinished(shlokaId, sanskritLines, translitLines, translationText);
    };

    this.currentUtterance = utterance;
    (window as unknown as { _gitaVoiceUtterance: SpeechSynthesisUtterance })._gitaVoiceUtterance = utterance;
    window.speechSynthesis.resume();
    window.speechSynthesis.speak(utterance);
  }

  private handleVerseFinished(
    shlokaId: string,
    sanskritLines: string[],
    translitLines: string[],
    hindiTranslation?: string,
    englishTranslation?: string
  ) {
    if (this.currentRepeatCount < this.repeatTimes) {
      this.currentRepeatCount += 1;
      this.onRepeatCountChangeCb?.(this.currentRepeatCount);

      if (this.activePersona === 'krishna') {
        GitaAudioPlayer.flute.playKrishnaFluteChime();
      } else {
        GitaAudioPlayer.bell.playBell();
      }

      setTimeout(() => {
        if (this.currentShlokaId === shlokaId) {
          this.chantVerseLines(shlokaId, sanskritLines, translitLines, 0, hindiTranslation, englishTranslation);
        }
      }, 900);
    } else {
      if (this.activePersona === 'krishna') {
        GitaAudioPlayer.flute.playKrishnaFluteChime();
      } else {
        GitaAudioPlayer.bell.playBell();
      }
      this.state = 'ended';
      this.onStateChangeCb?.('ended');
      this.onCompleteCb?.();
    }
  }
}
