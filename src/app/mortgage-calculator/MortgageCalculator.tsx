'use client';
import React, { use, useEffect, useState } from 'react';

type LoanTerm = number[];

const loanTerms = [15, 30];

export default function MortageCalculator() {
  const [loanData, setLoanData] = useState({
    amount: 0,
    interest: 0,
    term: 0,
  });
  const [monthlyPayment, setMonthlyPayment] = useState(0);

  useEffect(() => {
    const calculateMonthlyPayment = () => {
      const { amount, interest, term } = loanData;

      console.log(amount, interest, term);

      const monthlyInterest = interest / 100 / 12;
      const monthlyMorgagePayment =
        (amount * monthlyInterest) /
        (1 - Math.pow(1 / (1 + monthlyInterest), term * 12));

      setMonthlyPayment(monthlyMorgagePayment);
    };
    calculateMonthlyPayment();
  }, [loanData]);

  console.log(loanData.term);
  return (
    <div>
      <form
        onSubmit={(event) => {
          event.preventDefault();
          const formData = new FormData(event.target as HTMLFormElement);
          const amount = formData.get('amount');
          const interest = formData.get('interest');
          const term = formData.get('terms');
          setLoanData({
            amount: amount ? Number(amount) : 0,
            interest: interest ? Number(interest) : 0,
            term: term ? Number(term) : 15,
          });
        }}
      >
        <label htmlFor='loanAmount'>
          Loan Amount ($):
          <input name='amount' type='text' placeholder='($)' />
        </label>
        <label htmlFor='interestRate'>
          Interest Rate:
          <input name='interest' type='text' placeholder='%' />
          (%)
        </label>
        <label htmlFor='loanTerm'>
          Loan Term (yr):
          <select name='terms'>
            {loanTerms.map((term) => (
              <option key={term} value={term}>
                {term}
              </option>
            ))}
          </select>
        </label>
        <button type='submit'>Calculate</button>
      </form>

      <div>
        <p>Monthly Payment: ($) {monthlyPayment ? monthlyPayment : 0}</p>
      </div>
    </div>
  );
}
