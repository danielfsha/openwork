"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import { AnimatePresence, animate, motion } from "framer-motion";

import { Checkbox } from "@/components/ui/checkbox";
import { Skeleton } from "@/components/ui/skeleton";
import { cn } from "@/lib/utils";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "./ui/table";

type TeamTone = "default" | "warning" | "info";
type TypingPhase = "typing" | "highlight" | "revealed";

const PHASE_DELAY_MS = 3000;

export type DataAnalysisRow = {
  id: string;
  name: string;
  team: string;
  email: string;
  checked?: boolean;
  teamTone?: TeamTone;
};

export const defaultDataAnalysisRows: DataAnalysisRow[] = [
  {
    id: "row-jordan",
    name: "Jordan",
    team: "HR",
    email: "j.parker@openwork.dev",
  },
  {
    id: "row-susan",
    name: "Susan",
    team: "Marketing",
    email: "s.johns@openwork.dev",
    checked: true,
    teamTone: "warning",
  },
  {
    id: "row-mark",
    name: "Mark",
    team: "Design",
    email: "mark.d@openwork.com",
    teamTone: "info",
  },
  {
    id: "row-leo",
    name: "Leo",
    team: "Operations",
    email: "leo.ops@openwork.dev",
  },
  {
    id: "row-priya",
    name: "Priya",
    team: "Sales",
    email: "priya.pipeline@gmail.com",
    teamTone: "info",
  },
];

type DataAnalysisAiTableProps = {
  rows?: DataAnalysisRow[];
  typingRowId?: string;
  replayKey?: string | number;
  onTypingEnd?: (rowId: string) => void;
};

function teamPillClass(tone?: TeamTone) {
  if (tone === "warning") {
    return "bg-[#f97316]/20 text-[#f97316]";
  }

  if (tone === "info") {
    return "bg-blue-500/15 text-blue-600 dark:text-blue-300";
  }

  return "bg-foreground/10 text-foreground/80";
}

