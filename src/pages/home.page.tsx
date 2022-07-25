import React, { useState } from 'react'
import { AddExpense } from '../components/expenses-forms/add-expense-form.component';
import { ExpensesTable } from '../components/expenses-table/expenses-table.component';

const HomePage: React.FC = () => {

    const [modify, setModify] = useState<boolean>(false);

    return (
        <div className='flex justify-center items-center flex-col h-screen gap-10'>
            <ExpensesTable setModify={setModify} modify={modify} />
            <AddExpense setModify={setModify} modify={modify} />
        </div>
    )
}

export { HomePage }