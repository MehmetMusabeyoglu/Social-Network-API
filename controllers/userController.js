const { User, Thought } = require("../models");

module.exports = {

    // For getting all users
    getUsers(req, res) {
        User.find()
            .then((user) => res.json(user))
            .catch((err) => res.status(500).json(err));
    },

    // For getting single user
    getUser(req, res) {
        User.findOne({ _id: req.params.userId })
            .select("-__v")
            .then((user) =>
                !user
                    ? res.status(404).json({ message: "User not found with that ID!" })
                    : res.json(user)
            )
            .catch((err) => res.status(500).json(err));
    },

    //For creating a new user
    createUser(req, res) {
        User.create(req.body)
            .then((user) => res.json(user))
            .catch((err) => res.status(500).json(err));
    },

    //For updating a user
    updateUser(req, res) {
        User.findOneAndUpdate(
            { _id: req.params.userId },
            { $set: req.body },
            { runValidators: true, new: true }
        )
            .then((user) =>
                !user
                    ? res.status(404).json({ message: "User not found with that ID!" })
                    : res.json(user)
            )
            .catch((err) => res.status(500).json(err));
    },

    // For deleting a user and user's thoughts
    deleteUser(req, res) {
        User.findOneAndDelete({ _id: req.params.userId })
            .then((user) =>
                !user
                    ? res.status(404).json({ message: "User not found with that ID!" })
                    : Thought.deleteMany({ _id: { $in: user.thoughts } })
            )
            .then(() => res.json({ message: "Successfully deleted user and user's thoughts" }))
            .catch((err) => res.status(500).json(err));
    },
};