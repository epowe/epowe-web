import "./App.css";
import { useState } from "react";
import AWS from "aws-sdk";
// import { Row, Col, Button, Input, Alert } from "reactstrap";

const S3Upload = () => {
  const [progress, setProgress] = useState(0);
  const [selectedFile, setSelectedFile] = useState(null);
  const [showAlert, setShowAlert] = useState(false);
  const [realFileExt, setRealFileExt] = useState(null);

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

  const handleFileInput = (e) => {
    //파일 정보가 들어간다.
    const file = e.target.files[0];
    console.log(file);
    //파일 확장자 추출 부분.
    const fileExt = file.name.split(".").pop();
    setRealFileExt(fileExt);
    //파일 타입과 확장자가 아래의 형식이 아니면 업로드 자체가 안되게 셋팅!
    if (file.type !== "video/webm" || fileExt !== "webm") {
      alert("Webm 확장자의 동영상 파일만 Upload 가능합니다.");
      return;
    }
    //파일이 변경 되었을때 진행 상태를 써주기 위한 함수
    setProgress(0);
    //파일을 추가해줌
    setSelectedFile(e.target.files[0]);
  };

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
      .on("httpUploadProgress", (evt) => {
        //요 부분은 프로그래스가 수치로 표시되는 부분
        setProgress(Math.round((evt.loaded / evt.total) * 100));
        //alert이 보이게 하는 부분
        setShowAlert(true);
        //alert를 발생하고 나서 3초후에 alert를 꺼줌
        setTimeout(() => {
          setShowAlert(false);
          setSelectedFile(null);
        }, 3000);
      })
      //send에서 에러가 발생하면 에러로그가 띄워짐
      .send((err) => {
        if (err) console.log(err);
      });

    const encodeFileName = encodeURIComponent(finalFileName);
    const url =
      "https://epowe-bucket.s3.ap-northeast-2.amazonaws.com/upload/" +
      encodeFileName;
    console.log(url);
  };

  // return (
  //   <div className="App">
  //     <div className="App-header">
  //       <Row>
  //         <Col>
  //           <h1>File Upload</h1>
  //         </Col>
  //       </Row>
  //     </div>
  //     <div className="App-body">
  //       <Row>
  //         <Col>
  //           {showAlert ? (
  //             <Alert color="primary">업로드 진행률 : {progress}%</Alert>
  //           ) : (
  //             <Alert color="primary">파일을 선택해 주세요.</Alert>
  //           )}
  //         </Col>
  //       </Row>
  //       <Row>
  //         <Col>
  //           <Input color="primary" type="file" onChange={handleFileInput} />
  //           {selectedFile ? (
  //             //파일이 선택 되었을때 버튼이 보여짐
  //             <Button color="primary" onClick={() => uploadFile(selectedFile)}>
  //               {" "}
  //               Upload to S3
  //             </Button>
  //           ) : null}
  //         </Col>
  //       </Row>
  //     </div>
  //   </div>
  // );
};

export default S3Upload;
