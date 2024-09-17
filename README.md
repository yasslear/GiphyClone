# Giphy Clone
A simple Giphy.com clone built using React+Vite and the Giphy API. This project allows users to search for GIFs, view trending GIFs, and interact with GIFs just like the original Giphy platform.


## Features
- Search for GIFs using the Giphy API.
- View trending GIFs by category.
- Copy GIF links to the clipboard.
- Add GIFs to your favourites list (Favourites button appears dynamically once one or more gifs have been saved)
- Responsive design for mobile and desktop.


## Live Demo
[Live version here](https://yassine-elaamri.netlify.app/)


## Technologies Used
- React.js, Vite
- Giphy API
- HTML5, Tailwind CSS, JavaScript


## Installation
1. Clone the repository:
   ```bash
   git clone https://github.com/yasslear/GiphyClone.git
   ```
2. Navigate to the project directory:
   ```bash
   cd giphyclone
   ```
3. Install dependencies:
   ```bash
   npm install
   ```
4. Create a `.env` file in the root directory and add your Giphy API key:
   ```
   REACT_APP_GIPHY_API_KEY=your-giphy-api-key
   ```
5. Start the development server:
   ```bash
   npm start
   ```

## Usage
- Search for GIFs by typing in the search bar or browse by category.
- Click on any GIF to view the details, add to favourites or copy the link.
