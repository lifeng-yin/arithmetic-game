import { useState } from "react";
import { useImmer } from "use-immer";
import { Checkbox, Button, TextField, Flex, Select, Card, Heading } from "@radix-ui/themes";
import Playing from "./components/Playing";
import Results from "./components/Results";

function App() {
  const [appState, setAppState] = useState<"settings" | "playing" | "results">(
    "settings"
  );

  const switchToResults = () => setAppState("results");

  const [operationSettings, setOperationSettings] = useImmer<
    Record<string, Record<string, any>>
  >({
    addition: {
      enabled: true,
      firstMin: -25,
      firstMax: 25,
      secondMin: -25,
      secondMax: 25,
    },
    subtraction: {
      enabled: true,
      firstMin: -25,
      firstMax: 25,
      secondMin: -25,
      secondMax: 25,
    },
    multiplication: {
      enabled: true,
      firstMin: -10,
      firstMax: 10,
      secondMin: -10,
      secondMax: 10,
    },
    division: {
      enabled: true,
      firstMin: -10,
      firstMax: 10,
      secondMin: -10,
      secondMax: 10,
    },
  });

  const [time, setTime] = useState<string>("30");

  const handleSubmit = () => {
    setAppState("playing");
  };

  const getSymbol = (operationName: string) => {
    if (operationName === "addition") return "+";
    else if (operationName === "subtraction") return "-";
    else if (operationName === "multiplication") return "×";
    else return "÷";
  };

  if (appState === "settings")
    return (
      <>
        <Flex className="w-full h-screen" align="center" justify="center">
          <Card size="4" variant="classic">
            <Heading as="h2">Settings</Heading>

            {Object.entries(operationSettings).map(
              ([operationName, operation]) => (
                <div className="mt-2">
                  <Flex gap="2" align="center">
                    <Checkbox
                      id={`${operationName}-checkbox`}
                      checked={operation.enabled}
                      onCheckedChange={() =>
                        setOperationSettings((s) => {
                          s[operationName].enabled = !operation.enabled;
                        })
                      }
                    />
                    <label
                      htmlFor={`${operationName}-checkbox`}
                      className="capitalize"
                    >
                      {operationName}
                    </label>
                  </Flex>

                  <Flex align="center">
                    <span className="mr-2">Range from {"("}</span>
                    <TextField.Root
                      size="1"
                      type="number"
                      radius="none"
                      value={operation.firstMin}
                      onChange={(e) =>
                        setOperationSettings((s) => {
                          s[operationName].firstMin = +e.target.value;
                        })
                      }
                      className="w-[60px]"
                    />
                    <span className="mx-2">to</span>
                    <TextField.Root
                      size="1"
                      type="number"
                      radius="none"
                      value={operation.firstMax}
                      onChange={(e) =>
                        setOperationSettings((s) => {
                          s[operationName].firstMax = +e.target.value;
                        })
                      }
                      className="w-[60px]"
                    />
                    <span className="mx-2">
                      {")"} {getSymbol(operationName)} {"("}
                    </span>
                    <TextField.Root
                      size="1"
                      type="number"
                      radius="none"
                      value={operation.secondMin}
                      onChange={(e) =>
                        setOperationSettings((s) => {
                          s[operationName].secondMin = +e.target.value;
                        })
                      }
                      className="w-[60px]"
                    />
                    <span className="mx-2">to</span>
                    <TextField.Root
                      size="1"
                      type="number"
                      radius="none"
                      value={operation.secondMax}
                      onChange={(e) =>
                        setOperationSettings((s) => {
                          s[operationName].secondMax = +e.target.value;
                        })
                      }
                      className="w-[60px]"
                    />
                    <span className="mx-2">{")"}</span>
                  </Flex>
                </div>
              )
            )}

            <Flex align="center" gap="2" className="mt-4">
              <label htmlFor={`time`} className="capitalize">
                Time
              </label>
              <Select.Root
                defaultValue="30"
                value={time}
                onValueChange={(e) => setTime(e)}
              >
                <Select.Trigger />
                <Select.Content>
                  <Select.Item value="15">15 seconds</Select.Item>
                  <Select.Item value="30">30 seconds</Select.Item>
                  <Select.Item value="60">60 seconds</Select.Item>
                  <Select.Item value="120">120 seconds</Select.Item>
                </Select.Content>
              </Select.Root>
            </Flex>

            <Button onClick={handleSubmit} className="mt-3">Start</Button>
          </Card>
        </Flex>
      </>
    );
  else if (appState === "playing")
    return (
      <Playing
        operationSettings={operationSettings}
        time={parseInt(time)}
        switchToResults={switchToResults}
      />
    );
  else if (appState === "results") return <Results />;
}

export default App;
