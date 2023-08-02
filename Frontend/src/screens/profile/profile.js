import { Accordion, AccordionDetails, AccordionSummary, AppBar, Button, Dialog, DialogActions, DialogContent, DialogContentText, Divider, IconButton, List, ListItem, ListItemAvatar, ListItemButton, ListItemIcon, ListItemText, ListSubheader, MenuItem, Slide, TextField, Toolbar, Typography } from '@mui/material';
import React , {useState, useEffect}from 'react'
import { Container, Card, ListGroup } from 'react-bootstrap'
import { useNavigate, useParams } from 'react-router-dom';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
// import * as API from "../../services/services";
import ImageIcon from '@mui/icons-material/Image';
import WorkIcon from '@mui/icons-material/Work';
import BeachAccessIcon from '@mui/icons-material/BeachAccess';
import EngineeringIcon from '@mui/icons-material/Engineering';
import CloseIcon from '@mui/icons-material/Close';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import Header from '../../components/Header/header';
import logo from '../../logos/bg.png'
import userprofile from '../../logos/profile_user.jpg'
import { styled } from '@mui/material/styles';
import Badge from '@mui/material/Badge';
import Avatar from '@mui/material/Avatar';
import Stack from '@mui/material/Stack';
import InboxIcon from '@mui/icons-material/MoveToInbox';
import DraftsIcon from '@mui/icons-material/Drafts';
import SendIcon from '@mui/icons-material/Send';
import LogoutIcon from '@mui/icons-material/Logout';
import CreateIcon from '@mui/icons-material/Create';
import Loader from '../../components/Loader/loader';
import * as API from "../../apiservice/services";

