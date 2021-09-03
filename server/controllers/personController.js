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
      // todo: transliterate file name
      let fileName = uuid.v4() + "-" + image.name.replace(" ", "_");
      image.mv(path.resolve(__dirname, "..", "static", fileName));
      const person = await Person.create({
        name,
        description,
        image: fileName,
        userId,
        momId,
        dadId,
      });
      return res.json(person);
    } catch (e) {
      next(ApiError.badRequest(e.message));
    }
  }
  async editOne(req, res, next) {
    try {
      const { name, description, momId, dadId, userId } = req.body;
      const { id } = req.params;
      // todo: transliterate file name, check ' '
      const person = await Person.findOne({
        where: { id },
      });
      if (+userId !== person.userId) {
        next(
          ApiError.forbidden(
            "UserIds are not equal, you cannot edit this person"
          )
        );
      }

      const newFileName =
        req && req.files
          ? uuid.v4() + "-" + req.files.image.name.replace(" ", "_")
          : person.image;

      if (req && req.files) {
        await req.files.image.mv(
          path.resolve(__dirname, "..", "static", newFileName)
        );
        await fs.unlink(
          path.resolve(__dirname, "..", "static", person.image),
          () => console.log(`file ${person.image} deleted`)
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
        { where: { id, userId } }
      );
      //console.log({ updatedPerson });
      return res.json({
        name,
        description,
        image: newFileName,
        momId,
        dadId,
        createdAt: person.createdAt,
      });
    } catch (e) {
      next(ApiError.badRequest(e.message));
    }
  }

  async getAll(req, res) {
    let { limit, page } = req.query;
    page = page || 1;
    limit = limit || 9;
    let offset = page * limit - limit;
    let persons;
    persons = await Person.findAndCountAll({
      limit,
      offset,
      order: [["createdAt", "DESC"]],
    });

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
      const { userId } = req.body;
      console.log({ userId });
      const person = await Person.findOne({ where: { id } });
      if (userId === person.userId) {
        await person.destroy();
        await fs.unlink(
          path.resolve(__dirname, "..", "static", person.image),
          () => console.log(`file ${person.image} deleted`)
        );
        return res.json({
          id: person.id,
          message: `Person ${person.name} was deleted from db`,
        });
      } else {
        next(
          ApiError.forbidden(
            "UserIds are not equal, you cannot delete this person"
          )
        );
      }
    } catch (e) {
      next(ApiError.badRequest(e.message));
    }
  }
}

module.exports = new PersonController();
