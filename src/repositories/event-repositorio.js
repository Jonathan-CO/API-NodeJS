const mongoose = require('mongoose')
const Event = mongoose.model('Event')

 exports.get = async ()=>{
     const res = await Event.find({ }, 'name date place').populate('staff.workers.worker', "name").populate('staff.group', "name style contact")
     return res
}

exports.create = async (event)=>{
    await event.save()
}
