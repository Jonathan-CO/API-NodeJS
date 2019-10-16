const mongoose = require('mongoose')
const Schema = mongoose.Schema

const schema = new Schema({
    group: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Group'
    },

    event: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Event'
    },

    workers: [{ // identificação de todos que trabalharam
        worker: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'User',
        },

        perform:{
            type: Boolean,
            default: true
        }

    }]
})

module.exports = mongoose.model('Work', schema)