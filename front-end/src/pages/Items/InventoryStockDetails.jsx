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
    TableRow, Typography
} from '@mui/material';
import {useSelector} from "react-redux";


export const InventoryStockDetails = ({itemCode}) => {
    const {inventoryUser} = useSelector((state) => state.inventoryReducerValue);
    const [partyDetail, setPartyDetail] = useState(null);

    useEffect(() => {
        console.log("InventoryStockDetails  ", itemCode);
        const details = inventoryUser.find(item => item.id === itemCode);
        console.log("Party Details values", details);
        setPartyDetail(details || null);
    }, [itemCode, inventoryUser]);

    // If partyDetail is null or undefined, show a loading message or some default content
    if (!partyDetail) {
        return <Typography>Loading or No details available</Typography>;
    }

    const transactions = [
        {date: '23-05-2024', type: 'Sales Invoice', quantity: '-2 PCS', invoice: '1', closing: '8 PCS'},
        {date: '22-05-2024', type: 'Opening Items', quantity: '10 PCS', invoice: '-', closing: '10 PCS'},
    ];

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
                    <Button variant="outlined">Print PDF</Button>
                </div>
            </Grid>
            <TableContainer component={Paper}>
                <Table>
                    <TableHead>
                        <TableRow>
                            <TableCell>Date</TableCell>
                            <TableCell>Transaction Type</TableCell>
                            <TableCell>Quantity</TableCell>
                            <TableCell>Invoice Number</TableCell>
                            <TableCell>Closing Stock</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {transactions.map((transaction, index) => (
                            <TableRow key={index}>
                                <TableCell>{transaction.date}</TableCell>
                                <TableCell>{transaction.type}</TableCell>
                                <TableCell>{transaction.quantity}</TableCell>
                                <TableCell>{transaction.invoice}</TableCell>
                                <TableCell>{transaction.closing}</TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </TableContainer>
        </div>
    );
};
