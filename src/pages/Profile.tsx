import { useAuth } from '@/hooks/useAuth';
import { useEffect, useState, useRef } from 'react';
import Navbar from '@/components/Navbar';
import { LoadingSpinner } from '@/components/ui/loading-spinner';

const Profile = () => {
  const { user } = useAuth();
  const [profile, setProfile] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [editMode, setEditMode] = useState(false);
  const [formName, setFormName] = useState('');
  const [formAge, setFormAge] = useState('');
  const [success, setSuccess] = useState('');
  const nameInputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (!user) return;
    // Try to load from localStorage first
    let loadedFromLocal = false;
    const cachedProfile = localStorage.getItem(`profile_${user.id}`);
    if (cachedProfile) {
      const parsed = JSON.parse(cachedProfile);
      setProfile(parsed);
      setFormName(parsed.name);
      setFormAge(parsed.age?.toString() || '');
      loadedFromLocal = true;
    }
    fetch(`/api/profile/${user.id}`)
      .then(res => res.json())
      .then(data => {
        if (data && !data.error && data.name && data.age) {
          setProfile(data);
          setFormName(data.name);
          setFormAge(data.age?.toString() || '');
          localStorage.setItem(`profile_${user.id}`, JSON.stringify(data));
        } else if (!loadedFromLocal) {
          setEditMode(true);
        }
      })
      .finally(() => setLoading(false));
  }, [user]);

  const handleProfileUpdate = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!formName.trim() || !formAge) return;
    await fetch('/api/profile', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ id: user.id, name: formName, age: Number(formAge) })
    });
    const updatedProfile = { name: formName, age: formAge };
    setProfile(updatedProfile);
    setEditMode(false);
    setSuccess('Profile updated!');
    localStorage.setItem(`profile_${user.id}`, JSON.stringify(updatedProfile));
  };

  if (!user) return <div className="pt-24 text-center text-xl">Sign in to view your profile.</div>;
  if (loading) return <div className="pt-24 flex justify-center items-center min-h-screen"><LoadingSpinner size="lg" /></div>;

  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <div className="max-w-xl mx-auto px-4 py-10 pt-24">
        <h2 className="text-3xl font-bold mb-6">Profile</h2>
        {editMode || !profile?.name || !profile?.age ? (
          <form onSubmit={handleProfileUpdate} className="space-y-6 bg-white/90 p-8 rounded-lg shadow-lg border border-border max-w-md mx-auto">
            <div>
              <label className="block mb-2 font-semibold text-gray-700">Name</label>
              <input ref={nameInputRef} type="text" className="input w-full px-3 py-2 border rounded focus:outline-none focus:ring-2 focus:ring-primary bg-white text-gray-900 placeholder-gray-400" value={formName} onChange={e => setFormName(e.target.value)} required />
            </div>
            <div>
              <label className="block mb-2 font-semibold text-gray-700">Age</label>
              <input type="number" className="input w-full px-3 py-2 border rounded focus:outline-none focus:ring-2 focus:ring-primary bg-white text-gray-900 placeholder-gray-400" value={formAge} onChange={e => setFormAge(e.target.value)} required min={1} />
            </div>
            <button type="submit" className="bg-primary text-white px-6 py-2 rounded hover:bg-primary/90 transition w-full font-semibold">Save</button>
          </form>
        ) : (
          <>
            <div className="mb-4 text-lg">Name: {profile?.name}</div>
            <div className="mb-4 text-lg">Age: {profile?.age}</div>
            <div className="mb-4 text-lg">Email: {user.email}</div>
            <button className="mb-4 bg-muted px-3 py-1 rounded text-primary border border-primary hover:bg-primary hover:text-white transition" onClick={() => setEditMode(true)}>Edit Profile</button>
            {success && <div className="text-green-600 font-medium mb-2">{success}</div>}
            <div className="mt-8 p-4 rounded-lg bg-muted">
              <h3 className="text-xl font-semibold mb-2">Subscription</h3>
              <div className="mb-2 text-muted-foreground">No subscriptions for now</div>
              <button className="bg-primary text-white px-4 py-2 rounded opacity-60 cursor-not-allowed" disabled>No subscriptions for now</button>
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default Profile; 