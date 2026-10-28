/* ==========================================================
   LOCAL STORAGE
========================================================== */

const STORAGE_KEY = "movieWatchlist";

let watchlist =
  JSON.parse(localStorage.getItem(STORAGE_KEY)) || [];


/* ==========================================================
   DOM ELEMENTS
========================================================== */

const searchInput =
  document.getElementById("searchInput");

const searchBtn =
  document.getElementById("searchBtn");

const moviesContainer =
  document.getElementById("movies");

const watchlistContainer =
  document.getElementById("watchlist");


/* ==========================================================
   CALLBACK
========================================================== */

/*
  This function accepts a callback.
  It is called after the movie has been added.
*/

function addToWatchlist(movie, callback) {

  const alreadyExists =
    watchlist.some(item => item.imdbID === movie.imdbID);

  if (!alreadyExists) {

    watchlist.push(movie);

    localStorage.setItem(
      STORAGE_KEY,
      JSON.stringify(watchlist)
    );

  }

  callback();
}


/* ==========================================================
   PROMISE
========================================================== */

function waitForSave() {

  return new Promise(resolve => {

    setTimeout(() => {

      resolve(
        "Promise resolved: movie operation completed."
      );

    }, 800);

  });

}


/* ==========================================================
   FETCH + ASYNC/AWAIT
========================================================== */

/*
  OMDb requires an API key, so this project uses a public
  demo JSON endpoint as a fallback for direct opening.
  If you have an OMDb key, replace API_URL with your key.

  The demo dataset is returned through a Promise below,
  while the application still demonstrates fetch with
  a public JSON endpoint.
*/

const demoMovies = [
  {
    Title:"The Dark Knight",
    Year:"2008",
    Genre:"Action, Crime, Drama",
    imdbID:"demo1",
    Plot:"Batman faces a criminal mastermind who plunges Gotham into chaos."
  },
  {
    Title:"Inception",
    Year:"2010",
    Genre:"Action, Sci-Fi, Thriller",
    imdbID:"demo2",
    Plot:"A skilled thief enters dreams to steal and manipulate information."
  },
  {
    Title:"Interstellar",
    Year:"2014",
    Genre:"Adventure, Drama, Sci-Fi",
    imdbID:"demo3",
    Plot:"Explorers travel through a wormhole in search of a new home for humanity."
  },
  {
    Title:"The Matrix",
    Year:"1999",
    Genre:"Action, Sci-Fi",
    imdbID:"demo4",
    Plot:"A hacker discovers that reality is a simulated system."
  },
  {
    Title:"Avatar",
    Year:"2009",
    Genre:"Action, Adventure, Fantasy",
    imdbID:"demo5",
    Plot:"A marine explores the alien world of Pandora and its people."
  },
  {
    Title:"Avengers: Endgame",
    Year:"2019",
    Genre:"Action, Adventure, Drama",
    imdbID:"demo6",
    Plot:"The Avengers attempt to undo the devastation caused by Thanos."
  }
];


/*
  fetch() demonstration.

  JSONPlaceholder is a public API that works without a key.
  We use its Promise response as part of the search operation,
  then map our local movie dataset to realistic movie cards.
*/

async function fetchMovieData(query) {

  /*
    Browser fetch API.
    This request is asynchronous and returns a Promise.
  */

  const response = await fetch(
    "https://jsonplaceholder.typicode.com/posts/1"
  );

  if (!response.ok) {
    throw new Error("API request failed.");
  }

  /*
    response.json() is also asynchronous.
  */

  await response.json();

  /*
    Promise-like delay makes the asynchronous process visible.
  */

  await new Promise(resolve =>
    setTimeout(resolve, 500)
  );

  return demoMovies.filter(movie =>
    movie.Title.toLowerCase().includes(
      query.toLowerCase()
    )
  );

}


/* ==========================================================
   SEARCH EVENT
========================================================== */

searchBtn.addEventListener(
  "click",
  searchMovies
);


searchInput.addEventListener(
  "keydown",
  event => {

    if (event.key === "Enter") {
      searchMovies();
    }

  }
);


/* ==========================================================
   ASYNC SEARCH FUNCTION
========================================================== */

async function searchMovies() {

  const query =
    searchInput.value.trim();

  const status =
    document.getElementById("searchStatus");


  if (!query) {

    status.textContent =
      "Please enter a movie name.";

    return;

  }


  status.textContent =
    "Searching asynchronously...";


  moviesContainer.innerHTML = "";


  try {

    /*
      async/await waits for fetchMovieData()
    */

    const results =
      await fetchMovieData(query);


    renderMovies(results);


    status.textContent =
      `${results.length} movie(s) found.`;

  }

  catch(error) {

    status.textContent =
      "Something went wrong: " + error.message;

  }

}


/* ==========================================================
   DOM MANIPULATION
========================================================== */

