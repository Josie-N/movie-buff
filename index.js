function fetchMovie() {
  const searchInput = document.getElementById("search-input");
  const ajaxCall = new XMLHttpRequest();
  ajaxCall.open(
    "GET",
    `http://www.omdbapi.com/?apikey=3b0628b0&s=${searchInput.value}`
  );
  ajaxCall.onreadystatechange = function() {
    if (ajaxCall.readyState === 4 && ajaxCall.status == 200) {
      const movieData = JSON.parse(ajaxCall.responseText);
      let html = "";
      if (movieData.Response === "False") {
        html += `<h2>Sorry, ${movieData.Error.toLowerCase()}  🤷🏼‍♀️</h2>`;
      } else {
        movieData.Search.forEach(movie => {
          if (movie.Poster === "N/A") {
            html += `<h2> ${movie.Title} </h2>
          <img src="./searching-space.png" width="200px">`;
          } else {
            html += ` <p>You've got great taste:</p>
                      <h2> ${movie.Title} </h2>
                      <img src="${movie.Poster}">`;
          }
        });
      }

      document.getElementById("ajax").innerHTML = html;
    }
  };
  ajaxCall.send();
}
function reset() {
  document.getElementById("ajax").innerHTML = '<img src="./filler-photo.jpg">';
  document.getElementById("search-input").value = "";
}
