// Database Seed Script
// Inserts initial work modes for the textile organisation
// Run manually: npx tsx src/seed.ts

import dotenv from "dotenv";
dotenv.config();

import { supabase } from "./lib/supabase.js";

// Eight work modes for textile production stages
// Each has a name and monthly salary in local currency
const workModes = [
  { name: "Cutting", monthly_salary: 15000 },
  { name: "Bottom Hem Stitching", monthly_salary: 14000 },
  { name: "Label Printing", monthly_salary: 12000 },
  { name: "Neck Stitch", monthly_salary: 13000 },
  { name: "Attach Stitch", monthly_salary: 13500 },
  { name: "Sleeve Attach", monthly_salary: 13500 },
  { name: "Ironing", monthly_salary: 11000 },
  { name: "Packing", monthly_salary: 10000 },
];

async function seed() {
  // Upsert work modes - skip if name already exists (unique constraint)
  const { error } = await supabase.from("work_modes").upsert(workModes, {
    onConflict: "name",
    ignoreDuplicates: true,
  });

  if (error) {
    console.error("Seed failed:", error.message);
    process.exit(1);
  }

  console.log("Seeded work modes successfully");
}

seed();
