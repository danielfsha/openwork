"use client";

import Link from "next/link";
import { ChevronRight } from "lucide-react";
import { cn } from "@/lib/utils";
import { buttonVariants } from "./ui/button";

type MobileNavItem = {
  href: string;
  label: string;
  key: "docs" | "pricing" | "download" | "enterprise" | "cloud";
  newTab?: boolean;
};

export type SiteNavActiveItem = MobileNavItem["key"] | "home";

type SiteNavMobileMenuProps = {
  open: boolean;
  active?: SiteNavActiveItem;
  callHref: string;
  callExternal: boolean;
  primaryHref: string;
  primaryLabel: string;
  primaryExternal: boolean;
  onClose: () => void;
};

const mobileNavItems: MobileNavItem[] = [
  { href: "/docs", label: "Docs", key: "docs", newTab: true },
  { href: "/pricing", label: "Pricing", key: "pricing" },
  { href: "/download", label: "Desktop", key: "download" },
  { href: "https://app.openworklabs.com", label: "Cloud", key: "cloud" },
  { href: "/enterprise", label: "Enterprise", key: "enterprise" },
];

function opensInNewTab(item: MobileNavItem) {
  return item.newTab || /^(?:https?:\/\/)/.test(item.href);
}

function navLinkClass(isActive: boolean) {
  return isActive
    ? "text-foreground"
    : "text-muted-foreground transition-colors hover:text-foreground";
}

export function SiteNavMobileMenu({
  open,
  active,
  callHref,
  callExternal,
  primaryHref,
  primaryLabel,
  primaryExternal,
  onClose,
}: SiteNavMobileMenuProps) {
  if (!open) {
    return null;
  }

  return (
    <div className="fixed inset-0 z-[30] bg-background md:hidden">
      <div className="mx-auto flex h-dvh w-full max-w-md flex-col px-1 pb-1 pt-[82px]">
        <div className="flex flex-1 flex-col overflow-hidden rounded-[22px] bg-[#f7f7f8]">
          <div className="flex-1 overflow-y-auto px-4 pt-2">
            <div className="space-y-1 text-[20px] font-medium tracking-tight text-[#111111]">
              {mobileNavItems.map((item) => (
                <Link
                  key={item.key}
                  href={item.href}
                  {...(opensInNewTab(item)
                    ? { target: "_blank", rel: "noreferrer" }
                    : {})}
                  className={cn(
                    "flex items-center justify-between rounded-xl px-4 py-3",
                    navLinkClass(active === item.key),
                  )}
                  onClick={onClose}
                >
                  <span>{item.label}</span>
                  <ChevronRight className="h-4 w-4 text-[#9ca3af]" />
                </Link>
              ))}
            </div>
          </div>

          <div className="p-3 pb-[max(env(safe-area-inset-bottom),0.75rem)]">
            <div className="grid grid-cols-2 gap-2">
              <a
                href={callHref}
                className={cn(
                  buttonVariants({ variant: "outline", size: "lg" }),
                  "h-11 justify-center rounded-full border-[#e5e5e5] bg-white text-[#111111] shadow-[0_0_0_1px_rgba(0,0,0,0.06),0_1px_2px_0px_rgba(0,0,0,0.04),0_2px_4px_0px_rgba(0,0,0,0.04)] hover:bg-[#f5f5f5] hover:text-[#111111] dark:border-[#e5e5e5] dark:bg-white dark:text-[#111111] dark:hover:bg-[#f5f5f5] dark:hover:text-[#111111]",
                )}
                rel={callExternal ? "noreferrer" : undefined}
                target={callExternal ? "_blank" : undefined}
              >
                Contact sales
              </a>
              <a
                href={primaryHref}
                className={cn(
                  buttonVariants({ variant: "default", size: "lg" }),
                  "h-11 justify-center rounded-full bg-[#212121] text-white hover:bg-[#171717] dark:bg-[#212121] dark:text-white dark:hover:bg-[#171717]",
                )}
                rel={primaryExternal ? "noreferrer" : undefined}
                target={primaryExternal ? "_blank" : undefined}
              >
                {primaryLabel}
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
