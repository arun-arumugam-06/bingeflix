import { useEffect, useState } from 'react';
import ContentCard from '@/components/ContentCard';
import Navbar from '@/components/Navbar';
import { Input } from '@/components/ui/input';
import { LoadingSpinner } from '@/components/ui/loading-spinner';

const Search = () => {
  const [query, setQuery] = useState('');
  const [results, setResults] = useState<any[]>([]);
  const [allContent, setAllContent] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch('/api/content')
      .then(res => res.json())
      .then(data => {
        setAllContent(data);
        setResults(data);
      })
      .finally(() => setLoading(false));
  }, []);

  useEffect(() => {
    if (!query) {
      setResults(allContent);
    } else {
      setResults(
        allContent.filter((item: any) =>
          item.title.toLowerCase().includes(query.toLowerCase()) ||
          item.description.toLowerCase().includes(query.toLowerCase())
        )
      );
    }
  }, [query, allContent]);

  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <div className="max-w-7xl mx-auto px-4 py-10 pt-24">
        <h2 className="text-3xl font-bold mb-8">Search</h2>
        <div className="mb-6">
          <Input
            type="text"
            placeholder="Search for movies, shows, sports, etc."
            value={query}
            onChange={e => setQuery(e.target.value)}
            className="w-full max-w-xl mx-auto"
          />
        </div>
        {loading ? (
          <div className="flex justify-center items-center h-40"><LoadingSpinner size="lg" /></div>
        ) : results.length === 0 ? (
          <div className="text-center text-lg text-muted-foreground">No results found.</div>
        ) : (
          <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-6">
            {results.map((item) => (
              <ContentCard key={item.id} content={item} />
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default Search; 