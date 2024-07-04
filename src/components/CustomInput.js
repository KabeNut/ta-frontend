import { useState } from 'react';
import Paper from '@mui/material/Paper';
import InputBase from '@mui/material/InputBase';
import IconButton from '@mui/material/IconButton';
import SearchIcon from '@mui/icons-material/Search';

export default function CustomizedInputBase({
    setPatientName
}) {
    const [patientName, setName] = useState('');

    const handleChange = (e) => {
        setName(e.target.value);
        setPatientName(e.target.value);
    }

    return (
        <Paper
            component="form"
            sx={{ p: '2px 4px', display: 'flex', alignItems: 'center', width: 325, alignSelf: 'flex-end' }}
        >
            <InputBase
                sx={{ ml: 1, flex: 1 }}
                placeholder="Search Patient Name"
                inputProps={{ 'aria-label': 'search patient name' }}
                value={patientName}
                onChange={handleChange}
            />
            <IconButton type="button" sx={{ p: '10px' }} aria-label="search">
                <SearchIcon />
            </IconButton>
        </Paper>
    );
}