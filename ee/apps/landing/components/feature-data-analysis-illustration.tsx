"use client";

import {
  DataAnalysisAiTable,
  defaultDataAnalysisRows,
} from "@/components/data-analysis-ai-table";

type DataAnalysisIllustrationProps = {
  onTypingEnd?: () => void;
};

export function DataAnalysisIllustration({
  onTypingEnd,
}: DataAnalysisIllustrationProps) {
  return (
    <div className="h-full p-3">
      <div className="rounded-md border border-foreground/15 bg-[#f7f7f8] p-1 shadow-sm dark:bg-[#18181b]">
        <DataAnalysisAiTable
          rows={defaultDataAnalysisRows}
          typingRowId="row-mark"
          onTypingEnd={() => onTypingEnd?.()}
        />
      </div>
    </div>
  );
}
