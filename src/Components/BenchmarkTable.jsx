import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';


const useStyles = makeStyles({
    root: {
        marginRight: "10px",
        // maxWidth: "50vw",
        ['@media (max-width:780px)']: {
           margin: "10px 0",
        
           alignSelf: "center",
           maxWidth: "80vw",
           maxHeight: "20vw"
        
        }
    // },
    },
    table: {
    //    minWidth: 400,
    //    maxWidth: 600,
    //    alignSelf: "flex-start"

    },
    head: {
        backgroundColor: 'black',
        color: 'white'
    },
    cell: {
        color: 'white',
        whiteSpace: 'nowrap',
        ['@media (max-width:780px)']: {
        fontSize: '12px',
        }

    }


});

function createData(built_in, merge_sort, quick_sort, bubble_sort, insertion_sort) {
    return { built_in, merge_sort, quick_sort, bubble_sort, insertion_sort };
}


const BenchmarkTable = (props) => {
    const classes = useStyles();

    const rows = [
        createData(props.built_in, props.merge_sort, props.quick_sort, props.bubble_sort, props.insertion_sort),

    ];


    return (
        <TableContainer className={classes.root} >
            <Table className={classes.table} aria-label="simple table">
                <TableHead className = {classes.head}>
                    <TableRow>
                        <TableCell className = {classes.cell} align="left">Built In Sort</TableCell>
                        <TableCell className={classes.cell} align="left">Merge Sort</TableCell>
                        <TableCell className={classes.cell} align="left">Quick Sort</TableCell>
                        <TableCell className={classes.cell} align="left">Bubble Sort</TableCell>
                        <TableCell className={classes.cell} align="left">Insertion Sort</TableCell>
                    </TableRow>
                </TableHead>
                <TableBody>
                    {rows.map((row, index) => (
                        <TableRow key={index+25}>
                        
                            <TableCell key={index + 1} align="left">{row.built_in}</TableCell>
                            <TableCell key={index + 2} align="left">{row.merge_sort}</TableCell>
                            <TableCell key={index + 3} align="left">{row.quick_sort}</TableCell>
                            <TableCell key={index + 4} align="left">{row.bubble_sort}</TableCell>
                            <TableCell key={index + 5} align="left">{row.insertion_sort}</TableCell>

                        </TableRow>
                    ))}
                </TableBody>
            </Table>
        </TableContainer>
    );
}


export default BenchmarkTable