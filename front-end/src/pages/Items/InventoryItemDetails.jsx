import React, {useEffect, useState} from 'react';
import {Button, Divider, Grid, Paper, Typography} from '@mui/material';
import {makeStyles} from "@material-ui/core/styles";
import InfoIcon from "@mui/icons-material/Info";
import BusinessIcon from "@mui/icons-material/Business";
import CreditCardIcon from "@mui/icons-material/CreditCard";
import {useSelector} from "react-redux";
const useStyles = makeStyles((theme) => ({
    header: {
        display: 'flex',
        alignItems: 'center',
        color: 'gray',
        marginBottom: theme.spacing(2),
    },
    icon: {
        marginRight: theme.spacing(1),
    },
    paper: {
        padding: theme.spacing(2),
        marginBottom: theme.spacing(2),
    },
    subtitle: {
        color: 'gray',
    }
}));

export const InventoryItemDetails = ({itemCode}) => {
    const classes = useStyles();
    const {inventoryUser} = useSelector((state) => state.inventoryReducerValue);
    const [partyDetail, setPartyDetail] = useState(null);

    useEffect(() => {
        console.log("InventoryItemDetails  ",itemCode);
        console.log("Item Name  ",itemCode);
        const details = inventoryUser.find(item => item.id === itemCode);
        console.log("Party Details values", details);
        setPartyDetail(details || null);
    }, [itemCode, inventoryUser]);

    // If partyDetail is null or undefined, show a loading message or some default content
    if (!partyDetail) {
        return <Typography>Loading or No details available</Typography>;
    }

    return (
        <div>
            <Grid container spacing={2}>
                <Grid item xs={12} sm={6}>
                    <Paper className={classes.paper}>
                        <div className={classes.header}>
                            <InfoIcon className={classes.icon}/>
                            <Typography variant="subtitle1" className={classes.subtitle}>General Details</Typography>
                        </div>
                        <Typography variant="body2">Party Name: {partyDetail.pname || '-'}</Typography>
                        <Typography variant="body2">Mobile Number: {partyDetail.mobileNumber || '-'}</Typography>
                        <Typography variant="body2">Party Type: {partyDetail.type || '-'}</Typography>
                        <Typography variant="body2">Party Category: {partyDetail.category || '-'}</Typography>
                        <Typography variant="body2">Opening Balance: ₹{partyDetail.openingBalance || '-'}</Typography>
                    </Paper>
                </Grid>
                <Grid item xs={12} sm={6}>
                    <Paper className={classes.paper}>
                        <div className={classes.header}>
                            <BusinessIcon className={classes.icon}/>
                            <Typography variant="subtitle1" className={classes.subtitle}>Business Details</Typography>
                        </div>
                        <Typography variant="body2">GSTIN: {partyDetail.gstin || '-'}</Typography>
                        <Typography variant="body2">PAN Number: {partyDetail.pan || '-'}</Typography>
                        <Typography variant="body2">Billing Address: {partyDetail.billingAddress || '-'}</Typography>
                        <Typography variant="body2">Shipping Address: {partyDetail.shippingAddress || '-'}</Typography>
                    </Paper>
                </Grid>
                <Grid item xs={12}>
                    <Paper className={classes.paper}>
                        <div className={classes.header}>
                            <CreditCardIcon className={classes.icon}/>
                            <Typography variant="subtitle1" className={classes.subtitle}>Credit Details</Typography>
                        </div>
                        <Typography variant="body2">Credit Period: {partyDetail.creditPeriod || '-'}</Typography>
                        <Typography variant="body2">Credit Limit: ₹{partyDetail.creditLimit || '-'}</Typography>
                    </Paper>
                </Grid>
            </Grid>
        </div>
    );
};
