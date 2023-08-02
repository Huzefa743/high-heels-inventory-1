import React , {useState, useEffect}from 'react'
import PersonAddIcon from '@mui/icons-material/PersonAdd';
import LocationOnIcon from '@mui/icons-material/LocationOn';
import EngineeringIcon from '@mui/icons-material/Engineering';
import GroupsIcon from '@mui/icons-material/Groups';
import HandymanIcon from '@mui/icons-material/Handyman';
import { Box, Chip, IconButton, makeStyles, Pagination, SpeedDial, Stack, Zoom } from '@mui/material';
import { blue } from '@mui/material/colors';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import Divider from '@mui/material/Divider';
import ListItemText from '@mui/material/ListItemText';
import ListItemAvatar from '@mui/material/ListItemAvatar';
import Avatar from '@mui/material/Avatar';
import Typography from '@mui/material/Typography';
import * as API from "../../apiservice/services";
import { useNavigate } from 'react-router-dom';
import PaidIcon from '@mui/icons-material/Paid';
import SpeedDialIcon from '@mui/material/SpeedDialIcon';
import SpeedDialAction from '@mui/material/SpeedDialAction';
import Header from '../../components/Header/header';
import Loader from '../../components/Loader/loader';


function StockList() {
    const[stockList, setStockList] = useState([])
    const [loaderVisible, setLoaderVisilbe] = useState(false)

    const navigate = useNavigate();

    // avatar random color
    function stringToColor(string) {
      let hash = 0;
      let i;
    
      /* eslint-disable no-bitwise */
      for (i = 0; i < string.length; i += 1) {
        hash = string.charCodeAt(i) + ((hash << 5) - hash);
      }
    
      let color = '#';
    
      for (i = 0; i < 3; i += 1) {
        const value = (hash >> (i * 8)) & 0xff;
        color += `00${value.toString(16)}`.slice(-2);
      }
      /* eslint-enable no-bitwise */
    
      return color;
    }

    function hasWhiteSpace(s) {
      return /\s/g.test(s);
    }
    
    function stringAvatar(name) {
      if(hasWhiteSpace(name)){
       
        return {
          sx: {
            bgcolor: stringToColor(name),
          },
          children: `${name.split(' ')[0][0]}${name.split(' ')[1][0]}`,
        };
      }
      else{
        return {
          sx: {
            bgcolor: stringToColor(name),
          },
          children: `${name.split()[0][0]}`,
        };
      }
      
    }



  
    async function fetchAllStock(page){
        API.getListOfStock(page, 100).then((res) => {
            setStockList(res.data.data);
            setLoaderVisilbe(false)
        });
    }
//     async function fetchCustomerDetails(){
//       API.getAllPaymentDetails().then((res) => {
//         setCustomerTotalCreditPayment(res.data.totalCreditPayment)
//         setCustomerTotalDebitPayment(res.data.totalDebitPayment)
//         setCustomerTotalBalancePayment(res.data.totalBalancePayment)
//       });
//   }

    useEffect(() => {
      
      setLoaderVisilbe(true)
      fetchAllStock(1)
        }, []);
 
  return (

    <>
      {/* <Loader/> */}
        <Header/>
        {loaderVisible ? <Loader/>:<></>}

        <Stack direction="row" spacing={2} style={{marginTop:10, display: 'flex', alignItems: 'center', justifyContent: 'center'}}>
            <Chip size='small' label="Yesterday" />
            <Chip size='small' label="All" />
            <Chip size='small' label="Today" style={{backgroundColor:'#E9967A'}} />
        </Stack>

        <List sx={{ width: '100%', marginBottom: 5, bgcolor: 'background.paper' }}>
  {stockList.map((stockDetails, index) => (
    <React.Fragment key={index}>
      <ListItem alignItems='left'  style={{height:130, width: '100%', cursor: 'pointer', position: 'relative', backgroundColor:'', paddingRight:0, marginRight:0 }} >
        
          <div style={{ position: 'absolute', top: 0, left: -2, height: '100%', width: 5, backgroundColor: '#E9967A' }}></div>
        <div className='row' style={{backgroundColor:'', width:'100%', paddingRight:0, marginRight:0}}>
            <div className='col-8'>
                <p style={{marginBottom:1, fontSize:12}}><b>{stockDetails.company_name+" "+stockDetails.article_name}</b></p>
                 <p style={{fontSize:12, color:'gray', marginBottom:1}}> MRP : {stockDetails.mrp}</p>
                 <p style={{fontSize:10, color:'gray', marginBottom:1}}>Qty : {stockDetails.qty}</p>
                 <p style={{fontSize:10, color:'gray', marginBottom:1}}>Available Stock : {stockDetails.stock}</p>
                 <p style={{fontSize:10, color:'gray', marginBottom:1}}>Vendor : {stockDetails.vendor_name}</p>
                 <p style={{fontSize:10, color:'gray', marginBottom:3}}>stock Date : {stockDetails.stock_date}</p>
                 <p style={{fontSize:10, color:'gray', marginBottom:3}}>Total Stock Price : {Number(stockDetails.stock) * Number(stockDetails.actual_price)}</p>
            </div>
            <div className='col-4' >
                <span style={{color:'green', fontSize:12}}>+ {stockDetails.actual_price}</span>
            </div>
        </div>
       
      </ListItem>

      {index !== stockList.length - 1 && (
        <Divider variant="fullWidth" component="li" />
      )}
    </React.Fragment>
  ))}
</List>

{/* pagination code will be here */}
<div className='row' style={{margin:20,  backgroundColor:'', float:'center', marginRight:0}}>
                            <Stack spacing={0}>
                            <Pagination count={4} page={1}  color="error" />
                             </Stack>
                            </div>

                            


   
    </>
  )
}

export default StockList