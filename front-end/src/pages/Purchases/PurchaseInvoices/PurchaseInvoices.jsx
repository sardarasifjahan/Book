import {
    Avatar,
    Box,
    ButtonGroup,
    Card,
    CardContent,
    Checkbox,
    Grid,
    TableCell,
    TextField,
    Typography
} from "@mui/material";
import Table from "@mui/material/Table";
import {LocalMall, Paid} from '@mui/icons-material';
import TableBody from "@mui/material/TableBody";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import SearchIcon from "@mui/icons-material/Search";
import Button from "@mui/material/Button";
import * as React from "react";
import {useEffect, useState} from "react";
import {
    formatDate,
    Search,
    SearchIconWrapper,
    StyledInputBase,
    StyledTableCell,
    StyledTableRow,
} from "../../../commonStyle";
import ArticleIcon from "@mui/icons-material/Article";
import IconButton from "@mui/material/IconButton";
import axios from "axios";
import {PurchaseInvoicesCreate} from "./PurchaseInvoicesCreate";
import {DemoContainer} from "@mui/x-date-pickers/internals/demo";
import {LocalizationProvider} from "@mui/x-date-pickers/LocalizationProvider";
import {AdapterDayjs} from "@mui/x-date-pickers/AdapterDayjs";
import {DatePicker} from "@mui/x-date-pickers/DatePicker";
import {useDispatch, useSelector} from "react-redux";
import {addSalePurchase} from "../../../redux/Action";
import PurchaseInvoicesView from "./PurchaseInvoicesView";

