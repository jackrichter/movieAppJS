const addMovieModal = document.getElementById("add-modal");
const startAddMovieButton = document.querySelector("header button");
const backdrop = document.getElementById("backdrop");
const cancelAddMovieButton = addMovieModal.querySelector(".btn--passive");
const confirmAddMovieButton = cancelAddMovieButton.nextElementSibling;
const userInputs = addMovieModal.querySelectorAll("input");
const entryTextSection = document.getElementById("entry-text");
const listRootElement = document.getElementById("movie-list");
const deleteMovieModal = document.getElementById("delete-modal");

const movies = [];

const toggleBackdrop = () => {
	backdrop.classList.toggle("visible");
};

const updateUI = () => {
	if (movies.length === 0) {
		entryTextSection.style.display = "block";
	} else {
		entryTextSection.style.display = "none";
	}
};

const closeMovieDeletionModal = () => {
	toggleBackdrop();
	deleteMovieModal.classList.remove("visible");
};

const deleteMovie = (movieId) => {
	let movieIndex = 0;
	for (const movie of movies) {
		if (movie.id === movieId) {
			break;
		}
		movieIndex++;
	}
	movies.splice(movieIndex, 1);
	listRootElement.children[movieIndex].remove();
	// listRootElement.removeChild(listRootElement.children[movieIndex]);
	closeMovieDeletionModal();
	updateUI();
};

const deleteMovieHandler = (movieId) => {
	deleteMovieModal.classList.add("visible");
	toggleBackdrop();
	const cancelDeletionButton = deleteMovieModal.querySelector(".btn--passive");
	let confirmDeletionButton = deleteMovieModal.querySelector(".btn--danger");

	confirmDeletionButton.replaceWith(confirmDeletionButton.cloneNode(true)); // Take away previous stored EventListeners!!!
	confirmDeletionButton = deleteMovieModal.querySelector(".btn--danger"); // Have to, again, get a reference to the "new" button

	// confirmDeletionButton.removeEventListener("click", deleteMovie.bind(null, movieId));    // THIS WILL NOT WORK!!
	cancelAddMovieButton.removeEventListener("click", closeMovieDeletionModal);

	cancelDeletionButton.addEventListener("click", closeMovieDeletionModal);
	confirmDeletionButton.addEventListener("click", deleteMovie.bind(null, movieId));
};

const renderNewMovieElement = (id, title, imageUrl, rating) => {
	const newMovieElement = document.createElement("li");
	newMovieElement.className = "movie-element";
	newMovieElement.innerHTML = `
    <div class="movie-element__image">
      <img src="${imageUrl}" alt="${title}">
    </div>
    <div class="movie-element__info">
      <h2>${title}</h2>
      <p>${rating}/5 stars</p>
    </div>
  `;
	newMovieElement.addEventListener("click", deleteMovieHandler.bind(null, id));
	listRootElement.append(newMovieElement);
};

const closeMovieModal = () => {
	addMovieModal.classList.remove("visible");
};

const showMovieModal = () => {
	addMovieModal.classList.add("visible");
	toggleBackdrop();
};

const clearMovieInput = () => {
	for (const input of userInputs) {
		input.value = "";
	}
};

const cancelAddMovieHandler = () => {
	closeMovieModal();
	toggleBackdrop();
	clearMovieInput();
};

const addMovieHandler = () => {
	const titleValue = userInputs[0].value;
	const imageUrlValue = userInputs[1].value;
	const ratingValue = userInputs[2].value;

	if (
		titleValue.trim() === "" ||
		imageUrlValue.trim() === "" ||
		ratingValue.trim() === "" ||
		+ratingValue < 1 ||
		+ratingValue > 5
	) {
		alert("Please enter valid values (rating between 1 and 5).");
		return;
	}

	const newMovie = {
		id: Math.random().toString(),
		title: titleValue,
		image: imageUrlValue,
		rating: ratingValue
	};
	movies.push(newMovie);
	console.log(movies);
	closeMovieModal();
	toggleBackdrop();
	clearMovieInput();
	renderNewMovieElement(newMovie.id, newMovie.title, newMovie.image, newMovie.rating);
	updateUI();
};

const backdropClickHandler = () => {
	closeMovieModal();
	closeMovieDeletionModal();
	clearMovieInput();
};

startAddMovieButton.addEventListener("click", showMovieModal);
backdrop.addEventListener("click", backdropClickHandler);
cancelAddMovieButton.addEventListener("click", cancelAddMovieHandler);
confirmAddMovieButton.addEventListener("click", addMovieHandler);
