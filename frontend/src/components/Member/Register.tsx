import React, { useState, useEffect } from "react";
import Paper from "@mui/material/Paper";
import Grid from "@mui/material/Unstable_Grid2";
import TextField from "@mui/material/TextField";
import Container from "@mui/material/Container";
import FormLabel from "@mui/material/FormLabel";
import FormHelperText from "@mui/material/FormHelperText";
import Select, { SelectChangeEvent } from "@mui/material/Select";
import Button from "@mui/material/Button";
import Snackbar from "@mui/material/Snackbar";
import MuiAlert, { AlertProps } from "@mui/material/Alert";
import IconButton from "@mui/material/IconButton";
import OutlinedInput from "@mui/material/OutlinedInput";
import InputLabel from "@mui/material/InputLabel";
import InputAdornment from "@mui/material/InputAdornment";
import { Box } from "@mui/system";
import {styled} from "@mui/material";
import bg2 from "../../images/MemberBG2.jpg"


import Visibility from "@mui/icons-material/Visibility";
import VisibilityOff from "@mui/icons-material/VisibilityOff";
import { Link } from "react-router-dom";

import { MemberInterface } from "../../interfaces/IMember";
import { ReligionInterface } from "../../interfaces/IReligion";
import { StatusInterface } from "../../interfaces/IStatus";
import { GenderInterface } from "../../interfaces/IGender";
import { CreateMember } from "../../services/HttpClientService";

 // กำหนดความกว้างของรูป
const ImgBox = styled(Box)({
    width: "280px",
  });

const Alert = React.forwardRef<HTMLDivElement, AlertProps>(function Alert(
  props,
  ref
) {
  return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
});

