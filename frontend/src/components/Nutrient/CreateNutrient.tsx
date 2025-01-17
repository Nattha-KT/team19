import React, { useEffect, useState } from 'react';
import { Container, Box } from '@mui/system';
import { AdapterDateFns } from "@mui/x-date-pickers/AdapterDateFns";
import { LocalizationProvider } from '@mui/x-date-pickers';
import { DateTimePicker } from '@mui/x-date-pickers/DateTimePicker';
import { Link } from "react-router-dom";
import { 
    Select,
    SelectChangeEvent,
    Stack,
    Typography,
    InputAdornment,
    TextField,
    Button,
    Snackbar,
 } from '@mui/material';
import MuiAlert, { AlertProps } from "@mui/material/Alert";

 //Interface
import { MostNutrientInterface } from '../../interfaces/IMostNutrient';
import { FoodInformationInterface } from '../../interfaces/IFoodInformation';
import { AdminInterface } from '../../interfaces/IAdmin';
import { NutrientInterface } from '../../interfaces/INutrient';

//API
import { 
    GetFoodInformations,
    GetAdminByID,
    GetMostNutrient,
    CreateNutrient,
 } from '../../services/HttpClientService';

const Alert = React.forwardRef<HTMLDivElement, AlertProps>(function Alert(
    props,
    ref
  ) {
    return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
});

function CreateNutrientUI() {

const [nutrient, setNutrient] = useState<NutrientInterface>({});
const [mostnutrient, setMostNutrient] = useState<MostNutrientInterface[]>([]);
const [foodinformation, setFoodInformation] = useState<FoodInformationInterface[]>([]);
const [date, setDate] = useState<Date | string | null>(new Date());
const [admin, setAdmin] = useState<AdminInterface>({ Name: ""});
const [success, setSuccess] = useState(false);
const [error, setError] = useState(false);
const [message, setAlertMessage] = React.useState("");

const handleClose = (
    event?: React.SyntheticEvent | Event,
    reason?: string
  ) => {
    if (reason === "clickaway") {
      return;
    }
    setSuccess(false);
    setError(false);
};

const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const name = e.target.name;
    console.log(name);
    setNutrient({ ...nutrient, [name]: e.target.value });
};

const handleSelectChange = (event: SelectChangeEvent) => {
    const name = event.target.name as keyof typeof nutrient;
    setNutrient({
      ...nutrient,
      [name]: event.target.value,
    });
};

const convertType = (data: string | number | undefined) => {
    let val = typeof data === "string" ? parseInt(data) : data;
    return val;
};

//FectAPI
const fetchMostNutrients = async () => {
    let res = await GetMostNutrient();
    res && setMostNutrient(res);
};

const fetchFoodInformation = async () => {
    let res = await GetFoodInformations();
    res && setFoodInformation(res);
};

const fetchAdminByID = async () => {
    let res = await GetAdminByID();
    nutrient.AdminID = res.ID;
    if (res) {
      setAdmin(res);
    }
};

// เพิ่มข้อมูลเข้า Database
const submit = async () => {
    let data = {
      MostNutrientID: convertType(nutrient.MostNutrientID),
      FoodInformationID: convertType(nutrient.FoodInformationID),
      AdminID: convertType(nutrient.AdminID),
      Comment: nutrient.Comment,
      TotalCalorie: convertType(nutrient.TotalCalorie),
      Date: date?.toLocaleString(),
      };

      let res = await CreateNutrient(data);
      if (res.status) {
        setSuccess(true);
        setAlertMessage("บันทึกสารอาหารสำเร็จ");
        window.location.href = "/admin/nutrient-display"
      } else {
        setError(true);
        setAlertMessage(res.message);
      }
      console.log(JSON.stringify(data))
};

