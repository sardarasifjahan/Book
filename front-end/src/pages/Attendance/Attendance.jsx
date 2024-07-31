import React, {useState} from 'react';
import {Box, Checkbox, Grid, IconButton, Paper, Typography} from '@mui/material';
import {styled} from '@mui/material/styles';
import {addDays, endOfMonth, format, startOfMonth} from 'date-fns';
import SaveIcon from '@mui/icons-material/Save';
import axios from 'axios';
import {useSelector} from "react-redux";

const getDaysArray = () => {
    const start = startOfMonth(new Date());
    const end = endOfMonth(new Date());
    const days = [];
    for (let day = start; day <= end; day = addDays(day, 1)) {
        days.push(day);
    }
    return days;
};

const daysArray = getDaysArray();

const Item = styled(Paper)(({theme}) => ({
    padding: theme.spacing(1),
    textAlign: 'center',
    color: theme.palette.text.secondary,
}));

const Attendance = () => {
    const {manageUsers} = useSelector(state => state.manageUserReducerValue);

    const [employees, setEmployees] = useState([]);
    React.useEffect(() => {
        console.log("Employee manageUsers ", manageUsers);
        const details = manageUsers.map(item => item.name);
        setEmployees(details);
        console.log("Employee  ", details);
    }, [manageUsers]);
    const [checkedState, setCheckedState] = useState(
        Array(employees.length).fill().map(() => Array(daysArray.length).fill(false))
    );
    const [showSubmit, setShowSubmit] = useState(true);

    const handleCheckboxChange = (empIndex, dayIndex) => {
        const updatedCheckedState = checkedState.map((row, i) =>
            row.map((item, j) => (i === empIndex && j === dayIndex ? !item : item))
        );
        setCheckedState(updatedCheckedState);
        setShowSubmit(true);
    };

    const handleSubmit = async () => {
        // Replace the URL with your API endpoint
        const apiUrl = 'https://your-api-endpoint.com/submit-attendance';

        // Format the data for the API
        const formattedData = employees.map((employee, empIndex) => ({
            employee,
            attendance: checkedState[empIndex],
        }));

        try {
            const response = await axios.post(apiUrl, {attendanceData: formattedData});
            console.log('Response:', response.data);
            setShowSubmit(false);
        } catch (error) {
            console.error('Error submitting attendance data:', error);
        }
    };

    return (
        <Box sx={{flexGrow: 1}}>
            <Grid container spacing={2}>
                <Grid item xs={3}>
                    <Item>
                        <Typography variant="h6">Employees</Typography>
                        {employees.map((employee, index) => (
                            <Typography key={index} sx={{padding: '8px'}}>{employee}</Typography>
                        ))}
                    </Item>
                </Grid>
                <Grid item xs={9}>
                    <Item>
                        <Box sx={{overflowX: 'auto'}}>
                            <Grid container spacing={1} sx={{width: 'max-content'}}>
                                <Grid item xs={12}>
                                    <Grid container spacing={1}>
                                        {daysArray.map((day, index) => (
                                            <Grid item key={index} sx={{minWidth: '50px'}}>
                                                <Typography variant="caption">{format(day, 'dd MMM')}</Typography>
                                            </Grid>
                                        ))}
                                    </Grid>
                                </Grid>
                                {employees.map((employee, empIndex) => (
                                    <Grid container spacing={1} key={empIndex}>
                                        <Grid item xs={12}>
                                            <Grid container spacing={1}>
                                                {daysArray.map((day, dayIndex) => (
                                                    <Grid item key={dayIndex} sx={{minWidth: '50px'}}>
                                                        <Checkbox
                                                            checked={checkedState[empIndex][dayIndex]}
                                                            onChange={() => handleCheckboxChange(empIndex, dayIndex)}
                                                        />
                                                    </Grid>
                                                ))}
                                            </Grid>
                                        </Grid>
                                    </Grid>
                                ))}
                            </Grid>
                        </Box>
                    </Item>
                </Grid>
                {showSubmit && (
                    <Grid item xs={12} sx={{textAlign: 'right', paddingRight: '16px'}}>
                        <IconButton onClick={handleSubmit} color="primary">
                            <SaveIcon/>
                        </IconButton>
                    </Grid>
                )}
            </Grid>
        </Box>
    );
};

export default Attendance;
