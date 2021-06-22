//console.log('Client side javascript file is loaded')



// take first forme in the page and so on
const weatherForm = document.querySelector('form')
const search = document.querySelector('input')
const messOne = document.querySelector('#message-1')
const messTwo = document.querySelector('#message-2')
const messThree = document.querySelector('#message-3')

//messOne.textContent = 'Text Content'


weatherForm.addEventListener('submit', (e) => {
    // prevent from reloading the page
    e.preventDefault()

    const location = search.value

    messOne.textContent = 'Loading'
    messTwo.textContent = ''

    if(location !== ""){

        fetch('/weather?adress=' + location).then((response) =>{
        //for localhost
//fetch('http://127.0.0.1:3000/weather?adress=' + location).then((response) =>{        
            //console.log(response)
            response.json().then((data) => {
        
                if(data.error){
                    messOne.textContent = data.error
                    console.log(data.error)
                }else{
                    //messTwo.textContent = 'Location: ' + data.location + 'Forecast: ' + data.forecast
                    messOne.textContent = data.location
                    messTwo.textContent = data.forecast
                    messThree.textContent = data.temperature
                    console.log(data.location)
                    console.log(data.forecast)
                }
                
            })
        })
    }

    console.log(location)
})