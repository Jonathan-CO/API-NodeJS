const mongoose = require('mongoose')
const Schema = mongoose.Schema

const schema = new Schema({
    name:{
        type: String,
        required: true,
        trim: true // remove espaços do início e fim da string
    },
    
    date:{
        type: Date,
        required: true,
    },

    arrive: {
        type: Date
    },

    start: {
        type: Date,
        required: true
    },

    place: {
        type: String,
        required: true,
    },

    staff: [
        {
            group: {
                type: mongoose.Schema.Types.ObjectId,
                ref: 'Group'
            },

            workers: [{
                worker: {
                    type: mongoose.Schema.Types.ObjectId,
                    ref: 'User',
                },
        
                perform:{
                    type: Boolean,
                    default: true
                }
            }]
        }
    ]

})

module.exports = mongoose.model('Event', schema)