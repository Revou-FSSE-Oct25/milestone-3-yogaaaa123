# 🛒 Hello Shop - E-Commerce Next.js 16

Aplikasi e-commerce modern menggunakan **Next.js 16.1.6** dengan **React 19**, **TypeScript**, dan **Tailwind CSS v4**.

---

## 📋 Daftar Isi

- [Tech Stack](#-tech-stack)
- [Fitur Utama](#-fitur-utama)
- [Arsitektur](#-arsitektur)
- [Struktur Folder](#-struktur-folder)
- [API Routes](#-api-routes)
- [State Management](#-state-management)
- [Custom Hooks](#-custom-hooks)
- [Middleware & Security](#-middleware--security)
- [Testing](#-testing)
- [Instalasi & Menjalankan](#-instalasi--menjalankan)

---

## 🛠 Tech Stack

| Teknologi        | Versi   | Keterangan                        |
| :--------------- | :------ | :-------------------------------- |
| **Next.js**      | 16.1.6  | Framework React dengan App Router |
| **React**        | 19.2.3  | Library UI                        |
| **TypeScript**   | 5.x     | Type Safety                       |
| **Tailwind CSS** | 4.x     | Utility-first CSS                 |
| **Bun**          | Latest  | Package Manager & Runtime         |
| **Jest**         | 30.x    | Testing Framework                 |
| **Lucide React** | 0.563.0 | Icon Library                      |

---

## ✨ Fitur Utama

### 🏠 Homepage (Hybrid SSR + CSR)

- **Server-Side Rendering (SSR)**: Data produk di-fetch di server untuk SEO & performa
- **Client-Side Caching**: LocalStorage caching 3 menit untuk navigasi instant
- **Live Search**: Pencarian real-time dengan debounce 500ms
- **Banner Carousel**: Auto-slide setiap 3 detik

### 🔐 Autentikasi

- Login via Platzi Fake Store API
- Session management dengan HTTP-only cookies
- Role-based access control (Admin/User)
- Protected routes dengan middleware

### 🛒 Shopping Cart

- Persistent cart (localStorage)
- Add/Remove items
- Quantity management
- Total calculation

### 📱 Responsif

- Mobile-first design
- Hamburger menu untuk mobile
- Adaptive grid layout

---

## 🏗 Arsitektur

```
┌─────────────────────────────────────────────────────────┐
│                       BROWSER                            │
├─────────────────────────────────────────────────────────┤
│  ┌─────────────┐  ┌─────────────┐  ┌─────────────┐     │
│  │   Navbar    │  │  Products   │  │    Cart     │     │
│  │  (Search)   │  │   Client    │  │   Context   │     │
│  └──────┬──────┘  └──────┬──────┘  └──────┬──────┘     │
│         │                │                │             │
│         └────────────────┼────────────────┘             │
│                          ▼                              │
│              ┌───────────────────────┐                  │
│              │    LocalStorage       │                  │
│              │  (Cart + Product Cache)│                  │
│              └───────────────────────┘                  │
└─────────────────────────────────────────────────────────┘
                          │
                          ▼
┌─────────────────────────────────────────────────────────┐
│                    NEXT.JS SERVER                        │
├─────────────────────────────────────────────────────────┤
│  ┌─────────────┐  ┌─────────────┐  ┌─────────────┐     │
│  │  Middleware │  │ API Routes  │  │   Server    │     │
│  │ (Auth Check)│  │ (Auth/CRUD) │  │ Components  │     │
│  └─────────────┘  └─────────────┘  └─────────────┘     │
└─────────────────────────────────────────────────────────┘
                          │
                          ▼
┌─────────────────────────────────────────────────────────┐
│               EXTERNAL API (Platzi)                      │
│          https://api.escuelajs.co/api/v1                │
└─────────────────────────────────────────────────────────┘
```

---

## 📁 Struktur Folder

```
toko-online/
├── public/                      # Static assets
│   ├── resize.1.png            # Banner image 1
│   ├── resize.2.png            # Banner image 2
│   ├── resize.3.png            # Banner image 3
│   ├── footer.png              # Footer background
│   ├── dot-pending.svg         # Menu icon
│   └── mp4/                    # Video assets (loader)
│
├── src/
│   ├── app/                    # Next.js App Router
│   │   ├── layout.tsx          # Root layout (providers, navbar, footer)
│   │   ├── page.tsx            # Homepage (SSR fetch)
│   │   ├── globals.css         # Global styles + Tailwind
│   │   ├── icon.png            # Favicon
│   │   │
│   │   ├── about/              # Halaman Tentang
│   │   │   └── page.tsx
│   │   │
│   │   ├── admin/              # Dashboard Admin (Protected)
│   │   │   └── page.tsx
│   │   │
│   │   ├── cart/               # Halaman Keranjang
│   │   │   └── page.tsx
│   │   │
│   │   ├── checkout/           # Halaman Checkout (Protected)
│   │   │   └── page.tsx
│   │   │
│   │   ├── faq/                # Halaman FAQ
│   │   │   └── page.tsx
│   │   │
│   │   ├── login/              # Halaman Login
│   │   │   └── page.tsx
│   │   │
│   │   ├── product/            # Detail Produk
│   │   │   └── [id]/
│   │   │       └── page.tsx    # Dynamic route
│   │   │
│   │   ├── products/           # List Produk
│   │   │   └── page.tsx
│   │   │
│   │   └── api/                # API Routes
│   │       ├── auth/
│   │       │   ├── login/      # POST: Login
│   │       │   ├── logout/     # POST: Logout
│   │       │   └── me/         # GET: Current user
│   │       │
│   │       └── products/
│   │           ├── route.ts    # GET: All products
│   │           └── [id]/
│   │               └── route.ts # GET: Single product
│   │
│   ├── components/             # React Components
│   │   ├── layout/
│   │   │   ├── Navbar.tsx      # Navigation bar + Live search
│   │   │   └── Footer.tsx      # Footer
│   │   │
│   │   ├── ProductsClient.tsx  # Homepage client (caching + filter)
│   │   ├── ProductCard.tsx     # Card produk
│   │   ├── ProductActionCard.tsx # Detail produk actions
│   │   ├── ProductImageGallery.tsx # Gallery gambar produk
│   │   ├── BannerCarousel.tsx  # Carousel banner
│   │   ├── AddToCartButton.tsx # Tombol add to cart
│   │   └── Loader.tsx          # Loading animation
│   │
│   ├── context/                # React Context (State Management)
│   │   ├── AuthContext.tsx     # Authentication state
│   │   └── CartContext.tsx     # Shopping cart state
│   │
│   ├── hooks/                  # Custom React Hooks
│   │   ├── index.ts            # Export barrel
│   │   ├── useDebounce.ts      # Debounce value
│   │   └── useLocalStorage.ts  # Sync state with localStorage
│   │
│   ├── types/                  # TypeScript Type Definitions
│   │   └── index.ts            # Product, CartItem interfaces
│   │
│   └── middleware.ts           # Route protection middleware
│
├── test/                       # Unit Tests
│   ├── CartContext.test.tsx    # Cart context tests
│   └── ProductCard.test.tsx    # ProductCard tests
│
├── package.json                # Dependencies & scripts
├── tsconfig.json               # TypeScript config
├── next.config.ts              # Next.js config
├── jest.config.js              # Jest config
├── jest.setup.js               # Jest setup
├── postcss.config.mjs          # PostCSS config
└── eslint.config.mjs           # ESLint config
```

---

## 🔌 API Routes

### `/api/auth/login` (POST)

Login dengan Platzi API dan set cookies.

**Request:**

```json
{
  "email": "john@mail.com",
  "password": "changeme"
}
```

**Response:**

```json
{
  "user": {
    "id": 1,
    "email": "john@mail.com",
    "name": "John",
    "role": "admin",
    "avatar": "https://..."
  }
}
```

**Cookies Set:**

- `auth-token`: Access token
- `user-role`: User role (admin/customer)

---

### `/api/auth/logout` (POST)

Clear auth cookies.

---

### `/api/auth/me` (GET)

Get current authenticated user from cookies.

**Response:**

```json
{
  "isAuthenticated": true,
  "user": { ... }
}
```

---

### `/api/products` (GET)

Get all products from Platzi API.

**Query Params:**

- `limit`: Number of products (default: 20)
- `offset`: Pagination offset

---

### `/api/products/[id]` (GET)

Get single product by ID.

---

## 🧠 State Management

### AuthContext (`src/context/AuthContext.tsx`)

Mengelola state autentikasi user.

```typescript
interface AuthContextType {
  user: User | null; // Current user data
  isAuthenticated: boolean; // Login status
  isLoading: boolean; // Auth check loading
  login: (email, password) => Promise<Result>;
  logout: () => Promise<void>;
}
```

**Fitur:**

- Auto-check auth on mount via `/api/auth/me`
- Login via Platzi API
- Logout dengan clear cookies
- Role-based access (admin/customer)

**Penggunaan:**

```tsx
const { user, isAuthenticated, login, logout } = useAuth();
```

---

### CartContext (`src/context/CartContext.tsx`)

Mengelola shopping cart dengan localStorage persistence.

```typescript
interface CartContextType {
  items: CartItem[]; // Cart items
  addToCart: (product) => void;
  removeFromCart: (productId) => void;
  clearCart: () => void;
  totalItems: number; // Total quantity
  totalPrice: number; // Total price
}
```

**Fitur:**

- Persistent cart (survives page refresh)
- Add item (increment jika sudah ada)
- Remove item (decrement, hapus jika 0)
- Clear all items
- Auto-sync dengan localStorage

**Penggunaan:**

```tsx
const { items, addToCart, removeFromCart, totalItems, totalPrice } = useCart();
```

---

## 🪝 Custom Hooks

### `useDebounce<T>(value, delay)`

Delay value update untuk optimasi performa.

```typescript
const debouncedSearch = useDebounce(searchQuery, 500);
// debouncedSearch baru update setelah 500ms tidak ada perubahan
```

**Use Case:** Live search, input validation

---

### `useLocalStorage<T>(key, initialValue)`

Sync React state dengan localStorage.

```typescript
const [theme, setTheme] = useLocalStorage("theme", "dark");
// Otomatis tersimpan dan terbaca dari localStorage
```

**Use Case:** User preferences, form drafts

---

## 🔒 Middleware & Security

### Route Protection (`src/middleware.ts`)

```typescript
const protectedRoutes = ["/checkout", "/admin"];
```

**Flow:**

1. User akses protected route
2. Middleware cek `auth-token` cookie
3. Jika tidak ada → Redirect ke `/login?returnUrl=...`
4. Jika ada tapi bukan admin (untuk `/admin`) → Redirect ke `/`
5. Jika valid → Continue

**Matcher:**

```typescript
matcher: ["/checkout/:path*", "/admin/:path*"];
```

---

## 🧪 Testing

### Menjalankan Tests

```bash
# Run all tests
npm test

# Run with coverage
npm run test:coverage

# Watch mode
npm test -- --watch
```

### Test Files

| File                   | Deskripsi                                   |
| :--------------------- | :------------------------------------------ |
| `CartContext.test.tsx` | Test add/remove item, quantity, persistence |
| `ProductCard.test.tsx` | Test render, click handlers, props          |

---

## 🚀 Instalasi & Menjalankan

### Prerequisites

- Node.js 18+ atau Bun
- npm, yarn, pnpm, atau bun

### Langkah Instalasi

```bash
# Clone repository
git clone <repo-url>
cd toko-online

# Install dependencies
bun install
# atau
npm install

# Jalankan development server
bun dev
# atau
npm run dev
```

### Scripts

| Script                  | Deskripsi                           |
| :---------------------- | :---------------------------------- |
| `npm run dev`           | Development server (localhost:3000) |
| `npm run build`         | Production build                    |
| `npm run start`         | Start production server             |
| `npm run lint`          | Run ESLint                          |
| `npm test`              | Run Jest tests                      |
| `npm run test:coverage` | Test with coverage report           |

---

## 📝 Demo Credentials

| Role      | Email            | Password   |
| :-------- | :--------------- | :--------- |
| **Admin** | `john@mail.com`  | `changeme` |
| **User**  | `maria@mail.com` | `12345`    |

> ⚠️ Credentials dari Platzi Fake Store API

---

## 📄 License

MIT License

---

_Dibuat dengan ❤️ menggunakan Next.js 16_
