
const mongoose = require('mongoose')
const Usuario = mongoose.model('Usuarios')

exports.get = (req,res,next)=>{
    Usuario.find({
        active: true
    }, 'name tel address').then((usuarios)=>{
        res.status(200).send({usuarios: usuarios})
    }).catch((err)=>{
        res.status(400).send({message: "Erro ao listar usuários", data: erro})
    })
}


exports.getById = (req,res,next)=>{
    Usuario.findById(req.params.id, 'name sex tel address tags').then((usuarios)=>{
        res.status(200).send({usuarios: usuarios})
    }).catch((err)=>{
        res.status(400).send({message: "Erro ao buscar usuário", data: erro})
    })
}

exports.getByTag = (req, res, next)=>{
    Usuario.find({
        tags: req.params.tag,
        active: true
    }, 'name sex tel address').then((usuarios)=>{
        res.status(200).send({usuarios: usuarios})
    }).catch((err)=>{
        res.status(400).send({message: "Erro ao buscar usuário", data: erro})
    })
}


exports.post = (req, res, next)=>{
    var usuario = new Usuario()
        usuario.name = req.body.name
        usuario.sex = req.body.sex
        usuario.birthdate = req.body.birthdate
        usuario.tel = req.body.tel
        usuario.address = req.body.address
        usuario.tags = req.body.tags.toLowerCase()

    usuario.save().then(()=>{
        res.status(200).send({message: "Usuário cadastrado com sucesso"})
    }).catch((erro)=>{
        res.status(400).send({message: "Erro ao cadastrar usuário", data: erro})
    })
}

exports.put =  (req, res, next)=>{
    Usuario.findByIdAndUpdate( req.params.id, {
        $set:{
            name: req.body.name,
            sex: req.body.sex,
            birthdate: req.body.birthdate,
            tel: req.body.tel,
            address: req.body.address,
            tags: req.body.tags
        }
    }).then(()=>{
        res.status(200).send({message: "Usuário editado com sucesso"})
    }).catch((erro)=>{
        res.status(400).send({message: "Erro ao editar o usuário", data: erro})
    })
}

exports.delete = (req, res, next)=>{
    res.status(200).send(req.body) // status 201 = created
}