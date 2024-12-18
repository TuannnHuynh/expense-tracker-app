import { Input, Stack, HStack } from "@chakra-ui/react";
import { Button } from "@/components/ui/button";
import { Radio, RadioGroup } from "@/components/ui/radio";
import {
  DialogActionTrigger,
  DialogBody,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogRoot,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { useContext, useRef } from "react";
import { Field } from "@/components/ui/field";
import { GlobalContext } from "@/context";

// fix lỗi submit, checked

const TransactionForm = () => {
  const ref = useRef<HTMLInputElement>(null);
  const context = useContext(GlobalContext);
  if (!context) {
    throw new Error("Navbar must be used within a GlobalState provider");
  }
  const { formData, setFormData, value, setValue, handleFormSubmit } = context;

  const handleFormChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };
  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    handleFormSubmit({ ...formData, type: value });
  };
  return (
    <DialogRoot initialFocusEl={() => ref.current}>
      <DialogTrigger asChild>
        <Button
          bg={"blue.600"}
          color={"white"}
          ml={"4"}
          _hover={{ bg: "blue.500" }}
          variant="outline"
        >
          Add New Transaction
        </Button>
      </DialogTrigger>
      <DialogContent>
        <form onSubmit={handleSubmit}>
          <DialogHeader>
            <DialogTitle>Add New Trasaction</DialogTitle>
          </DialogHeader>
          <DialogBody pb="4">
            <Stack gap="4">
              <Field label="Enter Description">
                <Input
                  ref={ref}
                  name="description"
                  placeholder="Enter Transaction description..."
                  onChange={handleFormChange}
                />
              </Field>
              <Field label="Enter Amount">
                <Input
                  type="number"
                  name="amount"
                  placeholder="Enter Transaction amount"
                  onChange={handleFormChange}
                />
              </Field>
            </Stack>
            <RadioGroup mt={"4"} value={value}>
              <HStack gap="4">
                <Radio onChange={() => setValue("expense")} value="expense">
                  Expense
                </Radio>
                <Radio onChange={() => setValue("income")} value="income">
                  Income
                </Radio>
              </HStack>
            </RadioGroup>
          </DialogBody>
          <DialogFooter>
            <DialogActionTrigger asChild>
              <Button variant="outline">Cancel</Button>
            </DialogActionTrigger>
            <DialogActionTrigger asChild>
              <Button type="submit" bg="blue.600" color="white">
                Add
              </Button>
            </DialogActionTrigger>
          </DialogFooter>
        </form>
      </DialogContent>
    </DialogRoot>
  );
};

export default TransactionForm;
