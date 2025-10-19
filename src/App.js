import { Console } from "@woowacourse/mission-utils";

class App {
  async run() {
    try {
      let userInput = await Console.readLineAsync(
        "덧셈할 문자열을 입력해주세요.\n"
      );
      console.log("입력한 값:", userInput);
      this.calculator(userInput);
    } catch (error) {
      throw error;
    }
  }
  calculator(userInput) {
    let result = 0;
    let splitText;
    let convertNum;
    const DEFALUT_DELIM = /[,:]/;
    const CUSTOM_DELIM = /\/\/(.*?)\n/;
    let inputEnter = userInput.replace(/\\n/g, "\n");
  }
}
export default App;
