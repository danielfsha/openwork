"use client";

import { useEffect, useState } from "react";
import { cn } from "@/lib/utils";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "./ui/card";
import { DraftFollowupIllustration } from "./feature-draft-followup-illustration";
import { DataAnalysisIllustration } from "./feature-data-analysis-illustration";
import { TaskSchedulingIllustration } from "./feature-task-scheduling-illustration";

const featureCards = [
  {
    id: "01",
    title: "Draft follow-up for Acme Corp",
    description:
      "Turn Notion MCP context into personalized outreach, then push the final result into your CRM.",
    backgroundImage: "/images/gradient-1.jpg",
  },
  {
    id: "02",
    title: "Data Analysis",
    description:
      "Work from Excel files or pasted spreadsheets without changing how your team already shares data. ",
    backgroundImage: "/images/gradient-2.jpg",
  },
  {
    id: "03",
    title: "Task Scheduling",
    description:
      "Plan timelines, assign owners, and keep delivery on schedule with a clear project view.",
    backgroundImage: "/images/gradient-3.jpg",
  },
] as const;

const ROTATE_INTERVAL_MS = 2600;

function FeatureMediaFrame({ children }: { children: React.ReactNode }) {
  return <div className="h-full overflow-hidden px-2 pt-4">{children}</div>;
}

function FeaturePreview({ id }: { id: string }) {
  if (id === "01") {
    return <DraftFollowupIllustration />;
  }

  if (id === "02") {
    return <DataAnalysisIllustration />;
  }

  return <TaskSchedulingIllustration />;
}

function HighlightChip({
  label,
  id,
  isActive,
}: {
  label: string;
  id: string;
  isActive: boolean;
}) {
  return (
    <span className="inline-flex items-start gap-[2px]">
      <span
        className={cn(
          "inline-flex items-center rounded-md px-2 py-[1px] text-[0.92em] leading-[1.05] font-medium transition-all duration-300",
          isActive
            ? // ? "bg-[#f97316]/20 text-[#f97316]"
              "bg-foreground/10 text-muted-foreground"
            : "",
        )}
      >
        {label}
      </span>
      {/* <sup
        className={cn(
          "-ml-[1px] text-[11px] leading-none",
          isActive ? "text-[#f97316]" : "text-muted-foreground",
        )}
      >
        {id}
      </sup> */}
    </span>
  );
}

export function LandingFeatures() {
  const [activeCardIndex, setActiveCardIndex] = useState(0);

  useEffect(() => {
    const intervalId = window.setInterval(() => {
      setActiveCardIndex((current) => (current + 1) % featureCards.length);
    }, ROTATE_INTERVAL_MS);

    return () => window.clearInterval(intervalId);
  }, []);

  return (
    <section className="py-16 md:py-24">
      <div className="mx-auto">
        <h2 className="max-w-4xl px-4 lg:px-12 text-[2rem] font-normal leading-[1.24] tracking-tight text-foreground">
          <span className="">OpenWork </span>
          <HighlightChip
            label="drafts outreach"
            id="01"
            isActive={activeCardIndex === 0}
          />
          <span className="text-foreground"> from live workspace context,</span>
          <br className="block h-1" />
          <HighlightChip
            label="analyzes data"
            id="02"
            isActive={activeCardIndex === 1}
          />
          <span> to surface actionable insights, and</span>
          <br className="block h-1" />
          <HighlightChip
            label="schedules tasks"
            id="03"
            isActive={activeCardIndex === 2}
          />
          <span className="text-foreground">
            {" "}
            to coordinate work and deliver on time.
          </span>
        </h2>

        <div className="mt-12 grid items-stretch md:grid-cols-3">
          {featureCards.map((card, index) => {
            const isActive = index === activeCardIndex;

            return (
              <Card
                showCorners
                key={card.id}
                className={cn(
                  "h-full min-h-[500px] bg-cover bg-center bg-no-repeat",
                )}
                style={{ backgroundImage: `url('${card.backgroundImage}')` }}
              >
                <CardHeader className="px-0 pb-0 pt-4">
                  <div className="px-5 text-xs font-semibold tracking-[0.12em] text-black">
                    {card.id}
                  </div>
                  <CardTitle className="px-5 pt-3 text-[1.35rem] font-medium leading-[1.1] text-black">
                    {card.title}
                  </CardTitle>
                  <CardDescription className="px-5 pb-5 pt-3 text-[1.02rem] leading-relaxed text-black">
                    {card.description}
                  </CardDescription>
                </CardHeader>

                <CardContent className="flex-1 px-0 pb-0 pt-0">
                  <FeatureMediaFrame>
                    <FeaturePreview id={card.id} />
                  </FeatureMediaFrame>
                </CardContent>
              </Card>
            );
          })}
        </div>
      </div>
    </section>
  );
}
