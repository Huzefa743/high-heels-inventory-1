import { Accordion, AccordionDetails, AccordionSummary, AppBar, Button, Dialog, IconButton, List, ListItem, ListItemAvatar, ListItemText, MenuItem, Slide, TextField, Toolbar, Typography } from '@mui/material';
import React , {useState, useEffect}from 'react'
import { Container, Card, ListGroup } from 'react-bootstrap'
import { useNavigate, useParams } from 'react-router-dom';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import * as API from "../../apiservice/services";
import Header from '../../components/Header/header';
import Loader from '../../components/Loader/loader';

function CreateSale() {

    const navigate = useNavigate();

    const[stockList, setStockList] = useState([])
    const[companyNameList, setCompanyNameList] = useState([])
    const[articleList, setArticleList] = useState([])
    const[companyName, setCompanyName] = useState('')
    const[stockShortage, setStockShortage] = useState(false)
   

    async function fetchCompanyList(){
        API.getListOfCompanyName().then((res) => {
            setCompanyNameList(res.data.data);
        }).catch((error)=>{
            alert("Not able to fetch customer details")
        })
    }

    async function fetchArticleList(companyName){
        console.log("companyName", companyName)
        API.getListOfArticle(companyName).then((res) => {
            setArticleList(res.data.data);
        }).catch((error)=>{
            alert("Not able to fetch article list")
        })
    }



    const[loaderVisible, setLoaderVisilbe] = useState(false)
    const[disableSalesField, setDisableSalesField] = useState(false)
    const[disableSaleField, setDisabledSaleField] = useState(false)
    let todayDate = new Date()
    const [createSaleFormFields, setSaleFormFileds] = useState({
        company_name:'',
        article_name:'',
        qty:'',
        sale_price:'',
        sale_date:todayDate.toLocaleDateString()
    })

    const handleSaleFormChange= (event)=>{
        let data = {...createSaleFormFields}
        data[event.target.name] = event.target.value; 
        setSaleFormFileds(data);
  }

  const createSale=async()=>{
    console.log("create sale is working...")
    
    console.log(createSaleFormFields)
     
    setLoaderVisilbe(true)

    API.createSale(createSaleFormFields)
    .then(async(res) => {
     console.log("here is the response for create sale form ", res)
            if(res.status==201){
            setLoaderVisilbe(false)
            setDisabledSaleField(true)  
            navigate('/home')            
            }
    })
    .catch((err) => {
        setLoaderVisilbe(false) 
        if(err.response.status==400){
                 setStockShortage(true)
                 //alert("Insufficient Stock!!")
            }
        
        console.log("here is the create stock error!! ", err)
  })
 }



    useEffect(() => {
        fetchCompanyList()
        
        }, []);
 
  return (
    <>
    <Header/>

    {loaderVisible? <Loader/>:
    <>
       <div className='row' style={{height:'auto', backgroundColor:'', borderRadius:5,  padding:0, margin:0, padding:10, marginBottom:20, marginTop:10, paddingBottom:0}}>
            <p style={{fontWeight:700, color:'#5F5E5E', fontSize:15, marginTop:0, marginBottom:0, paddingLeft:0}}>Create Sale :</p>
               <TextField id="standard-select-currency" name='company_name'  disabled={disableSaleField} onChange={(event) => ( handleSaleFormChange(event), setCompanyName(event.target.value), fetchArticleList(event.target.value))} value={createSaleFormFields.compay_name} select label="Company Name" defaultValue="" variant="standard" fullWidth>      
                                                {companyNameList.map((companyName)=>(
                                                    <MenuItem value={companyName} >{companyName}</MenuItem>   
                                                ))}
                                    </TextField>

                <TextField id="standard-select-currency" name='article_name'  disabled={disableSaleField} onChange={(event) => ( handleSaleFormChange(event))} value={createSaleFormFields.article_name} select label="Article Name" defaultValue="" variant="standard" fullWidth>      
                            {articleList.map((articleName)=>(
                                <MenuItem value={articleName} >{articleName}</MenuItem>   
                            ))}
                </TextField>
                     
                <TextField  margin="dense"  name='qty' error={stockShortage} helperText={stockShortage ? "Not Sufficient Stock!!":""}  disabled={disableSaleField} onChange={event => handleSaleFormChange(event)} value={createSaleFormFields.qty} label="Quantity" placeholder='1' type="number" fullWidth variant="standard"/>
                <TextField  margin="dense"  name='sale_price'  disabled={disableSaleField} onChange={event => handleSaleFormChange(event)} value={createSaleFormFields.sale_price} label="Sale Price" placeholder='2000.00' type="number" fullWidth variant="standard"/>
                <TextField  margin="dense"  name='sale_date'  disabled={disableSaleField} onChange={event => handleSaleFormChange(event)} value={createSaleFormFields.sale_date} label="Sale Date"  type="datetime-local" fullWidth variant="standard"/>
                   
                <div className="row" style={{display:'flex', justifyContent:'flex-end', margin:0, padding:0, marginRight:0, marginTop:20, marginBottom:20, paddingRight:0, marginRight:0}}>
                    <Button onClick={()=>navigate('/home')} color="inherit" disabled={disableSaleField}  style={{ height:30, width:90, textAlign:'center', marginRight:20, padding:0, fontSize:12, fontWeight:600, borderRadius:3, boxShadow:'0px 4px 4px rgba(0, 0, 0, 0.25)', border:'0px', }}>Cancel</Button>
                    <Button onClick={()=>createSale()}  variant='contained' color='error' style={{backgroundColor:'', height:30, width:90, textAlign:'center', marginRight:0, padding:0, fontSize:12, fontWeight:600, borderRadius:3, boxShadow:'0px 4px 4px rgba(0, 0, 0, 0.25)', border:'0px', color:'white'}} disabled={disableSaleField || createSaleFormFields.article_name=="" || createSaleFormFields.qty=="" || createSaleFormFields.sale_date=="" || createSaleFormFields.sale_price==""  }>Create</Button>                
                </div>  
    </div>
    </>
    
    }
   
    </>
  )
}

export default CreateSale