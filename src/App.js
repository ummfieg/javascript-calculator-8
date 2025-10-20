import { Console } from "@woowacourse/mission-utils";

const DEFAULT_DELIM = /[,:]/;
const CUSTOM_DELIM = /\/\/(.*?)\n/;

class App {
  async run() {
    try {
      let userInput = await Console.readLineAsync(
        "덧셈할 문자열을 입력해주세요.\n"
      );
      console.log(userInput);
      const INPUT_ENTER = userInput.replace(/\\n/g, "\n");
      this.processInput(INPUT_ENTER);
      this.calculator(INPUT_ENTER);
    } catch (error) {
      this.errorMessage(error);
      throw error;
    }
  }
  calculator(INPUT_ENTER) {
    let result = 0;
    let splitText;
    let convertNum;

    //커스텀 구분자
    if (CUSTOM_DELIM.test(INPUT_ENTER)) {
      let userDelim = INPUT_ENTER.match(CUSTOM_DELIM);
      userDelim = userDelim[1];
      splitText = INPUT_ENTER.replace(CUSTOM_DELIM, "").split(userDelim);
    }
    //기본 구분자
    else if (DEFAULT_DELIM.test(INPUT_ENTER)) {
      splitText = INPUT_ENTER.split(DEFAULT_DELIM);
    }
    //빈문자열
    else if (INPUT_ENTER === "") {
      result = 0;
      Console.print(`결과 : ${result}`);
      return;
    }
    convertNum = splitText.map((num) => Number(num));
    result = convertNum.reduce((total, num) => total + num, 0);
    Console.print(`결과 : ${result}`);
  }

  processInput(INPUT_ENTER) {
    const HAS_CUSTOM_DELIM = CUSTOM_DELIM.test(INPUT_ENTER);

    // 1. 커스텀 구분자 검증
    if (HAS_CUSTOM_DELIM) {
      let userDelim = INPUT_ENTER.match(CUSTOM_DELIM)[1];
      if (!userDelim) {
        throw new Error(`[ERROR] 커스텀 구분자 형식이 잘못되었습니다.`);
      }
    }
    // 2. 기본 구분자 검증
    const VALID_DEFAULT = /^[0-9a-zA-Z,:-]+$/;
    if (!HAS_CUSTOM_DELIM && !VALID_DEFAULT.test(INPUT_ENTER)) {
      throw new Error(`[ERROR] 구분자 형식이 잘못되었습니다.`);
    }

    // 3. 숫자 검증
    let numbers = [];
    if (HAS_CUSTOM_DELIM) {
      let parsingDelim = INPUT_ENTER.match(CUSTOM_DELIM)[1];
      numbers = INPUT_ENTER.replace(CUSTOM_DELIM, "")
        .split(parsingDelim)
        .map(Number);
    } else {
      numbers = INPUT_ENTER.split(DEFAULT_DELIM).map(Number);
    }

    if (numbers.some(isNaN)) {
      throw new Error(`[ERROR] 숫자가 아닌 값이 포함되어 있습니다.`);
    }

    // 4. 음수 검증
    if (numbers.some((num) => num < 0)) {
      throw new Error(`[ERROR] 음수는 입력할 수 없습니다.`);
    }

    return INPUT_ENTER;
  }
  errorMessage(error) {
    Console.print(error.message);
  }
}
export default App;
