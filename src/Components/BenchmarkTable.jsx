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
    table: {
    //    minWidth: 400,
    //    maxWidth: 600,
    //    alignSelf: "flex-start"
    },
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
        <TableContainer className={props.styling} >
            <Table className={classes.table} aria-label="simple table">
                <TableHead>
                    <TableRow>
                        <TableCell align="right">Built In Sort</TableCell>
                        <TableCell align="right">Merge Sort</TableCell>
                        <TableCell align="right">Quick Sort</TableCell>
                        <TableCell align="right">Bubble Sort</TableCell>
                        <TableCell align="right">Insertion Sort</TableCell>
                    </TableRow>
                </TableHead>
                <TableBody>
                    {rows.map((row, index) => (
                        <TableRow key={index+25}>
                        
                            <TableCell key={index + 1} align="right">{row.built_in}</TableCell>
                            <TableCell key={index + 2} align="right">{row.merge_sort}</TableCell>
                            <TableCell key={index + 3}align="right">{row.quick_sort}</TableCell>
                            <TableCell key={index + 4} align="right">{row.bubble_sort}</TableCell>
                            <TableCell key={index + 5} align="right">{row.insertion_sort}</TableCell>

                        </TableRow>
                    ))}
                </TableBody>
            </Table>
        </TableContainer>
    );
}


export default BenchmarkTable