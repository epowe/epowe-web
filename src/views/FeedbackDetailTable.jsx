import React, { useEffect, useState } from "react";
import { useNavigate } from 'react-router-dom';

const FeedbackDetailTable = ({ handleClick, detailData }) => {
  const [column, setColumn] = useState([]);
  const navigate = useNavigate();

  const ThData = () => {
    return (
      <>
        <th scope="col">사투리 사용 시점</th>
        <th scope="col">사투리 문장</th>
        <th scope="col">변환된 문장</th>
      </>
    );
  };

  const tdData = () => {
    if (detailData === undefined) {
      return;
    }
    return detailData.map((data) => {
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
    console.log(detailData);
    if (detailData !== undefined) {
      setColumn(Object.keys(detailData[0]));
    } else {
      navigate(-1);
    } 
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
