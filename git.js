
// --- Static song list ---

const admin = [
  "playlist/admin/Kaise Ab Kahe.mp3",
  "playlist/admin/Jhoom (R&B mix).mp3"

  // Add more song paths as needed
];
const english = [
  "playlist/english/I Wanna Be Yours.mp3",

  // Add more song paths as needed
];
const arijit = [
  "playlist/arijit/Rangdaari.mp3",

  // Add more song paths as needed
];
const aditiya = [
  "playlist/aditya/Sunn Mere Yaar Ve.mp3",
  "playlist/aditya/Suroor.mp3",

  // Add more song paths as needed
];
const taylor = [
  "playlist/taylor/Taylor Swift - august (Lyrics).mp3",

  // Add more song paths as needed
];
const dhh = [
  "playlist/dhh/Luka Chippi.mp3",

  // Add more song paths as needed
];
const gym = [
  "playlist/gym/TE CONOCÍ - Super Slowed.mp3",

  // Add more song paths as needed
];
const sad = [
  "playlist/sad/Jiyein Kyun.mp3",

  // Add more song paths as needed
];
const yoyo = [
  "playlist/yo yo/Brown Rang.mp3",
  
  "playlist/yo yo/Call Aundi.mp3",

  // Add more song paths as needed
];

let activeSongs = admin;
let currentSongIndex = 0;
let currentsong = new Audio(activeSongs[currentSongIndex]);

// --- Player Animation CSS ---
function addPlayerAnimationCSS() {
  const cssCode = `
    .player {
      background: linear-gradient(90deg, #ff7a7ad0, #7a9bffd0, #b4ff7ad0);
      background-size: 300% 100%;
      animation: moveBg 10s linear infinite;
    }
    .time {
      color: black;
    }
    @keyframes moveBg {
      0% { background-position: 0% 50%; }
      50% { background-position: 100% 50%; }
      100% { background-position: 0% 50%; }
    }
  `;
  if (document.getElementById("player-animation-style")) return;
  const style = document.createElement("style");
  style.id = "player-animation-style";
  style.textContent = cssCode;
  document.head.appendChild(style);
}
function removePlayerAnimationCSS() {
  const styleTag = document.getElementById("player-animation-style");
  if (styleTag) styleTag.remove();
}

// --- Helper: Format time ---
function formatTime(seconds) {
  const mins = Math.floor(seconds / 60).toString().padStart(2, '0');
  const secs = Math.floor(seconds % 60).toString().padStart(2, '0');
  return `${mins}:${secs}`;
}

// --- UI Update Functions ---
function updateMainTitle(track) {
  let name = track.split(".mp3")[0];
  name = name.split('/').pop();
  const titleDiv = document.querySelector('.title');
  if (titleDiv) titleDiv.textContent = name;
}
function updateMainPlayButton() {
  const playBtn = document.querySelector('#playFirst');
  if (!playBtn) return;
  if (!currentsong.paused) {
    playBtn.innerHTML = `<svg viewBox="0 0 24 24" width="24" height="24"><rect x="6" y="5" width="4" height="14"/><rect x="14" y="5" width="4" height="14"/></svg>`;
  } else {
    playBtn.innerHTML = `<svg viewBox="0 0 24 24" width="24" height="24"><polygon points="8,5 20,12 8,19"></polygon></svg>`;
  }
}

// --- Main Player Logic ---
function playMusic(index) {
  if (index < 0 || index >= activeSongs.length) return;
  // If already playing this song and not paused, pause it
  if (currentSongIndex === index && !currentsong.paused) {
    pauseMusic();
    return;
  }
  currentsong.src = activeSongs[index];
  currentSongIndex = index;
  updateMainTitle(activeSongs[index]);
  currentsong.play();
  updateMainPlayButton();
  updateLibraryPlayButtons();
}

