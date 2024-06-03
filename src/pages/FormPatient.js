import { useNavigate, useParams } from "react-router-dom";
import "../assets/css/pages/Form.css";
import axios from "axios";
import { Box, Button, FormControl, InputLabel, MenuItem, Select, TextField } from "@mui/material";
import { useEffect, useState } from "react";

function FormPatient() {
    const { id } = useParams();
    const [isLoading, setIsLoading] = useState(true);
    const [name, setName] = useState('');
    const [gender, setGender] = useState('');
    const [age, setAge] = useState(null);
    const [height, setHeight] = useState(null);
    const [weight, setWeight] = useState(null);
    const navigate = useNavigate();

    const handleSubmit = async () => {
        const formData = {
            name: name,
            gender: gender,
            age: parseInt(age),
            height: parseFloat(height),
            weight: parseFloat(weight),
        };

        if (id) {
            console.log("edit", formData);
            // Add axios PUT request here for editing

            try {
                await axios.patch(`http://localhost:8000/api/patients/${id}/`, formData);
                alert("Patient Data edited successfully!");
                navigate("/Patient");
            } catch (error) {

            }
        } else {
            console.log("create", formData);

            try {
                await axios.post(`http://localhost:8000/api/patients/`, formData);
                alert("Patient Data created successfully!");
                navigate("/Patient");
            } catch (error) {
                console.log("Error creating Patient Data:", error);
            }
        }
    };

    const getVitalData = async () => {
        try {
            const vitalData = await axios.get(`http://localhost:8000/api/patients/${id}`);
            setName(vitalData.data.name);
            setGender(vitalData.data.gender);
            setAge(vitalData.data.age);
            setHeight(vitalData.data.height);
            setWeight(vitalData.data.weight);
        } catch (error) {
            console.error("Error fetching Patient Data:", error);
        }
    }

    useEffect(() => {
        if (id) {
            getVitalData();
        }
        setIsLoading(false);
    }, []);

    return !isLoading && (
        <div className="form-web">
            <div className="form-container">
                <div className="form-card">
                    <div className="form-card-head">
                        <h2>Patient Data Form</h2>
                    </div>
                    <div className="form-card-body">
                        <div className="form-body-left">
                            <Box
                                component="form"
                                display="flex"
                                sx={{ flexDirection: 'column', gap: 2 }}
                            >
                                <TextField
                                    id="name"
                                    label="Name"
                                    type="text"
                                    InputLabelProps={{
                                        shrink: true,
                                    }}
                                    value={name}
                                    onChange={(e) => setName(e.target.value)}
                                />
                                <FormControl fullWidth>
                                    <InputLabel id="gender-label">Gender</InputLabel>
                                    <Select
                                        labelId="gender-label"
                                        id="gender-select"
                                        value={gender}
                                        label="Gender"
                                        onChange={(e) => setGender(e.target.value)}
                                    >
                                        <MenuItem value={'Male'}>Male</MenuItem>
                                        <MenuItem value={'Female'}>Female</MenuItem>
                                    </Select>
                                </FormControl>
                                <TextField
                                    id="age"
                                    label="Age"
                                    type="number"
                                    InputLabelProps={{
                                        shrink: true,
                                    }}
                                    value={age}
                                    onChange={(e) => setAge(e.target.value)}
                                />
                                <TextField
                                    id="height"
                                    label="Height"
                                    type="number"
                                    InputLabelProps={{
                                        shrink: true,
                                    }}
                                    value={height}
                                    onChange={(e) => setHeight(e.target.value)}
                                />
                                <TextField
                                    id="weight"
                                    label="Weight"
                                    type="number"
                                    InputLabelProps={{
                                        shrink: true,
                                    }}
                                    value={weight}
                                    onChange={(e) => setWeight(e.target.value)}
                                />
                            </Box>
                        </div>
                    </div>
                    <Box sx={{ marginTop: 2, width: '100%' }}>
                        <Button
                            onClick={handleSubmit}
                            variant="contained"
                        >Submit</Button>
                    </Box>
                </div>
            </div>
        </div>
    );
}

export default FormPatient;
