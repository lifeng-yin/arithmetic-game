import { ChangeEvent, useCallback, useEffect, useState } from "react";
import Timer from "./Timer";
import { TextField } from "@radix-ui/themes";

function Playing({
  operationSettings,
  time,
  switchToResults,
}: {
  operationSettings: Record<string, Record<string, any>>;
  time: number;
  switchToResults: Function;
}) {
  const [score, setScore] = useState(0);
  const [calculationQuestion, setCalculationQuestion] = useState<string>();
  const [calculationAnswer, setCalculationAnswer] = useState<number>();

  const newCalculation = useCallback(() => {
    const possibleOperations: string[][] = [];
    if (operationSettings.addition.enabled)
      possibleOperations.push(["addition", "+"]);
    if (operationSettings.subtraction.enabled)
      possibleOperations.push(["subtraction", "-"]);
    if (operationSettings.multiplication.enabled)
      possibleOperations.push(["multiplication", "×"]);
    if (operationSettings.division.enabled)
      possibleOperations.push(["division", "÷"]);

    function getRandomOperation() {
      return possibleOperations[
        Math.floor(Math.random() * possibleOperations.length)
      ];
    }

    function getRandomNumber(low: number, high: number) {
      return low + Math.floor(Math.random() * (high - low));
    }

    function calculateAnswer(
      firstNumber: number,
      secondNumber: number,
      operationSymbol: string
    ) {
      if (operationSymbol === "+") return firstNumber + secondNumber;
      else if (operationSymbol === "-") return firstNumber - secondNumber;
      else if (operationSymbol === "×") return firstNumber * secondNumber;
    }

    const [operation, operationSymbol] = getRandomOperation();
    const settings = operationSettings[operation];

    let question, answer;

    if (operation === "division") {
      const divisor = getRandomNumber(settings.firstMin, settings.firstMax);
      answer = getRandomNumber(settings.secondMin, settings.secondMax);

      question = `${divisor * answer} ${operationSymbol} ${divisor}`;
    } else {
      const firstNumber = getRandomNumber(settings.firstMin, settings.firstMax);
      const secondNumber = getRandomNumber(
        settings.secondMin,
        settings.secondMax
      );
      if (operation === "subtraction" && secondNumber < 0) {
        question = `${firstNumber} ${operationSymbol} (${secondNumber})`;
      } else {
        question = `${firstNumber} ${operationSymbol} ${secondNumber}`;
      }
      answer = calculateAnswer(firstNumber, secondNumber, operationSymbol);
    }

    setCalculationQuestion(question);
    setCalculationAnswer(answer);
  }, [operationSettings]);

  useEffect(() => {
    newCalculation();
  }, []);

  return (
    <div className="flex items-center justify-center w-full h-screen">
      <span className="absolute top-2 left-2">
        Time Left:&nbsp;
        <strong className="font-medium">
          <Timer time={time} onEnd={() => switchToResults()} />
        </strong>
      </span>
      <span className="absolute top-2 right-2">
        Score: <strong className="font-medium">{score}</strong>
      </span>

      <div className="p-8 flex w-full items-center justify-center bg-gray-200 gap-4">
        <h1 className="text-3xl">
          <span className="font-semibold">{calculationQuestion}</span> =
        </h1>
        <TextField.Root
          size="3"
          variant="soft"
          type="number"
          step={1}
          className="text-3xl font-semibold"
          autoFocus
          onChange={(e: ChangeEvent<HTMLInputElement>) => {
            if (+e.target.value === calculationAnswer) {
              setScore((s) => s + 1);
              newCalculation();
              e.target.value = "";
            }
          }}
        ></TextField.Root>
      </div>
    </div>
  );
}

export default Playing;
