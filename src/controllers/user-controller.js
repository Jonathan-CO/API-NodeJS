
const mongoose = require('mongoose')
const User = mongoose.model('User')

const ValidationContract = require('../validators/validator')
const repository = require('../repositories/user-repositorio')

exports.get = (req,res,next)=>{

    repository.get().then((users)=>{
        res.status(200).send({users: users})
    }).catch((err)=>{
        res.status(400).send({message: "Erro ao listar usuários", data: erro})
    })
}

exports.getById = (req,res,next)=>{
    repository.getById(req.params.id).then((users)=>{
        res.status(200).send({users: users})
    }).catch((err)=>{
        res.status(400).send({message: "Erro ao buscar usuário", data: erro})
    })
}

exports.getByTag = (req, res, next)=>{
    repository.getByTag(req.params.tag).then((users)=>{
        res.status(200).send({users: users})
    }).catch((err)=>{
        res.status(400).send({message: "Erro ao buscar usuário", data: erro})
    })
}

exports.post = (req, res, next)=>{

    let contract = new ValidationContract();

    contract.hasMinLen(req.body.name, 3, 'O nome deve conter pelo menos 3 letras')

    if(!contract.isValid()){
        res.status(200).send(contract.errors()).end()
        return
    }
    var user = new User()
        user.name = req.body.name
        user.sex = req.body.sex
        user.birthdate = req.body.birthdate
        user.tel = req.body.tel
        user.address = req.body.address
        user.tags = req.body.tags.toLowerCase()

    repository.create(user).then(()=>{
        res.status(200).send({message: "Usuário cadastrado com sucesso"})
    }).catch((erro)=>{
        res.status(400).send({message: "Erro ao cadastrar usuário", data: erro})
    })
}

exports.put =  (req, res, next)=>{
    repository.update(req.params.id, req.body).then(()=>{
        res.status(200).send({message: "Usuário editado com sucesso"})
    }).catch((erro)=>{
        res.status(400).send({message: "Erro ao editar o usuário", data: erro})
    })
}

exports.delete = (req, res, next)=>{
    repository.delete(req.params.id).then(()=>{
        res.status(200).send({message: "Usuário removido com sucesso"})
    }).catch((erro)=>{
        res.status(400).send({message: "Erro ao remover o usuário", data: erro})
    }) 
}

