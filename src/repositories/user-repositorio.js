const mongoose = require('mongoose')
const User = mongoose.model('User')

exports.get = async ()=>{
    const res = await User.find({
        active: true
    }, 'name tel address')
    
    return res
}

exports.getById = async (id)=>{
    const res = User.findById(id)
    return res
}

// exports.getById = async (id)=>{
//     const res = User.findById(
//         id, 'name sex tel address tags')

//     return res
// }

exports.getByTag = async (tags)=>{
    const res =  User.find({
        tags: tags,
        active: true
    }, 'name sex tel address')

    return res
}

exports.create = async (user)=>{
    await user.save()
}

exports.update = async (id, data)=>{
    await User.findByIdAndUpdate( id, {
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


exports.delete = async (id)=>{
    await User.deleteOne( {_id: id} )
}

exports.authenticate = async (data)=>{
    const res = await User.findOne({
        email: data.email,
        password: data.password
    })
    
    return res
}
