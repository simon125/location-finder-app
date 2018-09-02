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
const getLocationInfo = (e) => {
    e.preventDefault()
    console.log(e.target.zipCode.value)
    const zip = e.target.zipCode.value

    fetch(`http://api.zippopotam.us/PL/${zip}`)
        .then(resp => {
            if (resp.status !== 200) {
                document.querySelector('#output').innerHTML = alertMessage()
                throw Error(resp.statusText)
            }
            else {
                return resp.json()
            }
        })
        .then(data => console.log(data))
        .catch(err => console.log(err))

    clearInput(e.target.zipCode)
}



zipForm.addEventListener('submit', getLocationInfo)