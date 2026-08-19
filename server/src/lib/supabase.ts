// Supabase Client Setup
// Initializes connection to Supabase PostgreSQL database
// Uses service role key for full access (server-side only)

import { createClient } from "@supabase/supabase-js";
import dotenv from "dotenv";
import path from "path";
import { fileURLToPath } from "url";

// Load .env file
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
dotenv.config({ path: path.resolve(__dirname, "../../.env") });

// Environment variables from .env file
const supabaseUrl = process.env.SUPABASE_URL!;
const supabaseKey = process.env.SUPABASE_SERVICE_ROLE_KEY!;

// Create and export Supabase client for database operations
export const supabase = createClient(supabaseUrl, supabaseKey);
