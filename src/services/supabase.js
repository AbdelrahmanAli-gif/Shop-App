import { createClient } from '@supabase/supabase-js';
const supabaseUrl = 'https://fkeombrfvmalajjmgaus.supabase.co';
const supabaseKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImZrZW9tYnJmdm1hbGFqam1nYXVzIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MzYxMDI3MjgsImV4cCI6MjA1MTY3ODcyOH0.3hapbfr5qwCftBpqCWtd3hqHQx8uqY5cTNdoa8PiOI4';
const supabase = createClient(supabaseUrl, supabaseKey);

export default supabase;