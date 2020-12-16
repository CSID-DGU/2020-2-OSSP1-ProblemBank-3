import React, {Component, useState} from 'react'
import {Link, withRouter} from 'react-router-dom';
import './style.scss'
import testAPI from '../../../../../apis/tests';


class MyTestsTable extends Component{

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
                        this.props.testLists.map((item,index) => {
                            let date = item.date.substring(0,item.date.indexOf('T'))
                            return (
                                <tr key = {index}>
                                    <td style={{textAlign: "center"}}>{index+1}</td>
                                    <td style={{textAlign: "center"}}>{item.test_name}</td>
                                    <td style={{textAlign: "center"}}>
                                        {item.is_exam ? (
                                            <buttonGrey>불가</buttonGrey>
                                        ) : (
                                            <buttonRed onClick={() => this.props.handleClick(item.test_id)}>취소</buttonRed>
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

