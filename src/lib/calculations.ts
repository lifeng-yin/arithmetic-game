import { operation, operations } from "./store";

export const getRandomOperation = (operations: operations) => {
    const enabledOperations = Object.values(operations).filter((operation) => operation.enabled);
    return enabledOperations[Math.floor(Math.random() * enabledOperations.length)];
  }

export const generateQuestion = (operation: operation): [string, number] => {
    const { symbol, firstMin, firstMax, secondMin, secondMax } = operation;
  
    let question: string = `Unknown operation. ${symbol}`;
    let answer: number = 0;
  
    function getRandomNumber(low: number, high: number) {
      return low + Math.floor(Math.random() * (high - low));
    }
  
    if (symbol === "÷") {
      const factor = getRandomNumber(firstMin, firstMax);
      do {
        answer = getRandomNumber(secondMin, secondMax);
      } while (answer === 0);
      question = `${factor * answer} ÷ ${factor}`
    }
  
    else if (symbol === '+') {
      const firstNumber = getRandomNumber(firstMin, firstMax);
      const secondNumber = getRandomNumber(secondMin, secondMax);
      question = `${firstNumber} + ${secondNumber}`
      answer = firstNumber + secondNumber;
    }
  
    else if (symbol === '-') {
      const firstNumber = getRandomNumber(firstMin, firstMax);
      const secondNumber = getRandomNumber(secondMin, secondMax);
      question = `${firstNumber} - ${secondNumber}`
      answer = firstNumber - secondNumber;
    }
      
    else if (symbol === '×') {
      const firstNumber = getRandomNumber(firstMin, firstMax);
      const secondNumber = getRandomNumber(secondMin, secondMax);
      question = `${firstNumber} × ${secondNumber}`
      answer = firstNumber * secondNumber;
    }
  
    return [question, answer];
  };