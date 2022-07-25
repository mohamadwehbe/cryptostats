import { Button } from '@mui/material';
import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom';
import { AddExpense } from '../components/expenses-forms/add-expense-form.component';
import { ExpensesTable } from '../components/expenses-table/expenses-table.component';

const HomePage: React.FC = () => {

    const [modify, setModify] = useState<boolean>(false);
    const [expenseId, setExpenseId] = useState<string>("");
    const [name, setName] = useState("");
    const [amount, setAmount] = useState<number | string>("");
    const [statusId, setStatusId] = useState<number | string>("");
    const [typeId, setTypeId] = useState<number | string>("");
    const navigate = useNavigate();

    return (
        <div className='flex justify-center items-center flex-col h-screen gap-10'>
            <ExpensesTable
                setExpenseId={setExpenseId}
                expenseId={expenseId}
                setModify={setModify}
                modify={modify}
                setName={setName}
                setAmount={setAmount}
                setStatusId={setStatusId}
                setTypeId={setTypeId} />
            <AddExpense
                setExpenseId={setExpenseId}
                expenseId={expenseId}
                setModify={setModify}
                modify={modify}
                setName={setName}
                name={name}
                setAmount={setAmount}
                amount={amount}
                setStatusId={setStatusId}
                statusId={statusId}
                setTypeId={setTypeId}
                typeId={typeId} />
            <Button variant='contained' onClick={() => { localStorage.clear(); navigate('/login') }}>
                <span className='p-1'>Logout</span>
            </Button>
        </div >
    )
}

export { HomePage }