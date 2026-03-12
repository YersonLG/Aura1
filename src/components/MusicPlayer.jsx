import { useState, useEffect, useRef } from "react";
import "./MusicPlayer.css";

export default function MusicPlayer() {
  const audioRef = useRef(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [volume, setVolume] = useState(70);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);
  const [currentSong, setCurrentSong] = useState(1);

  const songs = [
    { id: 1, name: "cancion.mp3", label: "Canción 1" },
    { id: 2, name: "cancion2.mp3", label: "Canción 2" }
  ];

  useEffect(() => {
    const audio = audioRef.current;
    if (!audio) return;

    // Configurar volumen
    audio.volume = volume / 100;
  }, [volume]);

  useEffect(() => {
    const audio = audioRef.current;
    if (!audio) return;

    // Cuando cambia la canción, resetear
    audio.currentTime = 0;

    const updateTime = () => setCurrentTime(audio.currentTime);
    const updateDuration = () => setDuration(audio.duration);
    const handleEnded = () => {
      // Reiniciar la canción cuando termine
      audio.currentTime = 0;
      audio.play().catch(err => console.log("Error al reiniciar:", err));
    };

    audio.addEventListener("timeupdate", updateTime);
    audio.addEventListener("loadedmetadata", updateDuration);
    audio.addEventListener("ended", handleEnded);

    // Intentar reproducir si ya hay interacción previa
    if (isPlaying) {
      audio.play().catch(err => {
        console.log("No se puede autoplay, espera interacción:", err);
      });
    }

    return () => {
      audio.removeEventListener("timeupdate", updateTime);
      audio.removeEventListener("loadedmetadata", updateDuration);
      audio.removeEventListener("ended", handleEnded);
    };
  }, [currentSong, isPlaying]);

  // Escuchar la primera interacción del usuario
  useEffect(() => {
    const handleUserInteraction = () => {
      const audio = audioRef.current;
      if (audio) {
        audio.play().catch(err => {
          console.log("Error al reproducir:", err);
        });
        setIsPlaying(true);
      }
      // Remover el listener después de la primera interacción
      document.removeEventListener("click", handleUserInteraction);
      document.removeEventListener("touchstart", handleUserInteraction);
    };

    document.addEventListener("click", handleUserInteraction);
    document.addEventListener("touchstart", handleUserInteraction);

    return () => {
      document.removeEventListener("click", handleUserInteraction);
      document.removeEventListener("touchstart", handleUserInteraction);
    };
  }, []);


  const togglePlay = () => {
    if (audioRef.current) {
      if (isPlaying) {
        audioRef.current.pause();
        setIsPlaying(false);
      } else {
        audioRef.current.play().catch(err => {
          console.log("Error al reproducir:", err);
        });
        setIsPlaying(true);
      }
    }
  };

  const changeSong = (songId) => {
    setCurrentSong(songId);
  };

  const handleVolumeChange = (e) => {
    const newVolume = e.target.value;
    setVolume(newVolume);
    if (audioRef.current) {
      audioRef.current.volume = newVolume / 100;
    }
  };

  const handleProgressChange = (e) => {
    const newTime = e.target.value;
    setCurrentTime(newTime);
    if (audioRef.current) {
      audioRef.current.currentTime = newTime;
    }
  };

  const formatTime = (seconds) => {
    if (!seconds || isNaN(seconds)) return "0:00";
    const mins = Math.floor(seconds / 60);
    const secs = Math.floor(seconds % 60);
    return `${mins}:${secs < 10 ? "0" : ""}${secs}`;
  };

  return (
    <div className="musicPlayer">
      <audio 
        ref={audioRef} 
        src={`/${songs.find(s => s.id === currentSong)?.name}`}
        crossOrigin="anonymous"
        onError={(e) => console.log("Error al cargar audio:", e)}
      />

      <div className="playerContainer">
        <div className="playerControls">
          <button className="playBtn" onClick={togglePlay}>
            {isPlaying ? "⏸" : "▶"}
          </button>

          <div className="progressBar">
            <span className="time">{formatTime(currentTime)}</span>
            <input
              type="range"
              min="0"
              max={duration || 0}
              value={currentTime}
              onChange={handleProgressChange}
              className="slider"
            />
            <span className="time">{formatTime(duration)}</span>
          </div>

          <div className="songSelector">
            {songs.map(song => (
              <button
                key={song.id}
                className={`songBtn ${currentSong === song.id ? "active" : ""}`}
                onClick={() => changeSong(song.id)}
              >
                {song.label}
              </button>
            ))}
          </div>

          <div className="volumeControl">
            <span className="volumeIcon">🔊</span>
            <input
              type="range"
              min="0"
              max="100"
              value={volume}
              onChange={handleVolumeChange}
              className="volumeSlider"
            />
            <span className="volumeValue">{volume}%</span>
          </div>
        </div>
      </div>
    </div>
  );
}
