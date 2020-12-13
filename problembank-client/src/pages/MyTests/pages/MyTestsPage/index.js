import React, { useState } from "react";
import "./style.scss";
import MyTestsTable from "../../components/MyTestsTable";
import MyTestsLayout from "../../../../layouts/MyTestsLayout";
import {getUserTest} from "../../../../_actions/testAction";
import {useDispatch} from "react-redux";
import testAPI from "../../../../apis/tests";

function MyTestsPage(props) {
	const {user} = props
	console.log(user)

	const [keyword, setKeyword] = useState();
	const [start, setStart] = useState(null);
	const [end, setEnd] = useState(null);
	const [tests, setTests] = useState([]);
	const [filteredTests, setfilteredTests] = useState([]);

	const dispatch = useDispatch();

	React.useEffect(() => {
		dispatch(getUserTest(user.id))
		.then(response => {
			const { data } = response.payload;
			console.log(data)
			setTests(data)
			setfilteredTests(data)
		})
	}, [])

	const changeStartDate = (e) => {
		setStart(e.target.value)
	}
	const changeEndDate = (e) => {
		setEnd(e.target.value)
	}
	const changeKeyword = (e) => {
		setKeyword(e.target.value)
	}
	const handleFilter = (e) => {
		const filterTests = tests.filter(element => (
			(element.date >= start || start === null)
			&& (element.date.substring(0,element.date.indexOf('T')) <= end || end === null)
			&& element.test_name.match(new RegExp(keyword, "i"))
		))
		setfilteredTests(filterTests)
	}
	const getFilteredTests = () =>{
		return filteredTests
	}


	const handleClick = (test_id) => {
		console.log("click!")
		testAPI.cancelReg({user_id: user.id, test_id: test_id})

		dispatch(getUserTest(user.id))
			.then(response => {
				const { data } = response.payload;
				console.log(data)
				setTests(data)

				setfilteredTests(
					data.filter(element => (
						(element.date >= start || start === null)
						&& (element.date.substring(0,element.date.indexOf('T')) <= end || end === null)
						&& element.test_name.match(new RegExp(keyword, "i"))
					))
				)
			})
	}

    return(
    	<MyTestsLayout>
	    <div id="content">
	        <div id="content-header">
	            <div id="testDate">
	                <text>시험 일자</text>
	                <input type="date" class="data-calander" onChange={changeStartDate}></input>
	                <text>&nbsp;~&nbsp;</text>
	                <input type="date" class="data-calander" onChange={changeEndDate}></input>
	            </div>
	            <div id="testName">
	                <text>시험명</text>
	                <input id="select" type="text" onChange={changeKeyword}></input>
	            </div>
	            <button onClick={handleFilter}>조회</button>
	        </div>
			<div id="content-table">
	            <MyTestsTable handleClick={handleClick} getTests={getFilteredTests} {...props} ></MyTestsTable>
	        </div>
	    </div>
		</MyTestsLayout>
    );
}

export default MyTestsPage;
