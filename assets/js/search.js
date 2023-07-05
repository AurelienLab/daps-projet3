let movies = [];
let dateSelected = false;
fetch('/data/movies.json')
    .then((response) => response.json())
    .then((data) => populate(data))

function populate(moviesData) {

    const urlParams = new URLSearchParams(window.location.search);
    const searchString = urlParams.get('search') ?? '';
    const searchGenre = urlParams.get('genre') !== '' ? urlParams.get('genre') : null;

    for(let movie of moviesData) {
        movie.projected_at = new Date(movie.projected_at)
        movie.projected_at_str = `${movie.projected_at.toLocaleDateString('fr-FR', dateOptions)} - ${movie.projected_at.getHours()}h${String(movie.projected_at.getMinutes()).padStart(2, 0)}`
        movies.push(movie)
    }
    document.getElementById('search').value = searchString
    populateGenres(searchGenre)
    displayMovieList(searchInMovies(searchString, searchGenre))
}


function searchInMovies(string, genre) {
    string = string.toLowerCase()
    return movies.filter(movie => {
        if(genre == null || movie.tags.includes(genre)) {
            for(let attribute in movie) {
                if(typeof movie[attribute] === 'string' && movie[attribute].toLowerCase().includes(string)) {
                    return true;
                }
            }
            return false;
        }
    })
}


function populateGenres(currentGenre) {

    //Get a list of genres
    let genres = [];
    for (let movie of movies) {
        movie.tags.map(tag => genres.push(tag))
    }
    genres = [...new Set(genres)]

    const genreSelect = document.querySelector('.search__filters__genre select')

    for(let genre of genres) {
        const option = document.createElement('option')
        option.innerHTML = genre;
        option.value = genre;
        if(genre === currentGenre) {
            option.setAttribute('selected', true)
        }
        genreSelect.appendChild(option)
    }

}
