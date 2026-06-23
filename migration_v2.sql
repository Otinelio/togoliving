-- 1. Create the jobs table
CREATE TABLE IF NOT EXISTS jobs (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  title TEXT NOT NULL,
  type TEXT NOT NULL,
  department TEXT NOT NULL,
  description TEXT NOT NULL,
  status TEXT DEFAULT 'open',
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- 2. Create the applications table
CREATE TABLE IF NOT EXISTS applications (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  "jobId" TEXT NOT NULL,
  "applicantName" TEXT NOT NULL,
  "applicantEmail" TEXT NOT NULL,
  "applicantPhone" TEXT NOT NULL,
  message TEXT NOT NULL,
  "resumeUrl" TEXT,
  status TEXT DEFAULT 'new',
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- 3. Create the events table (for loisirs et detente)
CREATE TABLE IF NOT EXISTS events (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  title TEXT NOT NULL,
  date TEXT NOT NULL,
  description TEXT NOT NULL,
  img TEXT NOT NULL,
  images JSONB,
  "videoUrls" JSONB,
  status TEXT DEFAULT 'published',
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Note: The bucket 'media' already has public read/write access via Anon roles in the first migration.
-- PDFs will naturally be accepted.
