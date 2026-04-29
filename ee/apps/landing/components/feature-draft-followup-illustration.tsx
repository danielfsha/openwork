"use client";

import Image from "next/image";
import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "motion/react";
import { TextShimmer } from "./ui/text-shimmer";

type StatusLine = {
  prefix: string;
  tone: string;
  integration: {
    name: string;
    iconSrc: string;
  };
};

const STATUS_LINES = [
  {
    prefix: "Reviewing founder notes in",
    tone: "text-foreground",
    integration: {
      name: "Notion",
      iconSrc: "/icons/notion.svg",
    },
  },
  {
    prefix: "Checking the latest thread in",
    tone: "text-foreground",
    integration: {
      name: "Gmail",
      iconSrc: "/icons/gmail.svg",
    },
  },
  {
    prefix: "Queueing a reminder in",
    tone: "text-foreground",
    integration: {
      name: "Google Calendar",
      iconSrc: "/icons/google-calendar.svg",
    },
  },
  {
    prefix: "Syncing the final draft to",
    tone: "text-foreground",
    integration: {
      name: "HubSpot",
      iconSrc: "/icons/hubspot.svg",
    },
  },
] as const satisfies readonly StatusLine[];

export function DraftFollowupIllustration() {
  const [lineIndex, setLineIndex] = useState(0);

  useEffect(() => {
    const interval = window.setInterval(() => {
      setLineIndex((current) => (current + 1) % STATUS_LINES.length);
    }, 2000); // changes ONLY every 2s

    return () => {
      window.clearInterval(interval);
    };
  }, []);

  const activeLine = STATUS_LINES[lineIndex];

  return (
    <div className="h-full p-3">
      <div className="h-full rounded-md border border-foreground/15 bg-[rgba(255,255,255,0.72)] p-1 shadow-sm dark:bg-[rgba(18,18,18,0.78)]">
        <div className="relative flex h-full items-center justify-center overflow-hidden rounded-[6px] border border-foreground/10 bg-[rgba(248,250,252,0.9)] p-3 dark:bg-[rgba(14,14,14,0.88)]">
          <AnimatePresence mode="wait">
            <motion.div
              key={lineIndex}
              className={`inline-flex items-center gap-1.5 text-sm font-medium tracking-[0.01em] ${activeLine.tone}`}
              initial={{
                opacity: 0,
                y: 6,
              }}
              animate={{
                opacity: 1,
                y: 0,
              }}
              exit={{
                opacity: 0,
                y: -6,
              }}
              transition={{
                duration: 0.4, // fast transition only when changing
                ease: "easeOut",
              }}
            >
              <span className="text-muted-foreground">
                <TextShimmer duration={2.5}>{activeLine.prefix}</TextShimmer>
              </span>

              <span className="inline-flex size-4 items-center justify-center overflow-hidden rounded-[4px] bg-[rgba(255,255,255,0.9)] dark:bg-[rgba(20,20,20,0.92)]">
                <Image
                  src={activeLine.integration.iconSrc}
                  alt={activeLine.integration.name}
                  width={16}
                  height={16}
                  className="size-4"
                />
              </span>

              {activeLine.integration.name}
            </motion.div>
          </AnimatePresence>
        </div>
      </div>
    </div>
  );
}
