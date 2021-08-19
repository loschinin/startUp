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
  async editOne(req, res, next) {
    try {
      const { name, description, momId, dadId, userId } = req.body;
      console.log({ description });
      const { id } = req.params;
      //console.log("reqFiles:", req.files);
      //const { image } = req.files;
      console.log({ id });
      //console.log({ image });
      console.log({ userId });
      // todo: transliterate file name, check ' '
      const { image, createdAt } = await Person.findOne({ where: { id } });
      console.log("personImage:", image);
      console.log("reqFiles:", req.files);
      const newFileName =
        req && req.files ? uuid.v4() + "-" + req.files.image.name : image;

      if (req && req.files) {
        await req.files.image.mv(
          path.resolve(__dirname, "..", "static", newFileName)
        );
        await fs.unlink(path.resolve(__dirname, "..", "static", image), () =>
          console.log(`file ${image} deleted`)
        );
      }

      await Person.update(
        {
          name,
          description,
          image: newFileName,
          userId,
          momId,
          dadId,
        },
        { where: { id } }
      );
      //console.log({ updatedPerson });
      return res.json({
        name,
        description,
        image: newFileName,
        momId,
        dadId,
        createdAt,
      });
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
    //console.log("PERSON:", person);
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
      return res.json({
        id: person.id,
        message: `Person ${person.name} was deleted from db`,
      });
    } catch (e) {
      next(ApiError.badRequest(e.message));
    }
  }
}

module.exports = new PersonController();
