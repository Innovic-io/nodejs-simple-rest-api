const pets = require("./pets.mock");
const { validateDTO } = require("../common/helper");
const Router = require("express").Router();
const { PetService } = require("./pets.services");

const petService = new PetService();

Router.get("/", function(req, res) {

  return res.json(pets.pets);
});

Router.get("/:id", function(req, res) {

  try {

    const item = petService.getSingle(req.params.id);

    return res.status(200).json(item);

  } catch (e) {

    return res.status(400).json({
      error: e.message
    });

  }

});

Router.delete("/:id", function(req, res) {

  try {

    const item = petService.deleteSingle(req.params.id);

    return res.status(200).json(item);

  } catch (e) {

    return res.status(400).json({
      error: e.message
    });

  }

});

Router.post("/", function(req, res) {

  const properties = ["id?", "category?", "name", "photoUrls?", "tags?", "status", "examinations?"];

  if (!validateDTO(req.body, properties)) {

    return res.status(400).json({
      error: "DTO is not valid"
    });
  }

  const pet = petService.create(req.body);

  return res.status(201).json(pet);
});

Router.put("/:id", function(req, res) {

  const properties = ["name?", "status?", "owner?"];

  if (!validateDTO(req.body, properties)) {

    return res.status(400).json({
      error: "DTO is not valid"
    });
  }


  try {

    const item = petService.updatePet(req.params.id, req.body);

    return res.status(200).json(item);

  } catch (err) {

    return res.status(400).json({
      message: err.message
    });
  }


});

module.exports = {
  Router
};
