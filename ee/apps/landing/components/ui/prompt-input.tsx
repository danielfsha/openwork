"use client";

import Image from "next/image";
import {
  ArrowUp,
  Focus,
  Globe,
  Plus,
  SlidersHorizontal,
} from "lucide-react";
import { AnimatePresence, motion } from "motion/react";

import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

type SendState = "send" | "stop";

function StopRectIcon({ size = 14 }: { size?: number }) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 14 14"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      aria-hidden="true"
    >
      <rect x="3" y="3" width="8" height="8" rx="1.25" fill="currentColor" />
    </svg>
  );
}

type PromptInputProps = {
  className?: string;
  workspaceIconSrc?: string;
  workspaceIconAlt?: string;
  title?: string;
  subtitle?: string;
  stopLabel?: string;
  sendState?: SendState;
  bodyClassName?: string;
  children: React.ReactNode;
};

export function PromptInput({
  className,
  workspaceIconSrc = "/icons/notion.svg",
  workspaceIconAlt = "Workspace",
  title = "Working with Notion & HubSpot",
  subtitle = "Focused on Acme follow-up",
  stopLabel = "Stop",
  sendState = "send",
  bodyClassName,
  children,
}: PromptInputProps) {
  return (
    <div
      className={cn(
        "relative overflow-hidden rounded-2xl border border-border bg-card text-sm text-card-foreground shadow-sm",
        className,
      )}
    >
      <div className="flex min-h-12 items-center justify-between gap-2 border-b border-border/80 bg-background px-3 py-2">
        <div className="flex items-center gap-2">
          <span className="inline-flex size-7 items-center justify-center overflow-hidden rounded-md border border-border/80 bg-muted/40">
            <Image
              src={workspaceIconSrc}
              alt={workspaceIconAlt}
              width={16}
              height={16}
              className="size-4"
            />
          </span>
          <div className="leading-tight">
            <p className="text-[13px] text-foreground">{title}</p>
            <p className="text-[11px] text-muted-foreground">{subtitle}</p>
          </div>
        </div>

        <Button
          type="button"
          variant="outline"
          size="xs"
          className="rounded-full"
        >
          {stopLabel}
        </Button>
      </div>

      <div
        className={cn(
          "relative flex min-h-[74px] items-start gap-2 bg-background px-3 py-3",
          bodyClassName,
        )}
      >
        <div className="min-w-0 flex-1 leading-relaxed">{children}</div>
      </div>

      <div className="flex min-h-10 items-center justify-between border-t border-border/80 bg-background px-3 py-2">
        <div className="inline-flex items-center gap-1.5 text-muted-foreground">
          <Button type="button" variant="ghost" size="icon-xs" aria-label="Add">
            <Plus size={14} />
          </Button>
          <Button type="button" variant="ghost" size="icon-xs" aria-label="Web">
            <Globe size={14} />
          </Button>
          <Button
            type="button"
            variant="ghost"
            size="icon-xs"
            aria-label="Focus"
          >
            <Focus size={14} />
          </Button>
          <Button
            type="button"
            variant="ghost"
            size="icon-xs"
            aria-label="Settings"
          >
            <SlidersHorizontal size={14} />
          </Button>
        </div>

        <div>
          <Button
            type="button"
            size="icon-sm"
            aria-label="Send"
            className="rounded-full"
          >
            <AnimatePresence mode="popLayout" initial={false}>
              <motion.span
                key={sendState}
                initial={{ scale: 0, opacity: 0, filter: "blur(4px)" }}
                animate={{ scale: 1, opacity: 1, filter: "blur(0px)" }}
                exit={{ scale: 0, opacity: 0, filter: "blur(4px)" }}
                transition={{
                  type: "spring",
                  damping: 20,
                  stiffness: 400,
                  mass: 0.5,
                }}
                className="inline-flex"
              >
                {sendState === "stop" ? (
                  <StopRectIcon size={14} />
                ) : (
                  <ArrowUp size={14} />
                )}
              </motion.span>
            </AnimatePresence>
          </Button>
        </div>
      </div>
    </div>
  );
}
