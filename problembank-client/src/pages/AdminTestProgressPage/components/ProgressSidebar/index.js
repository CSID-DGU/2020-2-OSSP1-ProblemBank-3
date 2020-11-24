import React from 'react';
import "./style.scss";
import { useHistory } from 'react-router-dom';

function ProgressSidebar(props) {

	const history = useHistory();
    function handleFeedbackClick() {
		history.push("/admintestprogress")
	}

	function handleProblemEditClick() {
    	history.push("/admintestprogress/problemedit")
	}

    return (
	<div className="Sidebar">
	    <ul className="Sidebar-list">
	        <li>
	            <div id="Sidebar1">
	                <button class="accordion" onClick={handleFeedbackClick}>피드백 목록</button>
	            </div>
	        </li>
	        <li>
	            <div id="Sidebar2">
	                <button class="accordion" onClick={handleProblemEditClick}>문제 수정</button>
	            </div>
	        </li>
	    </ul>
	</div>
    )
}

export default ProgressSidebar
