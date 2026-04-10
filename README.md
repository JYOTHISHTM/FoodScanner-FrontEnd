# 🎯 Food Scanner Frontend

## 📌 Overview
The Food Scanner Frontend is a **React.js** application that provides an interactive UI for users to scan or manually enter food product barcodes and view detailed product insights, including nutrition data, harmful ingredients, and personalized health scores.

It communicates with the backend via REST APIs and delivers a smooth, responsive user experience.

---

## 🧠 Architecture

### 🔹 Pattern Used
- Component-Based Architecture  
- Clean Folder Structure (Scalable)  

### 🔹 Key Layers
- **Components** → Reusable UI elements (Navbar, Footer, Layout)  
- **Pages** → Main screens (Home, Profile, History, etc.)  
- **Services** → API calls  
- **Context + Hooks** → Global state management (Auth)  
- **Routes** → Protected & role-based routing  

---

## 🛠️ Tech Stack

- **Framework:** React.js (with TypeScript)  
- **Styling:** Tailwind CSS  
- **HTTP Client:** Axios  
- **Routing:** React Router  

### 📦 State Management
- Context API  
- Custom Hooks  

### 📷 Barcode Scanner
- react-qr-barcode-scanner  

---

## ⚙️ Environment Variables

Create a `.env` file:

```env
VITE_API_BASE_URL=http://localhost:4000/api
```

---

## 📂 Project Structure

```bash
src/
│
├── api/
│   └── axios.ts              # Axios configuration
│
├── components/
│   ├── Navbar.tsx
│   ├── Footer.tsx
│   └── AdminLayout.tsx
│
├── constants/
│   └── apiEndpoints.ts       # API endpoints
│
├── context/
│   ├── AuthContext.tsx
│   └── AdminAuthContext.tsx
│
├── hooks/
│   └── useAuth.ts
│
├── pages/
│   ├── Home.tsx
│   ├── Login.tsx
│   ├── EmailLogin.tsx
│   ├── Profile.tsx
│   ├── History.tsx
│   ├── Favorites.tsx
│   ├── AdminLogin.tsx
│   └── AdminUsers.tsx
│
├── routes/
│   ├── ProtectedRoute.tsx
│   ├── PublicRoute.tsx
│   └── AdminProtectedRoute.tsx
│
├── services/
│   ├── authService.ts
│   ├── productService.ts
│   ├── scanService.ts
│   ├── historyService.ts
│   ├── favoritesService.ts
│   ├── profileService.ts
│   └── adminService.ts
│
├── App.tsx
├── main.tsx
└── index.css
```

---

## 🚀 Getting Started

### 1️⃣ Install dependencies
```bash
npm install
```

### 2️⃣ Run the app
```bash
npm run dev
```

### 3️⃣ App runs on
```
http://localhost:5173
```

---

## 🔄 Application Flow

1. User scans barcode / enters manually  
2. Frontend sends request via Axios  
3. Backend processes and returns product data  
4. UI displays:
   - Product details  
   - Nutrition info  
   - Health score  
   - Allergy warnings  

---

## 📊 Features

### 👤 User Features
- Barcode scanning (camera)  
- Manual barcode input  
- Product details with health insights  
- Personalized health score  
- Allergy alerts  
- Google Login  
- Email OTP Login  
- Scan history  
- Favorites system  
- Profile management  

### 🔐 Admin Features
- Admin login  
- View users  
- Block / Unblock users  

---

## 🧭 Routing System
- **PublicRoute** → Login pages  
- **ProtectedRoute** → User pages  
- **AdminProtectedRoute** → Admin pages  

---

## 🌐 API Integration

**Base URL:**
```
http://localhost:4000/api
```

**Axios configured in:**
```
src/api/axios.ts
```

---

## 🎨 UI Components
- **Navbar** → Navigation + auth state  
- **Footer** → App information  
- **AdminLayout** → Admin dashboard structure  

---

## 🔐 Authentication Flow
- Google OAuth login  
- Email OTP verification  
- Auth state managed using Context API  
- Protected routes restrict access  

---

## 🧪 Future Improvements
- Better UI animations  
- Dark mode  
- PWA support  
- Mobile optimization  
- Real-time recommendations  

---

## 👨‍💻 Author

**Jothish T M**
