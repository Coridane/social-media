const router = require('express').Router();

// All of the possible paths (based on controller)
const {
    getUsers,
    singleUser,
    createUser,
    updateUser,
    deleteUser,
    addFriend,
    deleteFriend    
} = require('../../controllers/user');

// Routes for creating, updating, and deleting users

router.route('/').get(getUsers).post(createUser);
router.route('/:id').get(singleUser).put(updateUser).delete(deleteUser);

// Routes for creating and deleting friends

router.route('/:id/friends/:friendId').post(addFriend);
router.route('/:id/friends/:friendId').post(deleteFriend);

module.exports = router;