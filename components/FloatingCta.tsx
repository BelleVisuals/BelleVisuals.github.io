"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";
export default function FloatingCta() {
  if (usePathname() === "/inquire") return null;
  return <Link href="/inquire" className="btn btn-pri fixed bottom-4 right-4 z-30 shadow-2xl md:bottom-6 md:right-6">Start a project</Link>;
}
