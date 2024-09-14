import { createClient } from "@supabase/supabase-js";

const supabaseUrl = process.env.SUPABASE_URL;
const supabaseKey = process.env.SUPABASE_KEY;

// console.log("Supabase URL:", supabaseUrl);
// console.log("Supabase Key:", supabaseKey ? "Present" : "Not present");

if (!supabaseUrl || !supabaseKey) {
  throw new Error("Supabase URL and Key are required");
}

export const supabase = createClient(supabaseUrl, supabaseKey);
