import mongoose from 'mongoose';

const enrollmentSchema = new mongoose.Schema({
    fullName: {
        type: String,
        required: [true, 'Full name is required'],
        trim: true
    },
    mobileNumber: {
        type: String,
        required: [true, 'Mobile number is required'],
        trim: true
    },
    email: {
        type: String,
        trim: true,
        lowercase: true
    },
    course: {
        type: String,
        required: [true, 'Course selection is required']
    },
    city: {
        type: String,
        required: [true, 'City is required'],
        trim: true
    },
    query: {
        type: String,
        trim: true
    }
}, {
    timestamps: true
});

const Enrollment = mongoose.model('Enrollment', enrollmentSchema);
export default Enrollment;
