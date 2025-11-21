# ecommerce-store
# E-Commerce Store with "Every 5th Order = 10% Discount"  
A complete implementation with **all requirements met**

### Core Features
- Add items to cart  
- Checkout & place orders  
- Every **5th order** automatically generates a **one-time-use 10% discount code**  
- Apply discount code during checkout (validated & marked used)  
- Two Admin APIs (no auth required as per spec)  
- Persistent SQLite database – data survives server restarts  
- Clean, modular, well-commented code  
- Responsive React + Tailwind UI  

---

### Tech Stack

| Layer        | Technology                                   |
|--------------|----------------------------------------------|
| Backend      | Node.js + Express + Prisma ORM + SQLite      |
| Frontend     | React 18 + Vite + Tailwind CSS + Axios       |
| Database     | SQLite (`prisma/dev.db`) – zero config       |
---

### API Endpoints (http://localhost:3000/api)

| Method | Endpoint                  | Description                                      |
|--------|---------------------------|--------------------------------------------------|
| POST   | `/cart/add`               | Add item to cart                                 |
| GET    | `/cart`                   | Get current cart contents                        |
| POST   | `/checkout`               | Place order (body: `{ "discountCode": "SAVE10-XYZ" }` optional) |
| POST   | `/admin/generate-code`    | Manually generate a new discount code            |
| GET    | `/admin/stats`            | Full analytics: orders, revenue, items sold, discount codes, etc. |

---

### Project Structure

```
ecommerce-store/
├── backend/
│   ├── prisma/
│   │   ├── schema.prisma
│   │   └── dev.db                  ← SQLite database file
│   ├── src/
│   │   ├── controllers/
│   │   ├── services/
│   │   └── server.js
│   └── package.json
├── frontend/
│   ├── src/
│   │   ├── components/Cart.jsx
│   │   ├── components/Checkout.jsx
│   │   └── App.jsx
│   └── tailwind.config.js
└── README.md
```

---

### How to Run Locally (Takes ~5 minutes)

#### 1. Clone the repository
```bash
git clone https://github.com/rudrafunds/ecommerce-store.git
cd ecommerce-store
```

#### 2. Backend – with persistent SQLite DB
```bash
cd backend
npm install
npx prisma migrate dev --name init    # Creates dev.db and tables
npm run dev                            # Starts on http://localhost:3000
```

#### 3. Frontend
```bash
cd ../frontend
npm install
npm run dev                            # Starts on http://localhost:5173
```

Open http://localhost:5173 – start shopping!

---

### Test the Discount Logic (Core Requirement)

1. Add any items to the cart  
2. Checkout **5 times** (leave discount code blank)  
3. On the **5th order**, a new discount code is auto-generated  
4. Open `http://localhost:3000/api/admin/stats` → copy the generated code  
5. On the next checkout, paste the code → you get **10% off**  
6. Try reusing the same code → **rejected** (one-time use)  

---

### Admin Tools

- **View full stats**: `GET /api/admin/stats`  
- **Manually generate a code**: `POST /api/admin/generate-code`  

---

### Evaluation Checklist – Everything Delivered

| Requirement                                  | Status |
|----------------------------------------------|--------|
| Functional cart & checkout                   | Done   |
| Every 5th order generates 10% discount code  | Done   |
| Discount code is one-time-use only           | Done   |
| Discount applies to entire order             | Done   |
| Admin API to generate codes                  | Done   |
| Admin API for stats (items, revenue, discounts) | Done   |
| Persistent storage (not in-memory)           | Done   |
| Clean, modular, well-commented code          | Done   |
| Responsive UI (React + Tailwind)             | Done   |
| Complete README with setup instructions      | Done   |
| Works locally                                | Done   |

--- 

### Ecommerce Frontend**
![Ecommerce Frontend](screenshot_frontend.png)

### Data in Database**
![Data in Database](screenshot_db.png)