import React , {useState, useEffect}from 'react'
import { Accordion, AccordionDetails, AccordionSummary, AppBar, Box, Button, Chip, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle, IconButton, makeStyles, MenuItem, Pagination, Slide, SpeedDial, Stack, TextField, Toolbar, Zoom } from '@mui/material';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import Divider from '@mui/material/Divider';
import Typography from '@mui/material/Typography';
import * as API from "../../apiservice/services";
import { useNavigate } from 'react-router-dom';
import Header from '../../components/Header/header';
import Loader from '../../components/Loader/loader';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import CloseIcon from '@mui/icons-material/Close';


function SalesList() {
    const[salesList, setSalesList] = useState([])
    const[page, setPage] = useState(1)
    const[saleCount, setSaleCount] = useState(1)
    const [loaderVisible, setLoaderVisilbe] = useState(true)
    const [saleUpdateDialogVisible, setSaleUpdateDialogVisible] = useState(false)
    const [saleDeleteDialogVisible, setSaleDeleteDialogVisible] = useState(false)
    const [stockList, setStockList] = useState([])
    const [saleId, setSaleId] = useState("")

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

    const paginationHandle = async (event, value) => {
      console.log("vlaue in handl change for pagination", value)
      setLoaderVisilbe(true)
      setPage(value)
      await fetchAllSales(value)
      setLoaderVisilbe(false)
  };
   
    //handle change for accordion for update the sale
    const [expanded, setExpanded] = React.useState(false);
    const handleChangeSaleUpdate = (panel) => (event, isExpanded) => {
      setExpanded(isExpanded ? panel : false);
    };
  


  
    async function fetchAllSales(page){
        API.getListOfStock(page, 100).then((res) => {
            setStockList(res.data.data);
            setSaleCount(res.data.totalCount)
             setLoaderVisilbe(false)
        });
    }

    async function fetchStockListDetails(){
      API.getStockList().then((res) => {
          setStockList(res.data.data);
      }).catch((error)=>{
          alert("Not able to fetch customer details")
      })
  }


    //----------------Sale update--------------------------------------------------
async function fetchSaleDetailsByLabourId(saleId){

  API.getStockById(saleId).then((res) => {
    setSaleFormFileds(res.data.data);
    
    console.log("here i update work", res.data.data)
  });
}

async function deleteSaleDetailsByLabourId(){
  setSaleDeleteDialogVisible(false)
  setLoaderVisilbe(true)
  API.deleteStockBySaleId(saleId).then(async(res) => {
    console.log("here is the response after delete the entry ", res)
          
           
             fetchAllSales(1)
             setLoaderVisilbe(false)  
             setSaleUpdateDialogVisible(false)        
           
   })
   .catch((err) => {
       setLoaderVisilbe(false) 
       alert("Stock alread sold out can't be delete!!", err)
       console.log("here is the create Labour error!! ", err)
   })
   }

const[disableUpdateSaleField, setDisableUpdateSaleField] = useState(false)
const [createSaleFormFields, setSaleFormFileds] = useState({
  company_name:'',
  article_name:'',
  mrp:'',
  actual_price:'',
  stock:'',
  vendor_name:'',
  stock_date: ''
})

const handleSaleFormChange= (event)=>{
  console.log( event.target.name)
  let data = {...createSaleFormFields}
  data[event.target.name] = event.target.value; 
  setSaleFormFileds(data);
}

const updateSales=async()=>{
console.log("update Labour Labouring...")


 
setLoaderVisilbe(true)

API.updateStock(saleId,  createSaleFormFields)
.then(async(res) => {
 console.log("Response for update request form ", res)
       
          fetchAllSales(1)
          setLoaderVisilbe(false)  
          setSaleUpdateDialogVisible(false)        
        
})
.catch((err) => {
    setLoaderVisilbe(false) 
    alert("Labour Not updated!!", err)
    console.log("here is the create Labour error!! ", err)
})
}


    useEffect(() => {
      setLoaderVisilbe(true)
      
        fetchAllSales(page)
        }, []);
 
  return (

    <>
      {/* <Loader/> */}
        <Header/>
        {loaderVisible ? <Loader/>:
        <>
                <Stack direction="row" spacing={2} style={{marginTop:10, display: 'flex', alignItems: 'center', justifyContent: 'center'}}>
            <Chip size='small' label="Yesterday" />
            <Chip size='small' label="All" style={{backgroundColor:'#E9967A'}}/>
            <Chip size='small' label="Today"  />
        </Stack>

        <List sx={{ width: '100%', marginBottom: 5, bgcolor: 'background.paper' }}>
        {stockList.map((stockDetails, index) => (
    <React.Fragment key={index}>

<Accordion expanded={expanded === 'panel'+index} onChange={handleChangeSaleUpdate('panel'+index)}>
        <AccordionSummary
          // expandIcon={<ExpandMoreIcon />}
          
         // aria-controls="panel1a-content"
         aria-controls={"panel"+index+"bh-content"}
          id={"panel"+index+"bh-header"}
          onClick={()=>(fetchSaleDetailsByLabourId(stockDetails.stock_id), fetchStockListDetails())}
          style={{backgroundColor:'', width:'100%'}}
        >
          {/* <Typography > */}
          <ListItem alignItems='left'  style={{height:130, width: '100%', cursor: 'pointer', position: 'relative', backgroundColor:'', paddingRight:0, marginRight:0 }} >
        
        <div style={{ position: 'absolute', top: 0, left: -2, height: '100%', width: 5, backgroundColor: '#E9967A' }}></div>
      <div className='row' style={{backgroundColor:'', width:'100%', paddingRight:0, marginRight:0}}>
          <div className='col-8'>
              <p style={{marginBottom:1, fontSize:12}}><b>{stockDetails.company_name+" "+stockDetails.article_name}</b></p>
               <p style={{fontSize:12, color:'gray', marginBottom:1}}> MRP : {stockDetails.mrp}</p>
               <p style={{fontSize:10, color:'gray', marginBottom:1}}>Qty : {stockDetails.stock}</p>
               <p style={{fontSize:10, color:'gray', marginBottom:1}}>Available Stock : {stockDetails.qty}</p>
               <p style={{fontSize:10, color:'gray', marginBottom:1}}>Vendor : {stockDetails.vendor_name}</p>
               <p style={{fontSize:10, color:'gray', marginBottom:3}}>stock Date : {stockDetails.stock_date}</p>
               <p style={{fontSize:10, color:'gray', marginBottom:3}}>Total Stock Price : {Number(stockDetails.stock) * Number(stockDetails.actual_price)}</p>
          </div>
          <div className='col-4' >
              <span style={{color:'green', fontSize:12}}>+ {stockDetails.actual_price}</span>
          </div>
      </div>
     
    </ListItem>

          {/* </Typography> */}
        </AccordionSummary>
        <AccordionDetails style={{backgroundColor:'#E9967A', paddingTop:0, paddingBottom:0}}>
         <div className='row' >
          <div className="col-6" style={{display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center'}}>
          <IconButton onClick={()=>(setSaleUpdateDialogVisible(true), setSaleId(stockDetails.stock_id))}  aria-label="delete"  color="primary" style={{ width:40, textAlign:'right', }}><EditIcon color='action'/></IconButton>
          </div>
          <div className="col-6" style={{display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center'}}>
          <IconButton onClick={()=>(setSaleDeleteDialogVisible(true), setSaleId(stockDetails.stock_id))} aria-label="delete"  color="primary" style={{ width:40, textAlign:'right', }}><DeleteIcon color='action'/></IconButton>
          </div>
         </div>
        </AccordionDetails>
      </Accordion>

      {index !== salesList.length - 1 && (
        <Divider variant="fullWidth" component="li" />
      )}
    </React.Fragment>
  ))}
</List>

{/* pagination code will be here */}
<div className='row' style={{margin:20,  backgroundColor:'', float:'center', marginRight:0}}>
<Stack spacing={0} style={{display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center'}}>
  <Pagination count={Math.ceil(saleCount / 10)} page={page} onChange={paginationHandle} color="error" />
</Stack>
</div>
{/* --------dialog for update sales details */}
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
              Update Stock Details
            </Typography>
            
          </Toolbar>
        </AppBar>
        <DialogContent>
          <DialogContentText>
            
          </DialogContentText>
         
                {/* <p style={{fontWeight:700, color:'#5F5E5E', fontSize:15, marginTop:0, marginBottom:0, paddingLeft:0}}>Create Stock :</p> */}
                
            
                <TextField  margin="dense"  name='company_name'  disabled={disableUpdateSaleField} onChange={event => handleSaleFormChange(event)} value={createSaleFormFields.company_name} label="Company Name" placeholder='Flight' type="text" fullWidth variant="standard"/>
                <TextField  margin="dense"  name='article_name'  disabled={disableUpdateSaleField} onChange={event => handleSaleFormChange(event)} value={createSaleFormFields.article_name} label="Article Name" placeholder='Flight PU 8764' type="text" fullWidth variant="standard"/>
                <TextField  margin="dense"  name='mrp'  disabled={disableUpdateSaleField} onChange={event => handleSaleFormChange(event)} value={createSaleFormFields.mrp} label="MRP" placeholder='1500.00' type="number" fullWidth variant="standard"/>
                <TextField  margin="dense"  name='actual_price'  disabled={disableUpdateSaleField} onChange={event => handleSaleFormChange(event)} value={createSaleFormFields.actual_price} label="Actual Price" placeholder='1200.00' type="number" fullWidth variant="standard"/>
               
               
                <TextField  margin="dense"  name='stock'  disabled={disableUpdateSaleField} onChange={event => handleSaleFormChange(event)} value={createSaleFormFields.stock} label="Quantity" placeholder='1' type="number" fullWidth variant="standard"/>
                {/* <TextField  margin="dense"  name='sale_price'  disabled={disableSaleField} onChange={event => handleSaleFormChange(event)} value={createSaleFormFields.sale_price} label="Sale Price" placeholder='2000.00' type="number" fullWidth variant="standard"/> */}
                <TextField  margin="dense"  name='vendor_name'  disabled={disableUpdateSaleField} onChange={event => handleSaleFormChange(event)} value={createSaleFormFields.vendor_name} label="Vendor Name" placeholder='Gupta Footware' type="text" fullWidth variant="standard"/>
                
                <TextField  margin="dense"  name='stock_date'  disabled={disableUpdateSaleField} onChange={event => handleSaleFormChange(event)} value={createSaleFormFields.stock_date} label="Stock Date"  type="datetime-local" fullWidth variant="standard"/>
                  
        </DialogContent>
        <DialogActions>
          <Button color="inherit" onClick={()=>setSaleUpdateDialogVisible(false)}>Cancel</Button>
          <Button color='error' onClick={()=>{updateSales()}}>Update</Button>
        </DialogActions>
      </Dialog>
{/* ------------close dialog for update sales details */}

{/* --------dialog for delete sales details */}
<Dialog 
        
       
        TransitionComponent={Transition}

open={saleDeleteDialogVisible} onClose={()=>setSaleDeleteDialogVisible(false)}>
  <AppBar sx={{ position: 'relative' }} color='error'> 
          <Toolbar>
            <IconButton
              edge="start"
              color="inherit"
              onClick={()=>setSaleDeleteDialogVisible(false)}
              aria-label="close"
            >
              <CloseIcon />
            </IconButton>
            <Typography sx={{ ml: 2, flex: 1 }} variant="h6" component="div">
              Delete Stock 
            </Typography>
            
          </Toolbar>
        </AppBar>
        <DialogContent>
          <DialogContentText>
             Are you sure you want to delete the stock ?
          </DialogContentText>
         
               
        </DialogContent>
        <DialogActions>
          <Button color="inherit" onClick={()=>setSaleDeleteDialogVisible(false)}>Cancel</Button>
          <Button color='error' onClick={()=>{deleteSaleDetailsByLabourId()}}>Delete</Button>
        </DialogActions>
      </Dialog>
{/* ------------close dialog for update sales details */}

        </>}


    </>
  )
}

const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});

export default SalesList