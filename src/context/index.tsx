import { createContext, useState, ReactNode } from "react";

// Định nghĩa kiểu dữ liệu cho context
interface GlobalContextType {
  formData: { type: string; amount: number; description: string };
  setFormData: React.Dispatch<
    React.SetStateAction<{ type: string; amount: number; description: string }>
  >;
  value: string;
  setValue: React.Dispatch<React.SetStateAction<string>>;
  totalExpense: number;
  setTotalExpense: React.Dispatch<React.SetStateAction<number>>;
  totalIncome: number;
  setTotalIncome: React.Dispatch<React.SetStateAction<number>>;
  allTransaction: Array<{
    id: string;
    type: string;
    amount: number;
    description: string;
  }>;
  setAllTransaction: React.Dispatch<
    React.SetStateAction<
      Array<{
        id: string;
        type: string;
        amount: number;
        description: string;
      }>
    >
  >;
  handleFormSubmit: (currentFormData: {
    type: string;
    amount: number;
    description: string;
  }) => void;
}

export const GlobalContext = createContext<GlobalContextType | null>(null);

// Định nghĩa kiểu cho props của GlobalState
interface GlobalStateProps {
  children: ReactNode;
}

export default function GlobalState({ children }: GlobalStateProps) {
  const [formData, setFormData] = useState({
    type: "expense",
    amount: 0,
    description: "",
  });
  const [value, setValue] = useState<string>("expense");
  const [totalExpense, setTotalExpense] = useState<number>(0);
  const [totalIncome, setTotalIncome] = useState<number>(0);
  const [allTransaction, setAllTransaction] = useState<
    Array<{
      id: string;
      type: string;
      amount: number;
      description: string;
    }>
  >([]);

  const handleFormSubmit = (currentFormData: {
    type: string;
    amount: number;
    description: string;
  }) => {
    if (!currentFormData.description || !currentFormData.amount) return;

    setAllTransaction([
      ...allTransaction,
      { ...currentFormData, id: Date.now().toString() },
    ]);
  };
  console.log(allTransaction);

  return (
    <GlobalContext.Provider
      value={{
        formData,
        setFormData,
        value,
        setValue,
        totalExpense,
        setTotalExpense,
        totalIncome,
        setTotalIncome,
        allTransaction,
        setAllTransaction,
        handleFormSubmit,
      }}
    >
      {children}
    </GlobalContext.Provider>
  );
}
