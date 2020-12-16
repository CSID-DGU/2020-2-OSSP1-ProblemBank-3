import React, {Component} from 'react'
import { withRouter } from 'react-router-dom';
import './style.scss'

const moment = require('moment');

class TestResultTable extends Component{

    render() {
        return(
	    <div className="tableContent">
            <table className="table table-contribution">
                <thead>
                    <tr>
                        <th width = "5%">번호</th>
                        <th width = "35%">시험 명</th>
                        <th width = "15%">맞은 문제 수</th>
		                <th width = "15%">틀린 문제 수</th>
		                <th width = "10%">답안 확인</th>
                        <th width = "30%">응시일</th>
                    </tr>
                </thead>
                <tbody>
                    {
                        this.props.getResults().map((item,index) => {
                            let date = item.date.substring(0,item.date.indexOf('T'))
                            return (

                                <tr key = {index}>
                                    <td style={{textAlign: "center"}}>{index+1}</td>
                                    <td style={{textAlign: "center"}}>{item.test_name}</td>
                                    <td style={{textAlign: "center"}}>{item.correct}</td>
                                    <td style={{textAlign: "center"}}>{item.wrong}</td>
                                    <td style={{textAlign: "center"}}>
                                        {Date.parse(item.date) < Date.now() ? (
                                            <button>열람</button>
                                        ) : (
                                            <button2>열람</button2>
                                        )}
                                    </td>

                                    <td style={{textAlign: "center"}}>{date}</td>
                                </tr>
                            )
                        })
                    }
                </tbody>
            </table>
        </div>
        )
    }
}
export default withRouter(TestResultTable)

