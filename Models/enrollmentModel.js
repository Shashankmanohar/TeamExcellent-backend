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
        required: [true, 'Course selection is required'],
        enum: [
            'Class 6',
            'Class 7',
            'Class 8',
            'Class 9',
            'Class 10',
            'Class 11 Studying (for Engineering)',
            'Class 11 Studying (for Medical)',
            'Class 12 Studying (for Engineering)',
            'Class 12 Studying (for Medical)',
            'Class 12 Pass (for Engineering)',
            'Class 12 Pass (for Medical)'
        ]
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
