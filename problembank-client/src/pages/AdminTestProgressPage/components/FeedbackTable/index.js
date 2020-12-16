import React, {Component} from 'react'
import PropTypes from 'prop-types'
import { withRouter } from 'react-router-dom';
import './style.scss'
import testAPI from '../../../../apis/tests';
const moment = require('moment');

class FeedbackTable extends Component{
    // const { problems } = props;
    constructor(props) {
        super(props);
        this.state = {
            code: false,
            feedbacks: []
        }
    }

    getFeedbacks = async()  => {
        const response = await testAPI.getTestFeedback({test_id: this.props.test_id});
        this.setState({
            code: response.result,
            feedbacks: response.data
        });
    }

    componentDidMount() {
        this.getFeedbacks();
    }

    render() {
        return(<div>
            <table className="table table-contribution">
                <thead>
                    <tr>
                        <th width = "5%">번호</th>
                        <th width = "70%">내용</th>
                        <th width = "10%">작성자</th>
                        <th width = "15%">작성일</th>
                    </tr>
                </thead>
                <tbody>
                    {
                        
                        this.state.feedbacks.map((item,index) => {
                            return (

                                <tr key = {index}>
                                    <td style={{textAlign: "center"}}>{index+1}</td>
                                    <td>{item.content}</td>
                                    <td style={{textAlign: "center"}}>{item.author_name}</td>
                                    <td>{moment(item.created).format("YYYY-MM-DD")}</td>
                                </tr>
                            )
                        })
                    }
                </tbody>
            </table>
            {
                this.state.feedbacks.length == 0 ? <p className="empty-feedbacks">도착한 피드백이 없습니다.</p>:null
            }
            </div>
        )
    }
}
export default withRouter(FeedbackTable)

