import React from 'react'
import {Route, Switch, useRouteMatch} from 'react-router-dom';
import ProblemEditPage from "./pages/ProblemEditPage";
import Text from "../../components/DesignComponent/Text";
import FeedbackPage from "./pages/FeedbackPage";

function AdminTestProgressPage(props) {
    const match = useRouteMatch();
    return (
        <>
            <Text large>2020 동국대학교 프로그래밍 경진대회가 진행중입니다.</Text><br/>
            <img src="../../assets/images/timer_512.png" />
            <Text bold>19:59  </Text>
            <Text fade>2020-11-11 12:00 ~ 2020-11-11 18:00</Text>
            <Switch>
                {/*<Route exact path = {`${match.url}`} component = {FeedbackPage} />*/}
                <Route exact path = {`${match.url}/problemedit`} component = {ProblemEditPage} />
            </Switch>
        </>
    )
}

export default AdminTestProgressPage