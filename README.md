# BingeFlix

## Getting Started

### 1. Clone the repository

```
git clone <repo-url>
cd chroma-flix-prime
```

### 2. Install dependencies

#### Frontend
```
cd chroma-flix-prime
npm install
```

#### Backend
```
cd server
npm install
```

### 3. Environment Variables

Copy `.env.example` to `.env` in both root and `server/` as needed, and fill in the values:

```
cp .env.example .env
cd server
cp ../.env.example .env
```

### 4. Running the App

#### Frontend
```
npm run dev
```

#### Backend
```
cd server
npm run dev
```

### 5. Database

- Supabase is used for authentication and data storage.
- Configure your Supabase project and update the environment variables accordingly.

---

## Project Structure

- `src/` - Frontend React app
- `server/` - Backend API (Node.js/Express)
- `supabase/` - Database migrations and config

---

## Contributing

See `CONTRIBUTING.md` for guidelines.
