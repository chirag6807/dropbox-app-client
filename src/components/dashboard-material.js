import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Drawer from '@material-ui/core/Drawer';
import AppBar from '@material-ui/core/AppBar';
import CssBaseline from '@material-ui/core/CssBaseline';
import Toolbar from '@material-ui/core/Toolbar';
import List from '@material-ui/core/List';
import Typography from '@material-ui/core/Typography';
import Divider from '@material-ui/core/Divider';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import InboxIcon from '@material-ui/icons/MoveToInbox';
import MailIcon from '@material-ui/icons/Mail';
import PersonIcon from '@material-ui/icons/Person';
import ExitToAppIcon from '@material-ui/icons/ExitToApp';


import IconButton from '@material-ui/core/IconButton';
import MenuIcon from '@material-ui/icons/Menu';
import AccountCircle from '@material-ui/icons/AccountCircle';
import Switch from '@material-ui/core/Switch';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import FormGroup from '@material-ui/core/FormGroup';
import MenuItem from '@material-ui/core/MenuItem';
import Menu from '@material-ui/core/Menu';

const drawerWidth = 240;

const useStyles = makeStyles((theme) => ({
    root: {
        display: 'flex',
    },
    appBar: {
        zIndex: theme.zIndex.drawer + 1,
    },
    drawer: {
        width: drawerWidth,
        flexShrink: 0,
    },
    drawerPaper: {
        width: drawerWidth,
    },
    drawerContainer: {
        overflow: 'auto',
    },
    content: {
        flexGrow: 1,
        padding: theme.spacing(3)
    },
    toolbarButtons: {
        marginLeft: 'auto',
    },
}));



export default function ClippedDrawer() {
    const classes = useStyles();
    const [auth, setAuth] = React.useState(true);
    const [anchorEl, setAnchorEl] = React.useState(null);
    const open = Boolean(anchorEl);

    const handleChange = (event) => {
        setAuth(event.target.checked);
    };

    const handleMenu = (event) => {
        setAnchorEl(event.currentTarget);
    };

    const handleClose = () => {
        setAnchorEl(null);
    };

    const logoutButtonClick = () => {
        localStorage.clear();
        window.history.pushState(null, null, window.location.replace('/'));
      //  window.location.replace('/');
    }

    const profileButtonClick = () => {
        window.history.pushState(null, null, window.location.replace('/profile'));
     //   window.location.replace('/profile');
    }
    const fileMenuClick = () => {
        window.history.pushState(null, null,  window.location.replace('/file-store/Home'));
       // window.location.replace('/file-store');
    }


    return (
        <div className={classes.root}>

            <CssBaseline />
            <AppBar className={classes.appBar} style={{ flex: 1 }}>
                <Toolbar>
                    <Typography variant="h6" noWrap>
                        DROPBOX
                    </Typography>

                    <div className={classes.toolbarButtons}>
                        <IconButton
                            aria-label="account of current user"
                            aria-controls="menu-appbar"
                            aria-haspopup="true"
                            onClick={handleMenu}
                            color="inherit" edge="end"
                        >
                            <AccountCircle />
                        </IconButton>
                        <Menu id="menu-appbar"
                            anchorEl={anchorEl}
                            anchorOrigin={{
                                vertical: 'top',
                                horizontal: 'right',
                            }}
                            keepMounted
                            transformOrigin={{
                                vertical: 'top',
                                horizontal: 'right',
                            }}
                            open={open}
                            onClose={handleClose}
                        >
                            <MenuItem onClick={profileButtonClick}>

                                <PersonIcon />

                                Profile
                                </MenuItem>

                            <MenuItem onClick={logoutButtonClick}>

                                <ExitToAppIcon/>
                            Logout

                                </MenuItem>
                        </Menu>
                    </div>

                </Toolbar>
            </AppBar>
            <Drawer
                className={classes.drawer}
                variant="permanent"
                classes={{
                    paper: classes.drawerPaper,
                }}
            >
                <Toolbar />
                <div className={classes.drawerContainer}>
                    <List>
                        <ListItem button onClick={fileMenuClick} >
                            <ListItemIcon><InboxIcon /> </ListItemIcon>
                            <ListItemText primary="File Store" />
                        </ListItem>
                        <ListItem button>
                            <ListItemIcon><InboxIcon /> </ListItemIcon>
                            <ListItemText primary="File Send" />
                        </ListItem>


                    </List>


                </div>
            </Drawer>
            <main className={classes.content}>
                <Toolbar />
                {/* <h1>Chirag Patel</h1> */}



            </main>
        </div>
    );
}
