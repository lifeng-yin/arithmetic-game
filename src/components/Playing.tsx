import { ChangeEvent, useCallback, useEffect, useState } from "react";
import Timer from "./Timer";
import { TextField, Flex, Heading, Strong } from "@radix-ui/themes";

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
    <Flex align="center" justify="center" className="w-full h-screen">
      <span className="absolute top-2 left-2">
        Time Left:&nbsp;
        <Strong>
          <Timer time={time} onEnd={() => switchToResults()} />
        </Strong>
      </span>
      <span className="absolute top-2 right-2">
        Score: <Strong>{score}</Strong>
      </span>

      <Flex align="center" justify="center" className="p-8 w-full bg-gray-200 gap-4">
        <Heading as="h1" size="7">
          <Strong>{calculationQuestion}</Strong> =
        </Heading>
        <TextField.Root
          size="3"
          variant="soft"
          type="number"
          step={1}
          className="text-3xl font-semibold"
          radius="none"
          autoFocus
          onChange={(e: ChangeEvent<HTMLInputElement>) => {
            if (+e.target.value === calculationAnswer) {
              setScore((s) => s + 1);
              newCalculation();
              e.target.value = "";
            }
          }}
        ></TextField.Root>
      </Flex>
    </Flex>
  );
}

export default Playing;
