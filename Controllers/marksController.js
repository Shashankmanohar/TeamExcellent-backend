import marksSchema from "../Models/marksModel.js";

// ---------------- SCHOLARSHIP CALCULATOR ----------------
const calculateScholarship = (percentage) => {
  if (percentage >= 50) {
    return percentage; 
  }
  return 50; 
};

// ---------------- ADD MARKS ----------------
export const addMarks = async (req, res) => {
  try {
    const {
      studentName,
      schoolName,
      fatherName,
      dateofBirth,
      contactNumber,
      physics,
      chemistry,
      maths,
      biology,
      aptitude,
    } = req.body;

    // ✅ Validate all fields
    if (
      !studentName ||
      !schoolName ||
      !fatherName ||
      !dateofBirth ||
      !contactNumber ||
      physics === undefined ||
      chemistry === undefined ||
      maths === undefined ||
      biology === undefined ||
      aptitude === undefined
    ) {
      return res.status(400).json({ message: "All fields are required" });
    }

    // ✅ Convert to numbers
    const physicsNum = Number(physics);
    const chemistryNum = Number(chemistry);
    const mathsNum = Number(maths);
    const biologyNum = Number(biology);
    const aptitudeNum = Number(aptitude);

    // ✅ Total & percentage
    const totalNum =
      physicsNum + chemistryNum + mathsNum + biologyNum + aptitudeNum;
    const percentage = ((totalNum / 50) * 100).toFixed(2);

    // ✅ Scholarship calculation
    const scholarshipPercent = calculateScholarship(Number(percentage));

    // ✅ Save
    const newMarks = new marksSchema({
      studentName,
      schoolName,
      fatherName,
      dateofBirth,
      contactNumber,
      physics: physicsNum,
      chemistry: chemistryNum,
      maths: mathsNum,
      biology: biologyNum,
      aptitude: aptitudeNum,
      total: totalNum,
      percentage,
      scholarshipPercent,
    });

    await newMarks.save();
    res.status(201).json({
      message: "Marks added successfully",
      percentage,
      scholarshipPercent,
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
    res.status(500).json({ message: "Server error", error: error.message });
  }
};

// ---------------- GET STUDENT MARKS ----------------
export const getStudentMarks = async (req, res) => {
  try {
    const { contactNumber, studentName, dateofBirth } = req.body;
    if (!contactNumber || !studentName || !dateofBirth) {
      return res.status(400).json({
        message: "Contact number, student name and date of birth are required",
      });
    }

    const marks = await marksSchema.findOne({
      contactNumber,
      studentName,
      dateofBirth,
    });

    if (!marks) {
      return res.status(404).json({ message: "Marks not found" });
    }

    res.status(200).json(marks);
  } catch (error) {
    res.status(500).json({ message: "Server error", error: error.message });
  }
};

// ---------------- DELETE MARKS ----------------
export const deleteMarks = async (req, res) => {
  try {
    const { id } = req.params;
    const deletedMarks = await marksSchema.findByIdAndDelete(id);
    if (!deletedMarks) {
      return res.status(404).json({ message: "Marks not found" });
    }
    res.status(200).json({ message: "Marks deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: "Server error", error: error.message });
  }
};

// ---------------- UPDATE MARKS ----------------
export const updateMarks = async (req, res) => {
  try {
    const { id } = req.params;
    const {
      studentName,
      schoolName,
      fatherName,
      dateofBirth,
      contactNumber,
      physics,
      chemistry,
      maths,
      biology,
      aptitude,
    } = req.body;

    // ✅ Convert to numbers
    const physicsNum = Number(physics);
    const chemistryNum = Number(chemistry);
    const mathsNum = Number(maths);
    const biologyNum = Number(biology);
    const aptitudeNum = Number(aptitude);

    // ✅ Recalculate totals and scholarship
    const totalNum =
      physicsNum + chemistryNum + mathsNum + biologyNum + aptitudeNum;
    const percentage = ((totalNum / 50) * 100).toFixed(2);
    const scholarshipPercent = calculateScholarship(Number(percentage));

    const updatedMarks = await marksSchema.findByIdAndUpdate(
      id,
      {
        studentName,
        schoolName,
        fatherName,
        dateofBirth,
        contactNumber,
        physics: physicsNum,
        chemistry: chemistryNum,
        maths: mathsNum,
        biology: biologyNum,
        aptitude: aptitudeNum,
        total: totalNum,
        percentage,
        scholarshipPercent,
      },
      { new: true }
    );

    if (!updatedMarks) {
      return res.status(404).json({ message: "Marks not found" });
    }

    res.status(200).json({
      message: "Marks updated successfully",
      updatedMarks,
    });
  } catch (error) {
    res.status(500).json({ message: "Server error", error: error.message });
  }
};
