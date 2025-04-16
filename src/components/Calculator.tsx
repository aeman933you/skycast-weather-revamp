
import React, { useState } from 'react';
import { Button } from "@/components/ui/button";
import { Calculator as CalculatorIcon, Plus, Minus, X, Divide, Equal } from "lucide-react";

const Calculator = () => {
  const [display, setDisplay] = useState('0');
  const [firstOperand, setFirstOperand] = useState<number | null>(null);
  const [operation, setOperation] = useState<string | null>(null);
  const [waitingForSecondOperand, setWaitingForSecondOperand] = useState(false);

  const inputDigit = (digit: string) => {
    if (waitingForSecondOperand) {
      setDisplay(digit);
      setWaitingForSecondOperand(false);
    } else {
      setDisplay(display === '0' ? digit : display + digit);
    }
  };

  const inputDecimal = () => {
    if (waitingForSecondOperand) {
      setDisplay('0.');
      setWaitingForSecondOperand(false);
      return;
    }

    if (!display.includes('.')) {
      setDisplay(display + '.');
    }
  };

  const clearDisplay = () => {
    setDisplay('0');
    setFirstOperand(null);
    setOperation(null);
    setWaitingForSecondOperand(false);
  };

  const performOperation = (nextOperator: string) => {
    const inputValue = parseFloat(display);

    if (firstOperand === null) {
      setFirstOperand(inputValue);
    } else if (operation) {
      const result = calculate(firstOperand, inputValue, operation);
      setDisplay(String(result));
      setFirstOperand(result);
    }

    setWaitingForSecondOperand(true);
    setOperation(nextOperator);
  };

  const calculate = (firstOperand: number, secondOperand: number, operation: string) => {
    switch (operation) {
      case '+':
        return firstOperand + secondOperand;
      case '-':
        return firstOperand - secondOperand;
      case '*':
        return firstOperand * secondOperand;
      case '/':
        return firstOperand / secondOperand;
      default:
        return secondOperand;
    }
  };

  const handleEquals = () => {
    if (!operation || firstOperand === null) return;

    const inputValue = parseFloat(display);
    const result = calculate(firstOperand, inputValue, operation);
    setDisplay(String(result));
    setFirstOperand(result);
    setOperation(null);
    setWaitingForSecondOperand(false);
  };

  return (
    <div className="p-4 rounded-lg shadow-lg bg-gray-100 dark:bg-gray-800 max-w-xs mx-auto">
      <div className="mb-4 p-2 bg-white dark:bg-gray-700 rounded text-right text-2xl h-16 flex items-center justify-end overflow-hidden">
        <span className="font-mono">{display}</span>
      </div>
      
      <div className="grid grid-cols-4 gap-2">
        <Button onClick={clearDisplay} variant="outline" className="col-span-2">
          Clear
        </Button>
        <Button onClick={() => performOperation('/')} variant="outline">
          <Divide className="h-4 w-4" />
        </Button>
        <Button onClick={() => performOperation('*')} variant="outline">
          <X className="h-4 w-4" />
        </Button>
        
        {[7, 8, 9].map(num => (
          <Button key={num} onClick={() => inputDigit(num.toString())} variant="outline">
            {num}
          </Button>
        ))}
        <Button onClick={() => performOperation('-')} variant="outline">
          <Minus className="h-4 w-4" />
        </Button>
        
        {[4, 5, 6].map(num => (
          <Button key={num} onClick={() => inputDigit(num.toString())} variant="outline">
            {num}
          </Button>
        ))}
        <Button onClick={() => performOperation('+')} variant="outline">
          <Plus className="h-4 w-4" />
        </Button>
        
        {[1, 2, 3].map(num => (
          <Button key={num} onClick={() => inputDigit(num.toString())} variant="outline">
            {num}
          </Button>
        ))}
        <Button onClick={handleEquals} variant="outline" className="row-span-2">
          <Equal className="h-4 w-4" />
        </Button>
        
        <Button onClick={() => inputDigit('0')} variant="outline" className="col-span-2">
          0
        </Button>
        <Button onClick={inputDecimal} variant="outline">
          .
        </Button>
      </div>
    </div>
  );
};

export default Calculator;
