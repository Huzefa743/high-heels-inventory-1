import axios from "axios";

const baseURL = "http://localhost:8080/api/v1/"
const base = "http://mimicker.thbscoetg.com"


// Login User - POST
export const login = async (data) =>
  await axios({
    method: "POST",
    url: baseURL + "login",
    data: data,
    headers: {
      "Content-Type": "application/json",
    },
  });

//Create stock
export const createStock = async (data) =>
  await axios({
    method: "POST",
    url: baseURL + "add-stock",
    data: data,
    headers: {
      "Content-Type": "application/json",
      Authorization: `Basic ${localStorage.getItem("accesstoken")}`,
    },
  });


  //Create sale
export const createSale = async (data) =>
await axios({
  method: "POST",
  url: baseURL + "add-sale",
  data: data,
  headers: {
    "Content-Type": "application/json",
    Authorization: `Basic ${localStorage.getItem("accesstoken")}`,
  },
});

  //Get  site list - GET
  export const getStockList= async () =>{
    console.log(" jere get list of stock is working.")
    return await axios({
      method: "GET",
      url: baseURL + `get-list-stock`,
      headers: {
        "Content-Type": "application/json",
        Authorization: `Basic ${localStorage.getItem("accesstoken")}`,
      },
    });
    }

  //Get list of company name
  export const getListOfCompanyName= async () =>{
    console.log("Get list of company name.")
    return await axios({
      method: "GET",
      url: baseURL + `get-list-stock-company`,
      headers: {
        "Content-Type": "application/json",
        Authorization: `Basic ${localStorage.getItem("accesstoken")}`,
      },
    });
    }

 //Get list of article 
 export const getListOfArticle= async (company_name) =>{
  console.log("Get list of article.")
  return await axios({
    method: "GET",
    url: baseURL + `get-list-article/${company_name}`,
    headers: {
      "Content-Type": "application/json",
      Authorization: `Basic ${localStorage.getItem("accesstoken")}`,
    },
  });
  }

//Get  site list - GET
export const getListOfSales= async (page) =>{
    console.log(" jere get list of sales.")
    return await axios({
      method: "GET",
      url: baseURL + `get-list-sale?page=${page}&limit=${10}`,
      headers: {
        "Content-Type": "application/json",
        Authorization: `Basic ${localStorage.getItem("accesstoken")}`,
      },
    });
    }

    //Get  stock list - GET
export const getListOfStock= async (page) =>{
    console.log(" jere get list of stock.")
    return await axios({
      method: "GET",
      url: baseURL + `get-list-stock?page=${page}&limit=${10}`,
      headers: {
        "Content-Type": "application/json",
        Authorization: `Basic ${localStorage.getItem("accesstoken")}`,
      },
    });
    }

        //Get analytical details - GET
export const getAnalyticalDetails= async () =>{
  console.log("get analytical details.")
  return await axios({
    method: "GET",
    url: baseURL + `get-analytical`,
    headers: {
      "Content-Type": "application/json",
      Authorization: `Basic ${localStorage.getItem("accesstoken")}`,
    },
  });
  }

          //Get analytical details - GET
export const getAnalyticalDetailsCM= async () =>{
  console.log("get analytical details. CM")
  return await axios({
    method: "GET",
    url: baseURL + `get-analytical-cm`,
    headers: {
      "Content-Type": "application/json",
      Authorization: `Basic ${localStorage.getItem("accesstoken")}`,
    },
  });
  }

            //get sales details by sales man
export const getSalesBySalesMan= async () =>{
  console.log("get sales by sales man details. CM")
  return await axios({
    method: "GET",
    url: baseURL + `get-sales-by-sales-man`,
    headers: {
      "Content-Type": "application/json",
      Authorization: `Basic ${localStorage.getItem("accesstoken")}`,
    },
  });
  }

  //Get sale by sale id - GET
