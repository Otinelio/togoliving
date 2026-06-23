import { createClient } from '@supabase/supabase-js';
import { DEFAULT_JOBS } from '../src/data/defaultJobs.js';
import { DEFAULT_EVENTS } from '../src/data/defaultEvents.js';

const supabaseUrl = "https://utfkuniyorywtvhjdivj.supabase.co";
const supabaseAnonKey = "sb_publishable_axjzCD6xxgLo2Eh-DVNMwQ_5ZcxK01p";

const supabase = createClient(supabaseUrl, supabaseAnonKey);

async function seed() {
  console.log('Seeding jobs...');
  for (const job of DEFAULT_JOBS) {
    const { id, ...jobData } = job;
    const { error } = await supabase.from('jobs').insert(jobData);
    if (error) console.error('Error seeding job', job.title, error);
    else console.log('Seeded job:', job.title);
  }

  console.log('Seeding events...');
  for (const event of DEFAULT_EVENTS) {
    const { id, ...eventData } = event;
    const { error } = await supabase.from('events').insert(eventData);
    if (error) console.error('Error seeding event', event.title, error);
    else console.log('Seeded event:', event.title);
  }

  console.log('Seeding complete!');
}

seed().catch(console.error);
