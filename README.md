# ScrapDeal – Scrap & Malwa Pickup Service (MERN App)

ScrapDeal is a MERN-based web application that allows users to schedule scrap pickup, book malwa trucks, register as scrap dealers, and manage their requests.  
It includes a complete **Admin Dashboard**, **User Login**, **Dealer Registration**, and status tracking system.

---

## 🚀 Live Demo

### 🌐 Frontend (Netlify)
https://scap-deal.vercel.app/

### 🛠 Backend API (Render)
https://scapdeal.onrender.com/api/

---

## ✨ Features

### 🔹 User Side
- Login using phone & password  
- Schedule scrap pickup  
- Book malwa pickup  
- Edit profile  
- Track request status  
- User-friendly responsive UI  

### 🔹 Dealer / Provider
- Register as scrap dealer  
  
### 🔹 Admin Dashboard
- View all scrap & malwa requests  
- Accept / Reject / Complete actions  
- Manage service providers  
- View all dealers  



## 🧩 Tech Stack

| Layer | Technologies |
|-------|--------------|
| Frontend | React (Vite), Tailwind CSS |
| Backend | Node.js, Express.js |
| Database | MongoDB Atlas |
| Deployment | vercel (frontend), Render (backend) |


## 📁 Folder Structure

project/
├── backend/
├── public/
├── src/
├── dist/
├── package.json
├── README.md

## 🔧 API Base URL

https://scapdeal.onrender.com/api

## 🛠 How To Run Locally (Dev Mode)

### 👉 1. Clone the repo
```sh
git clone https://github.com/YOUR_USERNAME/ScapDeal.git
cd ScapDeal

👉 2. Install frontend dependencies

npm install
npm run dev

👉 3. Install backend dependencies

cd backend
npm install
node server.js

🚀 Deployment Info
Netlify (Frontend)
Auto-deploys from main branch
Uses vite build
Redirect rules added (_redirects) to fix SPA routing

Render (Backend)
Node server
Connected to MongoDB Atlas
Auto deploy on commit


🤝 Contributing
Pull requests are welcome! Feel free to fork the repo and submit improvements.

📜 License

This project is open-source and available under the MIT License.

