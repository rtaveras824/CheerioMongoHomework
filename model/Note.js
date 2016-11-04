var mongoose = require('mongoose');

var Schema = mongoose.Schema;

var NoteSchema = new Schema({
	message: {
		type: String,
		required: "This is needs text."
	}
});

var Note = mongoose.model('Note', NoteSchema);

module.exports = Note;