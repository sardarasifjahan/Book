import {Header} from "../Header";
import computer from '../../images/computer.webp'
import Industry from '../../images/Industry.webp'
import '../Image.css';
import Modal from '@mui/joy/Modal';
import ModalClose from '@mui/joy/ModalClose';
import {
    Box,
    Button,
    Card,
    CardContent,
    CardHeader,
    Grid,
    Link,
    List,
    ListItem,
    ListItemText,
    TextField,
    Typography
} from "@mui/material";
import {makeStyles} from '@material-ui/core/styles';
import Paper from '@mui/material/Paper';
import InputBase from '@mui/material/InputBase';
import PhoneIcon from '@mui/icons-material/Phone';
import IconButton from '@mui/material/IconButton';
import EastTwoToneIcon from '@mui/icons-material/EastTwoTone';
import * as React from 'react';
import {Transition} from 'react-transition-group';
import Divider from '@mui/material/Divider';
import {Sheet} from "@mui/joy";
import axios from "axios";
import {SAVE_TEMP_PASSWORD} from "../apiendpoint/APIEndPoint";
import {useDispatch} from "react-redux";

const useStyles = makeStyles({
    root: {
        background: 'linear-gradient(45deg, #FE6B8B 30%, #FF8E53 90%)',
        border: 0,
        borderRadius: 3,
        boxShadow: '0 3px 5px 2px rgba(255, 105, 135, .3)',
        color: 'white',
        height: 48,
        padding: '0 30px',
    },
});

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
const MyMemoizedFunction = React.memo(generateRandomAlphaNumeric);
export const HesabbookHome = ({onBooleanChange}) => {
    const randomValue = generateRandomAlphaNumeric(5);
    const [open, setOpen] = React.useState(false);
    const [phone, setPhone] = React.useState('');
    const [openPassword, setOpenPassword] = React.useState(false);
    const [otpPassword, setOtpPassword] = React.useState('');
    const [user, setUser] = React.useState({mobileNumber: '', tempPassword: ''});
    const dispatch = useDispatch();
    let axiosConfig = {
        headers: {
            'Content-Type': 'application/json;charset=UTF-8',
            "Access-Control-Allow-Origin": "*",
        }
    };
    const handleOpen = (e) => {
        setOpen(true);
        setOtpPassword(MyMemoizedFunction(5));

    };
    const handleClose = () => {
        setOpen(false)
    };
    const handlePhoneChange = (value) => {
        setPhone(value);
    };
    const handleOtpPassword = () => {
        setOpenPassword(false);
        setOtpPassword(null);
    }

    const toggleDrawer = (newOpen) => () => {
        setOpen(newOpen);
    };
    const classes = useStyles();
    {
        /*
        handle to open new tab...
         */
    }
    const handleClick = (e) => {
        handleSubmitToApi();
        e.preventDefault();
        setOpenPassword(true);
        handleClose();
    };

    function handleSubmit() {
    }

    const handleSubmitToApi = async () => {
        try {
            const response = await axios.post(SAVE_TEMP_PASSWORD, {
                mobileNumber: phone,
                tempPassword: otpPassword
            }, axiosConfig);


        } catch (error) {
            console.error('Error:', error);
        }
    };
    const tiers = [
        {
            title: 'Silver',
            price: '10',
            description: [
                '10GB Storage',
                '10 Emails',
                '10 Domains',
                'Endless Support',
            ],
            buttonText: 'Sign Up',
            buttonVariant: 'outlined',
            color: 'silver',
            hoverBorderColor: '#c0c0c0', // Silver hover border color
        },
        {
            title: 'Gold',
            price: '25',
            description: [
                '25GB Storage',
                '25 Emails',
                '25 Domains',
                'Endless Support',
            ],
            buttonText: 'Sign Up',
            buttonVariant: 'contained',
            color: 'gold',
            hoverBorderColor: '#ffd700', // Gold hover border color
        },
        {
            title: 'Platinum',
            price: '50',
            description: [
                '50GB Storage',
                '50 Emails',
                '50 Domains',
                'Endless Support',
            ],
            buttonText: 'Sign Up',
            buttonVariant: 'outlined',
            color: 'platinum',
            hoverBorderColor: '#e5e4e2', // Platinum hover border color
        },
    ];
    return (
        <>
            <Header onBooleanChange={onBooleanChange}></Header>
            <Box style={{
                backgroundImage: `url(${computer})`, height: '600px', width: '100%'
            }}>
                <Box sx={{
                    width: '100%', paddingRight: '150px',
                    marginTop: '200px',
                    display: 'inline-grid',
                    justifyContent: 'right'
                }}>
                    <Paper
                        component="form"
                        sx={{
                            p: '2px 4px', display: 'flex', alignItems: 'center', width: 400,
                            border: '2px solid black'
                        }}>
                        <IconButton sx={{p: '10px'}} aria-label="menu">
                            <PhoneIcon sx={{color: "#212121"}}/>
                        </IconButton>
                        <InputBase
                            sx={{ml: 1, flex: 1}}
                            placeholder="+91   Enter Mobile Number"
                            inputProps={{'aria-label': 'search google maps'}}
                            onChange={(e) => handlePhoneChange(e.target.value)}
                        />
                        <Divider sx={{height: 28, m: 0.5}} orientation="vertical"/>
                        <IconButton color="primary" sx={{p: '10px'}} aria-label="directions">
                            <EastTwoToneIcon onClick={handleOpen} sx={{color: "green"}}/>
                        </IconButton>
                    </Paper>
                </Box>
            </Box>
            <Box sx={{padding: '20px', backgroundColor: '#f5f5f5', color: '#333'}}>
                <Grid container alignItems="center" justifyContent="space-between">
                    <Grid item xs={12} md={6}>
                        <Typography variant="h3" component="h1" gutterBottom sx={{color: '#333'}}>
                            Solutions tailored for your industry
                        </Typography>
                        <Typography variant="body1" sx={{marginBottom: '20px', color: '#666'}}>
                            No matter what industry you're in, your business is unique. Don't settle for a
                            one-size-fits-all solution. Sage Intacct is built to suit your industry's specific needs.
                        </Typography>
                        <Box sx={{display: 'flex', flexWrap: 'wrap', gap: '10px'}}>
                            {[
                                "Accountants & CPA firms",
                                "Biotech & life sciences",
                                "Construction",
                                "Contractor",
                                "Financial Services",
                                "Franchise",
                                "Healthcare",
                                "Hospitality",
                                "Nonprofit",
                                "Professional services",
                                "Retail",
                                "SaaS & subscription",
                                "Wholesale Distribution",
                                "All industries"
                            ].map((industry, index) => (
                                <Link
                                    key={index}
                                    href="#"
                                    underline="hover"
                                    sx={{fontSize: '1.1rem', color: '#0073e6'}}
                                >
                                    {industry}
                                </Link>
                            ))}
                        </Box>
                    </Grid>
                    <Grid item xs={12} md={5}>
                        <Box
                            component="img"
                            src={Industry}
                            alt="Industry Solutions"
                            sx={{maxWidth: '100%', height: 'auto'}}
                        />
                    </Grid>
                </Grid>
            </Box>

            <Box align="center" sx={{padding: '20px', backgroundColor: '#f5f5f5'}}>
                <Typography variant="h2" align="center" sx={{
                    marginTop: '20px', marginBottom: '50px',
                }}>
                    Get more than just great software
                </Typography>
                <Typography variant="h5" align="center" sx={{
                    marginBottom: '50px',
                }}>
                    All Sage customers are part of the Sage community. As a Sage member, you can enjoy benefits,
                    connect with experts and industry peers, and get insights that help you and your business.
                </Typography>
                <Grid container spacing={4} justifyContent="center">
                    {tiers.map((tier, index) => (
                        <Grid item key={index} xs={12} sm={6} md={4}>
                            <Card
                                sx={{
                                    height: '100%',
                                    display: 'flex',
                                    flexDirection: 'column',
                                    border: `2px solid ${tier.color}`,
                                    transition: 'border-color 0.3s ease, box-shadow 0.3s ease',
                                    '&:hover': {
                                        borderColor: tier.hoverBorderColor,
                                        boxShadow: '0px 10px 20px rgba(0, 0, 0, 0.1)', // Add shadow on hover
                                    },
                                }}
                            >
                                <CardHeader
                                    title={tier.title}
                                    titleTypographyProps={{align: 'center', color: 'white', variant: 'h4'}}
                                    sx={{backgroundColor: '#212121'}}
                                />
                                <CardContent
                                    sx={{
                                        flexGrow: 1,
                                        transition: 'box-shadow 0.3s ease',
                                        '&:hover': {
                                            boxShadow: '0px 10px 20px rgba(0, 0, 0, 0.2)', // Add shadow to CardContent on hover
                                        }
                                    }}
                                >
                                    <List>
                                        {tier.description.map((line, i) => (
                                            <React.Fragment key={i}>
                                                <ListItem>
                                                    <ListItemText primary={line} sx={{textAlign: 'center'}}/>
                                                </ListItem>
                                                {i < tier.description.length - 1 && <Divider sx={{
                                                    backgroundColor: '#212121',
                                                    height: '2px'  // Increase the thickness of the divider
                                                }}/>} {/* Add Divider */}
                                            </React.Fragment>
                                        ))}
                                    </List>
                                    <Divider sx={{
                                        marginY: 2, backgroundColor: '#212121',
                                        height: '2px'
                                    }}/> {/* Divider before price */}
                                    <Typography variant="h4" align="center" sx={{marginTop: '20px'}}>
                                        ${tier.price}
                                    </Typography>
                                    <Typography variant="subtitle1" align="center" sx={{color: 'text.secondary'}}>
                                        per month
                                    </Typography>
                                </CardContent>
                                <Box sx={{display: 'flex', justifyContent: 'center', padding: '16px'}}>
                                    <Button
                                        variant={tier.buttonVariant}
                                        color="primary"
                                        sx={{backgroundColor: tier.buttonVariant === 'contained' ? '#4caf50' : 'inherit'}}
                                    >
                                        {tier.buttonText}
                                    </Button>
                                </Box>
                            </Card>
                        </Grid>
                    ))}
                </Grid>
            </Box>
            {/*Footer*/}
            <Box sx={{backgroundColor: '#212121', color: 'whitesmoke', padding: '30px 0'}}>
                <Box sx={{display: 'flex', justifyContent: 'space-between', padding: '0 100px'}}>
                    <Box>
                        <Typography variant="h5" color="green" sx={{marginBottom: '10px'}}>
                            About
                        </Typography>
                        <Box sx={{display: 'flex', flexDirection: 'column', gap: '6px'}}>
                            <Typography variant="caption" sx={{cursor: 'pointer', '&:hover': {color: 'green'}}}>Contact
                                Us</Typography>
                            <Typography variant="caption" sx={{cursor: 'pointer', '&:hover': {color: 'green'}}}>About
                                Us</Typography>
                            <Typography variant="caption"
                                        sx={{cursor: 'pointer', '&:hover': {color: 'green'}}}>Careers</Typography>
                            <Typography variant="caption" sx={{cursor: 'pointer', '&:hover': {color: 'green'}}}>HesabBook
                                Stories</Typography>
                            <Typography variant="caption"
                                        sx={{cursor: 'pointer', '&:hover': {color: 'green'}}}>Press</Typography>
                            <Typography variant="caption" sx={{cursor: 'pointer', '&:hover': {color: 'green'}}}>Corporate
                                Information</Typography>
                        </Box>
                    </Box>
                    <Box>
                        <Typography variant="h5" color="green" sx={{marginBottom: '10px'}}>
                            Help
                        </Typography>
                        <Box sx={{display: 'flex', flexDirection: 'column', gap: '6px'}}>
                            <Typography variant="caption"
                                        sx={{cursor: 'pointer', '&:hover': {color: 'green'}}}>Payments</Typography>
                            <Typography variant="caption"
                                        sx={{cursor: 'pointer', '&:hover': {color: 'green'}}}>Shipping</Typography>
                            <Typography variant="caption" sx={{cursor: 'pointer', '&:hover': {color: 'green'}}}>Cancellation
                                & Returns</Typography>
                            <Typography variant="caption"
                                        sx={{cursor: 'pointer', '&:hover': {color: 'green'}}}>FAQ</Typography>
                            <Typography variant="caption" sx={{cursor: 'pointer', '&:hover': {color: 'green'}}}>Report
                                Infringement</Typography>
                        </Box>
                    </Box>
                    <Box>
                        <Typography variant="h5" color="green" sx={{marginBottom: '10px'}}>
                            Policy
                        </Typography>
                        <Box sx={{display: 'flex', flexDirection: 'column', gap: '6px'}}>
                            <Typography variant="caption" sx={{cursor: 'pointer', '&:hover': {color: 'green'}}}>Return
                                Policy</Typography>
                            <Typography variant="caption" sx={{cursor: 'pointer', '&:hover': {color: 'green'}}}>Terms Of
                                Use</Typography>
                            <Typography variant="caption"
                                        sx={{cursor: 'pointer', '&:hover': {color: 'green'}}}>Security</Typography>
                            <Typography variant="caption"
                                        sx={{cursor: 'pointer', '&:hover': {color: 'green'}}}>Privacy</Typography>
                            <Typography variant="caption"
                                        sx={{cursor: 'pointer', '&:hover': {color: 'green'}}}>Sitemap</Typography>
                            <Typography variant="caption" sx={{cursor: 'pointer', '&:hover': {color: 'green'}}}>EPR
                                Compliance</Typography>
                        </Box>
                    </Box>
                    <Box>
                        <Typography variant="h5" color="green" sx={{marginBottom: '10px'}}>
                            Social
                        </Typography>
                        <Box sx={{display: 'flex', flexDirection: 'column', gap: '6px'}}>
                            <Typography variant="caption"
                                        sx={{cursor: 'pointer', '&:hover': {color: 'green'}}}>Facebook</Typography>
                            <Typography variant="caption"
                                        sx={{cursor: 'pointer', '&:hover': {color: 'green'}}}>Instagram</Typography>
                            <Typography variant="caption"
                                        sx={{cursor: 'pointer', '&:hover': {color: 'green'}}}>WhatsApp</Typography>
                            <Typography variant="caption"
                                        sx={{cursor: 'pointer', '&:hover': {color: 'green'}}}>Telegram</Typography>
                            <Typography variant="caption"
                                        sx={{cursor: 'pointer', '&:hover': {color: 'green'}}}>Twitter</Typography>
                            <Typography variant="caption"
                                        sx={{cursor: 'pointer', '&:hover': {color: 'green'}}}>YouTube</Typography>
                        </Box>
                    </Box>
                    <Divider orientation="vertical" flexItem sx={{backgroundColor: 'green', height: 'auto'}}/>
                    <Box sx={{paddingLeft: '40px'}}>
                        <Typography variant="h6" color="green">
                            Registered Office Address
                        </Typography>
                        <Box sx={{
                            display: 'flex',
                            flexDirection: 'column',
                            gap: '6px',
                            color: 'whitesmoke',
                            paddingTop: '10px'
                        }}>
                            <Typography variant="caption" display="block" gutterBottom>HesabBook Private
                                Limited,</Typography>
                            <Typography variant="caption" display="block" gutterBottom>House No-103,
                                Ward-24</Typography>
                            <Typography variant="caption" display="block" gutterBottom>At-Patel Nagar,
                                PO-Phusro</Typography>
                            <Typography variant="caption" display="block" gutterBottom>PS-Bermo,
                                Dist-Bokaro</Typography>
                            <Typography variant="caption" display="block" gutterBottom>Jharkhand, 829144,
                                India</Typography>
                        </Box>
                    </Box>
                </Box>
                <Divider sx={{backgroundColor: 'green', marginY: '30px'}}/>
                <Box sx={{display: 'flex', justifyContent: 'space-around', padding: '0 100px', color: 'whitesmoke'}}>
                    <Typography sx={{cursor: 'pointer', '&:hover': {color: 'green'}}}>Accounting & Billing</Typography>
                    <Typography sx={{cursor: 'pointer', '&:hover': {color: 'green'}}}>Advertise</Typography>
                    <Typography sx={{cursor: 'pointer', '&:hover': {color: 'green'}}}>Gift Cards</Typography>
                    <Typography sx={{cursor: 'pointer', '&:hover': {color: 'green'}}}>Help Center</Typography>
                    <Typography sx={{cursor: 'pointer', '&:hover': {color: 'green'}}}>Q & A</Typography>
                    <Typography sx={{cursor: 'pointer', '&:hover': {color: 'green'}}}>@2024-HesabBook.com</Typography>
                </Box>
            </Box>

            <Transition in={open} timeout={400}>
                <Modal
                    open={open}
                    onClose={handleClose}
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
                                Login/Registration
                            </Typography>
                            <Box component="form" onSubmit={handleSubmit} noValidate sx={{mt: 1}}>
                                <TextField
                                    margin="normal"
                                    required
                                    fullWidth
                                    id="phone"
                                    label="+91 Enter Your Mobile Number"
                                    name="phone"
                                    autoComplete="phone"
                                    value={phone}
                                    autoFocus
                                />
                                <TextField
                                    margin="normal"
                                    required
                                    fullWidth
                                    id="otp"
                                    label="Temporary Password"
                                    name="tempPassword"
                                    autoComplete="tempPassword"
                                    value={otpPassword}
                                    autoFocus
                                    disabled={true}
                                />
                                <a
                                    href={require('../../file/software.msi')}
                                    download="software.msi"
                                    target="_blank"
                                    rel="noreferrer"
                                >
                                    <Button
                                        type="submit"
                                        fullWidth
                                        variant="contained"
                                        onClick={handleClick}
                                        sx={{mt: 3, mb: 2, color: "whitesmoke", background: '#212121'}}
                                    >
                                        Submit
                                    </Button>
                                </a>
                            </Box>
                        </Box>
                    </Box>
                </Modal>
            </Transition>
            <Modal
                aria-labelledby="modal-title"
                aria-describedby="modal-desc"
                open={openPassword}
                onClose={handleOtpPassword}
                sx={{display: 'flex', justifyContent: 'center', alignItems: 'center'}}>
                <Sheet
                    variant="outlined"
                    sx={{
                        maxWidth: 500,
                        borderRadius: 'md',
                        p: 3,
                        boxShadow: 'lg',
                    }}
                >
                    <ModalClose variant="plain" sx={{m: 1}}/>
                    <Typography></Typography>
                    <br/>
                    <Typography
                        component="h2"
                        id="modal-title"
                        level="h2"
                        textColor="inherit"
                        fontWeight="lg"
                        mb={2}
                    >
                        This is the temporary Password. Please save need for login.
                    </Typography><br/>
                    <Typography id="modal-desc" textColor="text.tertiary" sx={{textAlign: 'center'}} variant="h1"
                                component="h2">
                        {otpPassword}
                    </Typography>
                </Sheet>
            </Modal>
        </>
    )
}

function generateRandomAlphaNumeric(length) {
    const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    let result = '';
    for (let i = 0; i < length; i++) {
        result += characters.charAt(Math.floor(Math.random() * characters.length));
    }
    return result;
}
