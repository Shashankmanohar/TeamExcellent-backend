import marksSchema from "../Models/marksModel.js";

const calculateScholarship = (percentage) => {
  return percentage >= 50 ? percentage : 50;
};

export const addMarks = async (req, res) => {
  try {
    const {
      studentName,
      className,
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

    const totalNum =
      Number(physics) +
      Number(chemistry) +
      Number(maths) +
      Number(biology) +
      Number(aptitude);

    const percentage = ((totalNum / 50) * 100).toFixed(2);
    const scholarshipPercent = calculateScholarship(Number(percentage));

    const newMarks = await marksSchema.create({
      studentName,
      className,
      schoolName,
      fatherName,
      dateofBirth,
      contactNumber,
      physics,
      chemistry,
      maths,
      biology,
      aptitude,
      total: totalNum,
      percentage,
      scholarshipPercent,
    });

    res.status(201).json(newMarks);
  } catch (error) {
    res.status(500).json({ message: "Server error", error: error.message });
  }
};

export const getAllMarks = async (req, res) => {
  try {
    const marks = await marksSchema.find().sort({ createdAt: -1 }); // ✅ Recent first
    res.status(200).json(marks);
  } catch (error) {
    res.status(500).json({ message: "Server error", error: error.message });
  }
};

export const deleteMarks = async (req, res) => {
  try {
    await marksSchema.findByIdAndDelete(req.params.id);
    res.status(200).json({ message: "Deleted" });
  } catch (error) {
    res.status(500).json({ message: "Server error", error: error.message });
  }
};

export const updateMarks = async (req, res) => {
  try {
    const { id } = req.params;
    const data = req.body;

    const totalNum =
      Number(data.physics) +
      Number(data.chemistry) +
      Number(data.maths) +
      Number(data.biology) +
      Number(data.aptitude);

    const percentage = ((totalNum / 50) * 100).toFixed(2);
    const scholarshipPercent = calculateScholarship(Number(percentage));

    data.total = totalNum;
    data.percentage = percentage;
    data.scholarshipPercent = scholarshipPercent;

    const updated = await marksSchema.findByIdAndUpdate(id, data, { new: true });
    res.status(200).json(updated);
  } catch (error) {
    res.status(500).json({ message: "Server error", error: error.message });
  }
};
