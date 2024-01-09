document.getElementById("search-song").addEventListener("click",fetchData);

function fetchData() {
    const artistName = document.getElementById("artist-name").value;
    
    const API = `https://api.lyrics.ovh/suggest/${artistName}`;

    fetch(API)
    .then(res => res.json())
    .then(data => showSongs(data))
    .catch(error => displayError());
}


function showSongs(data) {
    const songContainer = document.getElementById("song-container");
    songContainer.innerHTML = '';
    for (let i = 0; i < Math.min(data.data.length,10); i++) {
        const title = data.data[i].title;
        const artist = data.data[i].artist.name;
        const preview = data.data[i].preview;
        const songDiv = document.createElement("div");
        songDiv.className = 'single-result row align-items-center my-3 p-3';
        songDiv.innerHTML = `<div class="col-md-9">
        <h3 class="lyrics-name">${title}</h3>
        <p class="author lead">Album by <span>${artist}</span></p>
        </div>
        <div class="col-md-3 text-md-right text-center">
            <button onclick="getLyrics('${artist}','${title}')" class="btn btn-success">Get Lyrics</button>
        </div>`;
        songContainer.appendChild(songDiv);
    }
}

function getLyrics(artist,title) {
    const lyricsApi = `https://api.lyrics.ovh/v1/${artist}/${title}`;
    fetch(lyricsApi)
    .then(res => res.json())
    .then(data => displayLyrics(data.lyrics))
    .catch(error => displayError());
}
const displayLyrics = lyrics => {
    const lyricsDiv = document.getElementById('songLyrics');
    lyricsDiv.innerText = lyrics;
}


function displayError() {
    document.getElementById("error-message").innerText = "failed to load lyrics, Please try again later!!!";
}

