import { useState } from "react";
import Grid from "../Grid";
import PropTypes from 'prop-types';
import * as C from "./styles";


const Form = ({ handleAdd, transactionsList, setTransactionsList, peopleList, setPeopleList}) => {
  const [desc, setDesc] = useState("");
  const [amount, setAmount] = useState("");
  const [isExpense, setExpense] = useState(false);
  const [selectedPerson, setSelectedPerson] = useState(""); 

  const generateID = () => Math.round(Math.random() * 1000);

  const [name, setName] = useState("");  // Estado para o nome da pessoa
  const [age, setAge] = useState("");    // Estado para a idade da pessoa

  const handleAddPerson = () => {
    if (!name || !age) {
      alert("Por favor, preencha o nome e a idade!");
      return;
    }

    const newPerson = {
      id: peopleList.length > 0 ? peopleList[peopleList.length - 1]?.id + 1 : 1,
      name: name.trim(),
      age: Number(age),
    };
   
    
    // Atualizando a lista de pessoas com a nova pessoa
    setPeopleList([...peopleList, newPerson]);

    // Limpando os campos
    setName("");
    setAge("");
  };

  const handleSave = () => {
    if (!desc || !amount || !selectedPerson) {
      alert("Informe a descrição e o valor!");
      return;
    } else if (amount < 1) {
      alert("O valor tem que ser positivo!");
      return;
    }

    const newTransaction = {
      id: generateID(),
      desc,
      amount: parseFloat(amount),
      isExpense,
      personId: selectedPerson,
    };

    // Passando a transação para o App
    handleAdd(newTransaction);

    setTransactionsList([...transactionsList, newTransaction]); // Adicionando a nova transação
    

    setDesc("");
    setAmount("");
    setSelectedPerson("");
  };

  return (
    <>
      <C.Container>
         {/* Descrição */}
        <C.InputContent>
          <C.Label>Descrição</C.Label>
          <C.Input value={desc} onChange={(e) => setDesc(e.target.value)} />
        </C.InputContent>
          {/* Valor */}
        <C.InputContent>
          <C.Label>Valor</C.Label>
          <C.Input
            value={amount}
            type="number"
            onChange={(e) => setAmount(e.target.value)}
          />
        </C.InputContent>
         {/* Tipo de transação */}
        <C.RadioGroup>
          <C.Input
            type="radio"
            id="rIncome"
            checked={!isExpense}
            name="group1"
            onChange={() => setExpense(!isExpense)}
          />
          <C.Label htmlFor="rIncome">Entrada</C.Label>
          <C.Input
            type="radio"
            id="rExpenses"
            checked={isExpense}
            name="group1"
            onChange={() => setExpense(!isExpense)}
          />
          <C.Label htmlFor="rExpenses">Saída</C.Label>
        </C.RadioGroup>
        <C.Button type="button" onSubmit={handleSave}>ADICIONAR</C.Button>

        {/* Seleção de Pessoa */}
       <C.InputContent>
          <C.Label>Selecione uma Pessoa</C.Label>
          <C.Select value={selectedPerson} onChange={(e) => setSelectedPerson(Number(e.target.value))}>
            <option value="">Selecione uma pessoa</option>
            {Array.isArray(peopleList) && peopleList.map((person) => (
              <option key={person.id} value={person.id}>
                {person.name}
              </option>
            ))}
          </C.Select>
        </C.InputContent>

         {/* Botão de Adicionar  */}
         <C.InputContent>
          <C.Label>Nome</C.Label>
          <C.Input value={name} onChange={(e) => setName(e.target.value)} />
          <C.Label>Idade</C.Label>
          <C.Input value={age} type="number" onChange={(e) => setAge(e.target.value)} />
          <C.Button type="button" onClick={handleAddPerson}>ADICIONAR PESSOA</C.Button>
        </C.InputContent>  
      </C.Container>
       
      <Grid itens={transactionsList} setItens={setTransactionsList} />
    </>
  );
};

Form.propTypes = {
  handleAdd: PropTypes.func.isRequired,
  transactionsList: PropTypes.array.isRequired,
  setTransactionsList: PropTypes.func.isRequired,
  peopleList: PropTypes.array.isRequired,
  setPeopleList: PropTypes.func.isRequired,
};

export default Form;
