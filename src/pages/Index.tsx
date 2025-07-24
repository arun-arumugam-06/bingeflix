import { useEffect, useState } from 'react';
import { useAuth } from '@/hooks/useAuth';
import HeroBanner from '@/components/HeroBanner';
import ContentCard from '@/components/ContentCard';
import Navbar from '@/components/Navbar';
import { LoadingSpinner } from '@/components/ui/loading-spinner';

interface Content {
  id: string;
  title: string;
  description: string;
  type: string;
  poster_url: string;
  backdrop_url: string;
  duration?: number;
  rating?: number;
  language: string;
  age_rating: string;
  is_premium: boolean;
  is_trending: boolean;
}

const Index = () => {
  const { user, loading } = useAuth();
  const [content, setContent] = useState<Content[]>([]);
  const [featuredContent, setFeaturedContent] = useState<Content | null>(null);
  const [isLoadingContent, setIsLoadingContent] = useState(true);
  const baseURL = import.meta.env.VITE_BACKEND_URL;

  useEffect(() => {
    fetchContent();
  }, []);

  const fetchContent = async () => {
    setIsLoadingContent(true);
    try {
      const token = localStorage.getItem('token');
      const res = await fetch(`${baseURL}/api/content`, {
        headers: token ? { Authorization: `Bearer ${token}` } : {},
      });
      if (!res.ok) throw new Error('Failed to fetch content');
      const data = await res.json();
      setContent(data);
      // Set first trending content as featured
      const featured = data.find((item: Content) => item.is_trending) || data[0];
      setFeaturedContent(featured);
    } catch (error) {
      console.error('Error fetching content:', error);
    } finally {
      setIsLoadingContent(false);
    }
  };

  if (loading || isLoadingContent) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <LoadingSpinner size="lg" />
      </div>
    );
  }

  const trendingContent = content.filter(item => item.is_trending);
  const moviesContent = content.filter(item => item.type === 'movie');
  const seriesContent = content.filter(item => item.type === 'series');
  const liveContent = content.filter(item => item.type === 'live');

  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      {/* Hero Banner */}
      {featuredContent && (
        <HeroBanner content={featuredContent} />
      )}
      {/* Content Sections */}
      <div className="relative z-10 -mt-32 space-y-12 pb-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Continue Watching - Only show for authenticated users */}
          {user && (
            <section className="space-y-6">
              <h2 className="section-title">Continue Watching</h2>
              <div className="content-grid">
                {trendingContent.slice(0, 6).map((item) => (
                  <ContentCard 
                    key={item.id} 
                    content={item} 
                    showDetails={true}
                  />
                ))}
              </div>
            </section>
          )}
          {/* Trending Now */}
          {trendingContent.length > 0 && (
            <section className="space-y-6">
              <h2 className="section-title">Trending Now</h2>
              <div className="content-grid">
                {trendingContent.map((item) => (
                  <ContentCard 
                    key={item.id} 
                    content={item}
                    showDetails={true}
                  />
                ))}
              </div>
            </section>
          )}
          {/* Movies */}
          {moviesContent.length > 0 && (
            <section className="space-y-6">
              <h2 className="section-title">Popular Movies</h2>
              <div className="content-grid">
                {moviesContent.map((item) => (
                  <ContentCard 
                    key={item.id} 
                    content={item}
                  />
                ))}
              </div>
            </section>
          )}
          {/* TV Series */}
          {seriesContent.length > 0 && (
            <section className="space-y-6">
              <h2 className="section-title">TV Series</h2>
              <div className="content-grid">
                {seriesContent.map((item) => (
                  <ContentCard 
                    key={item.id} 
                    content={item}
                  />
                ))}
              </div>
            </section>
          )}
          {/* Live Sports */}
          {liveContent.length > 0 && (
            <section className="space-y-6">
              <h2 className="section-title">Live Sports</h2>
              <div className="content-grid">
                {liveContent.map((item) => (
                  <ContentCard 
                    key={item.id} 
                    content={item}
                  />
                ))}
              </div>
            </section>
          )}
          {/* Empty State */}
          {content.length === 0 && (
            <div className="text-center py-20">
              <h2 className="text-2xl font-bold mb-4">No Content Available</h2>
              <p className="text-muted-foreground">Check back later for new content!</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Index;
