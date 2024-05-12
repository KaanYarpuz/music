// App.js
import React, { useState } from 'react';
import MusicPlayer from './MusicPlayer';
import AlbumList from './albumList';
import './App.css';

function App() {
  const [showAlbums, setShowAlbums] = useState(false); // State om te bepalen of de albumlijst moet worden weergegeven

  // Functie om naar de albumlijst te gaan
  const goToAlbumList = () => {
    setShowAlbums(true);
  };

  // Functie om terug te keren naar de muziekspeler
  const goToMusicPlayer = () => {
    setShowAlbums(false);
  };

  return (
    <div className="App">
      {showAlbums ? (
        <AlbumList onBack={goToMusicPlayer} /> // Als showAlbums waar is, toon AlbumList component
      ) : (
        <MusicPlayer onShowAlbums={goToAlbumList} /> // Anders toon MusicPlayer component
      )}
    </div>
  );
}

export default App;
