import React, { useEffect, useState } from 'react'
import {Route, Switch, useRouteMatch} from 'react-router-dom';
import { useAsync } from 'react-async';
import FeedbackPage from "./pages/FeedbackPage";
import timer_img from "../../assets/images/timer_512.png"
import ProgressSidebar from "./components/ProgressSidebar";
import './style.scss';
import ProblemEditPage from "./pages/ProblemEditPage";
import queryString from "query-string";
import testAPI from '../../apis/tests';
import moment from 'moment';

async function getTestInfo({test_id}) {
    const response = await testAPI.getTestInfo({test_id});
	if(response.result === true) {
        // console.log(response.data[0]);
		return response.data[0];
	}
	throw new Error(response.data);
}


function AdminTestProgressPage(props) {
    const match = useRouteMatch();
    const { test_id } = queryString.parse(props.location.search); // index는 0부터 문제 개수-1 까지
    const [remainingTime, setRemainingTime] = useState(undefined);
    const { data, error } = useAsync({
		promiseFn: getTestInfo,
		test_id: test_id
    });

    useEffect(() => {
		if(data) {
            const currentDate = moment();
            const endDate = moment(data.end);
            setRemainingTime(moment.duration(endDate.diff(currentDate)));
            // console.log(remainingTime);
		}
    }, [data]);


    if(data && remainingTime) {
        const timeout = setInterval(() => setRemainingTime(moment.duration(moment(data.end).diff(moment()))), 1000);
    }
   
    if(error) return error.message;
    if(data && remainingTime) return (
        <div className="admin-test-progress-page">
            <p className="test-title">{data.name} 진행중입니다.</p>
            <div>
                <img className="img-timer" width="15" src={timer_img} />
                <text className="test-timer">{remainingTime.days()*24 + remainingTime.hours()}:{remainingTime.minutes()}:{remainingTime.seconds()}</text>
                <text className="test-date">{moment(data.start).format("YYYY-MM-DD HH:mm:ss")} ~ {moment(data.end).format("YYYY-MM-DD HH:mm:ss")}</text>
            </div>
            <div className="admin-test-board">
                <ProgressSidebar test_id={test_id}/>
                <div className="admin-test-board-content">
                    <Switch>
                        <Route exact path = {`${match.url}`} render={props => <FeedbackPage test_id={test_id} {...props} />}/>
                        <Route exact path = {`${match.url}/problemedit`} render={props => <ProblemEditPage test_id={test_id} {...props} />} />
                    </Switch>
                </div>
            </div>
        </div>
    );
    return "로딩중...";
}

export default AdminTestProgressPage