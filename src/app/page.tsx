import { ExperienceProvider } from "@/components/ExperienceProvider";
import { LanguageSwitcher } from "@/components/LanguageSwitcher";
import { RevealObserver } from "@/components/RevealObserver";
import { Contacts } from "@/components/sections/Contacts";
import { Countdown } from "@/components/sections/Countdown";
import { Details } from "@/components/sections/Details";
import { DressCode } from "@/components/sections/DressCode";
import { EventTimeline } from "@/components/sections/EventTimeline";
import { Location } from "@/components/sections/Location";
import { OrderInvitation } from "@/components/sections/OrderInvitation";
import { RSVP } from "@/components/sections/RSVP";
import { ThankYouFooter } from "@/components/sections/ThankYouFooter";
import { WeddingDetails } from "@/components/sections/WeddingDetails";
import { wedding } from "@/data/wedding";
import { eventTimestamp } from "@/lib/i18n";

export default function HomePage() {
  const targetTimestamp = eventTimestamp(wedding.event.date, wedding.event.startTime, wedding.event.timezone);

  return (
    <ExperienceProvider
      defaultLanguage={wedding.defaultLanguage}
      musicSrc={wedding.assets.music}
      coupleLabel={`${wedding.couple.groom} & ${wedding.couple.bride}`}
      heroSubtitle={wedding.copy.heroSubtitle}
      introVideo={wedding.assets.introVideo}
      loadingText={wedding.copy.loading}
      openAria={wedding.copy.accessibility.openInvitation}
      playMusicAria={wedding.copy.accessibility.playMusic}
      pauseMusicAria={wedding.copy.accessibility.pauseMusic}
    >
      <LanguageSwitcher
        defaultLanguage={wedding.defaultLanguage}
        languages={wedding.languages}
        groupLabel={wedding.copy.accessibility.languageSwitcher}
        switchToKy={wedding.copy.accessibility.switchToKy}
        switchToRu={wedding.copy.accessibility.switchToRu}
      />
      <RevealObserver />

      <main className="w-full  text-[#111]">
        <WeddingDetails />
        <EventTimeline />
        <Location />
        <Details />
        <DressCode />
        <RSVP defaultLanguage={wedding.defaultLanguage} copy={wedding.copy.rsvp} />
        <Countdown
          targetTimestamp={targetTimestamp}
          defaultLanguage={wedding.defaultLanguage}
          title={wedding.copy.countdown.title}
          units={wedding.copy.countdown.units}
        />
        <Contacts />
        <ThankYouFooter />
        <OrderInvitation />
      </main>
    </ExperienceProvider>
  );
}
