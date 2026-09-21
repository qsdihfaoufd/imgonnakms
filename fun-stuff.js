/* =================================
   MUSIC PLAYER
================================= */

const audio = document.getElementById("audio");

const playButton = document.getElementById("play");
const previousButton = document.getElementById("previous");
const nextButton = document.getElementById("next");
const shuffleButton = document.getElementById("shuffle");
const muteButton = document.getElementById("mute");

const seekBar = document.getElementById("seek-bar");
const volume = document.getElementById("volume");

const title = document.getElementById("song-title");
const artist = document.getElementById("artist");

const currentTime = document.getElementById("current-time");
const duration = document.getElementById("duration");

const playlist = document.getElementById("playlist");


/* =================================
   YOUR PLAYLIST
================================= */

let track_list = [

    {
        name: "All I Ask of You",
        path: "All I Ask of You - Andrew Lloyd Webber Musicals (128k).mp3"
    },

    {
        name: "Don't dream it's over",
        path: "Crowded House - Don't Dream It's Over (Official Music Video) - Crowded House (128k).mp3"
    },
    
     {
        name: "The world we knew (over and over)",
        path: "Frank Sinatra - The world we knew (over and over) - JvdH (128k).mp3"
    },
    
     {
        name: "Malcolm in the middle",
        path: "Malcolm In The Middle - Malcolm Todd (128k).mp3"
    },
     {
        name: "Obsessica",
        path: "Malcolm Todd - Obsessica (Official Visualizer) - Malcolm Todd (128k).mp3"
    },
     {
        name: "My way of life",
        path: "My Way Of Life - Frank Sinatra (128k).mp3"
    },

     {
        name: "The promise",
        path: "When In Rome - The Promise (Remastered) - SLAYERO MUSIC (128k).mp3"
    },
    
];


let currentSong = 0;

let shuffle = false;


/* =================================
   CREATE PLAYLIST
================================= */

function createPlaylist() {

    playlist.innerHTML = "";

    track_list.forEach((track, index) => {

        const item = document.createElement("div");

        item.className = "track";

        item.innerHTML = `
            <span class="track-number">
                ${(index + 1).toString().padStart(2, "0")}
            </span>

            <span>
                ${track.name}
            </span>
        `;

        item.addEventListener("click", () => {

            currentSong = index;

            loadSong();

            playSong();

        });

        playlist.appendChild(item);

    });

}


/* =================================
   LOAD SONG
================================= */

function loadSong() {

    const track = track_list[currentSong];

    console.log("Trying to load:", track.path);

    audio.src = track.path;
    audio.load();

    title.textContent = track.name;
    artist.textContent = "♪ now playing ♪";

    updatePlaylist();

}


/* =================================
   UPDATE PLAYLIST
================================= */

function updatePlaylist() {

    const tracks =
        document.querySelectorAll(".track");

    tracks.forEach((track, index) => {

        track.classList.toggle(
            "active",
            index === currentSong
        );

    });

}


/* =================================
   PLAY
================================= */

function playSong() {

    audio.play()
        .then(() => {

            playButton.textContent = "❚❚";

        })
        .catch(error => {

            console.error(
                "Could not play audio:",
                error
            );

        });

}


/* =================================
   PAUSE
================================= */

function pauseSong() {

    audio.pause();

    playButton.textContent = "▶";

}


/* =================================
   PLAY / PAUSE
================================= */

playButton.addEventListener("click", () => {

    if (audio.paused) {

        playSong();

    } else {

        pauseSong();

    }

});


/* =================================
   NEXT
================================= */

nextButton.addEventListener(
    "click",
    nextSong
);


function nextSong() {

    if (shuffle) {

        currentSong =
            Math.floor(
                Math.random() *
                track_list.length
            );

    } else {

        currentSong++;

        if (
            currentSong >=
            track_list.length
        ) {

            currentSong = 0;

        }

    }

    loadSong();

    playSong();

}


/* =================================
   PREVIOUS
================================= */

previousButton.addEventListener(
    "click",
    () => {

        currentSong--;

        if (currentSong < 0) {

            currentSong =
                track_list.length - 1;

        }

        loadSong();

        playSong();

    }
);


/* =================================
   AUTO NEXT
================================= */

audio.addEventListener(
    "ended",
    nextSong
);


/* =================================
   SHUFFLE
================================= */

shuffleButton.addEventListener(
    "click",
    () => {

        shuffle = !shuffle;

        shuffleButton.style.background =
            shuffle
                ? "var(--pink)"
                : "var(--lime)";

    }
);


/* =================================
   MUTE
================================= */

muteButton.addEventListener(
    "click",
    () => {

        audio.muted = !audio.muted;

        muteButton.textContent =
            audio.muted
                ? "🔇"
                : "🔊";

    }
);


/* =================================
   VOLUME
================================= */

volume.addEventListener(
    "input",
    () => {

        audio.volume = volume.value;

    }
);


/* =================================
   SEEK BAR
================================= */

audio.addEventListener(
    "timeupdate",
    () => {

        if (!audio.duration)
            return;

        seekBar.value =
            (
                audio.currentTime /
                audio.duration
            ) * 100;

        currentTime.textContent =
            formatTime(
                audio.currentTime
            );

    }
);


audio.addEventListener(
    "loadedmetadata",
    () => {

        duration.textContent =
            formatTime(
                audio.duration
            );

    }
);


seekBar.addEventListener(
    "input",
    () => {

        if (!audio.duration)
            return;

        audio.currentTime =
            (seekBar.value / 100) *
            audio.duration;

    }
);


/* =================================
   FORMAT TIME
================================= */

function formatTime(seconds) {

    if (isNaN(seconds))
        return "0:00";

    const minutes =
        Math.floor(seconds / 60);

    const secondsPart =
        Math.floor(seconds % 60)
            .toString()
            .padStart(2, "0");

    return `${minutes}:${secondsPart}`;

}


/* =================================
   INITIALIZE
================================= */

createPlaylist();

loadSong();

audio.volume = 0.7;