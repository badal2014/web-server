const path = require('path')
const express = require('express')
const hbs = require('hbs')
const geocode = require('./utils/geocode')
const forecast = require('./utils/forecast')

const app = express();
const port = process.env.PORT || 3000


//Define path for express Config
const publicDirPath = path.join(__dirname, '../public');
const viewsPath = path.join(__dirname, '../template/views')
const partialsPath = path.join(__dirname, '../template/partials')

//Setup handleBars and views location
app.set('view engine', 'hbs')
app.set('views', viewsPath)
hbs.registerPartials(partialsPath)

//Setup static directory to serve
app.use(express.static(publicDirPath));

app.get('', (req, res) => {
    res.render('index', {
        title: 'Weather App',
        name: 'Badal Huria'
    })
})

app.get('/about', (req, res) => {
    res.render('about', {
        title: 'About Me',
        name: 'Badal Huria'
    })
})
app.get('/help', (req, res) => {
    res.render('help', {
        title: 'Please Help Me',
        helpNote: 'I Want Some Help'
    })
})

app.get('/about', (req, res) => {
    res.send('About Page')
})

app.get('/products' , (req,res) => {
    if(!req.query.search){
        return res.send({
            error : 'You must provide search term'
        })
    }
    res.send({
        product : []
    })
})

app.get('/weather' , (req,res) => {
    if(!req.query.address){
        return res.send({
            error : 'You must provide address to find weather'
        })
    }
    geocode(req.query.address , (error , {  longitude,latitude, location } ={}) => {
        if(error){
            return res.send({error})
        }
        console.log(longitude , latitude)
        forecast(longitude,latitude, (error , response) => {

            if(error){
                return res.send({error})
            }
            const temp = response.body.currently.summary
            res.send({
                forecast : temp,
                location : location,
                address : req.query.address
            })
        })
    })
})


app.get('/help/*' , (req,res) => {
    res.render('error' , {
        title : '404' , 
        errorMessage : "Help Article Not Found",
        name : "Badal Huria"
    })
})
app.get('*' , (req , res)=> {
    res.render('error' ,{
        // title : '404',
        errorMessage : "Page Not Found"
    })
})

app.listen(port, () => {
    console.log('Server is up on port 3000');
})