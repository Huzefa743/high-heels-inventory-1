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
        API.getListOfSales(page, 100).then((res) => {
            setSalesList(res.data.data);
            setSaleCount(res.data.totalRecords)
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

  API.getSaleBySaleId(saleId).then((res) => {
    setSaleFormFileds(res.data.data);
    
    console.log("here i update work", res.data.data)
  });
}

async function deleteSaleDetailsByLabourId(){
  setSaleDeleteDialogVisible(false)
  setLoaderVisilbe(true)
  API.deleteSaleBySaleId(saleId).then((res) => {
    fetchAllSales(1)
    setLoaderVisilbe(false)
    
    console.log("successfully delete the sale", res.data.data)
  });
}

const[disableUpdateSaleField, setDisableUpdateSaleField] = useState(false)
const [saleFormFields, setSaleFormFileds] = useState({
  article_name:'',
  qty:'',
  sale_price:'',
  sale_date:''
})

const handleUpdateSaleFormChange= (event)=>{
    console.log( event.target.name)
    let data = {...saleFormFields}
    data[event.target.name] = event.target.value; 
    setSaleFormFileds(data);
}

const updateSales=async()=>{
console.log("update Labour Labouring...")

console.log(saleFormFields)
 
setLoaderVisilbe(true)

API.updateSale(saleId,  saleFormFields)
.then(async(res) => {
 console.log("here is the response for update Labour form ", res)
        if(res.status==200){
        
          fetchAllSales(1)
          setLoaderVisilbe(false)  
          setSaleUpdateDialogVisible(false)        
        }
})
.catch((err) => {
    setLoaderVisilbe(false) 
    alert("Labour Not updated!!", err)
    console.log("here is the create Labour error!! ", err)
})
}

//--------------- labour update close-------------------------------------------

    const updateSale=async()=>{
      console.log("update Sale working...")
      
    //   console.log(createWorkFormFields)
       
    //   setLoaderVisilbe(true)
  
    //   API.updateWork(selectedWorkUpdateId, createWorkFormFields)
    //   .then(async(res) => {
    //    console.log("here is the response for create Work form ", res)
    //           if(res.status==200){
    //             fetchSiteList()
    //           // setDisableCreateWorkField(true)  
             
    //           setLoaderVisilbe(false)  
    //           setWorkUpdateDialogVisible(false)         
    //           }
    //   })
    //   .catch((err) => {
    //       setLoaderVisilbe(false) 
    //       alert("Work Not update!!", err)
    //       console.log("here is the update Work error!! ", err)
    // })
   }
    useEffect(() => {
      setLoaderVisilbe(true)
      
        fetchAllSales(page)
        }, []);
 
  return (

    <>
      {/* <Loader/> */}
        <Header/>
        {loaderVisible ? <Loader/>:<>
        
        <Stack direction="row" spacing={2} style={{marginTop:10, display: 'flex', alignItems: 'center', justifyContent: 'center'}}>
            <Chip size='small' label="Yesterday" />
            <Chip size='small' label="All" style={{backgroundColor:'#E9967A'}}/>
            <Chip size='small' label="Today"  />
        </Stack>

        <List sx={{ width: '100%', marginBottom: 5, bgcolor: 'background.paper' }}>
  {salesList.map((salesDetails, index) => (
    <React.Fragment key={index}>

<Accordion expanded={expanded === 'panel'+index} onChange={handleChangeSaleUpdate('panel'+index)}>
        <AccordionSummary
          // expandIcon={<ExpandMoreIcon />}
          
         // aria-controls="panel1a-content"
         aria-controls={"panel"+index+"bh-content"}
          id={"panel"+index+"bh-header"}
          onClick={()=>(fetchSaleDetailsByLabourId(salesDetails.sale_id), fetchStockListDetails())}
          style={{backgroundColor:'', width:'100%'}}
        >
          {/* <Typography > */}
          <ListItem alignItems='left'  style={{height:90, width: '100%', cursor: 'pointer', position: 'relative', backgroundColor:'', paddingRight:0, marginRight:0 }} >
        
        <div style={{ position: 'absolute', top: 0, left: -2, height: '100%', width: 5, backgroundColor: '#E9967A' }}></div>
      <div className='row' style={{backgroundColor:'', width:'100%', paddingRight:0, marginRight:0}}>
          <div className='col-8'>
              <p style={{marginBottom:1, fontSize:12}}><b>{salesDetails.company_name+" "+salesDetails.article_name}</b></p>
               <p style={{fontSize:12, color:'gray', marginBottom:1}}> Qty : {salesDetails.qty}</p>
               <p style={{fontSize:10, color:'gray', marginBottom:1}}>{salesDetails.sale_date}</p>
               <p style={{fontSize:10, color:'gray', marginBottom:3}}>By : {salesDetails.sales_man}</p>
          </div>
          <div className='col-4' >
              <span style={{color:'green', fontSize:12}}>+ {salesDetails.sale_price}</span>
          </div>
      </div>
     
    </ListItem>

          {/* </Typography> */}
        </AccordionSummary>
        <AccordionDetails style={{backgroundColor:'#E9967A', paddingTop:0, paddingBottom:0}}>
         <div className='row' >
          <div className="col-6" style={{display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center'}}>
          <IconButton onClick={()=>(setSaleUpdateDialogVisible(true), setSaleId(salesDetails.sale_id))}  aria-label="delete"  color="primary" style={{ width:40, textAlign:'right', }}><EditIcon color='action'/></IconButton>
          </div>
          <div className="col-6" style={{display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center'}}>
          <IconButton onClick={()=>(setSaleDeleteDialogVisible(true), setSaleId(salesDetails.sale_id))} aria-label="delete"  color="primary" style={{ width:40, textAlign:'right', }}><DeleteIcon color='action'/></IconButton>
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
              Update Sale Details
            </Typography>
            
          </Toolbar>
        </AppBar>
        <DialogContent>
          <DialogContentText>
            
          </DialogContentText>
         
                <p style={{fontWeight:700, color:'#5F5E5E', fontSize:15, marginTop:0, marginBottom:0, paddingLeft:0}}>Create Stock :</p>
                
            
               <TextField id="standard-select-currency" name='article_name'  disabled={disableUpdateSaleField} onChange={(event) => ( handleUpdateSaleFormChange(event))} value={saleFormFields.article_name} select label="Article Name" defaultValue="" variant="standard" fullWidth>      
                                                {stockList.map((stockDetials)=>(
                                                    <MenuItem value={stockDetials.article_name} >{stockDetials.company_name} {stockDetials.article_name}</MenuItem>   
                                                ))}
                                    </TextField>
                     
                        <TextField  margin="dense"  name='qty'  disabled={disableUpdateSaleField} onChange={event => handleUpdateSaleFormChange(event)} value={saleFormFields.qty} label="Quantity" placeholder='1' type="number" fullWidth variant="standard"/>
                         <TextField  margin="dense"  name='sale_price'  disabled={disableUpdateSaleField} onChange={event => handleUpdateSaleFormChange(event)} value={saleFormFields.sale_price} label="Sale Price" placeholder='2000.00' type="number" fullWidth variant="standard"/>
                        {/* <TextField  margin="dense"  name='sale_date'  disabled={disableUpdateSaleField} onChange={event => handleUpdateSaleFormChange(event)} value={saleFormFields.sale_date} label="Sale Date"  type="datetime-local" fullWidth variant="standard"/> */}
                   
                {/* <div className="row" style={{display:'flex', justifyContent:'flex-end', marginRight:0, marginTop:20, marginBottom:20, paddingRight:0, marginRight:0}}>
                <Button onClick={()=>navigate('/home')} disabled={disableUpdateSaleField}  style={{backgroundColor:'#5F5E5E', height:30, width:90, textAlign:'center', marginRight:20, padding:0, fontSize:12, fontWeight:600, borderRadius:3, boxShadow:'0px 4px 4px rgba(0, 0, 0, 0.25)', border:'0px', color:'white'}}>Cancel</Button>
                <Button variant='contained' color='error' style={{backgroundColor:'', height:30, width:90, textAlign:'center', marginRight:0, padding:0, fontSize:12, fontWeight:600, borderRadius:3, boxShadow:'0px 4px 4px rgba(0, 0, 0, 0.25)', border:'0px', color:'white'}} disabled={disableUpdateSaleField || saleFormFields.article_name=="" || saleFormFields.qty=="" || saleFormFields.sale_date=="" || saleFormFields.sale_price==""  }>Create</Button>
                                   
                </div>   */}
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
              Delete Sale 
            </Typography>
            
          </Toolbar>
        </AppBar>
        <DialogContent>
          <DialogContentText>
             Are you sure you want to delete the sale ?
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