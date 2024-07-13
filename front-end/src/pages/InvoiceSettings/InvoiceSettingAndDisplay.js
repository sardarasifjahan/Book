import React from 'react';
import {
    Box,
    Divider,
    Grid,
    Paper,
    Table,
    TableBody,
    TableCell,
    TableContainer,
    TableHead,
    TableRow,
    Typography,
} from '@mui/material';
import '../../App.css';
import QRCodeGenerator from "./QRCodeGenerator";

const InvoiceSettingAndDisplay = React.forwardRef((props, ref) => {
        const invoiceData = {
            storeName: 'Shree Balaji Hardware Store',
            address: 'Gol Chauraha, Sarafa Bazar, Indore, 452004, Indore, Madhya Pradesh, 452004',
            gstin: '09AYTST1022H1ZE',
            mobile: '5345535555',
            pan: 'YTERW9603R',
            email: 'rohitp07@gmail.com',
            invoiceNo: '10147',
            invoiceDate: '29/12/2023',
            dueDate: '28/01/2024',
            challanNo: '10147',
            poNo: 'PN-122',
            ewayBillNo: '223',
            vehicleNo: '4',
            billTo: 'CASH SALE',
            shipTo: 'CASH SALE',
            items: [
                {name: 'ABRO PTFT 5MT', hsn: '3920', qty: '8 PCS', sgst: 90, cgst: 90, amount: 1680},
                {name: 'HEATX 500 ML', hsn: '3506', qty: '7 PCS', sgst: 160.17, cgst: 160.17, amount: 2100},
                {name: 'ABRO PTFT 5MT', hsn: '3920', qty: '8 PCS', sgst: 90, cgst: 90, amount: 1680},
                {name: 'HEATX 500 ML', hsn: '3506', qty: '7 PCS', sgst: 160.17, cgst: 160.17, amount: 2100},
                {name: 'ABRO PTFT 5MT', hsn: '3920', qty: '8 PCS', sgst: 90, cgst: 90, amount: 1680},
                {name: 'HEATX 500 ML', hsn: '3506', qty: '7 PCS', sgst: 160.17, cgst: 160.17, amount: 2100},
                {name: 'ABRO PTFT 5MT', hsn: '3920', qty: '8 PCS', sgst: 90, cgst: 90, amount: 1680},
                {name: 'HEATX 500 ML', hsn: '3506', qty: '7 PCS', sgst: 160.17, cgst: 160.17, amount: 2100},
                {name: 'ABRO PTFT 5MT', hsn: '3920', qty: '8 PCS', sgst: 90, cgst: 90, amount: 1680},
                {name: 'HEATX 500 ML', hsn: '3506', qty: '7 PCS', sgst: 160.17, cgst: 160.17, amount: 2100},
                {name: 'ABRO PTFT 5MT', hsn: '3920', qty: '8 PCS', sgst: 90, cgst: 90, amount: 1680},
                {name: 'HEATX 500 ML', hsn: '3506', qty: '7 PCS', sgst: 160.17, cgst: 160.17, amount: 2100},
                {name: 'ABRO PTFT 5MT', hsn: '3920', qty: '8 PCS', sgst: 90, cgst: 90, amount: 1680},
                {name: 'HEATX 500 ML', hsn: '3506', qty: '7 PCS', sgst: 160.17, cgst: 160.17, amount: 2100},
                {name: 'ABRO PTFT 5MT', hsn: '3920', qty: '8 PCS', sgst: 90, cgst: 90, amount: 1680},
                {name: 'HEATX 500 ML', hsn: '3506', qty: '7 PCS', sgst: 160.17, cgst: 160.17, amount: 2100}, {name: 'ABRO PTFT 5MT', hsn: '3920', qty: '8 PCS', sgst: 90, cgst: 90, amount: 1680},
                {name: 'HEATX 500 ML', hsn: '3506', qty: '7 PCS', sgst: 160.17, cgst: 160.17, amount: 2100}, {name: 'ABRO PTFT 5MT', hsn: '3920', qty: '8 PCS', sgst: 90, cgst: 90, amount: 1680},
                {name: 'HEATX 500 ML', hsn: '3506', qty: '7 PCS', sgst: 160.17, cgst: 160.17, amount: 2100}, {name: 'ABRO PTFT 5MT', hsn: '3920', qty: '8 PCS', sgst: 90, cgst: 90, amount: 1680},
                {name: 'HEATX 500 ML', hsn: '3506', qty: '7 PCS', sgst: 160.17, cgst: 160.17, amount: 2100}, {name: 'ABRO PTFT 5MT', hsn: '3920', qty: '8 PCS', sgst: 90, cgst: 90, amount: 1680},
                {name: 'HEATX 500 ML', hsn: '3506', qty: '7 PCS', sgst: 160.17, cgst: 160.17, amount: 2100}, {name: 'ABRO PTFT 5MT', hsn: '3920', qty: '8 PCS', sgst: 90, cgst: 90, amount: 1680},
                {name: 'HEATX 500 ML', hsn: '3506', qty: '7 PCS', sgst: 160.17, cgst: 160.17, amount: 2100}, {name: 'ABRO PTFT 5MT', hsn: '3920', qty: '8 PCS', sgst: 90, cgst: 90, amount: 1680},
                {name: 'HEATX 500 ML', hsn: '3506', qty: '7 PCS', sgst: 160.17, cgst: 160.17, amount: 2100}, {name: 'ABRO PTFT 5MT', hsn: '3920', qty: '8 PCS', sgst: 90, cgst: 90, amount: 1680},
                {name: 'HEATX 500 ML', hsn: '3506', qty: '7 PCS', sgst: 160.17, cgst: 160.17, amount: 2100}, {name: 'ABRO PTFT 5MT', hsn: '3920', qty: '8 PCS', sgst: 90, cgst: 90, amount: 1680},
                {name: 'HEATX 500 ML', hsn: '3506', qty: '7 PCS', sgst: 160.17, cgst: 160.17, amount: 2100}, {name: 'ABRO PTFT 5MT', hsn: '3920', qty: '8 PCS', sgst: 90, cgst: 90, amount: 1680},
                {name: 'HEATX 500 ML', hsn: '3506', qty: '7 PCS', sgst: 160.17, cgst: 160.17, amount: 2100}, {name: 'ABRO PTFT 5MT', hsn: '3920', qty: '8 PCS', sgst: 90, cgst: 90, amount: 1680},
                {name: 'HEATX 500 ML', hsn: '3506', qty: '7 PCS', sgst: 160.17, cgst: 160.17, amount: 2100}, {name: 'ABRO PTFT 5MT', hsn: '3920', qty: '8 PCS', sgst: 90, cgst: 90, amount: 1680},
                {name: 'HEATX 500 ML', hsn: '3506', qty: '7 PCS', sgst: 160.17, cgst: 160.17, amount: 2100}, {name: 'ABRO PTFT 5MT', hsn: '3920', qty: '8 PCS', sgst: 90, cgst: 90, amount: 1680},
                {name: 'HEATX 500 ML', hsn: '3506', qty: '7 PCS', sgst: 160.17, cgst: 160.17, amount: 2100}, {name: 'ABRO PTFT 5MT', hsn: '3920', qty: '8 PCS', sgst: 90, cgst: 90, amount: 1680},
                {name: 'HEATX 500 ML', hsn: '3506', qty: '7 PCS', sgst: 160.17, cgst: 160.17, amount: 2100}, {name: 'ABRO PTFT 5MT', hsn: '3920', qty: '8 PCS', sgst: 90, cgst: 90, amount: 1680},
                {name: 'HEATX 500 ML', hsn: '3506', qty: '7 PCS', sgst: 160.17, cgst: 160.17, amount: 2100}, {name: 'ABRO PTFT 5MT', hsn: '3920', qty: '8 PCS', sgst: 90, cgst: 90, amount: 1680},
                {name: 'HEATX 500 ML', hsn: '3506', qty: '7 PCS', sgst: 160.17, cgst: 160.17, amount: 2100}, {name: 'ABRO PTFT 5MT', hsn: '3920', qty: '8 PCS', sgst: 90, cgst: 90, amount: 1680},
                {name: 'HEATX 500 ML', hsn: '3506', qty: '7 PCS', sgst: 160.17, cgst: 160.17, amount: 2100}, {name: 'ABRO PTFT 5MT', hsn: '3920', qty: '8 PCS', sgst: 90, cgst: 90, amount: 1680},
                {name: 'HEATX 500 ML', hsn: '3506', qty: '7 PCS', sgst: 160.17, cgst: 160.17, amount: 2100}, {name: 'ABRO PTFT 5MT', hsn: '3920', qty: '8 PCS', sgst: 90, cgst: 90, amount: 1680},
                {name: 'HEATX 500 ML', hsn: '3506', qty: '7 PCS', sgst: 160.17, cgst: 160.17, amount: 2100}, {name: 'ABRO PTFT 5MT', hsn: '3920', qty: '8 PCS', sgst: 90, cgst: 90, amount: 1680},
                {name: 'HEATX 500 ML', hsn: '3506', qty: '7 PCS', sgst: 160.17, cgst: 160.17, amount: 2100}, {name: 'ABRO PTFT 5MT', hsn: '3920', qty: '8 PCS', sgst: 90, cgst: 90, amount: 1680},
                {name: 'HEATX 500 ML', hsn: '3506', qty: '7 PCS', sgst: 160.17, cgst: 160.17, amount: 2100}, {name: 'ABRO PTFT 5MT', hsn: '3920', qty: '8 PCS', sgst: 90, cgst: 90, amount: 1680},
                {name: 'HEATX 500 ML', hsn: '3506', qty: '7 PCS', sgst: 160.17, cgst: 160.17, amount: 2100}, {name: 'ABRO PTFT 5MT', hsn: '3920', qty: '8 PCS', sgst: 90, cgst: 90, amount: 1680},
                {name: 'HEATX 500 ML', hsn: '3506', qty: '7 PCS', sgst: 160.17, cgst: 160.17, amount: 2100}, {name: 'ABRO PTFT 5MT', hsn: '3920', qty: '8 PCS', sgst: 90, cgst: 90, amount: 1680},
                {name: 'HEATX 500 ML', hsn: '3506', qty: '7 PCS', sgst: 160.17, cgst: 160.17, amount: 2100}, {name: 'ABRO PTFT 5MT', hsn: '3920', qty: '8 PCS', sgst: 90, cgst: 90, amount: 1680},
                {name: 'HEATX 500 ML', hsn: '3506', qty: '7 PCS', sgst: 160.17, cgst: 160.17, amount: 2100}, {name: 'ABRO PTFT 5MT', hsn: '3920', qty: '8 PCS', sgst: 90, cgst: 90, amount: 1680},
                {name: 'HEATX 500 ML', hsn: '3506', qty: '7 PCS', sgst: 160.17, cgst: 160.17, amount: 2100}, {name: 'ABRO PTFT 5MT', hsn: '3920', qty: '8 PCS', sgst: 90, cgst: 90, amount: 1680},
                {name: 'HEATX 500 ML', hsn: '3506', qty: '7 PCS', sgst: 160.17, cgst: 160.17, amount: 2100}, {name: 'ABRO PTFT 5MT', hsn: '3920', qty: '8 PCS', sgst: 90, cgst: 90, amount: 1680},
                {name: 'HEATX 500 ML', hsn: '3506', qty: '7 PCS', sgst: 160.17, cgst: 160.17, amount: 2100}, {name: 'ABRO PTFT 5MT', hsn: '3920', qty: '8 PCS', sgst: 90, cgst: 90, amount: 1680},
                {name: 'HEATX 500 ML', hsn: '3506', qty: '7 PCS', sgst: 160.17, cgst: 160.17, amount: 2100}, {name: 'ABRO PTFT 5MT', hsn: '3920', qty: '8 PCS', sgst: 90, cgst: 90, amount: 1680},
                {name: 'HEATX 500 ML', hsn: '3506', qty: '7 PCS', sgst: 160.17, cgst: 160.17, amount: 2100}, {name: 'ABRO PTFT 5MT', hsn: '3920', qty: '8 PCS', sgst: 90, cgst: 90, amount: 1680},
                {name: 'HEATX 500 ML', hsn: '3506', qty: '7 PCS', sgst: 160.17, cgst: 160.17, amount: 2100}, {name: 'ABRO PTFT 5MT', hsn: '3920', qty: '8 PCS', sgst: 90, cgst: 90, amount: 1680},
                {name: 'HEATX 500 ML', hsn: '3506', qty: '7 PCS', sgst: 160.17, cgst: 160.17, amount: 2100}, {name: 'ABRO PTFT 5MT', hsn: '3920', qty: '8 PCS', sgst: 90, cgst: 90, amount: 1680},
                {name: 'HEATX 500 ML', hsn: '3506', qty: '7 PCS', sgst: 160.17, cgst: 160.17, amount: 2100}, {name: 'ABRO PTFT 5MT', hsn: '3920', qty: '8 PCS', sgst: 90, cgst: 90, amount: 1680},
                {name: 'HEATX 500 ML', hsn: '3506', qty: '7 PCS', sgst: 160.17, cgst: 160.17, amount: 2100}, {name: 'ABRO PTFT 5MT', hsn: '3920', qty: '8 PCS', sgst: 90, cgst: 90, amount: 1680},
                {name: 'HEATX 500 ML', hsn: '3506', qty: '7 PCS', sgst: 160.17, cgst: 160.17, amount: 2100}, {name: 'ABRO PTFT 5MT', hsn: '3920', qty: '8 PCS', sgst: 90, cgst: 90, amount: 1680},
                {name: 'HEATX 500 ML', hsn: '3506', qty: '7 PCS', sgst: 160.17, cgst: 160.17, amount: 2100}, {name: 'ABRO PTFT 5MT', hsn: '3920', qty: '8 PCS', sgst: 90, cgst: 90, amount: 1680},
                {name: 'HEATX 500 ML', hsn: '3506', qty: '7 PCS', sgst: 160.17, cgst: 160.17, amount: 2100}, {name: 'ABRO PTFT 5MT', hsn: '3920', qty: '8 PCS', sgst: 90, cgst: 90, amount: 1680},
                {name: 'HEATX 500 ML', hsn: '3506', qty: '7 PCS', sgst: 160.17, cgst: 160.17, amount: 2100}, {name: 'ABRO PTFT 5MT', hsn: '3920', qty: '8 PCS', sgst: 90, cgst: 90, amount: 1680},
                {name: 'HEATX 500 ML', hsn: '3506', qty: '7 PCS', sgst: 160.17, cgst: 160.17, amount: 2100}, {name: 'ABRO PTFT 5MT', hsn: '3920', qty: '8 PCS', sgst: 90, cgst: 90, amount: 1680},
                {name: 'HEATX 500 ML', hsn: '3506', qty: '7 PCS', sgst: 160.17, cgst: 160.17, amount: 2100}, {name: 'ABRO PTFT 5MT', hsn: '3920', qty: '8 PCS', sgst: 90, cgst: 90, amount: 1680},
                {name: 'HEATX 500 ML', hsn: '3506', qty: '7 PCS', sgst: 160.17, cgst: 160.17, amount: 2100}, {name: 'ABRO PTFT 5MT', hsn: '3920', qty: '8 PCS', sgst: 90, cgst: 90, amount: 1680},
                {name: 'HEATX 500 ML', hsn: '3506', qty: '7 PCS', sgst: 160.17, cgst: 160.17, amount: 2100}, {name: 'ABRO PTFT 5MT', hsn: '3920', qty: '8 PCS', sgst: 90, cgst: 90, amount: 1680},
                {name: 'HEATX 500 ML', hsn: '3506', qty: '7 PCS', sgst: 160.17, cgst: 160.17, amount: 2100}, {name: 'ABRO PTFT 5MT', hsn: '3920', qty: '8 PCS', sgst: 90, cgst: 90, amount: 1680},
                {name: 'HEATX 500 ML', hsn: '3506', qty: '7 PCS', sgst: 160.17, cgst: 160.17, amount: 2100}, {name: 'ABRO PTFT 5MT', hsn: '3920', qty: '8 PCS', sgst: 90, cgst: 90, amount: 1680},
                {name: 'HEATX 500 ML', hsn: '3506', qty: '7 PCS', sgst: 160.17, cgst: 160.17, amount: 2100}, {name: 'ABRO PTFT 5MT', hsn: '3920', qty: '8 PCS', sgst: 90, cgst: 90, amount: 1680},
                {name: 'HEATX 500 ML', hsn: '3506', qty: '7 PCS', sgst: 160.17, cgst: 160.17, amount: 2100}, {name: 'ABRO PTFT 5MT', hsn: '3920', qty: '8 PCS', sgst: 90, cgst: 90, amount: 1680},
                {name: 'HEATX 500 ML', hsn: '3506', qty: '7 PCS', sgst: 160.17, cgst: 160.17, amount: 2100}, {name: 'ABRO PTFT 5MT', hsn: '3920', qty: '8 PCS', sgst: 90, cgst: 90, amount: 1680},
                {name: 'HEATX 500 ML', hsn: '3506', qty: '7 PCS', sgst: 160.17, cgst: 160.17, amount: 2100}, {name: 'ABRO PTFT 5MT', hsn: '3920', qty: '8 PCS', sgst: 90, cgst: 90, amount: 1680},
                {name: 'HEATX 500 ML', hsn: '3506', qty: '7 PCS', sgst: 160.17, cgst: 160.17, amount: 2100}, {name: 'ABRO PTFT 5MT', hsn: '3920', qty: '8 PCS', sgst: 90, cgst: 90, amount: 1680},
                {name: 'HEATX 500 ML', hsn: '3506', qty: '7 PCS', sgst: 160.17, cgst: 160.17, amount: 2100}, {name: 'ABRO PTFT 5MT', hsn: '3920', qty: '8 PCS', sgst: 90, cgst: 90, amount: 1680},
                {name: 'HEATX 500 ML', hsn: '3506', qty: '7 PCS', sgst: 160.17, cgst: 160.17, amount: 2100}, {name: 'ABRO PTFT 5MT', hsn: '3920', qty: '8 PCS', sgst: 90, cgst: 90, amount: 1680},
                {name: 'HEATX 500 ML', hsn: '3506', qty: '7 PCS', sgst: 160.17, cgst: 160.17, amount: 2100}, {name: 'ABRO PTFT 5MT', hsn: '3920', qty: '8 PCS', sgst: 90, cgst: 90, amount: 1680},
                {name: 'HEATX 500 ML', hsn: '3506', qty: '7 PCS', sgst: 160.17, cgst: 160.17, amount: 2100}, {name: 'ABRO PTFT 5MT', hsn: '3920', qty: '8 PCS', sgst: 90, cgst: 90, amount: 1680},
                {name: 'HEATX 500 ML', hsn: '3506', qty: '7 PCS', sgst: 160.17, cgst: 160.17, amount: 2100}, {name: 'ABRO PTFT 5MT', hsn: '3920', qty: '8 PCS', sgst: 90, cgst: 90, amount: 1680},
                {name: 'HEATX 500 ML', hsn: '3506', qty: '7 PCS', sgst: 160.17, cgst: 160.17, amount: 2100}, {name: 'ABRO PTFT 5MT', hsn: '3920', qty: '8 PCS', sgst: 90, cgst: 90, amount: 1680},
                {name: 'HEATX 500 ML', hsn: '3506', qty: '7 PCS', sgst: 160.17, cgst: 160.17, amount: 2100}, {name: 'ABRO PTFT 5MT', hsn: '3920', qty: '8 PCS', sgst: 90, cgst: 90, amount: 1680},
                {name: 'HEATX 500 ML', hsn: '3506', qty: '7 PCS', sgst: 160.17, cgst: 160.17, amount: 2100}, {name: 'ABRO PTFT 5MT', hsn: '3920', qty: '8 PCS', sgst: 90, cgst: 90, amount: 1680},
                {name: 'HEATX 500 ML', hsn: '3506', qty: '7 PCS', sgst: 160.17, cgst: 160.17, amount: 2100}, {name: 'ABRO PTFT 5MT', hsn: '3920', qty: '8 PCS', sgst: 90, cgst: 90, amount: 1680},
                {name: 'HEATX 500 ML', hsn: '3506', qty: '7 PCS', sgst: 160.17, cgst: 160.17, amount: 2100}, {name: 'ABRO PTFT 5MT', hsn: '3920', qty: '8 PCS', sgst: 90, cgst: 90, amount: 1680},
                {name: 'HEATX 500 ML', hsn: '3506', qty: '7 PCS', sgst: 160.17, cgst: 160.17, amount: 2100}, {name: 'ABRO PTFT 5MT', hsn: '3920', qty: '8 PCS', sgst: 90, cgst: 90, amount: 1680},
                {name: 'HEATX 500 ML', hsn: '3506', qty: '7 PCS', sgst: 160.17, cgst: 160.17, amount: 2100}, {name: 'ABRO PTFT 5MT', hsn: '3920', qty: '8 PCS', sgst: 90, cgst: 90, amount: 1680},
                {name: 'HEATX 500 ML', hsn: '3506', qty: '7 PCS', sgst: 160.17, cgst: 160.17, amount: 2100}, {name: 'ABRO PTFT 5MT', hsn: '3920', qty: '8 PCS', sgst: 90, cgst: 90, amount: 1680},
                {name: 'HEATX 500 ML', hsn: '3506', qty: '7 PCS', sgst: 160.17, cgst: 160.17, amount: 2100}, {name: 'ABRO PTFT 5MT', hsn: '3920', qty: '8 PCS', sgst: 90, cgst: 90, amount: 1680},
                {name: 'HEATX 500 ML', hsn: '3506', qty: '7 PCS', sgst: 160.17, cgst: 160.17, amount: 2100}, {name: 'ABRO PTFT 5MT', hsn: '3920', qty: '8 PCS', sgst: 90, cgst: 90, amount: 1680},
                {name: 'HEATX 500 ML', hsn: '3506', qty: '7 PCS', sgst: 160.17, cgst: 160.17, amount: 2100}, {name: 'ABRO PTFT 5MT', hsn: '3920', qty: '8 PCS', sgst: 90, cgst: 90, amount: 1680},
                {name: 'HEATX 500 ML', hsn: '3506', qty: '7 PCS', sgst: 160.17, cgst: 160.17, amount: 2100}, {name: 'ABRO PTFT 5MT', hsn: '3920', qty: '8 PCS', sgst: 90, cgst: 90, amount: 1680},
                {name: 'HEATX 500 ML', hsn: '3506', qty: '7 PCS', sgst: 160.17, cgst: 160.17, amount: 2100}, {name: 'ABRO PTFT 5MT', hsn: '3920', qty: '8 PCS', sgst: 90, cgst: 90, amount: 1680},
                {name: 'HEATX 500 ML', hsn: '3506', qty: '7 PCS', sgst: 160.17, cgst: 160.17, amount: 2100}, {name: 'ABRO PTFT 5MT', hsn: '3920', qty: '8 PCS', sgst: 90, cgst: 90, amount: 1680},
                {name: 'HEATX 500 ML', hsn: '3506', qty: '7 PCS', sgst: 160.17, cgst: 160.17, amount: 2100}, {name: 'ABRO PTFT 5MT', hsn: '3920', qty: '8 PCS', sgst: 90, cgst: 90, amount: 1680},
                {name: 'HEATX 500 ML', hsn: '3506', qty: '7 PCS', sgst: 160.17, cgst: 160.17, amount: 2100}, {name: 'ABRO PTFT 5MT', hsn: '3920', qty: '8 PCS', sgst: 90, cgst: 90, amount: 1680},
                {name: 'HEATX 500 ML', hsn: '3506', qty: '7 PCS', sgst: 160.17, cgst: 160.17, amount: 2100}, {name: 'ABRO PTFT 5MT', hsn: '3920', qty: '8 PCS', sgst: 90, cgst: 90, amount: 1680},
                {name: 'HEATX 500 ML', hsn: '3506', qty: '7 PCS', sgst: 160.17, cgst: 160.17, amount: 2100}, {name: 'ABRO PTFT 5MT', hsn: '3920', qty: '8 PCS', sgst: 90, cgst: 90, amount: 1680},
                {name: 'HEATX 500 ML', hsn: '3506', qty: '7 PCS', sgst: 160.17, cgst: 160.17, amount: 2100}, {name: 'ABRO PTFT 5MT', hsn: '3920', qty: '8 PCS', sgst: 90, cgst: 90, amount: 1680},
                {name: 'HEATX 500 ML', hsn: '3506', qty: '7 PCS', sgst: 160.17, cgst: 160.17, amount: 2100}, {name: 'ABRO PTFT 5MT', hsn: '3920', qty: '8 PCS', sgst: 90, cgst: 90, amount: 1680},
                {name: 'HEATX 500 ML', hsn: '3506', qty: '7 PCS', sgst: 160.17, cgst: 160.17, amount: 2100}, {name: 'ABRO PTFT 5MT', hsn: '3920', qty: '8 PCS', sgst: 90, cgst: 90, amount: 1680},
                {name: 'HEATX 500 ML', hsn: '3506', qty: '7 PCS', sgst: 160.17, cgst: 160.17, amount: 2100}, {name: 'ABRO PTFT 5MT', hsn: '3920', qty: '8 PCS', sgst: 90, cgst: 90, amount: 1680},
                {name: 'HEATX 500 ML', hsn: '3506', qty: '7 PCS', sgst: 160.17, cgst: 160.17, amount: 2100}, {name: 'ABRO PTFT 5MT', hsn: '3920', qty: '8 PCS', sgst: 90, cgst: 90, amount: 1680},
                {name: 'HEATX 500 ML', hsn: '3506', qty: '7 PCS', sgst: 160.17, cgst: 160.17, amount: 2100}, {name: 'ABRO PTFT 5MT', hsn: '3920', qty: '8 PCS', sgst: 90, cgst: 90, amount: 1680},
                {name: 'HEATX 500 ML', hsn: '3506', qty: '7 PCS', sgst: 160.17, cgst: 160.17, amount: 2100}, {name: 'ABRO PTFT 5MT', hsn: '3920', qty: '8 PCS', sgst: 90, cgst: 90, amount: 1680},
                {name: 'HEATX 500 ML', hsn: '3506', qty: '7 PCS', sgst: 160.17, cgst: 160.17, amount: 2100}, {name: 'ABRO PTFT 5MT', hsn: '3920', qty: '8 PCS', sgst: 90, cgst: 90, amount: 1680},
                {name: 'HEATX 500 ML', hsn: '3506', qty: '7 PCS', sgst: 160.17, cgst: 160.17, amount: 2100}, {name: 'ABRO PTFT 5MT', hsn: '3920', qty: '8 PCS', sgst: 90, cgst: 90, amount: 1680},
                {name: 'HEATX 500 ML', hsn: '3506', qty: '7 PCS', sgst: 160.17, cgst: 160.17, amount: 2100}, {name: 'ABRO PTFT 5MT', hsn: '3920', qty: '8 PCS', sgst: 90, cgst: 90, amount: 1680},
                {name: 'HEATX 500 ML', hsn: '3506', qty: '7 PCS', sgst: 160.17, cgst: 160.17, amount: 2100}, {name: 'ABRO PTFT 5MT', hsn: '3920', qty: '8 PCS', sgst: 90, cgst: 90, amount: 1680},
                {name: 'HEATX 500 ML', hsn: '3506', qty: '7 PCS', sgst: 160.17, cgst: 160.17, amount: 2100}, {name: 'ABRO PTFT 5MT', hsn: '3920', qty: '8 PCS', sgst: 90, cgst: 90, amount: 1680},
                {name: 'HEATX 500 ML', hsn: '3506', qty: '7 PCS', sgst: 160.17, cgst: 160.17, amount: 2100}, {name: 'ABRO PTFT 5MT', hsn: '3920', qty: '8 PCS', sgst: 90, cgst: 90, amount: 1680},
                {name: 'HEATX 500 ML', hsn: '3506', qty: '7 PCS', sgst: 160.17, cgst: 160.17, amount: 2100}, {name: 'ABRO PTFT 5MT', hsn: '3920', qty: '8 PCS', sgst: 90, cgst: 90, amount: 1680},
                {name: 'HEATX 500 ML', hsn: '3506', qty: '7 PCS', sgst: 160.17, cgst: 160.17, amount: 2100}, {name: 'ABRO PTFT 5MT', hsn: '3920', qty: '8 PCS', sgst: 90, cgst: 90, amount: 1680},
                {name: 'HEATX 500 ML', hsn: '3506', qty: '7 PCS', sgst: 160.17, cgst: 160.17, amount: 2100}, {name: 'ABRO PTFT 5MT', hsn: '3920', qty: '8 PCS', sgst: 90, cgst: 90, amount: 1680},
                {name: 'HEATX 500 ML', hsn: '3506', qty: '7 PCS', sgst: 160.17, cgst: 160.17, amount: 2100}, {name: 'ABRO PTFT 5MT', hsn: '3920', qty: '8 PCS', sgst: 90, cgst: 90, amount: 1680},
                {name: 'HEATX 500 ML', hsn: '3506', qty: '7 PCS', sgst: 160.17, cgst: 160.17, amount: 2100}, {name: 'ABRO PTFT 5MT', hsn: '3920', qty: '8 PCS', sgst: 90, cgst: 90, amount: 1680},
                {name: 'HEATX 500 ML', hsn: '3506', qty: '7 PCS', sgst: 160.17, cgst: 160.17, amount: 2100}, {name: 'ABRO PTFT 5MT', hsn: '3920', qty: '8 PCS', sgst: 90, cgst: 90, amount: 1680},
                {name: 'HEATX 500 ML', hsn: '3506', qty: '7 PCS', sgst: 160.17, cgst: 160.17, amount: 2100}, {name: 'ABRO PTFT 5MT', hsn: '3920', qty: '8 PCS', sgst: 90, cgst: 90, amount: 1680},
                {name: 'HEATX 500 ML', hsn: '3506', qty: '7 PCS', sgst: 160.17, cgst: 160.17, amount: 2100}, {name: 'ABRO PTFT 5MT', hsn: '3920', qty: '8 PCS', sgst: 90, cgst: 90, amount: 1680},
                {name: 'HEATX 500 ML', hsn: '3506', qty: '7 PCS', sgst: 160.17, cgst: 160.17, amount: 2100}, {name: 'ABRO PTFT 5MT', hsn: '3920', qty: '8 PCS', sgst: 90, cgst: 90, amount: 1680},
                {name: 'HEATX 500 ML', hsn: '3506', qty: '7 PCS', sgst: 160.17, cgst: 160.17, amount: 2100}, {name: 'ABRO PTFT 5MT', hsn: '3920', qty: '8 PCS', sgst: 90, cgst: 90, amount: 1680},
                {name: 'HEATX 500 ML', hsn: '3506', qty: '7 PCS', sgst: 160.17, cgst: 160.17, amount: 2100}, {name: 'ABRO PTFT 5MT', hsn: '3920', qty: '8 PCS', sgst: 90, cgst: 90, amount: 1680},
                {name: 'HEATX 500 ML', hsn: '3506', qty: '7 PCS', sgst: 160.17, cgst: 160.17, amount: 2100}, {name: 'ABRO PTFT 5MT', hsn: '3920', qty: '8 PCS', sgst: 90, cgst: 90, amount: 1680},
                {name: 'HEATX 500 ML', hsn: '3506', qty: '7 PCS', sgst: 160.17, cgst: 160.17, amount: 2100}, {name: 'ABRO PTFT 5MT', hsn: '3920', qty: '8 PCS', sgst: 90, cgst: 90, amount: 1680},
                {name: 'HEATX 500 ML', hsn: '3506', qty: '7 PCS', sgst: 160.17, cgst: 160.17, amount: 2100}, {name: 'ABRO PTFT 5MT', hsn: '3920', qty: '8 PCS', sgst: 90, cgst: 90, amount: 1680},
                {name: 'HEATX 500 ML', hsn: '3506', qty: '7 PCS', sgst: 160.17, cgst: 160.17, amount: 2100}, {name: 'ABRO PTFT 5MT', hsn: '3920', qty: '8 PCS', sgst: 90, cgst: 90, amount: 1680},
                {name: 'HEATX 500 ML', hsn: '3506', qty: '7 PCS', sgst: 160.17, cgst: 160.17, amount: 2100}, {name: 'ABRO PTFT 5MT', hsn: '3920', qty: '8 PCS', sgst: 90, cgst: 90, amount: 1680},
                {name: 'HEATX 500 ML', hsn: '3506', qty: '7 PCS', sgst: 160.17, cgst: 160.17, amount: 2100}, {name: 'ABRO PTFT 5MT', hsn: '3920', qty: '8 PCS', sgst: 90, cgst: 90, amount: 1680},
                {name: 'HEATX 500 ML', hsn: '3506', qty: '7 PCS', sgst: 160.17, cgst: 160.17, amount: 2100}, {name: 'ABRO PTFT 5MT', hsn: '3920', qty: '8 PCS', sgst: 90, cgst: 90, amount: 1680},
                {name: 'HEATX 500 ML', hsn: '3506', qty: '7 PCS', sgst: 160.17, cgst: 160.17, amount: 2100}, {name: 'ABRO PTFT 5MT', hsn: '3920', qty: '8 PCS', sgst: 90, cgst: 90, amount: 1680},
                {name: 'HEATX 500 ML', hsn: '3506', qty: '7 PCS', sgst: 160.17, cgst: 160.17, amount: 2100}, {name: 'ABRO PTFT 5MT', hsn: '3920', qty: '8 PCS', sgst: 90, cgst: 90, amount: 1680},
                {name: 'HEATX 500 ML', hsn: '3506', qty: '7 PCS', sgst: 160.17, cgst: 160.17, amount: 2100},
            ],
            totalQty: 15,
            totalSgst: 250.17,
            totalCgst: 250.17,
            totalAmount: 3780,
            bankDetails: {
                name: 'Rohit Prasad',
                ifsc: 'HDFC0000036',
                accountNo: '634546646464',
                bank: 'HDFC Bank, INDORE MAIN - MADHYA PRADESH',
            },
            upiId: '5345535555@ybl',
            terms: [
                'Goods once sold will not be taken back or exchanged',
                'All disputes are subject to [ENTER_YOUR_CITY_NAME] jurisdiction only',
            ],
        };
        const splitTableData = (items, itemsPerPage) => {
            const pages = [];
            for (let i = 0; i < items.length; i += itemsPerPage) {
                pages.push(items.slice(i, i + itemsPerPage));
            }
            return pages;
        };

        const itemsPerPage = 8; // Adjust based on your content and page size
        const tablePages = splitTableData(invoiceData.items, itemsPerPage);

        return (
            <div ref={ref}>
                {tablePages.map((pageItems, pageIndex) => (
                    <Box p={2} m={2} component={Paper} className={`sheet A4`} key={pageIndex}>
                        <Paper sx={{padding: 2}}>
                            <Grid container spacing={2}>
                                <Grid item xs={12}>
                                    <Typography variant="h6" align="center">TAX INVOICE</Typography>
                                    <Typography variant="caption" align="center">ORIGINAL FOR RECIPIENT</Typography>
                                </Grid>
                                <Grid item xs={12}>
                                    <Box display="flex" justifyContent="space-between">
                                        <Box>
                                            <Typography variant="h6">{invoiceData.storeName}</Typography>
                                            <Typography variant="body2">{invoiceData.address}</Typography>
                                            <Typography variant="body2">GSTIN: {invoiceData.gstin}</Typography>
                                            <Typography variant="body2">Mobile: {invoiceData.mobile}</Typography>
                                            <Typography variant="body2">PAN: {invoiceData.pan}</Typography>
                                            <Typography variant="body2">Email: {invoiceData.email}</Typography>
                                        </Box>
                                        <Box>
                                            <Typography variant="body2">Invoice No.: {invoiceData.invoiceNo}</Typography>
                                            <Typography variant="body2">Invoice Date: {invoiceData.invoiceDate}</Typography>
                                            <Typography variant="body2">Due Date: {invoiceData.dueDate}</Typography>
                                            <Typography variant="body2">Challan No.: {invoiceData.challanNo}</Typography>
                                            <Typography variant="body2">P.O. No.: {invoiceData.poNo}</Typography>
                                            <Typography variant="body2">E-way Bill
                                                No.: {invoiceData.ewayBillNo}</Typography>
                                            <Typography variant="body2">Vehicle No.: {invoiceData.vehicleNo}</Typography>
                                        </Box>
                                    </Box>
                                </Grid>
                                <Grid item xs={12}>
                                    <Box display="flex" justifyContent="space-between">
                                        <Box>
                                            <Typography variant="body2">BILL TO</Typography>
                                            <Typography variant="body2">{invoiceData.billTo}</Typography>
                                            <Typography variant="body2">Mobile: {invoiceData.mobile}</Typography>
                                        </Box>
                                        <Box>
                                            <Typography variant="body2">SHIP TO</Typography>
                                            <Typography variant="body2">{invoiceData.shipTo}</Typography>
                                        </Box>
                                    </Box>
                                </Grid>
                                <Grid item xs={12}>
                                    <TableContainer component={Paper}>
                                        <Table>
                                            <TableHead>
                                                <TableRow>
                                                    <TableCell>S.NO.</TableCell>
                                                    <TableCell>ITEMS</TableCell>
                                                    <TableCell>HSN</TableCell>
                                                    <TableCell>QTY.</TableCell>
                                                    <TableCell>SGST</TableCell>
                                                    <TableCell>CGST</TableCell>
                                                    <TableCell>AMOUNT</TableCell>
                                                </TableRow>
                                            </TableHead>
                                            <TableBody>
                                                {pageItems.map((item, index) => (
                                                    <TableRow key={index}>
                                                        <TableCell>{index + 1 + pageIndex * itemsPerPage}</TableCell>
                                                        <TableCell>{item.name}</TableCell>
                                                        <TableCell>{item.hsn}</TableCell>
                                                        <TableCell>{item.qty}</TableCell>
                                                        <TableCell>{item.sgst}</TableCell>
                                                        <TableCell>{item.cgst}</TableCell>
                                                        <TableCell>{item.amount}</TableCell>
                                                    </TableRow>
                                                ))}
                                            </TableBody>
                                        </Table>
                                    </TableContainer>
                                </Grid>
                                <Grid item xs={12}>
                                    <Box display="flex" justifyContent="space-between">
                                        <Box>
                                            <Typography variant="body2">Received Amount: ₹ 0</Typography>
                                            <Typography variant="body2">Previous Balance: ₹ 0</Typography>
                                            <Typography variant="body2">Current Balance:
                                                ₹ {invoiceData.totalAmount}</Typography>
                                        </Box>
                                        <Box>
                                            <Typography variant="body2">TOTAL</Typography>
                                            <Typography variant="body2">{invoiceData.totalQty}</Typography>
                                            <Typography variant="body2">₹ {invoiceData.totalSgst}</Typography>
                                            <Typography variant="body2">₹ {invoiceData.totalCgst}</Typography>
                                            <Typography variant="body2">₹ {invoiceData.totalAmount}</Typography>
                                        </Box>
                                    </Box>
                                </Grid>
                                <Grid item xs={12}>
                                    <Divider/>
                                </Grid>
                                <Grid item xs={12}>
                                    <Box display="flex" justifyContent="space-between">
                                        <Box>
                                            <Typography variant="body2">Bank Details:</Typography>
                                            <Typography variant="body2">Name: {invoiceData.bankDetails.name}</Typography>
                                            <Typography variant="body2">IFSC
                                                Code: {invoiceData.bankDetails.ifsc}</Typography>
                                            <Typography variant="body2">Account
                                                No.: {invoiceData.bankDetails.accountNo}</Typography>
                                            <Typography variant="body2">Bank: {invoiceData.bankDetails.bank}</Typography>
                                        </Box>
                                        <Box>
                                            <Typography variant="body2">Payment QR Code</Typography>
                                            <QRCodeGenerator value={invoiceData.upiId} size={100} />
                                            <Typography variant="body2">UPI ID: {invoiceData.upiId}</Typography>
                                        </Box>
                                        <Box>
                                            <Typography variant="body2">Terms and Conditions:</Typography>
                                            <ul>
                                                {invoiceData.terms.map((term, index) => (
                                                    <li key={index}>
                                                        <Typography variant="body2">{term}</Typography>
                                                    </li>
                                                ))}
                                            </ul>
                                        </Box>
                                    </Box>
                                </Grid>
                            </Grid>
                        </Paper>
                    </Box>
                ))}
            </div>
        )
    }
)

export default InvoiceSettingAndDisplay;
