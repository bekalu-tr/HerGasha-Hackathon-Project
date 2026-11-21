import multer from "multer";

// Allowed file types
const allowedMimeTypes = ["image/jpeg", "image/png", "application/pdf"];

// Configure memory storage
const storage = multer.memoryStorage();

// File validation
const fileFilter = (req, file, callback) => {
  if (!allowedMimeTypes.includes(file.mimetype)) {
    return callback(new Error("Only JPEG, PNG and PDF files are allowed"));
  }

  callback(null, true);
};

// Configure upload
const upload = multer({
  storage,
  fileFilter,

  limits: {
    fileSize: 5 * 1024 * 1024, // 5 MB per file
    files: 3,
    fields: 10,
  },
});

// Export upload middleware
export const uploadEvidence = upload.array("evidence", 3);
