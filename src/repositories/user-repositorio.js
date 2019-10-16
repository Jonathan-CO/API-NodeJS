const mongoose = require('mongoose')
const User = mongoose.model('User')

exports.get = ()=>{
    return User.find({
        active: true
    }, 'name tel address')
}

exports.getById = (id)=>{
    return User.findById(
        id, 'name sex tel address tags')
}

exports.getByTag = (tags)=>{
    return User.find({
        tags: tags,
        active: true
    }, 'name sex tel address')
}

exports.create = (user)=>{
    return user.save()
}

exports.update = (id, data)=>{
    return User.findByIdAndUpdate( id, {
        $set:{
            name: data.name,
            sex: data.sex,
            birthdate: data.birthdate,
            tel: data.tel,
            address: data.address,
            tags: data.tags
        }
    })
}


exports.delete = (id)=>{
    return User.deleteOne( {_id: id} )
}