function pauseMusic() {
  currentsong.pause();
  updateMainPlayButton();
  updateLibraryPlayButtons();
}
function updateLibraryPlayButtons() {
  const buttons = document.querySelectorAll('.play-lib');
  buttons.forEach((btn, idx) => {
    if (idx === currentSongIndex && !currentsong.paused) {
      btn.innerHTML = `<svg viewBox="0 0 24 24"><rect x="6" y="5" width="4" height="14"/><rect x="14" y="5" width="4" height="14"/></svg>`;
    } else {
      btn.innerHTML = `<svg viewBox="0 0 24 24"><polygon points="8,5 20,12 8,19"></polygon></svg>`;
    }
  });
}

function nextSong() {
  currentSongIndex = (currentSongIndex + 1) % activeSongs.length;
  currentsong.src = activeSongs[currentSongIndex];
  updateMainTitle(activeSongs[currentSongIndex]);
  currentsong.play();
  updateMainPlayButton();
  updateLibraryPlayButtons();
}

function prevSong() {
  currentSongIndex = (currentSongIndex - 1 + activeSongs.length) % activeSongs.length;
  currentsong.src = activeSongs[currentSongIndex];
  updateMainTitle(activeSongs[currentSongIndex]);
  currentsong.play();
  updateMainPlayButton();
  updateLibraryPlayButtons();
}

