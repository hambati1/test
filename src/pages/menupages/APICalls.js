import React, { useEffect, useState,useRef  } from "react";
import {  CREATE_NEW_CONTACT,  DELETE_CONTACT,  FETCH_ERROR,  FETCH_START,  FETCH_SUCCESS,  GET_CONTACT_FOLDER_LIST,  GET_CONTACT_LABEL_LIST,  GET_CONTACT_LIST,  SHOW_MESSAGE,  TOGGLE_CONTACT_DRAWER,  UPDATE_CONTACT_DETAIL,  UPDATE_CONTACT_LABEL,  UPDATE_CONTACT_STARRED_STATUS,
} from 'shared/constants/ActionTypes';
import {appIntl} from '@crema/utility/helper/Utils';
import jwtAxios from '@crema/services/auth/jwt-auth';
import axios from 'axios';

const PATH='http://172.20.51.231:8761/cm/api/';
let result=[];

export const getimportSearchData = async (selectfileType) => {
  console.log(selectfileType)
  const b0 = {"fileTypeId": selectfileType,
             "page": 1,"size": 3,
             "sort": ["importDt,desc"]};
  let session=localStorage.getItem('token');
  const config = {
    headers: {
      'content-type': 'application/json',
      Session: session
    },
  };
  const response = await axios.post(PATH + 'searchimportfile',  b0,config);
   console.log(response.data.response,"data")
   return response.data.response;
}


export const getImportFileTypeData=() => {
console.log("sssssssssss");
let session=localStorage.getItem('token');
  const response = fetch(PATH + "cn/filetype?functionId=6&isActive=1&isImport=0", {
    method: 'GET',
    headers: { Session: session }
  }
  ).then((response) => response.json());
  console.log(response);
  return response;
};

 export const getImportFileNames = (event) => {
      console.log(event);
      let session=localStorage.getItem('token');
      if (event != undefined) {
        const url = PATH + 'ar/import/file/list?fileTypeId=' + event + '&brandId=1';
        const response = fetch(url, {
          method: 'GET',
          headers: { Session: session }
        }
        ).then((response) => response.json());
        console.log(response);
        return response;
      }
    };

  export const onSubmitImportHandler = (payload) => {
       const url = PATH + 'ar/import/file';
       let session=localStorage.getItem('token');
       const config = {
          headers: {
            'content-type': 'application/json',
            Session: session
          },
        };
        axios.post(url, payload, config).then((response) => {
          console.log(response.data);
        });
      }

 /* END import */

/* Export */

export const getExportFileTypeData=() => {
console.log("sssssssssss");
let session=localStorage.getItem('token');
  const response = fetch(PATH + "cn/filetype?functionId=6&isActive=1&isImport=0", {
    method: 'GET',
    headers: { Session: session }
  }
  ).then((response) => response.json());
  console.log(response);
  return response;
};

export const getExportSearchData=(fileTypeId,brandId) => {
  let b0={"fileTypeId": fileTypeId, "brandId": brandId};
  let session=localStorage.getItem('token');
    const response = fetch(PATH + "ar/export/file", {
      method: 'POST',
      headers: { "Content-Type": 'application/json', Session: session },
      body: JSON.stringify(b0)
    }
    ).then((response) => response.json());
    console.log(response);
     return response;
  };

  export const getExportFileNames = (event) => {
    console.log(event);
    let session=localStorage.getItem('token');
    if (event != undefined) {
    let b0={
                 "fileTypeId": event,
                 "brandId": 1
         };
      fetch(PATH + "/searchexportfile", {
           method: 'POST',
           headers: { "Content-Type": 'application/json', Session: session },
           body: JSON.stringify(b0)
         }
         ).then((response) => response.json())
          .then(function(data) {
                 result = data.response;
             });
         return result;
    }
  };

export const onSubmitExportHandler = (json) => {
    const url = PATH + 'ar/export/file';
    let session=localStorage.getItem('token');
    const config = {
      headers: {
        'content-type': 'application/json',
        Session: session
      },
    };
    axios.post(url, json, config).then((response) => {
      console.log(response.data);
      return response.data;
    });
  }

/* End Export */

/*Batch payment*/

