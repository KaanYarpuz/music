import React, { useState } from 'react';
import albumData from './components/Albums/albumData.js';
import artistData from './components/Artists/artistData.js';

const AlbumList = ({ onBack }) => {
  const [selectedAlbumIndex, setSelectedAlbumIndex] = useState(null); 

  const handleAlbumClick = (index) => {
    setSelectedAlbumIndex(index);
  };

  const handleBackClick = () => {
    setSelectedAlbumIndex(null); 
  };

  return (
    <div className="min-h-screen bg-gray-100 flex flex-col items-center justify-center">
      <div className="max-w-md w-full bg-white shadow-md rounded-lg overflow-hidden">
        <div className="bg-gray-200 px-4 py-3 flex items-center justify-between">
          <h1 className="text-xl font-semibold">Albums</h1>
          <div className="mt-2">
            <button onClick={onBack} className="text-blue-500 hover:underline">Go back to SongList</button>
          </div>
        </div>
        <div>
          {!selectedAlbumIndex ? (
            <div className="grid grid-cols-2 gap-4">
              {albumData.map((album, index) => (
                <div key={index} className="flex items-center bg-white rounded-lg shadow-md p-4 cursor-pointer" onClick={() => handleAlbumClick(index)}>
                  <img src={album.image} alt={album.title} className="w-16 h-16 rounded-lg mr-4" />
                  <div>
                    <h3 className="text-lg font-bold">{album.title}</h3>
                    <p className="text-gray-600">{album.artist}</p>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="bg-white rounded-lg shadow-md p-4 mt-4">
              <div className="flex items-center">
                <img src={artistData.find(artist => artist.title === albumData[selectedAlbumIndex].artist).image} alt={albumData[selectedAlbumIndex].artist} className="w-16 h-16 rounded-lg mr-4" />
                <div>
                  <h3 className="text-lg font-bold">{albumData[selectedAlbumIndex].artist}</h3>
                  <p className="text-gray-600">Album: {albumData[selectedAlbumIndex].title}</p>
                </div>
              </div>
              <button className="mt-2 text-blue-500 hover:underline" onClick={handleBackClick}>Back</button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default AlbumList;
