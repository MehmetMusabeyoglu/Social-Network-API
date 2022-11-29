const { User, Thought } = require('../models');

module.exports = {

    // For getting all thoughts
    getThoughts(req, res) {
        Thought.find()
            .then((thought) => res.json(thought))
            .catch((err) => res.status(500).json(err));
    },

    // For getting single thought
    getThought(req, res) {
        Thought.findOne({ _id: req.params.thoughtId })
            .select("-__v")
            .then((thought) =>
                !thought
                    ? res.status(404).json({ message: "Thought not found with that ID!" })
                    : res.json(thought)
            )
            .catch((err) => res.status(500).json(err));
    },

    // For creating a new thought
    createThought(req, res) {
        Thought.create(req.body)
            .then((thought) => {
                return User.findOneAndUpdate(
                    { _id: req.body.userId },
                    { $addToSet: { thoughts: thought._id } },
                    { runValidators: true, new: true }
                );
            })
            .then((thought) => res.json(thought))
            .catch((err) => res.status(500).json(err));
    },

};