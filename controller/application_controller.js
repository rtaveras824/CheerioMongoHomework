var express = require('express'),
	router = express.Router(),
	request = require('request'),
	cheerio = require('cheerio'),
	moment = require('moment'),
	mongoose = require('mongoose');

mongoose.connect('mongodb://localhost/nytimesscrape');
var db = mongoose.connection;

db.on('error', function(err) {
	console.log('Mongoose Error: ', err);
});

db.once('open', function() {
	console.log('Mongoose connection successful.');
});

var Article = require('../model/Article.js');
var Note = require('../model/Note.js');

router.get('/', function(req, res) {
	request('https://www.nytimes.com', function(err, response, html) {

		$ = cheerio.load(html);

		var articles = $('article.story');
		var j = 0;

		articles.each(function(i, element) {
			// Only getting 10 articles
			if (j < 10) {

				// Empty object to store title and summary
				// to put in Article
				var result = {};

				var title = $(this).find('.story-heading').text();
				var summary = $(this).find('.summary').text();

				if (title && summary) {
					j++;

					result.title = title;
					result.summary = summary;

					var entry = new Article(result);
					entry.save(function(err, doc) {
						if (err) {
							console.log(err);
						} else {
							console.log(doc);
						}
					});
				} else {
					console.log(i + ' No Summary');
				}
			}
		});
	});
});

router.get('/json', function(req, res) {
	Article.find({}, function(err, articles) {
		if (err) {
			console.log(err);
		} else {
			res.json(articles);
		}
	})
})

module.exports = router;