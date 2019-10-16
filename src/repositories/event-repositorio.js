const mongoose = require('mongoose')
const Event = mongoose.model('Event')

 exports.get = async ()=>{
     const res = await Event.find({ }, 'name date place staff').populate('staff.workers.worker').populate('staff.group')
     return res
}

exports.create = async (event)=>{
    await event.save()
}
