const router = require('express').Router();

// All of the possible paths (based on controller)
const {
    getThoughts,
    singleThought,
    createThought,
    updateThought,
    deleteThought,
    createResponse,
    deleteResponse    
} = require('../../controllers/thought');

// Routes for creating, updating, and deleting thoughts

router.route('/').get(getThoughts).post(createThought);
router.route('/:id').get(singleThought).put(updateThought).delete(deleteThought);

// Routes for creating and deleting responses

router.route('/:thoughtId/responses').post(createResponse);
router.route('/:thoughtId/responses').delete(deleteResponse);

module.exports = router;