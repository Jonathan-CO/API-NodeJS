
const mongoose = require('mongoose')
const Event = mongoose.model('Event')

const ValidationContract = require('../validators/validator')
const repository = require('../repositories/event-repositorio')

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
    var event = new Event()
        event.name = req.body.name
        event.date = req.body.date
        event.arrive = req.body.arrive
        event.start = req.body.start
        event.place = req.body.place
        event.staff = req.body.staff

    try {
        await repository.create(event)
        res.status(200).send({
            message: "Evento criado com sucesso"

        })
    }catch (error) {
        res.status(500).send({
            message: 'Falha ao processar a requisição'
        })
    }
}
