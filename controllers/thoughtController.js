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

    // For updating a thought
    updateThought(req, res) {
        Thought.findOneAndUpdate(
            { _id: req.params.thoughtId },
            { $set: req.body },
            { runValidators: true, new: true }
        )
            .then((thought) =>
                !thought
                    ? res.status(404).json({ message: "Thought not found with that ID!" })
                    : res.json(thought)
            )
            .catch((err) => res.status(500).json(err));
    },

    // For removing a thought and thought's reactions
    removeThought(req, res) {
        Thought.findOneAndDelete({ _id: req.params.thoughtId })
            .then((thought) =>
                !thought
                    ? res.status(404).json({ message: "Thought not found with that ID!" })
                    : Thought.deleteMany({ _id: { $in: thought.reactions } })
            )
            .then(() => res.json({ message: "Successfully removed thought and thought's reactions" }))
            .catch((err) => res.status(500).json(err));
    },

    // For creating a reaction to thought
    createReaction(req, res) {
        Thought.findOneAndUpdate(
            { _id: req.params.thoughtId },
            { $addToSet: { reactions: req.body } },
            { runValidators: true, new: true }
        )
            .then((thought) => {
                !thought
                    ? res.status(404).json({ message: "Thought not found with that ID!" })
                    : res.json(thought);
            })
            .catch((err) => res.status(500).json(err));
    },

    // For removing a reaction to thought
    removeReaction(req, res) {
        Thought.findOneAndUpdate(
            { _id: req.params.thoughtId },
            { $pull: { reactions: { reactionId: req.params.reactionId } } },
            { runValidators: true, new: true }
        )
            .then((thought) => {
                !thought
                    ? res.status(404).json({ message: "Thought not found with that ID!" })
                    : res.json(thought);
            })
            .catch((err) => res.status(500).json(err));
    },

};