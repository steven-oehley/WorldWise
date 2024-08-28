# WorldWise 🌍

**WorldWise** is a travel diary web application that allows users to log their travel experiences by adding cities they've visited. The app features a map where users can click to select locations, and it uses geolocation data to fetch and display city information, including the country flag and name.

## Features

- **Interactive Map**: Click anywhere on the map to select a location.
- **City Details**: Automatically fetches city name, country, and flag emoji using latitude and longitude.
- **Travel Log**: Add personal notes and the date of your visit for each city.
- **Dynamic UI**: Built with React, integrating with various APIs for seamless user experience.

## Getting Started

1. **Clone the repo**:
   ```
   git clone https://github.com/steven-oehley/WorldWise.git
   ```
2. **Install dependencies**:
   ```
   npm install
   ```
3. **Start the development server**:
   ```
   npm start
   ```

## Technologies Used

- **React**: Frontend framework for building the UI.
- **React Router**: For navigation between pages.
- **React ContextAPI**: For state management.
- **APIs**: Uses BigDataCloud for reverse geocoding to fetch city data.
- **CSS Modules**: For styling components.
- **Vite**: As build tool.
