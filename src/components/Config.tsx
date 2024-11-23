import { Checkbox, Flex, Card, Heading, Select, TextField, Button } from "@radix-ui/themes";
import { useAppStore } from "../lib/store/appStore";
import { useConfigStore } from "../lib/store/configStore";

const Settings = () => {
  const { setPage } = useAppStore()
  const { roundTime, setRoundTime } = useConfigStore(config => config);

  const operations = useConfigStore(config => config.operations);

  return (<>
    <Flex className="w-full h-screen" align="center" justify="center">
      <Card size="4" variant="classic">
        <Heading as="h2">Settings</Heading>

        {Object.entries(operations).map(([operationName, operation]) => (
          <div key={operationName} className="mt-2">
            <Flex gap="2" align="center">
              <Checkbox
                id={`${operationName}-checkbox`}
                checked={operation.enabled}
                onCheckedChange={() => operation.update("enabled", !operation.enabled)
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
                onChange={(e) => operation.update("firstMin", +e.target.value)}
                className="w-[60px]"
              />
              <span className="mx-2">to</span>
              <TextField.Root
                size="1"
                type="number"
                radius="none"
                value={operation.firstMax}
                onChange={(e) => operation.update("firstMax", +e.target.value)}
                className="w-[60px]"
              />
              <span className="mx-2">
                {")"} {operation.symbol} {"("}
              </span>
              <TextField.Root
                size="1"
                type="number"
                radius="none"
                value={operation.secondMin}
                onChange={(e) => operation.update("secondMin", +e.target.value)}
                className="w-[60px]"
              />
              <span className="mx-2">to</span>
              <TextField.Root
                size="1"
                type="number"
                radius="none"
                value={operation.secondMax}
                onChange={(e) => operation.update("secondMax", +e.target.value)}
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
            value={roundTime.toString()}
            onValueChange={(value) => setRoundTime(+value)}
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

        <Button onClick={() => setPage('playing')} className="mt-3">Start</Button>
      </Card>
    </Flex>
  </>
  );
}

export default Settings;