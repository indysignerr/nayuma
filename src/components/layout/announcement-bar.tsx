"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { BadgeEuro, Flag, Truck, type LucideIcon } from "lucide-react";
import { FREE_SHIPPING_LABEL } from "@/lib/shipping";
import { cn } from "@/lib/utils";

const MESSAGES: { text: string; icon: LucideIcon; href?: string }[] = [
  { text: FREE_SHIPPING_LABEL, icon: Truck },
  { text: "Site français", icon: Flag },
  { text: "Pros : paiement à 60 jours", icon: BadgeEuro, href: "/professionnels" },
];

function Message({ message, className }: { message: (typeof MESSAGES)[number]; className?: string }) {
  const content = (
    <>
      <message.icon className="size-3.5 shrink-0" aria-hidden />
      {message.text}
    </>
  );
  const base = cn("inline-flex items-center gap-1.5 whitespace-nowrap", className);
  return message.href ? (
    <Link href={message.href} className={cn(base, "underline underline-offset-4 decoration-ink/40 hover:decoration-ink")}>
      {content}
    </Link>
  ) : (
    <span className={base}>{content}</span>
  );
}

export function AnnouncementBar() {
  const [index, setIndex] = useState(0);

  // Sur mobile, un seul message à la fois : ils défilent (sauf si l'utilisateur limite les animations).
  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const timer = setInterval(() => setIndex((i) => (i + 1) % MESSAGES.length), 4000);
    return () => clearInterval(timer);
  }, []);

  return (
    <div className="bg-orange text-ink text-xs font-medium tracking-wide">
      <div className="mx-auto max-w-[1240px] px-6 h-9 flex items-center justify-center gap-10 overflow-hidden">
        {MESSAGES.map((message) => (
          <Message key={message.text} message={message} className="hidden sm:inline-flex" />
        ))}
        <div className="sm:hidden" aria-live="off">
          <Message key={index} message={MESSAGES[index]} className="animate-in fade-in duration-500" />
        </div>
      </div>
    </div>
  );
}
