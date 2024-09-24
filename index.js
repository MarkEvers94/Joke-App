import express from 'express'
import axios from "axios"


const app = express()
const port = 3000
const URL = "https://v2.jokeapi.dev/joke/"

app.use(express.static('public'))
app.set('view engine', 'ejs')
app.use(express.urlencoded({ extended: true }));


app.get('/', (req, res) => {
    res.render('index')
})

app.get('/submit', async (req, res) => {
    try {
        const choice = req.query.choice;
        const result = await axios.get(URL + `${choice}?type=single`)
        res.render('index', {content: result.data.joke, selectedChoice: choice})
    } catch (error) {
        res.status(400).send(error.message)
    }
})

app.listen(port, () => {
    console.log(`Listening on port: ${port}`)
})

