const Router = require("express");
const router = new Router();
const personController = require("../controllers/personController");

router.post("/", personController.create);
router.get("/", personController.getAll);
router.get("/:id", personController.getOne);
router.patch("/:id", personController.editOne);
router.delete("/:id", personController.deleteOne);
module.exports = router;
