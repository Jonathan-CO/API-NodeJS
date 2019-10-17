
const mongoose = require('mongoose')
const User = mongoose.model('User')

const ValidationContract = require('../validators/validator')
const repository = require('../repositories/user-repositorio')
const authService = require('../services/auth-services')


//Utilizando Promises
// exports.get = (req,res,next)=>{

//     repository.get().then((users)=>{
//         res.status(200).send({users: users})
//     }).catch((err)=>{
//         res.status(400).send({message: "Erro ao listar usuários", data: erro})
//     })
// }

exports.get = async (req, res, next) => {
    try {
        var data = await repository.get()
        res.status(200).send(data)
    } catch (error) {
        res.status(500).send({
            message: 'Falha ao processar a requisição'
        })
    }
}


exports.getById = async (req, res, next) => {

    try {
        var data = await repository.getById(req.params.id)
        res.status(200).send(data)
    } catch (error) {
        res.status(500).send({
            message: 'Falha ao processar a requisição'
        })
    }
}

exports.getByTag = async (req, res, next) => {

    try {
        var data = await repository.getByTag(req.params.tag)
        res.status(200).send(data)
    } catch (error) {
        res.status(500).send({
            message: 'Falha ao processar a requisição'
        })
    }
}

exports.post = async (req, res, next) => {

    let contract = new ValidationContract();

    contract.hasMinLen(req.body.name, 3, 'O nome deve conter pelo menos 3 letras')

    if (!contract.isValid()) {
        res.status(200).send(contract.errors()).end()
        return
    }
    var user = new User()
    user.name = req.body.name
    user.sex = req.body.sex
    user.birthdate = req.body.birthdate
    user.tel = req.body.tel
    user.email = req.body.email
    user.password = req.body.password
    user.address = req.body.address
    user.tags = req.body.tags.toLowerCase()
    user.roles = req.body.roles

    try {
        await repository.create(user)

        res.status(200).send({
            message: "Usuário cadastrado com sucesso",
        })
    } catch (error) {
        res.status(500).send({
            message: 'Falha ao processar a requisição'
        })
    }
}

exports.put = async (req, res, next) => {
    try {
        await repository.update(req.params.id, req.body)
        res.status(200).send({
            message: "Usuário editado com sucesso"
        })
    } catch (error) {
        res.status(500).send({
            message: 'Falha ao processar a requisição'
        })
    }
}

exports.delete = async (req, res, next) => {
    try {
        await repository.delete(req.params.id)
        res.status(200).send({ message: "Usuário removido com sucesso" })
    } catch (error) {
        res.status(500).send({
            message: 'Falha ao processar a requisição'
        })
    }
}

exports.authenticate = async (req, res, next) => {

    try {
        const user = await repository.authenticate({
            email: req.body.email,
            password: req.body.password
            // password: md5(req.body.password + global.SALT_KEY)
        })

        if (!user) {
            res.status(404).send({
                message: 'Usuário ou Senha inválidos'
            })
            return
        }

        const token = await authService.generateToken({
            id: user._id, //quando necessitar do ID do usuário
            name: user.name,
            email: user.email,
            roles: user.roles
        })


        res.status(200).send({
            token: token,
            data: {
                name: user.name,
                email: user.email,
                roles: user.roles
            }
        })

    } catch (error) {
        res.status(500).send({
            message: 'Falha ao processar a requisição'
        })
    }
}

exports.refreshToken = async (req, res, next) => {

    try {

        const token_refresh = req.body.token || req.query.token || req.headers['x-access-token']
        const data = await authService.decodeToken(token_refresh)
        // //data.campo_do_token

        const user = await repository.getById(data.id)

        if (!user) {
            res.status(404).send({
                message: 'Usuário não encontrado'
            })
            return
        }

        const token = await authService.generateToken({
            id: user._id, //quando necessitar do ID do usuário
            name: user.name,
            email: user.email,
            roles: user.roles
        })


        res.status(200).send({
            token: token,
            data: {
                name: user.name,
                email: user.email,
                roles: user.roles
            }
        })

    } catch (error) {
        res.status(500).send({
            message: 'Falha ao processar a requisição'
        })
    }
}