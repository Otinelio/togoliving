CREATE TABLE IF NOT EXISTS reviews (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  room_id TEXT NOT NULL,
  guest_name TEXT,
  rating INTEGER NOT NULL CHECK (rating >= 1 AND rating <= 5),
  comment TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now())
);

ALTER TABLE reviews ENABLE ROW LEVEL SECURITY;

-- Allow anyone to read reviews
CREATE POLICY "Public can read reviews" ON reviews
  FOR SELECT USING (true);

-- Allow anyone to insert a review
CREATE POLICY "Public can insert reviews" ON reviews
  FOR INSERT WITH CHECK (true);

-- Allow deletion (for the admin panel, if it uses the same anon key, we'll allow it)
CREATE POLICY "Public can delete reviews" ON reviews
  FOR DELETE USING (true);
