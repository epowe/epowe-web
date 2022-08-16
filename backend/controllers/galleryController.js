const asyncHandler = require("express-async-handler");

const { upload } = require("./awsController");

//asyncHandler를 통해 try catch 안써도 된다.
const createGallery = asyncHandler(async (req, res) => {
  // 리엑트에서 보낸 파일은 routes를 통해 multer로 변환하고 req.file에서 받음
  const image = req.file;

  // 이미지를  AWS S3에 올림 업로드한 결과가 location: result.Location으로 aws url주소가 들어옴 이걸 
  //리엑트로 보내야함
  const result = await upload(image);

  // 만약 성공적? reponse number 201이다. result.Location은 이미지가 저장된 AWS의 URL 주소이다.
  //이걸 받을수 있다.
  res.status(201).json({
    location: result.Location,
  });
});

const getGallery = asyncHandler(async (req, res) => {
  res.status(200).json({ message: "get photos " });
});

module.exports = {
  createGallery,
  getGallery,
};
