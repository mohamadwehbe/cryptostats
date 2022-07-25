import { Button, TextField } from '@mui/material';
import React, { useState } from 'react';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import { useAddExpenseMutation, useGetStatusesQuery, useGetTypesQuery } from '../../apis/expenses.api';

const AddExpense: React.FC<{ setModify: (modify: boolean) => void, modify: boolean }> = (props) => {

    const statuses = useGetStatusesQuery(undefined).data;
    const types = useGetTypesQuery(undefined).data;
    const [name, setName] = useState("");
    const [amount, setAmount] = useState<number | string>("");
    const [statusId, setStatusId] = useState<number | string>("");
    const [typeId, setTypeId] = useState<number | string>("");
    const [createExpense] = useAddExpenseMutation();

    const addExpense = async () => {
        try {
            await createExpense({ name, amount, typeId, statusId });
            props.setModify(!props.modify)
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
                        onChange={(e) => setAmount(e.target.value)}
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
            <Button variant='contained' className='w-60' onClick={addExpense}>
                <span className='p-1'>Add</span>
            </Button>
            <div>( * : required )</div>
        </div>
    )
}

export { AddExpense };
