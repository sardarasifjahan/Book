import React, { useState } from 'react';
import axios from 'axios';
import { Box, List, ListItem, ListItemText, Typography, Divider, Paper, IconButton, Grid, Button, TextField, Modal, Fade, Backdrop } from '@mui/material';
import AddIcon from '@mui/icons-material/Add';
import RemoveIcon from '@mui/icons-material/Remove';
import PhoneIcon from '@mui/icons-material/Phone';
import WhatsAppIcon from '@mui/icons-material/WhatsApp';
import ShareIcon from '@mui/icons-material/Share';

const categories = [
    'FAQs',
    'Invoices',
    'Shortcuts',
    'Multi-Company and Multi-User',
    'Data and Security',
    'Account',
    'Mobile App',
    'Others',
    'TUTORIALS',
    'Items',
    'Parties',
    'Payments',
];

const questions = [
    {
        category: 'Invoices',
        qna: [
            { question: 'Can I add custom fields to Invoices?', answer: 'Yes! Custom item fields such as Batch No, Expiry Date, IMEI, Size etc can be added to items and invoices. Click on Item Settings button at the top of the Inventory Screen to add custom fields to your items. To Show/Hide these custom fields in your invoices, click on the "+" button next to the Amount column of the items table in Create Invoice.', expanded: false },
            { question: 'Can I add custom fields for items? Will they show on invoice?', answer: 'Yes! Custom item fields such as Batch No, Expiry Date, IMEI, Size etc can be added to items and invoices. Click on Item Settings button at the top of the Inventory Screen to add custom fields to your items. To Show/Hide these custom fields in your invoices, click on the "+" button next to the Amount column of the items table in Create Invoice.', expanded: false },
            { question: 'What are the printing options available on My BillBook?', answer: '', expanded: false },
        ],
    },
    // Add more categories with questions as needed
];

const HelpSupport = () => {
    const [selectedCategory, setSelectedCategory] = useState(categories[0]);
    const [qnaState, setQnaState] = useState(questions);
    const [openModal, setOpenModal] = useState(false);
    const [formData, setFormData] = useState({ name: '', phone: '', feedback: '' });

    const handleCategoryClick = (category) => {
        setSelectedCategory(category);
    };

    const handleToggleExpand = (categoryIndex, questionIndex) => {
        setQnaState((prevQnaState) => {
            const newQnaState = [...prevQnaState];
            newQnaState[categoryIndex].qna[questionIndex].expanded = !newQnaState[categoryIndex].qna[questionIndex].expanded;
            return newQnaState;
        });
    };

    const handleOpenModal = () => setOpenModal(true);
    const handleCloseModal = () => setOpenModal(false);

    const handleChange = (event) => {
        setFormData({ ...formData, [event.target.name]: event.target.value });
    };

    const handleSubmit = async (event) => {
        event.preventDefault();
        try {
            await axios.post('/api/feedback', formData);
            handleCloseModal(); // Close modal on successful submission
            // Optionally, reset form data
            setFormData({ name: '', phone: '', feedback: '' });
        } catch (error) {
            console.error('Error submitting feedback:', error);
        }
    };

    const handleWhatsAppClick = () => {
        const phoneNumber = '8340719781'; // Indian phone number without leading '+'
        const message = 'Hello, I would like to get in touch with support.';
        const url = `https://wa.me/91${phoneNumber}?text=${encodeURIComponent(message)}`;
        window.open(url, '_blank');
    };

    return (
        <Box display="flex" flexDirection="column" height="100vh">
            <Box p={2} mt="auto" bgcolor="#f5f5f5">
                <Grid container spacing={2} justifyContent="center">
                    <Grid item>
                        <Button variant="contained" color="primary" startIcon={<PhoneIcon />}>
                            Call us 8340719781
                        </Button>
                    </Grid>
                    <Grid item>
                        <Button variant="contained" color="success" startIcon={<WhatsAppIcon />} onClick={handleWhatsAppClick}>
                            WhatsApp us 8340719781
                        </Button>
                    </Grid>
                    <Grid item>
                        <Button variant="contained" color="secondary" startIcon={<ShareIcon />} onClick={handleOpenModal}>
                            Share Suggestion
                        </Button>
                    </Grid>
                </Grid>
            </Box>
            <Box display="flex" flex={1}>
                <Paper elevation={3} sx={{ width: '20%', p: 2, height: 'max-content' }}>
                    <Box sx={{
                        height: 'calc(88vh - 100px)',
                        overflow: 'auto',
                        '&::-webkit-scrollbar': {
                            display: 'none'
                        },
                        scrollbarWidth: 'none',
                        msOverflowStyle: 'none'
                    }}>
                        <List>
                            {categories.map((category, index) => (
                                <ListItem
                                    button
                                    key={index}
                                    selected={category === selectedCategory}
                                    onClick={() => handleCategoryClick(category)}
                                >
                                    <ListItemText primary={category} />
                                </ListItem>
                            ))}
                        </List>
                    </Box>
                </Paper>
                <Box flex={1} p={3}>
                    {qnaState
                        .filter((q) => q.category === selectedCategory)
                        .map((q, categoryIndex) => (
                            <Box key={categoryIndex}>
                                {q.qna.map((item, questionIndex) => (
                                    <Box key={questionIndex} mb={2}>
                                        <Box display="flex" justifyContent="space-between" alignItems="center">
                                            <Typography variant="h6">{item.question}</Typography>
                                            <IconButton onClick={() => handleToggleExpand(categoryIndex, questionIndex)}>
                                                {item.expanded ? <RemoveIcon /> : <AddIcon />}
                                            </IconButton>
                                        </Box>
                                        {item.expanded && <Typography>{item.answer}</Typography>}
                                        <Divider />
                                    </Box>
                                ))}
                            </Box>
                        ))}
                </Box>
            </Box>
            <Modal
                open={openModal}
                onClose={handleCloseModal}
                closeAfterTransition
                BackdropComponent={Backdrop}
                BackdropProps={{ timeout: 500 }}
            >
                <Fade in={openModal}>
                    <Box
                        sx={{
                            position: 'absolute',
                            top: '50%',
                            left: '50%',
                            transform: 'translate(-50%, -50%)',
                            width: 400,
                            bgcolor: 'background.paper',
                            border: '2px solid #000',
                            boxShadow: 24,
                            p: 4,
                        }}
                    >
                        <Typography variant="h6" mb={2}>
                            Share Your Suggestion
                        </Typography>
                        <form onSubmit={handleSubmit}>
                            <TextField
                                fullWidth
                                label="Name"
                                name="name"
                                value={formData.name}
                                onChange={handleChange}
                                margin="normal"
                                required
                            />
                            <TextField
                                fullWidth
                                label="Phone"
                                name="phone"
                                value={formData.phone}
                                onChange={handleChange}
                                margin="normal"
                                required
                            />
                            <TextField
                                fullWidth
                                label="Feedback"
                                name="feedback"
                                value={formData.feedback}
                                onChange={handleChange}
                                margin="normal"
                                multiline
                                rows={4}
                                required
                            />
                            <Box mt={2}>
                                <Button type="submit" variant="contained" color="primary">
                                    Submit
                                </Button>
                            </Box>
                        </form>
                    </Box>
                </Fade>
            </Modal>
        </Box>
    );
};

export default HelpSupport;
