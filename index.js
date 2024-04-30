const express = require('express');
const fs = require('fs')
const cors = require('cors');
const { Downloader } = require('ytdl-mp3');
const app = express();
const PORT = 4000;

app.use(express.static(__dirname + '/'));
app.get('/', (req, res) => {
	fs.readFile(__dirname + '/index.html', 'utf8', (err, text) => {
		res.send(text);
	});
});

app.use(cors());

app.listen(PORT, () => {
	console.log(`Server Works !!! At port http://localhost:${PORT}`);
});

app.get('/downloadmp3', async (req, res, next) => {
	var URL = req.query.url;

	var dir = './songs';

	if (!fs.existsSync(dir)) {
		fs.mkdirSync(dir);
	}

	const downloader = new Downloader({
		getTags: true,
		outputDir: dir

	});
	await downloader.downloadSong(URL);
});