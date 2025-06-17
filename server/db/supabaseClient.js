const { createClient } = require("@supabase/supabase-js");
require("dotenv").config();

const supabase = createClient(
  process.env.SUPABASE_URL,
  process.env.SUPABASE_ANON_KEY
);

(async () => {
  try {
    // Health check: attempt a simple query
    const { error } = await supabase.from("employees").select("id").limit(1);
    if (error) {
      console.error("[Supabase] Connection failed:", error.message);
    } else {
      console.log("[Supabase] Connected successfully");
    }
  } catch (err) {
    console.error("[Supabase] Connection check error:", err);
  }
})();

module.exports = supabase;
