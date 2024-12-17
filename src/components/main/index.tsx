import { Flex, Heading } from "@chakra-ui/react";
import Summary from "../summary";
import ExpenseView from "../expense-view";
import TransactionForm from "../add-transaction";

const Main = () => {
  return (
    <Flex textAlign={"center"} flexDirection={"column"} pr={"5"} pl={"5"}>
      <Flex
        alignItems={"center"}
        justifyContent={"space-between"}
        mt={"12"}
        mb={"4"}
      >
        <Heading
          color={"blue.600"}
          size={"3xl"}
          display={["none", "block", "block", "block"]}
        >
          Expense Tracker
        </Heading>
        <Flex alignItems={"center"}>
          <TransactionForm />
        </Flex>
      </Flex>
      <Summary />
      <Flex
        w={"full"}
        alignItems={"flex-start"}
        justifyContent={"space-evenly"}
        flexDirection={["column", "column", "column", "row", "row"]}
      >
        <ExpenseView />
        <ExpenseView />
      </Flex>
    </Flex>
  );
};

export default Main;
