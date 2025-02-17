import { useEffect, useState } from "react";
import Header from "../components/Header";
import GlobalStyles from "../styles/global";
import Resume from "../components/Resume";
import Form from "../components/Form";
import People from "../components/People";

const App = () => {

   // Recuperando pessoas do localStorage
  const storedPeople = localStorage.getItem("people");
  const [peopleList, setPeopleList] = useState(
    storedPeople ? JSON.parse(storedPeople) : []
  );
  
   // Armazena as transações no localStorage
  const data = localStorage.getItem("transactions");
  const [transactionsList, setTransactionsList] = useState(
    data ? JSON.parse(data) : []
  );

  // Estados de resumo financeiro
  const [income, setIncome] = useState(0);
  const [expense, setExpense] = useState(0);
  const [total, setTotal] = useState(0);
  
  // Atualizando os totais ao modificar transações
  useEffect(() => {
    const amountExpense = transactionsList
      .filter((item) => item.isExpense)
      .map((transaction) => Number(transaction.amount));

    const amountIncome = transactionsList
      .filter((item) => !item.isExpense)
      .map((transaction) => Number(transaction.amount));

    const expenseTotal = amountExpense.reduce((acc, cur) => acc + cur, 0);
    const incomeTotal = amountIncome.reduce((acc, cur) => acc + cur, 0);

    const total = (incomeTotal - expenseTotal).toFixed(2);

    setIncome(incomeTotal);
    setExpense(expenseTotal);
    setTotal(total);
  }, [transactionsList]);
 
  // Função para adicionar uma nova transação
  const handleAdd = (transaction) => {
    const newArrayTransactions = [...transactionsList, transaction];
    setTransactionsList(newArrayTransactions);
    localStorage.setItem("transactions", JSON.stringify(newArrayTransactions));
  };


  // Função para adicionar uma nova pessoa
  const handleAddPerson = (name, age) => {
    const newPerson = {
      id: peopleList.length > 0 ? peopleList[peopleList.length - 1].id + 1 : 1,
      name,
      age: parseInt(age),
    };

    const updatedPeopleList = [...peopleList, newPerson];
    setPeopleList(updatedPeopleList);
    localStorage.setItem("people", JSON.stringify(updatedPeopleList));
  };

  // Função para remover uma pessoa e suas transações
  const handleDeletePerson = (personId) => {
    const updatedPeopleList = peopleList.filter((person) => person.id !== personId);
    setPeopleList(updatedPeopleList);
    localStorage.setItem("people", JSON.stringify(updatedPeopleList));

    // Removendo transações associadas à pessoa
    const updatedTransactions = transactionsList.filter(
      (transaction) => transaction.personId !== personId
    );
    setTransactionsList(updatedTransactions);
    localStorage.setItem("transactions", JSON.stringify(updatedTransactions));
  };

  return (
    <>
      <Header />
      <Resume
        income={`R$ ${income.toFixed(2)}`}
        expense={`R$ ${expense.toFixed(2)}`}
        total={`R$ ${total}`}
      />
      <Form handleAdd={handleAdd} transactionsList={transactionsList}  setTransactionsList={setTransactionsList}  peopleList={peopleList} 
  setPeopleList={setPeopleList}/>
      <People people={peopleList} onAdd={handleAddPerson} onDelete={handleDeletePerson} />
      <GlobalStyles />
    </>
  );
};

export default App;