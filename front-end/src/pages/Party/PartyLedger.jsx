import React, {useEffect, useState} from 'react';
import {
    Button,
    Grid,
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
import {useSelector} from 'react-redux';

const PartyLedger = ({partyName}) => {
    const {partyUser} = useSelector((state) => state.partyReducerValue);
    const [transactions, setTransactions] = useState([]);

    useEffect(() => {
        console.log("Party Ledger   " + partyName);
        const details = partyUser.find(item => item.id === partyName);
        console.log("Party Details values", details);
        setTransactions(details ? details.transactions : []);
    }, [partyName, partyUser]);

    return (
        <div>
            <Grid container justifyContent="space-between" alignItems="center" sx={{mb: 2}}>
                <Select defaultValue="Last 365 Days">
                    <MenuItem value="Last 30 Days">Last 30 Days</MenuItem>
                    <MenuItem value="Last 90 Days">Last 90 Days</MenuItem>
                    <MenuItem value="Last 365 Days">Last 365 Days</MenuItem>
                </Select>
                <div>
                    <Button variant="outlined" sx={{mr: 1}}>Download</Button>
                    <Button variant="outlined">Print</Button>
                </div>
            </Grid>
            <Typography variant="h6" gutterBottom>{partyName}</Typography>
            <TableContainer component={Paper}>
                <Table>
                    <TableHead>
                        <TableRow>
                            <TableCell>Date</TableCell>
                            <TableCell>Voucher</TableCell>
                            <TableCell>Sr No</TableCell>
                            <TableCell>Credit</TableCell>
                            <TableCell>Debit</TableCell>
                            <TableCell>TDS deducted by party</TableCell>
                            <TableCell>TDS deducted by self</TableCell>
                            <TableCell>Balance</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {transactions.length > 0 ? (
                            transactions.map((transaction, index) => (
                                <TableRow key={index}>
                                    <TableCell>{transaction.date}</TableCell>
                                    <TableCell>{transaction.voucher}</TableCell>
                                    <TableCell>{transaction.srNo}</TableCell>
                                    <TableCell>{transaction.credit}</TableCell>
                                    <TableCell>{transaction.debit}</TableCell>
                                    <TableCell>{transaction.tdsByParty}</TableCell>
                                    <TableCell>{transaction.tdsBySelf}</TableCell>
                                    <TableCell>{transaction.balance}</TableCell>
                                </TableRow>
                            ))
                        ) : (
                            <TableRow>
                                <TableCell colSpan={8} align="center">
                                    No transactions available
                                </TableCell>
                            </TableRow>
                        )}
                    </TableBody>
                </Table>
            </TableContainer>
        </div>
    );
};

export default PartyLedger;
