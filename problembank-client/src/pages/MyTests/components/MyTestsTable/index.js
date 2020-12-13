import React, {Component, useState} from 'react'
import {Link, withRouter} from 'react-router-dom';
import './style.scss'
import testAPI from '../../../../apis/tests';


class MyTestsTable extends Component{

    // handleClick = (test_id) => {
    //     console.log("click!")
    //     testAPI.cancelReg({user_id: this.props.user.id, test_id: test_id})
    // }

    render() {
        return(
	    <div className="tableContent">
            <table className="table table-contribution">
                <thead>
                    <tr>
                        <th width = "5%">번호</th>
                        <th width = "40%">시험명</th>
                        <th width = "25%">신청 취소</th>
                        <th width = "30%">응시일</th>
                    </tr>
                </thead>
                <tbody>
                    {
                        this.props.getTests().map((item,index) => {
                            let date = item.date.substring(0,item.date.indexOf('T'))
                            return (
                                <tr key = {index}>
                                    <td style={{textAlign: "center"}}>{index+1}</td>
                                    <td style={{textAlign: "center"}}>{item.test_name}</td>
                                    <td style={{textAlign: "center"}}>
                                        {item.is_exam ? (
                                            <button2>불가</button2>
                                        ) : (
                                            <button onClick={() => this.props.handleClick(item.test_id)}>취소</button>
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
export default withRouter(MyTestsTable)

