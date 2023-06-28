import moviesData from '/data/movies.json' assert { type: 'json' }
import articlesData from '/data/articles.json' assert { type: 'json' }
document.addEventListener('DOMContentLoaded', function() {
    //Get 6 random movies
    const shuffled = moviesData.sort(() => 0.5 - Math.random());
    let selected = shuffled.slice(0, 6);

    const postersContainer = document.querySelector('.homepage-hero__posters__content')
    postersContainer.innerHTML = '' // Empty the container just in case of ...
    for(let movie of selected) {
        const posterLink = document.createElement('a')
        posterLink.setAttribute('href', 'film.html?id=' + movie.id)
        posterLink.classList.add('homepage-hero__poster')

        const posterImg = document.createElement('img' )
        posterImg.src = movie.poster
        posterImg.alt = 'Affiche de ' + movie.title

        posterLink.appendChild(posterImg)
        posterLink.appendChild(posterImg.cloneNode(true)) //Add second image for ambilight

        postersContainer.appendChild(posterLink)
    }

    //Get 3 last articles

    let articles = [];
    for (let article of articlesData) {
        article.datetime = new Date(article.datetime)
        articles.push(article)
    }

    const lastArticles = articles.sort((a,b) => b.datetime - a.datetime).slice(0, 3)
    const container = document.querySelector('.homepage__articles__list')
    container.innerHTML = '';
    for(let article of lastArticles) {

        const dateOptions = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' };

        const articleBlock = document.createElement('a')
        articleBlock.classList.add('fit-content')
        articleBlock.setAttribute('href', 'article.html?id='+ article.id)
        articleBlock.innerHTML = `
        <article class="article-card">
            <p class="article-card__date">Le ${article.datetime.toLocaleDateString('fr-FR', dateOptions)}</p>
            <img src="${article.cover}" class="article-card__illustration" alt="${article.title}">
            <h3 class="article-card__heading">${article.title}</h3>
        </article>
        `

        container.appendChild(articleBlock)
    }
})