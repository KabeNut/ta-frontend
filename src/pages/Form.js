import { useNavigate, useParams } from "react-router-dom";
import "../assets/css/pages/Form.css";
import axios from "axios";
import { Autocomplete, Box, Button, TextField } from "@mui/material";
import { useEffect, useState } from "react";

function Form() {
    const { id } = useParams();
    const [isLoading, setIsLoading] = useState(true);
    const [patients, setPatients] = useState([]);
    const [selectedPatient, setSelectedPatient] = useState({ label: '', id: '', gender: '' });
    const [gender, setGender] = useState('');
    const [pulse, setPulse] = useState('');
    const [respirationRate, setRespirationRate] = useState('');
    const [systolicBloodPressure, setSystolicBloodPressure] = useState('');
    const [diastolicBloodPressure, setDiastolicBloodPressure] = useState('');
    const [oxygenSaturation, setOxygenSaturation] = useState('');
    const [temperature, setTemperature] = useState('');
    const navigate = useNavigate();

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
                data.push({ label: item.name, id: item.id, gender: item.gender });
            });
        } catch (error) {
            console.error("Error fetching patients:", error);
        }

        setPatients(data);
    };

    useEffect(() => {
        const getVitalData = async () => {
            const vitalData = await axios.get(`http://localhost:8000/api/vitaldata/${id}`);
            setSelectedPatient({ label: vitalData.data.patient.name, id: vitalData.data.patient.id, gender: vitalData.data.patient.gender });
            setGender(vitalData.data.patient.gender);
            setPulse(vitalData.data.pulse);
            setRespirationRate(vitalData.data.respiration_rate);
            setSystolicBloodPressure(vitalData.data.systol);
            setDiastolicBloodPressure(vitalData.data.diastol);
            setOxygenSaturation(vitalData.data.oxygen_saturation);
            setTemperature(vitalData.data.temperature);
        }

        if (id) {
            getVitalData();
        }
        setIsLoading(false);
    }, [patients, id]);

    useEffect(() => {
        getPatients();
    }, []);

    return !isLoading && (
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
                                    value={selectedPatient}
                                    getOptionLabel={(option) => option.label}
                                    renderInput={(params) => <TextField {...params} label="Patient" />}
                                    onChange={(event, newValue) => {
                                        setSelectedPatient(newValue)
                                        setGender(newValue.gender)
                                    }}
                                    isOptionEqualToValue={(option, value) => option.id === value.id}
                                />
                                <TextField
                                    id="gender"
                                    label="Gender"
                                    type="text"
                                    InputLabelProps={{
                                        shrink: true,
                                    }}
                                    value={gender}
                                    disabled
                                />
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
                            </Box>
                        </div>
                        <div className="form-body-right">
                            <Box
                                component="form"
                                display="flex"
                                sx={{ flexDirection: 'column', gap: 2 }}
                            >
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
