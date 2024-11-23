import { ChangeEvent, useEffect, useRef, useState } from "react";
import { TextField, Flex, Heading, Strong } from "@radix-ui/themes";
import { useAppStore } from "../lib/store/appStore";
import { useConfigStore } from "../lib/store/configStore";
import { generateQuestion, getRandomOperation } from "../lib/utils/calculations";

function Playing() {
  const operations = useConfigStore((state) => state.operations);
  const roundTime = useConfigStore((state) => state.roundTime);
  const { setPage, setLastRound } = useAppStore()

  const [timeLeft, setTimeLeft] = useState(roundTime);
  const [score, setScore] = useState(0);
  const [calculationQuestion, setCalculationQuestion] = useState<string>();
  const [calculationAnswer, setCalculationAnswer] = useState<number>();


  type dataPoint = {
    time: number;
    pps: number;
  }

  const dataPoints = useRef<dataPoint[]>([])

  const onTypeAnswer = (e: ChangeEvent<HTMLInputElement>) => {
    if (+e.target.value === calculationAnswer) {

      setScore(score + 1);
      e.target.value = "";
      const [question, answer] = generateQuestion(getRandomOperation(operations))
      setCalculationQuestion(question);
      setCalculationAnswer(answer)
    }
  }

  useEffect(() => {
    const [question, answer] = generateQuestion(getRandomOperation(operations))
    setCalculationQuestion(question);
    setCalculationAnswer(answer)
  }, [operations]);

  useEffect(() => {
    if (timeLeft === 0) {
      setPage("results")
      setLastRound({
        score,
        data: dataPoints.current
      })
    }
    const interval = setInterval(() => {
      setTimeLeft((prevTime) => prevTime - 1);

      dataPoints.current.push({
        time: roundTime - timeLeft + 1,
        pps: (score) / (roundTime - timeLeft + 1)
      })

    }, 1000);

    return () => {
      clearTimeout(interval);
    };
  }, [timeLeft, setPage, setLastRound, score, roundTime]);


  return (
    <Flex align="center" justify="center" className="w-full h-screen">
      <span className="absolute top-2 left-2">
        Time Left:&nbsp; <strong>{timeLeft}</strong>
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
          onChange={onTypeAnswer}
        ></TextField.Root>
      </Flex>
    </Flex>
  );
}

export default Playing;
