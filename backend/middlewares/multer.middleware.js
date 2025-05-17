import multer from "multer";
import path from "path";

// Store file temporarily
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "uploads/"); // temp local storage
  },
  filename: function (req, file, cb) {
    cb(null, Date.now() + path.extname(file.originalname));
  },
});

const upload = multer({ storage });

export { upload };

//* this could be used for memory storage
// import multer from "multer";

// const storage = multer.memoryStorage(); // keeps file in buffer
// const upload = multer({ storage });

// export { upload };
