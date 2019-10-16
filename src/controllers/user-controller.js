
const mongoose = require('mongoose')
const User = mongoose.model('User')

const ValidationContract = require('../validators/validator')
const repository = require('../repositories/user-repositorio')


//Utilizando Promises
// exports.get = (req,res,next)=>{

//     repository.get().then((users)=>{
//         res.status(200).send({users: users})
//     }).catch((err)=>{
//         res.status(400).send({message: "Erro ao listar usuários", data: erro})
//     })
// }

exports.get = async (req,res,next)=>{
    try {
        var data = await repository.get()
        res.status(200).send(data)
    } catch (error) {
        res.status(500).send({
            message: 'Falha ao processar a requisição'
        })
    }
}


exports.getById = async(req,res,next)=>{

    try {
        var data = await repository.getById(req.params.id)
        res.status(200).send(data)
    } catch (error) {
        res.status(500).send({
            message: 'Falha ao processar a requisição'
        })
    }
}

exports.getByTag = async(req, res, next)=>{

    try {
        var data = await repository.getByTag(req.params.tag)
        res.status(200).send(data)
    } catch (error) {
        res.status(500).send({
            message: 'Falha ao processar a requisição'
        })
    }
}

exports.post = async (req, res, next)=>{

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

    try {
        await repository.create(user)
        res.status(200).send({
            message: "Usuário cadastrado com sucesso"

        })
    }catch (error) {
        res.status(500).send({
            message: 'Falha ao processar a requisição'
        })
    }
}

exports.put =  async (req, res, next)=>{
    try {
        await repository.update(req.params.id, req.body)
        res.status(200).send({
            message: "Usuário editado com sucesso"
        })
    }catch (error) {
        res.status(500).send({
            message: 'Falha ao processar a requisição'
        })
    }
} 

exports.delete = async (req, res, next)=>{
    try {
        await repository.delete(req.params.id)
        res.status(200).send({message: "Usuário removido com sucesso"})
    } catch (error) {
        res.status(500).send({
            message: 'Falha ao processar a requisição'
        })
    }
} 

