const mongoose=  require('mongoose');

const subscribeSchema = mongoose.Schema(
    {
        email:{
            type: String,
            required: [true, 'Email is required'],
            unique: true
        },
        subscribedAt:{
            type: Date,
            default: Date.now
        }
    }
)

const subscribe = mongoose.model("Subscriber", subscribeSchema);

module.exports=subscribe;