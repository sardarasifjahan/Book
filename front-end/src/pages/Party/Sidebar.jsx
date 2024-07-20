import React from 'react';
import {Avatar, List, ListItem, ListItemAvatar, ListItemText, TextField} from '@mui/material';

const Sidebar = ({partyUser, onPartySelect, selectedParty, searchTerm, onSearchChange, onPartySelectName}) => {
    return (
        <div>
            <TextField
                label="Search Party"
                variant="outlined"
                fullWidth
                margin="normal"
                value={searchTerm}
                onChange={onSearchChange}
            />
            <List>
                {partyUser
                    .filter(party => party.pname.toLowerCase().includes(searchTerm.toLowerCase()))
                    .map((party) => (
                        <ListItem
                            button
                            key={party.pname}
                            selected={selectedParty === party.pname}
                            onClick={() => {
                                onPartySelect(party.id);
                                onPartySelectName(party.pname);
                            }}
                        >
                            <ListItemAvatar>
                                <Avatar src={party.image}/>
                            </ListItemAvatar>
                            <ListItemText primary={party.pname} secondary={`₹${party.amount}`}/>
                        </ListItem>
                    ))}
            </List>
        </div>
    );
};

export default Sidebar;
