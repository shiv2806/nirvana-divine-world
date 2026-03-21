# NirvanaDivine World — React App

Premium natural agarbatti e-commerce site. Built with React + Vite.

---

## Getting Started

```bash
# 1. Install dependencies
npm install

# 2. Start development server (http://localhost:5173)
npm run dev

# 3. Build for production
npm run build

# 4. Preview production build
npm run preview
```

---

## Project Structure

```
src/
├── data/
│   ├── products.js        ← ALL product data lives here
│   └── siteContent.js     ← Testimonials, FAQs, features, filter options
│
├── context/
│   ├── CartContext.jsx    ← Cart state (add/remove/qty) — used everywhere
│   └── RouterContext.jsx  ← Hash-based navigation between pages
│
├── hooks/
│   └── useToast.js        ← Toast notification hook
│
├── components/
│   ├── Navbar.jsx         ← Fixed top navigation bar
│   ├── Footer.jsx         ← Footer (all pages except checkout)
│   ├── CartSidebar.jsx    ← Sliding cart panel
│   ├── ProductCard.jsx    ← Card shown in grid (Home + Shop)
│   ├── ProductModal.jsx   ← Detail popup when card is clicked
│   └── Toast.jsx          ← Notification bar (bottom-left)
│
├── pages/
│   ├── HomePage.jsx       ← route: #/
│   ├── ShopPage.jsx       ← route: #/shop
│   ├── AboutPage.jsx      ← route: #/about
│   ├── ContactPage.jsx    ← route: #/contact
│   └── CheckoutPage.jsx   ← route: #/checkout
│
├── App.jsx                ← Root component — wires providers + pages
└── index.jsx              ← React DOM entry point
```

---

## Adding a New Product

Open `src/data/products.js` and add an entry to the `PRODUCTS` array:

```js
{
  id: 5,                          // next sequential number
  name: 'Your Product Name',
  cat: 'devotional',              // must match a SHOP_FILTERS value
  price: 149,
  originalPrice: null,            // number for strikethrough, null for none
  badge: 'New',                   // 'Bestseller' | 'New' | 'Premium' | 'Temple Grade' | 'Gift' | ''
  desc: 'Short card description.',
  longDesc: 'Full popup description.',
  photo: 'images/your-photo.jpg', // place image in public/images/
  photos: ['images/your-photo.jpg'],
  emoji: '🌿',                    // shown if photo is null
  bg: 'bg3',                      // bg1–bg8 (gradient fallback)
  sticks: '20 sticks',
  weight: '20g',
  burn: '~45 min/stick',
  scent: 'Scent · Profile · Here',
  rating: '4.8',
  reviews: '0 reviews',
},
```

---

## Adding a New Category Filter

1. Add to `SHOP_FILTERS` in `src/data/siteContent.js`:
   ```js
   { label: 'Floral', value: 'floral' }
   ```
2. Add products with `cat: 'floral'` in `products.js`

---

## Adding a New Page

1. Create `src/pages/YourPage.jsx`
2. Import it in `src/App.jsx` and add a case in `<PageRenderer>`
3. Add a route in `src/context/RouterContext.jsx` (ROUTES object)
4. Add a nav link in `src/components/Navbar.jsx` (NAV_LINKS array)

---

## Customizing Colors & Fonts

Edit the `:root` CSS variables in `src/App.jsx` (GLOBAL_CSS string):

```css
--gold:       #c9a84c;   /* accent gold */
--deep:       #1a0e05;   /* dark brown backgrounds */
--smoke:      #f5f0e8;   /* light backgrounds */
```

---

## Connecting to a Real Backend

- **Contact form**: `src/pages/ContactPage.jsx` — replace the `handleSubmit` function
- **Checkout form**: `src/pages/CheckoutPage.jsx` — replace the `handleSubmit` function
- **Cart persistence**: currently uses `sessionStorage` via `CartContext.jsx` — swap for `localStorage` or API calls
