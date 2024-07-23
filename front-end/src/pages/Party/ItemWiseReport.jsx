import React, {useEffect, useState} from 'react';
import {Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow,Box} from '@mui/material';
import {useSelector} from "react-redux";

const ItemWiseReport = ({partyName}) => {

    const {partyUser} = useSelector((state) => state.partyReducerValue);
    const [itemWise, setItemWise] = useState([]);


    useEffect(() => {
        const trans = partyUser
            .filter(item => item.id === partyName)
            .flatMap(item => item.itemWiseReportList);
        setItemWise(trans);
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

    return (
        <Box style={{ height: 'calc(100vh - 200px)', overflow: 'auto' }}>
            <TableContainer component={Paper} style={{marginTop: 20}}>
                <Table>
                    <TableHead>
                        <TableRow>
                            <TableCell>Item Name</TableCell>
                            <TableCell>Item Code</TableCell>
                            <TableCell>Sales Quantity</TableCell>
                            <TableCell>Sales Amount</TableCell>
                            <TableCell>Purchase Quantity</TableCell>
                            <TableCell>Purchase Amount</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {itemWise.length > 0 ? (
                            itemWise.map((transaction, index) => (
                                <TableRow key={index}>
                                    <TableCell>{transaction.itemName}</TableCell>
                                    <TableCell>{transaction.itemCode}</TableCell>
                                    <TableCell>{transaction.saleQuantity}</TableCell>
                                    <TableCell>{transaction.saleAmount}</TableCell>
                                    <TableCell>{transaction.purchaseQuantity}</TableCell>
                                    <TableCell>{transaction.purchaseAmount}</TableCell>
                                </TableRow>
                            ))
                        ) : (
                            <TableRow>
                                <TableCell colSpan={8} align="center">
                                    No Item Wise Report available
                                </TableCell>
                            </TableRow>
                        )}
                    </TableBody>
                </Table>
            </TableContainer>
        </Box>
    );
};

export default ItemWiseReport;
