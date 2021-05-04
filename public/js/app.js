const weatherForm = document.querySelector('form[name="weatherform"]')
const search =document.querySelector("input[name='location']")
const message_1 =document.querySelector("#message_1")


weatherForm.addEventListener('submit',(e) =>{
    e.preventDefault()
    message_1.textContent = 'Loading .....'
    const location = search.value
    const url ='/weather?address='+location
    fetch(url).then((response)=>{
        response.json().then((data)=>{
            if(data.error) {
                message_1.textContent=data.error
                return
            }
           message_1.textContent=data.weather
        })
    })
})