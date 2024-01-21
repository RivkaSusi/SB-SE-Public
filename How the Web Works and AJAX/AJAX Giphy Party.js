const $gifArea = $("#gif-area");
const $searchInput = $("#search-input");



function addGif(res) {
  let numResults = res.data.length;
  if (numResults) {
    let randomIdx = Math.floor(Math.random() * numResults);
    let $newGifDiv = $("<div>", { class: "newGifDiv" });
    let $newGif = $("<img>", {
      src: res.data[randomIdx].images.original.url,
      class: "w-100"
    });
    $newGifDiv.append($newGif);
    $gifArea.append($newGifDiv);
  }
}



$("form").on("submit", async function(evt) {
  evt.preventDefault();

  let searchTerm = $searchInput.val();
  $searchInput.val("");

  const response = await axios.get("http://api.giphy.com/v1/gifs/search", {
    params: {
      q: searchTerm,
      api_key: "MhAodEJIJxQMxW9XqxKjyXfNYdLoOIym"
    }
  });
  console.log(response.data);
  addGif(response.data);
});



$("#remove").on("click", function() {
  $gifArea.empty();
});
