if(typeof dateOptions === undefined) {
    const dateOptions = { weekday: 'long', month: 'long', day: 'numeric' };
}

document.addEventListener('DOMContentLoaded', function() {
    const urlParams = new URLSearchParams(window.location.search);
    const movieId = parseInt(urlParams.get('id'));
    fetch('/data/movies.json').then((response) => response.json()).then((data) => {
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
            document.querySelector('#movie_projected_at').innerHTML = `${movie.projected_at.toLocaleDateString('fr-FR', dateOptions)} - ${movie.projected_at.getHours()}h${String(movie.projected_at.getMinutes()).padStart(2, 0)}`
            document.querySelector('#movie_poster').src = movie.poster
            document.querySelector('#movie_poster').alt = "Affiche de " + movie.title
            document.querySelector('#movie_synopsis').innerHTML = movie.synopsis
            document.querySelector('.book-button').setAttribute('data-movie-id', movie.id)
        }

        bindButtons()
    })
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