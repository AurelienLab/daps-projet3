import data from '/data/movies.json' assert { type: 'json' }

document.addEventListener('DOMContentLoaded', function() {
    const shuffled = data.sort(() => 0.5 - Math.random());
    let selected = shuffled.slice(0, 6);

    const postersContainer = document.querySelector('.homepage-hero__posters__content')
    postersContainer.innerHTML = '' // Empty the container just in case of ...
    for(let movie of selected) {
        const posterLink = document.createElement('a')
        posterLink.setAttribute('href', '#')
        posterLink.classList.add('homepage-hero__poster')

        const posterImg = document.createElement('img' )
        posterImg.src = movie.poster
        posterImg.alt = 'Affiche de ' + movie.title

        posterLink.appendChild(posterImg)
        posterLink.appendChild(posterImg.cloneNode(true)) //Add second image for ambilight

        postersContainer.appendChild(posterLink)
    }
})