function renderMovies(movies) {

  moviesContainer.innerHTML = "";

  document.getElementById(
    "emptyMovies"
  ).style.display =
    movies.length ? "none" : "block";


  /*
    DOM elements are dynamically created.
  */

  movies.forEach(movie => {

    const card =
      document.createElement("article");

    card.className = "movie";


    card.innerHTML = `
      <div class="poster">🎬</div>

      <div class="movie-body">

        <h3>${movie.Title}</h3>

        <div class="meta">
          ${movie.Year} • ${movie.Genre}
        </div>

        <p>${movie.Plot}</p>

        <div class="movie-actions">

          <button
            class="add-btn"
            data-id="${movie.imdbID}">
            + Watchlist
          </button>

        </div>

      </div>
    `;


    moviesContainer.appendChild(card);

  });

}


/* ==========================================================
   EVENT DELEGATION
========================================================== */

moviesContainer.addEventListener(
  "click",
  async event => {

    if (
      !event.target.classList.contains(
        "add-btn"
      )
    ) {
      return;
    }


    const id =
      event.target.dataset.id;


    const movie =
      demoMovies.find(
        item => item.imdbID === id
      );


    /*
      Promise
    */

    await waitForSave();


    /*
      Callback
    */

    addToWatchlist(
      movie,
      () => {

        renderWatchlist();

      }
    );

  }
);


/* ==========================================================
   RENDER WATCHLIST
========================================================== */

function renderWatchlist() {

  watchlistContainer.innerHTML = "";

  document.getElementById(
    "watchCount"
  ).textContent =
    watchlist.length;


  if (watchlist.length === 0) {

    document.getElementById(
      "emptyWatch"
    ).style.display =
      "block";

    return;

  }


  document.getElementById(
    "emptyWatch"
  ).style.display =
    "none";


  watchlist.forEach(movie => {

    const item =
      document.createElement("div");

    item.className = "watch";


    item.innerHTML = `
      <div>
        <b>${movie.Title}</b>
        <small>${movie.Year} • ${movie.Genre}</small>
      </div>

      <button
        class="danger remove-btn"
        data-id="${movie.imdbID}">
        Remove
      </button>
    `;


    watchlistContainer.appendChild(item);

  });


  document.getElementById(
    "storage"
  ).textContent =
    "SAVED";

}


/* ==========================================================
   DELETE EVENT
========================================================== */

watchlistContainer.addEventListener(
  "click",
  event => {

    if (
      !event.target.classList.contains(
        "remove-btn"
      )
    ) {
      return;
    }


    const id =
      event.target.dataset.id;


    watchlist =
      watchlist.filter(
        movie => movie.imdbID !== id
      );


    localStorage.setItem(
      STORAGE_KEY,
      JSON.stringify(watchlist)
    );


    renderWatchlist();

  }
);


/* ==========================================================
   PROMISE DEMO BUTTON
========================================================== */

document
  .getElementById("promiseDemo")
  .addEventListener(
    "click",
    async () => {

      const output =
        document.getElementById(
          "promiseOutput"
        );


      output.textContent =
        "Promise pending...";


      try {

        const message =
          await waitForSave();


        output.textContent =
          "✓ " + message;

      }

      catch(error) {

        output.textContent =
          "Error: " + error;

      }

    }
  );


/* ==========================================================
   CODE DISPLAY
========================================================== */

const examples = {

callback:
`// CALLBACK

function addToWatchlist(movie, callback) {

  watchlist.push(movie);

  localStorage.setItem(
    "movieWatchlist",
    JSON.stringify(watchlist)
  );

  callback();
}

addToWatchlist(movie, () => {
  renderWatchlist();
});`,

promise:
`// PROMISE

function waitForSave() {

  return new Promise(resolve => {

    setTimeout(() => {

      resolve(
        "Operation completed"
      );

    }, 800);

  });

}`,

async:
`// ASYNC / AWAIT

async function searchMovies() {

  try {

    const results =
      await fetchMovieData(query);

    renderMovies(results);

  } catch(error) {

    console.log(error);

  }

}`,

fetch:
`// FETCH

const response =
  await fetch(
    "https://jsonplaceholder.typicode.com/posts/1"
  );

const data =
  await response.json();`,

dom:
`// DOM + EVENTS

searchBtn.addEventListener(
  "click",
  searchMovies
);

const card =
  document.createElement("article");

card.innerHTML =
  "<h3>Movie</h3>";

moviesContainer.appendChild(card);`,

storage:
`// LOCAL STORAGE

localStorage.setItem(
  "movieWatchlist",
  JSON.stringify(watchlist)
);

const watchlist =
  JSON.parse(
    localStorage.getItem(
      "movieWatchlist"
    )
  ) || [];`

};


document
  .querySelectorAll("[data-code]")
  .forEach(button => {

    button.addEventListener(
      "click",
      () => {

        document.getElementById(
          "codeBox"
        ).textContent =
          examples[
            button.dataset.code
          ];

      }
    );

  });


document.getElementById(
  "codeBox"
).textContent =
  examples.callback;


/* INITIAL RENDER */

renderWatchlist();
