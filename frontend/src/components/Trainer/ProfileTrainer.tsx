import React, { useState, useEffect } from "react";
import Paper from "@mui/material/Paper";
import Grid from "@mui/material/Unstable_Grid2";
import TextField from "@mui/material/TextField";
import Container from "@mui/material/Container";

import { Box } from "@mui/material";

import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemText from "@mui/material/ListItemText";
import ListItemAvatar from "@mui/material/ListItemAvatar";
import Avatar from "@mui/material/Avatar";
import ImageIcon from "@mui/icons-material/Image";
import WorkIcon from "@mui/icons-material/Work";
import BeachAccessIcon from "@mui/icons-material/BeachAccess";
import Divider from "@mui/material/Divider";
import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";
import Typography from "@mui/material/Typography";
import { deepOrange, deepPurple } from "@mui/material/colors";
import FormLabel from "@mui/material/FormLabel";

import environmentIcon from "../../images/environmentIcon.png"
import trainerP from "../../images/trainer.png"
import Body from "../../images/Body.png"
import exercise from "../../images/exercies.jpg"
import profile1 from "../../images/profile1.jpg"
import profile2 from "../../images/profile2.jpg"

import Chip from '@mui/material/Chip';
import DeleteIcon from '@mui/icons-material/Delete';
import LogoutIcon from '@mui/icons-material/Logout';


import {GetTrainerByID} from "../../services/HttpClientService"
import { TrainerInterface } from "../../interfaces/ITrainer";
import IdentityDisplay from "./profileSetting/IdentityDisplay";
import  EditSettings  from "./profileSetting/EditSetting";
import { colors } from "@mui/joy";

import {DeleteTrainer} from "../../services/HttpClientService"


const handleClickDelete = async (id : string) => {
  let res = await DeleteTrainer(id);
  if (res) {
    window.location.reload();
    localStorage.clear();
    window.location.href = "/trainer";
  }
}

const handleDelete = () => {
  console.info('You clicked the delete icon.');
};

interface TabPanelProps {
  children?: React.ReactNode;
  index: number;
  value: number;
}

function TabPanel(props: TabPanelProps) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`simple-tabpanel-${index}`}
      aria-labelledby={`simple-tab-${index}`}
      {...other}
    >
      {value === index && (
        <Box sx={{ p: 3 }}>
          <Typography>{children}</Typography>
        </Box>
      )}
    </div>
  );
}

function a11yProps(index: number) {
  return {
    id: `simple-tab-${index}`,
    'aria-controls': `simple-tabpanel-${index}`,
  };
}

