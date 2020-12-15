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

const TestRedirect = React.lazy(() => import('./pages/TestRedirect'))

const MainPage = React.lazy(() => import('./pages/MainPage'))
const ProblemsByCategories = React.lazy(() => import('./pages/ProblemsByCategories'));
const TotalProblems = React.lazy(() => import('./pages/TotalProblems'))
const Problem = React.lazy(() => import('./pages/Problem'))
const Test = React.lazy(() => import('./pages/Test'))
const ManageTest = React.lazy(() => import('./pages/ManageTest'))
const CreateTest = React.lazy(() => import('./pages/CreateTest'))
const AdminTestProgress = React.lazy(() => import('./pages/AdminTestProgressPage'))
const AdminTestResult = React.lazy(() => import('./pages/AdminTestResult'))
const MyPage = React.lazy(() => import('./pages/MyPage'))
const MyTests = React.lazy(() => import('./pages/StudentUserPages/MyTests'))
const MyTestResults = React.lazy(() => import('./pages/StudentUserPages/MyTestResults'))


function App() {
    const [user, setUser] = useState(null);
    // 로그인 하기가 귀찮을 때 테스트 할 아이디를 선택해서 주석 해제. 할 때 위에꺼 주석하는거 잊지 말기
    // const [user, setUser] = useState({id:1, is_admin: 1}); //admin 용
    // const [user, setUser] = useState({id:2, is_admin: 0}); // student 용
    const login = async ({id, password}) => {
        try{
            let res = await signin({id, password})
            if (res.length == 0) throw new Error();
            console.log(res[0].is_admin)
            setUser(res[0]);
        }
        catch(e){
            alert("로그인 실패")
        }
    }
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
                    path="/test/student"
                    render={props => <Test user={user} {...props} />}
                />
                <Authorized
                    auth={auth}
                    path="/test/admin"
                    render={props => <ManageTest user={user} {...props} />}
                />
                <Authorized
                    auth={auth}
                    path="/test"
                    render={props => <TestRedirect user={user} {...props} />}
                />
                <Authorized
                    auth={auth}
                    path="/mypage"
                    render={props => <MyPage user={user} {...props} />}
                />
                <Authorized
                    auth={auth}
                    path="/mytests"
                    render={props => <MyTests user={user} {...props} />}
                />
                <Authorized
                    auth={auth}
                    path="/studenttestresult"
                    render={props => <MyTestResults user={user} {...props} />}
                />
                <Authorized
                    auth={auth}
                    path="/admintestresult"
                    render={props => <AdminTestResult user={user} {...props} />}
                />
                <Authorized
                    auth={auth}
                    path="/createtest"
                    render={props => <CreateTest user={user} {...props} />}
                />

                <Route exact path = "/"  component = {MainPage}/>
                <Route path = "/totalproblems"  component = {TotalProblems}/>
                <Route path = "/problemsbank"  component = {ProblemsByCategories}/>
                <Route path = "/problem"  component = {Problem}/>
                <Route path="/admintestprogress" component={AdminTestProgress} />


                <Route component = {NotFound} />
            </Switch>
          </BrowserRouter>
      </Suspense>
  );
}

export default App;
