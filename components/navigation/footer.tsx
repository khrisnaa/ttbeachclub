import { UnderlineLink } from "@/components/ui/underline-link";
import { navLinks, socialLinks } from "@/datas/navigation";

export const Footer = () => {
  return (
    <footer
      className="relative w-full md:h-[75vh]"
      style={{ clipPath: "polygon(0% 0%, 100% 0%, 100% 100%, 0% 100%)" }}
    >
      <div className="bg-foreground text-secondary relative flex w-full flex-col justify-between gap-10 px-4 pt-10 pb-6 sm:px-8 md:fixed md:bottom-0 md:left-0 md:h-[75vh] md:gap-0 md:px-16 md:pt-12 md:pb-0">
        <div className="flex flex-col justify-between gap-6 sm:flex-row sm:items-end">
          <h2 className="flex flex-col gap-1 text-4xl leading-none font-light uppercase sm:gap-2 sm:text-5xl md:text-7xl lg:text-8xl xl:text-[6.5rem]">
            <span>Tropical</span>
            <span>Temptation</span>
          </h2>

          <p className="text-secondary/80 max-w-sm text-sm">
            Tropical Temptation is a bohemian sanctuary by the sea. Not a place
            to visit, but a place to belong — alive through shared moments and
            returning souls.
          </p>
        </div>

        <div className="flex flex-col justify-between gap-8 text-xs font-medium sm:flex-row sm:items-start sm:text-sm">
          <div className="space-y-3 sm:space-y-4">
            <span className="block font-medium">Menu</span>

            <div className="grid grid-cols-2 justify-items-start gap-x-6 gap-y-2 whitespace-nowrap sm:grid-cols-4 sm:gap-x-12 sm:gap-y-1.5">
              {navLinks.map((link) => (
                <UnderlineLink
                  key={link.label}
                  href={link.href}
                  className="mt-0 w-fit pb-0.5 text-xs font-medium normal-case sm:text-sm"
                >
                  {link.label}
                </UnderlineLink>
              ))}
            </div>
          </div>

          <div className="space-y-3 sm:space-y-4">
            <span className="block font-medium">Address</span>

            <div className="flex flex-col items-start gap-1.5">
              <UnderlineLink
                href="#"
                className="mt-0 w-fit pb-0.5 text-xs font-medium normal-case sm:text-sm"
              >
                Jl. Melasti Beach 88, Ungasan, Bali
              </UnderlineLink>
              <p className="text-secondary/70">Open Daily : 7 AM – 9 PM</p>
            </div>
          </div>

          <div className="space-y-3 sm:space-y-4">
            <span className="block font-medium">Contact</span>

            <div className="flex flex-col items-start gap-1.5">
              <UnderlineLink
                href="#"
                className="mt-0 w-fit pb-0.5 text-xs font-medium normal-case sm:text-sm"
              >
                +62 812-3886-8631
              </UnderlineLink>
              <UnderlineLink
                href="#"
                className="mt-0 w-fit pb-0.5 text-xs font-medium normal-case sm:text-sm"
              >
                info@ttbeach.club
              </UnderlineLink>
            </div>
          </div>
        </div>

        <div className="border-secondary/15 flex flex-col justify-between gap-4 border-t pt-6 pb-2 text-xs sm:flex-row sm:items-center sm:text-sm">
          <div className="flex flex-wrap items-center gap-x-5 gap-y-2 sm:gap-6">
            {socialLinks.map((social) => (
              <UnderlineLink
                key={social.label}
                href={social.href}
                className="mt-0 pb-0.5 text-xs font-medium uppercase sm:text-sm"
              >
                {social.label}
              </UnderlineLink>
            ))}
          </div>

          <p className="text-secondary/70 text-xs sm:text-sm">
            © 2026 Tropical Temptation Beach Club. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
};
