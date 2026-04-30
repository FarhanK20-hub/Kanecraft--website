# Kanecraft Web 🍃

> Sustainable corporate stationery made from 100% sugarcane waste (bagasse).

Kanecraft is a B2B brand that provides corporate stationery made from 100% sugarcane waste (bagasse) instead of wood pulp. It helps companies switch to sustainable paper without increasing costs or changing their procurement process. Every order includes report-ready ESG data, making it easier for enterprises to track and showcase their environmental impact.

This repository contains the high-performance web application built to showcase the brand. It features a stunning, ASMR-inspired frontend designed to "wow" enterprise clients, alongside a secure, MongoDB-backed admin panel for catalog management.

## 📖 About the Project
**Purpose**: The website serves as a premium marketing landing page to demonstrate that sustainability doesn't mean sacrificing quality or increasing budgets. It provides an immersive user experience that clearly communicates Kanecraft's core value proposition.
**Target Users**: Enterprise procurement officers, eco-conscious B2B buyers, and internal Kanecraft administrators managing the product catalog.

## ✨ Features
* **Premium Tactile UI**: Custom organic cursor, magnetic buttons, and drawn-in scroll highlights.
* **Web Audio Experience**: Procedurally generated dynamic wind noise linked to scroll velocity and subtle UI interaction clicks.
* **Dynamic ESG Calculator**: Real-time visualization of trees preserved, water saved, and carbon prevented based on ream consumption.
* **Secure Admin Panel**: A protected dashboard and CMS to list, create, edit, and delete products dynamically.
* **Smooth Scrolling**: Implemented globally using Lenis for a buttery-smooth navigational experience.

## 🛠️ Tech Stack
* **Framework**: [Next.js](https://nextjs.org/) (App Router)
* **Frontend**: React 19, [Tailwind CSS v4](https://tailwindcss.com/)
* **Animations**: [Framer Motion](https://www.framer.com/motion/), GSAP, [Lenis](https://lenis.studiofreight.com/)
* **Backend**: Next.js API Routes (Serverless)
* **Database**: [MongoDB](https://www.mongodb.com/) & [Mongoose](https://mongoosejs.com/)
* **Icons**: [Lucide React](https://lucide.dev/)

## 🚀 Installation & Setup

1. **Clone the repository**
   ```bash
   git clone https://github.com/yourusername/kanecraft-web.git
   cd kanecraft-web
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Configure Environment Variables**
   Create a `.env.local` file in the root directory and add the following:
   ```env
   MONGODB_URI=mongodb+srv://<username>:<password>@cluster...
   ADMIN_PASSWORD=your_secure_master_password
   ```

4. **Run the development server**
   ```bash
   npm run dev
   ```

5. **(Optional) Seed the Database**
   To populate the store with dummy products, run:
   ```bash
   node scratch/add-dummy-products.js
   ```

## 💻 Usage
* **Public Site**: Navigate to `http://localhost:3000` to view the main landing page, experience the ASMR interactions, and view the dynamic product catalog.
* **Admin Panel**: Navigate to `http://localhost:3000/admin`. You will be redirected to a secure login page. Enter the `ADMIN_PASSWORD` you set in your `.env` file to access the dashboard and manage products.

## 📁 Folder Structure
```text
kanecraft-web/
├── scratch/             # Utility scripts (e.g., database seeding)
├── src/
│   ├── app/             # Next.js App Router (Public pages & Admin routes)
│   │   ├── api/         # Backend REST API routes
│   │   └── admin/       # Secure admin dashboard & product management
│   ├── components/      # Reusable React components
│   │   ├── sections/    # Large page sections (Hero, Calculator, Comparison)
│   │   └── ui/          # Micro-components (Cards, Buttons, Magnetic wrappers)
│   ├── lib/             # Utilities (MongoDB connection pool)
│   └── models/          # Mongoose database schemas (Product.ts)
└── public/              # Static assets
```

## 🔐 Environment Variables
This project requires the following environment variables to function properly:
* `MONGODB_URI`: Your MongoDB Atlas connection string.
* `ADMIN_PASSWORD`: A custom string used to secure the `/admin` routes via Next.js Middleware.

## ☁️ Deployment
The easiest way to deploy this Next.js application is via [Vercel](https://vercel.com/):
1. Push your code to a GitHub repository.
2. Import the project into Vercel.
3. Add `MONGODB_URI` and `ADMIN_PASSWORD` to the Vercel Environment Variables settings.
4. Click **Deploy**.

## 🔮 Future Improvements / Roadmap
- [ ] Add a robust image upload system (e.g., AWS S3 or Cloudinary) for product images in the admin panel.
- [ ] Implement a full cart and checkout system using Stripe.
- [ ] Add localization (i18n) for global enterprise clients.
- [ ] Expand the Admin Panel to include Lead tracking from the Contact Modal.

## 🤝 Contributing
Contributions are what make the open source community such an amazing place to learn, inspire, and create. Any contributions you make are **greatly appreciated**.
1. Fork the Project
2. Create your Feature Branch (`git checkout -b feature/AmazingFeature`)
3. Commit your Changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the Branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## 📄 License
Distributed under the MIT License. See `LICENSE` for more information.

