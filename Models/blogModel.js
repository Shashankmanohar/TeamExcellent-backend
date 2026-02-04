import mongoose from 'mongoose';

const blogSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true,
        trim: true
    },
    permalink: {
        type: String,
        required: true,
        unique: true,
        trim: true,
        lowercase: true
    },
    description: {
        type: String,
        required: true
    },
    excerpt: {
        type: String,
        trim: true,
        default: ''
    },
    featuredImage: {
        type: String,
        trim: true,
        default: ''
    },
    categories: {
        type: String,
        trim: true,
        default: ''
    },
    author: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Admin',
        required: true
    },
    published: {
        type: Boolean,
        default: false
    },
    datePosted: {
        type: Date,
        default: Date.now
    }
}, { timestamps: true });

// Index for faster permalink lookups
blogSchema.index({ permalink: 1 });

// Index for filtering published blogs
blogSchema.index({ published: 1, datePosted: -1 });

const Blog = mongoose.model('Blog', blogSchema);

export default Blog;
