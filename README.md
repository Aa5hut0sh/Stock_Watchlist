# Stock Watchlist API

A backend service built to manage personal stock watchlists with secure authentication and data validation.

## 🚀 Quick Links
- **GitHub Repository:** [https://github.com/Aa5hut0sh/Stock_Watchlist.git](https://github.com/Aa5hut0sh/Stock_Watchlist.git) 
- **Live API:** [https://stock-watchlist-5ggm.onrender.com](https://stock-watchlist-5ggm.onrender.com)

---

## 🔐 Authentication Flow
All watchlist endpoints are protected and require a **JWT token**

### 1. Signup
* **Endpoint:** `POST /api/auth/signup` 
* **Request Body:**
    ```json
    {
      "name": "John Doe",
      "email": "john@example.com",
      "password": "Password@123"
    }
* **Password Rules:** Minimum 6 characters, one special character, and one capital letter.

### 2. Signin
* **Endpoint:** `POST /api/auth/signin` 
* **Request Body:**
    ```json
    {
      "email": "john@example.com",
      "password": "Password@123"
    }
  

### 3. Authorization Header
To access protected routes, include the token in the header:
`Authorization: Bearer <JWT_TOKEN>`

---

## 📈 Watchlist Endpoints

### Add Stock to Watchlist
* **Endpoint:** `POST /api/watchlist/add-stock` 
* **Request Body:** `{ "stockName": "AAPL" }` 
* **Rules:** * Stock name must be 1-5 uppercase letters
    * Duplicate stocks are not allowed

### View Watchlist
* **Endpoint:** `GET /api/watchlist/view-stock` 
* **Response:**
    ```json
    {
      "success": true,
      "stocks": ["AAPL", "GOOG", "TCS"]
    }
    

---

## 🛠 Security & Validation
* **JWT Authentication:** Secure access control.
* **Zod Validation:** Input validation for all user data.
* **Regex Validation:** Strict formatting for stock symbols.
* **Data Integrity:** Uses MongoDB `$addToSet` to prevent duplicate entries at the database level.
* **Centralized Error Handling:** Consistent error responses across the API]

---

## 💻 Local Setup

1. **Clone the Repository:**
   ```bash
   git clone https://github.com/Aa5hut0sh/Stock_Watchlist.git
   cd stock_watchlist

2. **Install Dependencies:**
   ```bash
   npm install

3. **Environment Setup:**
   Create a `.env` file in the root directory:
   ```env
   PORT=3000
   DBURL=mongodb://127.0.0.1:27017/stockwatchlist
   JWT_SECRET=your_secure_random_secret

4. **Start the Server:**
   ```bash
   npm start
   The server will run at http://localhost:3000.
