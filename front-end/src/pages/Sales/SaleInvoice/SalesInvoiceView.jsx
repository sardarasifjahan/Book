import {
    Box,
    Button,
    ButtonGroup,
    IconButton,
    MenuItem,
    TableCell,
    TextField,
    Tooltip,
    Typography,
} from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";
import ContentCopyRoundedIcon from "@mui/icons-material/ContentCopyRounded";
import EditIcon from "@mui/icons-material/Edit";
import {useTheme} from "@mui/material/styles";
import Modal from "@mui/joy/Modal";
import ModalClose from "@mui/joy/ModalClose";
import {Transition} from "react-transition-group";
import Grid from "@mui/material/Grid";
import UserRole from "../../../jsonfile/Role.json";
import Paper from "@mui/material/Paper";
import React, {useEffect, useRef, useState} from "react";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import {LocalizationProvider} from "@mui/x-date-pickers/LocalizationProvider";
import {AdapterDayjs} from "@mui/x-date-pickers/AdapterDayjs";
import {DatePicker} from "@mui/x-date-pickers/DatePicker";
import {getDate, StyledTableCellTableView, StyledTableRow} from "../../../commonStyle";
import axios from "axios";
import dayjs from "dayjs";
import {numberToWords} from "number-to-words";
import {useDispatch, useSelector} from "react-redux";
import {DemoContainer} from "@mui/x-date-pickers/internals/demo";
import {removeSalePurchase} from "../../../redux/Action";
import {SaleInvoiceEdit} from "./SaleInvoiceEdit";
import {useReactToPrint} from "react-to-print";