function Profile() {

  const navigate = useNavigate()
  const[userDetails, setUserDetails] = useState({})
  const[loaderVisible, setLoaderVisible] = useState(false)
  const [saleUpdateDialogVisible, setSaleUpdateDialogVisible] = useState(false)



  function logOut(){
    console.log("log out is working...")
    window.localStorage.clear();
    navigate('/login')
  }


  //-------------update sale detail-----------------
  const [img, setImg] = useState({ oldImg: null, newImg: null });
  const [imgerror, setImgError] = useState("");
  const changeImage = async (event) => {
    var maxFileSize = 1048576; //1MB
    if (event.target.files[0].size > maxFileSize) {
      setImg({ newImg: null });
      setImgError("File size cannot be greater than 1MB");
    } else {
      console.log(event.target.files[0]);
      const file = event.target.files[0];
      setImgError("");
      setImg({ oldImg: URL.createObjectURL(file), newImg: file });
    }
  };

const[disableUpdateUserField, setDisableUpdateUserField] = useState(false)
const [updateUserFormFields, setUpdateUserFileds] = useState({
  first_name:'',
  last_name:'',
  mrp:'',
  email_id:'',
  designation:'',
  mobile_number:'',
  user_type: '',
  
})

const handleUpdateUserFormChange= (event)=>{
  console.log( event.target.name)
  let data = {...updateUserFormFields}
  data[event.target.name] = event.target.value; 
  setUpdateUserFileds(data);
}

const updateUser=async()=>{
console.log("update User is execute", updateUserFormFields)

setLoaderVisible(true)

API.updateUser(  updateUserFormFields)
.then(async(res) => {
 console.log("Response for update request form", res)
       
          fetchUserDetailsByUserId()
          setLoaderVisible(false)  
          setSaleUpdateDialogVisible(false)        
        
})
.catch((err) => {
    setLoaderVisible(false) 
    alert("User couldn't update!!", err)
    console.log("here is the update user error!! ", err)
})
}

  //--------------close sale detail-----------------

  async function fetchUserDetailsByUserId(){
    setLoaderVisible(true)
    API.getUserDetailByUserId().then((res) => {
      setUserDetails(res.data.data);
      setUpdateUserFileds(res.data.data)
      setLoaderVisible(false)
      console.log("here is the user details", res.data)
    }).catch((error)=>{
      alert("Not able to fetch the user details", error)
      setLoaderVisible(false)
    })
  }

    useEffect(() => {    
      fetchUserDetailsByUserId()
        }, []);
 
  return (
    <>
     <Header/>
     {loaderVisible? <Loader/>:
     <>
      <img src={logo} width="100%" height="150px"></img>
     <Stack direction="row" spacing={2} style={{display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center'}}>
      
        <Avatar alt="Remy Sharp" src={userprofile} style={{marginTop:-90,}}
  sx={{ width: 120, height: 120 }} />
     
     
    </Stack>
   
     <div style={{display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center'}} >
         <p style={{marginBottom:1, fontSize:15, fontWeight:700}}>{userDetails.first_name} {userDetails.last_name} <StyledBadge style={{marginLeft:10, marginBottom:2}}
        overlap="circular"
        anchorOrigin={{ vertical: 'top', horizontal: 'right',}}
        variant="dot"
      ></StyledBadge> </p> 
        
         <p style={{color:'gray', fontSize:10, marginLeft:-5}}>{userDetails.designation} of High Heels</p>

        </div>   
        <div style={{position:'relative', display: 'flex', marginTop:-70, marginRight:20, flexDirection: 'column', alignItems: 'flex-end', justifyContent: 'flex-end'}} >
        <IconButton aria-label="delete" size="large" color='error' onClick={()=>setSaleUpdateDialogVisible(true)}>
             <EditIcon color="error" style={{ textAlign:'right'}}/>
             </IconButton>
             </div>
        {/* ------------------user detail-------------- */}
        <List sx={{marginTop:3, width: '100%', marginBottom: 5, bgcolor: 'background.paper' }}>
          <ListItem alignItems='left'  style={{width: '100%', cursor: 'pointer', position: 'relative', backgroundColor:'', paddingRight:0, marginRight:0 }} >
              <div className='row'>
                <div className="col-10">
                <p style={{marginBottom:1, fontSize:12}}><b>Email</b></p>
                 <p style={{marginBottom:1, fontSize:12, color:'gray'}}><b>{userDetails.email_id}</b></p>
               
                </div>
                <div className="col-8">
                </div>
              </div>
              
           </ListItem>
           <Divider variant="fullWidth" component="li" />
           <ListItem alignItems='left'  style={{width: '100%', cursor: 'pointer', position: 'relative', backgroundColor:'', paddingRight:0, marginRight:0 }} >
           <div className='row'>
                <div className="col-10">
                <p style={{marginBottom:1, fontSize:12}}><b>Mobile</b></p>
                <p style={{marginBottom:1, fontSize:12, color:'gray'}}><b>+91 {userDetails.mobile_number}</b></p>

                </div>
                <div className="col-8">
                </div>
              </div>
           </ListItem>
           <Divider variant="fullWidth" component="li" />
           <ListItem alignItems='left'  style={{width: '100%', cursor: 'pointer', position: 'relative', backgroundColor:'', paddingRight:0, marginRight:0 }} >
           <div className='row'>
                <div className="col-10">
                <p style={{marginBottom:1, fontSize:12}}><b>Address</b></p>
                <p style={{marginBottom:1, fontSize:12, color:'gray'}}><b>274, Near shabban square, Jhangirabad Bhopal - 462010</b></p>

                </div>
                <div className="col-8">
                </div>
              </div>
           </ListItem>
           <Divider variant="fullWidth" component="li" />
           <ListItem alignItems='left'  style={{width: '100%', cursor: 'pointer', position: 'relative', backgroundColor:'', paddingRight:0, marginRight:0 }} >
           <div className='row'>
                <div className="col-10">
                <p style={{marginBottom:1, fontSize:12}}><b>Help & Support</b></p>

                </div>
                <div className="col-8">
                </div>
              </div>
           </ListItem>
           <Divider variant="fullWidth" component="li" />
          
           
           <ListItem  style={{width: '100%', cursor: 'pointer', position: 'relative', backgroundColor:'', paddingRight:0, marginRight:0 }} >
           <div className='row'>
           <div className="col-2">
                     {/* <LogoutIcon color="inherit"/> */}
           </div>
           <div className="col-10">
                <p style={{marginBottom:1, fontSize:12}} onClick={()=>logOut()}><b> LogOut</b></p>

            </div>
                
              </div>
           </ListItem>
           <Divider variant="fullWidth" component="li" />
    
</List>


{/* --------dialog for user details */}
<Dialog 
        fullScreen
       
        TransitionComponent={Transition}

open={saleUpdateDialogVisible} onClose={()=>setSaleUpdateDialogVisible(false)}>
  <AppBar sx={{ position: 'relative' }} color='error'> 
          <Toolbar>
            <IconButton
              edge="start"
              color="inherit"
              onClick={()=>setSaleUpdateDialogVisible(false)}
              aria-label="close"
            >
              <CloseIcon />
            </IconButton>
            <Typography sx={{ ml: 2, flex: 1 }} variant="h6" component="div">
              Update User Details
            </Typography>
            
          </Toolbar>
        </AppBar>
        <DialogContent>
          <DialogContentText>
            
          </DialogContentText>
         
                {/* <p style={{fontWeight:700, color:'#5F5E5E', fontSize:15, marginTop:0, marginBottom:0, paddingLeft:0}}>Create Stock :</p> */}
                
            
                <TextField  margin="dense"  name='first_name'  disabled={disableUpdateUserField} onChange={event => handleUpdateUserFormChange(event)} value={updateUserFormFields.first_name} label="First Name" placeholder='Flight' type="text" fullWidth variant="standard"/>
                <TextField  margin="dense"  name='last_name'  disabled={disableUpdateUserField} onChange={event => handleUpdateUserFormChange(event)} value={updateUserFormFields.last_name} label="Last Name" placeholder='Flight PU 8764' type="text" fullWidth variant="standard"/>
                {/* <TextField  margin="dense"  name='user_avatar'  disabled={disableUpdateUserField} onChange={()=>changeImage()}  label="Profile Image" placeholder='Flight PU 8764' type="file" fullWidth variant="standard"/> */}
                
                <TextField  margin="dense"  name='email_id'  disabled={disableUpdateUserField} onChange={event => handleUpdateUserFormChange(event)} value={updateUserFormFields.email_id} label="Email" placeholder='user@xxxx.com' type="email" fullWidth variant="standard"/>
                <TextField  margin="dense"  name='mobile_number'  disabled={disableUpdateUserField} onChange={event => handleUpdateUserFormChange(event)} value={updateUserFormFields.mobile_number} label="Mobile Number" placeholder='888765456' type="number" fullWidth variant="standard"/>
               
               
                <TextField  margin="dense"  name='designation'  disabled={disableUpdateUserField} onChange={event => handleUpdateUserFormChange(event)} value={updateUserFormFields.designation} label="Designation" placeholder='COE' type="text" fullWidth variant="standard"/>
                {/* <TextField  margin="dense"  name='sale_price'  disabled={disableSaleField} onChange={event => handleSaleFormChange(event)} value={createSaleFormFields.sale_price} label="Sale Price" placeholder='2000.00' type="number" fullWidth variant="standard"/> */}
                {/* <TextField  margin="dense"  name='vendor_name'  disabled={disableUpdateUserField} onChange={event => handleUpdateUserFormChange(event)} value={updateUserFormFields.vendor_name} label="Vendor Name" placeholder='Gupta Footware' type="text" fullWidth variant="standard"/>
                
                <TextField  margin="dense"  name='stock_date'  disabled={disableUpdateUserField} onChange={event => handleUpdateUserFormChange(event)} value={updateUserFormFields.stock_date} label="Stock Date"  type="datetime-local" fullWidth variant="standard"/>
                   */}
        </DialogContent>
        <DialogActions>
          <Button color="inherit" onClick={()=>setSaleUpdateDialogVisible(false)}>Cancel</Button>
          <Button color='error' onClick={()=>{updateUser()}}>Update</Button>
        </DialogActions>
      </Dialog>
     
     </>}
    
    
 {/* ----------------------close----------------------- */}

    </>
  )
}

export default Profile




const StyledBadge = styled(Badge)(({ theme }) => ({
    '& .MuiBadge-badge': {
      backgroundColor: '#44b700',
      color: '#44b700',
      boxShadow: `0 0 0 2px ${theme.palette.background.paper}`,
      '&::after': {
        position: 'absolute',
        top: 0,
        left: 0,
        width: '100%',
        height: '100%',
        borderRadius: '50%',
        animation: 'ripple 1.2s infinite ease-in-out',
        border: '1px solid currentColor',
        content: '""',
      },
    },
    '@keyframes ripple': {
      '0%': {
        transform: 'scale(.8)',
        opacity: 1,
      },
      '100%': {
        transform: 'scale(2.4)',
        opacity: 0,
      },
    },
  }));
  
  const SmallAvatar = styled(Avatar)(({ theme }) => ({
    width: 22,
    height: 22,
    border: `5px solid black`,
  }));


  const Transition = React.forwardRef(function Transition(props, ref) {
    return <Slide direction="up" ref={ref} {...props} />;
  });