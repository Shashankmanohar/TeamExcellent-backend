import Enrollment from "../Models/enrollmentModel.js";

// @desc    Submit a new enrollment
// @route   POST /api/enrollments
// @access  Public
export const createEnrollment = async (req, res) => {
    try {
        const { fullName, mobileNumber, email, course, city, query } = req.body;

        // Basic validation in controller as well
        if (!fullName || !mobileNumber || !course || !city) {
            return res.status(400).json({ message: 'Please fill all required fields' });
        }

        const enrollment = new Enrollment({
            fullName,
            mobileNumber,
            email,
            course,
            city,
            query
        });

        const savedEnrollment = await enrollment.save();
        res.status(201).json({
            message: 'Enrollment submitted successfully',
            enrollment: savedEnrollment
        });
    } catch (error) {
        console.error('Create enrollment error:', error);
        res.status(500).json({ message: 'Server error', error: error.message });
    }
};

// @desc    Get all enrollments
// @route   GET /api/enrollments
// @access  Private/Admin
export const getEnrollments = async (req, res) => {
    try {
        const enrollments = await Enrollment.find().sort({ createdAt: -1 });
        res.status(200).json({ enrollments });
    } catch (error) {
        console.error('Get enrollments error:', error);
        res.status(500).json({ message: 'Server error', error: error.message });
    }
};

// @desc    Delete an enrollment
// @route   DELETE /api/enrollments/:id
// @access  Private/Admin
export const deleteEnrollment = async (req, res) => {
    try {
        const enrollment = await Enrollment.findByIdAndDelete(req.params.id);
        if (!enrollment) {
            return res.status(404).json({ message: 'Enrollment not found' });
        }
        res.status(200).json({ message: 'Enrollment deleted successfully' });
    } catch (error) {
        console.error('Delete enrollment error:', error);
        res.status(500).json({ message: 'Server error', error: error.message });
    }
};
