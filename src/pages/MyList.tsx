import { useEffect, useState } from 'react';
import { useAuth } from '@/hooks/useAuth';
import ContentCard from '@/components/ContentCard';
import { Link } from 'react-router-dom';

const MyList = () => {
  const { user } = useAuth();
  const [list, setList] = useState<any[]>([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (!user) return;
    setLoading(true);
    fetch(`/api/my-list/${user.id}`)
      .then(res => res.json())
      .then(data => setList(data || []))
      .finally(() => setLoading(false));
  }, [user]);

  const handleRemoveFromList = (contentId: string) => {
    setList((prev) => prev.filter((item) => item.content_id !== contentId));
  };

  if (!user) return <div className="p-8 text-center text-xl">Sign in to view your list.</div>;
  if (loading) return <div className="p-8 text-center text-xl">Loading...</div>;

  return (
    <div className="pt-24 p-8">
      <div className="mb-6 flex items-center gap-4">
        <Link to="/" className="bg-muted px-4 py-2 rounded text-primary border border-primary hover:bg-primary hover:text-white transition">← Home</Link>
        <h2 className="text-2xl font-bold">My List</h2>
      </div>
      {list.length === 0 ? (
        <div className="text-center text-lg text-muted-foreground">No saved content yet.</div>
      ) : (
        <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-6">
          {list.map((item) => (
            <ContentCard key={item.content_id} content={item.content} onRemove={() => handleRemoveFromList(item.content_id)} />
          ))}
        </div>
      )}
    </div>
  );
};

export default MyList; 