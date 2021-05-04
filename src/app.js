const path = require('path')
const express= require('express')
const hbs = require('hbs')
const geocode = require('./utils/geocode.js')
const forecast = require('./utils/forecast.js')

const app =express()

const port  = process.env.PORT || 3000
// define paths for express config
const publicDirPath=path.join(__dirname,'../public')
const viewPath =path.join(__dirname,'../templates/views')
const partialPath =path.join(__dirname,'../templates/partials')

// setup hbs ans views location
app.set('view engine' , 'hbs')
app.set('views' , viewPath)
hbs.registerPartials(partialPath)
//setup static directory to serve
app.use(express.static(publicDirPath))

app.get('' ,(req,res)=>{
    res.render('index',{
        title : 'Weather app',
        name : 'Prakhar'
    })
})
app.get('/about' ,(req,res)=>{
    res.render('about',{
        title : 'About page',
        name : 'Prakhar'
    })
})
app.get('/help' ,(req,res)=>{
    res.render('help',{
        title : 'Help Page',
        message : 'Need Help ???',
        name : 'Prakhar'
    })
})
app.get('/weather', (req,res)=>{
    if(!req.query.address) {
        return res.send({
            error : "Enter Address please .. "
        })
    }


    geocode(req.query.address,(error,{lon,lat,loc}={}) =>{
        if(error)
        {
           res.send({
               error
           })
        }
        else {
            forecast(lon, lat, (error,{temp}={}) => {
                if(error)
                {
                    res.send({
                        error
                    })
                }
                else
                {
                    res.send({weather :"Weather in " + loc + " is " + temp + " degree celcius "
                    })
                }
            })
        }

    })

})

app.get('/products',(req,res)=>{
    if(!req.query.search) {
       return  res.send({
            error : "provide a search term"
        })

    }
    console.log(req.query.search)
    res.send({
        products :[]
    })

})

app.get('/help/*',(req,res)=>{
    res.render('404',{
        message : 'Help blog not found!!',
        name : 'Prakhar',
        title : 'This is a not found page'

    })
})

app.get('*',(req,res)=>{
    res.render('404',{
        message : '404 not found !!',
        name : 'Prakhar',
        title : 'This is a not found page'

    })
})
app.listen(port , ()=>{
    console.log('Server is on 3000 port')
})