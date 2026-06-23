-- 1. Create the accommodations table
CREATE TABLE IF NOT EXISTS accommodations (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  title TEXT NOT NULL,
  subtitle TEXT,
  badge TEXT,
  "isPremium" BOOLEAN DEFAULT false,
  description TEXT,
  "imageUrl" TEXT,
  "videoUrl" TEXT,
  "posterUrl" TEXT,
  features JSONB,
  prices JSONB,
  "createdAt" TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- 2. Create the gallery table
CREATE TABLE IF NOT EXISTS gallery (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  category TEXT NOT NULL,
  "imageUrl" TEXT NOT NULL,
  "altText" TEXT,
  "createdAt" TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- 3. Create the menu_items table
CREATE TABLE IF NOT EXISTS menu_items (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  name TEXT NOT NULL,
  category TEXT NOT NULL,
  price INTEGER NOT NULL,
  description TEXT,
  "soldOut" BOOLEAN DEFAULT false,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- 4. Create rooms_status table (for individual room details and admin tracking)
CREATE TABLE IF NOT EXISTS rooms_status (
  id TEXT PRIMARY KEY,
  title TEXT,
  type TEXT NOT NULL,
  status TEXT DEFAULT 'Disponible',
  guest TEXT,
  notes TEXT,
  floor INTEGER,
  description TEXT,
  images JSONB,
  "videoUrl" TEXT,
  amenities JSONB,
  capacity TEXT,
  "price_per_night" TEXT,
  "price_per_month" TEXT,
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- 5. Create settings table
CREATE TABLE IF NOT EXISTS site_settings (
  id TEXT PRIMARY KEY DEFAULT 'default',
  "hotelName" TEXT DEFAULT 'TOGOLIVING',
  "whatsappNumber" TEXT DEFAULT '',
  "additionalNumbers" TEXT DEFAULT '',
  "domainUrl" TEXT DEFAULT '',
  "pinAdmin" TEXT DEFAULT '0000',
  "heroImageUrl" TEXT,
  "galleryHeroUrl" TEXT,
  "updatedAt" TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- 6. Storage configuration for media bucket
-- Note: the following statements create the bucket and make it public.
-- If the bucket already exists, the first query will fail safely.
INSERT INTO storage.buckets (id, name, public) VALUES ('media', 'media', true)
ON CONFLICT (id) DO NOTHING;

-- Allow public read access to the media bucket
CREATE POLICY "Public Read Access" ON storage.objects
FOR SELECT USING (bucket_id = 'media');

-- Allow anon uploads (only for migration/admin, you can restrict this later if you add authentication)
CREATE POLICY "Anon Upload Access" ON storage.objects
FOR INSERT WITH CHECK (bucket_id = 'media');

-- Allow anon update
CREATE POLICY "Anon Update Access" ON storage.objects
FOR UPDATE USING (bucket_id = 'media');

-- Allow anon delete
CREATE POLICY "Anon Delete Access" ON storage.objects
FOR DELETE USING (bucket_id = 'media');

-- 7. Create orders table
CREATE TABLE IF NOT EXISTS orders (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  "roomId" TEXT NOT NULL,
  "guestName" TEXT,
  items JSONB NOT NULL,
  "totalPrice" INTEGER NOT NULL,
  timestamp BIGINT NOT NULL,
  status TEXT DEFAULT 'En attente',
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- 8. Create reviews table
CREATE TABLE IF NOT EXISTS reviews (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  room_id TEXT NOT NULL,
  guest_name TEXT,
  rating INTEGER NOT NULL,
  comment TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);
