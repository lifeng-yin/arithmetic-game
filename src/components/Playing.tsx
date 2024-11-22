import { ChangeEvent, useEffect, useState } from "react";
import Timer from "./Timer";
import { TextField, Flex, Heading, Strong } from "@radix-ui/themes";
import { useAppStore, useConfigStore, operations } from "../lib/store";
import { generateQuestion, getRandomOperation } from "../lib/calculations";

function Playing() {
  const [score, setScore] = useState(0);
  const [calculationQuestion, setCalculationQuestion] = useState<string>();
  const [calculationAnswer, setCalculationAnswer] = useState<number>();

  const operations = useConfigStore((state) => state.operations);
  const roundTime = useConfigStore((state) => state.roundTime);
  const { setPage } = useAppStore()

  const onTypeAnswer = (e: ChangeEvent<HTMLInputElement>) => {
    if (+e.target.value === calculationAnswer) {
      setScore((s) => s + 1);
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

  return (
    <Flex align="center" justify="center" className="w-full h-screen">
      <span className="absolute top-2 left-2">
        Time Left:&nbsp;
        <Timer 
          roundTime={roundTime}
          onEnd={() => { setPage("results") }}
        />
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
