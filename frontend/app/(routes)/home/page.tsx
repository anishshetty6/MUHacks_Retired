import Analytics from "@/components/analytics/analytics";
import TrendingComponent from "@/components/trending/trending-componnet";
import SearchBar from "@/components/search/search";
import PropagandaPage from "@/components/propaganda/page";

export default function Home() {
  return (
    <main className="min-h-screen bg-gradient-to-b from-emerald-50 to-white dark:from-emerald-950/20 dark:to-black">
      <SearchBar />
      <div className="pt-32">
      <PropagandaPage/>
      </div>
      <div className="pt-32">
        <TrendingComponent />
      </div>

      <div className="container mx-auto">
        <div className="border-b border-white/20 my-4"></div>
      </div>

      <Analytics />

      <div className="container mx-auto">
        <div className="border-b border-white/20 my-4"></div>
      </div>
    </main>
  );
}
