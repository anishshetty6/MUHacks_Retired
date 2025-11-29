export type Genre = "Politics" | "Sports" | "Health" | "Finance" | "General"

export interface NewsItem {
  id: string
  imageUrl: string
  title: string
  summary: string
  credibilityScore: number // 0 - 100
  sourceUrl: string
}

export interface PropagandaTopic {
  id: string
  title: string
  description: string
  genre: Genre
  newsItems: NewsItem[]
}

export const MOCK_PROPAGANDA_TOPICS: PropagandaTopic[] = [
  {
    id: "p1",
    title: "Election Rigging Claims in Metro City",
    description:
      "A viral narrative claims that the recent mayoral elections in Metro City were fully rigged using a secret voting algorithm.",
    genre: "Politics",
    newsItems: [
      {
        id: "p1-n1",
        imageUrl: "/metro-city-hall.jpg",
        title: "Officials Deny Claims of Rigged Metro City Elections",
        summary:
          "The election commission released server logs and third-party audit reports rejecting the allegations of large-scale manipulation.",
        credibilityScore: 88,
        sourceUrl: "https://news.example.com/metro-city-elections-audit",
      },
      {
        id: "p1-n2",
        imageUrl: "/protest.jpg",
        title: "Protesters March Over Voting Machine Fears",
        summary:
          "Citizen groups gathered outside city hall demanding a recount and independent verification of the voting machines.",
        credibilityScore: 52,
        sourceUrl: "https://news.example.com/metro-city-protests-voting-machines",
      },
    ],
  },
  {
    id: "p2",
    title: "Star Athlete Retirement Hoax",
    description:
      "Social media posts claim that a championship-winning striker has secretly retired due to a career-ending injury.",
    genre: "Sports",
    newsItems: [
      {
        id: "p2-n1",
        imageUrl: "/press-conference.jpg",
        title: "Striker Dismisses Retirement Rumors in Live Q&A",
        summary:
          "In a live stream, the player confirmed they are training normally and preparing for the upcoming season.",
        credibilityScore: 94,
        sourceUrl: "https://sports.example.com/star-striker-denies-retirement",
      },
      {
        id: "p2-n2",
        imageUrl: "/training-ground.jpg",
        title: "Training Footage Suggests Player is Match Fit",
        summary:
          "New training clips show the striker participating in full-contact drills, contradicting claims of a serious injury.",
        credibilityScore: 81,
        sourceUrl: "https://sports.example.com/training-footage-star-striker",
      },
    ],
  },
  {
    id: "p3",
    title: "Miracle Herbal Cure for All Viral Infections",
    description:
      "Forwarded messages promote a homemade herbal drink as a guaranteed cure for all viral fevers and infections.",
    genre: "Health",
    newsItems: [
      {
        id: "p3-n1",
        imageUrl: "/hospital.jpg",
        title: "Doctors Warn Against Unverified Herbal 'Cures'",
        summary: "Medical experts caution that relying solely on untested home remedies can delay proper treatment.",
        credibilityScore: 90,
        sourceUrl: "https://health.example.com/herbal-cure-misinformation",
      },
      {
        id: "p3-n2",
        imageUrl: "/herbs.jpg",
        title: "What Science Actually Says About the Viral Herbal Mix",
        summary: "A breakdown of each ingredient shows limited evidence for minor symptom relief, not complete cures.",
        credibilityScore: 76,
        sourceUrl: "https://health.example.com/factcheck-viral-herbal-remedy",
      },
    ],
  },
  {
    id: "p4",
    title: "Stock Market Crash 'Tomorrow' Chain Message",
    description:
      "A chain message warns of a guaranteed global stock market crash happening 'tomorrow' due to an insider leak.",
    genre: "Finance",
    newsItems: [
      {
        id: "p4-n1",
        imageUrl: "/stock-chart.jpg",
        title: "Analysts See No Evidence of Imminent Global Crash",
        summary: "Financial analysts explain why the rumored trigger event is unlikely and not supported by data.",
        credibilityScore: 83,
        sourceUrl: "https://finance.example.com/fact-check-global-crash-rumor",
      },
      {
        id: "p4-n2",
        imageUrl: "/trading-floor.jpg",
        title: "Regulators Call Viral Crash Warning 'Baseless'",
        summary: "Market regulators issued a statement advising investors not to act on unverified social media tips.",
        credibilityScore: 79,
        sourceUrl: "https://finance.example.com/regulators-on-crash-warnings",
      },
    ],
  },
  {
    id: "p5",
    title: "Citywide Blackout Due to 'Mystery Solar Storm'",
    description:
      "Posts claim that an upcoming 'mystery solar storm' will knock out all electricity and internet in the city for 48 hours.",
    genre: "General",
    newsItems: [
      {
        id: "p5-n1",
        imageUrl: "/power-grid.jpg",
        title: "Power Utility Confirms No Planned Blackouts",
        summary: "The local power company clarified there are no scheduled outages related to any astronomical events.",
        credibilityScore: 86,
        sourceUrl: "https://citynews.example.com/power-utility-blackout-rumors",
      },
      {
        id: "p5-n2",
        imageUrl: "/solar-activity.jpg",
        title: "Astronomers Debunk Viral 'Mystery Solar Storm' Claim",
        summary: "Space weather forecasts show normal solar activity, with no extreme storms predicted for the region.",
        credibilityScore: 92,
        sourceUrl: "https://science.example.com/solar-storm-fact-check",
      },
    ],
  },
]
