import React, { useEffect, useState } from 'react';
import {
    Button,
    Grid,
    MenuItem,
    Paper,
    Select,Box,
    Table,
    TableBody,
    TableCell,
    TableContainer,
    TableHead,
    TableRow,
    Typography
} from '@mui/material';
import { useSelector } from 'react-redux';

const PartyLedger = ({ partyName }) => {
    const { partyUser } = useSelector((state) => state.partyReducerValue); // Default to empty array
    const [transactions, setTransactions] = useState([]);
    const [totalReceivable, setTotalReceivable] = useState(0);

    useEffect(() => {
        console.log("Party Ledger   " + partyName);
        const partyDetails = partyUser.find(item => item.id === partyName);

        if (partyDetails && Array.isArray(partyDetails.statementsList)) {
            const details = partyDetails.statementsList;
            console.log("Party Details values", details);
            setTransactions(details);
            calculateTotalReceivable(details);
        } else {
            console.log("No party details found or statementsList is not an array");
            setTransactions([]);
        }
    }, [partyName, partyUser]);

    const calculateTotalReceivable = (details) => {
        const receivable = details.reduce((acc, transaction) => {
            return acc + (transaction.credit || 0) - (transaction.debit || 0);
        }, 0);
        setTotalReceivable(receivable);
    };

    const calculateClosingBalance = () => {
        return transactions.reduce((acc, transaction) => {
            return acc + (transaction.credit || 0) - (transaction.debit || 0);
        }, 0);
    };

    const closingBalance = calculateClosingBalance();

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

    return (
        <Box style={{ height: 'calc(100vh - 200px)', overflow: 'auto' }}>
            <Grid container justifyContent="space-between" alignItems="center" sx={{ mb: 2 }}>
                <Select defaultValue="Last 365 Days">
                    <MenuItem value="Last 30 Days">Last 30 Days</MenuItem>
                    <MenuItem value="Last 90 Days">Last 90 Days</MenuItem>
                    <MenuItem value="Last 365 Days">Last 365 Days</MenuItem>
                </Select>
                <div>
                    <Button variant="outlined" sx={{ mr: 1 }}>Download</Button>
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
                                    <TableCell>{formatCreationDateTime(transaction.creationDateTime)}</TableCell>
                                    <TableCell>{transaction.billType}</TableCell>
                                    <TableCell>{transaction.spNo}</TableCell>
                                    <TableCell>{transaction.credit}</TableCell>
                                    <TableCell>{transaction.debit}</TableCell>
                                    <TableCell>-</TableCell>
                                    <TableCell>-</TableCell>
                                    <TableCell>{transaction.totalAmount}</TableCell>
                                </TableRow>
                            ))
                        ) : (
                            <TableRow>
                                <TableCell colSpan={8} align="center">
                                    No transactions available
                                </TableCell>
                            </TableRow>
                        )}
                        <TableRow>
                            <TableCell colSpan={3} align="right">Closing Balance</TableCell>
                            <TableCell colSpan={5}>{closingBalance}</TableCell>
                        </TableRow>
                    </TableBody>
                </Table>
            </TableContainer>
            <Typography variant="h6" gutterBottom>Total Receivable: {totalReceivable}</Typography>
        </Box>
    );
};

export default PartyLedger;
