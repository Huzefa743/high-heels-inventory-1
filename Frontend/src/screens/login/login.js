import React, { useContext, useState, useEffect } from "react";
import Box from '@mui/material/Box';
import Input from '@mui/material/Input';
import InputLabel from '@mui/material/InputLabel';
import InputAdornment from '@mui/material/InputAdornment';
import FormControl from '@mui/material/FormControl';
import TextField from '@mui/material/TextField';
import Mail from '@mui/icons-material/Mail';
import Https from '@mui/icons-material/Https';
import Facebook from '@mui/icons-material/Facebook';
import Twitter from '@mui/icons-material/Twitter';
import YouTube from '@mui/icons-material/YouTube';
import Instagram from '@mui/icons-material/Instagram';
import { Button, Divider, IconButton } from "@mui/material";
import logo from '../../logos/main-logo.png'
import Chip from '@mui/material/Chip';
import * as API from "../../apiservice/services";
import { useNavigate } from "react-router-dom";
import Loader from '../../components/Loader/loader';



const Login = () => {
   
    const navigate = useNavigate()
    const[loaderVisible, setLoaderVisilbe] = useState(false)
    const[disableUserField, setDisableUserField] = useState(false)
    const[errorEnable, setErrorEnable] = useState(false)
    const [UserFormFields, setUserFormFileds] = useState({
        emailId:'',
        password:'',
        
    })

  const handleCreateUserFormChange= (event)=>{
        console.log( event.target.name)
        let data = {...UserFormFields}
        data[event.target.name] = event.target.value; 
        setUserFormFileds(data);
  }

  const login=async()=>{
    console.log("create customer working...")
    
    console.log(UserFormFields)
     
    setLoaderVisilbe(true)

    API.login(UserFormFields)
    .then(async(res) => {
     console.log("here is the response for create user form ", res)
            if(res.status==200){
                window.localStorage.clear();
                console.log(res);
                localStorage.setItem("accesstoken", res.data.token);
                localStorage.setItem("username", res.data.userName);
                localStorage.setItem("userid", res.data.userId);
                localStorage.setItem("auth", true);
            setLoaderVisilbe(false)
            setDisableUserField(true)  
            navigate('/home')            
            }
    })
    .catch((err) => {
        setLoaderVisilbe(false) 
        setErrorEnable(true)
       
        console.log("here is the create customer error!! ", err)
  })
 }


    useEffect(() => {
       // fetchCustomerDetails()
        //fetchSiteList()
        }, []);

 
 

  return (
       <>
        {loaderVisible ? <Loader/>:
      <>
          <div style={{padding:'5%'}}>
       <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center' }}>
            <img src={logo} style={{width:200, height:150}}></img>
            </div>
            
            <div style={{marginTop:'15%'}}>
            <Box sx={{ display: 'flex', alignItems: 'flex-end' }}>
                {/* <Mail sx={{ color: 'action.active', mr: 1, mt:1, my: 0.5 }} /> */}
                <TextField InputProps={{
          startAdornment: (
            <InputAdornment position="start">
              <Mail />
            </InputAdornment>
          ),
        }} id="input-with-sx" error={errorEnable} label="Email Address" type="email" name="emailId" disabled={disableUserField} onChange={event => handleCreateUserFormChange(event)} value={UserFormFields.emailId} placeholder='example@xxx.com'  fullWidth variant="standard"  style={{width:'100%'}} />
            </Box>

            <Box sx={{ display: 'flex', alignItems: 'flex-end', marginTop:2}}>
                {/* <Https sx={{ color: 'action.active', mr: 1, my: 0.5 }} /> */}
                <TextField InputProps={{
          startAdornment: (
            <InputAdornment position="start">
              <Https />
            </InputAdornment>
          ),
        }} id="input-with-sx" error={errorEnable}  label="Password" variant="standard" type="password" name="password" disabled={disableUserField} onChange={event => handleCreateUserFormChange(event)} value={UserFormFields.password}  placeholder='Password'  fullWidth  style={{width:'100%'}}/>
            </Box>

            <Button variant="contained" color="error" style={{width:'100%', marginTop:30}}  onClick={()=>login()}>Login</Button>
            {/* disabled={disableUserField || UserFormFields.emailId=="" || UserFormFields.password==""} */}

            </div>

            <Divider style={{marginTop:30, marginBottom:30}}>
                {/* <Chip label="Contact" /> */}
            </Divider>

            <div style={{ marginTop:20, display: 'flex', justifyContent: 'center' }}>
                   
                      <div style={{ margin: '0 10px' }}>
                             <IconButton aria-label="delete" >
                                  <Facebook color="error" />
                              </IconButton>
                              <IconButton aria-label="delete">
                                  <Twitter color="error" />
                              </IconButton>
                              <IconButton aria-label="delete">
                                  <YouTube color="error" />
                              </IconButton>
                              <IconButton aria-label="delete">
                                  <Instagram color="error" />
                              </IconButton>
                      </div>
                     
                  </div>
                  <p style={{textAlign:'center', marginTop:10, fontSize:9, color:'gray'}}>Powered By: Huzefa's Solutions</p>

      </div>
      </>
}

     
       </>
  );
};

export default Login;
