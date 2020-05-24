const {Router} = require('express')
const router = Router()
const Card = require('../models/card')
const Courses = require('../models/course')

router.post('/add', async (req, res) => {
    const course = await Courses.getById(req.body.id)
    await Card.add(course)
    res.redirect('/card')
})

router.get('/', async (req, res) => {
    const card = await Card.fetch()
    res.render('card', {
        isCard: true,
        title: 'Корзина',
        courses: card.courses,
        price: card.price
    })
})

module.exports = router