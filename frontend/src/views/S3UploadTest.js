// import React, { useState, useEffect } from "react";
// import CreateFormData from "../CreateFormData.js";
// import AWS from "aws-sdk";

// const S3UploadTest = () => {
//   const albumBucketName = "2-pow-bucket";
//   const bucketRegion = "ap-northeast-2";
//   const IdentityPoolId = "IoyNd+UJO+9G4tvcohl/4DKoNAOj7ZWTbAbrhmyW";

//   AWS.config.update({
//     region: bucketRegion,
//     credentials: new AWS.CognitoIdentityCredentials({
//       IdentityPoolId: IdentityPoolId,
//     }),
//   });

//   var s3 = new AWS.S3({
//     apiVersion: "2006-03-01",
//     params: { Bucket: "2-pow-bucket" },
//   });

//   const getHtml = (template) => {
//     return template.join("\n");
//   };

//   const listAlbums = () => {
//     s3.listObjects({ Delimiter: "/" }, function(err, data) {
//       if (err) {
//         return alert("There was an error listing your albums: " + err.message);
//       } else {
//         var albums = data.CommonPrefixes.map(function(commonPrefix) {
//           var prefix = commonPrefix.Prefix;
//           var albumName = decodeURIComponent(prefix.replace("/", ""));
//           return getHtml([
//             "<li>",
//             "<span onclick=\"deleteAlbum('" + albumName + "')\">X</span>",
//             "<span onclick=\"viewAlbum('" + albumName + "')\">",
//             albumName,
//             "</span>",
//             "</li>",
//           ]);
//         });
//         var message = albums.length
//           ? getHtml([
//               "<p>Click on an album name to view it.</p>",
//               "<p>Click on the X to delete the album.</p>",
//             ])
//           : "<p>You do not have any albums. Please Create album.";
//         var htmlTemplate = [
//           "<h2>Albums</h2>",
//           message,
//           "<ul>",
//           getHtml(albums),
//           "</ul>",
//           "<button onclick=\"createAlbum(prompt('Enter Album Name:'))\">",
//           "Create New Album",
//           "</button>",
//         ];
//         document.getElementById("app").innerHTML = getHtml(htmlTemplate);
//       }
//     });
//   };

//   const viewAlbum = (albumName) => {
//     var albumPhotosKey = encodeURIComponent(albumName) + "//";
//     s3.listObjects(
//       {
//         Prefix: albumPhotosKey,
//       },
//       function(err, data) {
//         if (err) {
//           return alert("There was an error viewing your album: " + err.message);
//         }
//         // 'this' references the AWS.Response instance that represents the response
//         var href = this.request.httpRequest.endpoint.href;
//         var bucketUrl = href + albumBucketName + "/";
//         console.log("앨범", data.Contents);

//         var photos = data.Contents.map(function(photo) {
//           var photoKey = photo.Key;
//           var photoUrl = bucketUrl + encodeURIComponent(photoKey);
//           return getHtml([
//             "<span>",
//             "<div>",
//             '<img style="width:128px;height:128px;" src="' + photoUrl + '"/>',
//             "</div>",
//             "<div>",
//             "<span onclick=\"deletePhoto('" +
//               albumName +
//               "','" +
//               photoKey +
//               "')\">",
//             "X",
//             "</span>",
//             "<span>",
//             photoKey.replace(albumPhotosKey, ""),
//             "</span>",
//             "</div>",
//             "</span>",
//           ]);
//         });
//         var message = photos.length
//           ? "<p>Click on the X to delete the photo</p>"
//           : "<p>You do not have any photos in this album. Please add photos.</p>";
//         var htmlTemplate = [
//           "<h2>",
//           "Album: " + albumName,
//           "</h2>",
//           message,
//           "<div>",
//           getHtml(photos),
//           "</div>",
//           '<input id="photoupload" type="file" accept="image/*">',
//           '<button id="addphoto" onclick="addPhoto(\'' + albumName + "')\">",
//           "Add Photo",
//           "</button>",
//           '<button onclick="listAlbums()">',
//           "Back To Albums",
//           "</button>",
//         ];
//         document.getElementById("app").innerHTML = getHtml(htmlTemplate);
//       }
//     );
//   };
//   const createAlbum = (albumName) => {
//     albumName = albumName.trim();
//     if (!albumName) {
//       return alert(
//         "Album names must contain at least one non-space character."
//       );
//     }
//     if (albumName.indexOf("/") !== -1) {
//       return alert("Album names cannot contain slashes.");
//     }
//     var albumKey = encodeURIComponent(albumName) + "/";
//     s3.headObject({ Key: albumKey }, function(err, data) {
//       if (!err) {
//         return alert("Album already exists.");
//       }
//       if (err.code !== "NotFound") {
//         return alert("There was an error creating your album: " + err.message);
//       }
//       s3.putObject({ Key: albumKey }, function(err, data) {
//         if (err) {
//           return alert(
//             "There was an error creating your album: " + err.message
//           );
//         }
//         alert("Successfully created album.");
//         viewAlbum(albumName);
//       });
//     });
//   };

