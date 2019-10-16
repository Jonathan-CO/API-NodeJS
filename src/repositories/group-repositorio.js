const mongoose = require('mongoose')
const Group = mongoose.model('Group')

 exports.get = async ()=>{
     const res = await Group.find({
         active: true
     }, 'name style contact members').populate('members.member')
    
     return res
 }



exports.create = async (group)=>{
    await group.save()
}
