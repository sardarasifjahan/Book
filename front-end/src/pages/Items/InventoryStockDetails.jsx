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
import {useSelector} from "react-redux";


export const InventoryStockDetails = ({itemCode}) => {
    const {inventoryUser} = useSelector((state) => state.inventoryReducerValue);
    const [stockDetails, setStockDetails] = useState(null);

    useEffect(() => {
        console.log("InventoryStockDetails  ", itemCode);
        const details = inventoryUser.find(item => item.id === itemCode);

        if (details && Array.isArray(details.stockDetailsList)) {
            const detailRespose = details.stockDetailsList;
            console.log("Party Details values", details);
            console.log("Party Details values", details);
            setStockDetails(detailRespose || null);
        }
    }, [itemCode, inventoryUser]);

    // If partyDetail is null or undefined, show a loading message or some default content
    if (!stockDetails) {
        return <Typography>Loading or No details available</Typography>;
    }

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
                        {stockDetails.map((transaction, index) => (
                            <TableRow key={index}>
                                <TableCell>{formatCreationDateTime(transaction.creationDateTime)}</TableCell>
                                <TableCell>{transaction.billType}</TableCell>
                                <TableCell>{transaction.quantityType}{transaction.quantity}</TableCell>
                                <TableCell>{transaction.spNo}</TableCell>
                                <TableCell>{transaction.closingStock}</TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </TableContainer>
        </div>
    );
};
