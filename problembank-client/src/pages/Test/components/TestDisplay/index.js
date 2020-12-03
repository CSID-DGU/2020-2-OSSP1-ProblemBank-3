import React, { PureComponent } from "react";
import Text from "../../../../components/DesignComponent/Text";
import Heading from "../../../../components/DesignComponent/Heading";
import Button from "../../../../components/DesignComponent/Button";

function TestDisplay(props)  {

    const { onHeading, test_name, timestamp, onButton, auth, disabled, type} = props;
    return (
        <div>
        <Heading level={4} onPress={onHeading}>{test_name}</Heading>
        <Text fade >{auth}</Text> <br />
        <Text fade >{timestamp}</Text> <br />
        {
          (type === "enter") ?
            (disabled?<Button test onPress={onButton} >입장</Button>:<Button test onPress={onButton}>입장</Button>):
            (disabled?<Button contest onPress={onButton} >신청</Button>:<Button contest onPress={onButton}>신청</Button>)
        }
        
      </div>
    );
}


export default TestDisplay;
