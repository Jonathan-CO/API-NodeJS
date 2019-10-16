const mongoose = require('mongoose')
const Schema = mongoose.Schema

const schema = new Schema({
    name: {
        type: String,
        required: true,
        trim: true // remove espaços do início e fim da string
    },

    style: {
        type: String,
        required: true,
        trim: true
    },

    contact: {
        type: String,
        required: true
    },

    active: {
        type: Boolean,
        required: true,
        default: true
    },

    members: [{
        member: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'User'
        },

        function: {
            type: String,
            required: true,
            trim: true
        },

        pay: {
            type: Number,
            required: true,
        },
    }]
})

module.exports = mongoose.model('Group', schema)