useEffect(() => {
    fetchMostNutrients();
    fetchFoodInformation();
    fetchAdminByID();
}, []);


    return(
        <Container sx={{height: "100vh"}}>

            <Snackbar
                open={success}
                autoHideDuration={1000}
                onClose={handleClose}
                anchorOrigin={{ vertical: "bottom", horizontal: "center" }}
                >
                <Alert onClose={handleClose} severity="success">
                    {message}
                </Alert>
            </Snackbar>

            <Snackbar
                open={error}
                autoHideDuration={1000}
                onClose={handleClose}
                anchorOrigin={{ vertical: "bottom", horizontal: "center" }}
                >
                <Alert onClose={handleClose} severity="error">
                    {message}
                </Alert>
            </Snackbar>

            <Box
                sx={{
                display: 'flex',
                flexWrap: 'wrap',
                '& > :not(style)': {
                m: 1,
                },
                }}
            >

            <h1>เพิ่มข้อมูลสารอาหาร</h1>

            </Box>

            <h1> </h1>

            <Stack direction="row" spacing={3}>
            
            {/* ชื่ออาหาร */}
            <Typography variant="h2" component="h1">
            อาหาร:
            </Typography>
            <Box
                sx={{
                    width: "30%",
                }}
            >
                <Select
                    native
                    fullWidth
                    id="food_information"
                    value={nutrient.FoodInformationID + ""}
                    onChange={handleSelectChange}
                    inputProps={{
                    name: "FoodInformationID",
                    }}
                >
                <option aria-label="None" value="">
                    เลือกอาหารที่ต้องการใส่ข้อมูล
                </option>
                {foodinformation.map((item: FoodInformationInterface) => (
                <option key={item.ID} value={item.ID}>
                    {item.Name}
                </option>
                ))}
                </Select>
            </Box>
            
            {/* หมู่อาหารที่พบมาก */}
            <Typography variant="h2" component="h1" mt={2}>
            หมู่อาหารที่พบมากและแคลอรี่ทั้งหมด:
            </Typography>
            <Box
                sx={{
                    width: "18%",
                }}
            >
                <Select
                    native
                    fullWidth
                    id="mostnutrient"
                    value={nutrient.MostNutrientID + ""}
                    onChange={handleSelectChange}
                    inputProps={{
                    name: "MostNutrientID",
                    }}
                >
                <option aria-label="None" value="">
                    ใส่ข้อมูล
                </option>
                {mostnutrient.map((item: MostNutrientInterface) => (
                <option key={item.ID} value={item.ID}>
                    {item.Name}
                </option>
                ))}
                </Select>
            </Box>
            
            {/* แคลอรี่ทั้งหมด */}
            <TextField
                label="แคลอรี่ทั้งหมดของอาหาร"
                id="totalcalorie"
                type="number"
                name="TotalCalorie"
                placeholder="กรอกแคลอรี่"
                onChange={handleInputChange}
                value={nutrient.TotalCalorie}
                sx={{ m: 1, width: '17%' }}
                InputProps={{
                    startAdornment: <InputAdornment position="start">Kcal</InputAdornment>,
                    inputProps: {min: 0}
                }}
            />
            
            </Stack>

            <h1> </h1>

            <Stack direction="row" spacing={3}>
            <Typography variant="h2" component="h1">
                ความคิดเห็นเกี่ยวกับอาหาร (*ห้ามเกิน 50 ตัวอักษร) :
            </Typography>
            </Stack>

            <Stack direction="row" spacing={3}>
                {/* ความคิดเห็นเกี่ยวกับอาหาร */}
                <TextField
                    id="comment"
                    name="Comment"
                    value={nutrient.Comment}
                    onChange={handleInputChange}
                    multiline
                    placeholder="กรอกความคิดเห็นเกี่ยวกับอาหาร"
                    minRows={8}
                    sx={{
                        fontSize: "1.5rem",
                        minWidth: "100%",
                        minHeight: 200,
                    }}
                />

            </Stack>

            <h1> </h1>

            <Stack direction="row" spacing={3}>

                {/* วันเวลาที่ทำการเพิ่ม */}
                <Typography variant="h2" component="h1">
                วันเวลาที่ทำการเพิ่ม :
                </Typography>
                <Box
                sx={{
                    display: "flex",
                    flexDirection: "column",
                    // gap: "2rem",
                    mt: 2,
                    }}>
                <Box
                    sx={{
                        width: "255px"
                    }}>
                    <LocalizationProvider dateAdapter={AdapterDateFns}>
                        <DateTimePicker
                        renderInput={(props) => <TextField
                            fullWidth
                            {...props} />}
                        label="เลือกวันที่และเวลา"
                        readOnly
                        value={date}
                        onChange={(newValue) => {
                            setDate(newValue);
                        }}
                        />
                    </LocalizationProvider>
                    </Box>
                </Box>

                {/* Admin ถูก Lock เป็น Disable*/}
                <Typography variant="h2" component="h1">
                ผู้ดูแลที่ทำการเพิ่มข้อมูล:
                </Typography>
                <Box sx={{ width: "30%" }}>
                <TextField
                    fullWidth
                    disabled
                    id="admin"
                    label="ผู้ดูแล"
                    value={admin.Name}
                />
                </Box>

            </Stack>

            <h2> </h2>

            <Stack direction="row" spacing={3}>

                {/* ปุ่มยืนยันและย้อนกลับ */}

                <Button variant="outlined" color="success" onClick={submit}
                    sx = {{ borderRadius: 20 }}>
                        เพิ่มสารอาหาร
                </Button>

                <Link
                    to="/admin/nutrient-display"
                    style={{
                    textDecoration: "none",
                    }}
                >
                <Button variant="outlined" color="secondary"
                    sx = {{ borderRadius: 20 }}>
                    ย้อนกลับ
                </Button>
                </Link>

            </Stack>

            

        </Container>
    );
}

export default CreateNutrientUI;