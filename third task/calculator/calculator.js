const buttons = document.querySelectorAll('button');
const displayElement = document.querySelector('.calculator-display');

let operatorOn = ''; // 연산자 입력
let previousNum = ''; //이전 값
let resentNum = ''; // 최근값

let calculate = (n1, operator, n2) => {
    let result = 0;
    switch (operator) {
      case '+':
        result = Number(n1) + Number(n2); // 덧셈 연산 수행
        break;
      case '-':
        result = Number(n1) - Number(n2); // 뺄셈 연산 수행
        break;
      case 'x':
        result = Number(n1) * Number(n2); // 곱셈 연산 수행
        break;
      case '÷':
        result = Number(n1) / Number(n2); // 나눗셈 연산 수행
        break;
      default:
        break;
    }
    return String(result); // 결과를 문자열로 변환하여 반환
  };

  let calculator = () => {
    let isFirstDigit = true; // 첫 번째 숫자 여부를 판별하는 변수
  
    buttons.forEach((item) => {
      item.addEventListener('click', (e) => {
        let action = e.target.classList[0];
        let click = e.target.innerHTML;

        if (action === 'operator') {
          //연산자 눌렀을 때
          operatorOn = click;
          previousNum = displayElement.textContent;
          displayElement.textContent = '';
          isFirstDigit = true; 
          // 연산자를 누르면 다음 숫자는 첫 번째 숫자가 됨
        }
        if (action === 'button' || action === 'button-zero') {
          if (isFirstDigit && click === '0') {
            // 첫 번째 숫자이고 입력된 값이 0인 경우 아무 작업도 수행하지 않음
            return;
          }

          if (displayElement.textContent.length < 10) {
            // 입력된 숫자가 10자리 미만일 때만 입력 처리
            if (displayElement.textContent === '' && operatorOn === '') {
              //창이 비어있고 연산자 누르지 않았을때(한자리)
              displayElement.textContent = click;
              previousNum = displayElement.textContent;
            } else if (
              //창이 비어있지 않고 연산자 누르지 않았을때(한자리이상)
              displayElement.textContent !== '' &&
              operatorOn === ''
            ) {
              displayElement.textContent = 
              displayElement.textContent + click;
              previousNum = displayElement.textContent;
            } else if (
              //창이 비어있고 연산자 눌렀을때(한자리)
              displayElement.textContent === '' &&
              operatorOn !== ''
            ) {
              displayElement.textContent = click;
              resentNum = displayElement.textContent;
            } else if (
              //창이 비어있지않고 연산자 누르지 않았을때 (한자리이상)
              displayElement.textContent !== '' &&
              operatorOn !== ''
            ) {
              displayElement.textContent = 
              displayElement.textContent + click;
              resentNum = displayElement.textContent;
            }
            isFirstDigit = false; 
            // 첫 번째 숫자 입력 후에는 첫 번째 숫자가 아님을 표시
          }
        }
  
        if (action === 'result') {
          // = 눌렀을 때 calculate함수 실행
          displayElement.textContent = calculate(
            previousNum,
            operatorOn,
            resentNum
          );
          isFirstDigit = true; 
          // 결과를 표시한 후에는 다음 숫자는 첫 번째 숫자가 됨
        }
        if (action === 'button-AC') {
          //C 버튼 눌렀을 때 모든 할당 초기화
          displayElement.textContent = '';
          previousNum = '';
          operatorOn = '';
          resentNum = '';
          isFirstDigit = true; 
          // 모든 할당 초기화 후에는 다음 숫자는 첫 번째 숫자가 됨
        }
      });
    });
  };
  calculator();