import React, { useState } from "react";
import "./style.scss";
import TestLayout from "../../../../layouts/TestLayout";
import InlineList from "../../../../components/DesignComponent/InlineList";
import Input from "../../../../components/DesignComponent/Input";
import Text from "../../../../components/DesignComponent/Text";
import Spacing from "../../../../components/DesignComponent/Spacing";
import Select, { Option } from "../../../../components/DesignComponent/Select";
import Heading from "../../../../components/DesignComponent/Heading";
import Button from "../../../../components/DesignComponent/Button";

function TestPage(props) {
  const [loading, setLoading] = useState(false);
  const [type, setType] = useState(false);

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
        <InlineList align="right" distribution>
          <div>
            <Heading level={3}>[기초프로그래밍] 중간고사</Heading>
            <Text fade >김가영 교수님 - 시험</Text> <br />
            <Text fade >2020-11-11 12:00 ~ 2020-11-11 18:00</Text> <br />
            <Button test>입장</Button>
          </div>
          <div>
            <Heading level={3}>[심화프로그래밍] 중간고사</Heading>
            <Text fade >김준태 교수님 - 시험</Text> <br />
            <Text fade >2020-11-11 12:00 ~ 2020-11-11 18:00</Text> <br />
            <Button test>입장</Button>
          </div>
          <div>
            <Heading level={3}>2020 동국대학교 프로그래밍 경진대회</Heading>
            <Text fade >손윤식 교수님 - 대회</Text> <br />
            <Text fade >2020-11-11 12:00 ~ 2020-11-11 18:00</Text> <br />
            <Button disabled>불가</Button>
          </div>
        </InlineList>
        <InlineList align="right" distribution>
          <div>
            <Heading level={3}>[기초프로그래밍] 중간고사</Heading>
            <Text fade >김가영 교수님 - 시험</Text> <br />
            <Text fade >2020-11-11 12:00 ~ 2020-11-11 18:00</Text> <br />
            <Button disabled>불가</Button>
          </div>
          <div>
            <Heading level={3}>[심화프로그래밍] 중간고사</Heading>
            <Text fade >김준태 교수님 - 시험</Text> <br />
            <Text fade >2020-11-11 12:00 ~ 2020-11-11 18:00</Text> <br />
            <Button test>입장</Button>
          </div>
          <div>
            <Heading level={3}>2020 동국대학교 프로그래밍 경진대회</Heading>
            <Text fade >손윤식 교수님 - 대회</Text> <br />
            <Text fade >2020-11-11 12:00 ~ 2020-11-11 18:00</Text> <br />
            <Button contest>입장</Button>
          </div>
        </InlineList>
        <InlineList align="right" distribution>
          <div>
            <Heading level={3}>[기초프로그래밍] 중간고사</Heading>
            <Text fade >김가영 교수님 - 시험</Text> <br />
            <Text fade >2020-11-11 12:00 ~ 2020-11-11 18:00</Text> <br />
            <Button test>입장</Button>
          </div>
          <div>
            <Heading level={3}>[심화프로그래밍] 중간고사</Heading>
            <Text fade >김준태 교수님 - 시험</Text> <br />
            <Text fade >2020-11-11 12:00 ~ 2020-11-11 18:00</Text> <br />
            <Button disabled>불가</Button>
          </div>
          <div>
            <Heading level={3}>2020 동국대학교 프로그래밍 경진대회</Heading>
            <Text fade >손윤식 교수님 - 대회</Text> <br />
            <Text fade >2020-11-11 12:00 ~ 2020-11-11 18:00</Text> <br />
            <Button contest>입장</Button>
          </div>
        </InlineList>
        </Spacing>
        
      </div>
    </TestLayout>
  );
}

export default TestPage;
