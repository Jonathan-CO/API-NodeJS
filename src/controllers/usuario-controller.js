
const mongoose = require('mongoose')
const Usuario = mongoose.model('Usuarios')

exports.get = (req,res,next)=>{
    Usuario.find({
        active: true
    }, 'name tel address').then((usuarios)=>{
        res.status(200).send({usuarios: usuarios})
    }).catch((err)=>{
        res.status(400).send({message: "Erro ao cadastrar", data: erro})
    })
}


exports.getById = (req,res,next)=>{
    Usuario.findById(req.params.id, 'name sex tel address tags').then((usuarios)=>{
        res.status(200).send({usuarios: usuarios})
    }).catch((err)=>{
        res.status(400).send({message: "Erro ao cadastrar", data: erro})
    })
}


exports.post = (req, res, next)=>{
    var usuario = new Usuario()
        usuario.name = req.body.name
        usuario.sex = req.body.sex
        usuario.birthdate = req.body.birthdate
        usuario.tel = req.body.tel
        usuario.address = req.body.address
        usuario.tags = req.body.tags

    usuario.save().then(()=>{
        res.status(200).send({message: "Produto cadastrado"})
    }).catch((erro)=>{
        res.status(400).send({message: "Erro ao cadastrar", data: erro})
    })
}

exports.put =  (req, res, next)=>{
    const id = req.params.id
    res.status(200).send({ // status 201 = created
        id: id,
        item: req.body 
    })
}

exports.delete = (req, res, next)=>{
    res.status(200).send(req.body) // status 201 = created
}