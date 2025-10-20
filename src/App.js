import { Console } from "@woowacourse/mission-utils";

class App {
  async run() {
    try {
      const USER_INPUT = await Console.readLineAsync(
        "덧셈할 문자열을 입력해주세요.\n"
      );
      if (USER_INPUT.trim() === "") {
        Console.print(0);
        return 0;
      }
      const INPUT_ENTER = USER_INPUT.replace(/\\n/g, "\n");
      const VALIDATED_NUMBERS = this.processInput(INPUT_ENTER);
      const RESULT = this.calculator(VALIDATED_NUMBERS);
      Console.print(`결과 : ${RESULT}`);
    } catch (error) {
      this.errorMessage(error);
      throw error;
    }
  }
  processInput(INPUT_ENTER) {
    const DEFAULT_DELIM = /[,:]/;
    const CUSTOM_DELIM = /\/\/(.*?)\n/;
    const HAS_CUSTOM_DELIM = CUSTOM_DELIM.test(INPUT_ENTER);
    let numbers = [];

    // 1. 커스텀 구분자 검증
    let parsingDelim;
    if (HAS_CUSTOM_DELIM) {
      parsingDelim = INPUT_ENTER.match(CUSTOM_DELIM)[1];
      if (!parsingDelim) {
        throw new Error(`[ERROR] 커스텀 구분자 형식이 잘못되었습니다.`);
      }
    }

    // 2. 기본 구분자 검증
    const VALID_DEFAULT = /^[0-9a-zA-Z,:-]+$/;
    if (!HAS_CUSTOM_DELIM && !VALID_DEFAULT.test(INPUT_ENTER)) {
      throw new Error(`[ERROR] 구분자 형식이 잘못되었습니다.`);
    }

    // 3. 숫자 검증
    if (HAS_CUSTOM_DELIM) {
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

    return numbers;
  }

  calculator(VALIDATED_NUMBERS) {
    return VALIDATED_NUMBERS.reduce((total, num) => total + num, 0);
  }

  errorMessage(error) {
    Console.print(error.message);
  }
}
export default App;
