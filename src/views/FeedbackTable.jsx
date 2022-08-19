import React from "react";
import { useEffect } from "react";
import { Link } from "react-router-dom";
import TableData from "./TableData";
import { API } from "../API";
const FeedbackTable = () => {
  const column = Object.keys(TableData[0]);

  const ThData = () => {
    return (
      <>
        <th scope="col">면접 제목</th>
        <th scope="col">억양</th>
        <th scope="col">말의 빠르기</th>
        <th scope="col">최대 단어 반복</th>
        <th scope="col">사투리 사용 횟수</th>
      </>
    );
  };

  const tdData = () => {
    return TableData.map((data) => {
      return (
        <tr>
          {column.map((v) => {
            if (v === "title")
              return (
                <td>
                  <Link
                    to="/feedback/list/questions"
                    style={{ color: "#6c63ff" }}
                  >
                    {data[v]}
                  </Link>
                </td>
              );
            return <td>{data[v]}</td>;
          })}
        </tr>
      );
    });
  };

  const getUserData = async () => {
    var result = await API.getUserInterviewList();
    if (result) {
      console.log("flask get 성공");
      console.log(result);
    } else {
      console.log("Flask get 실패");
    }
  };

  useEffect(() => {
    getUserData();
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

export default FeedbackTable;
