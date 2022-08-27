// packages needed in this file
const express = require('express')
const validUrl = require('valid-url')
const shortid = require('shortid')

// creating express route handler
const Shortrouter = express.Router()

//get URL model
const Url = require('../models/url.model')



const baseUrl = 'https://u-s-a.herokuapp.com'



//write a post request for shortning
Shortrouter.post('/shorten', async (req, res) => {
    
    const {
        longUrl,customUrl,expiry
    } = req.body 

    //checking url is valid or not
    if (!validUrl.isUri(baseUrl)) {
        return res.status(401).json('Invalid base URL')
    }

    //checking if custom url is present or not and accordingly setting the  urlcode
    if(customUrl){
        var urlCode= customUrl + Math.floor(Math.random()*100)
    }else{
        urlCode = shortid.generate()
    }
     

   
    if (validUrl.isUri(longUrl)) {
        try {
            let url = await Url.findOne({
                longUrl
            })
            if (url) {
                //if url is already present then get that fro db
                    res.status(201).json(url)
            } else {

                


                //else create the short url
                   const  shortUrl = baseUrl + '/' +  urlCode
                url = new Url({
                    longUrl,
                    shortUrl,
                    urlCode,
                    createdAt: new Date(),
                    expiry
                })
                await url.save()
                res.status(201).json(url)
            }
        }
        
        catch (err) {
            
            console.log(err)
            res.status(500).json('Server Error')
        }
    } else {
        res.status(401).json('Invalid longUrl')
    }
})

module.exports = Shortrouter