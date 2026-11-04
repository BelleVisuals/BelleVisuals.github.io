// Endless horizontal scroller. Content is rendered twice so the loop is seamless.
export default function Marquee({ children, duration = 45 }: { children: React.ReactNode; duration?: number }) {
  return (
    <div className="overflow-hidden">
      <div className="marquee flex w-max" style={{ animationDuration: `${duration}s` }}>
        <div className="flex shrink-0 items-center gap-4 pr-4">{children}</div>
        <div aria-hidden="true" className="flex shrink-0 items-center gap-4 pr-4">{children}</div>
      </div>
    </div>
  );
}
