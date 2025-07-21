-- Drop existing e-commerce tables that don't fit streaming platform
DROP TABLE IF EXISTS cart CASCADE;
DROP TABLE IF EXISTS orders CASCADE;
DROP TABLE IF EXISTS categories CASCADE;
DROP TABLE IF EXISTS products CASCADE;

-- Create streaming platform tables
CREATE TABLE public.content_categories (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  name TEXT NOT NULL,
  slug TEXT NOT NULL UNIQUE,
  description TEXT,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Create content table for movies, shows, sports, etc.
CREATE TABLE public.content (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  title TEXT NOT NULL,
  description TEXT,
  type TEXT NOT NULL CHECK (type IN ('movie', 'series', 'live', 'sports')),
  category_id UUID REFERENCES public.content_categories(id),
  poster_url TEXT,
  backdrop_url TEXT,
  trailer_url TEXT,
  video_url TEXT,
  duration INTEGER, -- in minutes
  release_date DATE,
  rating DECIMAL(2,1) DEFAULT 0,
  language TEXT DEFAULT 'English',
  subtitles TEXT[], -- array of available subtitle languages
  audio_tracks TEXT[], -- array of available audio languages
  age_rating TEXT DEFAULT 'U', -- U, UA, A
  is_premium BOOLEAN DEFAULT false,
  is_trending BOOLEAN DEFAULT false,
  view_count INTEGER DEFAULT 0,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Create user profiles table (multiple profiles per user)
CREATE TABLE public.user_profiles (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id UUID NOT NULL,
  name TEXT NOT NULL,
  avatar_url TEXT,
  is_kid BOOLEAN DEFAULT false,
  language_preference TEXT DEFAULT 'English',
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  CONSTRAINT max_profiles_per_user CHECK ((SELECT COUNT(*) FROM public.user_profiles WHERE user_id = user_profiles.user_id) <= 7)
);

-- Create watchlist table
CREATE TABLE public.watchlist (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  profile_id UUID REFERENCES public.user_profiles(id) ON DELETE CASCADE,
  content_id UUID REFERENCES public.content(id) ON DELETE CASCADE,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  UNIQUE(profile_id, content_id)
);

-- Create watch history table
CREATE TABLE public.watch_history (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  profile_id UUID REFERENCES public.user_profiles(id) ON DELETE CASCADE,
  content_id UUID REFERENCES public.content(id) ON DELETE CASCADE,
  watch_time INTEGER DEFAULT 0, -- seconds watched
  total_duration INTEGER, -- total content duration in seconds
  last_watched TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  completed BOOLEAN DEFAULT false,
  UNIQUE(profile_id, content_id)
);

-- Create live channels table
CREATE TABLE public.live_channels (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  name TEXT NOT NULL,
  logo_url TEXT,
  stream_url TEXT,
  category TEXT, -- sports, news, entertainment, etc.
  is_active BOOLEAN DEFAULT true,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Create subscription plans table
CREATE TABLE public.subscription_plans (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  name TEXT NOT NULL,
  price DECIMAL(10,2) NOT NULL,
  duration_months INTEGER NOT NULL,
  features TEXT[],
  is_active BOOLEAN DEFAULT true,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Create user subscriptions table
CREATE TABLE public.user_subscriptions (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id UUID NOT NULL,
  plan_id UUID REFERENCES public.subscription_plans(id),
  start_date TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  end_date TIMESTAMP WITH TIME ZONE NOT NULL,
  is_active BOOLEAN DEFAULT true,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Enable RLS on all tables
ALTER TABLE public.content_categories ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.content ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.user_profiles ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.watchlist ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.watch_history ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.live_channels ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.subscription_plans ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.user_subscriptions ENABLE ROW LEVEL SECURITY;

-- RLS Policies
-- Content categories and content are public
CREATE POLICY "Categories are viewable by everyone" ON public.content_categories FOR SELECT USING (true);
CREATE POLICY "Content is viewable by everyone" ON public.content FOR SELECT USING (true);
CREATE POLICY "Live channels are viewable by everyone" ON public.live_channels FOR SELECT USING (true);
CREATE POLICY "Subscription plans are viewable by everyone" ON public.subscription_plans FOR SELECT USING (true);

-- User profiles policies
CREATE POLICY "Users can view their own profiles" ON public.user_profiles FOR SELECT USING (auth.uid()::text = user_id::text);
CREATE POLICY "Users can create their own profiles" ON public.user_profiles FOR INSERT WITH CHECK (auth.uid()::text = user_id::text);
CREATE POLICY "Users can update their own profiles" ON public.user_profiles FOR UPDATE USING (auth.uid()::text = user_id::text);
CREATE POLICY "Users can delete their own profiles" ON public.user_profiles FOR DELETE USING (auth.uid()::text = user_id::text);

-- Watchlist policies
CREATE POLICY "Users can view their profiles' watchlist" ON public.watchlist FOR SELECT USING (
  EXISTS (SELECT 1 FROM public.user_profiles WHERE user_profiles.id = watchlist.profile_id AND user_profiles.user_id::text = auth.uid()::text)
);
CREATE POLICY "Users can manage their profiles' watchlist" ON public.watchlist FOR INSERT WITH CHECK (
  EXISTS (SELECT 1 FROM public.user_profiles WHERE user_profiles.id = watchlist.profile_id AND user_profiles.user_id::text = auth.uid()::text)
);
CREATE POLICY "Users can delete from their profiles' watchlist" ON public.watchlist FOR DELETE USING (
  EXISTS (SELECT 1 FROM public.user_profiles WHERE user_profiles.id = watchlist.profile_id AND user_profiles.user_id::text = auth.uid()::text)
);

-- Watch history policies
CREATE POLICY "Users can view their profiles' watch history" ON public.watch_history FOR SELECT USING (
  EXISTS (SELECT 1 FROM public.user_profiles WHERE user_profiles.id = watch_history.profile_id AND user_profiles.user_id::text = auth.uid()::text)
);
CREATE POLICY "Users can create watch history for their profiles" ON public.watch_history FOR INSERT WITH CHECK (
  EXISTS (SELECT 1 FROM public.user_profiles WHERE user_profiles.id = watch_history.profile_id AND user_profiles.user_id::text = auth.uid()::text)
);
CREATE POLICY "Users can update their profiles' watch history" ON public.watch_history FOR UPDATE USING (
  EXISTS (SELECT 1 FROM public.user_profiles WHERE user_profiles.id = watch_history.profile_id AND user_profiles.user_id::text = auth.uid()::text)
);

-- User subscriptions policies
CREATE POLICY "Users can view their own subscriptions" ON public.user_subscriptions FOR SELECT USING (auth.uid()::text = user_id::text);
CREATE POLICY "Users can create their own subscriptions" ON public.user_subscriptions FOR INSERT WITH CHECK (auth.uid()::text = user_id::text);

-- Create trigger for updated_at
CREATE OR REPLACE FUNCTION public.update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = now();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER update_content_categories_updated_at BEFORE UPDATE ON public.content_categories FOR EACH ROW EXECUTE FUNCTION public.update_updated_at_column();
CREATE TRIGGER update_content_updated_at BEFORE UPDATE ON public.content FOR EACH ROW EXECUTE FUNCTION public.update_updated_at_column();
CREATE TRIGGER update_user_profiles_updated_at BEFORE UPDATE ON public.user_profiles FOR EACH ROW EXECUTE FUNCTION public.update_updated_at_column();