import React, { useState, useCallback, useEffect } from "react";
import { useAsync } from 'react-async'
import "./style.scss";
import AdminResultTable from "../../components/AdminResultTable";
import testAPI from '../../../../../../apis/tests';

// getResultAdmin
async function getAdminTestList({admin_id}) {
	const response = await testAPI.getAdminTestList({admin_id});
	if(response.result === true) {
		// console.log(response);
		return response.data;
	}
	throw new Error(response.data);
}

function AdminTestResultPage(props) {
	const {user} = props;
	const [selectedTestId, setSelectedTestId] = useState(undefined);
	const { data, error } = useAsync({ promiseFn: getAdminTestList, admin_id: user.id});

	const handleChangeSelect = useCallback(
		(event) => {
			setSelectedTestId(event.target.value);
		},
		[selectedTestId],
	);

	useEffect(() => {
		if(data) {
			setSelectedTestId(data[0].id);
		}
	}, [data])

	if(error) return error.message;
    if(data) return(
	    <div id="content">
	        <div id="content-header">
	            <div id="testDate">
	                <text>시험 일자</text>
	                <input type="datetime-local" class="data-calander"></input>
	                <text>&nbsp;~&nbsp;</text>
	                <input type="datetime-local" class="data-calander"></input>
	            </div>
	            <div id="testName">
	                <text>시험명</text>
	                <select id="select" onChange={handleChangeSelect}>
						{
							data.map((item,index) => (
								<option key={index} label={item.name} value={item.id}/>
							))
						}
	                </select>
	            </div>
	            <button>조회</button>
	        </div>
	        <div id="content-table">
	            {selectedTestId && <AdminResultTable test_id={selectedTestId} ></AdminResultTable>}
	        </div>
	    </div>

	);
	return "로딩중";
}

export default AdminTestResultPage;
