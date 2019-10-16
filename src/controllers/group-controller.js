
const mongoose = require('mongoose')
const Group = mongoose.model('Group')

const ValidationContract = require('../validators/validator')
const repository = require('../repositories/group-repositorio')


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

exports.post = async (req, res, next)=>{

    let contract = new ValidationContract();

    contract.hasMinLen(req.body.name, 3, 'O nome deve conter pelo menos 3 letras')

    if(!contract.isValid()){
        res.status(200).send(contract.errors()).end()
        return
    }
    var group = new Group()
        group.name = req.body.name
        group.style = req.body.style
        group.foundation = req.body.foundation
        group.contact = req.body.contact

    try {
        await repository.create(group)
        res.status(200).send({
            message: "Grupo cadastrado com sucesso"

        })
    }catch (error) {
        res.status(500).send({
            message: 'Falha ao processar a requisição'
        })
    }
}
