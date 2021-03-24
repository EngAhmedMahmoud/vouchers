"use strict";
const mongoose = require("mongoose");
const apiRes = require("./apiResponse");
const resMsgCode = require("./resMsgCode");
const validateObjectId = (objectId) => {
  let check = mongoose.Types.ObjectId.isValid(`${objectId}`);
  return check ? true : "Not Correct ObjectID";
};
const isNumber=(number)=>{
    return !isNaN(parseFloat(number)) && isFinite(number) ||"This is not a correct number";
}
const validateEmail = (email) => {
  const re = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
  return re.test(email) ? true : "not valid email address";
};
const checkRequired = (req, res, next, fileds) => {
  if (fileds instanceof Array === false) {
    return "Fields parameter must be an array";
  }
  const errors = fileds
    .filter((element) => {
      return element.required;
    })
    .filter((element) => {
      let type = element.type;
      let parameter = element.key;
      return !(req[`${type}`] && req[`${type}`][`${parameter}`]);
    })
    .map((element) => {
      return `${element.key} is required`;
    });
  if (errors.length > 0) {
    return errors;
  } else {
    return false;
  }
};
const checkValidatorFunctions = (req, res, next, fileds) => {
  if (fileds instanceof Array === false) {
    return "Fields parameter must be an array";
  }
  let errors = [];
  let filterByFun = fileds.filter((element) => {
    return element["validatorFunctions"].length > 0;
  });
  filterByFun.forEach((element) => {
    let type = element.type;
    let key = element.key;
    let parameter = req[`${type}`][`${key}`];
    let functions = element.validatorFunctions;
    return functions.forEach((element) => {
      if (element === "objectId") {
        let check = validateObjectId(parameter);
        if (check !== true) {
          errors.push(`${key} ${check}`);
        }
      }
      if (element === "validateEmail") {
        let check = validateEmail(parameter);
        if (check !== true) {
          errors.push(`${key} ${check}`);
        }
      }
      if(element==="isNumber"){
        let check = isNumber(parameter);
        if (check !== true) {
          errors.push(`${key} ${check}`);
        }
      }
    });
  });
  if (errors.length > 0) {
    return errors;
  } else {
    return false;
  }
};
class Validator {
  requestValidator(fileds) {
    return (req, res, next) => {
      let required = checkRequired(req, res, next, fileds);
      let validatorFunctions = checkValidatorFunctions(req, res, next, fileds);
      if (required === false && validatorFunctions === false) {
        return next();
      } else {
        let errors;
        if (required) {
          errors = [...required];
        } else if (validatorFunctions) {
          errors = [...validatorFunctions];
        }
        let {response,code} = apiRes(null,errors, resMsgCode.BAD_REQ.code);
        return res.status(code).json(response);
      }
    };
  }
}
module.exports = new Validator();
