import { useNavigate, useParams } from "react-router-dom";
import "../assets/css/pages/Form.css";
import axios from "axios";
import { Autocomplete, Box, Button, FormControl, InputLabel, MenuItem, Select, TextField } from "@mui/material";
import { useEffect, useState } from "react";

function Form() {
    const { id } = useParams();
    const [patients, setPatients] = useState([]);
    const [selectedPatient, setSelectedPatient] = useState(null);
    const [gender, setGender] = useState('');
    const [pulse, setPulse] = useState('');
    const [respirationRate, setRespirationRate] = useState('');
    const [systolicBloodPressure, setSystolicBloodPressure] = useState('');
    const [diastolicBloodPressure, setDiastolicBloodPressure] = useState('');
    const [oxygenSaturation, setOxygenSaturation] = useState('');
    const [temperature, setTemperature] = useState('');
    const navigate = useNavigate();

    const handleChange = (event) => {
        setGender(event.target.value);
    };

    const handleSubmit = async () => {
        const formData = {
            patient: selectedPatient.id ? selectedPatient.id : '',
            respiration_rate: parseFloat(respirationRate),
            pulse: parseFloat(pulse),
            systol: parseFloat(systolicBloodPressure),
            diastol: parseFloat(diastolicBloodPressure),
            oxygen_saturation: parseFloat(oxygenSaturation),
            temperature: parseFloat(temperature)
        };

        if (id) {
            console.log("edit", formData);
            // Add axios PUT request here for editing

            try {
                await axios.patch(`http://localhost:8000/api/vitaldata/${id}/`, formData);
                alert("Vital data edited successfully!");
                navigate("/home");
            } catch (error) {

            }
        } else {
            console.log("create", formData);
            // Add axios POST request here for creating

            try {
                await axios.post(`http://localhost:8000/api/vitaldata/`, formData);
                alert("Vital data created successfully!");
                navigate("/home");
            } catch (error) {
                console.log("Error creating vital data:", error);
            }
        }
    };

    const getPatients = async () => {
        const data = [];
        try {
            const patientResult = await axios.get(`http://localhost:8000/api/patients`);
            patientResult.data.forEach((item) => {
                data.push({ label: item.name, id: item.id });
            });
        } catch (error) {
            console.error("Error fetching patients:", error);
        }

        setPatients(data);
    };

    const getVitalData = async () => {
        try {
            const vitalData = await axios.get(`http://localhost:8000/api/vitaldata/${id}`);
            setSelectedPatient({ label: vitalData.data.patient.name, id: vitalData.data.patient.id });
            setPulse(vitalData.data.pulse);
            setRespirationRate(vitalData.data.respiration_rate);
            setSystolicBloodPressure(vitalData.data.systol);
            setDiastolicBloodPressure(vitalData.data.diastol);
            setOxygenSaturation(vitalData.data.oxygen_saturation);
            setTemperature(vitalData.data.temperature);
        } catch (error) {
            console.error("Error fetching vital data:", error);
        }
    }

    useEffect(() => {
        if (id) {
            getVitalData();
        }
    }, [patients]);

    useEffect(() => {
        getPatients();
    }, []);

    return patients.length !== 0 && (
        <div className="form-web">
            <div className="form-container">
                <div className="form-card">
                    <div className="form-card-head">
                        <h2>Data Vital Form</h2>
                    </div>
                    <div className="form-card-body">
                        <div className="form-body-left">
                            <Box
                                component="form"
                                display="flex"
                                sx={{ flexDirection: 'column', gap: 2 }}
                            >
                                <Autocomplete
                                    required
                                    readOnly={!!id}
                                    options={patients}
                                    defaultValue={selectedPatient}
                                    renderInput={(params) => <TextField {...params} label="Patient" />}
                                    onChange={(event, value) => setSelectedPatient(value)}
                                />
                                {/* <FormControl fullWidth>
                                    <InputLabel id="gender-label">Gender</InputLabel>
                                    <Select
                                        labelId="gender-label"
                                        id="gender-select"
                                        value={gender}
                                        label="Gender"
                                        onChange={handleChange}
                                    >
                                        <MenuItem value={'laki-laki'}>Laki-Laki</MenuItem>
                                        <MenuItem value={'perempuan'}>Perempuan</MenuItem>
                                    </Select>
                                </FormControl> */}
                                <TextField
                                    id="pulse"
                                    label="Pulse"
                                    type="number"
                                    InputLabelProps={{
                                        shrink: true,
                                    }}
                                    value={pulse}
                                    onChange={(e) => setPulse(e.target.value)}
                                />
                                <TextField
                                    id="respiration-rate"
                                    label="Respiration Rate"
                                    type="number"
                                    InputLabelProps={{
                                        shrink: true,
                                    }}
                                    value={respirationRate}
                                    onChange={(e) => setRespirationRate(e.target.value)}
                                />
                                <TextField
                                    id="systolic-blood-pressure"
                                    label="Systolic Blood Pressure"
                                    type="number"
                                    InputLabelProps={{
                                        shrink: true,
                                    }}
                                    value={systolicBloodPressure}
                                    onChange={(e) => setSystolicBloodPressure(e.target.value)}
                                />
                            </Box>
                        </div>
                        <div className="form-body-right">
                            <Box
                                component="form"
                                display="flex"
                                sx={{ flexDirection: 'column', gap: 2 }}
                            >
                                <TextField
                                    id="diastolic-blood-pressure"
                                    label="Diastolic Blood Pressure"
                                    type="number"
                                    InputLabelProps={{
                                        shrink: true,
                                    }}
                                    value={diastolicBloodPressure}
                                    onChange={(e) => setDiastolicBloodPressure(e.target.value)}
                                />
                                <TextField
                                    id="oxygen-saturation"
                                    label="Oxygen Saturation"
                                    type="number"
                                    InputLabelProps={{
                                        shrink: true,
                                    }}
                                    value={oxygenSaturation}
                                    onChange={(e) => setOxygenSaturation(e.target.value)}
                                />
                                <TextField
                                    id="temperature"
                                    label="Temperature"
                                    type="number"
                                    InputLabelProps={{
                                        shrink: true,
                                    }}
                                    value={temperature}
                                    onChange={(e) => setTemperature(e.target.value)}
                                />
                            </Box>
                        </div>
                    </div>
                    <Box sx={{ marginTop: 2, width: '100%' }}>
                        <Button
                            onClick={handleSubmit}
                            sx={{ width: '100%' }}
                            variant="contained"
                        >Submit</Button>
                    </Box>
                </div>
            </div>
        </div>
    );
}

export default Form;
