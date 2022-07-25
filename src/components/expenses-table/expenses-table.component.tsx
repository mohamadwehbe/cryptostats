import { Button, Paper, TableBody, TableCell, TableContainer, TableHead, TableRow } from '@mui/material';
import React, { useEffect, useState } from 'react';
import { useGetExpensesQuery, useDeleteExpenseMutation } from '../../apis/expenses.api';
import DeleteIcon from '@mui/icons-material/Delete';

const ExpensesTable: React.FC<{ setModify: (modify: boolean) => void, modify: boolean }> = (props) => {

    //const data = useGetExpensesQuery(undefined).data;
    const [data, setData] = useState([]);

    useEffect(() => {
        try {
            fetch('/expenses', {
                method: 'GET',
                'headers': {
                    'Authorization': 'Bearer ' + localStorage.getItem("accessToken")
                },
            }).then(res => res.json()).then(res => setData(res));
        }
        catch (err) {
            console.log(err);
        }
    }, [props.modify]);


    const [deleteExpense] = useDeleteExpenseMutation();

    return (
        <div className='grid justify-center items-center'>
            <h1 className='grid justify-center mb-4'>Cryptostats</h1>
            <TableContainer component={Paper}>
                <TableHead>
                    <TableRow>
                        <TableCell>Name</TableCell>
                        <TableCell align='left'>Amount</TableCell>
                        <TableCell align='left'>Type</TableCell>
                        <TableCell align='left'>Status</TableCell>
                        <TableCell align='left'>Actions</TableCell>
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
                                <TableCell align='left'>{d.typeId === 1 ? "Buy" : "Sell"}</TableCell>
                                <TableCell align='left'>{d.statusId === 1 ? "In Progress" : "Completed"}</TableCell>
                                <TableCell align='left'>
                                    <Button variant='contained' onClick={() => { deleteExpense(d.id); props.setModify(!props.modify) }}>
                                        <DeleteIcon></DeleteIcon>
                                    </Button>
                                </TableCell>
                            </TableRow>
                        ))
                    }
                </TableBody>
            </TableContainer>
        </div>
    );
}

export { ExpensesTable }