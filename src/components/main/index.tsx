import { Flex, Heading } from "@chakra-ui/react";
import Summary from "../summary";
import ExpenseView from "../expense-view";
import TransactionForm from "../add-transaction";
import { useContext, useEffect } from "react";
import { GlobalContext } from "@/context";

const Main = () => {
  const context = useContext(GlobalContext);
  if (!context) {
    throw new Error("Navbar must be used within a GlobalState provider");
  }
  const {
    totalExpense,
    setTotalExpense,
    totalIncome,
    setTotalIncome,
    allTransaction,
  } = context;

  useEffect(() => {
    let income = 0;
    let expense = 0;
    allTransaction.forEach((item) =>
      item.type === "income"
        ? (income += +item.amount)
        : (expense += +item.amount)
    );
    setTotalExpense(expense);
    setTotalIncome(income);
  }, [allTransaction]);

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
      <Summary totalExpense={totalExpense} totalIncome={totalIncome} />
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
