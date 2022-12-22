const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const eventSchema = new Schema({
    name: {type: String, required: true},
    description: {type: String, required: true},
    date: {type: Date, required: true},
    // time: {type: String, required: true},
    // location: {type: String},
    limit : {type: Number, required: true},
    category: {type: String, required: true},
    others : {type: String},
    creator: {type: Schema.Types.ObjectId, ref: 'user'},
    attendees: [{type: Schema.Types.ObjectId, ref: 'user'}],
    pending: [{type: Schema.Types.ObjectId, ref: 'user'}],
    },
    {timestamps: true}
);


module.exports = Event = mongoose.model('event', eventSchema);
