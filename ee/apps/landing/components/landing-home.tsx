"use client";
import { LandingFeatures } from "@/components/landing-features";
import { SiteNav } from "./site-nav";
import { SectionWrapper } from "./ui/section-wrapper";
import { Button } from "./ui/button";

type Props = {
  stars: string;
  downloadHref: string;
  callHref: string;
  isMobileVisitor: boolean;
};

const externalLinkProps = (href: string) =>
  /^https?:\/\//.test(href)
    ? { rel: "noreferrer", target: "_blank" as const }
    : {};

export function LandingHome(props: Props) {
  const callLinkProps = externalLinkProps(props.callHref);
  const primaryCtaHref = props.isMobileVisitor
    ? "https://app.openworklabs.com"
    : "/download";
  const primaryCtaLabel = props.isMobileVisitor
    ? "Open the app"
    : "Download for free";
  const primaryCtaLinkProps = props.isMobileVisitor
    ? {}
    : externalLinkProps(primaryCtaHref);

  return (
    <div>
      <SiteNav
        stars={props.stars}
        downloadHref={props.downloadHref}
        callUrl={props.callHref}
        mobilePrimaryHref="https://app.openworklabs.com"
        mobilePrimaryLabel="Open app"
        active="home"
      />
      <SectionWrapper position="middle">
        <section className="px-2 py-16 md:py-24 lg:py-32">
          <div className="mx-auto grid max-w-6xl gap-8 lg:grid-cols-[minmax(0,1.15fr)_minmax(0,0.85fr)] lg:items-start lg:gap-10">
            <div>
              {/* Badge */}
              {/* <div className="mb-6 flex items-center gap-2">
                <span className="text-sm font-medium text-muted-foreground">
                  Backed by
                </span>
                <div className="flex items-center gap-1.5">
                  <div className="flex h-5 w-5 items-center justify-center rounded bg-[#ff6600] text-xs font-bold">
                    Y
                  </div>
                  <span className="text-sm text-foreground">Combinator</span>
                </div>
              </div> */}

              {/* Headline */}
              <h1 className="text-4xl font-normal leading-[1.12] tracking-tight text-foreground sm:text-4xl md:text-5xl">
                The open source
                <br />
                Claude Cowork
                <br />
                <span className="text-muted-foreground">for your team</span>
              </h1>
            </div>

            <div>
              <p className="max-w-xl leading-relaxed text-muted-foreground md:text-xl lg:pt-2">
                OpenWork is the desktop app that lets you use 50+ LLMs, bring
                your own keys, and share your setups seamlessly with your team.
              </p>

              {/* CTAs */}
              <div className="mt-10 flex gap-1 items-center">
                <a href={primaryCtaHref} {...primaryCtaLinkProps}>
                  <Button size="lg" className="w-full sm:w-auto">
                    {primaryCtaLabel}
                  </Button>
                </a>
                <a href={props.callHref} {...callLinkProps}>
                  <Button
                    variant="ghost"
                    size="lg"
                    className="w-full sm:w-auto dark"
                  >
                    Contact sales
                  </Button>
                </a>
              </div>
            </div>
          </div>
        </section>
      </SectionWrapper>

      <SectionWrapper position="middle">
        <LandingFeatures />
      </SectionWrapper>
    </div>
  );
}
