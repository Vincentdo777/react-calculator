import React,{useState} from 'react';
import Button from './Button';
import Output from './Output';
import Formula from './Formula';
import './App.css';

/* eslint-disable react/prop-types, react/no-multi-comp,
 no-eval, no-nested-ternary */

const endsWithOperator = /[x+‑/]$/,
      endWithNegativeSign = /[+/x]‑$/,
      isOperator = /[x/+‑]/  
;

export default function App() {
  const [currentValue, setValue] = useState('0');
  const [formula, setFormula] = useState('');
  const [preval, setPreval] = useState('0');
  const [evaluated, setEvaluate] = useState(false);
  

  function maxDigitWarning(){
    setValue('Limit');
  }
  function handleEvaluate(){

    if(!currentValue.includes('Limit')){
      let expression = formula;
      while(endsWithOperator.test(expression)){
        expression = expression.slice(0, -1);
      }
      expression = expression.replace(/x/g, '*').replace(/‑/g, '-');
      // eslint-disable-next-line
      let answer = Math.round(1000000000000 * eval(expression)) / 1000000000000;
      
      setValue(answer.toString());
      setFormula(expression.replace(/\*/g, 'x').replace(/-/g,'‑')+ '=' + answer);
      setPreval(answer);
      setEvaluate(true);

    }
  }
  

  function handleOperator(e){
    if(!currentValue.includes('Limit')){
      const value = e.target.value;
      setValue(value);
      setEvaluate(false);
      if(evaluated){
        setFormula(preval + value);
      } else if(!endsWithOperator.test(formula)){
        setPreval(formula);
        setFormula(formula + value);
      } else if(!endWithNegativeSign.test(formula)){
        setFormula(
          (endWithNegativeSign.test(formula + value)
          ? formula : preval) + value
        )
      } else if( value !== '‑'){
        setFormula(preval + value)
      }

    }
  }
  
  function handleNumbers(e){
    if(!currentValue.includes('Limit')){ 
      const value =  e.target.value;
      setEvaluate(false);
      if(currentValue.length > 21){
        maxDigitWarning();
      } else if(evaluated){
        setValue(value);
        setFormula(
          value !== '0' ? value : ''
        )
      }else{
        setValue(
          currentValue === '0' || isOperator.test(currentValue) 
          ? value : currentValue + value
        )
        
        setFormula(
          currentValue === '0' && value === '0'
          ? formula === '' ? value : formula
          : (/([^.0-9]0|^0)$/).test(formula)
            ? formula.slice(0, -1) + value
            : formula + value   
        )
        }
    }  
    
  }
  
  function handleDecimal(){
    if(evaluated === true){
      setValue('0.');
      setFormula('0.');
      setEvaluate(false);
    } else if(!currentValue.includes('.') && !currentValue.includes('Limit')){
      setEvaluate(false);
      if(currentValue.length > 21){
        maxDigitWarning();
      } else if(endsWithOperator.test(formula)||(currentValue ==='0' && formula === '')){
          setValue('0.')
          setFormula(formula + '0.')
        } else{
          setValue( formula.match(/(-?\d+\.?\d*)$/)[0] + '.');
          setFormula(formula + '.');
          }
  }
} 



  function initialize(){
    setValue('0');
    setFormula('');
    setPreval('0');
    setEvaluate(false);
  }
  
  return (
    <div className='calculator' id="calculator">
      <Formula formula={formula}></Formula>
      <Output currentValue={currentValue}></Output>
      <Button 
        clear={initialize} 
        numbers={handleNumbers}
        operators={handleOperator}
        evaluate={handleEvaluate}
        decimal={handleDecimal}
      >
      </Button>
    </div>
  );
}