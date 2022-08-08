import React from 'react'
import { Link } from 'react-router-dom';
import FeedbackDetailData from './FeedbackDetailData'

const FeedbackDetailTable = ({handleClick}) => {

  const column = Object.keys(FeedbackDetailData[0]);

  const ThData = () => {
    return (
      <>
        <th scope="col">사투리 사용 시점</th>
        <th scope="col">사투리 문장</th>
        <th scope="col">변환된 문장</th>
      </>
    );
  }

  const tdData = () => {
    return FeedbackDetailData.map((data) => {
      return(
        <tr>
          {
            column.map((v) => {
              if (v === "time") return <td value={data[v]} onClick={()=>handleClick(data[v])}><div style={{textDecoration: 'underline' , cursor: 'pointer', color: '#6c63ff'}}>{data[v]}</div></td>
              return <td>{data[v]}</td>
            })
          }
        </tr>
      )
    })
  }
  return (
    <table className="table">
      <thead>
        <tr>{ThData()}</tr>
      </thead>
      <tbody>
        {tdData()}
      </tbody>
    </table>
  )
}

export default FeedbackDetailTable