function AnimatedRow({
  row,
  isActive,
  replayKey,
  onTypingEnd,
}: {
  row: DataAnalysisRow;
  isActive: boolean;
  replayKey: string | number;
  onTypingEnd?: (rowId: string) => void;
}) {
  const [typedName, setTypedName] = useState("");
  const [phase, setPhase] = useState<TypingPhase>("typing");

  const callbackRef = useRef(onTypingEnd);

  useEffect(() => {
    callbackRef.current = onTypingEnd;
  }, [onTypingEnd]);

  useEffect(() => {
    if (!isActive) {
      setTypedName(row.name);
      setPhase("revealed");
      return;
    }

    setTypedName("");
    setPhase("typing");

    let revealTimeout: number | undefined;

    const controls = animate(0, row.name.length, {
      duration: 1.2,
      ease: "linear",
      onUpdate: (latest) => {
        const nextLength = Math.min(row.name.length, Math.floor(latest));

        setTypedName(row.name.slice(0, nextLength));
      },
      onComplete: () => {
        setTypedName(row.name);
        setPhase("highlight");

        callbackRef.current?.(row.id);

        revealTimeout = window.setTimeout(() => {
          setPhase("revealed");
        }, PHASE_DELAY_MS);
      },
    });

    return () => {
      controls.stop();

      if (revealTimeout) {
        window.clearTimeout(revealTimeout);
      }
    };
  }, [row.id, row.name, isActive, replayKey]);

  return (
    <>
      {/* Checkbox */}
      <TableCell className="h-8 min-h-8 max-h-8 w-8 px-2 py-1 text-center align-middle">
        <Checkbox defaultChecked={row.checked} />
      </TableCell>

      {/* Name */}
      <TableCell className="h-8 min-h-8 max-h-8 border-l border-foreground/10 px-2 py-1 align-middle">
        <span className="inline-flex items-center text-foreground/90 leading-none">
          {typedName}

          {isActive && phase === "typing" && (
            <span className="ml-0.5 h-3 w-px animate-pulse bg-foreground/60" />
          )}
        </span>
      </TableCell>

      {/* Team + Email section */}
      <TableCell
        colSpan={2}
        className="relative h-8 min-h-8 max-h-8 border-l border-foreground/10 px-0 py-0 align-middle"
      >
        {/* THIS is the correct overlay:
            starts top-left
            full row height
            full width of BOTH columns
        */}
        <AnimatePresence initial={false}>
          {isActive && phase === "highlight" && (
            <motion.div
              key="highlight-overlay"
              className="pointer-events-none absolute inset-0 z-20 border border-[#f97316]"
              style={{
                backgroundImage:
                  "linear-gradient(90deg, rgba(249,115,22,0) 0%, rgba(249,115,22,0.40) 52%, rgba(249,115,22,0) 100%)",
                backgroundSize: "200% 100%",
              }}
              animate={{
                opacity: 1,
                backgroundPositionX: ["0%", "100%"],
              }}
              transition={{
                duration: 3,
                ease: "linear",
              }}
            />
          )}
        </AnimatePresence>

        <div className="relative z-10 grid h-full grid-cols-[84px_112px] items-center px-2">
          {/* TEAM */}
          <div>
            <AnimatePresence mode="wait" initial={false}>
              {isActive && phase !== "revealed" ? (
                <motion.div
                  key="team-loading"
                  initial={{ opacity: 0, filter: "blur(6px)" }}
                  animate={{ opacity: 1, filter: "blur(0px)" }}
                  exit={{ opacity: 0, filter: "blur(6px)" }}
                  transition={{ duration: 0.25 }}
                >
                  <Skeleton className="h-4 w-14 rounded-none" />
                </motion.div>
              ) : (
                <motion.span
                  key="team-value"
                  className={cn(
                    "inline-flex h-4 items-center rounded-none px-1.5 py-0 text-[9px] leading-none",
                    teamPillClass(row.teamTone),
                  )}
                  initial={{ opacity: 0, filter: "blur(8px)" }}
                  animate={{ opacity: 1, filter: "blur(0px)" }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.25 }}
                >
                  {row.team}
                </motion.span>
              )}
            </AnimatePresence>
          </div>

          {/* EMAIL */}
          <div className="text-right">
            <AnimatePresence mode="wait" initial={false}>
              {isActive && phase !== "revealed" ? (
                <motion.div
                  key="email-loading"
                  className="flex justify-end"
                  initial={{ opacity: 0, filter: "blur(6px)" }}
                  animate={{ opacity: 1, filter: "blur(0px)" }}
                  exit={{ opacity: 0, filter: "blur(6px)" }}
                  transition={{ duration: 0.25 }}
                >
                  <Skeleton className="h-4 w-20 rounded-none" />
                </motion.div>
              ) : (
                <motion.span
                  key="email-value"
                  className="inline-block max-w-[96px] truncate leading-none text-muted-foreground"
                  initial={{ opacity: 0, filter: "blur(8px)" }}
                  animate={{ opacity: 1, filter: "blur(0px)" }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.25 }}
                >
                  {row.email}
                </motion.span>
              )}
            </AnimatePresence>
          </div>
        </div>
      </TableCell>
    </>
  );
}

export function DataAnalysisAiTable({
  rows = defaultDataAnalysisRows,
  typingRowId = "row-mark",
  replayKey = 0,
  onTypingEnd,
}: DataAnalysisAiTableProps) {
  const activeRow = useMemo(
    () => rows.find((row) => row.id === typingRowId),
    [rows, typingRowId],
  );

  return (
    <div className="relative overflow-hidden rounded-none border border-foreground/10">
      <Table className="w-full table-fixed">
        <TableHeader>
          <TableRow className="h-8 min-h-8 max-h-8 border-b border-foreground/10 hover:bg-transparent">
            <TableHead className="h-8 w-8 px-2 text-center">
              <Checkbox />
            </TableHead>

            <TableHead className="h-8 w-[88px] border-l border-foreground/10 px-2">
              Name
            </TableHead>

            <TableHead className="h-8 w-[84px] border-l border-foreground/10 px-2">
              Team
            </TableHead>

            <TableHead className="h-8 w-[112px] border-l border-foreground/10 px-3 text-left">
              Email
            </TableHead>
          </TableRow>
        </TableHeader>

        <TableBody>
          {rows.map((row, index) => {
            const isLast = index === rows.length - 1;
            const isActive = row.id === activeRow?.id;

            return (
              <TableRow
                key={row.id}
                className={cn(
                  "h-8 min-h-8 max-h-8",
                  index % 2 !== 0 && "bg-foreground/[0.03]",
                  !isLast && "border-b border-foreground/10",
                )}
              >
                <AnimatedRow
                  row={row}
                  isActive={isActive}
                  replayKey={replayKey}
                  onTypingEnd={onTypingEnd}
                />
              </TableRow>
            );
          })}
        </TableBody>
      </Table>

      <div className="pointer-events-none absolute inset-y-0 right-0 w-10 bg-gradient-to-l from-background/95 via-background/70 to-transparent" />
    </div>
  );
}
