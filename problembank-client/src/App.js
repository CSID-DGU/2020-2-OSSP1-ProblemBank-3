import React, { Suspense, useState } from 'react';
import {BrowserRouter, Route, Switch} from 'react-router-dom';
import './assets/styles/grid.css'

import Header from './components/Header';

import NotFound from './components/404NotFound';
import Loading from './components/Loading/Loading';

//*** 로그인 모듈 ***//
import {signin} from './components/Authentication/Auth';
import Authorized from './components/Authentication/Authorized';
const LoginPage = React.lazy(() => import('./pages/LoginPage'))

const MainPage = React.lazy(() => import('./pages/MainPage'))
const ProblemsByCategories = React.lazy(() => import('./pages/ProblemsByCategories'));
const TotalProblems = React.lazy(() => import('./pages/TotalProblems'))
const Problem = React.lazy(() => import('./pages/Problem'))
const Test = React.lazy(() => import('./pages/Test'))
const ManageTest = React.lazy(() => import('./pages/ManageTest'))
const CreateTest = React.lazy(() => import('./pages/CreateTest'))
const AdminTestProgress = React.lazy(() => import('./pages/AdminTestProgressPage'))
const AdminTestResult = React.lazy(() => import('./pages/AdminTestResult'))

function App() {
    const [user, setUser] = useState(null);
    const login = ({ id, password }) => setUser(signin({ id, password }));
    const logout = () => setUser(null);
    const auth = user != null;

    return (
      <Suspense fallback = {<Loading type={'bars'} color={'black'} />}>
        <BrowserRouter>
           <Header logout={logout} auth={auth}/>
            <Switch>
                <Route
                    path="/login"
                    render={props => (<LoginPage auth={auth} login={login} {...props} />)}
                />
                <Authorized
                    auth={auth}
                    path="/totalproblems"
                    // pass role info
                    // 임시로 TotalProblems에 Auth경로 설정
                    render={props => <TotalProblems role={user.role} />}
                />
                {/* <Authorized
                    auth={auth}
                    path="/test"
                    render={() => <Test role={user.role} />}
                /> */}
                <Route exact path = "/"  component = {MainPage}/>
                <Route path = "/problemsbank"  component = {ProblemsByCategories}/>
                <Route path = "/problem"  component = {Problem}/>
                <Route path = "/test"  component = {Test}/>
	        <Route exact path = "/managetest" component = {ManageTest}/>
	        <Route exact path = "/createtest" component = {CreateTest}/>
                <Route path="/admintestprogress" component={AdminTestProgress} />
	        <Route path="/admintestresult" component={AdminTestResult} />
                <Route component = {NotFound} />
            </Switch>
          </BrowserRouter>
      </Suspense>
  );
}

export default App;
