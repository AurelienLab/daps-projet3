import data from '/data/articles.json' assert { type: 'json' }

document.addEventListener('DOMContentLoaded', function() {
    const urlParams = new URLSearchParams(window.location.search);
    const articleId = parseInt(urlParams.get('id'));

    const article = data.find(article => article.id === articleId)

    if(!article) {
        abort404()
    } else {
        const dateOptions = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' };

        article.datetime = new Date(article.datetime)
        document.querySelector('#article_title').innerHTML = article.title
        document.querySelector('.page-hero').style = `background-image: url('${article.cover}')`
        document.querySelector('#article_date').innerHTML = 'Le ' + article.datetime.toLocaleDateString('fr-FR', dateOptions)
        document.querySelector('#article_content').innerHTML = nl2br(article.content)
    }
})

function abort404() {
    document.querySelector('#article_title').innerHTML = "Article introuvable"
    // document.querySelector('.movie-page__content__heading').remove()
    const content = document.querySelector('.article-page__content')
    content.classList.add('error404')
    content.innerHTML = `
    <img src="/assets/images/error-404.svg" alt="Page introuvable">
    <p>L'article que vous recherchez semble introuvable !</p>
    `
}

function nl2br (str, is_xhtml) {
    if (typeof str === 'undefined' || str === null) {
        return '';
    }
    var breakTag = (is_xhtml || typeof is_xhtml === 'undefined') ? '<br />' : '<br>';
    return (str + '').replace(/([^>\r\n]?)(\r\n|\n\r|\r|\n)/g, '$1' + breakTag + '$2');
}