const multer = require("multer");

module.exports = (multer({
  storage: multer.diskStorage({
    destination: function (req, file, cb) {
      cb(null, process.cwd() + "/src/public/upload");
    },
    filename: function (req, file, cb) {
      // Change this environment variable to .jpeg, .jpg or .png.
      cb(null, Date.now() + process.env.PROFILE_PIC_FORMAT);
    },
  }),
    fileFilter: (req, file, cb) => {
        const imgExtension = ['image/png', 'image/jpg', 'image/jpeg'].find
            (acceptedFormat => acceptedFormat == file.mimetype);
        
        if (imgExtension) {
            return cb(null, true);
        }
        return cb(null, false);
    }
}));
