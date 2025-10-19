import { Console } from "@woowacourse/mission-utils";

const DEFAULT_DELIM = /[,:]/;
const CUSTOM_DELIM = /\/\/(.*?)\n/;

class App {
  async run() {
    try {
      let userInput = await Console.readLineAsync(
        "덧셈할 문자열을 입력해주세요.\n"
      );
      console.log("입력한 값:", userInput);
      this.isValidInput(userInput);
      this.calculator(userInput);
    } catch (error) {
      this.errorMessage(error);
      throw error;
    }
  }
  calculator(userInput) {
    let result = 0;
    let splitText;
    let convertNum;
    let inputEnter = userInput.replace(/\\n/g, "\n");

    //커스텀 구분자
    if (CUSTOM_DELIM.test(inputEnter)) {
      let userDelim = inputEnter.match(CUSTOM_DELIM);
      userDelim = userDelim[1];
      splitText = inputEnter.replace(CUSTOM_DELIM, "").split(userDelim);
    }
    //기본 구분자
    else if (DEFAULT_DELIM.test(userInput)) {
      splitText = userInput.split(DEFAULT_DELIM);
    }
    //빈문자열
    else if (userInput === " ") {
      result = 0;
      Console.print(`결과 : ${result}`);
      return;
    } else {
      //
    }
    convertNum = splitText.map((num) => Number(num));
    result = convertNum.reduce((total, num) => total + num, 0);
    Console.print(`결과 : ${result}`);
  }

  isValidInput(userInput) {
    const inputEnter = userInput.replace(/\\n/g, "\n");

    // 1. 커스텀 구분자 검증
    if (CUSTOM_DELIM.test(inputEnter)) {
      let userDelim = inputEnter.match(CUSTOM_DELIM)[1];
      if (!userDelim) {
        throw new Error(`[ERROR] 커스텀 구분자 형식이 잘못되었습니다.`);
      }
    }
    // 2. 기본 구분자 검증
    const VALID_DEFAULT = /^[0-9,:-]+$/;
    if (!CUSTOM_DELIM.test(inputEnter) && !VALID_DEFAULT.test(inputEnter)) {
      throw new Error(`[ERROR] 기본 구분자 형식이 잘못되었습니다.`);
    }

    // 3. 숫자 검증
    let numbers = [];
    if (CUSTOM_DELIM.test(inputEnter)) {
      const delim = inputEnter.match(CUSTOM_DELIM)[1];
      numbers = inputEnter.replace(CUSTOM_DELIM, "").split(delim).map(Number);
    } else {
      numbers = inputEnter.split(DEFAULT_DELIM).map(Number);
    }

    if (numbers.some(isNaN)) {
      throw new Error(`[ERROR] 숫자가 아닌 값이 포함되어 있습니다.`);
    }

    // 4. 음수 검증
    if (numbers.some((n) => n < 0)) {
      throw new Error(`[ERROR] 음수는 입력할 수 없습니다.`);
    }

    return userInput;
  }

  errorMessage(error) {
    Console.print(error.message);
  }
}
export default App;
