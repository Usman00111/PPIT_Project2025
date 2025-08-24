# PPIT_Project2025

# Ballaghaderreen Grocery Shop (MERN Project)

This is a simple eCommerce website built using the MERN stack for a local grocery shop.  
It allows customers to browse products, add items to a cart, and checkout either as a guest or registered user.  
Admins can log in to manage products and view/update orders.

## Features
- Browse products (public).
- Add to cart, update quantity, remove items.
- Checkout as guest (with delivery details) or as logged-in user.
- User accounts get an **account number** when registering.
- Admin can:
  - Create, update, delete products.
  - Manage stock (stock reduces when items are added to cart).
  - View and update order statuses.

## Tech Stack
- **Frontend**: React + Vite
- **Backend**: Node.js + Express
- **Database**: MongoDB (Mongoose)
- **Auth**: JWT
- **Styling**: Simple CSS

## How to Run
1. Clone the repository:
   ```bash
   git clone <repo-url>

2. Install and start the backend:
    cd backend
    npm install
    npm run seed:admin   # creates an admin user
    npm run dev

3. Install and start the frontend:
    cd frontend
    npm install
    npm run dev

4. Open your browser at:
    http://localhost:5173

    ```bash 

## Default Admin
The admin account is created from the `.env` file when you run:
```bash
npm run seed:admin
```