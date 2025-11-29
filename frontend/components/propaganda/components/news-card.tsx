"use client"
import type { NewsItem } from "../data"

interface NewsCardProps {
  newsItem: NewsItem
}

export function NewsCard({ newsItem }: NewsCardProps) {
  // Determine credibility color based on score
  const getCredibilityColor = (score: number) => {
    if (score >= 80) return "bg-emerald-100 text-emerald-700 dark:bg-emerald-500/20 dark:text-emerald-300"
    if (score >= 60) return "bg-amber-100 text-amber-700 dark:bg-amber-500/20 dark:text-amber-200"
    return "bg-rose-100 text-rose-700 dark:bg-rose-500/20 dark:text-rose-200"
  }

  return (
    <div className="bg-themebackground/80 dark:bg-themeforeground/10 border border-border/60 rounded-2xl p-6 shadow-lg shadow-colorTwo/10 hover:shadow-colorTwo/40 transition-shadow duration-300">
      <div className="flex flex-col gap-5 sm:flex-row sm:items-center sm:gap-6">
        {/* Image */}
        <div className="mx-auto w-32 h-32 rounded-2xl border border-border/60 bg-white/70 dark:bg-white/5 overflow-hidden flex items-center justify-center sm:mx-0">
          <img
            src={newsItem.imageUrl || "/placeholder.svg"}
            alt={newsItem.title}
            className="w-full h-full object-cover"
          />
        </div>

        {/* Content */}
        <div className="flex-1 text-center sm:text-left space-y-4">
          <div className="space-y-2">
            <span className="inline-flex items-center justify-center rounded-full bg-colorTwo/10 px-3 py-1 text-xs font-semibold text-colorTwo dark:bg-colorTwo/20">
              Featured story
            </span>
            <h3 className="font-mono text-lg font-semibold text-textbold dark:text-white leading-tight">
              {newsItem.title}
            </h3>
            <p className="text-sm text-textlight dark:text-white/70 leading-relaxed">
              {newsItem.summary}
            </p>
          </div>

          <div className="flex flex-col items-center gap-2 sm:flex-row sm:items-center sm:gap-3">
            <span className="text-xs font-semibold uppercase tracking-wide text-textlight dark:text-white/60">
              Credibility score
            </span>
            <span className={`px-3 py-1 rounded-full text-xs font-semibold ${getCredibilityColor(newsItem.credibilityScore)}`}>
              {newsItem.credibilityScore}%
            </span>
          </div>

          <div className="flex flex-col gap-3 sm:flex-row">
            <a
              href={newsItem.sourceUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="flex-1 rounded-full bg-colorTwo text-white px-5 py-2 text-sm font-semibold shadow shadow-colorTwo/40 transition hover:-translate-y-0.5 hover:shadow-colorTwo/70"
            >
              Visit Source
            </a>
            <button className="flex-1 rounded-full border border-colorTwo/60 px-5 py-2 text-sm font-semibold text-colorTwo dark:text-white hover:bg-colorTwo/10 dark:hover:bg-colorTwo/20 transition">
              Read More
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}
