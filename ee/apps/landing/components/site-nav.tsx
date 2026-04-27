"use client";

import Link from "next/link";
import { Download, Menu, X } from "lucide-react";
import { useEffect, useRef, useState } from "react";
import { OpenWorkMark } from "./openwork-mark";
import { AnimatePresence, motion } from "framer-motion";
import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
  navigationMenuTriggerStyle,
} from "@/components/ui/navigation-menu";
import { cn } from "@/lib/utils";
import { SectionWrapper } from "@/components/ui/section-wrapper";

type Props = {
  stars: string;
  callUrl?: string;
  downloadHref?: string;
  mobilePrimaryHref?: string;
  mobilePrimaryLabel?: string;
  active?: "home" | "pricing" | "download" | "enterprise" | "cloud" | "docs";
};

const productItems = [
  { title: "Intake", href: "/#intake", description: "Make your product operations self-driving" },
  { title: "Plan", href: "/#plan", description: "Plan and navigate from idea to launch" },
  { title: "Build", href: "/#build", description: "Move work forward across teams and agents" },
  { title: "Diffs", href: "/#diffs", description: "Make code review effortless" },
  { title: "Monitor", href: "/#monitor", description: "Understand progress at scale" },
  { title: "Integrations", href: "/#integrations", description: "Collaborate across tools" },
];

const resourceItems = [
  { title: "Documentation", href: "/docs", description: "Learn how to use OpenWork", external: true },
  { title: "GitHub", href: "https://github.com/different-ai/openwork", description: "View source and contribute", external: true },
  { title: "Changelog", href: "/changelog", description: "See what's new" },
];

function ListItem({
  className,
  title,
  children,
  href,
  external,
  ...props
}: React.ComponentPropsWithoutRef<"li"> & { href: string; external?: boolean }) {
  return (
    <li {...props}>
      <NavigationMenuLink
        href={href}
        target={external ? "_blank" : undefined}
        rel={external ? "noreferrer" : undefined}
        className={cn(
          "block select-none rounded-lg p-3 leading-none no-underline outline-none transition-colors hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground",
          className
        )}
      >
        <div className="text-sm font-medium leading-none">{title}</div>
        <p className="line-clamp-2 text-sm leading-snug text-muted-foreground mt-1.5">{children}</p>
      </NavigationMenuLink>
    </li>
  );
}