const SalesInvoiceView = ({onBooleanChange, idFlagView}) => {
    const [editFlag, setEditFlag] = useState(true);

    const [paymentDate, setPaymentDate] = React.useState(dayjs(getDate()));
    const [paymentAmount, setPaymentAmount] = useState("");
    const [paymentType, setPaymentType] = useState("");
    const [note, setNote] = useState("");

    const [openPaymentRecord, setOpenPaymentRecord] = React.useState(false);
    const [filteredEmployees, setFilteredEmployees] = useState([]);
    const [selectedOption, setSelectedOption] = useState("");
    const [filterSalePurchase, setFilterSalePurchase] = useState([]);
    const [tableQty, setTableQty] = useState("");
    const [tableAmount, setTableAmount] = useState("");
    const [tableTax, setTableTax] = useState("");

    const loginData = useSelector((state) => state.loginReducerValue);
    const {salePurchaseUser} = useSelector(
        (state) => state.salePurchaseReducerValue
    );
    const [primaryBusiness, setPrimaryBusiness] = useState('');
    const {businessUser} = useSelector((state) => state.manageBusinessReducerValue);
    const dispatch = useDispatch();
    const editFlagValue = () => {
        setEditFlag((prevState) => !prevState);
    };
    const handleChange = (event) => {
        setSelectedOption(event.target.value);
        handleMenuItemClick(event.target.value);
    };
    const theme = useTheme();
    const handleMenuItemClick = (action) => {
        console.log(action);
        // Add your logic for handling the selected option here
    };
    const handleMainView = () => {
        onBooleanChange();
    };
    const componentRef = useRef();
    const handlePrint = useReactToPrint({
        content: () => componentRef.current,
    });
    const formatDate = (dateString) => {
        if (!dateString) return "";  // Handle null or undefined cases

        try {
            const date = new Date(dateString);
            if (isNaN(date.getTime())) {
                throw new Error("Invalid Date");  // Handle invalid date strings
            }
            return date.toISOString().split('T')[0];
        } catch (error) {
            console.error("Error formatting date:", error.message);
            return "";  // Return empty string or handle error as needed
        }
    };
    useEffect(() => {
        if (!idFlagView) {
            return;
        }
        const filteredData = salePurchaseUser.filter((employee) => {
            return employee.id === idFlagView;
        });
        if (filteredData.length === 0) {
            return;
        }
        const jsonArray = JSON.parse(filteredData[0].items);
        setFilterSalePurchase(filteredData[0]);
        setFilteredEmployees(jsonArray);
        const quantityTable = jsonArray.reduce((total, item) => {
            const quantity = parseFloat(item.quantity);
            return isNaN(quantity) ? total : total + quantity;
        }, 0);
        setTableQty(quantityTable);
        const amountTable = jsonArray.reduce((total, item) => {
            const amount = parseFloat(item.total);
            return isNaN(amount) ? total : total + amount;
        }, 0);

        setTableAmount(amountTable);
        const taxTable = jsonArray.reduce((total, item) => {
            const gst = parseFloat(item.gst);
            const amount = parseFloat(item.total);
            if (!isNaN(gst) && !isNaN(amount)) {
                return total + (gst * amount) / 100;
            } else {
                return total;
            }
        }, 0);
        setTableTax(taxTable);


        // Assuming setPrimaryBusiness is a function to set some state or perform an action
        const filteredBusiness = businessUser.filter(item => item.primaryWithBusiness === 'Y');
        console.log("Fileter", filteredBusiness)
        if (filteredBusiness.length > 0) {
            setPrimaryBusiness(filteredBusiness[0]);
        } else {
            // Handle case where no businessUser with primaryWithBusine=Y is found
            // You may set default behavior or handle accordingly
        }
    }, [idFlagView, salePurchaseUser]);
    const style = {
        position: "absolute",
        top: "50%",
        left: "50%",
        transform: "translate(-50%, -50%)",
        width: 700,
        bgcolor: "background.paper",
        border: "2px solid #000",
        boxShadow: 24,
        p: 1,
    };

    const handleSubmitForPayment = (e) => {
        e.prevetDefault();
    };
    const handleDelete = async (event) => {
        event.preventDefault();
        const response = await axios.post(
            `http://api.hesabbook.in/hesabbook/sale/purchase/delete/${filterSalePurchase.id}`
        );
        dispatch(removeSalePurchase(filterSalePurchase.id));
        console.log("Submit Response :--    ", response.data);
        handleMainView();
        //  TODO handle to remove data from Redux
    };

    return (
        <>
            {editFlag ? (
                <Box>
                    <Box>
                        <Button variant="contained" onClick={handleMainView}
                                sx={{marginLeft: "10px", width: "150px", marginBottom: "10px"}}>
                            Sales Invoice
                        </Button>
                        <Box sx={{right: "0", float: "right", marginRight: "10px"}}>
                            <ButtonGroup variant="contained" aria-label="Basic button group">
                                <Tooltip title="Duplicate this invoice">
                                    <IconButton aria-label="edit">
                                        <ContentCopyRoundedIcon/>
                                    </IconButton>
                                </Tooltip>
                                <Tooltip title="Edit">
                                    <IconButton aria-label="edit" onClick={editFlagValue}>
                                        <EditIcon/>
                                    </IconButton>{" "}
                                </Tooltip>
                                <Tooltip title="Delete">
                                    <IconButton aria-label="edit" onClick={handleDelete}>
                                        <DeleteIcon/>
                                    </IconButton>
                                </Tooltip>
                            </ButtonGroup>
                        </Box>
                    </Box>
                    <Box sx={{display: "flex"}}>
                        <TextField
                            select
                            sx={{margin: "10px", width: "150px"}}
                            label="Download PDF"
                            variant="outlined"
                            margin="normal"
                            // value={billTo.pname}
                            //  onChange={(event) => handleBilltoSHipToo(event)}
                        >
                            {UserRole.downloadOption.map((indi) => (
                                <MenuItem key={indi.name} value={indi.name}>
                                    {indi.name}
                                </MenuItem>
                            ))}
                        </TextField>

                        <Button variant="outlined"
                                sx={{margin: "10px", width: "150px", height: "55px"}} color="primary"
                                onClick={handlePrint}>
                            Print PDF
                        </Button>

                        <TextField
                            select
                            sx={{margin: "10px", width: "150px"}}
                            label="Share"
                            variant="outlined"
                            margin="normal"
                            // value={billTo.pname}
                            //  onChange={(event) => handleBilltoSHipToo(event)}
                        >
                            {UserRole.shareType.map((indi) => (
                                <MenuItem key={indi.name} value={indi.name}>
                                    {indi.name}
                                </MenuItem>
                            ))}
                        </TextField>

                        <Box sx={{right: "0", float: "right"}}>
                            <Button
                                variant="outlined"
                                sx={{margin: "10px", width: "150px", height: "55px"}}
                                onClick={() => setOpenPaymentRecord(true)}
                            >
                                Record Payment In
                            </Button>
                        </Box>
                        <Transition in={openPaymentRecord} timeout={400}>
                            <Modal
                                open={openPaymentRecord}
                                onClose={() => setOpenPaymentRecord(false)}
                                aria-labelledby="modal-modal-title"
                                aria-describedby="modal-modal-description"
                                sx={{
                                    display: "flex",
                                    justifyContent: "center",
                                    alignItems: "center",
                                }}
                            >
                                <Box sx={style}>
                                    <Box
                                        sx={{
                                            marginTop: 8,
                                            display: "flex",
                                            flexDirection: "column",
                                            alignItems: "center",
                                        }}
                                    >
                                        <ModalClose variant="plain" sx={{m: 1}}/>
                                        <Typography component="h1" variant="h5">
                                            Record Payment For this invoice
                                        </Typography>
                                        <Box
                                            component="form"
                                            onSubmit={handleSubmitForPayment}
                                            noValidate
                                            sx={{mt: 1}}
                                        >
                                            <Box sx={{display: "flex"}}>
                                                <Box sx={{width: "50%", margin: "10px"}}>
                                                    <TextField
                                                        label="Payment Type"
                                                        value={paymentType}
                                                        onChange={(e) => setPaymentType(e.target.value)}
                                                        autoFocus
                                                    >
                                                        {UserRole.taxType.map((userrole) => (
                                                            <MenuItem
                                                                key={userrole.name}
                                                                value={userrole.name}
                                                            >
                                                                {userrole.name}
                                                            </MenuItem>
                                                        ))}
                                                    </TextField>
                                                </Box>
                                                <Box sx={{width: "50%", margin: "10px"}}>
                                                    <TextField
                                                        label="Note"
                                                        value={note}
                                                        onChange={(event) =>
                                                            setPaymentAmount(event.target.value)
                                                        }
                                                    />
                                                </Box>
                                            </Box>
                                            <Box sx={{display: "flex"}}>
                                                <Box sx={{width: "50%", margin: "10px"}}>
                                                    <TextField
                                                        label="Enter Payment Amount"
                                                        value={paymentAmount}
                                                        onChange={(event) =>
                                                            setPaymentAmount(event.target.value)
                                                        }
                                                    />
                                                </Box>
                                                <Box sx={{width: "50%", margin: "10px"}}>
                                                    <LocalizationProvider dateAdapter={AdapterDayjs}>
                                                        <DemoContainer
                                                            components={["DatePicker", "DatePicker"]}
                                                        >
                                                            <DatePicker
                                                                label="Payment Date:"
                                                                value={paymentDate}
                                                                onChange={(newValue) =>
                                                                    setPaymentDate(newValue)
                                                                }
                                                            />
                                                        </DemoContainer>
                                                    </LocalizationProvider>
                                                </Box>
                                            </Box>
                                            <Box></Box>
                                            <Button
                                                type="submit"
                                                fullWidth
                                                variant="contained"
                                                onClick={handleSubmitForPayment}
                                                sx={{
                                                    mt: 3,
                                                    mb: 2,
                                                    color: "whitesmoke",
                                                    background: "#212121",
                                                }}
                                            >
                                                Submit
                                            </Button>
                                        </Box>
                                    </Box>
                                </Box>
                            </Modal>
                        </Transition>
                    </Box>
                    <Box sx={{
                        padding: 1,
                        borderRadius: 1,
                        border: '1px solid black'
                    }} ref={componentRef}
                    >
                        <Grid container>
                            <Grid item xs={12}>
                                <Box
                                    sx={{
                                        backgroundColor:
                                            theme.palette.mode === "dark" ? "#1A2027" : "#fff",
                                        padding: theme.spacing(1),
                                    }}
                                >
                                    <Box
                                        sx={{
                                            display: 'flex',
                                            justifyContent: 'center',
                                            alignItems: 'center',
                                        }}
                                    >
                                        <Typography variant="h4">GST INVOICE</Typography>
                                    </Box>
                                    <Box>
                                        <Box>
                                            <Box sx={{display: "flex", margin: "5px"}}>
                                                <Box sx={{width: "50%", border: '5px solid #1976D2'}}>
                                                    <Box sx={{margin: "5px"}}>
                                                        <Box sx={{color: "#000000",  display: 'flex',
                                                            justifyContent: 'center',
                                                            alignItems: 'center',}}>
                                                            <Typography
                                                                style={{fontSize: '14px'}}>{primaryBusiness.businessName}</Typography>
                                                        </Box>
                                                        <Box sx={{color: "#000000",  display: 'flex',
                                                            justifyContent: 'center',
                                                            alignItems: 'center'}}>
                                                            {primaryBusiness.billingAddress && (
                                                                <Typography style={{fontSize: '14px'}}>
                                                                    {primaryBusiness.billingAddress}
                                                                    {primaryBusiness.city && `, ${primaryBusiness.city}`}
                                                                    {primaryBusiness.district && `, ${primaryBusiness.district}`}
                                                                    {primaryBusiness.state && `, ${primaryBusiness.state}`}
                                                                    {primaryBusiness.pinCode && `, ${primaryBusiness.pinCode}`}
                                                                </Typography>
                                                            )}
                                                        </Box>
                                                        <Box sx={{color: "#000000", display: "flex"}}>
                                                            <Typography style={{fontSize: '14px'}}>Mobile :</Typography>
                                                            <Typography
                                                                style={{fontSize: '14px'}}> {primaryBusiness.phoneNumber}</Typography>
                                                        </Box>
                                                        <Box sx={{color: "#000000", display: "flex"}}>
                                                            <Typography style={{fontSize: '14px'}}> GST :</Typography>
                                                            <Typography
                                                                style={{fontSize: '14px'}}>{filterSalePurchase.gstNumber}</Typography>
                                                        </Box>
                                                        <Box sx={{color: "#000000", display: "flex"}}>
                                                            <Typography style={{fontSize: '14px'}}>Email :</Typography>
                                                            <Typography
                                                                style={{fontSize: '14px'}}>{filterSalePurchase.email}</Typography>
                                                        </Box>
                                                    </Box>
                                                </Box>
                                                <Box sx={{width: "50%", border: '1px solid black'}}>
                                                    <Box sx={{margin: "5px"}}>
                                                        <Box sx={{color: "#000000", display: "flex"}}>
                                                            <Typography
                                                                style={{fontSize: '14px'}}>  {filterSalePurchase.partyName}</Typography>
                                                        </Box>
                                                        <Box sx={{color: "#000000", display: "flex"}}>
                                                            <Typography style={{fontSize: '14px'}}>Bill To
                                                                :</Typography>
                                                            <Typography
                                                                style={{fontSize: '14px'}}>  {filterSalePurchase.partyBillingAddress}</Typography>
                                                        </Box>
                                                        <Box sx={{color: "#000000", display: "flex"}}>
                                                            <Typography style={{fontSize: '14px'}}>Ship To
                                                                :</Typography>
                                                            <Typography
                                                                style={{fontSize: '14px'}}>  {filterSalePurchase.partyShippingAddress}</Typography>
                                                        </Box>

                                                        <Box sx={{color: "#000000", display: "flex"}}>
                                                            <Typography style={{fontSize: '14px'}}>Mobile :</Typography>
                                                            <Typography
                                                                style={{fontSize: '14px'}}>{filterSalePurchase.partyPhone}</Typography>
                                                        </Box>
                                                        <Box sx={{color: "#000000", display: "flex"}}>
                                                            <Typography style={{fontSize: '14px'}}>GST :</Typography>
                                                            <Typography
                                                                style={{fontSize: '14px'}}>{filterSalePurchase.partyGst}</Typography>
                                                        </Box>

                                                    </Box>
                                                </Box>
                                            </Box>
                                        </Box>
                                        <Box sx={{margin: "5px"}}>
                                            <Box sx={{display: "flex"}}>
                                                <Box sx={{width: "50%", border: '1px solid black'}}>
                                                    <Box sx={{margin: "5px"}}>
                                                        <Box sx={{color: "#000000", display: "flex"}}>
                                                            <Typography style={{fontSize: '14px'}}>Cosmetice
                                                                Name</Typography>
                                                        </Box>
                                                        <Box sx={{color: "#000000", display: "flex"}}>
                                                            <Typography style={{fontSize: '14px'}}>Mobile :</Typography>
                                                            <Typography
                                                                style={{fontSize: '14px'}}>8340719781</Typography>
                                                        </Box>
                                                    </Box>
                                                </Box>
                                                <Box sx={{width: "50%", border: '1px solid black'}}>
                                                    <Box sx={{margin: "5px"}}>
                                                        <Box
                                                            sx={{
                                                                display: "flex",
                                                                justifyContent: "space-between",
                                                                margin: "2px",
                                                            }}
                                                        >
                                                            <Typography style={{fontSize: '14px'}}>BILL OF
                                                                SUPPLY</Typography>
                                                            <Typography>:</Typography>
                                                            <Typography style={{fontSize: '14px'}}
                                                                        sx={{
                                                                            border: "1px solid black",
                                                                            padding: "5px",
                                                                        }}
                                                            >
                                                                Original for Recipient
                                                            </Typography>
                                                        </Box>
                                                        <Box
                                                            sx={{
                                                                display: "flex",
                                                                justifyContent: "space-between",
                                                                margin: "2px",
                                                            }}
                                                        >
                                                            <Typography variant="h7" style={{fontSize: '14px'}}>Invoice
                                                                No.</Typography>
                                                            <Typography variant="body2" style={{fontSize: '14px'}}>
                                                                {filterSalePurchase.id}
                                                            </Typography>
                                                        </Box>
                                                        <Box
                                                            sx={{
                                                                display: "flex",
                                                                justifyContent: "space-between",
                                                                margin: "2px",
                                                            }}
                                                        >
                                                            <Typography variant="h7" style={{fontSize: '14px'}}>Invoice
                                                                Date</Typography>
                                                            <Typography variant="body2" style={{fontSize: '14px'}}>
                                                                {formatDate(filterSalePurchase.salesInvoiceDate)}
                                                            </Typography>
                                                        </Box>
                                                        <Box
                                                            sx={{
                                                                display: "flex",
                                                                justifyContent: "space-between",
                                                                margin: "2px",
                                                            }}
                                                        >
                                                            <Typography variant="h7" style={{fontSize: '14px'}}>Due
                                                                Date</Typography>
                                                            <Typography variant="body2" style={{fontSize: '14px'}}>
                                                                {formatDate(filterSalePurchase.salesDueDate)}
                                                            </Typography>
                                                        </Box>
                                                    </Box>
                                                </Box>
                                            </Box>
                                        </Box>
                                        <Box>
                                            <Box>
                                                <TableContainer
                                                    component={Paper}
                                                    sx={{maxHeight: 220, minHeight: 220}}
                                                >
                                                    <Table
                                                        sx={{minWidth: 130}}
                                                        aria-label="customized table"
                                                        stickyHeader
                                                    >
                                                        <TableHead>
                                                            <TableRow>
                                                                <StyledTableCellTableView
                                                                    align="center"
                                                                    width="2%"
                                                                > S.NO.
                                                                </StyledTableCellTableView>
                                                                <StyledTableCellTableView
                                                                    align="center"
                                                                    width="20%"
                                                                >ITEMS
                                                                </StyledTableCellTableView>
                                                                <StyledTableCellTableView
                                                                    align="center"
                                                                    width="20%"
                                                                >HSN
                                                                </StyledTableCellTableView>
                                                                <StyledTableCellTableView
                                                                    align="center"
                                                                    width="20%"
                                                                >BATCH
                                                                </StyledTableCellTableView>
                                                                <StyledTableCellTableView
                                                                    align="center"
                                                                    width="20%">EXP</StyledTableCellTableView>
                                                                <StyledTableCellTableView align="center"
                                                                                          width="20%">PACK</StyledTableCellTableView>
                                                                <StyledTableCellTableView
                                                                    align="center"
                                                                    width="20%"
                                                                >QTY
                                                                </StyledTableCellTableView>
                                                                <StyledTableCellTableView
                                                                    align="center"
                                                                    width="20%"
                                                                >
                                                                    MRP
                                                                </StyledTableCellTableView>
                                                                <StyledTableCellTableView
                                                                    align="center"
                                                                    width="20%"
                                                                >
                                                                    DIS
                                                                </StyledTableCellTableView>
                                                                <StyledTableCellTableView
                                                                    align="center"
                                                                    width="20%"
                                                                >
                                                                    RATE
                                                                </StyledTableCellTableView>
                                                                <StyledTableCellTableView
                                                                    align="center"
                                                                    width="20%"
                                                                >
                                                                    CGST
                                                                </StyledTableCellTableView>
                                                                <StyledTableCellTableView
                                                                    align="center"
                                                                    width="20%"
                                                                >
                                                                    SGST
                                                                </StyledTableCellTableView>
                                                                <StyledTableCellTableView
                                                                    align="center"
                                                                    width="20%"
                                                                >
                                                                    AMOUNT
                                                                </StyledTableCellTableView>
                                                            </TableRow>
                                                        </TableHead>
                                                        <TableBody>
                                                            {filteredEmployees.map((row) => (
                                                                <StyledTableRow key={row.id}>
                                                                    <TableCell align="center"
                                                                               style={{fontSize: '10px'}}>
                                                                        {row.id}
                                                                    </TableCell>
                                                                    <TableCell align="center"
                                                                               style={{fontSize: '10px'}}>
                                                                        {row.item}
                                                                    </TableCell>
                                                                    <TableCell align="center"
                                                                               style={{fontSize: '10px'}}>
                                                                        {row.hsn}
                                                                    </TableCell> <TableCell align="center"
                                                                                            style={{fontSize: '10px'}}>
                                                                    {row.batchNo}
                                                                </TableCell> <TableCell align="center"
                                                                                        style={{fontSize: '10px'}}>
                                                                    {row.expireDate}
                                                                </TableCell> <TableCell align="center"
                                                                                        style={{fontSize: '10px'}}>
                                                                    {row.packageItems}
                                                                </TableCell>
                                                                    <TableCell align="center"
                                                                               style={{fontSize: '10px'}}>
                                                                        {row.quantity}
                                                                    </TableCell>
                                                                    <TableCell align="center"
                                                                               style={{fontSize: '10px'}}>
                                                                        {row.mrp}
                                                                    </TableCell>
                                                                    <TableCell align="center"
                                                                               style={{fontSize: '10px'}}>
                                                                        {row.discount}
                                                                    </TableCell>
                                                                    <TableCell align="center"
                                                                               style={{fontSize: '10px'}}>
                                                                        {row.actualSalePrice}
                                                                    </TableCell>
                                                                    <TableCell align="center"
                                                                               style={{fontSize: '10px'}}>
                                                                        {row.gst > 0 ? row.gst / 2 : 'N/A'}
                                                                    </TableCell>
                                                                    <TableCell align="center"
                                                                               style={{fontSize: '10px'}}>
                                                                        {row.gst > 0 ? row.gst / 2 : 'N/A'}
                                                                    </TableCell>
                                                                    <TableCell align="center"
                                                                               style={{fontSize: '10px'}}>
                                                                        {row.total}
                                                                    </TableCell>
                                                                </StyledTableRow>
                                                            ))}
                                                        </TableBody>
                                                    </Table>
                                                </TableContainer>
                                                <TableContainer component={Paper}>
                                                    <Table aria-label="customized table" stickyHeader>
                                                        <TableHead>
                                                            <TableRow>
                                                                <StyledTableCellTableView
                                                                    align="center"
                                                                    width="10%"
                                                                >
                                                                    {"     "}
                                                                </StyledTableCellTableView>
                                                                <StyledTableCellTableView
                                                                    align="center"
                                                                    width="20%"
                                                                >
                                                                    SUB TOTAL
                                                                </StyledTableCellTableView>
                                                                <StyledTableCellTableView
                                                                    align="center"
                                                                    width="20%"
                                                                >
                                                                    {tableQty}
                                                                </StyledTableCellTableView>
                                                                <StyledTableCellTableView
                                                                    align="center"
                                                                    width="20%"
                                                                >
                                                                    {"    "}
                                                                </StyledTableCellTableView>
                                                                <StyledTableCellTableView
                                                                    align="center"
                                                                    width="20%"
                                                                >
                                                                    (₹) {parseFloat(tableTax).toFixed(2)}
                                                                </StyledTableCellTableView>
                                                                <StyledTableCellTableView
                                                                    align="center"
                                                                    width="20%"
                                                                >
                                                                    (₹){parseFloat(tableAmount).toFixed(2)}
                                                                </StyledTableCellTableView>
                                                            </TableRow>
                                                        </TableHead>
                                                    </Table>
                                                </TableContainer>
                                            </Box>
                                        </Box>
                                        <Box></Box>
                                        <Box display="flex">
                                            <Box
                                                sx={{
                                                    width: "50%",
                                                    margin: "5px",
                                                    alignItems: "center",
                                                }}
                                            >
                                                <Typography variant="h6">
                                                    TERMS AND CONDITIONS
                                                </Typography>
                                                <Box>
                                                    <Typography variant="body2">
                                                        {filterSalePurchase.addNote
                                                            ? filterSalePurchase.addNote
                                                            : "1. Goods once sold will not be taken back or exchanged"}
                                                    </Typography>{" "}
                                                    addTermsAndCondition
                                                    <Typography variant="body2">
                                                        {filterSalePurchase.addTermsAndCondition
                                                            ? filterSalePurchase.addTermsAndCondition
                                                            : "2. All disputes are subject to[ENTER_YOUR_CITY_NAME] jurisdiction only"}
                                                    </Typography>
                                                </Box>
                                            </Box>
                                            <Box sx={{width: "50%"}}>
                                                <Box
                                                    sx={{
                                                        display: "flex",
                                                        flexDirection: "column",
                                                        margin: "5px",
                                                    }}
                                                >
                                                    <Box
                                                        sx={{
                                                            display: "flex",
                                                            justifyContent: "space-between",
                                                            borderBottom: "1px solid black",
                                                            paddingBottom: "5px",
                                                            marginBottom: "5px",
                                                            margin: "2px",
                                                        }}
                                                    >
                                                        <Typography variant="body2">
                                                            TAXABLE AMOUNT
                                                        </Typography>
                                                        <Typography variant="body2">
                                                            ₹ {filterSalePurchase.totalAmount}
                                                        </Typography>
                                                    </Box>
                                                    <Box
                                                        sx={{
                                                            display: "flex",
                                                            justifyContent: "space-between",
                                                            borderBottom: "1px solid black",
                                                            paddingBottom: "5px",
                                                            marginBottom: "5px",
                                                            margin: "2px",
                                                        }}
                                                    >
                                                        <Typography variant="body2">
                                                            TOTAL AMOUNT
                                                        </Typography>
                                                        <Typography variant="body2">
                                                            ₹ {filterSalePurchase.totalAmount}
                                                        </Typography>
                                                    </Box>
                                                    <Box
                                                        sx={{
                                                            display: "flex",
                                                            justifyContent: "space-between",
                                                            borderBottom: "1px solid black",
                                                            paddingBottom: "5px",
                                                            marginBottom: "5px",
                                                            margin: "2px",
                                                        }}
                                                    >
                                                        <Typography variant="body2">
                                                            Received Amount
                                                        </Typography>
                                                        <Typography variant="body2">
                                                            ₹ {filterSalePurchase.amountReceived}
                                                        </Typography>
                                                    </Box>
                                                    <Box
                                                        sx={{
                                                            display: "flex",
                                                            justifyContent: "space-between",
                                                            textDecoration: "underline",
                                                            margin: "2px",
                                                        }}
                                                    >
                                                        <Typography variant="body2">
                                                            Balance Amount
                                                        </Typography>
                                                        <Typography variant="body2">
                                                            ₹ {filterSalePurchase.balanceAmount}
                                                        </Typography>
                                                    </Box>
                                                    <Box
                                                        sx={{
                                                            marginTop: "15px",
                                                            margin: "2px",
                                                            display: "inline-block",
                                                        }}
                                                    >
                                                        <Typography
                                                            variant="h6"
                                                            sx={{textDecoration: "underline"}}
                                                        >
                                                            Total Amount (in words)
                                                        </Typography>
                                                        <Typography
                                                            variant="body1"
                                                            sx={{
                                                                bottom: "calc(-1 * 0.2em)",
                                                            }}
                                                        >
                                                            {filterSalePurchase.totalAmount
                                                                ? numberToWords.toWords(
                                                                    filterSalePurchase.totalAmount
                                                                )
                                                                : "Not available"}
                                                        </Typography>
                                                    </Box>
                                                </Box>
                                            </Box>
                                        </Box>
                                    </Box>
                                </Box>
                            </Grid>
                        </Grid>
                    </Box>
                </Box>
            ) : (
                <>
                    <SaleInvoiceEdit
                        onBooleanChange={onBooleanChange}
                        idFlagView={idFlagView}
                        editFlag={editFlag}
                        filterSalePurchase={filterSalePurchase}
                    />
                </>
            )}
        </>
    );
};

export default SalesInvoiceView;