function RegisterMember() {
  // =========================(Use State)====================================================

  const [member, setMember] = useState<MemberInterface>({});
  const [gender, setGender] = useState<GenderInterface[]>([]);
  const [status, setStatus] = useState<StatusInterface[]>([]);
  const [religion, setReligion] = useState<ReligionInterface[]>([]);
  const [profileuser, setProfileUser] = useState({ name: "", src: "" });

  const [success, setSuccess] = useState(false);
  const [error, setError] = useState(false);
  const [message,setAlertMessage] = React.useState("")

  const [pass, setPass] = React.useState<State>({
    password: "",
    showPassword: false,
  });


  interface State {
    password: string;
    showPassword: boolean;
  }
  // ==============================(handle Images)=====================================
  const handleChangeImages = (event: any, id?: string) => {
    const input = event.target.files[0];
    const name = event.target.name as keyof typeof member;
    var reader = new FileReader();
    reader.readAsDataURL(input);
    reader.onload = function () {
      const dataURL = reader.result;
      setProfileUser({ name: input.name, src: dataURL?.toString() as string });
      if (event.target.name === "ProfileUser") {
        setMember({ ...member, [name]: dataURL?.toString() });
      }
    };
  };
  // ==============================(handle password)=====================================
  const handlePassword =
    (prop: keyof State) => (event: React.ChangeEvent<HTMLInputElement>) => {
      setPass({ ...pass, [prop]: event.target.value });
    };

    // ==============================(handle ShowPassword)=====================================
  const handleClickShowPassword = () => {
    setPass({
      ...pass,
      showPassword: !pass.showPassword,
    });
  };

  const handleMouseDownPassword = (
    event: React.MouseEvent<HTMLButtonElement>
  ) => {
    event.preventDefault();
  };

  // =========================(handleClose)====================================================

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

  // =========================(HandleChange)====================================================

  const handleChange = (event: SelectChangeEvent) => {
    const name = event.target.name as keyof typeof member;
    console.log(event.target.name);
    console.log(event.target.value);
    setMember({
      ...member,
      [name]: event.target.value,
    });
    console.log(member);
  };

  // =========================(HandleInputChange)====================================================
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const name = e.target.name;
    console.log(name);
    setMember({ ...member, [name]: e.target.value });
  };


  // =========================(Fetch API)====================================================

  const apiUrl = "http://localhost:8080";
  const requestOptionsGet = {
    method: "GET",
    headers: { "Content-Type": "application/json" },
  };

  const fetchGender = async () => {
    fetch(`${apiUrl}/genders`, requestOptionsGet)
      .then((response) => response.json())
      .then((result) => {
        setGender(result.data);
      });
  };
  const fetchStatus = async () => {
    fetch(`${apiUrl}/statuses`, requestOptionsGet)
      .then((response) => response.json())
      .then((result) => {
        setStatus(result.data);
      });
  };
  const fetchReligion = async () => {
    fetch(`${apiUrl}/religions`, requestOptionsGet)
      .then((response) => response.json())
      .then((result) => {
        setReligion(result.data);
      });
  };

  useEffect(() => {
    fetchGender();
    fetchStatus();
    fetchReligion();
  }, []);

  const convertType = (data: string | number | undefined) => {
    let val = typeof data === "string" ? parseInt(data) : data;
    return val;
  };

  // เพิ่มข้อมูลเข้า Database
  const submit = async () => {
    let data = {
    Firstname: member.Firstname,
    Lastname: member.Lastname,
    Password: pass.password,
    Email: member.Email,
    GenderID: convertType(member.GenderID),
    StatusID: convertType(member.StatusID),
    ReligionID: convertType(member.ReligionID),
    ProfileUser: member.ProfileUser,
    };
    // window.location.href = "/members"
    let res = await CreateMember(data);
    if (res.status) {
      window.location.href = "/user/profile-member";
      setSuccess(true);
      setAlertMessage("บันทึกข้อมูลสำเร็จ");
    } else {
      setError(true);
      setAlertMessage(res.message);
    }
  };

  return (
    <div>
       <Box
    sx={{
      display: "flex",
      flexDirection: "column",
      alignItems: "center",
      overflow :"auto",
      gap: 6,
      height: "100vh",
      width: "100vw",
      backgroundSize: "cover",
      color: "#f5f5f5",
      backgroundImage: `linear-gradient(rgba(0, 0, 0, 0.15), rgba(0, 0, 0, 0.15)), url(${bg2})`,
     }}
      >
      <Container maxWidth="md" sx={{ marginTop: 6 }}>
        {/*============================================(Toppic)======================================================*/}
        <Paper
          elevation={4}
          sx={{ 
            marginBottom: 2,
            marginTop: 2,
            padding: 1,
            paddingX: 2,
            display: "flex",
            justifyContent: "flex-start",
          }}
        >
          <h1 style={{ color: "#6b7176" }}>Register</h1>
        </Paper>
        <form>
          <Paper
            variant="outlined"
            sx={{ padding: 2, paddingTop: 1, marginBottom: 2 }}
          >
            <Grid container spacing={2} sx={{ marginBottom: 1.5 }}>
              {/*============================================(First name)======================================================*/}
              <Grid xs={6} md={6}>
                <p style={{ color: "grey", fontSize: 17 }}>Firstname</p>
                <TextField
                  id="Firstname"
                  label="ชื่อ"
                  name="Firstname"
                  variant="outlined"
                  fullWidth
                  required
                  value={member.Firstname}
                  onChange={handleInputChange}
                />
              </Grid>
              {/*=============================================(Last name)=====================================================*/}
              <Grid xs={6} md={6}>
                <p style={{ color: "grey", fontSize: 17 }}>Lastname</p>
                <TextField
                  id="lastname"
                  label="สกุล"
                  name="Lastname"
                  variant="outlined"
                  fullWidth
                  required
                  value={member.Lastname}
                  onChange={handleInputChange}
                />
              </Grid>
            </Grid>
            {/*===========================================(email)=======================================================*/}
            <Grid container spacing={2}>
              <Grid
                xs={12}
                md={9}
                sx={{ display: "flex", alignItems: "center", margin: 1 }}
              >
                <p style={{ color: "grey", fontSize: 17 ,marginRight: "10%" }}>Email:</p>
                <TextField
                  id="email"
                  variant="outlined"
                  name="Email"
                  required
                  value={member.Email}
                  onChange={handleInputChange}
                  fullWidth
                />
                <FormHelperText disabled sx={{ width: 350, marginLeft: 2 }}>
                  กรุณากรอกอีเมลของคุณ
                </FormHelperText>
              </Grid>

              {/*==============================================(password)====================================================*/}
              <Grid
                xs={12}
                md={11}
                sx={{ display: "flex", alignItems: "center", margin: 1 }}
              >
                <InputLabel
                  htmlFor="outlined-adornment-password"
                  style={{ color:"grey",marginRight: "1.5em", fontSize: 17 }}
                >
                  Password:
                </InputLabel>
                <OutlinedInput
                  id="outlined-adornment-password"
                  type={pass.showPassword ? "text" : "password"}
                  value={pass.password}
                  onChange={handlePassword("password")}
                  endAdornment={
                    <InputAdornment position="end">
                      <IconButton
                        aria-label="toggle password visibility"
                        onClick={handleClickShowPassword}
                        onMouseDown={handleMouseDownPassword}
                        edge="end"
                      >
                        {pass.showPassword ? <VisibilityOff /> : <Visibility />}
                      </IconButton>
                    </InputAdornment>
                  }
                />
                <FormHelperText disabled sx={{ width: 350, marginLeft: 2 }}>
                  กรุณากรอกรหัสของคุณ
                </FormHelperText>
              </Grid>
              {/*=======================================(select Gender)===========================================================*/}
              <Grid
                xs={12}
                md={8}
                sx={{ display: "flex", alignItems: "center", margin: 1 }}
              >
                <FormLabel
                  id="demo-simple-select-helper-label"
                  style={{ color:"grey",marginRight: "2.5em", fontSize: 17 }}
                >
                  Gender:
                </FormLabel>
                <Select
                    native
                    fullWidth
                    id="gender"
                    value={member.GenderID + ""}
                    onChange={handleChange}
                    inputProps={{
                    name: "GenderID",
                    }}
                >
                <option aria-label="None" value="">
                    เลือกเพศของคุณ
                </option>
                {gender.map((item: GenderInterface) => (
                <option key={item.ID} value={item.ID}>
                    {item.Name}
                </option>
                ))}
                    </Select>
                <FormHelperText disabled sx={{ width: 350, marginLeft: 2 }}>
                  กรุณาเลือกเพศของคุณ
                </FormHelperText>
              </Grid>
              {/*=======================================(select Status)===========================================================*/}
              <Grid
                xs={12}
                md={8}
                sx={{ display: "flex", alignItems: "center", margin: 1 }}
              >
                <FormLabel
                  id="demo-simple-select-helper-label"
                  style={{ color:"grey",marginRight: "3em", fontSize: 17 }}
                >
                  Status:
                </FormLabel>
                <Select
                    native
                    fullWidth
                    id="status"
                    value={member.StatusID + ""}
                    onChange={handleChange}
                    inputProps={{
                    name: "StatusID",
                    }}
                >
                <option aria-label="None" value="">
                    เลือกสถานะของคุณ
                </option>
                {status.map((item: StatusInterface) => (
                <option key={item.ID} value={item.ID}>
                    {item.Name}
                </option>
                ))}
                    </Select>
                <FormHelperText disabled sx={{ width: 350, marginLeft: 2 }}>
                  สถานะปัจจุบัน
                </FormHelperText>
              </Grid>
              {/*=======================================(select Religion)===========================================================*/}
              <Grid
                xs={6}
                md={8}
                sx={{ display: "flex", alignItems: "center", margin: 1 }}
              >
                <FormLabel
                  id="demo-simple-select-helper-label"
                  style={{ color:"grey",marginRight: "2em", fontSize: 17 }}
                >
                  Religion:
                </FormLabel>
                <Select
                    native
                    fullWidth
                    id="religion"
                    value={member.ReligionID + ""}
                    onChange={handleChange}
                    inputProps={{
                    name: "ReligionID",
                    }}
                >
                <option aria-label="None" value="">
                    เลือกศาสนาของคุณ
                </option>
                {religion.map((item: ReligionInterface) => (
                <option key={item.ID} value={item.ID}>
                    {item.Name}
                </option>
                ))}
                    </Select>
                <FormHelperText disabled sx={{ width: 350, marginLeft: 2 }}>
                  เลือกศาสนาที่นับถือ
                </FormHelperText>
                {/*=======================================(select Image)===========================================================*/}
                <Grid xs={6}  md={6}>
                  <Box>
                    <Button
                      variant="contained"
                      component="label"
                      sx={{
                        backgroundColor: "#f2f2f2",
                        color: "#252525",
                      }}
                    >
                      Upload
                      <input
                        id="profileUser"
                        name="ProfileUser"
                        hidden
                        accept="image/*"
                        multiple
                        type="file"
                        onChange={handleChangeImages}
                      />
                    </Button>
                    <FormHelperText disabled sx={{ width: 350, marginLeft: 2 }}>
                      เลือกรูปภาพของคุณ
                    </FormHelperText>
                  </Box>
                  <ImgBox>
                    <img src={profileuser.src} alt={profileuser.name} style={{ width: "100%" }} />
                  </ImgBox>
                </Grid>
              </Grid>
              <Grid
                container
                xs={12}
                md={12}
                spacing={1}
                sx={{ margin: 1 }}
              >
                <Button variant="contained" size="large" onClick={submit}>
                  สมัครสมาชิก
                </Button>
                <Grid xs={0} md={0}></Grid>
                <Link
                    to="/"
                >
                  <Button variant="contained" color="inherit" size="large">
                    ย้อนกลับ
                  </Button>
                </Link>
              </Grid>
            </Grid>
          </Paper>
        </form>
      </Container>
      <Snackbar
        open={success}
        id = "success"
        autoHideDuration={5000}
        onClose={handleClose}
        anchorOrigin={{ vertical: "bottom", horizontal: "center" }}
      >
        <Alert onClose={handleClose} severity="success">
          {message}
        </Alert>
      </Snackbar>
      <Snackbar
        open={error}
        id = "error"
        autoHideDuration={5000}
        onClose={handleClose}
        anchorOrigin={{ vertical: "bottom", horizontal: "center" }}
      >
        <Alert onClose={handleClose} severity="error">
        {message}
        </Alert>
      </Snackbar>
      </Box>
    </div>
  );
}
export default RegisterMember;
