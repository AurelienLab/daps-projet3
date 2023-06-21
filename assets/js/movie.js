import data from '/data/movies.json' assert { type: 'json' }

const daysOfWeek = ['dimanche', 'lundi', 'mardi', 'mercredi', 'jeudi', 'vendredi', 'samedi'];
const monthes = ['janvier', 'fevrier', 'mars', 'avril', 'mai', 'juin', 'juillet', 'août', 'septembre', 'octobre', 'novembre', 'decembre']
document.addEventListener('DOMContentLoaded', function() {
    const urlParams = new URLSearchParams(window.location.search);
    const movieId = parseInt(urlParams.get('id'));

    const movie = data.find(movie => movie.id === movieId)

    if(!movie) {
        abort404()
    } else {
        movie.projected_at = new Date(movie.projected_at)
        document.querySelector('#movie_title').innerHTML = movie.title
        document.querySelector('.page-hero').style = `background-image: url('${movie.cover}')`
        document.querySelector('#movie_duration').innerHTML = movie.duration
        document.querySelector('#movie_public').innerHTML = movie.public
        document.querySelector('#movie_language').innerHTML = movie.language
        document.querySelector('#movie_projected_at').innerHTML = `${daysOfWeek[movie.projected_at.getDay()]} ${movie.projected_at.getDate()} ${monthes[movie.projected_at.getMonth()]} - ${movie.projected_at.getHours()}h${String(movie.projected_at.getMinutes()).padStart(2, 0)}`
        document.querySelector('#movie_poster').src = movie.poster
        document.querySelector('#movie_poster').alt = "Affiche de " + movie.title
        document.querySelector('#movie_synopsis').innerHTML = movie.synopsis
    }
})

function abort404() {
    document.querySelector('.movie-page__informations').remove()
    document.querySelector('#movie_title').innerHTML = "Film introuvable"
    document.querySelector('#movie_poster').remove()
    document.querySelector('.movie-page__content div').remove()
    document.querySelector('.book-button').remove()
    // document.querySelector('.movie-page__content__heading').remove()
    const content = document.querySelector('.movie-page__content')
    content.classList.add('error404')
    content.innerHTML = `
    <img src="/assets/images/error-404.svg" alt="Page introuvable">
    <p>Le film que vous recherchez semble introuvable !</p>
    `
}