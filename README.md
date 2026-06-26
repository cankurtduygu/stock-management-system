<div align="center">

# 📦 Smart Stock System

### A modern, full-featured inventory management application

[![Live Demo](https://img.shields.io/badge/🚀_Live_Demo-smart--stock--system.vercel.app-6366f1?style=for-the-badge)](https://smart-stock-system.vercel.app/)
[![React](https://img.shields.io/badge/React-19-61DAFB?style=for-the-badge&logo=react&logoColor=black)](https://react.dev/)
[![Redux Toolkit](https://img.shields.io/badge/Redux_Toolkit-2.x-764ABC?style=for-the-badge&logo=redux)](https://redux-toolkit.js.org/)
[![TailwindCSS](https://img.shields.io/badge/Tailwind_CSS-v4-06B6D4?style=for-the-badge&logo=tailwindcss&logoColor=white)](https://tailwindcss.com/)
[![Vite](https://img.shields.io/badge/Vite-7-646CFF?style=for-the-badge&logo=vite&logoColor=white)](https://vite.dev/)
[![License: MIT](https://img.shields.io/badge/License-MIT-22c55e?style=for-the-badge)](LICENSE)

</div>

---

## ✨ Overview

**Smart Stock System** is a production-ready stock management application that lets businesses track their entire inventory lifecycle — from firm and brand onboarding to product management, purchases, and sales — all in one clean dashboard.

Built with the latest React ecosystem tooling (React 19, Vite 7, shadcn/ui, Tailwind v4), it combines a polished UI with solid state management via Redux Toolkit and data persistence through redux-persist.

---

## 🖥️ Live Demo

> 🔗 **[https://smart-stock-system.vercel.app/](https://smart-stock-system.vercel.app/)**

---

## 🚀 Features

| Feature | Description |
|---|---|
| 🔐 **Authentication** | Secure sign-up & sign-in with JWT tokens; protected & public-only route guards |
| 🏭 **Firms** | Add, edit, delete supplier firms; drill into each firm's detail page |
| 🏷️ **Brands** | Full CRUD for product brands with card-based UI |
| 📦 **Products** | Manage products with category and brand associations |
| 🛒 **Purchases** | Log inbound stock purchases; track per-firm activity |
| 💰 **Sales** | Record sales transactions with real-time stock deduction |
| 📊 **Dashboard** | KPI summary cards + interactive area charts powered by Recharts |
| 🌗 **Theme** | Light / Dark / System theme with Redux-persisted preference |
| 💾 **State Persistence** | Auth session and theme survive page refreshes via redux-persist |
| 📱 **Responsive** | Mobile-first layout with collapsible sidebar |

---

## 🛠️ Tech Stack

### Core
- **[React 19](https://react.dev/)** — UI library with the new React Compiler
- **[Vite 7](https://vite.dev/)** — Lightning-fast dev server and build tool
- **[React Router v7](https://reactrouter.com/)** — Client-side routing with nested layouts

### State Management
- **[Redux Toolkit](https://redux-toolkit.js.org/)** — Predictable global state
- **[redux-persist](https://github.com/rt2zz/redux-persist)** — Persists `auth` and `theme` slices to localStorage

### UI & Styling
- **[Tailwind CSS v4](https://tailwindcss.com/)** — Utility-first styling
- **[shadcn/ui](https://ui.shadcn.com/)** (New York style) — Accessible, composable component primitives
- **[Lucide React](https://lucide.dev/)** — Icon library
- **[Recharts](https://recharts.org/)** — Composable chart library for the dashboard
- **[Sonner](https://sonner.emilkowal.ski/)** — Beautiful toast notifications

### Forms & Validation
- **[React Hook Form](https://react-hook-form.com/)** — Performant, flexible forms
- **[Zod](https://zod.dev/)** — Schema-first validation

### Networking
- **[Axios](https://axios-http.com/)** — HTTP client with custom instances (token-aware & public)

---

## 📁 Project Structure

```
src/
├── components/
│   ├── shared/
│   │   ├── sidebar/          # App sidebar, header, nav items, team switcher
│   │   ├── table/            # Reusable data-table with column headers
│   │   ├── AlertDial.jsx     # Confirm-before-delete alert dialog
│   │   ├── BreadCrumb.jsx
│   │   ├── DashboardLayout.jsx
│   │   ├── InfoCards.jsx     # Reusable stat cards
│   │   └── Skeletons.jsx     # Loading skeleton placeholders
│   ├── ui/                   # shadcn/ui primitives (button, card, dialog, etc.)
│   ├── BrandCard.jsx / BrandModal.jsx
│   ├── FirmCard.jsx  / FirmModal.jsx
│   ├── ProductModal.jsx
│   ├── PurchaseModal.jsx
│   ├── SaleModal.jsx
│   ├── DashboardHomeAreaChart.jsx
│   ├── DashboardHomeCards.jsx
│   ├── SignInForm.jsx
│   └── SignUpForm.jsx
│
├── features/
│   ├── authSlice.js          # currentUser + token state
│   ├── stockSlice.js         # firms, brands, products, sales, purchases
│   └── themeSlice.js         # light / dark / system
│
├── hooks/
│   ├── useAuthCall.js        # signIn, signUp, signOut
│   ├── useAxios.js           # Axios instances (with/without token)
│   ├── useStockCall.js       # CRUD for all stock resources
│   ├── useTheme.js           # Syncs Redux theme to <html> class
│   └── use-mobile.js         # Responsive breakpoint hook
│
├── lib/
│   ├── schemas.js            # Zod validation schemas
│   ├── Table-columns.jsx     # TanStack Table column definitions
│   └── utils.js              # cn() and shared utilities
│
├── pages/
│   ├── Home.jsx              # Public landing page
│   ├── SignIn.jsx / SignUp.jsx
│   ├── DashboardHome.jsx     # KPI cards + charts
│   ├── Firms.jsx / FirmDetail.jsx
│   ├── Brands.jsx
│   ├── Products.jsx
│   ├── Purchases.jsx
│   ├── Sales.jsx
│   └── Error.jsx
│
├── state/
│   └── store.js              # Redux store with redux-persist config
│
├── App.jsx                   # Router definition + Provider setup
└── main.jsx                  # React DOM root
```

---

## 🔀 Route Map

| Path | Page | Access |
|---|---|---|
| `/` | Landing / Home | Public |
| `/sign-in` | Sign In | Public only* |
| `/sign-up` | Sign Up | Public only* |
| `/stock` | Dashboard | 🔒 Protected |
| `/stock/brands` | Brands | 🔒 Protected |
| `/stock/firms` | Firms | 🔒 Protected |
| `/stock/firms/:id` | Firm Detail | 🔒 Protected |
| `/stock/products` | Products | 🔒 Protected |
| `/stock/purchases` | Purchases | 🔒 Protected |
| `/stock/sales` | Sales | 🔒 Protected |

> \* Authenticated users are redirected to `/stock` if they try to visit sign-in or sign-up.

---

## ⚙️ Getting Started

### Prerequisites

- [Node.js](https://nodejs.org/) ≥ 18
- [pnpm](https://pnpm.io/) ≥ 9 (recommended) — or npm / yarn

### 1. Clone the repository

```bash
git clone https://github.com/your-username/stock-management-system.git
cd stock-management-system
```

### 2. Install dependencies

```bash
pnpm install
```

### 3. Configure environment variables

Create a `.env` file in the project root:

```env
VITE_BASE_URL=https://your-backend-api.com/
VITE_NODE_ENV=development
```

| Variable | Description |
|---|---|
| `VITE_BASE_URL` | Base URL for the REST API backend |
| `VITE_NODE_ENV` | `production` disables Redux DevTools |

### 4. Start the development server

```bash
pnpm dev
```

Open [http://localhost:5173](http://localhost:5173) in your browser.

### 5. Build for production

```bash
pnpm build
pnpm preview   # preview the production build locally
```

---

## 🏗️ State Architecture

```
Redux Store (persisted to localStorage)
├── auth   ✅ persisted    { currentUser, token }
├── theme  ✅ persisted    { theme: "light" | "dark" | "system" }
└── stock  ❌ not persisted
           { firms, brands, categories, products, sales, purchases,
             statusByResource, loading, error }
```

Each resource in `stockSlice` has an independent loading status (`idle | loading | succeeded | failed`), enabling fine-grained skeleton UI rendering per section.

---

## 🌐 Deployment

The app is deployed on **Vercel** with a SPA rewrite rule so all routes correctly fall back to `index.html`:

```json
{
  "rewrites": [
    { "source": "/(.*)", "destination": "/" }
  ]
}
```

To deploy your own instance:

```bash
# Install Vercel CLI
pnpm add -g vercel

# Deploy
vercel --prod
```

Set `VITE_BASE_URL` in your Vercel project's environment variables.

---

## 🤝 Contributing

Contributions, issues, and feature requests are welcome!

1. Fork the repository
2. Create a feature branch: `git checkout -b feat/your-feature`
3. Commit your changes: `git commit -m "feat: add your feature"`
4. Push to your branch: `git push origin feat/your-feature`
5. Open a Pull Request

---

## 📄 License

This project is licensed under the **MIT License** — see the [LICENSE](LICENSE) file for details.

---

<div align="center">

Made with ❤️ and a lot of ☕

⭐ **Star this repo if you find it useful!**

</div>
