import { Accordion, AccordionDetails, AccordionSummary, AppBar, Button, Dialog, IconButton, List, ListItem, ListItemAvatar, ListItemText, MenuItem, Slide, TextField, Toolbar, Typography } from '@mui/material';
import React , {useState, useEffect}from 'react'
import { Container, Card, ListGroup } from 'react-bootstrap'
import { useNavigate, useParams } from 'react-router-dom';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import * as API from "../../apiservice/services";
import Avatar from '@mui/material/Avatar';
import ImageIcon from '@mui/icons-material/Image';
import WorkIcon from '@mui/icons-material/Work';
import BeachAccessIcon from '@mui/icons-material/BeachAccess';
import EngineeringIcon from '@mui/icons-material/Engineering';
import CloseIcon from '@mui/icons-material/Close';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import Header from '../../components/Header/header';
import Loader from '../../components/Loader/loader';

function CreateStock() {

    const navigate = useNavigate();
  
    let todayDate = new Date()
    const[loaderVisible, setLoaderVisilbe] = useState(false)
    const[disableSaleField, setDisabledSaleField] = useState(false)
    const [createSaleFormFields, setSaleFormFileds] = useState({
        company_name:'',
        article_name:'',
        mrp:'',
        actual_price:'',
        stock:'',
        vendor_name:'',
        stock_date: todayDate.toLocaleDateString()
    })

  const handleSaleFormChange= (event)=>{
        console.log( event.target.name)
        let data = {...createSaleFormFields}
        data[event.target.name] = event.target.value; 
        setSaleFormFileds(data);
  }

  const createStock=async()=>{
    console.log("create stock is working...")
    
    console.log(createSaleFormFields)
     
    setLoaderVisilbe(true)

    API.createStock(createSaleFormFields)
    .then(async(res) => {
     console.log("here is the response for create stock form ", res)
            if(res.status==201){
            setLoaderVisilbe(false)
            setDisabledSaleField(true)  
            navigate('/home')            
            }
    })
    .catch((err) => {
        setLoaderVisilbe(false) 
        alert("stock Not created!!", err)
        console.log("here is the create stock error!! ", err)
  })
 }


 
  return (
    <>
     
     <Header/>
     {loaderVisible? <Loader/>:
     <>
     <div className='row' style={{height:'auto', backgroundColor:'', borderRadius:5,  padding:0, margin:0, padding:10, marginBottom:20, marginTop:10, paddingBottom:0}}>
            
            <p style={{fontWeight:700, color:'#5F5E5E', fontSize:15, marginTop:0, marginBottom:0, paddingLeft:0}}>Create Stock :</p>
                
            
                
                <TextField  margin="dense"  name='company_name'  disabled={disableSaleField} onChange={event => handleSaleFormChange(event)} value={createSaleFormFields.company_name} label="Company Name" placeholder='Flight' type="text" fullWidth variant="standard"/>
                <TextField  margin="dense"  name='article_name'  disabled={disableSaleField} onChange={event => handleSaleFormChange(event)} value={createSaleFormFields.article_name} label="Article Name" placeholder='Flight PU 8764' type="text" fullWidth variant="standard"/>
                <TextField  margin="dense"  name='mrp'  disabled={disableSaleField} onChange={event => handleSaleFormChange(event)} value={createSaleFormFields.mrp} label="MRP" placeholder='1500.00' type="number" fullWidth variant="standard"/>
                <TextField  margin="dense"  name='actual_price'  disabled={disableSaleField} onChange={event => handleSaleFormChange(event)} value={createSaleFormFields.actual_price} label="Actual Price" placeholder='1200.00' type="number" fullWidth variant="standard"/>
               
               
                <TextField  margin="dense"  name='stock'  disabled={disableSaleField} onChange={event => handleSaleFormChange(event)} value={createSaleFormFields.stock} label="Quantity" placeholder='1' type="number" fullWidth variant="standard"/>
                {/* <TextField  margin="dense"  name='sale_price'  disabled={disableSaleField} onChange={event => handleSaleFormChange(event)} value={createSaleFormFields.sale_price} label="Sale Price" placeholder='2000.00' type="number" fullWidth variant="standard"/> */}
                <TextField  margin="dense"  name='vendor_name'  disabled={disableSaleField} onChange={event => handleSaleFormChange(event)} value={createSaleFormFields.vendor_name} label="Vendor Name" placeholder='Gupta Footware' type="text" fullWidth variant="standard"/>
                
                <TextField  margin="dense"  name='stock_date'  disabled={disableSaleField} onChange={event => handleSaleFormChange(event)} value={createSaleFormFields.stock_date} label="Stock Date"  type="datetime-local" fullWidth variant="standard"/>
                   
               
                <div className="row" style={{width:'100%', backgroundColor:'', display:'flex', justifyContent:'flex-end', marginRight:0,  paddingRight:0, marginRight:0, margin:0, padding:0, marginTop:20, marginBottom:20,}}>
                <Button onClick={()=>navigate('/home')} color="inherit" disabled={disableSaleField}  style={{ height:30, width:90, textAlign:'center', marginRight:20, padding:0, fontSize:12, fontWeight:600, borderRadius:3, boxShadow:'0px 4px 4px rgba(0, 0, 0, 0.25)', border:'0px'}}>Cancel</Button>
                <Button onClick={()=>createStock()} variant='contained' color='error' style={{backgroundColor:'', height:30, width:90, textAlign:'center', marginRight:0, padding:0, fontSize:12, fontWeight:600, borderRadius:3, boxShadow:'0px 4px 4px rgba(0, 0, 0, 0.25)', border:'0px', color:'white'}} disabled={disableSaleField || createSaleFormFields.article_name=="" || createSaleFormFields.qty=="" || createSaleFormFields.sale_date=="" || createSaleFormFields.sale_price==""  }>Create</Button>
                                   
                </div>  
          
    </div>
     </>}
    
          
    </>
  )
}

export default CreateStock