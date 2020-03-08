
import React from 'react';
import { withStyles, makeStyles } from '@material-ui/core/styles';
import Slider from '@material-ui/core/Slider';
import Typography from '@material-ui/core/Typography';

const useStyles = makeStyles(theme => ({
    root: {
        width: 300 + theme.spacing(3) * 2,
    },
    margin: {
        height: theme.spacing(3),
    },
}));

// function ValueLabelComponent(props) {
//     const { children, open, value } = props;

//     return (
//         <Tooltip open={open} enterTouchDelay={0} placement="top" title={value}>
//             {children}
//         </Tooltip>
//     );
// }




const PrettoSlider = withStyles({
    root: {
        color: 'black',
        height: 8,
        width: 300,
        marginRight: 10,
        right: 10,
        display: "flex"
        //backgroundColor: ''
    },
    thumb: {
        height: 24,
        width: 24,
        backgroundColor: '#fff',
        border: '2px solid currentColor',
        marginTop: -8,
        marginLeft: -12,
        '&:focus,&:hover,&$active': {
            boxShadow: 'inherit',
        },
    },
    active: {},
    valueLabel: {
        left: 'calc(-50% + 4px)',
    },
    track: {
        height: 8,
        borderRadius: 4,
    },
    rail: {
        height: 8,
        borderRadius: 4,
    },
})(Slider);






const CustomizedSlider = (props) => {
    const classes = useStyles();
    var slider;
    var text
    if(props.size){
       
        text= <Typography gutterBottom>Array Size</Typography>
        slider = <PrettoSlider step={props.step} max={props.max} onChange={(event, value) => props.sliderHandle(value)} valueLabelDisplay="auto" aria-label="pretto slider" defaultValue={20} />
    }else {
        text = <Typography gutterBottom>Array Speed</Typography>
        slider = <PrettoSlider step={props.step} max={props.max} onChange={(event, value) => props.speedHandle(value)} valueLabelDisplay="auto" aria-label="pretto slider" defaultValue={20} />
    }

    return (
        <div className={classes.root}>
            {/* <div className={props.styling}> */}
            {text}
            {slider}
            {/* </div> */}
        </div>
    );
}


export default CustomizedSlider