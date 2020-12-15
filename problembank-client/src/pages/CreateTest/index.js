import React from 'react'
import {Route, Switch, useRouteMatch} from 'react-router-dom';
import CreateTestPage from './pages/CreateTestPage';

function CreateTest( {user}) {
    const match = useRouteMatch();
    console.log(match.url);
    console.log(user);

    return (
        <div className="create-page-container" style={{marginLeft: '20px', marginTop: '20px'}}>
            <Switch>
                <Route exact path = {`${match.url}`} render={(props) => <CreateTestPage user={user} {...props}/>}/>
            </Switch>
        </div>
        
    )
}

export default CreateTest;

