import React, {Component, useState} from 'react'
import { withRouter } from 'react-router-dom';
import './style.scss'
import testAPI from '../../../../apis/tests';

class MyTestsTable extends Component{

    constructor(props) {
        super(props);
        this.state = {
            code: false,
            result: [],
        }

    }

    getMyTests = async()  => {
        const response = await testAPI.getUserTests({user_id: this.props.user.id});
        this.setState({
            code: response.result,
            result: response.data
        })
    }

    componentDidMount() {
        this.getMyTests()
    }

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
                        this.state.result.map((item,index) => {
                            let date = item.start.substring(0,item.start.indexOf('T'))
                            return (
                                <tr key = {index}>
                                    <td style={{textAlign: "center"}}>{index+1}</td>
                                    <td style={{textAlign: "center"}}>{item.test_name}</td>
                                    <td style={{textAlign: "center"}}><button>취소</button></td>
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

