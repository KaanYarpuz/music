import React, { useState, useRef } from 'react';
import albumData from './components/Songs/songData.js';
import './index.css'; // Import your Tailwind CSS file

const MusicPlayer = ({ onShowAlbums }) => { // Ontvang onShowAlbums van bovenliggende component
  const [currentSongIndex, setCurrentSongIndex] = useState(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const audioRef = useRef(null);
  const [progress, setProgress] = useState(0);
  const [showMusicPlayer, setShowMusicPlayer] = useState(true); 

  const handlePlay = (index) => {
    setCurrentSongIndex(index);
    setIsPlaying(true);
  };

  const handleSkip = () => {
    if (currentSongIndex !== null && currentSongIndex < albumData.length - 1) {
      setCurrentSongIndex(currentSongIndex + 1);
    }
  };

  const handleUndo = () => {
    if (currentSongIndex !== null && currentSongIndex > 0) {
      setCurrentSongIndex(currentSongIndex - 1);
    }
  };

  const handlePause = () => {
    setIsPlaying(false);
    audioRef.current.pause();
  };

  const handlePlayButton = () => {
    setIsPlaying(true);
    audioRef.current.play();
  };

  const handleTimeUpdate = () => {
    const currentTime = audioRef.current.currentTime;
    const duration = audioRef.current.duration;
    setProgress((currentTime / duration) * 100);
  };

  return (
    <div className="min-h-screen bg-gray-100 flex flex-col items-center justify-center">
      <div className="max-w-md w-full bg-white shadow-md rounded-lg overflow-hidden">
        <div className="bg-gray-200 px-4 py-3 flex items-center justify-between">
          <h1 className="text-xl font-semibold">Music Player</h1>
          <div className="mt-2">
                <button onClick={onShowAlbums} className="text-blue-500 hover:underline">Go to Album List</button>
              </div>
        </div>
        <div className="p-4">
          <div className="overflow-y-auto max-h-60">
            <ul className="space-y-2">
              {albumData.map((song, index) => (
                <li
                  key={index}
                  onClick={() => handlePlay(index)}
                  className={`flex items-center justify-between px-2 py-1 hover:bg-gray-100 cursor-pointer transition duration-300 ${currentSongIndex === index ? 'bg-blue-100' : ''}`}
                >
                  <div className="flex items-center">
                    <img src={song.image} alt={song.title} className="w-12 h-12 rounded-full mr-4" />
                    <div>
                      <p className="text-sm font-medium">{song.title}</p>
                      <p className="text-xs text-gray-500">{song.artist}</p>
                    </div>
                  </div>
                </li>
              ))}
            </ul>
          </div>
          {currentSongIndex !== null && (
            <div className="mt-4 border-t border-gray-200 pt-4">
              <p className="text-sm font-medium">{albumData[currentSongIndex].title}</p>
              <p className="text-xs text-gray-500">{albumData[currentSongIndex].artist}</p>
              <div className="relative mt-2">
                <div className="absolute top-0 left-0 h-1 bg-gray-200 w-full">
                  <div
                    className="h-1 bg-blue-500"
                    style={{ width: `${progress}%` }}
                  ></div>
                </div>
                <audio
                  ref={audioRef}
                  src={albumData[currentSongIndex].mp3}
                  autoPlay={isPlaying}
                  controls
                  className="w-full"
                  onTimeUpdate={handleTimeUpdate}
                  onEnded={handleSkip}
                  hidden
                />
              </div>
              <div className="flex justify-between mt-2">
                <button onClick={handleUndo} className="text-blue-500 hover:underline">Undo</button>
                {isPlaying ? (
                  <button onClick={handlePause} className="text-blue-500 hover:underline">Pause</button>
                ) : (
                  <button onClick={handlePlayButton} className="text-blue-500 hover:underline">Play</button>
                )}
                <button onClick={handleSkip} className="text-blue-500 hover:underline">Skip</button>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default MusicPlayer;
