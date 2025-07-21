import { useState, useEffect } from 'react';
import { Play, Plus, Info, Volume2, VolumeX } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';

interface HeroContent {
  id: string;
  title: string;
  description: string;
  backdrop_url: string;
  trailer_url?: string;
  rating?: number;
  language: string;
  age_rating: string;
  is_premium: boolean;
  type: string;
}

interface HeroBannerProps {
  content?: HeroContent;
}

export const HeroBanner = ({ content }: HeroBannerProps) => {
  const [isMuted, setIsMuted] = useState(true);
  const [showTrailer, setShowTrailer] = useState(false);

  // Default content if none provided
  const defaultContent: HeroContent = {
    id: '1',
    title: 'Avatar: The Way of Water',
    description: 'Set more than a decade after the events of the first film, Avatar: The Way of Water begins to tell the story of the Sully family and the challenges they face.',
    backdrop_url: 'https://images.unsplash.com/photo-1534447677768-be436bb09401?w=1920&h=1080&fit=crop',
    trailer_url: 'https://demo-video.com/avatar-trailer.mp4',
    rating: 8.1,
    language: 'English',
    age_rating: 'UA',
    is_premium: true,
    type: 'movie'
  };

  const heroContent = content || defaultContent;

  useEffect(() => {
    // Auto-show trailer after 3 seconds
    const timer = setTimeout(() => {
      setShowTrailer(true);
    }, 3000);

    return () => clearTimeout(timer);
  }, []);

  return (
    <div className="relative h-screen overflow-hidden">
      {/* Background Image/Video */}
      <div className="absolute inset-0">
        {showTrailer && heroContent.trailer_url ? (
          <video
            className="w-full h-full object-cover"
            autoPlay
            muted={isMuted}
            loop
            playsInline
          >
            <source src={heroContent.trailer_url} type="video/mp4" />
            <img 
              src={heroContent.backdrop_url} 
              alt={heroContent.title}
              className="w-full h-full object-cover"
            />
          </video>
        ) : (
          <img 
            src={heroContent.backdrop_url} 
            alt={heroContent.title}
            className="w-full h-full object-cover"
          />
        )}
      </div>

      {/* Gradient Overlays */}
      <div className="absolute inset-0 bg-gradient-to-r from-black/80 via-black/40 to-transparent" />
      <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-background to-transparent" />

      {/* Content */}
      <div className="absolute inset-0 flex items-center">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full">
          <div className="max-w-2xl space-y-6">
            {/* Badges */}
            <div className="flex items-center space-x-2">
              {heroContent.is_premium && (
                <Badge className="premium-badge">Premium</Badge>
              )}
              <Badge variant="outline" className="bg-black/40 text-white border-white/20">
                {heroContent.age_rating}
              </Badge>
              <Badge variant="secondary" className="bg-black/40 text-white">
                {heroContent.type.toUpperCase()}
              </Badge>
            </div>

            {/* Title */}
            <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold text-white leading-tight">
              {heroContent.title}
            </h1>

            {/* Description */}
            <p className="text-lg md:text-xl text-gray-200 leading-relaxed max-w-xl">
              {heroContent.description}
            </p>

            {/* Actions */}
            <div className="flex items-center space-x-4">
              <Button size="lg" className="h-12 px-8 text-base font-semibold">
                <Play className="w-5 h-5 mr-2" fill="currentColor" />
                Play Now
              </Button>
              
              <Button 
                size="lg" 
                variant="secondary" 
                className="h-12 px-8 text-base font-semibold bg-white/20 text-white border-white/30 hover:bg-white/30"
              >
                <Plus className="w-5 h-5 mr-2" />
                My List
              </Button>
              
              <Button 
                size="lg" 
                variant="ghost" 
                className="h-12 px-8 text-base font-semibold text-white hover:bg-white/20"
              >
                <Info className="w-5 h-5 mr-2" />
                More Info
              </Button>
            </div>

            {/* Additional Info */}
            <div className="flex items-center space-x-4 text-sm text-gray-300">
              {heroContent.rating && (
                <div className="flex items-center space-x-1">
                  <span className="text-yellow-400">★</span>
                  <span>{heroContent.rating}/10</span>
                </div>
              )}
              <span>•</span>
              <span>{heroContent.language}</span>
              <span>•</span>
              <span>HD</span>
            </div>
          </div>
        </div>
      </div>

      {/* Volume Control */}
      {showTrailer && heroContent.trailer_url && (
        <div className="absolute bottom-20 right-8">
          <Button
            variant="ghost"
            size="sm"
            className="w-10 h-10 rounded-full bg-black/40 text-white hover:bg-black/60"
            onClick={() => setIsMuted(!isMuted)}
          >
            {isMuted ? (
              <VolumeX className="w-4 h-4" />
            ) : (
              <Volume2 className="w-4 h-4" />
            )}
          </Button>
        </div>
      )}

      {/* Skip Intro Button (for series) */}
      {heroContent.type === 'series' && showTrailer && (
        <div className="absolute bottom-20 right-20">
          <Button variant="secondary" size="sm" className="bg-white/20 text-white border-white/30 hover:bg-white/30">
            Skip Intro
          </Button>
        </div>
      )}
    </div>
  );
};

export default HeroBanner;