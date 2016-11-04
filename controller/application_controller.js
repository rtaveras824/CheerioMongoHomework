var express = require('express'),
	router = express.Router(),
	request = require('request'),
	cheerio = require('cheerio'),
	moment = require('moment'),
	mongoose = require('mongoose');

router.get('/', function(req, res) {
	request('https://www.nytimes.com', function(err, response, html) {

		$ = cheerio.load(html);

		var articles = $('article.story');
		var j = 0;

		articles.each(function(i, element) {
			if (j < 10) {
				var title = $(this).find('.story-heading').text();
				var summary = $(this).find('.summary').text();
				if (title && summary) {
					console.log(i + ' ' + summary);
					j++;
					
				} else {
					console.log(i + ' No Summary');
				}
				
			}
		})
	})
})

module.exports = router;