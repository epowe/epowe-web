import React, { useEffect } from "react";
import { Link } from "react-router-dom";
import FeedbackDetailData from "./FeedbackDetailData";
import { API } from "../API";

const FeedbackDetailTable = ({ handleClick }) => {
  const column = Object.keys(FeedbackDetailData[0]);

  const ThData = () => {
    return (
      <>
        <th scope="col">사투리 사용 시점</th>
        <th scope="col">사투리 문장</th>
        <th scope="col">변환된 문장</th>
      </>
    );
  };

  const getUserInterviewDetail = async ({ question, title }) => {
    var result = await API.getUserInterviewDetail({
      question: question,
      title: title,
    });
    if (result) {
      console.log("flask get 성공");
      console.log(result);
    } else {
      console.log("Flask get 실패");
    }
  };

  const tdData = () => {
    return FeedbackDetailData.map((data) => {
      return (
        <tr>
          {column.map((v) => {
            if (v === "time")
              return (
                <td value={data[v]} onClick={() => handleClick(data[v])}>
                  <div
                    style={{
                      textDecoration: "underline",
                      cursor: "pointer",
                      color: "#6c63ff",
                    }}
                  >
                    {data[v]}
                  </div>
                </td>
              );
            return <td>{data[v]}</td>;
          })}
        </tr>
      );
    });
  };

  useEffect(() => {
    getUserInterviewDetail({
      title: "카카오 면접 준비",
      question: "자기소개",
    });
  }, []);

  return (
    <table className="table">
      <thead>
        <tr>{ThData()}</tr>
      </thead>
      <tbody>{tdData()}</tbody>
    </table>
  );
};

export default FeedbackDetailTable;