export const PurchaseInvoices = () => {
    const loginData = useSelector((state) => state.loginReducerValue);
    const {salePurchaseUser} = useSelector(
        (state) => state.salePurchaseReducerValue
    );
    const dispatch = useDispatch();
    const [startDate, setStartDate] = useState(null);
    const [endDate, setEndDate] = useState(null);

    const handleStartDateChange = (newStartDate) => {
        setStartDate(newStartDate);
    };

    const handleEndDateChange = (newEndDate) => {
        setEndDate(newEndDate);
    };
    const [selectedRows, setSelectedRows] = useState([]);
    const [filterSalePurchase, setFilterSalePurchase] = useState([]);
    const [filter, setFilter] = useState("");
    const [flag, setFlag] = useState(false);
    const [flagView, setFlagView] = useState(false);
    const [idFlagView, setIdFlagView] = useState('');
    const handleBooleanChange = () => {
        setFlag((prevState) => !prevState);
    };
    const handleBooleanChangeView = (id) => {
        setFlagView((prevState) => !prevState);
        setIdFlagView(id);
    };

    const handleFilterChange = (event) => {
        setFilter(event.target.value);
    };

    useEffect(() => {
        if (Array.isArray(salePurchaseUser)) {
            let filteredData = salePurchaseUser;

            // Filter for billType 'SALE_INVOICE'
            filteredData = filteredData.filter((employee) => employee.billType === 'PURCHASE_INVOICE');

            if (startDate && endDate) {
                // Filter based on the date range
                filteredData = filteredData.filter((employee) => {
                    return (
                        formatDate(employee.salesInvoiceDate) >= formatDate(startDate) &&
                        formatDate(employee.salesInvoiceDate) <= formatDate(endDate)
                    );
                });
            } else if (startDate) {
                filteredData = filteredData.filter((employee) => {
                    return formatDate(employee.salesInvoiceDate) >= formatDate(startDate);
                });
            } else if (endDate) {
                // Filter based on the date range
                filteredData = filteredData.filter((employee) => {
                    return formatDate(employee.salesInvoiceDate) <= formatDate(endDate);
                });
            }

            if (filter && filter.trim() !== "") {
                filteredData = filteredData.filter((employee) => {
                    return String(employee.id).includes(filter);
                });
            }

            setFilterSalePurchase(filteredData);
        }
    }, [filter, salePurchaseUser, startDate, endDate]);
    const handleCheckboxClick = (id) => {
        const selectedIndex = selectedRows.indexOf(id);
        let newSelected = [];
        if (selectedIndex === -1) {
            newSelected = newSelected.concat(selectedRows, id);
        } else if (selectedIndex === 0) {
            newSelected = newSelected.concat(selectedRows.slice(1));
        } else if (selectedIndex === selectedRows.length - 1) {
            newSelected = newSelected.concat(selectedRows.slice(0, -1));
        } else if (selectedIndex > 0) {
            newSelected = newSelected.concat(
                selectedRows.slice(0, selectedIndex),
                selectedRows.slice(selectedIndex + 1)
            );
        }
        setSelectedRows(newSelected);
    };

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await axios.get(
                    `http://localhost:8700/hesabbook/sale/purchase/all/${loginData.primary_user_id}`
                );
                console.log("Party Response ", response.data.response);
                if (response.data.code === 200) {
                    dispatch(addSalePurchase(response.data.response));
                    setFilterSalePurchase(response.data.response);
                }
            } catch (error) {
                console.error("Error fetching data:", error);
            }
        };
        fetchData();
    }, []);


    return (
        <>
            {flag ? (
                <Box>
                    <PurchaseInvoicesCreate onBooleanChange={handleBooleanChange}/>
                </Box>
            ) : flagView ? (
                <Box>
                    <PurchaseInvoicesView onBooleanChange={handleBooleanChangeView} idFlagView={idFlagView}/>
                </Box>
            ) : (
                <Box>
                    <Box>
                        <Box>
                            <Button variant="contained" sx={{margin: "5px"}}>Purchase Invoice</Button>
                            <Box sx={{right: "0", float: "right", margin: "5px", marginRight: "10px"}}>
                                <ButtonGroup
                                    variant="contained"
                                    aria-label="Basic button group"
                                >
                                    <Button onClick={handleBooleanChange}>
                                        Create Purchase Invoice
                                    </Button>
                                </ButtonGroup>
                            </Box>
                        </Box>
                        <Box sx={{flexGrow: 1, padding: 2}}>
                            <Grid container spacing={2}>
                                <Grid item xs={4}>
                                    <Card variant="outlined" sx={{backgroundColor: '#f5f5ff'}}>
                                        <CardContent>
                                            <Box display="flex" alignItems="center">
                                                <Avatar sx={{bgcolor: '#e0e0ff', marginRight: 1}}>
                                                    <LocalMall/>
                                                </Avatar>
                                                <Typography variant="subtitle1" color="textSecondary">
                                                    Total Purchases
                                                </Typography>
                                            </Box>
                                            <Typography variant="h5" component="div">
                                                ₹ 1,118.25
                                            </Typography>
                                        </CardContent>
                                    </Card>
                                </Grid>
                                <Grid item xs={4}>
                                    <Card variant="outlined">
                                        <CardContent>
                                            <Box display="flex" alignItems="center">
                                                <Avatar sx={{bgcolor: '#e8f5e9', marginRight: 1}}>
                                                    <Paid/>
                                                </Avatar>
                                                <Typography variant="subtitle1" color="textSecondary">
                                                    Paid
                                                </Typography>
                                            </Box>
                                            <Typography variant="h5" component="div">
                                                ₹ 367.25
                                            </Typography>
                                        </CardContent>
                                    </Card>
                                </Grid>
                                <Grid item xs={4}>
                                    <Card variant="outlined">
                                        <CardContent>
                                            <Box display="flex" alignItems="center">
                                                <Avatar sx={{bgcolor: '#ffebee', marginRight: 1}}>
                                                    {/* <Unpaid/>*/}
                                                </Avatar>
                                                <Typography variant="subtitle1" color="textSecondary">
                                                    Unpaid
                                                </Typography>
                                            </Box>
                                            <Typography variant="h5" component="div">
                                                ₹ 751
                                            </Typography>
                                        </CardContent>
                                    </Card>
                                </Grid>
                            </Grid>
                        </Box>

                        <Box>
                            <Box sx={{display: "flex", width: "100%", marginLeft: "-20px", marginTop: "10px"}}>
                                <Box sx={{width: "36%"}}>
                                    <Search>
                                        <SearchIconWrapper>
                                            <SearchIcon/>
                                        </SearchIconWrapper>
                                        <StyledInputBase
                                            sx={{height: "54px"}}
                                            value={filter}
                                            onChange={handleFilterChange}
                                            placeholder="Search Purchase Invoice"
                                            inputProps={{"aria-label": "search"}}
                                        />
                                    </Search>
                                </Box>
                                <Box sx={{marginBottom: "10px", marginTop: "-8px"}}>
                                    <LocalizationProvider dateAdapter={AdapterDayjs}>
                                        <DemoContainer components={["DatePicker", "DatePicker"]}>
                                            <DatePicker
                                                label="Start Date:"
                                                sx={{width: "395px"}}
                                                value={startDate}
                                                onChange={handleStartDateChange}
                                                renderInput={(params) => <TextField {...params} />}
                                            />
                                            <DatePicker
                                                label="End Date:"
                                                sx={{width: "400px"}}
                                                value={endDate}
                                                onChange={handleEndDateChange}
                                                renderInput={(params) => <TextField {...params} />}
                                            />
                                        </DemoContainer>
                                    </LocalizationProvider>
                                </Box>
                            </Box>
                            <Box>
                                <TableContainer component={Paper} sx={{maxHeight: 500}}>
                                    <Table
                                        sx={{minWidth: 1250}}
                                        aria-label="customized table"
                                        stickyHeader
                                    >
                                        <TableHead>
                                            <TableRow>
                                                <TableCell padding="checkbox">
                                                    <Checkbox
                                                        indeterminate={
                                                            selectedRows.length > 0 &&
                                                            selectedRows.length < salePurchaseUser.length
                                                        }
                                                        checked={
                                                            selectedRows.length === salePurchaseUser.length
                                                        }
                                                        onChange={() =>
                                                            setSelectedRows(
                                                                selectedRows.length === salePurchaseUser.length
                                                                    ? []
                                                                    : salePurchaseUser.map((row) => row.id)
                                                            )
                                                        }
                                                    />
                                                </TableCell>
                                                <StyledTableCell align="center">Date</StyledTableCell>
                                                <StyledTableCell align="center">
                                                    Purchase Invoice Number
                                                </StyledTableCell>
                                                <StyledTableCell align="center">
                                                    Party Name
                                                </StyledTableCell>
                                                <StyledTableCell align="center">Due In</StyledTableCell>
                                                <StyledTableCell align="center">Amount</StyledTableCell>
                                                <StyledTableCell align="center">Status</StyledTableCell>
                                                <StyledTableCell align="center">View</StyledTableCell>
                                            </TableRow>
                                        </TableHead>
                                        <TableBody>
                                            {filterSalePurchase.map((row) => (
                                                <StyledTableRow key={row.id}>
                                                    <TableCell padding="checkbox">
                                                        <Checkbox
                                                            checked={selectedRows.indexOf(row.id) !== -1}
                                                            onClick={() => handleCheckboxClick(row.id)}
                                                        />
                                                    </TableCell>
                                                    <StyledTableCell align="center">
                                                        {formatDate(row.purchaseInvDate)}
                                                    </StyledTableCell>
                                                    <StyledTableCell align="center">
                                                        {row.purchaseInvNo}
                                                    </StyledTableCell>
                                                    <StyledTableCell align="center">
                                                        {row.partyName}
                                                    </StyledTableCell>
                                                    <StyledTableCell align="center">
                                                        {formatDate(row.purchaseDueDate)}
                                                    </StyledTableCell>
                                                    <StyledTableCell align="center">
                                                        <Box>
                                                            <Typography> (₹) {row.totalAmount}</Typography>
                                                            {row.status !== "Paid" && (
                                                                <Typography variant="body2" gutterBottom>
                                                                    (₹) {row.amountReceived} {row.status}
                                                                </Typography>
                                                            )}
                                                        </Box>
                                                    </StyledTableCell>
                                                    <StyledTableCell align="center">
                                                        {row.status}
                                                    </StyledTableCell>
                                                    <StyledTableCell align="center">
                                                        <IconButton
                                                            aria-label="edit"
                                                            onClick={() => handleBooleanChangeView(row.id)}
                                                        >
                                                            <ArticleIcon/>
                                                        </IconButton>
                                                    </StyledTableCell>
                                                </StyledTableRow>
                                            ))}
                                        </TableBody>
                                    </Table>
                                </TableContainer>
                            </Box>
                        </Box>
                    </Box>
                </Box>
            )}
        </>
    );
};