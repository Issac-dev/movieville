const express = require("express");
const bodyParser = require("body-parser");
const encoder = bodyParser.urlencoded();
const path = require("path")
const app = express();
const router = express.Router();
app.use("/assets", express.static("assets"));
const torrentSearch = require("torrent-search-api");
torrentSearch.enableProvider('Torrent9');
torrentSearch.enableProvider('Yts');
torrentSearch.enableProvider('KickassTorrents');
torrentSearch.enableProvider('1337x');

app.set('views', './views')
app.set('views', path.join(__dirname, 'views'))
app.set('view engine', 'ejs')

app.get("/", function (req, res) {
    res.sendFile(__dirname + "/views/index.html")
})

app.post("/movies", encoder, function (req, res) {
    var movie = req.body.movie;
    async function start() {
        const torrent = await torrentSearch.search(movie)
        // console.log(torrent)
        return torrent;
    }
    var torrents = start()
    torrents.then(function (result) {
        console.log(result)
        names = []
        links = []
        for (let i = 0; i < result.length; i++) {
            var name = result[i].title
            var link = result[i].desc
            names.push(name)
            links.push(link)
            console.log(name, ":", link)
        }
        res.render('movies', { values: result, lim: result.length })
    })
})

// app.get("/movies", function (req, res) {
//     res.sendFile(__dirname + "/views/movies.html")
// })

const PORT = process.env.PORT || 4000;
app.listen(PORT, () => console.log(`server running on port ${PORT}`))