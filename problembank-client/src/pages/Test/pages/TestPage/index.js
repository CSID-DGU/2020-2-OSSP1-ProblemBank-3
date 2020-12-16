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
import WrapperLoading from '../../../../components/WrapperLoading';

import TestDisplay from '../../components/TestDisplay';
import Loading from '../../../../components/Loading/Loading';
import {Consumer as ModalConsumer} from '../../../../components/Modal/createModalProvider';
import {NOTICE_MODAL} from '../../../../components/Modal/ModalProviderWithKey';
import testsAPI from '../../../../apis/tests';
import userAPI from '../../../../apis/users';



function TestPage(props) {
  const [loading, setLoading] = useState(false);
  const [allLoading, setAllLoading] = useState(true);
  const [constList, setConstList] = useState([]); // 한번 가져오면 변하지 않는 리스트
  const [totalList, setTotalList] = useState([]);
  const [first, setFirst] = useState(false);
  const [vaildButton, setVaildButton] = useState(false);
  const [searchValue, setSearchValue]= useState("");
  const [typeValue, setTypeValue] = useState("all");
  const {user} = props;
  
  useEffect(()=>{
    if(!first){
      setTestList();
    } 
    console.log("updated");
  },[ totalList, first])

  const setTestList = async () => {
    try{
      setVaildButton(false);
      setSearchValue("");
      setTypeValue("all");
      if(user.is_admin==0){
        const params = {
          user_id: user.id,
        };
        // 신청하지 않은 contest 목록 가져오기
        const response = await testsAPI.getAllTestData(params);
        const entry = response.data.filter((value)=> {
          return (Number(value.in_entry)===1);
        });
        const entry2 = response.data.filter((value)=> {
          return (Number(value.in_entry)===0 && Number(value.is_exam)===0);
        });
  
        // 두 배열을 합치기
        const result = entry.concat(entry2);
        setFirst(true);
        setTotalList(result);
        setConstList(result);
      } else {
        const params = {
          admin_id: user.id,
        };
        const response = await testsAPI.getAdminTestList(params);
        const result = response.data;
        setFirst(true);
        setTotalList(result);
        setConstList(result);
      }
      setAllLoading(false);
    } catch (error) {
        alert("서버 오류입니다. 잠시 후 다시 시도해주세요.");
        console.log(error)
    }  
  }

  const regTest = async (value)=> {
    try{
      setAllLoading(true);
      const params = {
        user_id: user.id,
        test_id:value,
      };
      const response = await testsAPI.regTest(params);
      console.log(response);
      setFirst(false);
    } catch (error) {
        alert("서버 오류입니다. 잠시 후 다시 시도해주세요.");
        console.log(error)
    }
  }

  const cancelReg = async (value)=> {
    try{
      setAllLoading(true)
      const params = {
        user_id: user.id,
        test_id:value,
      };
      const response = await testsAPI.cancelReg(params);
      console.log(response);
      setFirst(false);
    } catch (error) {
        alert("서버 오류입니다. 잠시 후 다시 시도해주세요.");
        console.log(error)
    }
  }

  const OnVaildButton = (name, value) => {
    if(value) {
      setVaildButton(true);
      TotalUpdate(true,searchValue, typeValue);
    } else{
      setVaildButton(false);
      TotalUpdate(false,searchValue, typeValue);
    }

  }

  const  OnSearchInput = (name, value) => {

    setSearchValue(value);
    TotalUpdate(vaildButton,value, typeValue);
  }

  const OnTypeToggle = (name, value) => {
    setTypeValue(value); //typeValue
    console.log(value);
    if(value=="test"){
      TotalUpdate(vaildButton,searchValue, "test");
    } else if(value=="contest") {
      TotalUpdate(vaildButton,searchValue, "contest");
    } else {
      TotalUpdate(vaildButton,searchValue, "all");
    }
  }
  const TotalUpdate = (valid, serchVal, type) => {
    setLoading(true);
    if(valid) {
      const entry = constList.filter((value)=> {
        var start = new Date(value.start);
        var end = new Date(value.end);
        var now = new Date();
        var invalid = false; 
        if(now>end || now<start) invalid = true;
        return !invalid;
      });
      const entry2 = entry.filter((value)=>{
        return value.name.match(new RegExp(serchVal, "i"));
      });
      
      if(type=="test"){
        const result = entry2.filter((value)=>{
          return Number(value.is_exam) == 1;
        });
        setTotalList(result);
      } else if (type=="contest") {
        const result = entry2.filter((value)=>{
          return Number(value.is_exam) == 0;
        });
        setTotalList(result);
      } else {
        setTotalList(entry2);
      }

    } else{

      const entry = constList.filter((value)=>{
        console.log(value.is_exam);
        return value.name.match(new RegExp(serchVal, "i"));
      });

      if(type=="test"){
        const result = entry.filter((value)=>{
          return Number(value.is_exam) == 1;
        });
        setTotalList(result);
      } else if (type=="contest") {
        const result = entry.filter((value)=>{
          return Number(value.is_exam) == 0;
        });
        setTotalList(result);
      } else {
        setTotalList(entry);
      }


    }
    setInterval(function(){ setLoading(false)}, 500);
  }

  const TestButton = async () => {
    try{
      // const params = {
      //   admin_id: 1,
      // };
      // const response = await testsAPI.getAdminTestList(params);
      console.log(totalList);
    } catch (error) {
        alert("서버 오류입니다. 잠시 후 다시 시도해주세요.");
        console.log(error)
    }
    
  }

  if(allLoading){
    return <Loading  type={'bars'} color={'black'}  />
  }
  return (
    <TestLayout>
      <Spacing vertical={3} />
      <InlineList align="center">
        <Select name="type" value={typeValue} onChange={OnTypeToggle}>
          <Option label="모두" value="all" />
          <Option label="시험" value="test" />
          <Option label="대회" value="contest" />
        </Select>
        <Input
          name="content"
          type="text"
          placeholder="내용을 입력해주세요"
          width={100}
          onChange= {OnSearchInput}
          value={searchValue}
        />
        <Input type="checkbox" name="vaildTest" onChange={OnVaildButton} checked={vaildButton}/>
        <Text>입장/신청 가능만 보기</Text>
      </InlineList>
      <Spacing vertical={10} />
      <div className="test-body"> 
        <Spacing horizontal={50}>
          <ModalConsumer>
          {({openModal})=>(
          <div>
        { loading ? 
          <WrapperLoading type={'bars'} color={'black'} />
          :
          (user.is_admin == 0)?
          totalList.length !=0 &&
          totalList.map((value, index, itself)=>{
            var prac;
            if(index%3 ==0){
              if(totalList.length-index >=3){
                prac = itself.slice(index, index+3);
              } else {
                prac = itself.slice(index, index+(totalList.length%3));
                for(var i=0; i<(3-totalList.length%3);i++){
                  prac.push(<div></div>);
                }
              }
              return (
                <InlineList distribution contentDistribution>
                  {
                    prac.map((value, index)=>{
                      if(value.type=="div") return value;
                      var start = new Date(value.start);
                      var end = new Date(value.end);
                      var now = new Date();
                      var invalid = false; 
                      if(now>end || now<start) invalid = true;
                      var startString = start.getFullYear() +"-"+(start.getMonth()+1)+"-"+start.getDate()+" "+start.getHours()+":"+ (start.getMinutes()<10?'0':'') + start.getMinutes();
                      var endString = end.getFullYear() +"-"+(end.getMonth()+1)+"-"+end.getDate()+" "+end.getHours()+":"+ (end.getMinutes()<10?'0':'') + end.getMinutes();
                      var totalString = startString + " ~ " + endString;
                      if(Number(value.in_entry)===1){ // 과목 시험이거나 내가 신청한 대회면은
                        return <TestDisplay onHeading={()=>{  
                          if(value.content)
                            openModal(NOTICE_MODAL, {title:value.name ,auth:value.admin_name, content: value.content})
                        }}
                        onButton={() => props.history.push(`/test/view?index=0&test_id=${value.id}`)}
                        test_name={value.name} timestamp={totalString} auth={value.admin_name}
                        disabled={invalid} type="enter" isExam={value.is_exam} 
                        onCancel={()=>{cancelReg(value.id);}}/>;
                      } else{
                        return <TestDisplay onHeading={()=>{
                          if(value.content)
                            openModal(NOTICE_MODAL, {title:value.name ,auth:value.admin_name, content: value.content})
                        }}
                        onButton={()=>{regTest(value.id);}}
                        test_name={value.name} timestamp={totalString} auth={value.admin_name}
                        disabled={!invalid} type="apply"/>;
                      }
                    })
                  }
                </InlineList>
              );
            }

          })
          :
          totalList.length !=0 &&
          totalList.map((value, index, itself)=>{
            var prac;
            if(index%3 ==0){ // 3개씩 처리
              if(totalList.length-index >=3){ // 끝부분이 3개로 정확히 나누어질 때 
                prac = itself.slice(index, index+3);
              } else {
                prac = itself.slice(index, index+(totalList.length%3));
                for(var i=0; i<(3-totalList.length%3);i++){
                  prac.push(<div></div>);
                }
              }
              return (
                <InlineList distribution contentDistribution>
                  {
                    prac.map((value, index)=>{
                      if(value.type=="div") return value;
                      var start = new Date(value.start);
                      var end = new Date(value.end);
                      var now = new Date();
                      var invalid = false; 
                      if(now>end || now<start) invalid = true;
                      var startString = start.getFullYear() +"-"+(start.getMonth()+1)+"-"+start.getDate()+" "+start.getHours()+":"+ (start.getMinutes()<10?'0':'') + start.getMinutes();
                      var endString = end.getFullYear() +"-"+(end.getMonth()+1)+"-"+end.getDate()+" "+end.getHours()+":"+ (end.getMinutes()<10?'0':'') + end.getMinutes();
                      var totalString = startString + " ~ " + endString;
                      return <TestDisplay onHeading={()=>{  
                        if(value.content)
                          openModal(NOTICE_MODAL, {title:value.name ,auth:user.name, content: value.content})
                      }}
                      // 이동하고 싶은 페이지 주소 적기
                      // onButton={() => props.history.push(`/test/view?index=0&test_id=${value.id}`)}
                      
                      onButton={() => props.history.push(`/test/adminprogress?test_id=${value.id}`)}
                      test_name={value.name} timestamp={totalString} auth={value.admin_name}
                      disabled={invalid} type="admin" isExam={value.is_exam} 
                      />;
                    })
                  }
                </InlineList>
              );
            }

          })
        }
        </div>
        )}
        </ModalConsumer>
        
        </Spacing>
        
      </div>
      {/* <Button test onPress={()=>TestButton()}>실험용</Button> */}
    </TestLayout>
  );
}

export default TestPage;
