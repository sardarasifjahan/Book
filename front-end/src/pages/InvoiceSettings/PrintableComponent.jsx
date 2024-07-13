import React, {useRef} from 'react';
import {
    Box,
    Button,
    Grid,
    Paper,
    Table,
    TableBody,
    TableCell,
    TableContainer,
    TableHead,
    TableRow,
    Typography
} from '@mui/material';
import {useReactToPrint} from 'react-to-print';

const PrintableComponent = () => {
    const componentRef = useRef();

    const handlePrint = useReactToPrint({
        content: () => componentRef.current,
    });

    const invoiceData = {
        billTo: {
            name: "waheed",
            address: "wathoora chadoora",
            contact: "7696517012",
            state: "01-Jammu & Kashmir",
        },
        invoiceDetails: {
            number: "4",
            date: "25-06-2024",
            placeOfSupply: "01-Jammu & Kashmir",
        },
        items: [
            {
                name: "Eleesa",
                hsn: "1",
                quantity: "1 Btl",
                unitPrice: "₹ 90.00",
                discount: "₹ 9.00 (10%)",
                amount: "₹ 81.00"
            },
            {
                name: "freetum",
                hsn: "1",
                quantity: "1 Btl",
                unitPrice: "₹ 160.00",
                discount: "₹ 16.00 (10%)",
                amount: "₹ 144.00"
            },
            {
                name: "Neuromol",
                hsn: "1",
                quantity: "1 Btl",
                unitPrice: "₹ 60.00",
                discount: "₹ 0.00 (0%)",
                amount: "₹ 60.00"
            },
        ],
        taxDetails: [
            {type: "Exmp.", taxableAmount: "₹ 144.00", rate: "0%", taxAmount: "₹ 0.00"},
        ],
        amounts: {
            subTotal: "₹ 285.00",
            total: "₹ 285.00",
            received: "₹ 285.00",
            balance: "₹ 0.00",
            saved: "₹ 25.00",
            inWords: "Two Hundred Eighty Five Rupees only",
        },
    };


    return (
        <div>
            <Button variant="contained" color="primary" onClick={handlePrint} style={{margin: '20px 0'}}>
                Print PDF
            </Button>
            <Box
                ref={componentRef}
                sx={{
                    width: '148mm',
                    minHeight: '210mm',
                    padding: 3,
                    backgroundColor: '#fff',
                    border: '1px solid #ccc',
                    borderRadius: '8px',
                    boxShadow: '0 4px 8px rgba(0,0,0,0.1)',
                    margin: '0 auto'
                }}
            >
                <Grid container spacing={3}>
                    <Grid item xs={12}>
                        <Box sx={{textAlign: 'center', marginBottom: 2}}>
                            <Typography variant="h4" sx={{fontWeight: 'bold', color: '#1976d2'}}>Tax
                                Invoice</Typography>
                            <Typography variant="h6" sx={{fontWeight: 'medium', color: '#1976d2'}}>SAFA
                                PHARMACY</Typography>
                            <Typography>Bilal abad kralpora</Typography>
                            <Typography>Phone no.: 6005571695</Typography>
                            <Typography>Email: MOHDADIL01061992@GMAIL.COM</Typography>
                            <Typography>State: 01-Jammu & Kashmir</Typography>
                        </Box>
                    </Grid>

                    <Grid item xs={6}>
                        <Box sx={{border: '1px solid #1976d2', padding: 2, borderRadius: '4px'}}>
                            <Typography variant="h6" sx={{fontWeight: 'bold', color: '#1976d2', marginBottom: 1}}>Bill
                                To</Typography>
                            <Typography>{invoiceData.billTo.name}</Typography>
                            <Typography>{invoiceData.billTo.address}</Typography>
                            <Typography>Contact No.: {invoiceData.billTo.contact}</Typography>
                            <Typography>State: {invoiceData.billTo.state}</Typography>
                        </Box>
                    </Grid>

                    <Grid item xs={6}>
                        <Box sx={{border: '1px solid #1976d2', padding: 2, borderRadius: '4px'}}>
                            <Typography variant="h6" sx={{fontWeight: 'bold', color: '#1976d2', marginBottom: 1}}>Invoice
                                Details</Typography>
                            <Typography>Invoice No.: {invoiceData.invoiceDetails.number}</Typography>
                            <Typography>Date: {invoiceData.invoiceDetails.date}</Typography>
                            <Typography>Place of supply: {invoiceData.invoiceDetails.placeOfSupply}</Typography>
                        </Box>
                    </Grid>

                    <Grid item xs={12}>
                        <TableContainer component={Paper}
                                        sx={{boxShadow: 'none', border: '1px solid #ccc', borderRadius: '4px'}}>
                            <Table aria-label="invoice items">
                                <TableHead>
                                    <TableRow>
                                        <TableCell sx={{fontWeight: 'bold', backgroundColor: '#1976d2', color: '#fff'}}>Item
                                            name</TableCell>
                                        <TableCell align="right"
                                                   sx={{fontWeight: 'bold', backgroundColor: '#1976d2', color: '#fff'}}>HSN/
                                            SAC</TableCell>
                                        <TableCell align="right" sx={{
                                            fontWeight: 'bold',
                                            backgroundColor: '#1976d2',
                                            color: '#fff'
                                        }}>Quantity</TableCell>
                                        <TableCell align="right"
                                                   sx={{fontWeight: 'bold', backgroundColor: '#1976d2', color: '#fff'}}>Unit
                                            Price/ Unit</TableCell>
                                        <TableCell align="right" sx={{
                                            fontWeight: 'bold',
                                            backgroundColor: '#1976d2',
                                            color: '#fff'
                                        }}>Discount</TableCell>
                                        <TableCell align="right" sx={{
                                            fontWeight: 'bold',
                                            backgroundColor: '#1976d2',
                                            color: '#fff'
                                        }}>Amount</TableCell>
                                    </TableRow>
                                </TableHead>
                                <TableBody>
                                    {invoiceData.items.map((item, index) => (
                                        <TableRow key={index}>
                                            <TableCell>{item.name}</TableCell>
                                            <TableCell align="right">{item.hsn}</TableCell>
                                            <TableCell align="right">{item.quantity}</TableCell>
                                            <TableCell align="right">{item.unitPrice}</TableCell>
                                            <TableCell align="right">{item.discount}</TableCell>
                                            <TableCell align="right">{item.amount}</TableCell>
                                        </TableRow>
                                    ))}
                                </TableBody>
                            </Table>
                        </TableContainer>
                    </Grid>

                    <Grid item xs={12}>
                        <TableContainer component={Paper}
                                        sx={{boxShadow: 'none', border: '1px solid #ccc', borderRadius: '4px'}}>
                            <Table>
                                <TableHead>
                                    <TableRow>
                                        <TableCell sx={{fontWeight: 'bold', backgroundColor: '#1976d2', color: '#fff'}}>Tax
                                            type</TableCell>
                                        <TableCell align="right"
                                                   sx={{fontWeight: 'bold', backgroundColor: '#1976d2', color: '#fff'}}>Taxable
                                            amount</TableCell>
                                        <TableCell align="right" sx={{
                                            fontWeight: 'bold',
                                            backgroundColor: '#1976d2',
                                            color: '#fff'
                                        }}>Rate</TableCell>
                                        <TableCell align="right"
                                                   sx={{fontWeight: 'bold', backgroundColor: '#1976d2', color: '#fff'}}>Tax
                                            amount</TableCell>
                                    </TableRow>
                                </TableHead>
                                <TableBody>
                                    {invoiceData.taxDetails.map((tax, index) => (
                                        <TableRow key={index}>
                                            <TableCell>{tax.type}</TableCell>
                                            <TableCell align="right">{tax.taxableAmount}</TableCell>
                                            <TableCell align="right">{tax.rate}</TableCell>
                                            <TableCell align="right">{tax.taxAmount}</TableCell>
                                        </TableRow>
                                    ))}
                                </TableBody>
                            </Table>
                        </TableContainer>
                    </Grid>

                    <Grid item xs={12}>
                        <Box sx={{
                            display: 'flex',
                            justifyContent: 'space-between',
                            padding: 2,
                            borderBottom: '1px solid #ccc',
                            borderTop: '1px solid #ccc'
                        }}>
                            <Typography variant="h6" sx={{fontWeight: 'bold', color: '#1976d2'}}>Sub Total</Typography>
                            <Typography variant="h6"
                                        sx={{fontWeight: 'bold'}}>₹ {invoiceData.amounts.subTotal}</Typography>
                        </Box>
                        <Box sx={{
                            display: 'flex',
                            justifyContent: 'space-between',
                            padding: 2,
                            borderBottom: '1px solid #ccc'
                        }}>
                            <Typography variant="h6" sx={{fontWeight: 'bold', color: '#1976d2'}}>Total</Typography>
                            <Typography variant="h6"
                                        sx={{fontWeight: 'bold'}}>₹ {invoiceData.amounts.total}</Typography>
                        </Box>
                        <Box sx={{
                            display: 'flex',
                            justifyContent: 'space-between',
                            padding: 2,
                            borderBottom: '1px solid #ccc'
                        }}>
                            <Typography variant="h6" sx={{fontWeight: 'bold', color: '#1976d2'}}>Received</Typography>
                            <Typography variant="h6"
                                        sx={{fontWeight: 'bold'}}>₹ {invoiceData.amounts.received}</Typography>
                        </Box>
                        <Box sx={{
                            display: 'flex',
                            justifyContent: 'space-between',
                            padding: 2,
                            borderBottom: '1px solid #ccc'
                        }}>
                            <Typography variant="h6" sx={{fontWeight: 'bold', color: '#1976d2'}}>Balance</Typography>
                            <Typography variant="h6"
                                        sx={{fontWeight: 'bold'}}>₹ {invoiceData.amounts.balance}</Typography>
                        </Box>
                        <Box sx={{textAlign: 'center', padding: 2}}>
                            <Typography variant="h6" sx={{fontWeight: 'bold', color: '#1976d2'}}>You Saved</Typography>
                            <Typography variant="h6" sx={{
                                fontWeight: 'bold',
                                color: 'green'
                            }}>₹ {invoiceData.amounts.saved}</Typography>
                        </Box>
                        <Box sx={{textAlign: 'center', padding: 2}}>
                            <Typography variant="h6" sx={{fontWeight: 'bold', color: '#1976d2'}}>Invoice Amount In
                                Words</Typography>
                            <Typography variant="body1">{invoiceData.amounts.inWords}</Typography>
                        </Box>
                    </Grid>

                    <Grid item xs={12}>
                        <Box sx={{textAlign: 'center', padding: 2, borderTop: '1px solid #ccc'}}>
                            <Typography variant="h6" sx={{fontWeight: 'bold', color: '#1976d2'}}>Terms and
                                Conditions</Typography>
                            <Typography>Thanks for doing business with us!</Typography>
                        </Box>
                    </Grid>

                    <Grid item xs={12}>
                        <Box sx={{textAlign: 'center', padding: 2}}>
                            <Typography variant="h6" sx={{fontWeight: 'bold', color: '#1976d2'}}>Authorized
                                Signatory</Typography>
                            <Typography>For : SAFA PHARMACY</Typography>
                        </Box>
                    </Grid>
                </Grid>
            </Box>
        </div>
    );
}

export default PrintableComponent;
