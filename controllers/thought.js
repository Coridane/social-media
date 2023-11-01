const {Thought, User} = require('../models');

// This is the beginning of what will be exported.
const thoughtControl = {

// Getting all thoughts
    getThoughts(req, res) {
        Thought.find({})
            .then((thoughtData) => res.json(thoughtData))
            .catch((err) => res.status(500).json(err));            
    },

// Getting a specific thought
    singleThought(req, res) {
        Thought.findOne( {_id: req.params.id} )
            .then((thoughtData) => {
                !thoughtData
                ? res.status(404).json( {message: "Invalid thought ID",})
                : res.json(thoughtData);
            })
            .catch((err) => {
                res.status(500).json(err);
            });
    },

// Posting a thought
    createThought(req, res) {        
        Thought.create(req.body)        
            .then((thoughtData) => {
                console.log(thoughtData)
                return User.findOneAndUpdate(
                    { _id: req.body.userId },
                    { $push: { thoughts: thoughtData._id} },
                    { new: true }
                );
            })            
            .then ((userData) => {
                console.log(userData)
                if(!userData) {
                    return res.status(404).json( {message: 'Invalid user ID'} )
                } 
                res.json( {message: "Thought created"} );
            })
            .catch((err) => res.status(500).json(err));
        },

// Updating a thought
    updateThought( {params, body}, res) {
        Thought.findOneAndUpdate( {_id: params.id }, body, {
            new: true,
            runValidators: true,            
        })
        .then((updatedThought) => {
            if(!updatedThought) {
                return res.status(404).json( {message: "Invalid thought ID",})
            } else {
                res.json(updatedThought);
            }
        })
        .catch((err) => res.json(err));
    },

// Deleting a thought
    deleteThought(req, res) {
        Thought.findOneAndDelete( {_id: req.params.id })
            .then((thoughtData) => {
                !thoughtData
                ? res.status(404).json( {message: "Invalid thought ID",})
                : res.status(200).json( {message: "Thought destroyed"})
            })
            .catch((err) => {
                res.status(500).json(err);
            });
    },

// Posting response to a thought
    createResponse(req, res) {
        Thought.findOneAndUpdate(
            {_id: req.params.thoughtId},
            {$addToSet: { responses: req.body} },
            {runValidators: true, new: true}
        )
            .then((thoughtData) => {
                if (!thoughtData) {
                    return res.status(404).json( {message: "Invalid response ID"} );
                }
                res.json( {message: "Response added", thoughtData});
            })
            .catch((err) => {
                res.status(500).json(err);
            });
    },

// Deleting response to a thought
    deleteResponse(req, res) {
        Thought.findOneAndUpdate(
            {_id: req.params.thoughtId },
            {$pull: { response: {responseId: req.params.responseId} }}
            )
            .then((thoughtData) => {
                !thoughtData
                ? res.status(404).json( {message: "Invalid response ID",})
                : res.status(200).json( {message: "Response destroyed"})
            })
            .catch((err) => {
                res.status(500).json(err);
            });
    },
};

module.exports = thoughtControl;