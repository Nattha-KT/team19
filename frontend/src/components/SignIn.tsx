import React, { useEffect,useState } from "react";
import Avatar from "@mui/material/Avatar";
import Button from "@mui/material/Button";
import CssBaseline from "@mui/material/CssBaseline";
import TextField from "@mui/material/TextField";
import FormControlLabel from "@mui/material/FormControlLabel";
import Checkbox from "@mui/material/Checkbox";
import Paper from "@mui/material/Paper";
import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import Typography from "@mui/material/Typography";
import Snackbar from "@mui/material/Snackbar";
import MuiAlert, { AlertProps } from "@mui/material/Alert";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import { SignInInterface } from "../interfaces/ISignIn";
import { Login } from "../services/HttpClientService";
import '../App.css';
import { Link, useLocation } from "react-router-dom";


const theme = createTheme({
  typography: {
    allVariants: {
      fontFamily: 'Kanit',
      textTransform: 'none',
      fontSize: 18,
    },
  },
});

const Alert = React.forwardRef<HTMLDivElement, AlertProps>(function Alert(
  props,
  ref
) {
  return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
});

type Prop = {
  loginRole: any;
};

function SignIn({ loginRole }: Prop) {
  const [signin, setSignin] = useState<Partial<SignInInterface>>({});
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState(false);
  const [openTrainer, setOpenTrainer] = useState(false);
  const [openMember, setOpenMember] = useState(false);

  const location = useLocation();

  const checkLocation = () => {
    location.pathname === "/trainer" && setOpenTrainer(!openTrainer);
    location.pathname === "/user" && setOpenMember(!openMember);
  };

  useEffect(() => {
    checkLocation();
  }, []);

  const handleInputChange = (
    event: React.ChangeEvent<{ id?: string; value: any }>
  ) => {
    const id = event.target.id as keyof typeof signin;
    const { value } = event.target;
    setSignin({ ...signin, [id]: value });
  };

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

  const submit = async () => {
    let res = await loginRole(signin);
    console.log(res)
    if (res) {
      setSuccess(true);
      setTimeout(() => {
        window.location.reload();
      }, 1000);
    } else {
      setError(true);
    }
  };

  return (
    <ThemeProvider theme={theme}>
      <Grid container component="main" sx={{ height: "100vh" }}>
        <Snackbar
          open={success}
          autoHideDuration={3000}
          onClose={handleClose}
          anchorOrigin={{ vertical: "bottom", horizontal: "center" }}
        >
          <Alert onClose={handleClose} severity="success">
            เข้าสู่ระบบสำเร็จ
          </Alert>
        </Snackbar>
        <Snackbar
          open={error}
          autoHideDuration={3000}
          onClose={handleClose}
          anchorOrigin={{ vertical: "bottom", horizontal: "center" }}
        >
          <Alert onClose={handleClose} severity="error">
            อีเมลหรือรหัสผ่านไม่ถูกต้อง
          </Alert>
        </Snackbar>

        <CssBaseline />
        <Grid
          item
          xs={false}
          sm={4}
          md={7}
          sx={{
            backgroundImage: "url(https://source.unsplash.com/random)",
            backgroundRepeat: "no-repeat",
            backgroundColor: (t) =>
              t.palette.mode === "light"
                ? t.palette.grey[50]
                : t.palette.grey[900],
            backgroundSize: "cover",
            backgroundPosition: "center",
          }}
        />
        <Grid item xs={12} sm={8} md={5} component={Paper} elevation={6} square>
          <Box
            sx={{
              my: 8,
              mx: 4,
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              alignSelf: "center",
            }}
          >
            <Avatar sx={{ m: 1, bgcolor: "secondary.main" }}>
              <LockOutlinedIcon />
            </Avatar>
            <Typography component="h1" variant="h5">
              Sign in
            </Typography>
            <Box sx={{ mt: 1 }}>
              <TextField
                margin="normal"
                required
                fullWidth
                id="Email"
                label="Email"
                name="Email"
                autoComplete="email"
                autoFocus
                value={signin.Email || ""}
                onChange={handleInputChange}
              />
              <TextField
                margin="normal"
                required
                fullWidth
                id="Password"
                label="Password"
                name="Password"
                type="password"
                autoComplete="current-password"
                value={signin.Password || ""}
                onChange={handleInputChange}
              />
              <Button
                type="submit"
                fullWidth
                variant="contained"
                sx={{ mt: 3, mb: 2 }}
                onClick={submit}
              >
                Sign In
              </Button>
              {/* ถ้าเข้ามาที่หน้า login ด้วยบทบาทของ trainer */}
              {openTrainer && (
                <Box sx={{ mb: 2, display: "flex", justifyContent: "center" }}>
                  <Button>
                    <Link
                      to="/apply"
                      style={{
                        color: "#252525",
                        textDecoration: "none",
                      }}
                    >
                      Sign up
                    </Link>
                  </Button>
                </Box>
              )}
              {/* ถ้าเข้ามาที่หน้า login ด้วยบทบาทของ Member */}
              {openMember && (
                <Box sx={{ mb: 2, display: "flex", justifyContent: "center" }}>
                  <Button>
                    <Link
                      to="/register-member"
                      style={{
                        color: "#252525",
                        textDecoration: "none",
                      }}
                    >
                      Sign up
                    </Link>
                  </Button>
                </Box>
              )}
              {/* ปุ่ม back */}
              <Link
                to="/"
                style={{
                  color: "#252525",
                  textDecoration: "none",
                  display: "flex",
                  justifyContent: "center",
                }}
              >
                Back
              </Link>
            </Box>
          </Box>
        </Grid>
      </Grid>
    </ThemeProvider>
  );
}

export default SignIn;