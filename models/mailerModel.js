const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const mailerSchema = new Schema({
    fName: {type: String, required: true},
    lName: {type: String, required: true},
    email: {type: String, required: true}
})

module.exports = mongoose.model('Mailer', mailerSchema)