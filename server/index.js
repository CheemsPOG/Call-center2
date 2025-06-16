require("dotenv").config();
const express = require("express");
const cors = require("cors");
const { createClient } = require("@supabase/supabase-js");

const app = express();
const port = process.env.PORT || 4000;

app.use(cors());
app.use(express.json());

// Initialize Supabase client
const supabase = createClient(
  process.env.SUPABASE_URL,
  process.env.SUPABASE_ANON_KEY
);

app.get("/", (req, res) => {
  res.json({ message: "Backend is running!" });
});

app.get("/employees", async (req, res) => {
  const { data, error } = await supabase
    .from("employees")
    .select("*")
    .order("id");
  if (error) return res.status(500).json({ error: error.message });
  res.json(data);
});

app.post("/employees", async (req, res) => {
  const { name, email, role, department, status, phone, location, join_date } =
    req.body;
  if (
    !name ||
    !email ||
    !role ||
    !department ||
    !status ||
    !phone ||
    !location ||
    !join_date
  ) {
    return res.status(400).json({ error: "Missing required fields" });
  }
  const { data, error } = await supabase
    .from("employees")
    .insert([
      {
        name,
        email,
        role,
        department,
        status,
        phone,
        location,
        join_date,
        calls_today: 0,
        total_calls: 0,
        rating: 0,
      },
    ])
    .select()
    .single();
  if (error) return res.status(500).json({ error: error.message });
  res.json(data);
});

app.put("/employees/:id", async (req, res) => {
  const { id } = req.params;
  const { name, email, role, department, status, phone, location, join_date } =
    req.body;
  if (
    !name ||
    !email ||
    !role ||
    !department ||
    !status ||
    !phone ||
    !location ||
    !join_date
  ) {
    return res.status(400).json({ error: "Missing required fields" });
  }
  const { data, error } = await supabase
    .from("employees")
    .update({
      name,
      email,
      role,
      department,
      status,
      phone,
      location,
      join_date,
    })
    .eq("id", id)
    .select()
    .single();
  if (error) return res.status(500).json({ error: error.message });
  res.json(data);
});

app.delete("/employees/:id", async (req, res) => {
  const { id } = req.params;
  const { error } = await supabase.from("employees").delete().eq("id", id);
  if (error) return res.status(500).json({ error: error.message });
  res.json({ message: "Employee deleted successfully." });
});

app.listen(port, () => {
  console.log(`Server listening on port ${port}`);
});
