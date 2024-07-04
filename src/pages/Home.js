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
import { Box, Button, Collapse, FormControl, FormControlLabel, IconButton, InputBase, Radio, RadioGroup, Skeleton, Stack, TablePagination, TableSortLabel, Toolbar, Typography } from "@mui/material";
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import KeyboardArrowUpIcon from '@mui/icons-material/KeyboardArrowUp';
import AddIcon from '@mui/icons-material/Add';
import moment from "moment/moment";
import { visuallyHidden } from '@mui/utils';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import RemoveRedEyeOutlinedIcon from '@mui/icons-material/RemoveRedEyeOutlined';
import RestoreFromTrashIcon from '@mui/icons-material/RestoreFromTrash';
import { Link, useNavigate } from "react-router-dom";
import SearchIcon from '@mui/icons-material/Search';

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
    const [isLoading, setIsLoading] = useState(true);
    const [orderBy, setOrderBy] = React.useState('created_at');
    const [page, setPage] = React.useState(0);
    const [rowsPerPage, setRowsPerPage] = React.useState(5);
    const [isDeleted, setIsDeleted] = useState(false);
    const [vitalData, setVitalData] = useState(null);
    const [patientName, setPatientName] = useState('');
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

    const getComparator = React.useCallback((order, orderBy) => {
        return order === 'desc'
            ? (a, b) => descendingComparator(a, b, orderBy)
            : (a, b) => -descendingComparator(a, b, orderBy);
    }, []);

    const visibleRows = React.useMemo(
        () =>
            stableSort(rows, getComparator(order, orderBy)).slice(
                page * rowsPerPage,
                page * rowsPerPage + rowsPerPage,
            ),
        [rows, getComparator, order, orderBy, page, rowsPerPage],
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

    const getVitalData = React.useCallback(async (name) => {
        setIsLoading(true);
        let query = "http://localhost:8000/api/vitaldata/"
        if (isDeleted) {
            query += "?filter=include_deleted"
            if (name) {
                query += `&q=${name}`
            }

            const data = await axios.get(query)
            setVitalData(data.data)
        } else {
            if (name) {
                query += `?q=${name}`
            }

            const data = await axios.get(query)
            setVitalData(data.data)
        }
    }, [isDeleted, setIsLoading, setVitalData]);

    const handleChange = () => {
        setIsDeleted(!isDeleted);
    };

    const handleDelete = async (id) => {
        setIsLoading(true);
        await axios.delete(`http://localhost:8000/api/vitaldata/${id}/`);
        await getVitalData();
    }

    const handleRestore = async (id) => {
        setIsLoading(true);
        await axios.post(`http://localhost:8000/api/vitaldata/${id}/restore/`);
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
                    <TableCell align="center" sx={{
                        ...(row.ews_score < 1 && { color: 'green' }),
                        ...(row.ews_score >= 1 && row.ews_score < 2 && { color: '#FFD300' }),
                        ...(row.ews_score >= 2 && row.ews_score < 3 && { color: '#CC7722' }),
                        ...(row.ews_score >= 3 && { color: 'red' })
                    }}>{row.ews_score}</TableCell>
                    <TableCell align="center">{moment(row.created_at).format("LLL")}</TableCell>
                    <TableCell align="center">{row.deleted_at ? moment(row.deleted_at).format("LLL") : '-'}</TableCell>
                    <TableCell align="center">
                        {
                            row.deleted_at === null ? (
                                <Box justifyContent={'space-between'}>
                                    <RemoveRedEyeOutlinedIcon onClick={() => navigate(`/Detail/${row.id}`)} sx={{ color: "blue", margin: "3px", cursor: 'pointer' }} />
                                    <EditIcon onClick={() => navigate(`/form/${row.id}`)} sx={{ color: "orange", margin: "3px", cursor: 'pointer' }} />
                                    <DeleteIcon onClick={() => handleDelete(row.id)} sx={{ color: "red", margin: "3px", cursor: 'pointer' }} />
                                </Box>
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
                                            <TableCell>Gender</TableCell>
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
                                        <TableCell component="th" scope="row">
                                            {row.biometrics.gender}
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

    const handleSubmitResult = (event) => {
        event.preventDefault();
        getVitalData(patientName);

        console.log(event);
    }

    useEffect(() => {
        if (vitalData) {
            const table = []
            vitalData.forEach((data) => {
                table.push(createData(
                    data.id,
                    data.patient.name,
                    data.respiration_rate.toFixed(2),
                    data.oxygen_saturation.toFixed(2),
                    data.pulse.toFixed(2),
                    data.systol.toFixed(2),
                    data.diastol.toFixed(2),
                    data.ews_score.toFixed(2),
                    data.created_at,
                    data.deleted_at,
                    {
                        age: data.patient.age,
                        height: data.patient.height,
                        weight: data.patient.weight,
                        gender: data.patient.gender
                    }
                ))
            })
            setRows(table)
        }

        setIsLoading(false)
    }, [vitalData])

    useEffect(() => {
        getVitalData()
    }, [isDeleted, getVitalData])

    return isLoading ? (
        <Box sx={{ width: '100%', display: 'flex', flexWrap: 'wrap', alignItems: 'center' }}>
            <Skeleton variant="rectangular" width={'100%'} height={600} />
        </Box>
    ) : (
        <Box sx={{ width: '100%', display: 'flex', flexWrap: 'wrap', alignItems: 'center' }}>
            <Paper sx={{ width: '100%', mb: 2 }}>
                <Toolbar>
                    <Stack
                        direction={{ xs: 'column', sm: 'row' }}
                        sx={{ flex: '1 1 100%', gap: 2 }}
                    >
                        <Typography
                            variant="h6"
                            id="tableTitle"
                            component="div"
                        >
                            Vital Signs
                        </Typography>
                        <Link to="/form" style={{ textDecoration: 'none' }}>
                            <Button
                                startIcon={<AddIcon />}
                                variant="contained"
                            >Add New</Button>
                        </Link>

                    </Stack>
                    <FormControl sx={{ flex: '100%', flexDirection: 'column', justifyContent: 'flex-end' }}>
                        <RadioGroup row aria-label="position" name="position" defaultValue={isDeleted} sx={{ justifyContent: 'flex-end' }}>
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
                        <Paper
                            component="form"
                            sx={{ p: '2px 4px', display: 'flex', alignItems: 'center', width: 325, alignSelf: 'flex-end' }}
                            onSubmit={handleSubmitResult}
                        >
                            <InputBase
                                sx={{ ml: 1, flex: 1 }}
                                placeholder="Search Patient Name"
                                InputLabelProps={{ shrink: true, }}
                                value={patientName}
                                onChange={(e) => setPatientName(e.target.value)}
                            />
                            <IconButton type="button" sx={{ p: '10px' }} aria-label="search">
                                <SearchIcon />
                            </IconButton>
                        </Paper>
                    </FormControl>
                </Toolbar>
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
                            {visibleRows.length === 0 && (
                                <TableRow>
                                    <TableCell colSpan={11} align="center">
                                        No data available
                                    </TableCell>
                                </TableRow>
                            )}
                            {visibleRows.map((row) => {
                                return (
                                    <Row key={row.name} row={row} />
                                )
                            })}
                            {emptyRows > 0 && visibleRows.length !== 0 && (
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