export const saveBatchName= (json,batchId) => {
  let session=localStorage.getItem('token');
  let message='';
  const url = PATH + 'ar/batch/save/'+batchId;
  console.log(JSON.stringify(json));
  message= fetch(url, {
      method: 'POST',
      body:JSON.stringify(json),
      headers: { "Content-Type": 'application/json', Session: session }
    }
  ).then((response) => response.json())
   .then(function(data) {
          console.log('data=',data)
          return data;
      });
  console.log(message);
return message;
}

export const getBatchDetailsByBatchIdService= (active) => {
let subdata;
let session=localStorage.getItem('token');
   subdata =  fetch(PATH + 'ar/batch/'+active, {
      method: 'GET',
      headers: { "Content-Type": 'application/json', Session: session }
    }).then((response) => response.json())
    .then(function(data) {
        subdata = data.response;
           console.log('api=',subdata)
        return subdata;
    });
  return subdata;
}

export const getSearchData= (active) => {
let session=localStorage.getItem('token');
  fetch(PATH + 'ar/batch?isPayment='+active+'&isClosed=0', {
      method: 'GET',
      headers: { "Content-Type": 'application/json', Session: session }
    }
    ).then((response) => response.json())
    .then(function(data) {
        result = data.response;
    });
return result;
}
/*End Batch payment*/


/*GL Account api*/
export const getGLAccountData = (json) => {
  console.log(json);
  const url = PATH + 'ar/searchglcodes';
  let session=localStorage.getItem('token');
  const config = {
    headers: {
      'content-type': 'application/json',
      Session: session
    }};
      const response = axios.post(url,json,config);
      console.log(response);
  return response;
}

export const accountUpdate = (key,json) => {
  console.log('abc===',json);
  const url = PATH + 'ar/gl/cd/save/'+key;
  let session=localStorage.getItem('token');
  const config = {
    headers: {
      'content-type': 'application/json',
      Session: session
    },
  };
  axios.post(url, json, config).then((response) => {
    console.log(response.data);
    result= response.data;
  });
  return result;
}


export const saveGLAccount = (json) => {
  console.log(json);
  const url = PATH + 'ar/gl/cd/save';
  /*let session=localStorage.getItem('token');
  const config = {
    headers: {
      'content-type': 'application/json',
      Session: session
    },
  };
  axios.post(url, json, config).then((response) => {
    console.log(response.data);
    result= response.data;
  });*/
  let result={"glcode":10,"accountNumber":123,"description":"desc","updatedBy":"hambati","updateDate":"24-12-2022","comments":"comments"};
  return result;
}
/* ENd GL account api */

/*Tax api*/


export const onSubmitTaxHandler = (payload) => {
  const url = PATH + 'ar/tax/viewer';
  let session=localStorage.getItem('token');
  const config = {
     headers: {
       'content-type': 'application/json',
       Session: session
     },
   };
   axios.post(url, payload, config).then((response) => {
     console.log(response.data);
   });
 }

 export const getTaxFileTypeData=(functionId) => {
  let session=localStorage.getItem('token');
    const response = fetch(PATH + "tx/tax/cd", {
      method: 'GET',
      headers: { Session: session }
    }
    ).then((response) => response.json());
    console.log(response);
    return response;
  };

  /*end tax api*/


/* Start CC Card api*/

export const getTranscationTypeData=(functionId) => {
  let session=localStorage.getItem('token');
    const response = fetch(PATH + "/ar/txn/type", {
      method: 'GET',
      headers: { Session: session }
    }
    ).then((response) => response.json());
    console.log(response);
    return response;
  };


  export const getCardTypeData=(functionId) => {
    let session=localStorage.getItem('token');
      const response = fetch(PATH + "/credit/card/type", {
        method: 'GET',
        headers: { Session: session }
      }
      ).then((response) => response.json());
      console.log(response);
      return response;
    };

    export const getStatusTypeData=(functionId) => {
      let session=localStorage.getItem('token');
        const response = fetch(PATH + "/ar/txn/status", {
          method: 'GET',
          headers: { Session: session }
        }
        ).then((response) => response.json());
        console.log(response);
        return response;
      };
/* end  CC Card api*/

/* Search Tab */
export const onSearchPayment = (json) => {
    const url = PATH + '/ar/searchpayments';
    let session=localStorage.getItem('token');
    const config = {
      headers: {
        'content-type': 'application/json',
        Session: session
      },
    };
    axios.post(url, json, config).then((response) => {
      console.log(response.data);
      return response.data;
    });
  }

/* End Search Tab */