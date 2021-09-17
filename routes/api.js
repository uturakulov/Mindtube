const express = require('express')
const router = express.Router()

const fs = require('fs')

router.get('/', (req, res) => {
    fs.readFile('./data/posts.json', (err, data) => {
        if (err) throw err
        
        const posts = JSON.parse(data)
        res.json(posts)
    })
})

module.exports = router