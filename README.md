# Call Center Project

## Prerequisites

- Node.js (v18 or higher recommended)
- npm (comes with Node.js)

---

## Backend Setup (Express + Supabase)

1. **Install dependencies:**

   ```bash
   cd server
   npm install
   ```

2. **Environment variables:**

   - Create a `.env` file in the `server` folder.
   - Add your Supabase credentials:
     ```env
     SUPABASE_URL=your_supabase_url
     SUPABASE_ANON_KEY=your_supabase_anon_key
     ```

3. **Start the backend server:**
   ```bash
   npm run dev
   ```
   - The backend runs on [http://localhost:4000](http://localhost:4000)

---

## Frontend Setup (React + Vite)

1. **Install dependencies:**

   ```bash
   cd client
   npm install
   ```

2. **Start the frontend app:**
   ```bash
   npm run dev
   ```
   - The frontend runs on [http://localhost:5173](http://localhost:5173) by default

---

## Notes

- Make sure the backend is running before using the frontend.
- Update API URLs in the frontend if your backend runs on a different port or host.
- For Supabase setup, see the `server/db/supabaseClient.js` file.

---

## Useful Commands

- **Backend:**
  - `npm run dev` (development mode with auto-reload)
  - `npm start` (production mode)
- **Frontend:**
  - `npm run dev` (development mode)
  - `npm run build` (build for production)
