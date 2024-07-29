import React from 'react';
import {Avatar, List, ListItem, ListItemAvatar, ListItemText, TextField} from '@mui/material';

const SidebarItems = ({inventoryUser, onInventorySelect, selectedInventory, searchTerm, onSearchChange, onInventorySelectName}) => {
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
                {inventoryUser
                    .filter(party => party.item.toLowerCase().includes(searchTerm.toLowerCase()))
                    .map((party) => (
                        <ListItem
                            button
                            key={party.item}
                            selected={selectedInventory === party.item}
                            onClick={() => {
                                onInventorySelect(party.id);
                                onInventorySelectName(party.item);
                            }}
                        >
                            <ListItemAvatar>
                                <Avatar src={party.image}/>
                            </ListItemAvatar>
                            <ListItemText primary={party.item} secondary={`₹${party.amount}`}/>
                        </ListItem>
                    ))}
            </List>
        </div>
    );
};

export default SidebarItems;
