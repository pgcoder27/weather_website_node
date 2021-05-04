const request = require('request')
const geocode = (location , callback) =>{

    const url = 'https://api.mapbox.com/geocoding/v5/mapbox.places/' +location+ '.json?access_token=pk.eyJ1IjoicHJha2hhcjI3IiwiYSI6ImNrbzFmMjV4ZjBhaGUydm1tdWdseDNycXoifQ.DfdjFMackjJ2SmpP8SCaZg&limit=1'
    request({url,json : true},(error,{body} = {}) =>{
        if(error)
        {
            callback('Check your wifi !! ',undefined)
        }
        else if(body.features.length==0)
        {
            callback('Enter correct location !!', undefined)
        }
        else
        {
            callback(undefined , {
                lat :body.features[0].center[1],
                lon : body.features[0].center[0],
                loc : body.features[0].place_name
            })
        }
    })

}

module.exports  = geocode
