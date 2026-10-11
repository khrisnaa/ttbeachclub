import { Discover } from "@/components/home/discover";
import { Events } from "@/components/home/events";
import { Hero } from "@/components/home/hero";
import { Philosophy } from "@/components/home/philosophy";
import { Places } from "@/components/home/places";
import { Programs } from "@/components/home/programs";
import { Stories } from "@/components/home/stories";

export default function Home() {
  return (
    <main>
      <Hero />
      <Philosophy />
      <Events />
      <Places />
      <Stories />
      <Programs />
      <Discover />
    </main>
  );
}
