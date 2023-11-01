const {Schema, model, Types} = require('mongoose');
// Importing date library: https://www.npmjs.com/package/moment
const moment = require('moment')

const responseSch = new Schema(
    {
        responseId: {
            type: Schema.Types.ObjectId,
            default: () => new Types.ObjectId(),        
        },

        responseBody: {
            type: String,
            required: true,        
            trim: true,
            minlength: 1,
            maxlength: 400,
        },

        username: {
            type: String,
            required: true,
        },

        createdAt: {
            type: Date,
            default: Date.now,
            get: (createdAtValue) =>
            moment(createdAtValue).format("MMM DD, YYYY [at] hh:mm a"),
        },
    },
    // Execute getters when converting document to JSON
    {
        toJSON: {
            virtuals: true,
            getters: true,        
        },
    }
);

const thoughtSch = new Schema(
    {
        thoughtBody: {
            type: String,
            required: true,
            minlength: 1,
            maxlength: 400,
        },

        createdAt: {
            type: Date,
            default: Date.now,
            get: (createdAtValue) =>
            moment(createdAtValue).format("MMM DD, YYYY [at] hh:mm a"),
        },

        username: {
            type: String,
            required: true,
        },
        responses: [responseSch],
    },
    {
        toJSON: {            
            getters: true,
        },
        id: false,
    }
);

thoughtSch.virtual('responseCount').get(function(){
    return this.responses.length;
})

const Thought = model('Thought', thoughtSch);

module.exports = Thought;