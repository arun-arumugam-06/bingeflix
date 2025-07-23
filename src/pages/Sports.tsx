import { useEffect, useState } from 'react';
import ContentCard from '@/components/ContentCard';
import Navbar from '@/components/Navbar';
import { LoadingSpinner } from '@/components/ui/loading-spinner';

const Sports = () => {
  const [sports, setSports] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch('/api/content')
      .then(res => res.json())
      .then(data => setSports(data.filter((item: any) => item.type === 'sports')))
      .finally(() => setLoading(false));
  }, []);

  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <div className="max-w-7xl mx-auto px-4 py-10 pt-24">
        <h2 className="text-3xl font-bold mb-8">Sports</h2>
        {loading ? (
          <div className="flex justify-center items-center h-40"><LoadingSpinner size="lg" /></div>
        ) : sports.length === 0 ? (
          <div className="text-center text-lg text-muted-foreground">No sports found.</div>
        ) : (
          <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-6">
            {sports.map((sport) => (
              <ContentCard key={sport.id} content={sport} />
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default Sports; 