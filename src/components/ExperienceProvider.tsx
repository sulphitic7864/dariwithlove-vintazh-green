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

  // Keep this temporarily so existing parent code does not break.
  introVideo: Readonly<{
    webm?: string;
    mp4: string;
    poster: string;
  }>;

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
    if (audioRef.current?.paused ?? true) {
      await play();
    } else {
      pause();
    }
  }, [pause, play]);

  const value = useMemo(
    () => ({
      isPlaying,
      play,
      pause,
      toggle,
    }),
    [isPlaying, play, pause, toggle],
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

  if (!value) {
    throw new Error("useWeddingAudio must be used inside ExperienceProvider");
  }

  return value;
}

function LoadingScreen({
  defaultLanguage,
  coupleLabel,
  heroSubtitle,
  loadingText,
  openAria,
}: Readonly<{
  defaultLanguage: Language;
  coupleLabel: string;
  heroSubtitle: LocalizedText;
  loadingText: LocalizedText;
  openAria: LocalizedText;
}>) {
  const language = useActiveLanguage(defaultLanguage);
  const [closing, setClosing] = useState(false);
  const [visible, setVisible] = useState(true);
  const opened = useRef(false);
  const { play: playMusic } = useWeddingAudio();

  const openWebsite = () => {
    if (opened.current) return;

    opened.current = true;
    void playMusic();
    setClosing(true);

    window.setTimeout(() => setVisible(false), 650);
  };

  if (!visible) return null;

  return (
    <div
      className={`fixed inset-0 z-[130] h-[100svh] overflow-hidden bg-[#f8f5eb]
        transition-opacity duration-700
        ${closing ? "pointer-events-none opacity-0" : "opacity-100"}`}
    >
      {/* Floral background */}
      <div
        className="
          pointer-events-none absolute inset-0
          bg-[url('/media/hero-background.jpg')]
          bg-cover bg-center bg-no-repeat
        "
      />

      {/* DESKTOP green curve */}
      <div
        className="
          pointer-events-none absolute right-[-8vw] top-1/2
          hidden h-[150vh] w-[72vw]
          -translate-y-1/2 rounded-l-[50%]
          bg-[#005847]
          md:block
          lg:right-[-6vw]
        "
      />

      {/* MOBILE green arch */}
      <div
        className="
          pointer-events-none absolute
          -bottom-[8svh] left-1/2
          h-[80svh] w-[145vw]
          -translate-x-1/2
          rounded-t-[50%]
          bg-[#005847]
          md:hidden
        "
      />

      {/* Content */}
      <div
        className="
          absolute inset-0 z-10
          flex flex-col items-center
          px-6 pt-[40svh]
          text-center text-white

          md:inset-y-0 md:left-auto md:right-0
          md:w-[64%] md:justify-center md:pt-0

          lg:w-[62%]
        "
      >
        <img
          src="/media/rose.svg"
          alt=""
          aria-hidden="true"
          className="
            mb-8 w-[68px]
            md:mb-10 md:w-[95px]
          "
        />

        <p
          className="
            mb-8
            text-[15px] font-light uppercase
            tracking-[0.02em] text-white/95
            md:mb-10 md:text-[clamp(14px,1.3vw,20px)]
          "
        >
          {heroSubtitle[language] || "Wedding Invitation"}
        </p>

        <h1
          className="
            font-display
            text-[clamp(38px,10vw,54px)]
            uppercase leading-[0.95]
            tracking-[-0.03em]

            md:text-[clamp(42px,5vw,76px)]
          "
        >
          {coupleLabel}
        </h1>

        <button
          type="button"
          onClick={openWebsite}
          aria-label={openAria[language]}
          className="
            relative z-20 mt-10
            flex h-[54px] w-[220px]
            touch-manipulation items-center justify-center
            rounded-full border border-white
            bg-transparent
            text-[15px] uppercase text-white
            transition active:scale-95

            md:mt-16 md:h-[68px] md:w-[300px]
            md:text-[18px]
          "
        >
          {loadingText[language] || "Open"}
        </button>
      </div>
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
      className="
        fixed
        bottom-[max(14px,env(safe-area-inset-bottom))]
        right-[max(14px,env(safe-area-inset-right))]
        z-[120]
        grid
        h-9
        w-9
        place-items-center
        rounded-full
        bg-black
        text-white
        shadow-[0_6px_18px_rgba(0,0,0,.18)]
      "
    >
      <span
        className={`
          font-serif text-[15px]
          ${isPlaying ? "animate-[spin_7s_linear_infinite]" : ""}
        `}
        aria-hidden="true"
      >
        ♪
      </span>

      {!isPlaying ? (
        <span
          className="
            absolute
            h-px
            w-5
            -rotate-45
            bg-white
          "
          aria-hidden="true"
        />
      ) : null}
    </button>
  );
}
