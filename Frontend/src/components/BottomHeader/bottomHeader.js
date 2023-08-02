import * as React from 'react';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import MoveToInboxRoundedIcon from '@mui/icons-material/MoveToInboxRounded';
import ArrowOutwardRoundedIcon from '@mui/icons-material/ArrowOutwardRounded';
import OutboxIcon from '@mui/icons-material/Outbox';


//--------------------------

import AccountCircleRoundedIcon from '@mui/icons-material/AccountCircleRounded';
import { useNavigate } from 'react-router-dom';
function BottomHeader() {
  const navigate = useNavigate()

  return (
    <AppBar position="fixed"  sx={{ top: 'auto', bottom: 1, borderRadius:15, backgroundColor:'white', maxHeight:50 }}>
    <Toolbar style={{backgroundColor:'', paddingRight:0}}>
      <div className="row" style={{backgroundColor:'', width:'100%', marginRight:0 }}>
        <div className="col-4" style={{display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center',}}>
        <IconButton color="error" onClick={()=>navigate('/create-stock')}>
        <MoveToInboxRoundedIcon style={{fontSize:30}} />
      </IconButton>
        </div>
        <div className="col-4" style={{display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center',}}>
        <IconButton color="error" onClick={()=>navigate('/create-sale')}>
        <OutboxIcon style={{fontSize:30}} />
      </IconButton>
        </div>
        <div className="col-4" style={{display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center',}}>
        <IconButton color="error" onClick={()=>navigate('/user-profile')}>
        <AccountCircleRoundedIcon color='error' style={{fontSize:30}} />
      </IconButton>
        </div>
        

      </div>
     
    </Toolbar>
  </AppBar>
  );
}
export default BottomHeader;