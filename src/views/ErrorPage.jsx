import React from 'react'
import { Link } from 'react-router-dom'
import Header from './Header'

const ErrorPage = () => {
  return (
    <>
      <Header />
      <div style={{height: 'calc(100vh-5rem)', textAlign: 'center'}}>
        <h1 style={{marginTop: '5rem'}}><br/>⚠ 오류 Error</h1>
        <br/>
        <p>요청하신 페이지를 처리 중에 오류가 발생하였습니다. 서비스 이용에 불편을 드려 죄송합니다.</p>
        <br/>
        <Link to='/interview' style={{color: '#6754cb'}}><p>메인 페이지로 가기</p></Link>
      </div>
    </>
  )
}

export default ErrorPage