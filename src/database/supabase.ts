import { createClient } from "@supabase/supabase-js";

import { Database } from "../_models/database.types";

const url = process.env.SUPABASE_URL ?? "";
const anonKey = process.env.SUPABASE_KEY ?? "";
export const supabase = createClient<Database>(url, anonKey);
