import {InventoryItemDetails} from "./InventoryItemDetails";
import {InventoryPartyWiseReport} from "./InventoryPartyWiseReport";
import React, {useEffect, useState} from 'react';
import {Box, Button, Grid, Paper, Typography} from '@mui/material';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import SidebarItems from "./SidebarItems";
import {useSelector} from "react-redux";
import {InventoryStockDetails} from "./InventoryStockDetails";
import {TabPanel} from "../../commonStyle";
export const MainItemDetails = ({detailFlagId, onBooleanChange}) => {
    const {inventoryUser} = useSelector((state) => state.inventoryReducerValue);

    useEffect(() => {
        console.log("Details Items Flag Id ", detailFlagId);
        console.log("On Boolean Change", onBooleanChange);
    }, []);

    const [selectedInventory, setSelectedInventory] = useState('Cash Sale');
    const [selectedInventoryName, setSelectedInventoryName] = React.useState('');
    const [tabIndex, setTabIndex] = useState(0);
    const [searchTerm, setSearchTerm] = useState('');

    const handleInventorySelect = (party) => {
        console.log("handleInventorySelect ",party)
        setSelectedInventory(party);
    };

    const handleTabChange = (event, newValue) => {
        console.log("handleTabChange ",newValue)
        setTabIndex(newValue);
    };

    const handleSearchChange = (event) => {
        console.log("handleSearchChange ",event.target.value)
        setSearchTerm(event.target.value);
    };

    const handleSelectedInventoryName = (party) => {
        console.log("handleSelectedInventoryName ",party)
        setSelectedInventoryName(party);
    };

    return (
        <>
            <Box>
                <Button onClick={onBooleanChange}>Back To View</Button>
            </Box>
            <Grid container spacing={2}>
                <Grid item xs={3}>
                    <Paper elevation={3} style={{height: 'calc(100vh - 64px)', overflow: 'auto'}}>
                        <SidebarItems
                            inventoryUser={inventoryUser}
                            onInventorySelect={handleInventorySelect}
                            selectedInventory={selectedInventory}
                            searchTerm={searchTerm}
                            onSearchChange={handleSearchChange}
                            onInventorySelectName={handleSelectedInventoryName}
                        />
                    </Paper>
                </Grid>
                <Grid item xs={9}>
                    <Paper style={{padding: 16, height: 'calc(100vh - 64px)', overflow: 'auto'}}>
                        <Typography variant="h5">{selectedInventoryName}</Typography>
                        <Tabs value={tabIndex} onChange={handleTabChange} aria-label="party tabs">
                            <Tab label="Item Details" />
                            <Tab label="Stock Details" />
                            <Tab label="Party Wise Report" />
                        </Tabs>
                        <TabPanel value={tabIndex} index={0}>
                            <InventoryItemDetails itemCode={selectedInventory} />
                        </TabPanel>
                        <TabPanel value={tabIndex} index={1}>
                            <InventoryStockDetails itemCode={selectedInventory} />
                        </TabPanel>
                        <TabPanel value={tabIndex} index={2}>
                            <InventoryPartyWiseReport itemCode={selectedInventory} />
                        </TabPanel>
                    </Paper>
                </Grid>
            </Grid>
        </>
    );
};



