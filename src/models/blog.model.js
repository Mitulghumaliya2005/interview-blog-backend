import mongoose from 'mongoose';

let BlogSchema = mongoose.Schema({
    title: {
        type: String,
        required: true
    },
    content: {
        type: String,
        required: true
    }
},{
    timestamps: true
});

export const blogModel = mongoose.model('Blog', BlogSchema);


