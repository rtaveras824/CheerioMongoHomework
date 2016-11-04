var mongoose = require('mongoose');

var Schema = mongoose.Schema;

var ArticleSchema = new Schema({
	title: {
		type: String,
		trim: true,
		required: "This needs a title."
	},
	summary: {
		type: String,
		trim: true,
		required: "This needs a summary"
	}
	note: {
		type: Schema.Types.ObjectId,
		ref: 'Note'
	}
});

var Article = mongoose.model('Article', ArticleSchema);

module.exports = Article;