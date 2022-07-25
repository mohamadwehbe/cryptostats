import React from 'react'
import AddExpense from '../components/expenses-forms/add-expense-form.component'
import { ExpensesTable } from '../components/expenses-table/expenses-table.component'

const HomePage: React.FC = () => {
    return (
        <div className='flex justify-center items-center flex-col h-screen gap-10'>
            <ExpensesTable />
            <AddExpense />
        </div>
    )
}

export { HomePage }