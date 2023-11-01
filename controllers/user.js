const {Thought, User} = require('../models');

// This is the beginning of what will be exported.
const userControl = {

// Getting all users
    getUsers(req, res) {
        User.find({})            
            .then((userData) => res.json(userData))
            .catch((err) => {
                res.status(500).json(err);
            });
    },

// Note to self: __v is for tracking the version

// Getting a specific user
    singleUser(req, res) {
        User.findOne( {_id: req.params.id} )
            .then((userData) => res.json(userData))                
            .catch((err) => {
                res.status(500).json(err);
            });
    },

// Posting a user
    createUser(req, res) {
        User.create(req.body)
            .then((userData) => res.json(userData))
            .catch((err) => {
                res.status(500).json(err);
            });
    },

// Updating a user
    updateUser(req, res) {
        User.findOneAndUpdate(
            {_id: req.params.id},
            {$set: req.body},
            {runValidators: true,
            new: true}
            )
            .then((userData) => {
                if (!userData) {
                    res.status(404).json({
                        message: 'Invalid user ID',
                    });
                } else {
                    res.status(200).json({
                        message: 'User updated',
                        user: userData,
                    });
                } 
            })
            .catch((err) => {
                res.status(500).json(err);
            });
    },

// Deleting a user and all thoughts from that user
    deleteUser(req, res) {
        User.findOneAndDelete( {_id: req.params.id} )
        .then((userData) => {
            if (!userData) {
                return res.status(404).json({
                    message: 'Invalid user ID',
                });                    
            }
            Thought.deleteMany( {username: userData.username} )
            .then((result) => {
                res.status(200).json({
                    message: 'User destroyed',});
            })
            .catch((thoughtsError) => {
                res.status(500).json({
                    message: 'There was an error while deleting this user\'\s thoughts'
                });
            });
        })
        .catch((err) => {
            res.status(500).json(err);
        });
    },

// Adding a friend
    addFriend(req, res) {
        User.findByIdAndUpdate(
            req.params.id,
            {$push: {friends: req.params.friendId} },
            {new: true}
        )
        .then((friendData) => {
            if (!friendData) {
                res.status(404).json({
                    message: 'Invalid user ID',
                });
            } else {
                res.status(200).json({
                    message: 'Friends updated',
                    user: friendData,
                });
            }
        })
        .catch((err) => {
            res.status(500).json(err);
        });
    },
      
// Removing a friend
    deleteFriend(req, res) {
        User.findByIdAndUpdate(
            {_id: req.params.id},
            {$pull: {friends: req.params.friendId} },
            {new: true}
        )
            .then((friendData) => {
                if(!friendData) {
                    res.status(404).json({
                        message: 'Invalid user ID',
                    });
                } else {
                    res.status(200).json({
                        message: 'You are no longer friends',
                        user: friendData,
                    });
                }
            })
            .catch((err) => {
                res.status(500).json(err);
            });
    },
};

module.exports = userControl;