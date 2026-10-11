import { SectionHeader } from "../ui/section-header";

export const Hero = () => {
  return (
    <section className="relative flex min-h-screen w-full flex-col items-center justify-end overflow-hidden">
      <video
        autoPlay
        loop
        muted
        playsInline
        preload="auto"
        disablePictureInPicture
        disableRemotePlayback
        poster="/hero/bg-hero.webp"
        className="absolute inset-0 h-full w-full object-cover"
      >
        <source src="/hero/video-hero.mp4" type="video/mp4" />
      </video>

      <div className="bg-foreground/40 pointer-events-none absolute inset-0" />
      <div className="from-foreground/60 to-foreground/70 pointer-events-none absolute inset-0 bg-gradient-to-b via-transparent" />

      <div className="relative z-10 py-16 text-center">
        <SectionHeader
          as="h1"
          className="text-secondary"
          title="Beach Club - Dining - Rituals"
          subtitle="Under the Same Sun"
        />
      </div>
    </section>
  );
};
