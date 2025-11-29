"use client"

import { useGenre } from "@/contexts/GenreContext"
import { type Genre, MOCK_PROPAGANDA_TOPICS } from "./data"
import { PropagandaCard } from "./components/propaganda-card"

// Map search bar genres to propaganda genres
const genreMap: Record<string, Genre | null> = {
  "All": null,
  "Politics": "Politics",
  "Sports": "Sports",
  "Health": "Health",
  "Business": "Finance", // Map Business to Finance
  "Economy": "Finance", // Map Economy to Finance
  "General": "General",
  // Other genres that don't match will be filtered out
}

export default function PropagandaPage() {
  const { activeTab } = useGenre()

  // Map the activeTab from search bar to propaganda genre
  const selectedGenre = genreMap[activeTab] ?? null

  // Filter propaganda topics based on selected genre from search bar
  const filteredTopics =
    selectedGenre === null
      ? MOCK_PROPAGANDA_TOPICS
      : MOCK_PROPAGANDA_TOPICS.filter((topic) => topic.genre === selectedGenre)

  return (
    <main className="flex-1 p-8">
      {/* Header */}
      <h1 className="text-3xl font-mono uppercase tracking-wider text-textbold mb-6">Propaganda</h1>

      {/* Propaganda Cards Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mt-8">
        {filteredTopics.map((topic) => (
          <PropagandaCard key={topic.id} topic={topic} />
        ))}
      </div>

      {/* Empty state */}
      {filteredTopics.length === 0 && (
        <div className="text-center py-12">
          <p className="text-textlight">No propaganda topics found for the selected genre.</p>
        </div>
      )}
    </main>
  )
}
