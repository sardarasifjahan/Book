import React, {useEffect, useState} from 'react';
import {Grid, Paper, Typography} from '@mui/material';
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
        console.log("InventoryItemDetails  ", itemCode);
        console.log("Item Name  ", itemCode);
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
                        <Typography variant="body2">Item Name: {partyDetail.item || '-'}</Typography>
                        <Typography variant="body2">Item Code: {partyDetail.itemCode || '-'}</Typography>
                        <Typography variant="body2">Item Description: {partyDetail.itemDescription || '-'}</Typography>
                        <Typography variant="body2">Category: {partyDetail.category || '-'}</Typography>
                        <Typography variant="body2">Current Stock: {partyDetail.totalStock || '-'}</Typography>
                        <Typography variant="body2">Low Stock Quantity: {partyDetail.lowStock || '-'}</Typography>
                        <Typography variant="body2">Low Stock
                            Warning: {partyDetail.lowStockCheckBox || '-'}</Typography>
                    </Paper>
                </Grid>
                <Grid item xs={12} sm={6}>
                    <Paper className={classes.paper}>
                        <div className={classes.header}>
                            <BusinessIcon className={classes.icon}/>
                            <Typography variant="subtitle1" className={classes.subtitle}>Pricing Details</Typography>
                        </div>
                        <Typography variant="body2">Mrp: {partyDetail.mrp || '-'} </Typography>
                        <Typography variant="body2">Sales
                            Price: {partyDetail.salePrice || '-'} {partyDetail.salePriceTax || '-'}</Typography>
                        <Typography variant="body2">Purchase
                            Price: {partyDetail.purchasePrice || '-'} {partyDetail.purchasePriceTax || '-'}</Typography>
                        <Typography variant="body2">HSN Code: {partyDetail.hsn || '-'}</Typography>
                        <Typography variant="body2">Secondary Unit : {partyDetail.unitNo || '-'}</Typography>
                        <Typography variant="body2">GST Tax Rate : {partyDetail.gst || '-'} % </Typography>
                    </Paper>
                </Grid>
                <Grid item xs={12}>
                    <Paper className={classes.paper}>
                        <div className={classes.header}>
                            <CreditCardIcon className={classes.icon}/>
                            <Typography variant="subtitle1" className={classes.subtitle}>Stock Details</Typography>
                        </div>
                        <Typography variant="body2">Warehouse : {partyDetail.warehouse || '-'}</Typography>
                    </Paper>
                </Grid>
            </Grid>
        </div>
    );
};
