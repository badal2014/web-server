const request = require('request')

const forecast = (longitude , latitude , callback) => {
    console.log("badal" ,longitude , latitude)
    const url = "https://api.darksky.net/forecast/9f78b81db6c942cc0ace7c54f7751302/" + latitude + "," + longitude +"  "
    request({url , json : true} , (error , body) => {
        if(error){
            callback("Could Not connect to server" , undefined);
        }
        else if(body.error){
            callback("Cannot Find location. Please Try Different Location" , undefined)
        }else{
            // callback(undefined , ((body.currently.temperature)-32)* 5/9 )
            callback(undefined , ((body))  )

        }
    })
}
module.exports = forecast