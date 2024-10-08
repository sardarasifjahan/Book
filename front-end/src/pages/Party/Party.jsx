import {Box, IconButton, TextField} from "@mui/material";
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import SearchIcon from '@mui/icons-material/Search';
import Button from "@mui/material/Button";
import * as React from "react";
import {useEffect, useState} from "react";
import {partnerDataModel} from "../../datamodel/ManageUserDataModel";
import DeleteIcon from '@mui/icons-material/Delete';
import Delete from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';
import axios from "axios";
import UserRole from '../../jsonfile/Role';
import MenuItem from "@mui/material/MenuItem";
import {useDispatch, useSelector} from 'react-redux';
import {addKeyCategory, addKeyCompany, addManageUser, addParty, removeParty} from "../../redux/Action";
import ArticleIcon from '@mui/icons-material/Article';
import * as XLSX from 'xlsx';
import {DataGrid} from "@mui/x-data-grid";
import {Search, SearchIconWrapper, StyledInputBase, StyledTableCell, StyledTableRow} from "../../commonStyle";
import Modal from "@mui/joy/Modal";
import ModalClose from "@mui/joy/ModalClose";
import Typography from "@mui/joy/Typography";
import {Transition} from "react-transition-group";
import {DELETE_KEY_VALUE, SAVE_KEY_VALUE} from "../apiendpoint/APIEndPoint";
import {List, ListItem, ListItemButton} from "@mui/joy";
import PeopleIcon from '@mui/icons-material/People';
import AttachMoneyIcon from '@mui/icons-material/AttachMoney';
import MoneyOffIcon from '@mui/icons-material/MoneyOff';
import {MainPartyDetails} from "./MainPartyDetails";


