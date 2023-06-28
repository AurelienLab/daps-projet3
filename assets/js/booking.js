const dateOptions = { weekday: 'long', month: 'long', day: 'numeric' };
let moviesData = []
fetch('/data/movies.json')
    .then((response) => response.json())
    .then((data) => {
        moviesData = data
    })

function bindButtons() {
    const buttons = document.querySelectorAll('.book-button')

    for(let button of buttons) {
        button.addEventListener('click', function (e) {
            e.preventDefault()
            openBookingModal(button.getAttribute('data-movie-id'))
        })
    }
}

function resetBookingModal() {
    document.querySelector('#booking-amount').value = 1;
    document.querySelector('#modal_movie_title').innerHTML = '';
    document.querySelector('#modal_movie_date').innerHTML = ''
    document.querySelector('#modal_movie_time').innerHTML = ''
}

function setBookingModalData(id) {
    const movie = moviesData.find(movie => movie.id === parseInt(id))
    movie.projected_at = new Date(movie.projected_at)

    document.querySelector('#modal_movie_title').innerHTML = movie.title;
    document.querySelector('#modal_movie_date').innerHTML = movie.projected_at.toLocaleDateString('fr-FR', dateOptions)
    document.querySelector('#modal_movie_time').innerHTML = movie.projected_at.getHours() +'h'+ String(movie.projected_at.getMinutes()).padStart(2, 0)
}

function openBookingModal(id) {
    const modal = document.querySelector('.booking-modal')
    resetBookingModal()
    setBookingModalData(id)
    modal.classList.add('visible')

    bindModalInputs()
}

function closeModal() {
    const modals = document.querySelectorAll('.modal')
    for(let modal of modals) {
        modal.classList.remove('visible')
    }
}
function bindModalInputs() {
    const input = document.querySelector('#booking-amount')
    input.addEventListener('blur', function(e) {
        const el = e.currentTarget
        if(el.value > el.getAttribute('max')) {
            el.value = el.getAttribute('max')
        }

        if(el.value < el.getAttribute('min')) {
            el.value = el.getAttribute('min')
        }
    })

    const form = document.querySelector('.booking-modal__form')
    form.addEventListener('submit', function(e) {
        e.preventDefault()
        bookingValidate()
    })
}

function addPerson() {
    const input = document.querySelector('#booking-amount')

    if(input.value-1 <= input.getAttribute('max')) {
        input.value++
    }
}

function removePerson() {
    const input = document.querySelector('#booking-amount')

    if(input.value-1 >= input.getAttribute('min')) {
        input.value--
    }
}

function bookingValidate() {
    const validationModal = document.querySelector('.validation-modal')
    const input = document.querySelector('#booking-amount')
    const reservationAmountString = input.value > 1 ? ' pour '+ input.value + ' personnes ': ' ';
    document.querySelector(".validation-modal .modal__modal__content__text").innerHTML = "Votre demande de réservation" + reservationAmountString + "a bien été prise en compte 🥳<br><br> Nous avons hâte de vous retrouver à la projection !"

    closeModal()
    validationModal.classList.add('visible')
}