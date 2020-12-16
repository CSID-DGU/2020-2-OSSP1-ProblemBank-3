import React, {useState} from "react";
import "./style.scss";
import MyPageLayout from "../../../../layouts/MyPageLayout";
import TestResultTable from "../../components/TestResultTable";
import {useDispatch} from "react-redux";
import {getUserAnswer, getUserResult} from "../../../../_actions/testAction";
import queryString from "query-string";

function DetailedResultPage(props) {
    const {test_id} = queryString.parse(props.location.search);
    const {user} = props

    console.log(test_id)

    const [results, setResults] = useState([]);

    const dispatch = useDispatch();

    React.useEffect(() => {
        dispatch(getUserAnswer(test_id, user.id))
            .then(response => {
                const {data} = response.payload;
                console.log(data)
                setResults(data)
            })
    }, [])

    return (
        <MyPageLayout user={user}>
            <div id="content">
                <div id="content-header">
                </div>
                <div id="content-table">
                    <TestResultTable results={results} {...props} ></TestResultTable>
                </div>
            </div>
        </MyPageLayout>
    );
}

export default DetailedResultPage;
