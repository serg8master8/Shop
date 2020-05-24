const {Router} = require('express')
const router = Router()
const Curse = require('../models/course')

router.get('/', (req, res) => {
    res.render('add', {
        title: 'Добавить курс',
        isAdd: true
    })
})

router.post('/', async (req, res) => {
    console.log(req.body)
    const curse = new Curse(req.body.title,req.body.price,req.body.img)
    await curse.save()
    res.redirect('/courses')
})

module.exports = router