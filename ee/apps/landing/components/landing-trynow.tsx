"use client";
import { SectionWrapper } from "./ui/section-wrapper";
import { Button } from "./ui/button";

export function LandingTryNow() {
  return (
    <SectionWrapper position="middle">
      <section className="px-2 py-16 md:py-24 lg:py-32">
        <div className="mx-auto flex max-w-3xl flex-col gap-8 text-center">
          <div className="space-y-4">
            <h2 className="text-4xl font-normal leading-[1.12] tracking-tight text-foreground sm:text-4xl md:text-5xl">
              Try it now
            </h2>
            <p className="mx-auto max-w-2xl leading-relaxed text-muted-foreground md:text-xl">
              OpenWork is the desktop app that lets you use 50+ LLMs, bring your
              own keys, and share your setups seamlessly with your team.
            </p>
          </div>

          <div className="mx-auto flex w-full max-w-md flex-col gap-3 sm:flex-row sm:justify-center">
            <a href="/download" className="w-full sm:w-auto">
              <Button size="lg" className="w-full sm:w-auto">
                Download for free
              </Button>
            </a>
            <a href="/enterprise#book" className="w-full sm:w-auto">
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
      </section>
    </SectionWrapper>
  );
}
