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
      <div className="rounded-md border border-foreground/15 bg-background/50 p-1 shadow-sm">
        <DataAnalysisAiTable
          rows={defaultDataAnalysisRows}
          typingRowId="row-mark"
          aiSuggestionRowId="row-susan"
          onTypingEnd={() => onTypingEnd?.()}
        />
      </div>
    </div>
  );
}
