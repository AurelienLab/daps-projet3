let movies = [];
let dateSelected = false;
fetch('/data/movies.json')
    .then((response) => response.json())
    .then((data) => populate(data))

function populate(moviesData) {

    for(let movie of moviesData) {
        movie.projected_at = new Date(movie.projected_at)
        movies.push(movie)
    }

    const dateSelector = document.querySelector('.date-selector')

    if(dateSelector !== null) {
        const daysOfWeek = ['dim.', 'lun.', 'mar.', 'mer.', 'jeu.', 'ven.', 'sam.'];
        const monthes = ['jan.', 'fev.', 'mars', 'avr.', 'mai', 'juin', 'jui.', 'août', 'sep.', 'oct.', 'nov.', 'dec.']

        for(let date of getDatesList()) {
            const a = document.createElement('a')
            a.classList.add('date-selector__date')
            a.setAttribute('href', '#')

            a.innerHTML = `
              <span class="date-selector__date__day">${daysOfWeek[date.getDay()]}</span>
              <span class="date-selector__date__number">${date.getDate()}</span>
              <span class="date-selector__date__month">${monthes[date.getMonth()]}</span>
            `

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

