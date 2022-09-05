import React, { useState } from "react";
import { useEffect } from "react";
import { Link } from "react-router-dom";
import { API } from "../API";
const FeedbackTable = () => {
  const [tableData, setTableData] = useState([]);

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
    return tableData.map((data, index) => {
      return (
        <tr
          key={index}
        >
          <td>
            <Link
              to="/feedback/list/questions"
              state={{ title: data.title }}
              style={{ color: "#6754cb" }}
            >
              {data["title"]}
            </Link>
          </td>
          <td>{data["intonation"]}</td>
          <td>{data["speechRate"]}</td>
          <td>{data["word"]}</td>
          <td>{data["dialectCount"]}</td>
        </tr>
      );
    });
  };

  const getUserFeedbackTable = async () => {
    var result = await API.getUserInterviewList();
    if (result) {
      console.log("flask get 성공");
      console.log(result.feedbackList);
      setTableData(result.feedbackList);
    } else {
      console.log("Flask get 실패");
    }
  };

  useEffect(() => {
    getUserFeedbackTable();
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
