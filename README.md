# 🎁 Wrapped
Wrapped is a smart gift recommendation application that takes the stress out of gifting. By inputting who you're shopping for, the occasion, and your budget, Wrapped curates personalized gift ideas and provides direct shopping links to Amazon and Nykaa so you can buy them in seconds.

#Live Demo Link : https://wrapped-dun-six.vercel.app

# Features
Personalized Gifting Engine: Tailors recommendations based on the recipient (e.g., partner, friend, parent, colleague), their interests, and your relationship.

Occasion-Specific Curation: Whether it’s a birthday, anniversary, Diwali, Raksha Bandhan, graduation, or Secret Santa, Wrapped adapts to the vibe of the event.

Strict Budget Filtering: Set your minimum and maximum price range (in ₹ / $) to ensure every suggestion fits comfortably within your wallet.

One-Click Shopping Links: No more endless searching—every recommended gift comes with direct links to view and purchase on Amazon and Nykaa.

Save & Share Wishlists: Bookmark your favorite suggestions for later or share a curated gift list link with friends and family.

# Tech Stack

Frontend: React.js / Next.js, Tailwind CSS
Backend: Node.js, Express / Python (FastAPI)
AI / Recommendation Logic: OpenAI API / Gemini API (or custom rule-based filtering)
Product & Link Integration: Amazon Product Advertising API / Affiliate Deep Links, Nykaa Search/Affiliate Links
Database: MongoDB / PostgreSQL / Firebase

# Getting Started
Follow these steps to run Wrapped locally on your machine.
Prerequisites
Node.js (v18 or higher)
Run `npm i` to install the dependencies.

  Run `npm run dev` to start the development server.

# How It Works
Select Recipient: Choose who the gift is for (e.g., Best Friend, Mom, Boyfriend, Boss) and optionally add a few interests (e.g., skincare, tech, books, fitness).

Pick the Occasion: Choose from preset occasions or enter a custom milestone.

Set Your Budget: Slide or type in your preferred price range (e.g., ₹500 - ₹2,000).

Get Wrapped: Browse a curated list of thoughtful gift ideas, complete with descriptions, estimated prices, and direct "Buy on Amazon" and "Buy on Nykaa" buttons.

# Project Structure
wrapped/
├── client/                      # Frontend Application
│   ├── public/                  # Static assets (logos, gift icons, favicons)
│   └── src/
│       ├── assets/              # Images, custom illustrations, and fonts
│       ├── components/          # Reusable UI components
│       │   ├── GiftCard.jsx     # Displays gift info, price, & Amazon/Nykaa buttons
│       │   ├── GiftForm.jsx     # Input form (Recipient, Occasion, Budget slider)
│       │   ├── Loader.jsx       # Loading animation while fetching suggestions
│       │   └── Navbar.jsx       # Top navigation & saved wishlist counter
│       ├── pages/               # Main application views
│       │   ├── Home.jsx         # Landing page with gift finder form
│       │   ├── Results.jsx      # Curated gift recommendations grid
│       │   └── Wishlist.jsx     # Saved gifts for later viewing/sharing
│       ├── services/            # Frontend API calls to backend
│       │   └── api.js           # Axios/Fetch wrappers for gift endpoints
│       ├── utils/               # Helper functions
│       │   └── formatCurrency.js # Formats price ranges (₹ / $)
│       ├── App.jsx              # Main app routing and layout
│       └── main.jsx             # React entry point
│
├── server/                      # Backend API & Recommendation Engine
│   ├── config/                  # Database and API key configurations
│   │   └── db.js                # Database connection setup
│   ├── controllers/             # Request handling logic
│   │   └── giftController.js    # Processes user inputs & returns gift list
│   ├── routes/                  # API route definitions
│   │   └── giftRoutes.js        # POST /api/gifts/recommend
│   ├── services/                # Core business logic & integrations
│   │   ├── aiService.js         # Generates gift ideas via LLM / rule engine
│   │   ├── amazonService.js     # Fetches products or builds Amazon search/affiliate links
│   │   └── nykaaService.js      # Fetches beauty/lifestyle items or builds Nykaa links
│   ├── utils/                   # Backend helpers
│   │   └── linkBuilder.js       # Sanitizes product names into valid URLs
│   └── server.js                # Express/Node server entry point
│
├── .env.example                 # Template for required API keys & environment variables
├── .gitignore                   # Files and folders ignored by Git
├── package.json                 # Project dependencies and run scripts
└── README.md                    # Project documentation

# Future Enhancements
 Reminder Notifications: Get email/push alerts before your saved birthdays and anniversaries.

Price Drop Alerts: Track specific gift items on Amazon and Nykaa and get notified when they go on sale.

Group Gifting: Split the cost of high-budget gifts with friends directly through the app.

More Retailers: Expand link integrations to Myntra, Ajio, and local artisanal stores.

# Contributing
Contributions are welcome! Feel free to open an issue or submit a pull request.
#
