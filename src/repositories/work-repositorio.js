const mongoose = require('mongoose')
const Work = mongoose.model('Work')

 exports.get = async ()=>{
     const res = await Work.find({
         active: true
     }, 'group event')
    
     return res
 }



exports.create = async (work)=>{
    await work.save()
}
