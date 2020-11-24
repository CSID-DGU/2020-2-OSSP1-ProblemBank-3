import React from 'react'
import {Route, Switch, useRouteMatch} from 'react-router-dom';
import FeedbackPage from "./pages/FeedbackPage";
import timer_img from "../../assets/images/timer_512.png"
import ProgressSidebar from "./components/ProgressSidebar";
import './style.scss'
import ProblemEditPage from "./pages/ProblemEditPage";

function AdminTestProgressPage(props) {
    const match = useRouteMatch();
    return (
        <div className="admin-test-progress-page">
            <text className="test-title">2020 동국대학교 프로그래밍 경진대회가 진행중입니다.</text><br/>
            <div>
                <img className="img-timer" width="15" src={timer_img} />
                <text className="test-timer">19:59</text>
                <text className="test-date">2020-11-11 12:00 ~ 2020-11-11 18:00</text>
            </div>
            <div className="admin-test-board">
                <ProgressSidebar/>
                <div className="admin-test-board-content">
                    <Switch>
                        <Route exact path = {`${match.url}`} component = {FeedbackPage} />
                        <Route exact path = {`${match.url}/problemedit`} component = {ProblemEditPage} />
                    </Switch>
                </div>
            </div>
        </div>
    )
}

export default AdminTestProgressPage