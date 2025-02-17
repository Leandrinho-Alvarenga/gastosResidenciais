import * as C from "./styles";
import { useState } from "react";
import PropTypes from 'prop-types';



const People = ({ peopleList, onAdd, onDelete }) => {
  const [name, setName] = useState("");
  const [age, setAge] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!name || !age) {
      alert("Preencha todos os campos!");
      return;
    }
    onAdd(name, age);
    setName("");
    setAge("");
  };

  return (
    <C.Container>
      <h2>Cadastro de Pessoas</h2>
      <C.Form onSubmit={handleSubmit}>
        <C.Input
          type="text"
          placeholder="Nome"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
        <C.Input
          type="number"
          placeholder="Idade"
          value={age}
          onChange={(e) => setAge(e.target.value)}
        />
        <C.Button type="submit">Adicionar</C.Button>
      </C.Form>
      <C.PeopleList>
        {peopleList.length === 0 ? (
          <p>Nenhuma pessoa cadastrada</p>
        ) : (
          peopleList.map((person) => (
            <C.PersonItem key={person.id}>
              <span>
                {person.name} - {person.age} anos
              </span>
              <C.FaTrash onClick={() => onDelete(person.id)} />
            </C.PersonItem>
          ))
        )}
      </C.PeopleList>
    </C.Container>
  );
};

People.propTypes = {
  peopleList: PropTypes.array.isRequired,
  onAdd: PropTypes.func.isRequired,
  onDelete: PropTypes.func.isRequired,

};

export default People;
