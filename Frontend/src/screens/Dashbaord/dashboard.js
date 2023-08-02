import React, { useContext, useState, useEffect } from "react";
import Header from "../../components/Header/header";
import { AppBar, Box, IconButton, Paper, Toolbar, Tooltip } from "@mui/material";
import DeleteIcon from '@mui/icons-material/Delete';
import AccountBalanceWalletIcon from '@mui/icons-material/AccountBalanceWallet';
import FactCheckIcon from '@mui/icons-material/FactCheck';
import AddToPhotosIcon from '@mui/icons-material/AddToPhotos';
import RequestQuoteIcon from '@mui/icons-material/RequestQuote';
import CurrencyRupeeIcon from '@mui/icons-material/CurrencyRupee';
import TrendingUpIcon from '@mui/icons-material/TrendingUp';
import { BarChart, BarPlot } from '@mui/x-charts/BarChart';
import { ChartContainer } from "@mui/x-charts/ChartContainer";
import { useWindowSize } from '@react-hook/window-size';
import { LineChart } from '@mui/x-charts/LineChart';
import { PieChart, pieArcLabelClasses } from '@mui/x-charts/PieChart';

import BottomHeader from "../../components/BottomHeader/bottomHeader";
import { useNavigate } from "react-router-dom";

import * as API from "../../apiservice/services";
import Loader from '../../components/Loader/loader';


