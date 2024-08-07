import React, { useState, useEffect } from 'react';
import { Box, Button, CssBaseline, Grid, Paper, Tab, Tabs, Typography } from '@mui/material';
import Sidebar from './Sidebar';
import PartyDetails from './PartyDetails';
import PartyLedger from './PartyLedger';
import PartyTransactions from './PartyTransactions';
import {useSelector} from "react-redux";
import ItemWiseReport from "./ItemWiseReport";
import {TabPanel} from "../../commonStyle";
export  const MainPartyDetails = ({ detailFlagId, onBooleanChange }) => {
    const {partyUser} = useSelector((state) => state.partyReducerValue);
    useEffect(() => {
        console.log("Details Flag Id ", detailFlagId);
        console.log("On Boolean Change", onBooleanChange);
    }, []);

    const [selectedParty, setSelectedParty] = useState('Cash Sale');
    const [selectedPartyName,setSelectedPartyName] = React.useState('');
    const [tabIndex, setTabIndex] = useState(0);
    const [searchTerm, setSearchTerm] = useState('');

    const handlePartySelect = (party) => {
        setSelectedParty(party);
    };

    const handleTabChange = (event, newValue) => {
        setTabIndex(newValue);
    };

    const handleSearchChange = (event) => {
        setSearchTerm(event.target.value);
    };
    const handleSelectedPartyName=(party)=>{
        setSelectedPartyName(party);
    }

    return (
        <>
            <Box>
                <Button onClick={onBooleanChange}>Back To View</Button>
            </Box>
            <CssBaseline />
            <Grid container spacing={2}>
                <Grid item xs={3}>
                    <Paper elevation={3} style={{ height: 'calc(100vh - 64px)', overflow: 'auto' }}>
                    <Sidebar
                            partyUser={partyUser}
                            onPartySelect={handlePartySelect}
                            selectedParty={selectedParty}
                            searchTerm={searchTerm}
                            onSearchChange={handleSearchChange}
                            onPartySelectName={handleSelectedPartyName}
                        />
                    </Paper>
                </Grid>
                <Grid item xs={9}>
                        <Paper style={{ padding: 16, height: 'calc(100vh - 64px)', overflow: 'auto' }}>
                        <Typography variant="h5">{selectedPartyName}</Typography>
                        <Tabs value={tabIndex} onChange={handleTabChange} aria-label="party tabs">
                            <Tab label="Transactions" />
                            <Tab label="Profile" />
                            <Tab label="Ledger" />
                            <Tab label="Item Wise Report" />
                        </Tabs>
                        <TabPanel value={tabIndex} index={0}>
                            <PartyTransactions partyName={selectedParty} />
                        </TabPanel>
                        <TabPanel value={tabIndex} index={1}>
                            <PartyDetails partyName={selectedParty} />
                        </TabPanel>
                        <TabPanel value={tabIndex} index={2}>
                            <PartyLedger partyName={selectedParty} />
                        </TabPanel>
                        <TabPanel value={tabIndex} index={3}>
                            <ItemWiseReport partyName={selectedParty}/>
                        </TabPanel>
                    </Paper>
                </Grid>
            </Grid>
        </>
    );
};

