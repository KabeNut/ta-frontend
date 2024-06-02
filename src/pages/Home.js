import React, { Fragment, useEffect, useState } from "react";
import "../assets/css/pages/Home.css";
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import axios from "axios";
import { Box, Collapse, FormControl, FormControlLabel, IconButton, Radio, RadioGroup, TablePagination, TableSortLabel, Toolbar, Typography } from "@mui/material";
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import KeyboardArrowUpIcon from '@mui/icons-material/KeyboardArrowUp';
import moment from "moment/moment";
import { visuallyHidden } from '@mui/utils';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import RestoreFromTrashIcon from '@mui/icons-material/RestoreFromTrash';
import { useNavigate } from "react-router-dom";

function createData(
    id,
    patient,
    respiration,
    oxygen,
    pulse,
    systol,
    diastol,
    ews_score,
    created_at,
    deleted_at,
    biometrics
) {
    return {
        id,
        patient,
        respiration,
        oxygen,
        pulse,
        systol,
        diastol,
        ews_score,
        created_at,
        deleted_at,
        biometrics
    };
}

function Home() {
    const [order, setOrder] = React.useState('asc');
    const [orderBy, setOrderBy] = React.useState('created_at');
    const [page, setPage] = React.useState(0);
    const [rowsPerPage, setRowsPerPage] = React.useState(5);
    const [isDeleted, setIsDeleted] = useState(false);
    const [vitalData, setVitalData] = useState(null);
    const [rows, setRows] = useState([]);
    const navigate = useNavigate();
    const headCells = [
        {
            id: 'patient',
            numeric: false,
            disablePadding: true,
            label: 'Patient',
        },
        {
            id: 'respiration',
            numeric: true,
            disablePadding: false,
            label: 'Respiration Rate',
        },
        {
            id: 'oxygen',
            numeric: true,
            disablePadding: false,
            label: 'Oxygen Saturation',
        },
        {
            id: 'pulse',
            numeric: true,
            disablePadding: false,
            label: 'Pulse',
        },
        {
            id: 'systol',
            numeric: true,
            disablePadding: false,
            label: 'Systol',
        },
        {
            id: 'diastol',
            numeric: true,
            disablePadding: false,
            label: 'Diastol',
        },
        {
            id: 'ews_score',
            numeric: true,
            disablePadding: false,
            label: 'EWS Score',
        },
        {
            id: 'created_at',
            numeric: false,
            disablePadding: false,
            label: 'Created At',
        },
        {
            id: 'deleted_at',
            numeric: false,
            disablePadding: false,
            label: 'Deleted At',
        }
    ]
    const emptyRows = Math.max(0, (1 + page) * rowsPerPage - rows.length);
    const visibleRows = React.useMemo(
        () =>
            stableSort(rows, getComparator(order, orderBy)).slice(
                page * rowsPerPage,
                page * rowsPerPage + rowsPerPage,
            ),
        [order, orderBy, page, rowsPerPage, rows],
    );

    function descendingComparator(a, b, orderBy) {
        if (b[orderBy] < a[orderBy]) {
            return -1;
        }
        if (b[orderBy] > a[orderBy]) {
            return 1;
        }
        return 0;
    }

    function getComparator(order, orderBy) {
        return order === 'desc'
            ? (a, b) => descendingComparator(a, b, orderBy)
            : (a, b) => -descendingComparator(a, b, orderBy);
    }

    function stableSort(array, comparator) {
        const stabilizedThis = array.map((el, index) => [el, index]);
        stabilizedThis.sort((a, b) => {
            const order = comparator(a[0], b[0]);
            if (order !== 0) {
                return order;
            }
            return a[1] - b[1];
        });
        return stabilizedThis.map((el) => el[0]);
    }

    const handleRequestSort = (event, property) => {
        const isAsc = orderBy === property && order === 'asc';
        setOrder(isAsc ? 'desc' : 'asc');
        setOrderBy(property);
    }

    const handleChangePage = (event, newPage) => {
        setPage(newPage);
    }

    const handleChangeRowsPerPage = (event) => {
        setRowsPerPage(parseInt(event.target.value, 10));
        setPage(0);
    }

    const getVitalData = async () => {
        if (isDeleted) {
            const data = await axios.get("http://127.0.0.1:8000/api/vitaldata?filter=include_deleted")
            setVitalData(data.data)
        } else {
            const data = await axios.get("http://127.0.0.1:8000/api/vitaldata")
            setVitalData(data.data)
        }
    }

    const handleChange = () => {
        setIsDeleted(!isDeleted);
    };

    const handleDelete = async (id) => {
        console.log("event", id)
        await axios.delete(`http://127.0.0.1:8000/api/vitaldata/${id}/`);
        await getVitalData();
    }

    const handleRestore = async (id) => {
        await axios.post(`http://127.0.0.1:8000/api/vitaldata/${id}/restore/`);
        await getVitalData();
    }

    function EnhancedTableHead(props) {
        const { order, orderBy, onRequestSort } = props;
        const createSortHandler = (property) => (event) => {
            onRequestSort(event, property);
        };

        return (
            <TableHead>
                <TableRow>
                    <TableCell />
                    {headCells.map((headCell) => (
                        <TableCell
                            key={headCell.id}
                            align={'center'}
                            padding={headCell.disablePadding ? 'none' : 'normal'}
                            sortDirection={orderBy === headCell.id ? order : false}
                        >
                            <TableSortLabel
                                active={orderBy === headCell.id}
                                direction={orderBy === headCell.id ? order : 'asc'}
                                onClick={createSortHandler(headCell.id)}
                                sx={{ fontWeight: 'bold', maxWidth: '100px' }}
                            >
                                {headCell.label}
                                {orderBy === headCell.id ? (
                                    <Box component="span" sx={visuallyHidden}>
                                        {order === 'desc' ? 'sorted descending' : 'sorted ascending'}
                                    </Box>
                                ) : null}
                            </TableSortLabel>
                        </TableCell>
                    ))}
                    <TableCell
                        align="center"
                        padding="normal"
                    >
                        Actions
                    </TableCell>
                </TableRow>
            </TableHead>
        );
    }

    function EnhancedTableToolbar() {
        return (
            <Toolbar>
                <Typography
                    sx={{ flex: '1 1 100%' }}
                    variant="h6"
                    id="tableTitle"
                    component="div"
                >
                    Vital Data
                </Typography>
                <FormControl sx={{ flex: '100%', flexDirection: 'row-reverse' }}>
                    <RadioGroup row aria-label="position" name="position" defaultValue={isDeleted}>
                        <FormControlLabel
                            value="true"
                            control={<Radio />}
                            label="Show Deleted"
                            labelPlacement="end"
                            onChange={handleChange}
                        />
                        <FormControlLabel
                            value="false"
                            control={<Radio />}
                            label="Don't Show Deleted"
                            labelPlacement="end"
                            onChange={handleChange}
                        />
                    </RadioGroup>
                </FormControl>
            </Toolbar>
        );
    }

    function Row(props) {
        const { row } = props;

        const [open, setOpen] = useState(false);

        return (
            <Fragment>
                <TableRow
                    key={row.id}
                    sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                >
                    <TableCell>
                        <IconButton
                            aria-label="expand row"
                            size="small"
                            onClick={() => setOpen(!open)}
                        >
                            {open ? <KeyboardArrowUpIcon /> : <KeyboardArrowDownIcon />}
                        </IconButton>
                    </TableCell>
                    <TableCell component="th" scope="row">
                        {row.patient}
                    </TableCell>
                    <TableCell align="center">{row.respiration}</TableCell>
                    <TableCell align="center">{row.oxygen}</TableCell>
                    <TableCell align="center">{row.pulse}</TableCell>
                    <TableCell align="center">{row.systol}</TableCell>
                    <TableCell align="center">{row.diastol}</TableCell>
                    <TableCell align="center">{row.ews_score}</TableCell>
                    <TableCell align="center">{moment(row.created_at).format("LLL")}</TableCell>
                    <TableCell align="center">{row.deleted_at !== null ? moment(row.deleted_at).format("LLL") : '-'}</TableCell>
                    <TableCell align="center">
                        {
                            row.deleted_at === null ? (
                                <>
                                    <EditIcon onClick={() => navigate(`/form/${row.id}`)} sx={{ color: "blue", margin: "3px", cursor: 'pointer' }} />
                                    <DeleteIcon onClick={() => handleDelete(row.id)} sx={{ color: "red", margin: "3px", cursor: 'pointer' }} />
                                </>
                            ) : (
                                < RestoreFromTrashIcon sx={{ color: "green", cursor: 'pointer' }} onClick={() => handleRestore(row.id)} />
                            )
                        }
                    </TableCell>
                </TableRow>
                <TableRow>
                    <TableCell style={{ paddingBottom: 0, paddingTop: 0 }} colSpan={6}>
                        <Collapse in={open} timeout="auto" unmountOnExit>
                            <Box sx={{ margin: 1 }}>
                                <Typography variant="h6" gutterBottom component="div">
                                    Biometrics
                                </Typography>
                                <Table size="small" aria-label="purchases">
                                    <TableHead>
                                        <TableRow>
                                            <TableCell>Age</TableCell>
                                            <TableCell>Height</TableCell>
                                            <TableCell>Weight</TableCell>
                                        </TableRow>
                                    </TableHead>
                                    <TableBody>
                                        <TableCell component="th" scope="row">
                                            {row.biometrics.age}
                                        </TableCell>
                                        <TableCell component="th" scope="row">
                                            {row.biometrics.height}
                                        </TableCell>
                                        <TableCell component="th" scope="row">
                                            {row.biometrics.weight}
                                        </TableCell>
                                    </TableBody>
                                </Table>
                            </Box>
                        </Collapse>
                    </TableCell>
                </TableRow>
            </Fragment>
        )
    }

    useEffect(() => {
        if (vitalData) {
            const table = []
            vitalData.forEach((data) => {
                table.push(createData(
                    data.id,
                    data.patient.name,
                    data.respiration_rate,
                    data.oxygen_saturation,
                    data.pulse,
                    data.systol,
                    data.diastol,
                    data.ews_score,
                    data.created_at,
                    data.deleted_at,
                    {
                        age: data.patient.age,
                        height: data.patient.height,
                        weight: data.patient.weight
                    }
                ))
            })
            setRows(table)
        }
    }, [vitalData])

    useEffect(() => {
        getVitalData()
    }, [isDeleted])

    return (
        <Box sx={{ width: '100%', display: 'flex', flexWrap: 'wrap', alignItems: 'center' }}>
            <Paper sx={{ width: '100%', mb: 2 }}>
                <EnhancedTableToolbar />
                <TableContainer>
                    <Table
                        sx={{ minWidth: 750 }}
                        aria-labelledby="tableTitle"
                        size={'medium'}
                    >
                        <EnhancedTableHead
                            order={order}
                            orderBy={orderBy}
                            onRequestSort={handleRequestSort}
                            rowCount={rows.length}
                        />
                        <TableBody>
                            {visibleRows.map((row) => {
                                return (
                                    <Row key={row.name} row={row} />
                                )
                            })}
                            {emptyRows > 0 && (
                                <TableRow
                                    style={{
                                        height: (80) * emptyRows,
                                    }}
                                >
                                    <TableCell colSpan={11} />
                                </TableRow>
                            )}
                        </TableBody>
                    </Table>
                </TableContainer>
                <TablePagination
                    rowsPerPageOptions={[5, 10, 25]}
                    component="div"
                    count={rows.length}
                    rowsPerPage={rowsPerPage}
                    page={page}
                    onPageChange={handleChangePage}
                    onRowsPerPageChange={handleChangeRowsPerPage}
                />
            </Paper>
        </Box>
    );
}

export default Home;