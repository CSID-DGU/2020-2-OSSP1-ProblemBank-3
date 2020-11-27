import React, { PureComponent } from "react";
import Text from "../../../../components/DesignComponent/Text";
import Heading from "../../../../components/DesignComponent/Heading";
import Button from "../../../../components/DesignComponent/Button";

function TestDisplay(props)  {

    const { onHeading, test_name, timestamp, onButton, auth} = props;
    return (
        <div>
        <Heading level={4} onPress={onHeading}>{test_name}</Heading>
        <Text fade >{auth}</Text> <br />
        <Text fade >{timestamp}</Text> <br />
        <Button test onPress={onButton}> 입장</Button>
      </div>
    );
}


export default TestDisplay;
