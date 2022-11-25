const { User, Thought } = require("../models");

module.exports = {

    // For gettin all users
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

};