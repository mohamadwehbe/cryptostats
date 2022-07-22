import { Paper, TableBody, TableCell, TableContainer, TableHead, TableRow } from '@mui/material';
import React, { useEffect } from 'react';
import { useGetExpensesQuery } from '../../apis/expenses.api';

const ExpensesTable: React.FC = () => {
    const data = useGetExpensesQuery(undefined).data;

    return (
        <div className='grid justify-center items-center pt-20'>
            <h1 className='grid justify-center mb-4'>Expenses</h1>
            <TableContainer component={Paper}>
                <TableHead>
                    <TableRow>
                        <TableCell>Name</TableCell>
                        <TableCell align='left'>Amount</TableCell>
                        <TableCell align='left'>Type</TableCell>
                        <TableCell align='left'>Status</TableCell>
                    </TableRow>
                </TableHead>
                <TableBody>
                    {
                        data && data.map((d: any) => (
                            <TableRow
                                key={d.id}
                                sx={{ "&:last-child td,&:last-child th": { border: 0 } }}
                            >
                                <TableCell component='th' scope='row'>
                                    {d.name}
                                </TableCell>
                                <TableCell align='left'>{d.amount}</TableCell>
                                <TableCell align='left'>{d.typeId == 1 ? "Buy" : "Sell"}</TableCell>
                                <TableCell align='left'>{d.statusId == 1 ? "In Progress" : "Completed"}</TableCell>
                            </TableRow>
                        ))
                    }
                </TableBody>
            </TableContainer>
        </div>
    );
}

export { ExpensesTable }