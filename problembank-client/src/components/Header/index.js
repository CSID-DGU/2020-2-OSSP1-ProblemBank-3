import React from 'react'
import styled from 'styled-components'
import Images from '../../constansts/Images'
import { Link, NavLink } from 'react-router-dom'

function Header(props) {
    const currentPath = window.location.pathname;
    const addStype = currentPath === '/' ? {
    } : {
        boxShadow: '0 4px 2px -2px rgba(0, 0, 0, 0.2)'
    };
    const handleLogout = () => {
        props.logout()
    }

    return (
        <Wrapper>
            <div className="container" style={addStype} >
                <div className="header__logo">
                    <Link to="/"><img src={Images.logo} /></Link>
                </div>
                <nav>
                    <ul className="header__links">
                        <li>
                            <NavLink to="/" exact activeClassName='active_class'> 홈페이지</NavLink>
                        </li>
                        <li>
                            <NavLink to="/totalproblems" activeClassName='active_class'> 문제집</NavLink>
                        </li>
                        <li>
                            <NavLink to="/problemsbank" activeClassName='active_class'>카테고리별 문제</NavLink>
                        </li>
                        {/*사용자에 따라 test 또는 managetest로 redirect*/}
                        <li>
                            <NavLink to="/test" activeClassName='active_class'>시험/대회</NavLink>
                        </li>
                        {/*마이페이지*/}
                        <li>
                            <NavLink to="/mypage" activeClassName='active_class'>마이페이지</NavLink>
                        </li>

                        <li>
                            {/*auth 상태에 따라 다르게 표시*/}
                            {props.auth ? (
                                <Link onClick={handleLogout}>로그아웃</Link>
                            ) : (
                                <Link to="/login">로그인</Link>
                            )}
                        </li>
                        <li/>
                    </ul>
                </nav>
            </div>
        </Wrapper>
    )
}
const Wrapper = styled.div`
    min-height: 100px;
    max-height: 10vh;
    height: 10vh;
    position: relative;
    position: sticky;
    top: 0;
    width: 100vw;
    z-index: 10;
    background: white;
    .container{
        display: flex;
        align-items: center;
        justify-content: space-between;
        max-width: 1920px;
        height: 100%;
        margin: auto;
        padding-right: 20px;
        border-bottom: 1px solid #ddd;
        .header__logo{
            flex: 1;
            img{
                width: 95px;
                height: 100%; 
            }
        }
        nav{
            flex: 6;
            ul{
                display: flex;
                justify-content: flex-end;
                li{
                    margin-left: 5rem;
                    a{
                        color: rgba(0,0,0,0.5); 
                        &:hover{
                            color: black;
                        }
                    }
                }
            }
        }

        .header__userInfo{
            flex: 1;
            display: flex;
            justify-content: flex-end;
        }


        .active_class {
            color: black;
            padding-bottom:10px;
            border-bottom: 5px solid #ddd;
        }
    }
`

export default Header

