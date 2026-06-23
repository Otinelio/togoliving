import { createClient } from '@supabase/supabase-js';

const supabaseUrl = "https://utfkuniyorywtvhjdivj.supabase.co";
const supabaseAnonKey = "sb_publishable_axjzCD6xxgLo2Eh-DVNMwQ_5ZcxK01p";

const supabase = createClient(supabaseUrl, supabaseAnonKey);

async function testVideoUpload() {
  // Create a 2MB dummy video file to test upload
  const size = 2 * 1024 * 1024; // 2MB
  const buffer = Buffer.alloc(size, 0);
  const fileName = `accommodations/test_video_${Date.now()}.mp4`;
  
  console.log(`Testing upload of ${(size / 1024 / 1024).toFixed(1)}MB video...`);
  
  const { data, error } = await supabase.storage.from("media").upload(fileName, buffer, {
    contentType: 'video/mp4',
    upsert: false
  });
  
  if (error) {
    console.error('Upload FAILED:', error.message);
    console.error('Full error:', JSON.stringify(error, null, 2));
  } else {
    console.log('Upload SUCCESS:', data);
    const { data: publicData } = supabase.storage.from("media").getPublicUrl(fileName);
    console.log('Public URL:', publicData.publicUrl);
    
    // Clean up test file
    await supabase.storage.from("media").remove([fileName]);
    console.log('Test file cleaned up.');
  }
  
  // Also check storage bucket config
  console.log('\n--- Checking bucket info ---');
  const { data: buckets, error: bucketsErr } = await supabase.storage.listBuckets();
  if (bucketsErr) {
    console.error('Cannot list buckets:', bucketsErr.message);
  } else {
    const mediaBucket = buckets?.find(b => b.name === 'media');
    if (mediaBucket) {
      console.log('Media bucket config:', JSON.stringify(mediaBucket, null, 2));
    } else {
      console.log('Available buckets:', buckets?.map(b => b.name));
    }
  }

  // Check RLS / MIME type restrictions
  console.log('\n--- Testing .mov upload ---');
  const movFileName = `accommodations/test_video_${Date.now()}.mov`;
  const { data: movData, error: movError } = await supabase.storage.from("media").upload(movFileName, Buffer.alloc(1024), {
    contentType: 'video/quicktime',
    upsert: false
  });
  
  if (movError) {
    console.error('.mov upload FAILED:', movError.message);
  } else {
    console.log('.mov upload SUCCESS');
    await supabase.storage.from("media").remove([movFileName]);
  }
}

testVideoUpload().catch(console.error);
