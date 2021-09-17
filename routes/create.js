const express = require('express')
const router = express.Router()

const Joi = require('joi')
const fs = require('fs')

router.route('/')
.get((req, res) => {
    res.render('create')
})
.post((req, res) => {
    const title = req.body.title
    const body = req.body.body
    const author = req.body.author
    
    const schema = Joi.object({
        title: Joi.string().required(),
        body: Joi.string().required(),
        author: Joi.string().required(),
    })

    const result = schema.validate(req.body)

    //VALIDATION PART

    if(result.error == null) {
        res.render('create', {success: true})
    }

    if (result.error) {
        res.render('create', {error: result.error.details[0].message}).end()
    }

    fs.readFile('./data/posts.json', (err, data) => {
        if (err) throw err

        const posts = JSON.parse(data)

        posts.push({
            id: id(),
            title: title,
            body: body,
            author: author,
        })

        fs.writeFile('./data/posts.json', JSON.stringify(posts), err => {
         if (err) throw err
        })
    })
})

function id () {
    return '_' + Math.random().toString(36).substr(2, 9);
};

module.exports = router