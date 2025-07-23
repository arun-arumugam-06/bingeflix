import { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Play, Plus, Info, Star, Clock, Trash2 } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { useAuth } from '@/hooks/useAuth';

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
  genre?: string; // Added for new info
  year?: string; // Added for new info
}

interface ContentCardProps {
  content: Content;
  size?: 'small' | 'medium' | 'large';
  showDetails?: boolean;
  onRemove?: () => void;
}

export const ContentCard = ({ 
  content, 
  size = 'medium', 
  showDetails = false,
  onRemove 
}: ContentCardProps) => {
  const [isHovered, setIsHovered] = useState(false);
  const { user } = useAuth();
  const [inMyList, setInMyList] = useState(false);
  const navigate = useNavigate();

  // Check if in My List on mount
  useEffect(() => {
    if (!user) return;
    fetch(`/api/my-list/${user.id}`)
      .then(res => res.json())
      .then(data => {
        if (Array.isArray(data)) {
          setInMyList(data.some((item: any) => item.content_id === content.id));
        }
      });
  }, [user, content.id]);

  const handleAdd = async (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    if (!user) return;
    await fetch('/api/my-list', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ user_id: user.id, content_id: content.id })
    });
    setInMyList(true);
  };
  const handleRemove = async (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    if (!user) return;
    await fetch('/api/my-list', {
      method: 'DELETE',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ user_id: user.id, content_id: content.id })
    });
    setInMyList(false);
    if (onRemove) onRemove();
  };

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
      className="content-card group cursor-pointer relative transition-transform duration-300 hover:scale-105 hover:shadow-2xl bg-gradient-to-br from-gray-900/80 to-gray-800/60 border border-border/30 rounded-xl overflow-hidden"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      onClick={() => navigate(`/watch/${content.id}`)}
    >
      <div className="block relative">
        {/* Poster Image */}
        <div className={`relative ${sizeClasses[size]} bg-muted rounded-lg overflow-hidden shadow-lg`}>
          <img
            src={content.poster_url}
            alt={content.title}
            className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-110"
            loading="lazy"
          />
          {/* Gradient Hover Overlay */}
          <div className={`absolute inset-0 transition-opacity duration-300 pointer-events-none ${isHovered ? 'opacity-80 bg-gradient-to-t from-black/90 via-black/40 to-transparent' : 'opacity-0'}`}></div>
          {/* Overlay with badges */}
          <div className="absolute top-2 left-2 flex flex-col gap-1 z-10">
            {content.is_premium && (
              <Badge className="premium-badge text-xs animate-pulse bg-yellow-500/90 text-white shadow">Premium</Badge>
            )}
            {content.type === 'live' && (
              <Badge className="live-badge text-xs animate-pulse bg-red-600/90 text-white shadow">Live</Badge>
            )}
            {content.is_trending && (
              <Badge variant="secondary" className="text-xs animate-bounce bg-blue-600/90 text-white shadow">Trending</Badge>
            )}
          </div>
          {/* Age Rating */}
          <div className="absolute top-2 right-2 z-10">
            <Badge variant="outline" className="text-xs bg-black/60 text-white border-white/20">
              {content.age_rating}
            </Badge>
          </div>
          {/* Play Button Overlay */}
          <div className={`absolute inset-0 flex items-center justify-center transition-opacity duration-300 ${isHovered ? 'opacity-100' : 'opacity-0'} z-20`}>
            <Button size="sm" className="rounded-full w-12 h-12 p-0 bg-primary/90 hover:bg-primary shadow-lg">
              <Play className="w-5 h-5" fill="currentColor" />
            </Button>
          </div>
          {/* Remove from List Button (always visible if inMyList) */}
          {inMyList && (
            <Button size="icon" variant="destructive" className="absolute bottom-2 right-2 z-30 shadow-lg" onClick={handleRemove} title="Remove from My List">
              <Trash2 className="w-5 h-5" />
            </Button>
          )}
          {/* Bottom overlay with actions */}
          {showDetails && (
            <div className={`absolute bottom-0 left-0 right-0 p-3 bg-gradient-to-t from-black/80 to-transparent transition-transform duration-300 ${isHovered ? 'translate-y-0' : 'translate-y-full'} z-20`}>
              <div className="flex items-center justify-between text-white">
                <div className="flex items-center space-x-2">
                  <Button size="sm" variant="secondary" className="h-8 px-2">
                    <Play className="w-3 h-3 mr-1" />
                    Play
                  </Button>
                  <Button size="sm" variant="ghost" className={`h-8 w-8 p-0 text-white hover:bg-white/20 ${inMyList ? 'bg-green-600/80' : ''}`} onClick={inMyList ? handleRemove : handleAdd}>
                    {inMyList ? <span title="Remove from My List">✓</span> : <Plus className="w-4 h-4" title="Add to My List" />}
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
        <div className="mt-3 space-y-1 px-1">
          <h3 className="font-semibold text-base line-clamp-2 group-hover:text-primary transition-colors">
            {content.title}
          </h3>
          <div className="flex items-center space-x-3 text-xs text-muted-foreground">
            {content.rating && (
              <div className="flex items-center space-x-1 bg-yellow-100 text-yellow-800 px-2 py-0.5 rounded-full font-semibold animate-fade-in">
                <Star className="w-3 h-3 fill-yellow-400 text-yellow-400" />
                <span>{content.rating}</span>
              </div>
            )}
            {content.duration && (
              <div className="flex items-center space-x-1 bg-blue-100 text-blue-800 px-2 py-0.5 rounded-full animate-fade-in">
                <Clock className="w-3 h-3" />
                <span>{formatDuration(content.duration)}</span>
              </div>
            )}
            <span className="capitalize bg-gray-100 text-gray-700 px-2 py-0.5 rounded-full animate-fade-in">{content.language}</span>
            {content.genre && (
              <span className="bg-purple-100 text-purple-700 px-2 py-0.5 rounded-full animate-fade-in">{content.genre}</span>
            )}
            {content.year && (
              <span className="bg-green-100 text-green-700 px-2 py-0.5 rounded-full animate-fade-in">{content.year}</span>
            )}
          </div>
          {/* Description snippet on hover */}
          {isHovered && (
            <div className="mt-2 text-xs text-gray-100 bg-black/70 px-3 py-2 rounded shadow line-clamp-2 animate-fade-in">
              {content.description}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default ContentCard;