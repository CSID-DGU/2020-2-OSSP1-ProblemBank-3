import React from "react";
import Select, {Option} from "../../../../components/DesignComponent/Select";
import Input from "../../../../components/DesignComponent/Input";
import Text from "../../../../components/DesignComponent/Text";
function ProblemEditPage() {
    // 서버에서 받아온 다음 onChange 함수 만들어줘야함
    return(
        <>
            <Select name="type">
                <Option label="몫과 나머지" value="problem1" />
                <Option label="몫과 나머지2" value="problem2" />
                <Option label="몫과 나머지3" value="problem3" />
                <Option label="몫과 나머지4" value="problem4" />
            </Select>
            <Input
                name="title"
                type="text"
                placeholder="문제 제목"
                value="1. 몫과 나머지"
                width={100}
            />
            <Text>문제 정의</Text>
            <Input
                name="problem_definition"
                type="text"
                placeholder="문제 정의"
                value="두 수 a, b를 입력받아 a를 b로 나눈 몫과 나머지를 반환하는 프로그램을 작성해 봅시다."
                width={200}
            />

            <Text>입력</Text>
            <Input
                name="input"
                type="text"
                placeholder="입력 조건"
                value="10000이하의 두 자연수"
                width={200}
            />

            <Text>출력</Text>
           <Input
                name="output"
                type="text"
                placeholder="출력 조건"
                value="몫과 나머지"
                width={200}
            />
            <Text>입력 예제</Text>
            <Input
                name="input_case1"
                type="text"
                placeholder="입력 테스트케이스"
                width={100}
            />
            <Input
                name="input_case2"
                type="text"
                placeholder="입력 테스트케이스"
                width={100}
            />
            <Input
                name="input_case3"
                type="text"
                placeholder="입력 테스트케이스"
                width={100}
            />
            <Input
                name="input_case4"
                type="text"
                placeholder="입력 테스트케이스"
                width={100}
            />
            <Input
                name="input_case5"
                type="text"
                placeholder="입력 테스트케이스"
                width={100}
            />
            <Text>출력 예제</Text>
            <Input
                name="output_case1"
                type="text"
                placeholder="출력 테스트케이스"
                width={100}
            />
            <Input
                name="output_case2"
                type="text"
                placeholder="출력 테스트케이스"
                width={100}
            />
            <Input
                name="output_case3"
                type="text"
                placeholder="출력 테스트케이스"
                width={100}
            />
            <Input
                name="output_case4"
                type="text"
                placeholder="출력 테스트케이스"
                width={100}
            />
            <Input
                name="output_case5"
                type="text"
                placeholder="출력 테스트케이스"
                width={100}
            />

        </>
    )
}

export default ProblemEditPage