import React, {useEffect, useState} from 'react';
import {
    Button,
    FormControl,
    Grid,
    InputLabel,
    MenuItem,
    Paper,
    Select,
    Table,
    TableBody,
    TableCell,
    TableContainer,
    TableHead,
    TableRow,
    Typography
} from '@mui/material';
import {useSelector} from "react-redux";

const PartyTransactions = ({partyName}) => {
    const {partyUser} = useSelector((state) => state.partyReducerValue);
    console.log("PartyName ", partyName);
    const [transactionType, setTransactionType] = useState('');
    const [transactions, setTransactions] = useState([]);


    useEffect(() => {
        const trans = partyUser
            .filter(item => item.id === partyName)
            .flatMap(item => item.transactionsList);
        setTransactions(trans);
    }, [partyName, partyUser]);

    function formatCreationDateTime(dateTime) {
        if (!dateTime) {
            return '-'; // Return '-' if dateTime is null, undefined, or an empty string
        }

        const date = new Date(dateTime);
        if (isNaN(date.getTime())) {
            return '-'; // Return '-' if the date is invalid
        }

        const year = date.getFullYear();
        const month = String(date.getMonth() + 1).padStart(2, '0');
        const day = String(date.getDate()).padStart(2, '0');
        return `${year}-${month}-${day}`;
    }
    const handleTransactionTypeChange = (event) => {
        setTransactionType(event.target.value);
    };

    return (
        <div>
            <Grid container justifyContent="space-between" alignItems="center" style={{marginBottom: 16}}>
                <Typography variant="h6">Transactions</Typography>
                <Grid item>
                    <FormControl style={{marginRight: 16}}>
                        <InputLabel>Select Transaction Type</InputLabel>
                        <Select
                            value={transactionType}
                            onChange={handleTransactionTypeChange}
                            displayEmpty
                        >
                            <MenuItem value="">
                                <em>All</em>
                            </MenuItem>
                            <MenuItem value="Sales Invoices">Sales Invoices</MenuItem>
                            <MenuItem value="Purchase Invoices">Purchase Invoices</MenuItem>
                            <MenuItem value="Payments">Payments</MenuItem>
                        </Select>
                    </FormControl>
                    <Button variant="contained">Last 365 Days</Button>
                </Grid>
            </Grid>
            <TableContainer component={Paper}>
                <Table>
                    <TableHead>
                        <TableRow>
                            <TableCell>Date</TableCell>
                            <TableCell>Transaction Type</TableCell>
                            <TableCell>Transaction Number</TableCell>
                            <TableCell>Amount</TableCell>
                            <TableCell>Status</TableCell>
                        </TableRow>
                    </TableHead>
                    {transactions && (
                        <TableBody>
                            {transactions
                                .filter((transaction) => (transactionType ? transaction.type === transactionType : true))
                                .map((row, index) => (
                                    <TableRow key={index}>
                                        <TableCell>{formatCreationDateTime(row.creationDateTime)}</TableCell>
                                        <TableCell>{row.transactionType}</TableCell>
                                        <TableCell>{row.spNo}</TableCell>
                                        <TableCell>₹{row.amount}</TableCell>
                                        <TableCell>
                    <span style={{color: row.status === 'Paid' ? 'green' : 'red'}}>
                      {row.status}
                    </span>
                                        </TableCell>
                                    </TableRow>
                                ))}
                        </TableBody>
                    )}
                </Table>
            </TableContainer>
        </div>
    );
};

export default PartyTransactions;
