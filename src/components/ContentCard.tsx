import { useState } from 'react';
import { Link } from 'react-router-dom';
import { Play, Plus, Info, Star, Clock } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';

interface Content {
  id: string;
  title: string;
  description: string;
  type: string;
  poster_url: string;
  duration?: number;
  rating?: number;
  language: string;
  age_rating: string;
  is_premium: boolean;
  is_trending: boolean;
}

interface ContentCardProps {
  content: Content;
  size?: 'small' | 'medium' | 'large';
  showDetails?: boolean;
}

export const ContentCard = ({ 
  content, 
  size = 'medium', 
  showDetails = false 
}: ContentCardProps) => {
  const [isHovered, setIsHovered] = useState(false);

  const sizeClasses = {
    small: 'aspect-[2/3] w-full',
    medium: 'aspect-[2/3] w-full',
    large: 'aspect-[16/9] w-full'
  };

  const formatDuration = (minutes?: number) => {
    if (!minutes) return '';
    const hours = Math.floor(minutes / 60);
    const mins = minutes % 60;
    return hours > 0 ? `${hours}h ${mins}m` : `${mins}m`;
  };

  return (
    <div 
      className="content-card group"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <Link to={`/watch/${content.id}`} className="block relative">
        {/* Poster Image */}
        <div className={`relative ${sizeClasses[size]} bg-muted rounded-lg overflow-hidden`}>
          <img
            src={content.poster_url}
            alt={content.title}
            className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-110"
            loading="lazy"
          />
          
          {/* Overlay with badges */}
          <div className="absolute top-2 left-2 flex flex-col gap-1">
            {content.is_premium && (
              <Badge className="premium-badge text-xs">Premium</Badge>
            )}
            {content.type === 'live' && (
              <Badge className="live-badge text-xs">Live</Badge>
            )}
            {content.is_trending && (
              <Badge variant="secondary" className="text-xs">Trending</Badge>
            )}
          </div>

          {/* Age Rating */}
          <div className="absolute top-2 right-2">
            <Badge variant="outline" className="text-xs bg-black/60 text-white border-white/20">
              {content.age_rating}
            </Badge>
          </div>

          {/* Play Button Overlay */}
          <div className={`absolute inset-0 flex items-center justify-center transition-opacity duration-300 ${
            isHovered ? 'opacity-100' : 'opacity-0'
          }`}>
            <Button size="sm" className="rounded-full w-12 h-12 p-0">
              <Play className="w-5 h-5" fill="currentColor" />
            </Button>
          </div>

          {/* Bottom overlay with actions */}
          {showDetails && (
            <div className={`absolute bottom-0 left-0 right-0 p-3 bg-gradient-to-t from-black/80 to-transparent transition-transform duration-300 ${
              isHovered ? 'translate-y-0' : 'translate-y-full'
            }`}>
              <div className="flex items-center justify-between text-white">
                <div className="flex items-center space-x-2">
                  <Button size="sm" variant="secondary" className="h-8 px-2">
                    <Play className="w-3 h-3 mr-1" />
                    Play
                  </Button>
                  <Button size="sm" variant="ghost" className="h-8 w-8 p-0 text-white hover:bg-white/20">
                    <Plus className="w-4 h-4" />
                  </Button>
                </div>
                <Button size="sm" variant="ghost" className="h-8 w-8 p-0 text-white hover:bg-white/20">
                  <Info className="w-4 h-4" />
                </Button>
              </div>
            </div>
          )}
        </div>

        {/* Content Info */}
        <div className="mt-3 space-y-1">
          <h3 className="font-semibold text-sm line-clamp-2 group-hover:text-primary transition-colors">
            {content.title}
          </h3>
          
          <div className="flex items-center space-x-2 text-xs text-muted-foreground">
            {content.rating && (
              <div className="flex items-center space-x-1">
                <Star className="w-3 h-3 fill-yellow-400 text-yellow-400" />
                <span>{content.rating}</span>
              </div>
            )}
            {content.duration && (
              <div className="flex items-center space-x-1">
                <Clock className="w-3 h-3" />
                <span>{formatDuration(content.duration)}</span>
              </div>
            )}
            <span className="capitalize">{content.language}</span>
          </div>
        </div>
      </Link>
    </div>
  );
};

export default ContentCard;