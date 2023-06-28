import articlesData from "../../data/articles.json" assert { type: 'json'};

let articles = [];
for (let article of articlesData) {
    article.datetime = new Date(article.datetime)
    articles.push(article)
}

const lastArticles = articles.sort((a,b) => b.datetime - a.datetime)
const container = document.querySelector('.news__list')
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