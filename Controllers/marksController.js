import marksSchema from "../Models/marksModel.js";

// Scholarship function moved here instead of utils
const calculateScholarship = (percentage) => {

  if (percentage >= 91) return { percent: 90 };
  if (percentage >= 81) return { percent: 85 };
  if (percentage >= 71) return { percent: 80 };
  if (percentage >= 61) return { percent: 75 };
  if (percentage >= 51) return { percent: 70 };
  return { percent: 65 };
};
export const addMarks = async (req, res) => {
  try {
    const {
      studentName,schoolName, fatherName, dateofBirth, contactNumber,
      physics, chemistry, maths, biology, aptitude, total
    } = req.body;

    if (
      !studentName || !schoolName || !fatherName  || !dateofBirth || !contactNumber ||
      physics === undefined || chemistry === undefined || maths === undefined ||
      biology === undefined || aptitude === undefined || total === undefined
    ) {
      return res.status(400).json({ message: "All fields are required" });
    }

    const physicsNum = Number(physics);
    const chemistryNum = Number(chemistry);
    const mathsNum = Number(maths);
    const biologyNum = Number(biology);
    const aptitudeNum = Number(aptitude);
    const totalNum = Number(total);

    // Percentage (assuming total is already calculated correctly)
    const percentage = totalNum*2

    // Calculate scholarship
    const { percent } = calculateScholarship(percentage);

    const newMarks = new marksSchema({
      studentName,schoolName, fatherName, dateofBirth, contactNumber,
      physics: physicsNum, chemistry: chemistryNum, maths: mathsNum,
      biology: biologyNum, aptitude: aptitudeNum, total: totalNum,
      percentage,
      scholarshipPercent: percent
    });

    await newMarks.save();

    res.status(201).json({
      message: "Marks added successfully",
      percentage,
      scholarshipPercent: percent,
    });
  } catch (error) {
    console.error("❌ Error in addMarks:", error);
    res.status(500).json({ message: "Server error", error: error.message });
  }
};


// ---------------- GET ALL MARKS ----------------
export const getAllMarks = async (req, res) => {
  try {
    const marks = await marksSchema.find();
    res.status(200).json(marks);
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
};

// ---------------- GET STUDENT MARKS ----------------
export const getStudentMarks = async (req, res) => {
  try {
    const { contactNumber, studentName, dateofBirth } = req.body;
    if (!contactNumber || !studentName || !dateofBirth) {
      return res.status(400).json({ message: 'Contact number, student name and date of birth are required' });
    }
    const marks = await marksSchema.findOne({ contactNumber, studentName, dateofBirth });
    if (!marks) {
      return res.status(404).json({ message: 'Marks not found' });
    }   
    res.status(200).json(marks);
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
};

// ---------------- DELETE MARKS ----------------
export const deleteMarks = async (req, res) => {
  try {
    const { id } = req.params;
    const deletedMarks = await marksSchema.findByIdAndDelete(id);
    if (!deletedMarks) {
      return res.status(404).json({ message: 'Marks not found' });
    }
    res.status(200).json({ message: 'Marks deleted successfully' });
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
};

// ---------------- UPDATE MARKS ----------------
export const updateMarks = async (req, res) => {    
  try {   
    const { id } = req.params;
    const { studentName, fatherName, motherName, dateofBirth, contactNumber, physics, chemistry, maths, biology, aptitude, total } = req.body;

    // re-calculate scholarship when updating
    const percentage = total;
    const { percent, amount } = calculateScholarship(percentage);

    const updatedMarks = await marksSchema.findByIdAndUpdate(
      id, 
      { studentName, fatherName, motherName, dateofBirth, contactNumber, physics, chemistry, maths, biology, aptitude, total, percentage, scholarshipPercent: percent, scholarshipAmount: amount }, 
      { new: true }
    );

    if (!updatedMarks) {
      return res.status(404).json({ message: 'Marks not found' });
    }
    res.status(200).json({ message: 'Marks updated successfully', updatedMarks });
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
};
