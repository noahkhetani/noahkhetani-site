import { useEffect, useRef, useState } from "react";

interface Day {
  date: string;
  count: number;
  level: number;
}

function parseContributions(html: string): Day[] {
  const days: Day[] = [];
  const rectRe = /<rect[^>]*data-date="([^"]*)"[^>]*data-count="(\d+)"[^>]*data-level="(\d+)"[^>]*\/?>/g;
  let match: RegExpExecArray | null;
  while ((match = rectRe.exec(html)) !== null) {
    days.push({
      date: match[1],
      count: parseInt(match[2], 10),
      level: parseInt(match[3], 10),
    });
  }
  return days;
}

const levelColors = [
  "bg-white/[0.03]",
  "bg-ember/15",
  "bg-ember/30",
  "bg-ember/50",
  "bg-ember/75",
];

export function ContributionGraph({ username }: { username: string }) {
  const [days, setDays] = useState<Day[]>([]);
  const [loading, setLoading] = useState(true);
  const [hovered, setHovered] = useState<Day | null>(null);
  const [pos, setPos] = useState({ x: 0, y: 0 });
  const mounted = useRef(true);

  useEffect(() => {
    mounted.current = true;
    const controller = new AbortController();

    fetch(`https://github.com/users/${username}/contributions`, {
      signal: controller.signal,
    })
      .then((r) => r.text())
      .then((html) => {
        if (!mounted.current) return;
        const parsed = parseContributions(html);
        if (parsed.length > 0) {
          setDays(parsed);
        }
        setLoading(false);
      })
      .catch(() => {
        if (mounted.current) setLoading(false);
      });

    return () => {
      mounted.current = false;
      controller.abort();
    };
  }, [username]);

  if (loading) {
    return (
      <div className="h-[128px] animate-pulse rounded bg-white/[0.03]" />
    );
  }

  if (days.length === 0) {
    return (
      <img
        src={`https://ghchart.rshah.org/6c7bff/${username}`}
        alt={`GitHub contribution graph for ${username}`}
        loading="lazy"
        className="w-full opacity-90"
      />
    );
  }

  const weeks: Day[][] = [];
  for (let i = 0; i < days.length; i += 7) {
    weeks.push(days.slice(i, i + 7));
  }

  return (
    <div className="relative">
      <div className="flex gap-[2px] overflow-x-auto pb-1">
        {weeks.map((week, wi) => (
          <div key={wi} className="flex flex-col gap-[2px]">
            {week.map((day) => (
              <div
                key={day.date}
                className={`h-[10px] w-[10px] rounded-[2px] cursor-pointer transition-colors duration-150 ${levelColors[day.level as keyof typeof levelColors] || levelColors[0]} hover:ring-1 hover:ring-ember/40`}
                onMouseEnter={(e) => {
                  setHovered(day);
                  const r = e.currentTarget.getBoundingClientRect();
                  setPos({ x: r.left + r.width / 2, y: r.top - 8 });
                }}
                onMouseLeave={() => setHovered(null)}
              />
            ))}
          </div>
        ))}
      </div>
      {hovered && (
        <div
          className="pointer-events-none fixed z-50 -translate-x-1/2 -translate-y-full rounded-md bg-[#1a1a28] px-2.5 py-1.5 text-xs shadow-lg hairline"
          style={{ left: pos.x, top: pos.y }}
        >
          <p className="whitespace-nowrap text-ink">
            {new Date(hovered.date).toLocaleDateString("en-US", {
              weekday: "short",
              month: "short",
              day: "numeric",
              year: "numeric",
            })}
          </p>
          <p className="text-mute">{hovered.count} contribution{hovered.count !== 1 ? "s" : ""}</p>
        </div>
      )}
    </div>
  );
}
