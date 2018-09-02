// is-invalid is-valid

const zipForm = document.getElementById('zipForm')

const alertMessage = () => {
    const message = `<div class="alert alert-danger">
                        <strong>Danger</strong> Something went wrong
                    </div>`
    setTimeout(() => {
        if (document.querySelector('#output').innerHTML == message) {
            document.querySelector('#output').innerHTML = ''
        }
    }, 2000)

    return message
}
const clearInput = (el) => {
    el.value = ''
}
const showIcon = (icon) => {

    document.querySelector('.fa-check').classList.add('d-none')
    document.querySelector('.fa-times').classList.add('d-none')

    document.querySelector('.icon-place').classList.add('d-none')

    if (document.querySelector('.icon-place').classList.contains('d-none')) {
        document.querySelector('.icon-place').classList.remove('d-none')
        document.querySelector(`.${icon}`).classList.remove('d-none')

    }

}
const displayData = (country, placeName, state, longitude, latitide, zip) => {

    return `<div class="card">
                <div class="card-header">
                    Location info about place with ${zip} zip code
                    <span 
                    data-toggle="modal" data-target="#myModal"
                    class="float-right turn-off" style="cursor:pointer">&times;</span> 
                </div>
                <div class="card-body">
                    <p class="card-text">
                        <strong>Country: </strong>${country}
                    </p>
                    <p class="card-text">
                        <strong>City: </strong>${placeName}
                    </p>
                     <p class="card-text">
                        <strong>State: </strong> ${state}
                    </p>
                    <p class="card-text">
                        <strong>Longitude: </strong> ${longitude}
                    </p>
                    <p class="card-text">
                        <strong>Latitude: </strong> ${latitide}
                    </p>
                    <button class="btn btn-success btn-block">Find on the map</button>
                </div>
            </div>`

}

const addEventListenerToCards = () => {
    if (document.querySelectorAll('turn-off') === 0) {
        return 0
    } else {
        document.querySelectorAll('.turn-off').forEach(el => el.addEventListener('click', (e) => {
            e.target.parentElement.parentElement.remove()
        }))
    }
}
const getLocationInfo = (e) => {
    e.preventDefault()
    console.log(e.target.zipCode.value)
    const zip = e.target.zipCode.value
    const country = e.target.country.value

    fetch(`http://api.zippopotam.us/${country}/${zip}`)
        .then(resp => {
            if (resp.status !== 200) {
                document.querySelector('#output').innerHTML = alertMessage()
                showIcon('fa-times')
                throw Error(resp.statusText)

            }
            else {
                showIcon('fa-check')
                return resp.json()
            }
        })
        .then(data => {

            let output = ''

            data.places.forEach(place => {
                output += displayData(data.country, place['place name'], place['state'], place['longitude'], place['latitude'], data['post code'])
            })

            document.getElementById('output').innerHTML = output
            addEventListenerToCards()

        })
        .catch(err => console.log(err))

    clearInput(e.target.zipCode)
}



zipForm.addEventListener('submit', getLocationInfo)

