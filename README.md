BetaHouse Frontend
A modern real estate interface built with React and Vite. The frontend consumes the BetaHouse API to display property listings, handle search, sorting, filtering, and user authentication.
Tech Stack


React


Vite


TailwindCSS


Axios


React Router


Key Features


Responsive UI for property browsing


Hero search with filters


Sorting (high-to-low, low-to-high)


Property detail pages


Login functionality


Axios instance with automatic token header


Smooth grid layout for property cards


Project Structure
src/
  api/
    Axios.js
  components/
    Navbar.jsx
    Hero.jsx
    SearchBar.jsx
    PropertyCard.jsx
  pages/
    Home.jsx
    PropertyDetails.jsx
    Login.jsx
  assets/
  App.jsx
  main.jsx

How It Works
The frontend communicates with the backend through Axios. Search and sorting inputs update API queries. The UI renders property grids, hero section filters, and authentication screens. Vite ensures fast development and optimized builds.
Setup
npm install
npm run dev

Environment
Create a .env with:
VITE_API_URL=http://localhost:5000/api


