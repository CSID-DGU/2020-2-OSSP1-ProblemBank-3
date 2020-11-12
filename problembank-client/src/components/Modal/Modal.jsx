import React, {PureComponent} from 'react';
import styled from 'styled-components'

class Modal extends PureComponent {

    render() {
        const {children} = this.props;
        return(
        <Wrapper>
            <div className="modal_overlay">
                <div className="modal_wrapper">
                    <div className="modal_container">
                    {children}
                    </div>
                </div>
            </div>
        </Wrapper>
        )
        
        
    }
}

const Wrapper = styled.div`
    .modal_overlay{
        position: fixed;
        z-index: 9999;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        background-color: rgba(0,0,0,.5);
        .modal_wrapper{
            vertical-align: center;
            .modal_container{
                margin: 40px auto 0px;
                padding: 16px;
                background-color: white;
                width: 400px;
            }
        }
    }


`

export default Modal;