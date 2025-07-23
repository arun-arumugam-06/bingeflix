import { useParams } from 'react-router-dom';
import { useEffect, useState } from 'react';
import Navbar from '@/components/Navbar';
import { LoadingSpinner } from '@/components/ui/loading-spinner';
import ContentCard from '@/components/ContentCard';

const Watch = () => {
  const { id } = useParams();
  const [content, setContent] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch('/api/content')
      .then(res => res.json())
      .then(data => setContent(data.find((item: any) => item.id === id)))
      .finally(() => setLoading(false));
  }, [id]);

  if (loading) return <div className="pt-24 flex justify-center items-center min-h-screen"><LoadingSpinner size="lg" /></div>;
  if (!content) return <div className="pt-24 text-center text-2xl">Content not found.</div>;

  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <div className="max-w-4xl mx-auto px-4 py-10 pt-24">
        <h2 className="text-3xl font-bold mb-6">{content.title}</h2>
        <div className="mb-6">
          <img src={content.poster_url} alt={content.title} className="w-full max-w-md rounded-lg shadow-lg" />
        </div>
        <div className="mb-4 text-lg">{content.description}</div>
        <div className="mb-2">Type: {content.type}</div>
        <div className="mb-2">Language: {content.language}</div>
        <div className="mb-2">Rating: {content.rating}</div>
        <div className="mb-2">Duration: {content.duration} min</div>
        <div className="mb-2">Age Rating: {content.age_rating}</div>
        <div className="mb-2">Premium: {content.is_premium ? 'Yes' : 'No'}</div>
        <div className="mb-2">Trending: {content.is_trending ? 'Yes' : 'No'}</div>
      </div>
    </div>
  );
};

export default Watch; 