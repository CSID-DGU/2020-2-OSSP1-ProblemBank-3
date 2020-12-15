import React, { PureComponent } from "react";
import Text from "../../../../components/DesignComponent/Text";
import Heading from "../../../../components/DesignComponent/Heading";
import Button from "../../../../components/DesignComponent/Button";

function TestDisplay(props)  {

    const 
    { onHeading, 
      test_name, 
      timestamp, 
      onButton,
      auth, 
      disabled, 
      type,
      //입장 전용
      isExam,
      onCancel,
    } = props;
    return (
        <div>
        <Heading level={4} onPress={onHeading}>{test_name}</Heading>
        <Text fade >{auth}</Text> <br />
        <Text fade >{timestamp}</Text> <br />
        <div>
        {
          (type === "enter" || type === "admin") ?
            (disabled?
              <Button test distance disabled onPress={onButton}>입장</Button>:
              <Button test distance onPress={onButton}>입장</Button>
            ):
            (disabled?
              <Button contest disabled onPress={onButton} >신청</Button>:
              <Button contest onPress={onButton}>신청</Button>
            )
        }
        {
          (type === "enter" && Number(isExam) === 0) ?
          (disabled?
            <Button test disabled onPress={onCancel}>취소</Button>:
            <Button test onPress={onCancel}>취소</Button>
          ): ""
          
        }
        </div>
      </div>
    );
}


export default TestDisplay;