function ProfileTrainer() {
  const [tab, setTab] = React.useState("profile");
  const [value, setValue] = React.useState(0);
  const [trainer, setTrainer] = useState<TrainerInterface>({}); 
  
  
  const fetchTrainerID = async () => {
    let res = await GetTrainerByID();
    if (res) {
      setTrainer(res);
    }
  };

  const Logout = () => {
    localStorage.clear();
    window.location.href = "/trainer";
  };


  useEffect(() => {
    fetchTrainerID()
   
  }, []);


  const handleChangeTab = (event: React.SyntheticEvent, newValue: number) => {
    setValue(newValue);
  };
  // console.log(display);

  return (

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
      backgroundImage: `linear-gradient(rgba(0, 0, 0, 0.15), rgba(0, 0, 0, 0.15)), url(${profile2})`,
    }}
  >
    <Container maxWidth="lg" sx={{marginBottom:12}}>
      <Paper
        elevation={4}
        sx={{
          marginBottom: 2,
          marginTop: 10,
          display: "block",
          justifyContent: "center",
          alignContent: "end",
          borderRadius: "25px",
        }}
      >
        <Box
          sx={{
            backgroundColor: "#ec407a",
            marginBottom: 0,
            display: "block",
            width: "100%",
            height: 50,
            borderRadius: "25px  25px 0px 0px",
            // textAlign:"center",
            paddingTop:2
            
          }}
        >
            {/* <Avatar src={environmentIcon} /> */}
        <b style={{color:"white" , marginLeft:20,fontSize:20}}>Trainer</b>
        </Box>
        <Grid
          container
          direction="row"
          justifyContent="flex-start"
          spacing={0}
          alignItems="stretch"
        >
          <Grid xs={6} md={5}>
            <Paper
              elevation={6}
              sx={{
                display: "inline grid",
                padding: 3,
                margin: 0,
                justifyContent: "flex-start",
                borderRadius: "0px  0px 0px 25px",
                // boxShadow:"box-shadow: 5px 7px 3px 7px;"
              }}
            >
              <Avatar
                sx={{
                  bgcolor: deepOrange[500],
                  width: 200,
                  height: 200,
                  marginLeft: 14,
                  fontSize: 40,
                }}
              >
                TN
            <Avatar src={environmentIcon} sx ={{width:50,hight:50}}/>
            {/* <Avatar src={Body} sx ={{width:100,hight:10}}/> */}
              </Avatar>

              <h2
                style={{
                  color: "#6b7176",
                  marginBottom: 40,
                  textAlign: "center",
                }}
              >
                {trainer?.Name}
              </h2>

              {/*==============================================(Primary)====================================================*/}
              <Paper elevation={0} sx={{ padding: 1 }}>
                <List
                  sx={{
                    width: "100%",
                    maxWidth: 360,
                    bgcolor: "background.paper",
                  }}
                >
                  <ListItem>
                    <ListItemText primary="Healthy" secondary="Feb 12, 2023" />
                  </ListItem>
                  <Divider component="li" />

                  <ListItem>
                    <ListItemText primary="Sport" secondary="Jan 7, 2023" />
                  </ListItem>
                  <Divider component="li" variant="inset" />
                </List>
                <List
                  sx={{
                    width: "100%",
                    maxWidth: 360,
                    bgcolor: "background.paper",
                  }}
                >
                  <ListItem>
                    <ListItemAvatar>
                      <Avatar>
                        <ImageIcon />
                      </Avatar>
                    </ListItemAvatar>
                    <ListItemText primary="Photos" secondary="Jan 9, 2014" />
                  </ListItem>
                  <Divider variant="inset" component="li" />
                  <ListItem>
                    <ListItemAvatar>
                      <Avatar>
                        <WorkIcon />
                      </Avatar>
                    </ListItemAvatar>
                    <ListItemText primary="Work" secondary="Jan 7, 2014" />
                  </ListItem>
                  <Divider variant="inset" component="li" />
                  <ListItem>
                    <ListItemAvatar>
                      <Avatar>
                        <BeachAccessIcon />
                      </Avatar>
                    </ListItemAvatar>
                    <ListItemText
                      primary="Vacation"
                      secondary="July 20, 2014"
                    />
                  </ListItem>
                </List>
              </Paper>
              {/* ================================================( delete )============================================================= */}
              <Chip
                label="DELETE ACCOUNT"
                size="medium"
                onClick={() => handleClickDelete(trainer.ID+"")}
                onDelete={handleDelete}
                deleteIcon={<DeleteIcon />}
                variant="outlined"
                sx={{ marginTop: 2, marginLeft: 35 }}
              />
            </Paper>
          </Grid>
          {/* ====================================( page2 )=========================== */}
          <Grid xs={6} md={7} sx={{ paddingLeft: 4 }}>
            <Box sx={{ width: "100%" }}>
              <Tabs
                value={tab}
                onChange={handleChangeTab}
                textColor="secondary"
                indicatorColor="secondary"
                aria-label="basic tabs example"
              >
                <Tab label="Profile" {...a11yProps(0)} />
                <Tab label="Edit" {...a11yProps(1)} />
                {/* <Tab  label="" {...a11yProps(2)}/> */}
                <LogoutIcon  onClick={Logout} fontSize="large"
                sx ={{position:"absolute",marginLeft:73,marginTop:2}} ></LogoutIcon>
              
              </Tabs>

              <TabPanel value={value} index={0}>
                <IdentityDisplay />
              </TabPanel>
              <TabPanel value={value} index={1}>
                <EditSettings />
              </TabPanel>
            </Box>
          </Grid>
        </Grid>
      </Paper>
    </Container>
    </Box>
  );
}

export default ProfileTrainer;
