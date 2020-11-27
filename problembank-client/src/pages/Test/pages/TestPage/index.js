import React,  { useEffect, useState } from 'react'
import "./style.scss";
import TestLayout from "../../../../layouts/TestLayout";
import InlineList from "../../../../components/DesignComponent/InlineList";
import Input from "../../../../components/DesignComponent/Input";
import Text from "../../../../components/DesignComponent/Text";
import Spacing from "../../../../components/DesignComponent/Spacing";
import Select, { Option } from "../../../../components/DesignComponent/Select";
import Heading from "../../../../components/DesignComponent/Heading";
import Button from "../../../../components/DesignComponent/Button";


import TestDisplay from '../../components/TestDisplay';
import Loading from '../../../../components/Loading/Loading';
import {Consumer as ModalConsumer} from '../../../../components/Modal/createModalProvider';
import {NOTICE_MODAL} from '../../../../components/Modal/ModalProviderWithKey';
import testsAPI from '../../../../apis/tests';


function TestPage(props) {
  const [loading, setLoading] = useState(true);
  const [tests, setTests] = useState([]);
  const [lastIndex, setLastIndex] = useState();

  useEffect(()=>{
    if(loading){
      setTestList();
      setLoading(false)
    }
    console.log("updated");
  },[loading, tests])

  const setTestList = async () => {
    try{
      const params = {
        user_id: 2,
      };
      const response = await testsAPI.getUserTests(params);
      const number = response.data.length -1;
      setTests(response.data);
      setLastIndex(number-(number%3));
    } catch (error) {
        alert("서버 오류입니다. 잠시 후 다시 시도해주세요.");
        console.log(error)
    }  
  }

  const TestButton = async () => {
    try{
      const params = {
        user_id: 2,
      };
      const response = await testsAPI.getUserTests(params);
        console.log(tests);
    } catch (error) {
        alert("서버 오류입니다. 잠시 후 다시 시도해주세요.");
        console.log(error)
    }
    
  }

  if(loading){
    return <Loading  type={'bars'} color={'black'}  />
  } 
  return (
    <TestLayout>
      <Spacing vertical={3} />
      <InlineList align="center">
        <Select name="type">
          <Option label="시험" value="text" />
          <Option label="대회" value="contest" />
        </Select>
        <Input
          name="content"
          type="text"
          placeholder="내용을 입력해주세요"
          width={100}
        />
        <Input type="checkbox" />
        <Text>입장/신청 가능만 보기</Text>
      </InlineList>
      <Spacing vertical={10} />
      <div className="test-body"> 
        <Spacing horizontal={50}>
          <ModalConsumer>
          {({openModal})=>(
          <div>
        { 
          tests.length !=0 &&
          tests.map((value, index, itself)=>{
            var prac;
            if(index%3 ==0){
              if(index%3 !=lastIndex){
                prac = itself.slice(index, index+3);
              } else {
                prac = itself.slice(index, index+(tests.length%3));
              }
              return (
                <InlineList distribution contentDistribution>
                  {
                    prac.map((value, index)=>{
                      var start = new Date(value.start);
                      var end = new Date(value.end);
                      var startString = start.getFullYear() +"-"+start.getMonth()+"-"+start.getDate()+" "+start.getHours()+":"+start.getMonth();
                      var endString = end.getFullYear() +"-"+end.getMonth()+"-"+end.getDate()+" "+end.getHours()+":"+end.getMonth();
                      var totalString = startString + " ~ " + endString;
                      return <TestDisplay onHeading={()=>{
                          if(value.content)
                            openModal(NOTICE_MODAL, {title:value.test_name ,auth:value.admin_name, content: value.content})
                        }}
                        onButton={() => props.history.push(`/test/view?index=0&test_id=${value.test_id}`)}
                        test_name={value.test_name} timestamp={totalString} auth={value.admin_name}/>;
                    })
                  }
                </InlineList>
              );
            }

          })
        }
        {/* <InlineList align="right" distribution>
          <div>
            <Heading level={4}>[기초프로그래밍] 중간고사</Heading>
            <Text fade >김가영 교수님 - 시험</Text> <br />
            <Text fade >2020-11-11 12:00 ~ 2020-11-11 18:00</Text> <br />
            <Button disabled>불가</Button>
          </div>
          <div>
            <Heading level={4}>[심화프로그래밍] 중간고사</Heading>
            <Text fade >김준태 교수님 - 시험</Text> <br />
            <Text fade >2020-11-11 12:00 ~ 2020-11-11 18:00</Text> <br />
            <Button test>입장</Button>
          </div>
          <div>
            <Heading level={4}>2020 동국대학교 프로그래밍 경진대회</Heading>
            <Text fade >손윤식 교수님 - 대회</Text> <br />
            <Text fade >2020-11-11 12:00 ~ 2020-11-11 18:00</Text> <br />
            <Button contest>입장</Button>
          </div>
        </InlineList>
        <InlineList align="right" distribution>
          <div>
            <Heading level={4}>[기초프로그래밍] 중간고사</Heading>
            <Text fade >김가영 교수님 - 시험</Text> <br />
            <Text fade >2020-11-11 12:00 ~ 2020-11-11 18:00</Text> <br />
            <Button test>입장</Button>
          </div>
          <div>
            <Heading level={4}>[심화프로그래밍] 중간고사</Heading>
            <Text fade >김준태 교수님 - 시험</Text> <br />
            <Text fade >2020-11-11 12:00 ~ 2020-11-11 18:00</Text> <br />
            <Button disabled>불가</Button>
          </div>
          <div>
            <Heading level={4}>2020 동국대학교 프로그래밍 경진대회</Heading>
            <Text fade >손윤식 교수님 - 대회</Text> <br />
            <Text fade >2020-11-11 12:00 ~ 2020-11-11 18:00</Text> <br />
            <Button contest>입장</Button>
          </div>
        </InlineList> */}
        </div>
        )}
        </ModalConsumer>
        
        </Spacing>
        
      </div>
      <Button test onPress={()=>TestButton()}>실험용</Button>
    </TestLayout>
  );
}

export default TestPage;
