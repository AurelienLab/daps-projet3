import data from '/data/movies.json' assert { type: 'json' }

let movies = [];
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

console.log(getDatesList())