export function SiteNav(props: Props) {
  const [mobileOpen, setMobileOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [hoveredItem, setHoveredItem] = useState<string | null>(null);
  const [hoverRect, setHoverRect] = useState({ left: 0, width: 0 });
  const navContainerRef = useRef<HTMLDivElement>(null);
  const itemRefs = useRef<Map<string, HTMLElement>>(new Map());

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 10);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    if (mobileOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [mobileOpen]);

  const updateHoverRect = (key: string) => {
    const el = itemRefs.current.get(key);
    const container = navContainerRef.current;
    if (el && container) {
      const elRect = el.getBoundingClientRect();
      const containerRect = container.getBoundingClientRect();
      setHoverRect({ left: elRect.left - containerRect.left, width: elRect.width });
    }
  };

  const handleMouseEnter = (key: string) => {
    setHoveredItem(key);
    updateHoverRect(key);
  };

  const handleMouseLeave = () => {
    setHoveredItem(null);
  };

  const callHref = props.callUrl || "/enterprise#book";
  const downloadHref = props.downloadHref || "/download";
  const downloadPageHref = "/download";
  const mobilePrimaryHref = props.mobilePrimaryHref || downloadHref;
  const mobilePrimaryLabel = props.mobilePrimaryLabel || "Desktop";
  const callExternal = /^https?:\/\//.test(callHref);
  const mobilePrimaryExternal = /^https?:\/\//.test(mobilePrimaryHref);

  const mobileNavItems = [
    { href: "/docs", label: "Docs", key: "docs", newTab: true },
    { href: "/pricing", label: "Pricing", key: "pricing" },
    { href: "/download", label: "Desktop", key: "download" },
    { href: "https://app.openworklabs.com", label: "Cloud", key: "cloud" },
    { href: "/enterprise", label: "Enterprise", key: "enterprise" },
  ];

  const opensInNewTab = (item: (typeof mobileNavItems)[number]) =>
    ("newTab" in item && item.newTab) || /^(?:https?:\/\/)/.test(item.href);

  const navLinkClass = (isActive: boolean) =>
    isActive ? "text-foreground" : "text-muted-foreground transition-colors hover:text-foreground";

  return (
    <>
      <header className={cn("sticky top-0 z-40 w-screen transition-all duration-300", scrolled ? "bg-background/80 shadow-sm backdrop-blur-md" : "")}>
        <SectionWrapper position="top" as="div">
          <div className="flex items-center justify-between py-4 px-4 md:px-6">
            <Link href="/" className="group inline-flex items-center gap-1.5" onClick={() => setMobileOpen(false)}>
              <OpenWorkMark className="h-[30px] w-[38px] transition-opacity group-hover:opacity-80" />
              <span className="text-[1.2rem] font-semibold tracking-tight text-foreground md:text-[1.3rem]">OpenWork</span>
            </Link>

            {/* Desktop Navigation with hover indicator */}
            <div ref={navContainerRef} className="relative hidden md:block" onMouseLeave={handleMouseLeave}>
              <AnimatePresence>
                {hoveredItem && (
                  <motion.div
                    className="absolute top-0 h-full rounded-full bg-muted pointer-events-none"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1, left: hoverRect.left, width: hoverRect.width }}
                    exit={{ opacity: 0 }}
                    transition={{ type: "spring", bounce: 0.15, duration: 0.25 }}
                  />
                )}
              </AnimatePresence>

              <NavigationMenu>
                <NavigationMenuList>
                  <NavigationMenuItem>
                    <div ref={(el) => { if (el) itemRefs.current.set("product", el); }} onMouseEnter={() => handleMouseEnter("product")}>
                      <NavigationMenuTrigger className="bg-transparent hover:bg-transparent data-popup-open:bg-transparent">Product</NavigationMenuTrigger>
                    </div>
                    <NavigationMenuContent>
                      <ul className="grid w-[400px] gap-1 md:w-[500px] md:grid-cols-2 lg:w-[600px]">
                        {productItems.map((item) => (
                          <ListItem key={item.title} title={item.title} href={item.href}>{item.description}</ListItem>
                        ))}
                      </ul>
                      <div className="border-t border-border mt-2 pt-2 px-1">
                        <Link href="/changelog" className="flex items-center justify-between rounded-lg p-3 text-sm transition-colors hover:bg-accent">
                          <span className="font-medium">New: Linear Agent MCP support</span>
                          <span className="text-blue-600 hover:text-blue-700">Changelog</span>
                        </Link>
                      </div>
                    </NavigationMenuContent>
                  </NavigationMenuItem>

                  <NavigationMenuItem>
                    <div ref={(el) => { if (el) itemRefs.current.set("resources", el); }} onMouseEnter={() => handleMouseEnter("resources")}>
                      <NavigationMenuTrigger className="bg-transparent hover:bg-transparent data-popup-open:bg-transparent">Resources</NavigationMenuTrigger>
                    </div>
                    <NavigationMenuContent>
                      <ul className="w-[300px]">
                        {resourceItems.map((item) => (
                          <ListItem key={item.title} title={item.title} href={item.href} external={item.external}>{item.description}</ListItem>
                        ))}
                      </ul>
                    </NavigationMenuContent>
                  </NavigationMenuItem>

                  <NavigationMenuItem>
                    <div ref={(el) => { if (el) itemRefs.current.set("pricing", el); }} onMouseEnter={() => handleMouseEnter("pricing")}>
                      <NavigationMenuLink href="/pricing" className={cn(navigationMenuTriggerStyle(), "bg-transparent hover:bg-transparent")}>Pricing</NavigationMenuLink>
                    </div>
                  </NavigationMenuItem>

                  <NavigationMenuItem>
                    <div ref={(el) => { if (el) itemRefs.current.set("download", el); }} onMouseEnter={() => handleMouseEnter("download")}>
                      <NavigationMenuLink href="/download" className={cn(navigationMenuTriggerStyle(), "bg-transparent hover:bg-transparent")}>Desktop</NavigationMenuLink>
                    </div>
                  </NavigationMenuItem>

                  <NavigationMenuItem>
                    <div ref={(el) => { if (el) itemRefs.current.set("cloud", el); }} onMouseEnter={() => handleMouseEnter("cloud")}>
                      <NavigationMenuLink href="https://app.openworklabs.com" target="_blank" rel="noreferrer" className={cn(navigationMenuTriggerStyle(), "bg-transparent hover:bg-transparent")}>Cloud</NavigationMenuLink>
                    </div>
                  </NavigationMenuItem>

                  <NavigationMenuItem>
                    <div ref={(el) => { if (el) itemRefs.current.set("enterprise", el); }} onMouseEnter={() => handleMouseEnter("enterprise")}>
                      <NavigationMenuLink href="/enterprise" className={cn(navigationMenuTriggerStyle(), "bg-transparent hover:bg-transparent")}>Enterprise</NavigationMenuLink>
                    </div>
                  </NavigationMenuItem>
                </NavigationMenuList>
              </NavigationMenu>
            </div>

            <div className="flex items-center gap-4">
              <a href="https://github.com/different-ai/openwork" className="hidden items-center gap-2 rounded-full border border-foreground/10 bg-background px-3.5 py-2 text-sm font-medium text-muted-foreground shadow-[0_1px_2px_rgba(17,24,39,0.06)] transition-colors hover:text-foreground sm:flex" rel="noreferrer" target="_blank" aria-label="OpenWork GitHub stars">
                <svg className="h-4 w-4" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                  <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.041-1.416-4.041-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z" />
                </svg>
                {props.stars}
              </a>
              <Link href={downloadPageHref} className="doc-button !hidden items-center gap-2 md:!inline-flex">
                Desktop <Download size={16} />
              </Link>
              <AnimatePresence mode="popLayout" initial={false}>
                <motion.button
                  className="rounded-full p-2 text-foreground md:hidden"
                  onClick={() => setMobileOpen((current) => !current)}
                  aria-expanded={mobileOpen}
                  aria-label={mobileOpen ? "Close navigation menu" : "Open navigation menu"}
                  key={mobileOpen ? "close" : "menu"}
                  initial={{ scale: 0, opacity: 0, filter: "blur(4px)" }}
                  animate={{ scale: 1, opacity: 1, filter: "blur(0px)" }}
                  exit={{ scale: 0, opacity: 0, filter: "blur(4px)" }}
                  transition={{ type: "spring", damping: 20, stiffness: 400, mass: 0.5 }}
                >
                  {mobileOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
                </motion.button>
              </AnimatePresence>
            </div>
          </div>
        </SectionWrapper>
      </header>

      {/* Mobile Menu - Fixed fullscreen overlay */}
      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="fixed inset-0 z-30 md:hidden"
          >
            {/* Backdrop */}
            <div className="absolute inset-0 bg-background/95 backdrop-blur-md" onClick={() => setMobileOpen(false)} />

            {/* Menu content */}
            <motion.div
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.2, ease: [0.23, 1, 0.32, 1] }}
              className="relative pt-20"
            >
              <SectionWrapper position="middle" as="div">
                <div className="p-6">
                  <div className="flex flex-col gap-1 text-lg font-medium">
                    {mobileNavItems.map((item) => (
                      <Link
                        key={item.key}
                        href={item.href}
                        {...(opensInNewTab(item) ? { target: "_blank", rel: "noreferrer" } : {})}
                        className={cn(
                          "block rounded-xl px-4 py-3 transition-colors hover:bg-muted",
                          navLinkClass(props.active === item.key)
                        )}
                        onClick={() => setMobileOpen(false)}
                      >
                        {item.label}
                      </Link>
                    ))}
                  </div>

                  <div className="mt-8 flex flex-col gap-3">
                    <a
                      href={mobilePrimaryHref}
                      className="doc-button justify-center text-base"
                      rel={mobilePrimaryExternal ? "noreferrer" : undefined}
                      target={mobilePrimaryExternal ? "_blank" : undefined}
                    >
                      {mobilePrimaryLabel}
                    </a>
                    <a
                      href={callHref}
                      className="secondary-button justify-center text-base"
                      rel={callExternal ? "noreferrer" : undefined}
                      target={callExternal ? "_blank" : undefined}
                    >
                      Book a call
                    </a>
                    <a
                      href="https://github.com/different-ai/openwork"
                      className="inline-flex items-center justify-center gap-2 rounded-full border border-foreground/10 bg-background px-4 py-3 text-base font-medium text-muted-foreground transition-colors hover:text-foreground"
                      rel="noreferrer"
                      target="_blank"
                    >
                      <svg className="h-5 w-5" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                        <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.041-1.416-4.041-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z" />
                      </svg>
                      GitHub {props.stars}
                    </a>
                  </div>
                </div>
              </SectionWrapper>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
