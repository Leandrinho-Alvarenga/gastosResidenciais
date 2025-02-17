import styled from "styled-components";

export const Container = styled.div`
  max-width: 500px;
  margin: 20px auto;
  padding: 20px;
  background: #fff;
  border-radius: 10px;
  box-shadow: 0px 4px 6px rgba(0, 0, 0, 0.1);
  text-align: center;
`;

export const Form = styled.form`
  display: flex;
  flex-direction: column;
  gap: 10px;
`;

export const Input = styled.input`
  padding: 10px;
  border: 1px solid #ccc;
  border-radius: 5px;
`;
 
export const Button = styled.button`
  background: #4caf50;
  color: white;
  padding: 10px;
  border: none;
  border-radius: 5px;
  cursor: pointer;

  &:hover {
    background: #45a049;
  }
`;

export const PeopleList = styled.div`
  margin-top: 20px;
  text-align: left;
`;

export const PersonItem = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  background: #f4f4f4;
  padding: 10px;
  margin: 5px 0;
  border-radius: 5px;

  svg {
    cursor: pointer;
    color: red;
  }
`;