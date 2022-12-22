const mongoose = require('mongoose');



const Schema = mongoose.Schema;



const userSchema = new Schema({
    name: {type: String, required: true},
    username: {type: String,required: true},
    password: {type: String,required: true},
    requested : [{type: Schema.Types.ObjectId, ref: 'event'}],
    created   : [{type: Schema.Types.ObjectId, ref: 'event'}],
    attending : [{type: Schema.Types.ObjectId, ref: 'event'}],
},
{timestamps: true}
);
module.exports = User = mongoose.model('user', userSchema);
