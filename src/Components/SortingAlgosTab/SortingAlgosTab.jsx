import React from 'react';
import '../../App.css';
import { makeStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import Typography from '@material-ui/core/Typography';
import Box from '@material-ui/core/Box';
import BarSort from '../BarSort/BarSort';



const SortingAlgosTab = (props) => {

    const classes = useStyles();
    const [value, setValue] = React.useState(0);

    const handleChange = (event, newValue) => {
        setValue(newValue);
    };

    return (
        <div className={classes.root}>
            <AppBar position="static" style={{ backgroundColor: 'black'}}>
                <Tabs value={value} onChange={handleChange} aria-label="simple tabs example" >
                    <Tab label="Insertion Sort" {...a11yProps(0)} />
                    <Tab label="Bubble Sort" {...a11yProps(1)} />
                    <Tab label="Quick Sort" {...a11yProps(2)} />
                    <Tab label="Merge Sort" {...a11yProps(3)} />

                </Tabs>
            </AppBar>
            <TabPanel value={value} index={0}>
                <BarSort algoToUse = "insertion"></BarSort>
             </TabPanel>
            <TabPanel value={value} index={1}>
                <BarSort algoToUse="bubble"></BarSort>
            </TabPanel>
            <TabPanel value={value} index={2}>
                <BarSort algoToUse="quicksort"></BarSort>           
            </TabPanel>
            <TabPanel value={value} index={3}>
                <BarSort algoToUse="mergesort"></BarSort>
            </TabPanel>
        </div>
    );




}


function TabPanel(props) {
    const { children, value, index, ...other } = props;

    return (
        <Typography
            component="div"
            role="tabpanel"
            hidden={value !== index}
            id={`simple-tabpanel-${index}`}
            aria-labelledby={`simple-tab-${index}`}
            {...other}
        >
            {value === index && <Box p={3}>{children}</Box>}
        </Typography>
    );
}



function a11yProps(index) {
    return {
        id: `simple-tab-${index}`,
        'aria-controls': `simple-tabpanel-${index}`,
    };
}

const useStyles = makeStyles(theme => ({
    root: {
        flexGrow: 1,
       // backgroundColor: theme.palette.background.paper,
       // backgroundColor: 'green',
        height: "600px"

    },
}));



export default SortingAlgosTab 