export const Party = () => {
    const [enable, setEnable] = useState(true);
    const [enableBulk, setEnableBulk] = useState(true);
    const [manageUserObj, setManageUserObj] = useState(partnerDataModel);
    const [mangUser, setMangUser] = useState([]);
    const [excelData, setExcelData] = useState([]);
    const [columns, setColumns] = useState([]);
    const [files, setFiles] = useState([]);
    const [filteredEmployees, setFilteredEmployees] = useState([]);
    const [openCategory, setOpenCategory] = React.useState(false);
    const [categoryApi, setCategoryApi] = useState();
    const [openCompany, setOpenCompany] = React.useState(false);
    const [open, setOpen] = React.useState(false);
    const [filter, setFilter] = useState('');
    const dispatch = useDispatch();
    const loginData = useSelector(state => state.loginReducerValue);
    const {partyUser} = useSelector(state => state.partyReducerValue);
    const keyCompanyData = useSelector(state => state.keyCompanyReducerValue);
    const keyCategoryData = useSelector(state => state.keyCategoryReducerValue);

    const [addCategory, setAddCategory] = React.useState([]);
    const [detailFlag, setDetailFlag] = React.useState(true);
    const [detailFlagId, setDetailFlagId] = React.useState('');

    const [toCollect, setToCollect] = useState(0);
    const [toPay, setToPay] = useState(0);

    const handleDetailFlag = () => {
        setDetailFlag((prevState) => !prevState);
    };
    const handleBooleanChange = () => {
        setManageUserObj(partnerDataModel);
        setEnable(false);
        setEnableBulk(true);
    };
    const handleFilterChange = event => {
        setFilter(event.target.value);
    };
    useEffect(() => {
        if (mangUser.length > 0) {
            const filteredData = mangUser.filter(employee => {
                return (
                    employee.pname.toLowerCase().includes(filter.toLowerCase()) ||
                    employee.company.includes(filter.toLowerCase()) ||
                    employee.gstNumber.includes(filter.toLowerCase()) ||
                    employee.mobileNumber.includes(filter));
            });
            setFilteredEmployees(filteredData);
        }
    }, [filter, mangUser]);

    function handleBooleanCancelChange() {
        setEnableBulk(true);
        setEnable(true);
        setExcelData([]);
        setColumns([]);
        setFiles([]);
    }

    const handleBulkChange = () => {
        setEnableBulk(false);
        setEnable(true);
    }

    const handleTextFieldChange = (event, field) => {
        setManageUserObj({
            ...manageUserObj,
            [field]: event.target.value,
        });
    };

    const handleSubmit = async (event) => {
        event.preventDefault();
        manageUserObj['primary_user_id'] = loginData.primary_user_id;
        manageUserObj['secondary_user_id'] = loginData.secondary_user_id;
        const response = await axios.post('http://localhost:8777/hesabbook/partner/save', manageUserObj);
        console.log('Submit Response :--    ', response.data);
        console.log('on Submit :-->', manageUserObj);
        addObjectOnTop(response.data.response);
        addBusinessName(response.data.response.company);

        setManageUserObj(partnerDataModel);
        setEnable(prevState => !prevState);
    };

    const addBusinessName = (newObject) => {
        dispatch(addKeyCompany([newObject, ...keyCompanyData]))
    }

    const addObjectOnTop = (newObject) => {
        const existingIndex = partyUser.findIndex(item => item.id === newObject.id);
        if (existingIndex === -1) {
            setFilteredEmployees([newObject, ...partyUser]);
            setMangUser([newObject, ...partyUser]);
            dispatch(addParty([newObject, ...partyUser]));
        } else {
            const updatedArray = [...partyUser];
            updatedArray[existingIndex] = newObject;
            setFilteredEmployees(updatedArray);
            setMangUser(updatedArray);
            dispatch(addParty(updatedArray));
        }
    };

    async function handleDelete(id, event) {
        console.log("DELETE ID " + id)
        const response = await axios.post(`http://localhost:8777/hesabbook/partner/delete/${id}`);
        console.log('Submit delete Response :--    ', response.data);
        dispatch(removeParty(id));
        // fetchAllManageUserData();

        setFilteredEmployees(partyUser);
    }

    useEffect(() => {
        if (partyUser.length > 1 && !(partyUser[0].id === '')) {
            console.log("done your job")
            setFilteredEmployees(partyUser);

            const {collect, pay} = partyUser.reduce(
                (acc, party) => {
                    if (party.openingBalanceType === 'To Collect') {
                        acc.collect += parseFloat(party.openingBalance);
                    } else if (party.openingBalanceType === 'To Pay') {
                        acc.pay += parseFloat(party.openingBalance);
                    }
                    return acc;
                },
                {collect: 0, pay: 0}
            );
            setToCollect(collect);
            setToPay(pay);


        }
    }, [partyUser]);


    /*    const fetchData = async () => {
            try {
                const response = await axios.get(`http://localhost:8777/hesabbook/manageuser/all/${loginData.primary_user_id}`);
                setMangUser(response.data.response);
                dispatch(a(response.data.response));
                setFilteredEmployees(response.data.response);
            } catch (error) {
                console.error('Error fetching data:', error);
            }
        };*/

    function handleEdit(id, data) {
        handleBooleanChange();
        findObjectById(id);
        fetchAllManageUserData();
        //    dispatch(updateManageUser(data));
    }

    const findObjectById = (id) => {
        const foundItem = mangUser.find(item => item.id === id);
        if (foundItem) {
            setManageUserObj(foundItem);
        } else {
            console.log('Object with ID', id, 'not found');
        }

    };

    function fetchAllManageUserData() {
        const fetchData = async () => {
            try {
                const response = await axios.get('http://localhost:8777/hesabbook/partner/all');
                console.log(response.data);
                setMangUser(response.data);
                localStorage.setItem('mangeUser', mangUser);
                dispatch(addManageUser(response.data));
            } catch (error) {
                console.error('Error fetching data:', error);
            }
        };
        return fetchData;
    }

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await axios.get(`http://localhost:8777/hesabbook/partner/all/${loginData.primary_user_id}`);
                console.log('Party Response ', response.data.response);
                if (response.data.code === 200) {
                    setMangUser(response.data.response);
                    localStorage.setItem('Party-details', response.data.response);
                    dispatch(addParty(response.data.response));
                    setFilteredEmployees(response.data.response);
                }
            } catch (error) {
                console.error('Error fetching data:', error);
            }
        };
        fetchData();
    }, [setMangUser]);

    function handleView(id, row) {
        setDetailFlagId(id);
        handleDetailFlag();
        console.log("view Flag id  row   ", id, row);

    }


    const handleFileUpload = (e) => {
        const file = e.target.files[0];
        setFiles(e.target.files[0])
        const reader = new FileReader();

        reader.onload = (event) => {
            const binaryString = event.target.result;
            const workbook = XLSX.read(binaryString, {type: 'binary'});

            // Assuming you want the first sheet
            const sheetName = workbook.SheetNames[0];
            const sheet = workbook.Sheets[sheetName];

            const data = XLSX.utils.sheet_to_json(sheet, {header: 1});

            // Assuming the first row contains column headers
            const headers = data.shift();
            const columns = headers.map((header, index) => ({
                field: 'col' + index,
                headerName: header,
                width: 150,
            }));

            // Creating rows with columns
            const rows = data.map((row, rowIndex) => {
                const rowData = {};
                row.forEach((cell, cellIndex) => {
                    rowData['col' + cellIndex] = cell;
                });
                rowData.id = rowIndex + 1; // Assigning unique id to each row
                return rowData;
            });

            setColumns(columns);
            setExcelData(rows);
        };

        reader.readAsBinaryString(file);
    };


    function FileUpload({onFileChange}) {
        const handleFileChange = (e) => {
            const file = e.target.files[0];
            onFileChange(file);
        };

        return (
            <div>
                <input type="file" accept=".xls, .xlsx" onChange={handleFileChange}/>
            </div>
        );
    }


    const handleSave = async () => {
        console.log("excel sheet  ", excelData);
        console.log("data sheet ", columns);
        const formData = new FormData();
        formData.append('file', files);
        const response = await axios.post(`http://localhost:8777/hesabbook/partner/upload/${loginData.primary_user_id}/${loginData.secondary_user_id}`, excelData);
        console.log("response from handleSave ", response.data)

    };

    const style = {
        position: 'absolute',
        top: '50%',
        left: '50%',
        transform: 'translate(-50%, -50%)',
        width: 400,
        bgcolor: 'background.paper',
        border: '2px solid #000',
        boxShadow: 24,
        p: 4,
    };
    const handleClick = (e) => {
        e.preventDefault();
        handleSubmitToApi();
        setCategoryApi('');

    };
    let axiosConfig = {
        headers: {
            'Content-Type': 'application/json;charset=UTF-8',
            "Access-Control-Allow-Origin": "*",
        }
    };

    const handleSubmitToApi = async () => {
        try {
            const response = await axios.post(SAVE_KEY_VALUE, {
                kes: 'category',
                value: categoryApi,
                primary_user_id: loginData.primary_user_id
            }, axiosConfig);
            console.log("save Categroy response ", response.data.response.value);
            dispatch(addKeyCategory([response.data.response.value, ...keyCategoryData]))
            setAddCategory([...addCategory, response.data.response]);
            console.log('Add Category ', addCategory);
        } catch (error) {
            console.error('Error:', error);
        }
    };
    const handleClose = () => {
        setOpen(false)
    };

    async function deleteCategory(id, value) {
        try {
            const response = await axios.get(DELETE_KEY_VALUE + `/${id}`);
            console.log("DELETE CATEGORY  ", response.data.response);
            //add logic for remove from
            // dispatch(removeKeyCategory(value));
            setAddCategory(prevItems => prevItems.filter(item => item.id !== id));
            console.log('Add Category ', addCategory);
        } catch (error) {
            console.error('Error:', error);
        }

    }

    return (
        <>  {detailFlag ? (
            <Box>
                {(enable && enableBulk) && (
                    <Box>
                        <Box>
                            <Box sx={{display: 'flex', justifyContent: 'space-between', p: 2}}>
                                <Paper
                                    elevation={3}
                                    sx={{
                                        display: 'flex',
                                        flexDirection: 'column',
                                        alignItems: 'center',
                                        justifyContent: 'center',
                                        p: 2,
                                        width: '30%',
                                        backgroundColor: '#f0f0ff',
                                        border: '1px solid #e0e0e0',
                                    }}
                                >
                                    <Box sx={{display: 'flex', alignItems: 'center'}}>
                                        <PeopleIcon/>
                                        <Typography variant="h6" sx={{ml: 1}}>All Parties</Typography>
                                    </Box>
                                    <Typography variant="h3">{mangUser.length}</Typography>
                                </Paper>
                                <Paper
                                    elevation={3}
                                    sx={{
                                        display: 'flex',
                                        flexDirection: 'column',
                                        alignItems: 'center',
                                        justifyContent: 'center',
                                        p: 2,
                                        width: '30%',
                                        border: '1px solid #e0e0e0',
                                    }}
                                >
                                    <Box sx={{display: 'flex', alignItems: 'center', color: 'green'}}>
                                        <AttachMoneyIcon/>
                                        <Typography variant="h6" sx={{ml: 1}}>To Collect</Typography>
                                    </Box>
                                    <Typography variant="h3">₹ {toCollect}</Typography>
                                </Paper>
                                <Paper
                                    elevation={3}
                                    sx={{
                                        display: 'flex',
                                        flexDirection: 'column',
                                        alignItems: 'center',
                                        justifyContent: 'center',
                                        p: 2,
                                        width: '30%',
                                        border: '1px solid #e0e0e0',
                                    }}
                                >
                                    <Box sx={{display: 'flex', alignItems: 'center', color: 'red'}}>
                                        <MoneyOffIcon/>
                                        <Typography variant="h6" sx={{ml: 1}}>To Pay</Typography>
                                    </Box>
                                    <Typography variant="h3">₹ {toPay}</Typography>
                                </Paper>
                            </Box>

                        </Box>
                        <Box>
                            <Box sx={{display: 'flex', width: '100%'}}>
                                <Box sx={{width: '41%', marginLeft: "-23px", marginTop: "10px", marginBottom: "10px"}}>
                                    <Search>
                                        <SearchIconWrapper>
                                            <SearchIcon/>
                                        </SearchIconWrapper>
                                        <StyledInputBase
                                            value={filter}
                                            onChange={handleFilterChange}
                                            placeholder="Search by Business Name, Company, GST And Mobile Number"
                                            inputProps={{'aria-label': 'search'}}
                                        />
                                    </Search>
                                </Box>
                                <Box sx={{right: '0', float: 'right'}}>
                                    <Button sx={{}} variant="contained" onClick={handleBooleanChange}>Create
                                        Party</Button>
                                    <Button sx={{marginLeft: "10px", marginRight: "10px"}} variant="contained"
                                            onClick={handleBulkChange}>Create Bulk Party</Button>
                                </Box>

                            </Box>
                            <Box>
                                <TableContainer component={Paper} sx={{maxHeight: 500}}>
                                    <Table sx={{minWidth: 1250}} aria-label="customized table" stickyHeader>
                                        <TableHead>
                                            <TableRow>
                                                <StyledTableCell align="center">Name</StyledTableCell>
                                                <StyledTableCell align="center">Company</StyledTableCell>
                                                <StyledTableCell align="center">Party Type</StyledTableCell>
                                                <StyledTableCell align="center">GST</StyledTableCell>
                                                <StyledTableCell align="center">Phone</StyledTableCell>
                                                <StyledTableCell align="center">Actions</StyledTableCell>
                                                <StyledTableCell align="center">View</StyledTableCell>
                                            </TableRow>
                                        </TableHead>
                                        <TableBody>
                                            {filteredEmployees.map((row) => (
                                                <StyledTableRow key={row.id}>
                                                    <StyledTableCell align="center">{row.pname}</StyledTableCell>
                                                    <StyledTableCell
                                                        align="center">{row.company}</StyledTableCell>
                                                    <StyledTableCell align="center">{row.partyType}</StyledTableCell>
                                                    <StyledTableCell align="center">{row.gstNumber}</StyledTableCell>
                                                    <StyledTableCell align="center">{row.mobileNumber}</StyledTableCell>
                                                    <StyledTableCell align="center">
                                                        <IconButton aria-label="edit"
                                                                    onClick={() => handleEdit(row.id, row)}>
                                                            <EditIcon/>
                                                        </IconButton>
                                                        <IconButton aria-label="delete"
                                                                    onClick={() => handleDelete(row.id)}>
                                                            <DeleteIcon/>
                                                        </IconButton>
                                                    </StyledTableCell>
                                                    <StyledTableCell align="center">
                                                        <IconButton aria-label="edit"
                                                                    onClick={() => handleView(row.id, row)}>
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
                )}
                {
                    !enable && (
                        <Box>
                            <Box sx={{display: 'flex', marginBottom: "10px", marginTop: "20px"}}>
                                <Box>
                                    <Button size="small" variant="contained" sx={{marginLeft: "260px"}}>Create
                                        Partner</Button>
                                </Box>
                                <Box sx={{float: 'right', alignItems: 'center', marginLeft: "430px"}}>
                                    <Button sx={{marginRight: "10px"}} size="small" variant="contained"
                                            onClick={handleBooleanCancelChange}>Cancel</Button>
                                    <Button size="small" variant="contained"
                                            onClick={handleBooleanCancelChange}>Save</Button>
                                </Box>
                            </Box>
                            <form onSubmit={handleSubmit}>
                                <Box sx={{width: '70%', display: 'flex'}}>
                                    <Box sx={{
                                        width: '50%',
                                        display: 'flex',
                                        flexDirection: 'column',
                                        margin: "10px",
                                        marginLeft: '250px'
                                    }}>
                                        <TextField id="outlined-basic" label="Name" variant="outlined" sx={{margin: '10px'}}
                                                   value={manageUserObj.pname}
                                                   onChange={(event) => handleTextFieldChange(event, 'pname')}/>

                                        <TextField id="outlined-basic" label="Phone Number" variant="outlined"
                                                   sx={{margin: '10px'}} value={manageUserObj.mobileNumber}
                                                   onChange={(event) => handleTextFieldChange(event, 'mobileNumber')}/>
                                        <TextField id="outlined-basic" label="Email Address" variant="outlined"
                                                   sx={{margin: '10px'}} value={manageUserObj.email}
                                                   onChange={(event) => handleTextFieldChange(event, 'email')}/>
                                        <TextField id="outlined-basic" label="Billing Address" variant="outlined"
                                                   sx={{margin: '10px'}}
                                                   value={manageUserObj.billingAddress}
                                                   onChange={(event) => handleTextFieldChange(event, 'billingAddress')}/>
                                        <TextField id="outlined-basic" label="Shipping Address" variant="outlined"
                                                   sx={{margin: '10px'}}
                                                   value={manageUserObj.shippingAddress}
                                                   onChange={(event) => handleTextFieldChange(event, 'shippingAddress')}/>
                                        <TextField id="outlined-basic" label="Company Name" variant="outlined"
                                                   sx={{margin: '10px'}}
                                                   value={manageUserObj.company}
                                                   onChange={(event) => handleTextFieldChange(event, 'company')}/>
                                    </Box>
                                    <Box sx={{
                                        display: 'flex',
                                        flexDirection: 'column',
                                        marginRight: '60px',
                                        marginTop: "3px"
                                    }}>
                                        <TextField
                                            sx={{width: "160%", marginBottom: "6px"}}
                                            select
                                            value={manageUserObj.partyType}
                                            onChange={(event) => handleTextFieldChange(event, 'partyType')}
                                            label="Party Type"
                                            variant="outlined"
                                            margin="normal"
                                        >
                                            {
                                                UserRole.PartyType.map(userrole => (
                                                    <MenuItem key={userrole.name}
                                                              value={userrole.name}>{userrole.name}</MenuItem>
                                                ))
                                            }
                                        </TextField>
                                        <TextField id="outlined-basic" label="GST Number" variant="outlined"
                                                   sx={{width: "160%", marginTop: "15px"}} value={manageUserObj.gstNumber}
                                                   onChange={(event) => handleTextFieldChange(event, 'gstNumber')}/>

                                        <TextField
                                            sx={{width: "160%", marginTop: "20px"}}
                                            select
                                            value={manageUserObj.partyCategory}
                                            onChange={(event) => handleTextFieldChange(event, 'partyCategory')}
                                            label="Category"
                                            variant="outlined"
                                            margin="normal"
                                        >
                                            <MenuItem onClick={() => setOpenCategory(true)}>Create a New Category</MenuItem>
                                            {Array.isArray(keyCategoryData) &&
                                                keyCategoryData.map(userrole => (
                                                    <MenuItem key={userrole}
                                                              value={userrole}>{userrole}</MenuItem>
                                                ))
                                            }
                                        </TextField>
                                        <Transition in={openCategory} timeout={400}>
                                            <Modal
                                                open={openCategory}
                                                onClose={() => setOpenCategory(false)}
                                                aria-labelledby="modal-modal-title"
                                                aria-describedby="modal-modal-description"
                                                sx={{display: 'flex', justifyContent: 'center', alignItems: 'center'}}
                                            >
                                                <Box sx={style}>
                                                    <Box
                                                        sx={{
                                                            marginTop: 8,
                                                            display: 'flex',
                                                            flexDirection: 'column',
                                                            alignItems: 'center',
                                                        }}
                                                    >
                                                        <ModalClose variant="plain" sx={{m: 1}}/>
                                                        <Typography component="h1" variant="h5">
                                                            Save Into Category
                                                        </Typography>
                                                        <Box component="form" onSubmit={handleSubmit} noValidate
                                                             sx={{mt: 1}}>
                                                            <TextField
                                                                margin="normal"
                                                                required
                                                                fullWidth
                                                                id="Category"
                                                                label="Categroy"
                                                                name="Category"
                                                                autoComplete="Category"
                                                                value={categoryApi}
                                                                onChange={(e) => setCategoryApi(e.target.value)}
                                                                autoFocus
                                                            />
                                                            <Button
                                                                type="submit"
                                                                fullWidth
                                                                variant="contained"
                                                                onClick={handleClick}
                                                                sx={{
                                                                    mt: 3,
                                                                    mb: 2,
                                                                    color: "whitesmoke",
                                                                    background: '#212121'
                                                                }}
                                                            >
                                                                Submit
                                                            </Button>
                                                            <List sx={{maxWidth: 300}}>
                                                                {addCategory.length > 0 ? (
                                                                    addCategory.map((item, index) => (
                                                                        <ListItem
                                                                            endAction={
                                                                                <IconButton aria-label="Delete" size="sm"
                                                                                            color="danger">
                                                                                    <Delete
                                                                                        onClick={() => deleteCategory(item.id, item.value)}/>
                                                                                </IconButton>
                                                                            }
                                                                        >
                                                                            <ListItemButton
                                                                                key={index}>{item.value}</ListItemButton>
                                                                        </ListItem>
                                                                    ))) : (
                                                                    <p>Add New Category</p>
                                                                )
                                                                }
                                                            </List>
                                                        </Box>
                                                    </Box>
                                                </Box>
                                            </Modal>
                                        </Transition>
                                        <TextField id="outlined-basic" label="Credit Limit" variant="outlined"
                                                   sx={{width: "160%", marginTop: "13px"}} value={manageUserObj.creditLimit}
                                                   onChange={(event) => handleTextFieldChange(event, 'creditLimit')}/>

                                        <Box sx={{display: 'flex'}}>
                                            <TextField id="outlined-basic" label="Credit Period" variant="outlined"
                                                       sx={{width: "fullWidth", marginTop: "18px"}}
                                                       value={manageUserObj.creditPeriod}
                                                       onChange={(event) => handleTextFieldChange(event, 'creditPeriod')}/>

                                            <TextField
                                                sx={{width: "fullWidth", marginTop: "18px", marginLeft: "10px"}}
                                                select
                                                value={manageUserObj.creditPeriodType}
                                                onChange={(event) => handleTextFieldChange(event, 'creditPeriodType')}
                                                label="Credit Period Type"
                                                variant="outlined"
                                            >
                                                {
                                                    UserRole.creditPeriod.map(userrole => (
                                                        <MenuItem key={userrole.name}
                                                                  value={userrole.name}>{userrole.name}</MenuItem>
                                                    ))
                                                }
                                            </TextField>
                                        </Box>

                                        <Box sx={{display: 'flex'}}>
                                            <TextField id="outlined-basic" label="Opening Balance" variant="outlined"
                                                       sx={{width: "200%", marginTop: "20px"}}
                                                       value={manageUserObj.openingBalance}
                                                       onChange={(event) => handleTextFieldChange(event, 'openingBalance')}/>

                                            <TextField
                                                sx={{width: "200%", marginTop: "20px", marginLeft: "10px"}}
                                                select
                                                value={manageUserObj.openingBalanceType}
                                                onChange={(event) => handleTextFieldChange(event, 'openingBalanceType')}
                                                label="Opening Balance Type"
                                                variant="outlined"
                                                margin="normal"
                                            >
                                                {
                                                    UserRole.openingBalance.map(userrole => (
                                                        <MenuItem key={userrole.name}
                                                                  value={userrole.name}>{userrole.name}</MenuItem>
                                                    ))
                                                }
                                            </TextField>
                                        </Box>
                                        <Box>
                                            <Button type="submit" variant="contained"
                                                    sx={{marginLeft: "135px"}}>SUBMIT</Button>
                                        </Box>
                                    </Box>
                                </Box>
                            </form>
                        </Box>
                    )
                }
                {
                    !enableBulk && (
                        <Box sx={{marginLeft: "10px"}}>
                            <Box sx={{display: 'flex'}}>
                                <Box sx={{marginTop: "10px", marginBottom: "20px", marginLeft: "-2px"}}>
                                    <Button size="small" variant="contained">Create Bulk Partner</Button>
                                </Box>
                                <Box sx={{
                                    float: 'right',
                                    alignItems: 'center',
                                    marginLeft: "100px",
                                    display: 'flex',
                                    marginTop: "-15px"
                                }}>
                                    <Box sx={{marginBottom: "-80px"}}>
                                        <a
                                            href={require('../../file/PartySample.xlsx')}
                                            download="PartySample.xlsx"
                                            target="_blank"
                                            rel="noreferrer"
                                        >
                                            <Button
                                                type="submit"
                                                variant="contained"
                                                /// onClick={handleClick}
                                                sx={{mt: 3, mb: 2, color: "whitesmoke", background: '#212121'}}
                                            >
                                                Download the sample file
                                            </Button>
                                        </a>
                                    </Box>
                                    <Button sx={{marginLeft: "-190px", marginRight: "30px"}} size="small"
                                            variant="contained"
                                            onClick={handleBooleanCancelChange}>Cancel</Button>
                                    <Button size="small" variant="contained"
                                            onClick={handleBooleanCancelChange}>Save</Button>
                                </Box>
                            </Box>
                            <input type="file" onChange={handleFileUpload} sx={{marginRight: "100px", marginLeft: "10px"}}/>
                            {
                                excelData.length > 0 && (
                                    <Box
                                        sx={{
                                            height: 550,
                                            width: 1300,
                                            '& .actions': {
                                                color: 'text.secondary',
                                            },
                                            '& .textPrimary': {
                                                color: 'text.primary',
                                            },
                                        }}
                                    >
                                        <DataGrid
                                            rows={excelData}
                                            columns={columns}
                                            pageSize={5}
                                            rowsPerPageOptions={[5, 10, 20]}
                                            checkboxSelection
                                            disableSelectionOnClick
                                        />
                                        <button onClick={handleSave}>Save</button>
                                    </Box>
                                )
                            }
                        </Box>
                    )}
            </Box>
        ) : (
            <Box>
                <MainPartyDetails detailFlagId={detailFlagId} onBooleanChange={handleDetailFlag}/>
            </Box>
        )
        }
        </>
    )
}
