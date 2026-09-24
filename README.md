# 🏙️ NeighborhoodFit

🔴 **Important Note**
This website uses **free backend hosting on Render**, so the first API request may take **up to 1 minute** when the server wakes up.

🔗 **Live Demo:** https://neighborhoodfit.netlify.app
🔗 **Backup Link:** https://neighborhoodfit.vercel.app

🌐 **Backend API:**
https://neighborfit-y283.onrender.com/api/neighborhoods

---

# 📍 About the Project

**NeighborhoodFit** is a full-stack web application that helps users explore suitable neighborhoods in **Bengaluru, India** based on:

* 🛡️ Safety levels
* 💰 Average rent levels
* 🚇 Metro accessibility
* 🌱 Lifestyle indicators like parks and schools

Instead of browsing random property listings, the platform helps users **quickly identify the best areas using a data-driven scoring system.**

---

# 📡 What does it do?

Whether you're moving to Bengaluru or exploring better places to live, **NeighborhoodFit** lets you:

* 📍 View **relative safety scores** of neighborhoods
* 💰 Compare **average rent levels**
* 🚇 Filter areas by **metro proximity**
* 🌱 Explore nearby **parks and schools**
* 🔍 Search and filter neighborhoods instantly
* 🏆 Discover **Top Ranked Areas** using an algorithmic scoring system
* 🏷️ Understand lifestyle tags like **Family-Friendly** or **Walkable**

---

# 🧠 Smart Ranking System (Match Score)

Each neighborhood is assigned a **Match Score** that ranks areas based on safety, metro proximity, parks, schools, and rent affordability.

This is a general neighborhood suitability score and is **not specific to the selected lifestyle filter**.

### 📊 Factors Used

* 🛡️ Safety score
* 🚇 Distance to metro station
* 🌳 Number of parks nearby
* 🏫 Number of schools nearby
* 💰 Rent affordability

### 🧮 Example Logic

```
Match Score =
(Safety × 5)
+ Metro Proximity Bonus
+ Parks Score
+ Schools Score
+ Rent Affordability Bonus
```

Higher score → **higher overall match score**

---

# 🏆 Top Neighborhood Leaderboard

The system automatically:

* Sorts neighborhoods by **Match Score**
* Displays a **Top Neighborhoods leaderboard**
* Highlights the **Top Areas** with a special badge

Example:

```
🏆 Top Neighborhoods

1️⃣ Someshettihalli  
2️⃣ Jothinagar  
3️⃣ Goripalya  
4️⃣ Gorkamantapalya  
5️⃣ Valmiki Nagar
```

Top ranked cards also display:

```
🏆 Top Area
```

This allows users to quickly identify **the best neighborhoods at a glance**.

---

# 📊 Where did the data come from?

The data used in this project was **carefully created and enriched**, not randomly downloaded.

## 📥 Base Geo & Place Data

**Source Tools**

* 🛠️ **Overpass Turbo**
* 🗺️ **OpenStreetMap**

Using Overpass queries, the following information was extracted:

* Neighborhood names
* Geographic coordinates
* Nearby metro stations
* Parks and schools
* Road networks and points of interest

---

## 🧾 Dataset Enrichment

The raw dataset was then **processed and enriched manually** with additional attributes:

* 🛡️ Relative safety scores
* 💰 Rent level estimates
* 🚇 Metro proximity indicators
* 🏷️ Lifestyle tags

📁 **Final Dataset:**

```
bengaluru_neighborhoods.csv
```

This dataset is served via the backend API.

---

# 🔐 Safety Score Methodology

Official ward-wise crime data is not publicly available in structured format.

Therefore a **proxy-based safety score** was created using urban indicators.

### Indicators Used

* 🏫 Amenity Density
  (schools, parks, hospitals, shops)

* 🛣️ Road Connectivity
  (density of road network)

* 🏙️ Public Activity
  (commercial places and transit stops)

### Formula

```
Safety Score =
(Amenity Density + Road Connectivity + Public Activity) / 3
```

Values were **min-max normalized between 0 and 1**.

⚠️ This score is **comparative only**, not official crime statistics.

---

# 🎨 Lifestyle Badges

Each neighborhood automatically receives **lifestyle tags**.

Examples:

* 🧑‍👩‍👧 **Family-Friendly**
* 💼 **Working Professionals**
* 🤫 **Quiet Neighborhoods**
* 🚶 **Walkable & Connected**

### Tag Logic

**Family-Friendly**

* High number of schools and parks

**Working Professionals**

* Higher office and commercial density

**Quiet Neighborhoods**

* Lower commercial activity

**Walkable & Connected**

* Close metro stations and dense road connectivity

---

# 🖥️ Project Structure

```
NeighborFit/
│
├── client/
│   └── src/
│       ├── App.js
│       ├── App.css
│       ├── NeighborhoodList.js
│       ├── NeighborhoodList.css
│
├── server/
│   └── data/
│       └── bengaluru_neighborhoods.csv
│
├── server/index.js
└── README.md
```

---

# 🧰 Tech Stack

### Frontend

* React.js
* CSS

### Backend

* Node.js
* Express.js

### Data Source

* OpenStreetMap
* Overpass Turbo

### Hosting

* Netlify (Frontend)
* Render (Backend)

---

# 🚀 Key Features

* 🔍 Dynamic filtering by safety, rent, and metro access
* 🧠 Smart **Match Score ranking algorithm**
* 🏆 **Top Neighborhood leaderboard**
* 🏷️ Lifestyle tags with visual badges
* 📱 Fully responsive card-based UI
* 🔄 API-driven data loading
* 🗺️ Direct Google Maps links for each area

---

# ⚙️ Backend Overview

Backend built using **Node.js + Express**.

Responsibilities:

* Parse dataset using `csv-parser`
* Generate lifestyle tags
* Calculate **match scores**
* Serve neighborhoods via API

### API Endpoint

```
/api/neighborhoods
```

Backend is deployed on **Render** with GitHub auto-deploy.

---

# 🌐 Frontend Integration

Frontend built using **React**.

Features:

* Data fetched using `useEffect`
* Dynamic filtering
* Automatic ranking display
* Clean responsive UI

Frontend hosted on **Netlify**.

---

# 👤 Author

**Pradhuman Singh**

GitHub
https://github.com/PRADHUMAN-SINGH-1

---

# 📌 Notes for Reviewers / HR

This project demonstrates my ability to:

* Work with **real geospatial datasets**
* Design **data-driven ranking algorithms**
* Build **full-stack web applications**
* Handle **imperfect real-world data**
* Deploy systems using **zero-budget infrastructure**
