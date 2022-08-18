const express = require("express");
require("dotenv").config();

const app = express();

// body parser 대시
app.use(express.json({ limit: "50mb" }));

// x-www-form-urlencoded를 사용하면 다음이 필요
/** Decode Form URL Encoded data */
app.use(express.urlencoded({ limit: "50mb", extended: false }));

// 루트를 정의
app.use("/api/gallery", require("./routes/galleryRoutes"));

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server is running on port ${PORT}`));
