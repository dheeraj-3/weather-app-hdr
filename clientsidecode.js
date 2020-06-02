// console.log('Hello')
// alert('Working')

const wForecast = document.querySelector('form')
const search = document.querySelector('input')
const message1 = document.querySelector('#message-1')
const message2 = document.querySelector('#message-2')

message1.textContent = 'Loading message'
message2.textContent = '' 

wForecast.addEventListener('submit', (e)=> {
    e.preventDefault()
    // console.log(search.value)
    if(!search.value) {
        // console.log('Enter a valid address')
        message2.textContent = 'Enter a valid address'
    } else {
        fetch('http://localhost:3000/weather/?address=' + search.value).then((response) => {
    response.json().then((data) => {
        if(data.error) {
            // console.log(data.error)
            message2.textContent = 'Error'
        } else {
            // console.log(data.address)
            // console.log(data.temp)
            message1.textContent = data.address
            message2.textContent = data.temp


        }
        
    })
})
    }
})

