import React, { useState } from "react";
import "./style.scss";
import MyTestsTable from "../../components/MyTestsTable";
import MyPageLayout from "../../../../../layouts/MyPageLayout";
import {getUserTest} from "../../../../../_actions/testAction";
import {useDispatch} from "react-redux";
import testAPI from "../../../../../apis/tests";

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

	async function cancelTest(test_id) {
		const response = await testAPI.cancelReg({user_id : user.id, test_id : test_id});
		if(response.result === true) {
			console.log(response.data[0]);
			alert("신청을 취소했습니다.");
			return response.data[0];
		}
		throw new Error(response.data);
	}


	const handleClick = async (test_id) => {
		console.log("click!")
		await cancelTest(test_id);
		
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
    	<MyPageLayout user = {user}>
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
	            <MyTestsTable handleClick={handleClick} testLists={filteredTests} {...props} ></MyTestsTable>
	        </div>
	    </div>
		</MyPageLayout>
    );
}

export default MyTestsPage;
