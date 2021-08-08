const ApiError = require('../error/ApiError');
const {Person} = require('../models/models')
const path = require('path');
const uuid = require('uuid')

class PersonController {
    async create(req, res, next) {
        try {
            let { name, description, userId, momId, dadId} = req.body
            const {image} = req.files
            let fileName = uuid.v4() + ".jpg"
            image.mv(path.resolve(__dirname, '..', 'static', fileName))
            const person = await Person.create({name, description, image: fileName, userId, momId, dadId});
            console.log({person})
            return res.json(person)
        } catch (e) {
            next(ApiError.badRequest(e.message))
        }
    }

    async getAll(req, res) {
        let {userId, limit, page} = req.query
        page = page || 1
        limit = limit || 9
        let offset = page * limit - limit
        let persons;
        if (userId) {
            persons = await Person.findAndCountAll({where:{userId}, limit, offset})
        }
        return res.json(persons)
    }

    async getOne(req, res) {
        const {id} = req.params
        const person = await Person.findOne({where: {id}})
        return res.json(person)
    }


}

module.exports = new PersonController()