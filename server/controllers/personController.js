const fs = require("fs");

const ApiError = require("../error/ApiError");
const { Person } = require("../models/models");
const path = require("path");
const uuid = require("uuid");

class PersonController {
  async create(req, res, next) {
    try {
      let { name, description, momId, dadId, userId } = req.body;
      const { image } = req.files;
      // todo: transliterate file name, check ' '
      let fileName = uuid.v4() + "-" + image.name;
      image.mv(path.resolve(__dirname, "..", "static", fileName));
      const person = await Person.create({
        name,
        description,
        image: fileName,
        userId,
        momId,
        dadId,
      });
      console.log({ person });
      return res.json(person);
    } catch (e) {
      next(ApiError.badRequest(e.message));
    }
  }

  async getAll(req, res) {
    let { userId, limit, page } = req.query;
    page = page || 1;
    limit = limit || 9;
    let offset = page * limit - limit;
    let persons;
    if (userId) {
      persons = await Person.findAndCountAll({
        where: { userId },
        limit,
        offset,
        order: [["id", "DESC"]],
      });
    }
    //console.log({ persons });

    return res.json(persons);
  }

  async getOne(req, res) {
    const { id } = req.params;
    const person = await Person.findOne({ where: { id } });
    return res.json(person);
  }

  async deleteOne(req, res, next) {
    try {
      const { id } = req.params;
      const person = await Person.findOne({ where: { id } });
      await person.destroy();
      await fs.unlink(
        path.resolve(__dirname, "..", "static", person.image),
        () => console.log(`file ${person.image} deleted`)
      );
      return res.json({ message: `Person ${person.name} was deleted from db` });
    } catch (e) {
      next(ApiError.badRequest(e.message));
    }
  }
}

module.exports = new PersonController();
