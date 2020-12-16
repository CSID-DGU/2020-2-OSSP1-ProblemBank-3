import React, { useState, useCallback, useEffect } from "react";
import { useAsync } from 'react-async';
import { withRouter } from 'react-router-dom';
import './style.scss'
import testAPI from '../../../../../../apis/tests';

async function getResultAdmin({test_id}) {
	const response = await testAPI.getResultAdmin({test_id});
	if(response.result === true) {
		console.log(response);
		return response.data;
	}
	throw new Error(response.data);
}

function AdminResultTable({test_id}){
    const { data, error } = useAsync({
		promiseFn: getResultAdmin,
		test_id: test_id,
		watch: test_id
	});
    if(error) return error.message;
    if(data) return(
	<div className="tableContent">
            <table className="table table-contribution">
                <thead>
                    <tr>
                        <th width = "5%">번호</th>
                        <th width = "35%">학생 이름</th>
                        <th width = "20%">맞은 문제 수</th>
		        <th width = "20%">틀린 문제 수</th>
		        <th width = "20%">답안 확인</th>
                    </tr>
                </thead>
                <tbody>
                    {
                        data.map((item,index) => {
                            return (
                                <tr key = {index}>
                                    <td style={{textAlign: "center"}}>{index+1}</td>
                                    <td style={{textAlign: "center"}}>{item.user_name}</td>
                                    <td style={{textAlign: "center"}}>{item.correct}</td>
                                    <td style={{textAlign: "center"}}>{item.wrong}</td>
				    <td style={{textAlign: "center"}}><button>열람</button></td>
                                </tr>
                            )
                        })
                    }
                </tbody>
            </table>
        </div>
    )
    return "로딩중...";
}

export default withRouter(AdminResultTable)