//   const addPhoto = (albumName) => {
//     var files = document.getElementById("photoupload").files;
//     if (!files.length) {
//       return alert("Please choose a file to upload first.");
//     }
//     var file = files[0];
//     var fileName = file.name;
//     var albumPhotosKey = encodeURIComponent(albumName) + "//";

//     var photoKey = albumPhotosKey + fileName;
//     s3.upload(
//       {
//         Key: photoKey,
//         Body: file,
//         ACL: "public-read",
//       },
//       function(err, data) {
//         if (err) {
//           return alert(
//             "There was an error uploading your photo: ",
//             err.message
//           );
//         }
//         alert("Successfully uploaded photo.");
//         viewAlbum(albumName);
//       }
//     );
//   };

//   useEffect(() => {
//     const script = document.createElement("script");
//     script.src = "https://sdk.amazonaws.com/js/aws-sdk-2.283.1.min.js";
//     script.async = true;
//     document.body.appendChild(script);
//     listAlbums();
//   });

//   return (
//     <>
//       <h1>My Photo Albums App</h1>
//       <div id="app"></div>
//     </>
//   );
// };

// export default S3UploadTest;

import React, { useState, useEffect } from "react";
import createFormData from "../CreateFormData";

const S3UploadTest = () => {
  const [picturename, setPicturename] = useState("");
  const [imageFile, setImageFile] = useState(null);
  const [s3Location, setS3Location] = useState("");

  useEffect(() => {
    document.title = "AWS S3 Image";
  }, [s3Location]);

  const handleFileChange = (e) => {
    setImageFile(e.target.files[0]);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append("picturename", picturename);
    formData.append("imageFile", imageFile);
    const location = await createFormData(formData);
    setS3Location(location.data.location);
  };

  return (
    <>
      <h1 className="bg-indigo-500 text-center p-4 text-4xl text-white">
        AWS S3에서 사진 불러오기
      </h1>
      <form onSubmit={handleSubmit} className="flex justify-center mt-8 ">
        <label
          htmlFor="formFile"
          className="form-label inline-block  min-w-fit mr-4 mt-6 md:mt-2 font-extrabold text-2xl text-gray-700 "
        >
          이미지 이름:
        </label>
        <input
          className="text-2xl border-2 bg-indigo-200 mr-1 md:mr-5"
          name="picturename"
          type="text"
          id="picturename"
          value={picturename}
          onChange={(e) => setPicturename(e.target.value)}
        />
        <input
          className="form-control
            block
            w-50
            mr-5
            px-5
            py-1.5
            font-normal
            text-gray-700
            bg-white bg-clip-padding
            border border-solid border-gray-300
            rounded
            transition
            ease-in-out
            m-0
            focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none"
          type="file"
          name="imageFile"
          accept="image/jpeg, image/jp, image/png"
          onChange={handleFileChange}
        />
        <button className="w-25 p-2 border-2 bg-indigo-500 border-indigo-400 border-solid rounded-2xl  text-2xl text-white font-bold">
          제출
        </button>
      </form>
      <img
        src={s3Location}
        alt=""
        className="text-center mt-10 mx-auto w-80 h-70"
      />
    </>
  );
};

export default S3UploadTest;