import React, {useRef} from 'react';
import {Box, Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Typography} from '@mui/material';
import {useReactToPrint} from 'react-to-print';

const PrintableComponent = () => {
    const componentRef = useRef();

    const handlePrint = useReactToPrint({
        content: () => componentRef.current,
    });


    const invoiceData = {
        invoiceNo: 'A002652',
        entryNo: 'A002652',
        date: '05-07-2024',
        dueDate: '05-07-2024',
        customer: {
            name: 'Ghazala Parween',
            doctor: 'Dr. K Das',
            location: 'Bokaro 20-Jharkhand',
        },
        company: {
            name: 'Surgi Centre Medicine',
            address: '226/1 Co-operative Colony, Bokaro Steel City, Jharkhand',
            phone: '736000135',
            email: 'surgicentremedicine@gmail.com',
            gstin: '20ADSPG2960J1ZK',
            dlNo: 'JH-BK3-115085/86',
        },
        items: [
            {
                sn: 1,
                qty: '1x1',
                pack: '1x1',
                product: 'Accuchek ZN Sachet',
                mfg: 'Accost',
                batch: '1081',
                exp: '1/24',
                hsn: '2106',
                mrp: 46.00,
                rate: 46.00,
                amount: 46.00
            },
            {
                sn: 2,
                qty: '1x10',
                pack: '1x10',
                product: 'Acolef-750',
                mfg: 'Accost',
                batch: '230791',
                exp: '6/25',
                hsn: '3004',
                mrp: 330.00,
                rate: 330.00,
                amount: 330.00
            },
            // Add more items as needed
        ],
        totals: {
            subtotal: 3048.10,
            sgst: 217.14,
            cgst: 217.14,
            totalGst: 434.28,
            grandTotal: 3482.00,
        },
        terms: 'No medicine will be returned after 45 days. Bills not paid due date will attract 24% interest.',
    };

    return (
        <Box ref={componentRef} sx={{
            width: '1748px',
            height: '2480px',
            padding: '16px',
            boxSizing: 'border-box',
            backgroundColor: '#fff'
        }}>
            <Typography variant="h4" align="center" gutterBottom>
                GST Invoice
            </Typography>
            <Box sx={{display: 'flex', justifyContent: 'space-between', marginBottom: '16px'}}>
                <Box>
                    <Typography variant="subtitle1"><strong>{invoiceData.company.name}</strong></Typography>
                    <Typography variant="body2">{invoiceData.company.address}</Typography>
                    <Typography variant="body2">Phone: {invoiceData.company.phone}</Typography>
                    <Typography variant="body2">Email: {invoiceData.company.email}</Typography>
                    <Typography variant="body2">GSTIN: {invoiceData.company.gstin}</Typography>
                    <Typography variant="body2">DL No: {invoiceData.company.dlNo}</Typography>
                </Box>
                <Box>
                    <Typography variant="subtitle1"><strong>Customer:</strong></Typography>
                    <Typography variant="body2">{invoiceData.customer.name}</Typography>
                    <Typography variant="body2">Doctor: {invoiceData.customer.doctor}</Typography>
                    <Typography variant="body2">{invoiceData.customer.location}</Typography>
                    <Typography variant="body2">Invoice No: {invoiceData.invoiceNo}</Typography>
                    <Typography variant="body2">Date: {invoiceData.date}</Typography>
                    <Typography variant="body2">Due Date: {invoiceData.dueDate}</Typography>
                </Box>
            </Box>
            <TableContainer component={Paper}>
                <Table>
                    <TableHead>
                        <TableRow>
                            <TableCell>Sn</TableCell>
                            <TableCell>Qty</TableCell>
                            <TableCell>Pack</TableCell>
                            <TableCell>Product</TableCell>
                            <TableCell>Mfg</TableCell>
                            <TableCell>Batch</TableCell>
                            <TableCell>Exp</TableCell>
                            <TableCell>HSN</TableCell>
                            <TableCell>MRP</TableCell>
                            <TableCell>Rate</TableCell>
                            <TableCell>Amount</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {invoiceData.items.map((item, index) => (
                            <TableRow key={index}>
                                <TableCell>{item.sn}</TableCell>
                                <TableCell>{item.qty}</TableCell>
                                <TableCell>{item.pack}</TableCell>
                                <TableCell>{item.product}</TableCell>
                                <TableCell>{item.mfg}</TableCell>
                                <TableCell>{item.batch}</TableCell>
                                <TableCell>{item.exp}</TableCell>
                                <TableCell>{item.hsn}</TableCell>
                                <TableCell>{item.mrp}</TableCell>
                                <TableCell>{item.rate}</TableCell>
                                <TableCell>{item.amount}</TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </TableContainer>
            <Box sx={{marginTop: '16px'}}>
                <Typography variant="body2">Subtotal: {invoiceData.totals.subtotal}</Typography>
                <Typography variant="body2">SGST: {invoiceData.totals.sgst}</Typography>
                <Typography variant="body2">CGST: {invoiceData.totals.cgst}</Typography>
                <Typography variant="body2">Total GST: {invoiceData.totals.totalGst}</Typography>
                <Typography variant="h6">Grand Total: {invoiceData.totals.grandTotal}</Typography>
            </Box>
            <Box sx={{marginTop: '16px'}}>
                <Typography variant="body2"><strong>Terms & Conditions:</strong></Typography>
                <Typography variant="body2">{invoiceData.terms}</Typography>
            </Box>
        </Box>
    );
};

export default PrintableComponent;
