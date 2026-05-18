"use client";

import { usePathname } from "next/navigation";
import { ExternalLink } from "lucide-react";

export default function GlobalFooter() {
  const pathname = usePathname();
  
  if (pathname.startsWith("/auth") || pathname.startsWith("/chat") || pathname.includes("/ai-chat")) {
    return null;
  }

  return (
    <footer
      id="footer"
      className="px-6 py-5 flex flex-col md:flex-row items-center justify-between gap-4 border-t border-[var(--border-tertiary)] bg-[var(--bg-primary)] mt-auto"
    >
      <div className="text-xs text-[var(--text-tertiary)]">
        © 2026 Khadmat AI · Google Antigravity Hackathon
      </div>
      <div className="flex items-center gap-5">
        <a
          href="https://github.com"
          target="_blank"
          rel="noopener noreferrer"
          className="flex items-center gap-1.5 text-xs text-[var(--text-tertiary)] hover:text-[var(--text-secondary)] transition-colors no-underline"
        >
          <ExternalLink size={12} />
          GitHub
        </a>
        <a
          href="#"
          className="flex items-center gap-1.5 text-xs text-[var(--text-tertiary)] hover:text-[var(--text-secondary)] transition-colors no-underline"
        >
          <ExternalLink size={12} />
          Docs
        </a>
        <a
          href="#"
          className="flex items-center gap-1.5 text-xs text-[var(--text-tertiary)] hover:text-[var(--text-secondary)] transition-colors no-underline"
        >
          <ExternalLink size={12} />
          About
        </a>
      </div>
    </footer>
  );
}
