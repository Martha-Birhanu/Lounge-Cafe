const mongoose=  require('mongoose');

const foodSchema = mongoose.Schema(
    {
        name:{
            type: String,
            required: [true, 'Name is required'],
            unique: true,
            trim: true
        },
        price: {
            type: Number,
            required:true,
            min: [0, 'Price must be a positive number']

        }, 
        description:{
            type:String,
            required:true,
            trim: true
        },
        // Distinguish between food and drink items
        category: {
            type: String,
            enum: ['food', 'drink'],
            default: 'food',
            trim: true
        },
        img: {
            type: String, // ✅ Use String for image URL
            required: false,
            validate: {
                validator: function (v) {
                    // Allow empty/undefined values as well as valid image URLs
                    return !v || /^https?:\/\/.+\.(jpg|jpeg|png|webp|gif|svg)$/.test(v);
                },
                message: props => `${props.value} is not a valid image URL`
            }
        }
});

const food = mongoose.model("Food", foodSchema);

module.exports=food;