const Dashboard = () => {







  const navigate = useNavigate();
    const windowSize = useWindowSize();
    const windowWidth = windowSize[0];

    //line chart details
    // bargraph chart details
const [linebargraphdataSales, setlinebargraphdataSales] = useState([50000,30000,20000,10000,60000])
const [linebargraphdataSalesDate, setlinebargraphdataSalesDate] = useState(['March',
'April',
'May',
'June',
'July'])
   
    


// bargraph chart details
const [bargraphdataSales, setbargraphdataSales] = useState([0,0,0,0,0])
const [bargraphdataSalesDate, setbargraphdataSalesDate] = useState(['23-07-27',
'23-07-26',
'23-07-25',
'23-07-24',
'23-07-23'])
//---------------pie chart data---------------------------
const [data, setData] = useState([
    { label: 'Faizan', value: 400, color: '#0088FE' },
    { label: 'Zainul', value: 300, color: '#00C49F' },
    { label: 'Sarfaraz', value: 300, color: '#FFBB28' }
  ])


  
  const sizing = {
    margin: { right: 5 },
    width: 200,
    height: 200,
    legend: { hidden: true },
  };
  const TOTAL = data.map((item) => item.value).reduce((a, b) => a + b, 0);
  
  const getArcLabel = (params) => {
    const percent = params.value / TOTAL;
    return `${(percent * 100).toFixed(0)}%`;
  };

  //------------------api integration part---------------

  const [loaderVisible, setLoaderVisilbe] = useState(false)
   const [analyticalDetials, setAnalyticalDetails] = useState({})

    async function fetchAllAnalyticalDetails(){
        API.getAnalyticalDetails().then((res) => {
          setAnalyticalDetails(res.data.data);
          setbargraphdataSales(res.data.data.salesDataLastFiveDaysTotalSalesPrices)
          setbargraphdataSalesDate(res.data.data.salesDataLastFiveDaysDates)
        // setlinebargraphdataSalesDate(res.data.data.salesDataLastFiveMonthsMonths)
         // setlinebargraphdataSales(res.data.data.salesDataLastSixMonthsTotalSalesPrices)
             setLoaderVisilbe(false)
        }).catch((error)=>{
          console.log("here si the error", error)
        })
    }

    async function fetchAllAnalyticalDetailsCM(){
      API.getAnalyticalDetailsCM().then((res) => {
        console.log("here is the fetch all analytical cm data", res.data)
       setlinebargraphdataSalesDate(res.data.data.salesDataLastFiveMonthsMonths)
        setlinebargraphdataSales(res.data.data.salesDataLastFiveMonthsTotalSalesPrices)
        console.log("Data", linebargraphdataSales, linebargraphdataSalesDate)
          // setLoaderVisilbe(false)
      }).catch((error)=>{
        console.log("Here is the error", error)
      })
  }

  async function fetchSalesManDetails(){
    API.getSalesBySalesMan().then((res) => {
      console.log("fetch sales man data", res.data)
     setData(res.data.data)
      
    }).catch((error)=>{
      console.log("Here is the error", error)
    })
}

    useEffect(() => {
      setLoaderVisilbe(true)

      
      fetchAllAnalyticalDetails(1)
      fetchAllAnalyticalDetailsCM()
      fetchSalesManDetails()
        }, []);

//-----------------date close------------------------
  return (
    <>
      <Header />
      
      {loaderVisible ? <Loader/>:
      <>
       <div >
            

            <div className="container">
            <p style={{fontSize:12, fontWeight:600, marginTop:8, marginBottom:0, color:'gray'}}>Stock Statistic</p>
       <div className="row" style={{ marginTop: "3%", marginBottom: "5%" }}>
         <div className="col-md-6 d-flex">
               <div style={{padding:10, textAlign:'center', borderRadius: 10, backgroundColor: "", boxShadow:'0px 4px 10px rgba(0, 0, 0, 0.2)', height: 70, flex: 1, marginRight: 10, }} onClick={()=>navigate('/stock-list')}>
                   <div className="row">
                       <div className="col-4" style={{paddingRight:0}}><AccountBalanceWalletIcon color="secondary"/>
                       </div>
                       <div className="col-8" style={{paddingLeft:0}}>
                       <p style={{fontSize:15, fontWeight:800, color:'purple', paddingBottom:0, marginBottom:5, paddingLeft:0, marginTop:3}}>{analyticalDetials.totalStockAmount}</p>
                       </div>
                   </div>
                   <p style={{fontSize:10, fontWeight:500, color:'gray', marginTop:8}}>Total Stock Amount</p>
                </div>
           <div style={{padding:10, textAlign:'center', borderRadius: 10, backgroundColor: "", boxShadow:'0px 4px 10px rgba(0, 0, 0, 0.2)', height: 70, flex: 1, marginLeft: 10 }} onClick={()=>navigate('/sale-list')}>
                       <div className="row">
                           <div className="col-4" style={{paddingRight:0}}><FactCheckIcon color="action"/>
                           </div>
                           <div className="col-8" style={{paddingLeft:0}}>
                           <p style={{fontSize:15, fontWeight:800, color:'blue', paddingBottom:0, marginBottom:5, paddingLeft:0, marginTop:3}}>{analyticalDetials.totalSalesAmount}</p>
                           </div>
                       </div>
                       <p style={{fontSize:10, fontWeight:500, color:'gray', marginTop:8}}>Total Sales Amount</p>
                   
           </div>
         </div>
       </div>
       <div className="row" style={{ marginTop: "3%", marginBottom: "5%" }}>
         <div className="col-md-6 d-flex">
               <div style={{padding:10, textAlign:'center', borderRadius: 10, backgroundColor: "", boxShadow:'0px 4px 10px rgba(0, 0, 0, 0.2)', height: 70, flex: 1, marginRight: 10 }}>
                   <div className="row">
                       <div className="col-4" style={{paddingRight:0}}><AddToPhotosIcon color="warning"/>
                       </div>
                       <div className="col-8" style={{paddingLeft:0}}>
                       <p style={{fontSize:15, fontWeight:800, color:'#f66200', paddingBottom:0, marginBottom:5, paddingLeft:0, marginTop:3}}>{analyticalDetials.stockAvailable}</p>
                       </div>
                   </div>
                   <p style={{fontSize:10, fontWeight:500, color:'gray', marginTop:8}}>Sales Available Stock</p>
                </div>
           <div style={{padding:10, textAlign:'center', borderRadius: 10, backgroundColor: "", boxShadow:'0px 4px 10px rgba(0, 0, 0, 0.2)', height: 70, flex: 1, marginLeft: 10 }}>
                       <div className="row">
                           <div className="col-4" style={{paddingRight:0}}><RequestQuoteIcon color="error"/>
                           </div>
                           <div className="col-8" style={{paddingLeft:0}}>
                           <p style={{fontSize:15, fontWeight:800, color:'red', paddingBottom:0, marginBottom:5, paddingLeft:0, marginTop:3}}>{analyticalDetials.totalSalesActualPrice}</p>
                           </div>
                       </div>
                       <p style={{fontSize:10, fontWeight:500, color:'gray', marginTop:8}}>Sales Actual Price</p>
                   
           </div>
         </div>
       </div>

       <div className="row" style={{ marginTop: "3%", marginBottom: "5%" }}>
               <div className="col-md-12 d-flex">
               <div style={{ padding: 10, textAlign: 'center', borderRadius: 10, backgroundColor: "green", boxShadow: '0px 4px 10px rgba(0, 0, 0, 0.2)', height: 40, flex: 1, marginRight: 0, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                   <div style={{ display: 'flex', alignItems: 'center' }}>
                   <TrendingUpIcon style={{color:'white'}} fontSize="small" />
                   <p style={{ fontSize: 15, fontWeight: 800, color: 'white', paddingBottom: 0, marginBottom: 0, paddingLeft: 5, marginTop: 0 }}>{analyticalDetials.totalProfit}</p>
                   
                   </div>
                           
               </div>
               </div>
     </div>
     

     {/* --------------bars--------------------- */}
     <p style={{fontSize:12, fontWeight:600, marginTop:15, marginBottom:0, color:'gray'}}>Sales History(In Days)</p>
     <div style={{marginTop:-40}}>
     <BarChart
      
     width={windowWidth * 0.9} 
    // width={300}
     height={300}
     
     series={[
       
       { data: bargraphdataSales, label: 'Sales', id: 'uvId', stack: 'total' },
     ]}
     xAxis={[{ data: bargraphdataSalesDate, scaleType: 'band' }]}
   >
    <Tooltip followCursor={true} // Show the tooltip at the cursor position
                content={(props) => `${props.label}: ${props.datum.formattedValue}`} // Display the label and value in the tooltip
       />


   </BarChart>
   </div>
  
  {/* ---------------lines chart----------------- */}
  <p style={{fontSize:12, fontWeight:600, marginTop:15, marginBottom:0, color:'gray'}}>Sales History(In Month)</p>
     
  <div style={{marginTop:-40}}>
  <LineChart
     width={windowWidth * 0.9} 
     height={300}
     series={[{ data: linebargraphdataSales, label: 'Sales', area: true }]}
     xAxis={[{ scaleType: 'point', data: linebargraphdataSalesDate }]}
     sx={{
       '.MuiLineElement-root, .MuiMarkElement-root': {
         display: 'none',
       },
     }}
   />
  </div>
   
   {/* --------------pie chart----------------- */}
   <p style={{fontSize:12, fontWeight:600, marginTop:15, marginBottom:0, color:'gray'}}>Employees Performance(Monthly)</p>
   
  <div style={{display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', marginBottom:60}}>
   <PieChart series={[
       {
         outerRadius: 80,
         data,
         arcLabel: getArcLabel,
       },
     ]}
     sx={{
       [`& .${pieArcLabelClasses.root}`]: {
         fill: 'white',
         fontSize: 14,
       },
     }}
     {...sizing}
   />
 </div>

     </div>
       </div>
      </>}
       
{/* ------------------------botton stick app bar */}

       <BottomHeader/>
    </>
  );
};

export default Dashboard;
