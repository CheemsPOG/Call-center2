const supabase = require("../db/supabaseClient");

exports.getAllEmployees = async (req, res) => {
  const { data, error } = await supabase
    .from("employees")
    .select("*")
    .order("id");
  if (error) return res.status(500).json({ error: error.message });
  res.json(data);
};

exports.createEmployee = async (req, res) => {
  const { name, email, role, department, status, phone, location, join_date } = req.body;
  if (!name || !email || !role || !department || !status || !phone || !location || !join_date) {
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
};

exports.updateEmployee = async (req, res) => {
  const { id } = req.params;
  const { name, email, role, department, status, phone, location, join_date } = req.body;
  if (!name || !email || !role || !department || !status || !phone || !location || !join_date) {
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
};

exports.deleteEmployee = async (req, res) => {
  const { id } = req.params;
  const { error } = await supabase.from("employees").delete().eq("id", id);
  if (error) return res.status(500).json({ error: error.message });
  res.json({ message: "Employee deleted successfully." });
};
