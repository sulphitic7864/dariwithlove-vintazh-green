"use client";

import {
  createContext,
  useCallback,
  useContext,
  useMemo,
  useRef,
  useState,
  type ReactNode,
} from "react";
import type { Language, LocalizedText } from "@/data/wedding";
import { useActiveLanguage } from "@/lib/use-active-language";

const AudioContext = createContext<
  | {
      isPlaying: boolean;
      play: () => Promise<void>;
      pause: () => void;
      toggle: () => Promise<void>;
    }
  | undefined
>(undefined);

type Props = Readonly<{
  children: ReactNode;
  defaultLanguage: Language;
  musicSrc: string;
  coupleLabel: string;
  heroSubtitle: LocalizedText;
  introVideo: Readonly<{ webm?: string; mp4: string; poster: string }>;
  loadingText: LocalizedText;
  openAria: LocalizedText;
  playMusicAria: LocalizedText;
  pauseMusicAria: LocalizedText;
}>;

export function ExperienceProvider({
  children,
  defaultLanguage,
  musicSrc,
  coupleLabel,
  heroSubtitle,
  introVideo,
  loadingText,
  openAria,
  playMusicAria,
  pauseMusicAria,
}: Props) {
  const audioRef = useRef<HTMLAudioElement>(null);
  const [isPlaying, setIsPlaying] = useState(false);

  const play = useCallback(async () => {
    const audio = audioRef.current;
    if (!audio) return;
    try {
      await audio.play();
      setIsPlaying(true);
    } catch {
      setIsPlaying(false);
    }
  }, []);

  const pause = useCallback(() => {
    audioRef.current?.pause();
    setIsPlaying(false);
  }, []);

  const toggle = useCallback(async () => {
    if (audioRef.current?.paused ?? true) await play();
    else pause();
  }, [pause, play]);

  const value = useMemo(
    () => ({ isPlaying, play, pause, toggle }),
    [isPlaying, pause, play, toggle],
  );

  return (
    <AudioContext.Provider value={value}>
      <audio
        ref={audioRef}
        src={musicSrc}
        preload="none"
        loop
        onPlay={() => setIsPlaying(true)}
        onPause={() => setIsPlaying(false)}
      />
      <LoadingScreen
        defaultLanguage={defaultLanguage}
        introVideo={introVideo}
        coupleLabel={coupleLabel}
        heroSubtitle={heroSubtitle}
        loadingText={loadingText}
        openAria={openAria}
      />
      {children}
      <MusicControl
        defaultLanguage={defaultLanguage}
        playAria={playMusicAria}
        pauseAria={pauseMusicAria}
      />
    </AudioContext.Provider>
  );
}

function useWeddingAudio() {
  const value = useContext(AudioContext);
  if (!value)
    throw new Error("useWeddingAudio must be used inside ExperienceProvider");
  return value;
}

function LoadingScreen({
  defaultLanguage,
  introVideo,
  coupleLabel,
  heroSubtitle,
  loadingText,
  openAria,
}: Readonly<{
  defaultLanguage: Language;
  introVideo: Readonly<{ webm?: string; mp4: string; poster: string }>;
  coupleLabel: string;
  heroSubtitle: LocalizedText;
  loadingText: LocalizedText;
  openAria: LocalizedText;
}>) {
  const language = useActiveLanguage(defaultLanguage);
  const videoRef = useRef<HTMLVideoElement>(null);
  const startedRef = useRef(false);
  const finishedRef = useRef(false);
  const watchdogRef = useRef<number | null>(null);
  const [started, setStarted] = useState(false);
  const [closing, setClosing] = useState(false);
  const [visible, setVisible] = useState(true);
  const { play: playMusic } = useWeddingAudio();

  const finish = useCallback(() => {
    if (finishedRef.current) return;
    finishedRef.current = true;
    if (watchdogRef.current !== null) window.clearTimeout(watchdogRef.current);
    setClosing(true);
    window.setTimeout(() => setVisible(false), 800);
  }, []);

  const openWebsite = async () => {
    if (startedRef.current) return;

    startedRef.current = true;

    await playMusic();

    setClosing(true);

    window.setTimeout(() => {
      setVisible(false);
    }, 800);
  };

  if (!visible) return null;

  return (
    <div
      className={`fixed inset-0 z-[130] grid min-h-[100svh] place-items-center overflow-hidden bg-[#e1e1df] transition-[opacity,visibility] duration-700 ${closing ? "invisible opacity-0" : "visible opacity-100"}`}
    >
      <video
        ref={videoRef}
        className="absolute inset-0 h-full w-full object-cover grayscale"
        poster={introVideo.poster}
        muted
        autoPlay
        loop
        playsInline
        preload="auto"
      >
        {introVideo.webm ? (
          <source src={introVideo.webm} type="video/webm" />
        ) : null}
        <source src={introVideo.mp4} type="video/mp4" />
      </video>
      <div className="absolute inset-0 bg-[linear-gradient(90deg,rgba(224,224,222,.15),rgba(255,255,255,.2),rgba(224,224,222,.12))]" />
      <button
        type="button"
        onClick={openWebsite}
        disabled={started}
        aria-label={openAria[language]}
        className={`relative z-10 flex w-[min(82vw,460px)] cursor-pointer flex-col items-center bg-white/20 px-8 py-8 text-center backdrop-blur-[2px] transition-all duration-500 ${started ? "pointer-events-none translate-y-2 opacity-0" : "opacity-100"}`}
      >
        <span className="font-display text-[clamp(38px,10vw,64px)] uppercase leading-none tracking-[-0.05em]">
          {coupleLabel}
        </span>
        <span className="mt-4 font-display text-[12px] uppercase tracking-[0.05em]">
          {heroSubtitle[language]}
        </span>
        <span className="mt-7 border cursor-pointer border-black/55 bg-white/25 px-7 py-3 font-sans text-[11px] uppercase tracking-[0.08em]">
          {loadingText[language]}
        </span>
      </button>
    </div>
  );
}

function MusicControl({
  defaultLanguage,
  playAria,
  pauseAria,
}: Readonly<{
  defaultLanguage: Language;
  playAria: LocalizedText;
  pauseAria: LocalizedText;
}>) {
  const language = useActiveLanguage(defaultLanguage);
  const { isPlaying, toggle } = useWeddingAudio();

  return (
    <button
      type="button"
      onClick={() => void toggle()}
      aria-label={isPlaying ? pauseAria[language] : playAria[language]}
      aria-pressed={isPlaying}
      className="fixed bottom-[max(14px,env(safe-area-inset-bottom))] right-[max(14px,env(safe-area-inset-right))] z-[120] grid h-9 w-9 place-items-center rounded-full bg-black text-white shadow-[0_6px_18px_rgba(0,0,0,.18)]"
    >
      <span
        className={`font-serif text-[15px] ${isPlaying ? "animate-[spin_7s_linear_infinite]" : ""}`}
        aria-hidden="true"
      >
        ♪
      </span>
      {!isPlaying ? (
        <span
          className="absolute h-px w-5 -rotate-45 bg-white"
          aria-hidden="true"
        />
      ) : null}
    </button>
  );
}
