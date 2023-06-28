import data from '/data/movies.json' assert { type: 'json' }

let movies = [];
let dateSelected = false;

for(let movie of data) {
    movie.projected_at = new Date(movie.projected_at)
    movies.push(movie)
}
function getDatesList() {
    //Get a list of different days
    const rawDate = [...new Set(movies.map(o => o.projected_at.toISOString().split('T')[0]))]

    //Convert dates to Date objects and sort them ASC
    return rawDate.map(date => new Date(date)).sort((a,b) => a - b)
}

function filterMoviesByDate(date) {
    return movies
        .filter(movie => movie.projected_at.toISOString().split('T')[0] === date.toISOString().split('T')[0])
        .sort((a,b) => a.projected_at - b.projected_at)
}

function displayProgramByDate(element, date) {

    dateSelected = true;
    //Display the good date selection
    const allDateLinks = document.querySelectorAll('.date-selector__date')
    for(let dateLink of allDateLinks) {
        dateLink.classList.remove('active')
    }
    element.classList.add('active')

    displayMovieList(filterMoviesByDate(date))

}

function displayMovieList(list) {

    const listElement = document.querySelector('.program__list')
    const dateOptions = { weekday: 'long', month: 'long', day: 'numeric' };

    listElement.innerHTML = '';
    for(let movie of list) {
        const movieArticle = document.createElement('article')
        movieArticle.classList.add('movie')

        let tagsString = ''
        for(let tag of movie.tags) {
            tagsString += `<span>${tag}</span>`
        }
        const movieContent = `
                <div class="movie__poster">
                  <img src="${movie.poster}" alt="Affiche de ${movie.title}">
              </div>
              <div class="movie__infos">
                  <div class="movie__heading">
                      <h3 class="movie__title">${movie.title}</h3>
                      <p class="movie__author">de ${movie.author} (${movie.year})</p>
                  </div>
                 
                  <div class="movie__tags">
                      ${tagsString}
                  </div>
                  <p class="movie__synopsis">${movie.synopsis}</p>
                  <div class="movie__data">
                    <div class="movie__data__duration">
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-6 h-6">
                            <path stroke-linecap="round" stroke-linejoin="round" d="M12 6v6h4.5m4.5 0a9 9 0 11-18 0 9 9 0 0118 0z" />
                        </svg>
                        <span>${movie.duration}</span>
                    </div>
                      <div class="movie__data__schedule">
                          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-6 h-6">
                              <path stroke-linecap="round" stroke-linejoin="round" d="M6.75 3v2.25M17.25 3v2.25M3 18.75V7.5a2.25 2.25 0 012.25-2.25h13.5A2.25 2.25 0 0121 7.5v11.25m-18 0A2.25 2.25 0 005.25 21h13.5A2.25 2.25 0 0021 18.75m-18 0v-7.5A2.25 2.25 0 015.25 9h13.5A2.25 2.25 0 0121 11.25v7.5m-9-6h.008v.008H12v-.008zM12 15h.008v.008H12V15zm0 2.25h.008v.008H12v-.008zM9.75 15h.008v.008H9.75V15zm0 2.25h.008v.008H9.75v-.008zM7.5 15h.008v.008H7.5V15zm0 2.25h.008v.008H7.5v-.008zm6.75-4.5h.008v.008h-.008v-.008zm0 2.25h.008v.008h-.008V15zm0 2.25h.008v.008h-.008v-.008zm2.25-4.5h.008v.008H16.5v-.008zm0 2.25h.008v.008H16.5V15z" />
                          </svg>
                          <span>${movie.projected_at.toLocaleDateString('fr-FR', dateOptions)} - ${movie.projected_at.getHours()}h${String(movie.projected_at.getMinutes()).padStart(2, 0)}</span>
                    </div>
                      <div class="movie__data__schedule">
                          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-6 h-6">
                              <path stroke-linecap="round" stroke-linejoin="round" d="M18 18.72a9.094 9.094 0 003.741-.479 3 3 0 00-4.682-2.72m.94 3.198l.001.031c0 .225-.012.447-.037.666A11.944 11.944 0 0112 21c-2.17 0-4.207-.576-5.963-1.584A6.062 6.062 0 016 18.719m12 0a5.971 5.971 0 00-.941-3.197m0 0A5.995 5.995 0 0012 12.75a5.995 5.995 0 00-5.058 2.772m0 0a3 3 0 00-4.681 2.72 8.986 8.986 0 003.74.477m.94-3.197a5.971 5.971 0 00-.94 3.197M15 6.75a3 3 0 11-6 0 3 3 0 016 0zm6 3a2.25 2.25 0 11-4.5 0 2.25 2.25 0 014.5 0zm-13.5 0a2.25 2.25 0 11-4.5 0 2.25 2.25 0 014.5 0z" />
                          </svg>
                          <span>${movie.public}</span>
                    </div>
                    <div class="movie__data__schedule">
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-6 h-6">
                          <path stroke-linecap="round" stroke-linejoin="round" d="M3.375 19.5h17.25m-17.25 0a1.125 1.125 0 01-1.125-1.125M3.375 19.5h1.5C5.496 19.5 6 18.996 6 18.375m-3.75 0V5.625m0 12.75v-1.5c0-.621.504-1.125 1.125-1.125m18.375 2.625V5.625m0 12.75c0 .621-.504 1.125-1.125 1.125m1.125-1.125v-1.5c0-.621-.504-1.125-1.125-1.125m0 3.75h-1.5A1.125 1.125 0 0118 18.375M20.625 4.5H3.375m17.25 0c.621 0 1.125.504 1.125 1.125M20.625 4.5h-1.5C18.504 4.5 18 5.004 18 5.625m3.75 0v1.5c0 .621-.504 1.125-1.125 1.125M3.375 4.5c-.621 0-1.125.504-1.125 1.125M3.375 4.5h1.5C5.496 4.5 6 5.004 6 5.625m-3.75 0v1.5c0 .621.504 1.125 1.125 1.125m0 0h1.5m-1.5 0c-.621 0-1.125.504-1.125 1.125v1.5c0 .621.504 1.125 1.125 1.125m1.5-3.75C5.496 8.25 6 7.746 6 7.125v-1.5M4.875 8.25C5.496 8.25 6 8.754 6 9.375v1.5m0-5.25v5.25m0-5.25C6 5.004 6.504 4.5 7.125 4.5h9.75c.621 0 1.125.504 1.125 1.125m1.125 2.625h1.5m-1.5 0A1.125 1.125 0 0118 7.125v-1.5m1.125 2.625c-.621 0-1.125.504-1.125 1.125v1.5m2.625-2.625c.621 0 1.125.504 1.125 1.125v1.5c0 .621-.504 1.125-1.125 1.125M18 5.625v5.25M7.125 12h9.75m-9.75 0A1.125 1.125 0 016 10.875M7.125 12C6.504 12 6 12.504 6 13.125m0-2.25C6 11.496 5.496 12 4.875 12M18 10.875c0 .621-.504 1.125-1.125 1.125M18 10.875c0 .621.504 1.125 1.125 1.125m-2.25 0c.621 0 1.125.504 1.125 1.125m-12 5.25v-5.25m0 5.25c0 .621.504 1.125 1.125 1.125h9.75c.621 0 1.125-.504 1.125-1.125m-12 0v-1.5c0-.621-.504-1.125-1.125-1.125M18 18.375v-5.25m0 5.25v-1.5c0-.621.504-1.125 1.125-1.125M18 13.125v1.5c0 .621.504 1.125 1.125 1.125M18 13.125c0-.621.504-1.125 1.125-1.125M6 13.125v1.5c0 .621-.504 1.125-1.125 1.125M6 13.125C6 12.504 5.496 12 4.875 12m-1.5 0h1.5m-1.5 0c-.621 0-1.125.504-1.125 1.125v1.5c0 .621.504 1.125 1.125 1.125M19.125 12h1.5m0 0c.621 0 1.125.504 1.125 1.125v1.5c0 .621-.504 1.125-1.125 1.125m-17.25 0h1.5m14.25 0h1.5" />
                        </svg>

                          <span>${movie.language}</span>
                    </div>
                  </div>
              </div>
              <div class="movie__actions">
                  <a href="film.html?id=${movie.id}" class="link link--animated">En savoir plus</a>
                  <a href="#" class="book-button">Réserver</a>
              </div>
        `

        movieArticle.innerHTML = movieContent
        listElement.appendChild(movieArticle)
    }


}


const dateSelector = document.querySelector('.date-selector')

if(dateSelector !== null) {
    const daysOfWeek = ['dim.', 'lun.', 'mar.', 'mer.', 'jeu.', 'ven.', 'sam.'];
    const monthes = ['jan.', 'fev.', 'mars', 'avr.', 'mai', 'juin', 'jui.', 'août', 'sep.', 'oct.', 'nov.', 'dec.']

    for(let date of getDatesList()) {
        const a = document.createElement('a')
        a.classList.add('date-selector__date')
        a.setAttribute('href', '#')

        const content = `
              <span class="date-selector__date__day">${daysOfWeek[date.getDay()]}</span>
              <span class="date-selector__date__number">${date.getDate()}</span>
              <span class="date-selector__date__month">${monthes[date.getMonth()]}</span>
        `

        a.innerHTML = content
        dateSelector.appendChild(a)

        a.addEventListener('click', function(e) {
            e.preventDefault()
            displayProgramByDate(a, date)
        })
        if(!dateSelected) {
            displayProgramByDate(a, date)
        }
    }
}

