
const express = require('express')
const app = express()
const port = 3000

const restaurantList = require('./restaurant.json')
const exphbs = require('express-handlebars')


app.engine('handlebars', exphbs({ defaultLayout: 'main' }))
app.set('view engine', 'handlebars')

app.use(express.static('public'))


app.get('/', (req, res) => {
  res.render('index', { restaurants: restaurantList.results })
})

app.get('/restaurants/:restaurants_id', (req, res) => {
  const restaurant = restaurantList.results.find(item => item.id.toString() === req.params.restaurants_id)
  res.render('show', { restaurant: restaurant })
})

app.get('/search', (req, res) => {
  const keyword = req.query.keyword
  const restaurants = restaurantList.results.filter(restaurant => {
    return restaurant.name.toLowerCase().includes(keyword.toLowerCase()) || restaurant.name_en.toLowerCase().includes(keyword.toLowerCase()) || restaurant.category.includes(keyword) || restaurant.location.includes(keyword)
  })
  res.render('index', { restaurants: restaurants, keyword: keyword })
})


app.listen(port, () => {
  console.log(`Express is running on http://localhost:${port}`)
})