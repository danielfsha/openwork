export function TaskSchedulingIllustration() {
  return (
    <div className="relative h-full overflow-hidden p-2">
      <div className="flex h-8 items-center justify-between rounded-sm border border-foreground/10 bg-background/90 px-2 text-[9px]">
        <div className="flex items-center gap-2 text-muted-foreground">
          <span className="h-3 w-3 rounded-sm border border-foreground/25" />
          <span className="h-3 w-3 rounded-full border border-foreground/25" />
          <span className="h-3 w-3 rounded-sm border border-foreground/25" />
        </div>
        <span className="text-foreground/80">00:03:26</span>
        <div className="flex items-center gap-2 text-muted-foreground">
          <span className="h-0 w-0 border-y-[4px] border-y-transparent border-r-[6px] border-r-foreground/50" />
          <span className="h-0 w-0 border-y-[5px] border-y-transparent border-l-[7px] border-l-foreground/70" />
          <span className="h-3 w-3 rounded-full border border-foreground/35" />
        </div>
      </div>

      <div className="relative mt-2 h-[154px] overflow-hidden rounded-sm border border-foreground/10 bg-[linear-gradient(to_right,rgba(148,163,184,0.16)_1px,transparent_1px)] bg-[length:26px_100%]">
        <div className="absolute inset-x-0 top-0 h-6 border-b border-foreground/10 bg-background/75 px-2 text-[8px] text-muted-foreground">
          <div className="grid h-full grid-cols-9 items-center">
            <span>1s</span>
            <span>2s</span>
            <span>3s</span>
            <span>4s</span>
            <span>5s</span>
            <span>6s</span>
            <span>7s</span>
            <span>8s</span>
            <span>9s</span>
          </div>
        </div>

        <div className="absolute bottom-0 top-0 left-[42%] w-[2px] bg-[#6366f1]/65" />

        <div className="absolute left-2 right-10 top-8 h-7 rounded-sm border border-[#e3b373]/80 bg-[#f6cf98]/70 px-2 py-1 text-[9px] text-[#7b4d1f] shadow-sm">
          <div className="flex items-center justify-between">
            <span className="font-medium">Chicken Sound</span>
            <span>Audio</span>
          </div>
          <div className="mt-1 h-2 rounded-sm bg-[#fee9ca]/80" />
        </div>

        <div className="absolute left-12 right-8 top-[70px] h-7 rounded-sm border border-foreground/15 bg-background/90 px-2 py-1 text-[9px] text-foreground/80">
          <div className="flex items-center justify-between">
            <span className="font-medium">Vector Path Transform</span>
            <span className="text-muted-foreground">Layer</span>
          </div>
        </div>

        <div className="absolute left-14 right-6 top-[100px] space-y-1.5 text-[8px] text-muted-foreground">
          <div className="flex items-center gap-2">
            <span className="w-10">Position X</span>
            <span className="h-[1px] flex-1 bg-foreground/20" />
            <span className="h-2 w-2 rotate-45 border border-foreground/35 bg-background" />
          </div>
          <div className="flex items-center gap-2">
            <span className="w-10">Opacity</span>
            <span className="h-[1px] flex-1 bg-foreground/20" />
            <span className="h-2 w-2 rotate-45 border border-foreground/35 bg-background" />
          </div>
        </div>

        <div className="absolute left-16 right-10 bottom-3 h-6 rounded-sm border border-[#f0c892]/75 bg-[#f9dfbf]/65 px-2 py-1 text-[9px] text-[#7b4d1f]">
          My Video Cutscene
        </div>
      </div>
    </div>
  );
}
