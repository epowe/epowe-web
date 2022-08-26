import AWS from "aws-sdk";

const detectMimeType = () => {
  const mimeTypes = [
    "video/webm;codecs=vp9,opus",
    "video/webm;codecs=vp8,opus",
    "video/webm",
  ];

  for (let mimeType of mimeTypes) {
    if (MediaRecorder.isTypeSupported(mimeType)) {
      return mimeType;
    }
  }

  return "";
};

const initMediaStream = async () => {
  const constraints = {
    audio: {
      echoCancellation: { exact: true },
    },
    video: {
      with: 1280,
      height: 720,
    },
  };
  const stream = await navigator.mediaDevices.getUserMedia(constraints);
  return stream;
};

const stopMediaStream = async (stream) => {
  stream.getTracks().forEach((track) => track.stop());
};

const combineBlobs = (recordedBlobs) => {
  return new Blob(recordedBlobs, { type: "video/webm" });
};

const createBlobURL = (blob) => {
  const url = window.URL.createObjectURL(blob);
  return url;
};

export const beginRecord = async (onStreamReady, onFinished) => {
  const stream = await initMediaStream();
  onStreamReady(stream);
  const options = { mimeType: detectMimeType() };
  const recordedBlobs = [];

  const mediaRecorder = new MediaRecorder(stream, options);
  mediaRecorder.ondataavailable = (event) => {
    if (event.data && event.data.size > 0) {
      recordedBlobs.push(event.data);
    }
  };
  mediaRecorder.onstop = () => {
    onFinished(recordedBlobs);
    stopMediaStream(stream);
  };

  mediaRecorder.start();

  return mediaRecorder;
};

export const stopPlaying = (videoElement) => {
  videoElement.pause();
  videoElement.src = null;
  videoElement.srcObject = null;
};

export const playRecordedBlobs = (videoElement, recordedBlobs) => {
  const blob = combineBlobs(recordedBlobs);
  const url = createBlobURL(blob);

  stopPlaying(videoElement);

  videoElement.controls = true;
  videoElement.src = url;
  videoElement.play();
};

export const playStream = (videoElement, stream) => {
  stopPlaying(videoElement);

  videoElement.srcObject = stream;
  videoElement.play();
};

export const uploadVideoAndGetUrl = (recordedBlobs) => {
  const blob = combineBlobs(recordedBlobs);
  console.log(blob);
  const recordedFile = new File([blob], 'recordedVideo.webm', {
    type: {detectMimeType},
  });
  console.log(recordedFile);
  const getUrl = uploadFile(recordedFile);
  return getUrl;
};

//엑세스키와 시크릿 키는 각자의 aws 계정에 IAM을 들어가고 내 보안 자격증명에 들어가서 본인만의 엑세스 키를 만들수 있다.

const ACCESS_KEY = process.env.REACT_APP_AWS_ACCESS_KEY;
const SECRET_ACCESS_KEY = process.env.REACT_APP_AWS_SECRET_ACCESS_KEY;
//region을 써야한다.
const REGION = process.env.REACT_APP_AWS_REGION;
//s3 버킷명을 써야한다.
const S3_BUCKET = process.env.REACT_APP_AWS_BUCKET;

AWS.config.update({
  accessKeyId: ACCESS_KEY,
  secretAccessKey: SECRET_ACCESS_KEY,
});

const myBucket = new AWS.S3({
  params: { Bucket: S3_BUCKET },
  region: REGION,
});

//클릭시 S3에 업로드 되도록 만들어주는 함수
const uploadFile = (file) => {
  const fileExt = file.name.split(".").pop();
  let today = new Date();
  let year = today.getFullYear(); // 년도
  let month = today.getMonth() + 1; // 월
  let date = today.getDate(); // 날짜
  let hours = today.getHours(); // 시
  let minutes = today.getMinutes(); // 분
  let seconds = today.getSeconds(); // 초
  let milliseconds = today.getMilliseconds(); // 밀리초
  let finalFileName =
    year +
    ":" +
    month +
    ":" +
    date +
    ":" +
    hours +
    ":" +
    minutes +
    ":" +
    seconds +
    ":" +
    milliseconds +
    "." +
    fileExt;

  const params = {
    //엑세스 컨트롤
    ACL: "public-read",
    Body: file,
    Bucket: S3_BUCKET,
    //키는 파일명, 업로드라는 파일 명에 키 이름 생성
    Key: "upload/" + finalFileName,
  };

  myBucket
      .putObject(params)
      .send((err) => {
        if (err) console.log(err);
      });
      
  const encodeFileName = encodeURIComponent(finalFileName);
  const url =
    "https://epowe-bucket.s3.ap-northeast-2.amazonaws.com/upload/" +
    encodeFileName;
  console.log(url);
  return url;
};