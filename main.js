// spotify activity

const trackArtist = document.querySelector("#trackartist");
const trackName = document.querySelector("#tracktitle");
const nowPlaying = document.querySelector("#nowplaying");
const trackArtwork = document.querySelector("#trackartwork");
const shadowArtwork = document.querySelector("#shadowartwork");
const timestamp = document.querySelector("#timestamp");
const lastfm = document.querySelector("#lastfm");
const trackLink = document.querySelector("#tracklink");

const track = {};

function latestTrack() {
  let api =
    "https://ws.audioscrobbler.com/2.0/?method=user.getrecenttracks&user=lltejasll&format=json&api_key=0d18c849abdeb5bb7df9437a19e70114&limit=1";
  fetch(api)
    .then(function (response) {
      let data = response.json();
      return data;
    })
    .then(function (data) {
      track.artist = data["recenttracks"]["track"][0]["artist"]["#text"];
      track.name = data["recenttracks"]["track"][0]["name"];
      track.artwork = data["recenttracks"]["track"][0]["image"][3]["#text"];
      track.link = data["recenttracks"]["track"][0]["url"];
      if ("@attr" in data["recenttracks"]["track"][0]) {
        track.nowPlaying = true;
      } else {
        track.nowPlaying = false;
        track.time = data["recenttracks"]["track"][0]["date"]["uts"];
      }
    })
    .then(function () {
      displayTrack();
    });
}

function displayTrack() {
  trackArtist.innerHTML = `${track.artist}`;
  trackName.innerHTML = `${track.name}`;
  trackArtwork.src = `${track.artwork}`;
  shadowArtwork.src = `${track.artwork}`;
  track.time = `${track.time}`;
  // trackLink.href = `${track.link}`;
  youtubeSearchQuery = encodeURI(`${track.name}` + " " + `${track.artist}`);
  youtubeSearchQueryFinal = "https://www.youtube.com/results?search_query=" + `${youtubeSearchQuery}`;
  trackLink.href = `${youtubeSearchQueryFinal}`;
  lastfm.style.opacity = 1;

  if (track.nowPlaying) {
    nowPlaying.style.display = "block";
    nowPlaying.innerHTML = "currently listening";
    timestamp.style.display = "none";
  } else {
    timestamp.style.display = "block";
    timestamp.innerHTML = `listened ` + moment.unix(`${track.time}`).fromNow();
    nowPlaying.style.display = "none";
  }
}

latestTrack();
setInterval(latestTrack, 50000);