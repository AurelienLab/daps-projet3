const cookieStorage = 'cookiesChoice'

function toggleMenu () {
    const menu = document.querySelector('.header__nav')
    if(menu.classList.contains('open')) {
        menu.classList.remove('open')
    }
    else {
        menu.classList.add('open')
    }

}

function displayCookiesRequest() {
    fetch('partials/cookies.html')
        .then(result => result.text())
        .then(content => {
            const placeHolder = document.createElement('div')
            placeHolder.innerHTML = content
            document.body.append(placeHolder.firstElementChild)
        })
}

function setCookiesChoices() {
    localStorage.setItem(cookieStorage, 'true')
    document.getElementById('cookies-request').remove()
}
document.addEventListener('DOMContentLoaded', function () {
    let storageChoice = localStorage.getItem(cookieStorage)

    if(storageChoice == null) {
        displayCookiesRequest()
    }
})