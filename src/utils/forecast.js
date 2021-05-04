const request =require('request')


const forecast = (lon ,lat , callback) =>{

    const url = 'http://api.weatherstack.com/current?access_key=6a06e27c93728393e0479597bf27604c&query='+lat+',' +lon

    request({ url ,json : true},(error,{body}={}) =>{
        if(error)
        {
            callback('Check your wifi !!',undefined)
        }
        else if(body.error)
        {
           callback('Enter correct coordinates !!',undefined)
        }
        else
        {
            callback(undefined,{
              temp : body.current.temperature
            })
        }
    })

}

module.exports =forecast