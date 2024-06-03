import { Box, Button, Card, CardContent, CircularProgress, Container, Divider, Typography } from "@mui/material";
import axios from "axios";
import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import ArrowBackIcon from '@mui/icons-material/ArrowBack';


function Detail() {
    const { id } = useParams();
    const [dataDetail, setDataDetail] = useState();
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        const getDetail = async () => {
            try {
                const { data } = await axios.get(`http://127.0.0.1:8000/api/vitaldata/${id}`);
                setDataDetail(data);
                setIsLoading(false);
                console.log("Data:", data);
            } catch (error) {
                console.error("Error fetching detail:", error);
            }
        }

        getDetail();
    }, [id])

    return isLoading ? (
        <Box sx={{
            width: '100%',
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center'
        }}>
            <CircularProgress size={80} />
        </Box>
    ) : (
        <Box margin={4} sx={{ width: '100%' }}>
            <Container>
                <Typography variant='h5' sx={{ paddingTop: 8, fontWeight: 'bold' }}>
                    Patient Detail Score
                </Typography>
                <Typography variant='body1' sx={{ paddingTop: 2, fontWeight: 'bold' }}>
                    <span style={{ width: '120px', float: 'left' }}>Patient Name</span>
                    <span>: {dataDetail.patient.name}</span>
                </Typography>
                <Typography variant='body1' sx={{ fontWeight: 'bold' }}>
                    <span style={{ width: '120px', float: 'left' }}>Patient Gender</span>
                    <span>: {dataDetail.patient.gender}</span>
                </Typography>
                <Typography variant='body1' sx={{ fontWeight: 'bold' }}>
                    <span style={{ width: '120px', float: 'left' }}>Patient Age</span>
                    <span>: {dataDetail.patient.age}</span>
                </Typography>
            </Container>
            <Container>
                <Container sx={{
                    display: 'flex',
                    justifyContent: 'center',
                    alignItems: 'center',
                    flexDirection: 'column',
                    paddingTop: 4,
                    position: 'relative'
                }}>
                    <Card sx={{ minWidth: 659 }}>
                        <CardContent>
                            <Typography sx={{ mb: 1.5, display: 'flex', flexDirection: 'row' }} color="text.secondary">
                                <span style={{
                                    width: '100%',
                                    float: 'left'
                                }}>Respiration Rate</span>
                                <span style={{
                                    width: '100%',
                                    float: 'right'
                                }}>: {dataDetail.calculations.respiration_rate}</span>
                            </Typography>
                            <Typography sx={{ mb: 1.5, display: 'flex', flexDirection: 'row' }} color="text.secondary">
                                <span style={{
                                    width: '100%',
                                    float: 'left'
                                }}>Oxygen Saturation</span>
                                <span style={{
                                    width: '100%'
                                }}>: {dataDetail.calculations.oxygen_saturation}</span>
                            </Typography>
                            <Typography sx={{ mb: 1.5, display: 'flex', flexDirection: 'row' }} color="text.secondary">
                                <span style={{
                                    width: '100%',
                                    float: 'left'
                                }}>Pulse</span>
                                <span style={{
                                    width: '100%'
                                }}>: {dataDetail.calculations.pulse}</span>
                            </Typography>
                            <Typography sx={{ mb: 1.5, display: 'flex', flexDirection: 'row' }} color="text.secondary">
                                <span style={{
                                    width: '100%',
                                    float: 'left'
                                }}>Systolic Blood Pressure</span>
                                <span style={{
                                    width: '100%'
                                }}>: {dataDetail.calculations.systol}</span>
                            </Typography>
                            <Typography sx={{ mb: 1.5, display: 'flex', flexDirection: 'row' }} color="text.secondary">
                                <span style={{
                                    width: '100%',
                                    float: 'left'
                                }}>Diastolic Blood Pressure</span>
                                <span style={{
                                    width: '100%'
                                }}>: {dataDetail.calculations.diastol}</span>
                            </Typography>
                            <Typography sx={{ mb: 1.5, display: 'flex', flexDirection: 'row' }} color="text.secondary">
                                <span style={{
                                    width: '100%',
                                    float: 'left'
                                }}>Temperature</span>
                                <span style={{
                                    width: '100%'
                                }}>: {dataDetail.calculations.temperature}</span>
                            </Typography>
                            <div style={{
                                display: 'flex',
                                flexDirection: 'row',
                            }}>
                                <Divider variant="middle" />
                                <Typography color="text.secondary">
                                    Average
                                </Typography>
                            </div>
                            <Typography sx={{ mb: 1.5, mt: 1.5, fontWeight: 'bold', display: 'flex', flexDirection: 'row' }} color="#0165FC">
                                <span style={{
                                    width: '100%',
                                    float: 'left'
                                }}>EWS Score</span>
                                <span style={{
                                    width: '100%'
                                }}>: {dataDetail.ews_score.toFixed(2)}</span>
                            </Typography>
                        </CardContent>
                    </Card>
                    <div style={{ position: 'absolute', bottom: -50, left: 247 }}>
                        <Link to="/home" style={{ textDecoration: 'none' }}>
                            <Button
                                startIcon={<ArrowBackIcon />}
                                variant="contained"
                            >
                                Back
                            </Button>
                        </Link>
                    </div>
                </Container>
            </Container>
        </Box>


    );
}

export default Detail;