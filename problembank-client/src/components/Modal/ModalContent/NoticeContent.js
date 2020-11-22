import React from 'react';
import {Consumer} from '../ModalContext';
import Button from '../../DesignComponent/Button';
import Text from '../../DesignComponent/Text';
import Scroll from '../../DesignComponent/Scroll';
import Spacing from '../../DesignComponent/Spacing';
import Heading from '../../DesignComponent/Heading';
import InlineList from '../../DesignComponent/InlineList';

export default function NoticeContent({title, auth, text}) { //나중에 서버에서 받아오는 것으로 바꾸기
    return (
        <Consumer>
            {({closeModal})=> (
                <div>
                    <div style={{float:'right'}}>
                    <Button onPress={closeModal}>X</Button>
                    </div>
                    <InlineList>
                        <Heading level={3}>{title}</Heading>
                        <Text fade >{auth}</Text>
                    </InlineList>
                    <Spacing vertical={5}>
                    <Scroll>
                       <p>중간고사 공지사항입니다.</p> <br/>
                       <p>인생을 풀부하게 하는 것이다 보라 청춘을! 그들의 몸이 얼마나 튼튼하며 그들의 피부가 얼마나 생생하며 그들의</p> <br/>
                       <p>날카로우나 갑 속에 든 칼이다 청춘의 끓는 피가 아니더면 인간이 얼마나 쓸쓸하랴? 얼음에 싸인 만물은 얼음이 있을 뿐이다. 
                           그들에게 생명을 불어 넣는 것은 따뜻한 봄바람이다. 풀밭에 속잎나고 가지에 싹이 트고 꽃 피고 새 우는 봄날의 
                           천지는 얼마나 기쁘며 얼마나 아름다우냐? 이것을 얼음</p> <br/>
                       <p>안녕하세요</p> <br/>
                       <p>안녕하세요</p> <br/>
                       <p>안녕하세요</p> <br/>
                       <p>안녕하세요</p> <br/>
                       <p>안녕하세요</p> <br/>
                       <p>안녕하세요</p> <br/>
                       <p>안녕하세요</p> <br/>
                       <p>안녕하세요</p> <br/>

                    </Scroll>
                    </Spacing>
                </div>
            )}
        </Consumer>
        
    );
}