// --- Event Listeners ---
window.addEventListener('DOMContentLoaded', () => {
  addPlayerAnimationCSS();
  updateMainTitle(activeSongs[currentSongIndex]);
  updateMainPlayButton();

  function renderLibrary() {
    const songul = document.querySelector('.lpconatiner');
    if (songul) {
      songul.innerHTML = '';
      activeSongs.forEach((song, i) => {
        let name = song.split('/').pop().replace('.mp3', '');
        songul.innerHTML += `
          <div class="localplaylist flex" data-index="${i}">
            <span class="songimg flex justify-center"><img class="img-invert" style="width: 20px;" src="img2/music-note-03-stroke-rounded.svg" alt=""></span>
            <span class="songinfo">
              <div class="songname">${name}</div>
              <div class="songartist">Unknown</div>
            </span>
            <span>
              <div class="playsvg flex justify-center">
                <button class="btn play play-lib" aria-label="Play" data-index="${i}">
                  <svg viewBox="0 0 24 24">
                    <polygon points="8,5 20,12 8,19"></polygon>
                  </svg>
                </button>
              </div>
              <div class="happy">Play Now</div>
            </span>
          </div>
        `;
      });
      songul.addEventListener('click', function (e) {
        let btn = e.target.closest('.play-lib');
        if (btn) {
          let index = parseInt(btn.getAttribute('data-index'));
          // Toggle play/pause for the same song
          if (currentSongIndex === index && !currentsong.paused) {
            pauseMusic();
          } else {
            playMusic(index);
          }
          updateLibraryPlayButtons();
        }
      });
      updateLibraryPlayButtons();
    }
  }

  renderLibrary();

  // --- Card switching logic ---
  const cardContainer = document.querySelector('.card-container');
  if (cardContainer) {
    cardContainer.addEventListener('click', function (e) {
      const card = e.target.closest('.cards');
      if (!card) return;
      const cards = Array.from(cardContainer.querySelectorAll('.cards'));
      const cardIndex = cards.indexOf(card);
      if (cardIndex === 0) {
        activeSongs = admin;
      } else if (cardIndex === 1) {
        activeSongs = english;
      } else if (cardIndex === 2) {
        activeSongs = arijit;
      } else if (cardIndex === 3) {
        activeSongs = aditiya;
      } else if (cardIndex === 4) {
        activeSongs = taylor;
      } else if (cardIndex === 5) {
        activeSongs = dhh;
      } else if (cardIndex === 6) {
        activeSongs = gym;
      } else if (cardIndex === 7) {
        activeSongs = sad;
      } else if (cardIndex === 8) {
        activeSongs = yoyo;
      }
      else {
        return;
      }
      currentSongIndex = 0;
      currentsong.src = activeSongs[currentSongIndex];
      updateMainTitle(activeSongs[currentSongIndex]);
      updateMainPlayButton();
      renderLibrary();
    });
  }

  // Play/Pause button
  const playBtn = document.querySelector('#playFirst');
  if (playBtn) {
    playBtn.addEventListener('click', () => {
      if (currentsong.paused) {
        currentsong.play();
      } else {
        pauseMusic();
      }
      updateMainPlayButton();
    });
  }

  // Next button
  const nextBtn = document.querySelector('#next');
  if (nextBtn) {
    nextBtn.addEventListener('click', nextSong);
  }

  // Previous button
  const prevBtn = document.querySelector('#previous');
  if (prevBtn) {
    prevBtn.addEventListener('click', prevSong);
  }

  // Volume slider
  const volumeSlider = document.querySelector('.range input');
  if (volumeSlider) {
    volumeSlider.addEventListener('input', (e) => {
      currentsong.volume = e.target.value / 100;
    });
  }

  // Mute button
  const volumeBtn = document.querySelector('.volume');
  if (volumeBtn) {
    volumeBtn.addEventListener('click', (e) => {
      if (e.target.src && e.target.src.includes("volume.svg")) {
        e.target.src = e.target.src.replace("volume.svg", "mute.svg");
        currentsong.volume = 0;
        if (volumeSlider) volumeSlider.value = 0;
      } else if (e.target.src) {
        e.target.src = e.target.src.replace("mute.svg", "volume.svg");
        currentsong.volume = 1.0;
        if (volumeSlider) volumeSlider.value = 100;
      }
    });
  }

  // Seek bar
  const seekBar = document.querySelector('.bar');
  if (seekBar) {
    seekBar.addEventListener('click', (e) => {
      if (!currentsong.duration) return;
      const percent = e.offsetX / e.currentTarget.clientWidth;
      currentsong.currentTime = percent * currentsong.duration;
      document.querySelector('.thumb').style.left = (percent * 100) + "%";
      document.querySelector('.fill').style.width = (percent * 100) + "%";
    });
  }

  // Time update
  currentsong.addEventListener('timeupdate', () => {
    if (document.querySelector('.time--current')) {
      document.querySelector('.time--current').innerText = formatTime(currentsong.currentTime);
    }
    if (document.querySelector('.time--duration')) {
      document.querySelector('.time--duration').innerText = formatTime(currentsong.duration);
    }
    if (document.querySelector('.thumb') && document.querySelector('.fill')) {
      document.querySelector('.thumb').style.left = ((currentsong.currentTime / currentsong.duration) * 100) + "%";
      document.querySelector('.fill').style.width = ((currentsong.currentTime / currentsong.duration) * 100) + "%";
    }
  });

  // Song end: auto next
  currentsong.addEventListener('ended', nextSong);

  // Player animation on play/pause
  currentsong.addEventListener('play', addPlayerAnimationCSS);
  currentsong.addEventListener('pause', removePlayerAnimationCSS);
});
document.querySelector(".close").addEventListener('click', (e) => {
  document.querySelector(".left").style.left = "-120%";
  document.querySelector(".left").style.transition = "left 1.5s ease 0.05s";
});
document.querySelector(".hamburger").addEventListener('click', (e) => {
  document.querySelector(".left").style.left = "0%";
  document.querySelector(".left").style.transition = "left 0.75s ease 0.05s";
});
document.querySelector("ul li:first-child").addEventListener('click', (e) => {
  document.querySelector(".left").style.left = "-120%";
  document.querySelector(".left").style.transition = "left 0.75s ease 0.05s";
});
document.querySelector('.card-container').addEventListener('click', async (e) => {
  document.querySelector(".left").style.left = "0%";
  document.querySelector(".left").style.transition = "left 0.75s ease 0.05s";
});