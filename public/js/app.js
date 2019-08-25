console.log("in app js");

// fetch('http://puzzle.mead.io/puzzle')
// .then((response) => {
//     response.json()
//     .then((response) => {
//         console.log(response);
        
//     })
// })


var weatherForm = document.querySelector('form')
var searchText = document.querySelector('input')
var p1 = document.querySelector('#message1')
var p2 = document.querySelector('#message2')

weatherForm.addEventListener('submit' , (e) => {
    e.preventDefault()
    const loc = searchText.value
    p1.innerHTML = "Loading..."
    fetch('/weather?address='+ loc)
.then((response) => {
    response.json()
    .then((response) => {
        if(response.error){
            p1.textContent = response.error
        }
        else{
            p1.innerHTML = response.forecast
            p2.innerHTML = response.location

            // console.log(response.forecast)
            // console.log(response.location)
        }
    })      
})
})