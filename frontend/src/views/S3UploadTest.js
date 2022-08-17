import React, { useState, useEffect } from "react";
import CreateFormData from "../CreateFormData.js";
import AWS from "aws-sdk";

const S3UploadTest = () => {
  const albumBucketName = "2-pow-bucket";
  const bucketRegion = "ap-northeast-2";
  const IdentityPoolId = "IoyNd+UJO+9G4tvcohl/4DKoNAOj7ZWTbAbrhmyW";

  AWS.config.update({
    region: bucketRegion,
    credentials: new AWS.CognitoIdentityCredentials({
      IdentityPoolId: IdentityPoolId,
    }),
  });

  var s3 = new AWS.S3({
    apiVersion: "2006-03-01",
    params: { Bucket: "2-pow-bucket" },
  });

  const getHtml = (template) => {
    return template.join("\n");
  };

  const listAlbums = () => {
    s3.listObjects({ Delimiter: "/" }, function(err, data) {
      if (err) {
        return alert("There was an error listing your albums: " + err.message);
      } else {
        var albums = data.CommonPrefixes.map(function(commonPrefix) {
          var prefix = commonPrefix.Prefix;
          var albumName = decodeURIComponent(prefix.replace("/", ""));
          return getHtml([
            "<li>",
            "<span onclick=\"deleteAlbum('" + albumName + "')\">X</span>",
            "<span onclick=\"viewAlbum('" + albumName + "')\">",
            albumName,
            "</span>",
            "</li>",
          ]);
        });
        var message = albums.length
          ? getHtml([
              "<p>Click on an album name to view it.</p>",
              "<p>Click on the X to delete the album.</p>",
            ])
          : "<p>You do not have any albums. Please Create album.";
        var htmlTemplate = [
          "<h2>Albums</h2>",
          message,
          "<ul>",
          getHtml(albums),
          "</ul>",
          "<button onclick=\"createAlbum(prompt('Enter Album Name:'))\">",
          "Create New Album",
          "</button>",
        ];
        document.getElementById("app").innerHTML = getHtml(htmlTemplate);
      }
    });
  };

  const viewAlbum = (albumName) => {
    var albumPhotosKey = encodeURIComponent(albumName) + "//";
    s3.listObjects(
      {
        Prefix: albumPhotosKey,
      },
      function(err, data) {
        if (err) {
          return alert("There was an error viewing your album: " + err.message);
        }
        // 'this' references the AWS.Response instance that represents the response
        var href = this.request.httpRequest.endpoint.href;
        var bucketUrl = href + albumBucketName + "/";
        console.log("앨범", data.Contents);

        var photos = data.Contents.map(function(photo) {
          var photoKey = photo.Key;
          var photoUrl = bucketUrl + encodeURIComponent(photoKey);
          return getHtml([
            "<span>",
            "<div>",
            '<img style="width:128px;height:128px;" src="' + photoUrl + '"/>',
            "</div>",
            "<div>",
            "<span onclick=\"deletePhoto('" +
              albumName +
              "','" +
              photoKey +
              "')\">",
            "X",
            "</span>",
            "<span>",
            photoKey.replace(albumPhotosKey, ""),
            "</span>",
            "</div>",
            "</span>",
          ]);
        });
        var message = photos.length
          ? "<p>Click on the X to delete the photo</p>"
          : "<p>You do not have any photos in this album. Please add photos.</p>";
        var htmlTemplate = [
          "<h2>",
          "Album: " + albumName,
          "</h2>",
          message,
          "<div>",
          getHtml(photos),
          "</div>",
          '<input id="photoupload" type="file" accept="image/*">',
          '<button id="addphoto" onclick="addPhoto(\'' + albumName + "')\">",
          "Add Photo",
          "</button>",
          '<button onclick="listAlbums()">',
          "Back To Albums",
          "</button>",
        ];
        document.getElementById("app").innerHTML = getHtml(htmlTemplate);
      }
    );
  };
  const createAlbum = (albumName) => {
    albumName = albumName.trim();
    if (!albumName) {
      return alert(
        "Album names must contain at least one non-space character."
      );
    }
    if (albumName.indexOf("/") !== -1) {
      return alert("Album names cannot contain slashes.");
    }
    var albumKey = encodeURIComponent(albumName) + "/";
    s3.headObject({ Key: albumKey }, function(err, data) {
      if (!err) {
        return alert("Album already exists.");
      }
      if (err.code !== "NotFound") {
        return alert("There was an error creating your album: " + err.message);
      }
      s3.putObject({ Key: albumKey }, function(err, data) {
        if (err) {
          return alert(
            "There was an error creating your album: " + err.message
          );
        }
        alert("Successfully created album.");
        viewAlbum(albumName);
      });
    });
  };

  const addPhoto = (albumName) => {
    var files = document.getElementById("photoupload").files;
    if (!files.length) {
      return alert("Please choose a file to upload first.");
    }
    var file = files[0];
    var fileName = file.name;
    var albumPhotosKey = encodeURIComponent(albumName) + "//";

    var photoKey = albumPhotosKey + fileName;
    s3.upload(
      {
        Key: photoKey,
        Body: file,
        ACL: "public-read",
      },
      function(err, data) {
        if (err) {
          return alert(
            "There was an error uploading your photo: ",
            err.message
          );
        }
        alert("Successfully uploaded photo.");
        viewAlbum(albumName);
      }
    );
  };

  useEffect(() => {
    const script = document.createElement("script");
    script.src = "https://sdk.amazonaws.com/js/aws-sdk-2.283.1.min.js";
    script.async = true;
    document.body.appendChild(script);
    listAlbums();
  });

  return (
    <>
      <h1>My Photo Albums App</h1>
      <div id="app"></div>
    </>
  );
};

export default S3UploadTest;
