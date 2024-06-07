import React, { useEffect, useState } from "react";
import "../assets/css/pages/TableEws.css";
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import axios from "axios";

function createData(
    vitalData,
    min3,
    min2,
    min1,
    zero,
    plus1,
    plus2,
    plus3,
) {
    return {
        vitalData, min3, min2, min1, zero, plus1, plus2, plus3
    };
}

function TableEws() {
    const [pulse, setPulse] = useState(null);
    const [systol, setSystol] = useState(null);
    const [diastol, setDiastol] = useState(null);
    const [respiration, setRespiration] = useState(null);
    const [oxygen, setOxygen] = useState(null);
    const [rows, setRows] = useState([]);

    const getLatestTableEws = async () => {
        const pulse = await axios.get("http://localhost:8000/api/centilemodel/Pulse/getLatest/");
        const systol = await axios.get("http://localhost:8000/api/centilemodel/Systol/getLatest/");
        const diastol = await axios.get("http://localhost:8000/api/centilemodel/Diastol/getLatest/");
        const respiration = await axios.get("http://localhost:8000/api/centilemodel/Respiration/getLatest/");
        const oxygen = await axios.get("http://localhost:8000/api/centilemodel/Oxygen/getLatest/");

        setPulse(pulse.data);
        setSystol(systol.data);
        setDiastol(diastol.data);
        setRespiration(respiration.data);
        setOxygen(oxygen.data);
    }

    useEffect(() => {
        if (!pulse || !systol || !diastol || !respiration || !oxygen) return;

        setRows([
            createData(pulse.vital_model.name,
                `< ${pulse.first_percentile}`,
                `${pulse.first_percentile} - ${pulse.fifth_percentile}`,
                `${pulse.fifth_percentile} - ${pulse.tenth_percentile}`,
                `${pulse.tenth_percentile} - ${pulse.ninetieth_percentile}`,
                `${pulse.ninetieth_percentile} - ${pulse.ninetyfifth_percentile}`,
                `${pulse.ninetyfifth_percentile} - ${pulse.ninetyninth_percentile}`,
                `> ${pulse.ninetyninth_percentile}`
            ),
            createData(systol.vital_model.name,
                `< ${systol.first_percentile}`,
                `${systol.first_percentile} - ${systol.fifth_percentile}`,
                `${systol.fifth_percentile} - ${systol.tenth_percentile}`,
                `${systol.tenth_percentile} - ${systol.ninetieth_percentile}`,
                `${systol.ninetieth_percentile} - ${systol.ninetyfifth_percentile}`,
                `${systol.ninetyfifth_percentile} - ${systol.ninetyninth_percentile}`,
                `> ${systol.ninetyninth_percentile}`
            ),
            createData(diastol.vital_model.name,
                `< ${diastol.first_percentile}`,
                `${diastol.first_percentile} - ${diastol.fifth_percentile}`,
                `${diastol.fifth_percentile} - ${diastol.tenth_percentile}`,
                `${diastol.tenth_percentile} - ${diastol.ninetieth_percentile}`,
                `${diastol.ninetieth_percentile} - ${diastol.ninetyfifth_percentile}`,
                `${diastol.ninetyfifth_percentile} - ${diastol.ninetyninth_percentile}`,
                `> ${diastol.ninetyninth_percentile}`
            ),
            createData(respiration.vital_model.name,
                `< ${respiration.first_percentile}`,
                `${respiration.first_percentile} - ${respiration.fifth_percentile}`,
                `${respiration.fifth_percentile} - ${respiration.tenth_percentile}`,
                `${respiration.tenth_percentile} - ${respiration.ninetieth_percentile}`,
                `${respiration.ninetieth_percentile} - ${respiration.ninetyfifth_percentile}`,
                `${respiration.ninetyfifth_percentile} - ${respiration.ninetyninth_percentile}`,
                `> ${respiration.ninetyninth_percentile}`
            ),
            createData(oxygen.vital_model.name,
                `< ${oxygen.first_percentile}`,
                `${oxygen.first_percentile} - ${oxygen.fifth_percentile}`,
                `${oxygen.fifth_percentile} - ${oxygen.tenth_percentile}`,
                `${oxygen.tenth_percentile} - ${oxygen.ninetieth_percentile}`,
                ``,
                ``,
                `> ${oxygen.ninetyninth_percentile}`
            )
        ]);

    }, [pulse, systol, diastol, respiration, oxygen])

    useEffect(() => {
        getLatestTableEws();
    }, [])

    return (
        <div className="tableEws-page">
            <div className="tableEws-table">
                <TableContainer component={Paper}>
                    <Table sx={{ minWidth: 650 }} aria-label="simple table">
                        <TableHead>
                            <TableRow>
                                <TableCell>Vital Data</TableCell>
                                <TableCell align="center">3</TableCell>
                                <TableCell align="center">2</TableCell>
                                <TableCell align="center">1</TableCell>
                                <TableCell align="center">0</TableCell>
                                <TableCell align="center">1</TableCell>
                                <TableCell align="center">2</TableCell>
                                <TableCell align="center">3</TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {rows.map((row) => (
                                <TableRow
                                    key={row.vitalData}
                                    sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                                >
                                    <TableCell component="th" scope="row">
                                        {row.vitalData}
                                    </TableCell>
                                    <TableCell align="center">{row.min3}</TableCell>
                                    <TableCell align="center">{row.min2}</TableCell>
                                    <TableCell align="center">{row.min1}</TableCell>
                                    <TableCell align="center">{row.zero}</TableCell>
                                    <TableCell align="center">{row.plus1}</TableCell>
                                    <TableCell align="center">{row.plus2}</TableCell>
                                    <TableCell align="center">{row.plus3}</TableCell>
                                </TableRow>
                            ))}
                        </TableBody>
                    </Table>
                </TableContainer>
            </div>
        </div>
    );
}

export default TableEws;