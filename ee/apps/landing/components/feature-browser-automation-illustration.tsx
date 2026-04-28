export function BrowserAutomationIllustration() {
  return (
    <div className="relative h-full p-3">
      <div className="absolute left-2 top-2 flex w-4 flex-col gap-2">
        <span className="h-2.5 rounded bg-foreground/10" />
        <span className="h-2.5 rounded bg-foreground/10" />
        <span className="h-2.5 rounded bg-foreground/10" />
      </div>
      <div className="ml-7 grid h-full grid-rows-[auto_1fr_auto] gap-2">
        <div className="space-y-1">
          <div className="h-2.5 w-20 rounded bg-foreground/10" />
          <div className="h-2.5 w-14 rounded bg-foreground/10" />
        </div>
        <div className="grid grid-cols-2 gap-2">
          <div className="rounded-lg border border-foreground/10 p-2">
            <div className="h-2 w-full rounded bg-foreground/10" />
            <div className="mt-2 h-8 rounded bg-foreground/10" />
          </div>
          <div className="rounded-lg border border-foreground/10 p-2">
            <div className="h-2 w-2/3 rounded bg-foreground/10" />
            <div className="mt-2 h-8 rounded bg-foreground/10" />
          </div>
        </div>
        <span className="inline-flex w-fit rounded-full bg-[#f97316]/20 px-2 py-0.5 text-[10px] font-medium text-[#f97316]">
          RUN BROWSER FLOW
        </span>
      </div>
    </div>
  );
}
