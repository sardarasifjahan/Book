import React from 'react';
import { Button } from '@material-ui/core';
import { Document, Page, Text, View, StyleSheet, PDFDownloadLink, Image } from '@react-pdf/renderer';

// Define styles for the PDF
const styles = StyleSheet.create({
    page: {
        backgroundColor: '#ffffff',
        padding: 30,
    },
    section: {
        margin: 10,
        padding: 10,
    },
    header: {
        fontSize: 18,
        marginBottom: 20,
        textAlign: 'center',
        color: '#000000',
    },
    subheader: {
        fontSize: 14,
        marginBottom: 10,
        color: '#000000',
    },
    text: {
        fontSize: 12,
        color: '#000000',
    },
    table: {
        display: 'table',
        width: 'auto',
        borderStyle: 'solid',
        borderWidth: 1,
        borderColor: '#000000',
        borderRightWidth: 0,
        borderBottomWidth: 0,
    },
    tableRow: {
        flexDirection: 'row',
    },
    tableCol: {
        width: '25%',
        borderStyle: 'solid',
        borderWidth: 1,
        borderLeftWidth: 0,
        borderTopWidth: 0,
        borderColor: '#000000',
    },
    tableCell: {
        margin: 'auto',
        marginTop: 5,
        fontSize: 10,
        color: '#000000',
    },
    footer: {
        marginTop: 20,
        fontSize: 12,
        textAlign: 'center',
        color: '#000000',
    },
    logo: {
        width: 50,
        height: 50,
        marginBottom: 10,
    },
});

// Invoice component
const InvoicePDF = () => (
    <Document>
        <Page size="A4" style={styles.page}>
            <View style={styles.section}>
                <Image src="/path/to/logo.png" style={styles.logo} /> {/* Replace with the actual path to the logo */}
                <Text style={styles.header}>Tax Invoice</Text>
                <Text style={styles.subheader}>SAFA PHARMACY</Text>
                <Text style={styles.text}>Bilal abad kralpora</Text>
                <Text style={styles.text}>Phone: 6005571695</Text>
                <Text style={styles.text}>Email: MOHDADIL01061992@GMAIL.COM</Text>
                <Text style={styles.text}>State: 01-Jammu & Kashmir</Text>
            </View>

            <View style={styles.section}>
                <Text style={styles.subheader}>Bill To</Text>
                <Text style={styles.text}>waheed</Text>
                <Text style={styles.text}>wathoora chadoora</Text>
                <Text style={styles.text}>Contact No.: 7696517012</Text>
                <Text style={styles.text}>State: 01-Jammu & Kashmir</Text>
            </View>

            <View style={styles.section}>
                <Text style={styles.text}>Invoice No.: 4</Text>
                <Text style={styles.text}>Date: 25-06-2024</Text>
                <Text style={styles.text}>Place of supply: 01-Jammu & Kashmir</Text>
            </View>

            <View style={styles.section}>
                <View style={styles.table}>
                    <View style={styles.tableRow}>
                        <View style={styles.tableCol}><Text style={styles.tableCell}>Item name</Text></View>
                        <View style={styles.tableCol}><Text style={styles.tableCell}>Quantity</Text></View>
                        <View style={styles.tableCol}><Text style={styles.tableCell}>Price/Unit</Text></View>
                        <View style={styles.tableCol}><Text style={styles.tableCell}>Amount</Text></View>
                    </View>
                    <View style={styles.tableRow}>
                        <View style={styles.tableCol}><Text style={styles.tableCell}>Eleesa</Text></View>
                        <View style={styles.tableCol}><Text style={styles.tableCell}>1 Btl</Text></View>
                        <View style={styles.tableCol}><Text style={styles.tableCell}>₹ 90.00</Text></View>
                        <View style={styles.tableCol}><Text style={styles.tableCell}>₹ 81.00</Text></View>
                    </View>
                    <View style={styles.tableRow}>
                        <View style={styles.tableCol}><Text style={styles.tableCell}>freetum</Text></View>
                        <View style={styles.tableCol}><Text style={styles.tableCell}>1 Btl</Text></View>
                        <View style={styles.tableCol}><Text style={styles.tableCell}>₹ 160.00</Text></View>
                        <View style={styles.tableCol}><Text style={styles.tableCell}>₹ 144.00</Text></View>
                    </View>
                    <View style={styles.tableRow}>
                        <View style={styles.tableCol}><Text style={styles.tableCell}>Neuromol</Text></View>
                        <View style={styles.tableCol}><Text style={styles.tableCell}>1 Btl</Text></View>
                        <View style={styles.tableCol}><Text style={styles.tableCell}>₹ 60.00</Text></View>
                        <View style={styles.tableCol}><Text style={styles.tableCell}>₹ 60.00</Text></View>
                    </View>
                </View>
            </View>

            <View style={styles.section}>
                <Text style={styles.text}>Total: ₹ 285.00</Text>
                <Text style={styles.text}>You Saved: ₹ 25.00</Text>
                <Text style={styles.text}>Invoice Amount In Words: Two Hundred Eighty Five Rupees only</Text>
            </View>

            <View style={styles.footer}>
                <Text style={styles.subheader}>Terms and Conditions</Text>
                <Text style={styles.text}>Thanks for doing business with us!</Text>
            </View>
        </Page>
    </Document>
);

// Main component
const InvoiceGenerator = () => (
    <div>
        <PDFDownloadLink document={<InvoicePDF />} fileName="invoice.pdf">
            {({ blob, url, loading, error }) => (
                <Button variant="contained" color="primary" disabled={loading}>
                    {loading ? 'Loading document...' : 'Download Invoice PDF'
                    }
                </Button>
            )}
        </PDFDownloadLink>
    </div>
);

export default InvoiceGenerator;
