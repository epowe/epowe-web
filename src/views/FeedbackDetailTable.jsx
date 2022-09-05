import React, { useEffect } from "react";

const FeedbackDetailTable = ({ handleClick, detailData }) => {

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
    return detailData.map((data) => {
      return (
        <tr>
          <td value={data["dialectTime"]} onClick={() => handleClick(data["dialectTime"])}>
            <div
              style={{
                textDecoration: "underline",
                cursor: "pointer",
                color: "#6754cb",
              }}
            >
              {data["dialectTime"]}
            </div>
          </td>
          <td>{data["dialectString"]}</td>
          <td>{data["feedback"]}</td>
        </tr>
      );
    });
  };

  useEffect(() => {
    console.log(detailData);
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
