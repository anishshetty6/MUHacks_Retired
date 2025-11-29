"use client"
import type { PropagandaTopic } from "../data"
import { NewsCard } from "./news-card"

interface PropagandaCardProps {
  topic: PropagandaTopic
}

export function PropagandaCard({ topic }: PropagandaCardProps) {
  return (
    <div className="bg-card border border-border rounded-lg shadow-sm p-6">
      {/* Genre Badge */}
     

      {/* Title */}
      <h2 className="text-xl font-bold text-textbold mb-2">{topic.title}</h2>

      {/* Description */}
      <p className="text-textlight mb-5 text-sm">{topic.description}</p>

      {/* Divider */}
      <hr className="border-border mb-5" />

      {/* News Cards stacked vertically */}
      <div className="grid grid-cols-1 gap-4">
        {topic.newsItems.map((newsItem) => (
          <NewsCard key={newsItem.id} newsItem={newsItem} />
        ))}
      </div>
    </div>
  )
}
