import { Button, TextField } from '@mui/material';
import React from 'react';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import { useAddExpenseMutation, useGetStatusesQuery, useGetTypesQuery, useUpdateExpenseMutation } from '../../apis/expenses.api';

const AddExpense: React.FC<{
    setExpenseId: (expenseId: string) => void,
    expenseId: string,
    setModify: (modify: boolean) => void,
    modify: boolean,
    setName: (name: string) => void,
    name: string,
    setAmount: (amount: number | string) => void,
    amount: number | string,
    setStatusId: (statusId: number | string) => void,
    statusId: number | string,
    setTypeId: (typeId: number | string) => void,
    typeId: number | string
}> = ({
    name, setName,
    amount, setAmount,
    typeId, setTypeId,
    statusId, setStatusId,
    modify, setModify,
    expenseId, setExpenseId
}) => {

        const statuses = useGetStatusesQuery(undefined).data;
        const types = useGetTypesQuery(undefined).data;
        
        const [createExpense] = useAddExpenseMutation();
        const [updateExpense] = useUpdateExpenseMutation();

        const addExpense = async () => {
            try {
                await createExpense({ name, amount, typeId, statusId }).then(() => {
                    setModify(!modify);
                    setName("");
                    setAmount("");
                    setTypeId("");
                    setStatusId("");
                });

            } catch (error) {
                console.log(error)
            }
        }

        const update = async () => {
            try {
                await updateExpense({
                    id: expenseId,
                    post: {
                        name, amount, typeId, statusId
                    }
                }).then(() => {
                    setModify(!modify);
                    setName("");
                    setAmount("");
                    setTypeId("");
                    setStatusId("");
                    setExpenseId("");
                });

            } catch (error) {
                console.log(error)
            }
        }

        return (
            <div className="flex justify-center items-center flex-col gap-2">
                <div className="flex gap-2">
                    <div className="flex flex-col gap-2">
                        <TextField
                            label="Name"
                            required
                            value={name}
                            onChange={(e) => setName(e.target.value)}
                        />
                        <TextField
                            label="Amount"
                            required
                            value={amount}
                            onChange={(e) => setAmount(+e.target.value)}
                        />
                    </div>
                    <div className="flex flex-col gap-2">
                        <FormControl className='w-40'>
                            <InputLabel id="demo-simple-select-label">Status*</InputLabel>
                            <Select
                                labelId="demo-simple-select-label"
                                id="demo-simple-select"
                                value={statusId}
                                label="Status"
                                onChange={(e) => setStatusId(e.target.value)}
                            >
                                {statuses && statuses.map((d: any) => (
                                    <MenuItem key={d.id} value={d.id}>{d.name}</MenuItem>
                                ))}
                            </Select>
                        </FormControl>
                        <FormControl className='w-40'>
                            <InputLabel id="demo-simple-select-label">Type*</InputLabel>
                            <Select
                                labelId="demo-simple-select-label"
                                id="demo-simple-select"
                                value={typeId}
                                label="Type"
                                onChange={(e) => setTypeId(e.target.value)}
                            >
                                {types && types.map((d: any) => (
                                    <MenuItem key={d.id} value={d.id}>{d.name}</MenuItem>
                                ))}
                            </Select>
                        </FormControl>
                    </div>
                </div>
                <Button variant='contained' className='w-60' onClick={() => {
                    if (expenseId)
                        update();
                    else
                        addExpense();
                }}>
                    <span className='p-1'>{expenseId ? "Update" : "Add"}</span>
                </Button>
                <div>( * : required )</div>
            </div>
        )
    }

export { AddExpense };
