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

const TestRedirect = React.lazy(() => import('./components/TestRedirect'))

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
                    path="/testRedirect"
                    render={props => <TestRedirect user={user} {...props} />}
                />
                <Authorized
                    auth={auth}
                    path="/managetest"
                    render={props => <ManageTest user={user} {...props} />}
                />
                <Authorized
                    auth={auth}
                    path="/test"
                    render={props => <Test user={user} {...props} />}
                />
                <Route exact path = "/"  component = {MainPage}/>
                <Route path = "/totalproblems"  component = {TotalProblems}/>
                <Route path = "/problemsbank"  component = {ProblemsByCategories}/>
                <Route path = "/problem"  component = {Problem}/>
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
