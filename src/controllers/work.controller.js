
const mongoose = require('mongoose')
const Work = mongoose.model('Work')

const ValidationContract = require('../validators/validator')
const repository = require('../repositories/work-repositorio')

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
    var work = new Work()
        work.group = req.body.name
        work.event = req.body.date
        
    try {
        await repository.create(work)
        res.status(200).send({
            message: "Grupo escolhido com sucesso"

        })
    }catch (error) {
        res.status(500).send({
            message: 'Falha ao processar a requisição'
        })
    }
}
