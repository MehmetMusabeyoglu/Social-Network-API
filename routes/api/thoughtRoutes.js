const router = require('express').Router();

const {
    getThoughts,
    getThought,
    createThought,
    updateThought,
    removeThought,
    createReaction,
    removeReaction,
} = require("../../controllers/thoughtController");

router.route("/").get(getThoughts).post(createThought);

router.route("/:thoughtId").get(getThought).put(updateThought).delete(removeThought);

router.route("/:thoughtId/reactions").post(createReaction);

router.route("/:thoughtId/reactions/:reactionId").delete(removeReaction);

module.exports = router;