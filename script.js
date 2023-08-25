// let url="https://www.googleapis.com/youtube/v3/videos/AIzaSyD-GTjlAKgATchEFYQqaHdDuEf1y1aWF3w"
const card = document.querySelector(".right");

let video = "https://www.googleapis.com/youtube/v3/videos?";
let channel = "https://www.googleapis.com/youtube/v3/channels?";
let api_Key = "AIzaSyD-GTjlAKgATchEFYQqaHdDuEf1y1aWF3w";

//-----------------search bar---------------



fetch(
  video +
    new URLSearchParams({
      key: api_Key,
      part: "snippet",
      type: "video",
      chart: "mostPopular",
      maxResults: 50,
      regionCode: "IN",
    })
)
  .then((res) => res.json())
  .then((data) => {
    data.items.forEach((item) => {
      getChannel(item);
      console.log(item);
    });
  })
  .catch((err) => console.log(err));

const getChannel = (vid) => {
  fetch(
    channel +
      new URLSearchParams({
        key: api_Key,
        part: "snippet",
        id: vid.snippet.channelId,
      })
  )
    .then((res) => res.json())
    .then((data) => {
      vid.channelThumbnail = data.items[0].snippet.thumbnails.url;
      videoCard(vid);
      console.log(data);
    });
};

// --------------------video card---------------------
const videoCard = (data) => {
  card.innerHTML +=
    ` 
    <div class="vid" onClick="location.href = 'https://youtube.com/watch?v=${data.id}'">
      <img src="${data.snippet.thumbnails.high.url}" class="img" alt="thumbnail">
      <div class="video">
       <img src="${data.channelThumbnail}" class="i" >
       <div class="inf">
        <h6 class="title">${data.snippet.title}</h6>
        <p class="channel-name">${data.snippet.channelTitle}</p>
       </div>
     </div>
    </div>
    `;
}

//--------------- Searchbar------------------------------
const searchInp = document.querySelector(".searchinp");
const searchBut = document.querySelector(".search");
const search = "https://www.youtube.com/results?search_query=";

searchBut.addEventListener("click", () => {
  if (searchInp.value.length) {
    location.href = search + searchInp.value;
  }
});
