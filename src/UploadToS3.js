// 이미지 업로드
const multer = require("multer");
const AWS = require("aws-sdk");
const multerS3 = require("multer-s3");

const s3 = new AWS.S3({
  accessKeyId: process.env.AWS_ACCESSKEY_ID,
  secretAccessKey: process.env.AWS_SECRET_ACCESSKEY,
  region: process.env.AWS_REGION,
});

const upload = multer({
  storage: multerS3({
    s3: s3,
    bucket: "imgstorages",
    key: function(req, file, cb) {
      var ext = file.mimetype.split("/")[1];
      if (!["png", "jpg", "jpeg", "gif", "bmp"].includes(ext)) {
        return cb(new Error("Only images are allowed"));
      }
      cb(null, Date.now() + "." + file.originalname.split(".").pop());
    },
  }),
  acl: "public-read-write",
  limits: { fileSize: 5 * 1024 * 1024 },
});

// 이미지 업로드 요청
router.post("/img", upload.single("file"), async (req, res) => {
  console.log(req.file.location);
  res.status(200).json({ location: req.file.location });
});
