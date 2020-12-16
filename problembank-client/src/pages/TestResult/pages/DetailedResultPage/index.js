import React, { useState } from "react";
import "./style.scss";
import MyPageLayout from "../../../../layouts/MyPageLayout";
import TestResultTable from "../../components/TestResultTable";
import {useDispatch} from "react-redux";
import {getUserResult} from "../../../../_actions/testAction";

function DetailedResultPage(props) {
	const {user} = props
	console.log(user)

	const [results, setResults] = useState([]);

	const dispatch = useDispatch();

	React.useEffect(() => {
		dispatch(getUserResult(user.id))
			.then(response => {
				const { data } = response.payload;
				console.log(data)
				setResults(data)
			})
	}, [])

	return(
		<MyPageLayout user = {user}>
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
