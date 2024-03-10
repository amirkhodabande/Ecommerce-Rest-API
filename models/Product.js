const { Schema, model } = require("mongoose");

const productSchema = new Schema({
    name: {
        type: String,
        trim: true,
        required: [true, "please provide name"],
        minlength: 3,
        maxlength: 50
    },
    price: {
        type: Number,
        required: [true, "please provide price"],
        default: 0
    },
    description: {
        type: String,
        trim: true,
        required: [true, "please provide description"],
        minlength: 3,
        maxlength: 1000
    },
    image: {
        type: String,
        required: [true, "please provide image"],
        minlength: 3,
        maxlength: 255
    },
    category: {
        type: String,
        required: [true, "please provide category"],
        enum: {
            values: ['samsung', 'apple'],
            message: '{VALUE} is not supported!'
        }
    },
    colors: {
        type: [String],
        required: [true, "please provide colors"]
    },
    featured: {
        type: Boolean,
        required: true
    },
    freeShipping: {
        type: Boolean,
        required: true
    },
    inventory: {
        type: Number,
        required: true,
        default: 15
    },
    user: {
        type: mongoose.Types.ObjectId,
        ref: 'User',
        required: true
    }
}, { timestamps: true });

module.exports = model('Product', productSchema);