import React, {Component} from 'react'
import PropTypes from 'prop-types'
import { withRouter } from 'react-router-dom';
import './style.scss'
import testAPI from '../../../../apis/tests';

const moment = require('moment');

class AdminResultTable extends Component{
    constructor(props) {
        super(props);
        this.state = {
            code: false,
            result: []
        }
    }

    getResultAdmin = async()  => {
        const response = await testAPI.getResultAdmin({test_id: 1});
        this.setState({
            code: response.result,
            result: response.data
        })
    }

    componentDidMount() {
        this.getResultAdmin()
    }

    render() {
        return(
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
                        this.state.result.map((item,index) => {
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
    }
}
export default withRouter(AdminResultTable)

