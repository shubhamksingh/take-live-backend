const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const eventSchema = new Schema({
    name: {type: String, required: true},
    description: {type: String, required: true},
    date: {type: Date, required: true},
    limit : {type: Number, required: true},
    category: {type: String, required: true},
    others : {type: String},
    // time: {type: String, required: true},
    // location: {type: String},
    // creator: {type: Schema.Types.ObjectId, ref: 'user'},
    // attendees: [{type: Schema.Types.ObjectId, ref: 'user'}],
    // pending: [{type: Schema.Types.ObjectId, ref: 'user'}],
    },
    {timestamps: true}
);

// export 
module.exports = Event = mongoose.model('event', eventSchema);