export const getSaleBySaleId= async (saleId) =>{
  console.log("get sale by sale id.")
  return await axios({
    method: "GET",
    url: baseURL + `get-sale/${saleId}`,
    headers: {
      "Content-Type": "application/json",
      Authorization: `Basic ${localStorage.getItem("accesstoken")}`,
    },
  });
  }

    //Get sale by sale id - GET
export const getStockById= async (stockId) =>{
  console.log("get stock by id.")
  return await axios({
    method: "GET",
    url: baseURL + `get-stock/${stockId}`,
    headers: {
      "Content-Type": "application/json",
      Authorization: `Basic ${localStorage.getItem("accesstoken")}`,
    },
  });
}

//get user details by user id
export const getUserDetailByUserId= async () =>{
  console.log("get userDetails by userId.")
  return await axios({
    method: "GET",
    url: baseURL + `get-user/${localStorage.getItem("userid")}`,
    headers: {
      "Content-Type": "application/json",
      Authorization: `Basic ${localStorage.getItem("accesstoken")}`,
    },
  });
}

    //delete sale by sale id - GET
export const deleteSaleBySaleId= async (saleId) =>{
  console.log("delete sale by sale id.")
  return await axios({
    method: "DELETE",
    url: baseURL + `delete-sale/${saleId}`,
    headers: {
      "Content-Type": "application/json",
      Authorization: `Basic ${localStorage.getItem("accesstoken")}`,
    },
  });
  }

      //delete stock by sale id - GET
export const deleteStockBySaleId= async (saleId) =>{
  console.log("delete stock by stock id.")
  return await axios({
    method: "DELETE",
    url: baseURL + `delete-stock/${saleId}`,
    headers: {
      "Content-Type": "application/json",
      Authorization: `Basic ${localStorage.getItem("accesstoken")}`,
    },
  });
  }

//-------create sale------------------
export const updateSale = async (saleId, data) =>{
  console.log("update sale is running...")
  
   return await axios({
      method: "PUT",
      url: baseURL + `update-sale/${saleId}`,
      data: data,
      headers: {
        "Content-Type": "application/json",
        Authorization: `Basic ${localStorage.getItem("accesstoken")}`,
      },
    });
  }

  //-------create stock------------------
export const updateStock = async (stockId, data) =>{
  console.log("update stock is running...")
  
   return await axios({
      method: "PUT",
      url: baseURL + `update-stock/${stockId}`,
      data: data,
      headers: {
        "Content-Type": "application/json",
        Authorization: `Basic ${localStorage.getItem("accesstoken")}`,
      },
    });
  }

// update suer
export const updateUser = async ( data) =>{
 console.log("update user is working.. ")
  const file = new FormData();
  file.append("first_name", data.first_name);
  file.append("last_name", data.last_name);
  file.append("email_id", data.email_id);
  file.append("password", data.password);
  file.append("user_type", data.user_type);
  file.append("user_avatar", data.user_avatar);
  file.append("designation", data.designation);
  file.append("mobile_number", data.mobile_number);

  return await axios({
    method: "PUT",
    url: baseURL + `update-user/${localStorage.getItem("userid")}`,
    headers: {
      "Content-Type": "multipart/form-data",
      Authorization: `Basic ${localStorage.getItem("accesstoken")}`,
    },
    data: file,
  });
};


// Register User - POST
export const register = async (data) =>{
 
  const file = new FormData();
  file.append("firstName", data.firstName);
  file.append("lastName", data.lastName);
  file.append("emailId", data.emailId);
  file.append("password", data.password);
  file.append("userType", data.userType);
  file.append("userAvatar", data.userAvatar);
  file.append("designation", data.designation);
  file.append("mobileNumber", data.mobileNumber);
  file.append("nickName", data.nickName);

  return await axios({
    method: "POST",
    url: baseURL + `create-user`,
    headers: {
      "Content-Type": "multipart/form-data"
    },
    data: file,
  });
};