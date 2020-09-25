import React,{useState} from 'react';
import './App.css';
import { uuid } from 'uuidv4'
import { std } from 'mathjs'
function App() {

  const [numbers,setNumbers] = useState([]);
  const [mean,setMean] = useState(0);
  const [standard,setStandard] = useState(0);


  function handleAddNumber() {
    const number = {id: uuid(), value: undefined}
    setNumbers([...numbers, number])
  }

  function handleCalculate() {
    let sum = 0;
    const numberValues = [];
    numbers.map(number =>{
        sum = sum + parseFloat(number.value)
        numberValues.push(parseFloat(number.value));
        return null;
      }
    )
    console.log(sum)
    console.log(numbers.length)
    setMean (sum / numbers.length);
    setStandard (std(numberValues));
  }

  function getValueById(id){
    const number = numbers.find(number => number.id === id)
    
    return number.value
  }

  function setValueById(value, id){
    const numberIndex = numbers.findIndex(number => number.id === id)

    const number = numbers.find(number => number.id === id)

    number.value = value;
   
    setNumbers(numbers.splice(numberIndex, 1))

    setNumbers([...numbers, number]) 
  }


  return (
    <div className="main">
      <ul>
        {
          numbers.length > 0 && numbers.map(number => (
          <li key={number.id}>
            <input 
            type="text"
            name="hours" 
            id="hours"
            required 
            value = {getValueById(number.id)}
            onChange={ e => setValueById(e.target.value, number.id)}
            />
          </li>)
          )
        }
      </ul>
      <div className="buttons">
        <button className="addButton" onClick={handleAddNumber}>Adicionar</button>
        <button className="addButton" onClick={handleCalculate}>Calcular</button>
      </div>
      { mean > 0 ? 
        <>
          <span>
            Média: {mean}
          </span>
          <span>
            Desvio Padrão: {standard}
          </span>
        </>
        : 

        <span />
      }
    </div>
  );
}

export default App;
