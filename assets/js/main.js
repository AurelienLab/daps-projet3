function toggleMenu () {
    const menu = document.querySelector('.header__nav')
    if(menu.classList.contains('open')) {
        menu.classList.remove('open')
    }
    else {
        menu.classList.add('open')
    }

}
