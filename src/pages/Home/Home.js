import { useState, useEffect, useReducer, useRef } from "react";
import classes from "./Home.module.css";
import { Grid, FormControl, Button } from "@material-ui/core";

import { mapKeys, values } from "lodash";
import employeeFormData from "../../data/employee-form.json";
import { createInputs } from "../../utils/generateInputs";

const detailsReducer = (state, action) => {
  const input = state[action.payload.name];
  const { name, value } = action.payload;

  switch (action.type) {
    case "USER_INPUT": {
      input.value = action.payload.value;
      return { ...state, [action.payload.name]: input };
    }
    case "USER_INPUT_BLUR": {
      console.log("on BLUR");
      const validations = input.validations;
      let validationState = state;

      if (validations && validations.length) {
        validations.forEach((validation) => {
          if (validation.required && !value) {
            input.error = "required";
            console.log(input);
            validationState = { ...state, [name]: input };
          } else if (
            value &&
            validation.minLength &&
            value.length < validation.minLength
          ) {
            input.error = "minLength";
            input.minLength = validation.minLength;
            console.log(input);
            validationState = { ...state, [name]: input };
          } else if (
            value &&
            validation.alphaNumeric &&
            !/^[a-z0-9]+$/i.test(value)
          ) {
            input.error = "alphaNumeric";
            console.log(input);
            validationState = { ...state, [name]: input };
          }
        });
      }

      return validationState;
    }
    default:
      return state;
  }
};
function Home() {
  const inputs = employeeFormData.inputs;
  const inputsMap = mapKeys(inputs, "name");

  // const [data, dispatch_Emitter_to_trigger_ReducerFunction] = useReducer(Reducer, initialData);
  const [userDetails, dispatch] = useReducer(detailsReducer, inputsMap);

  if (!userDetails) {
    return null;
  }

  const inputHandler = (e, type) => {
    console.log(e.target);

    const { name, value } = e.target;

    const action = { type, payload: { name, value } };

    dispatch(action);
  };

  return (
    <form noValidate className={classes["emp-form"]}>
      <h3 style={{ textAlign: "center" }}> Employee Form</h3>
      <Grid className={classes["emp-form__grid"]}>
        {values(userDetails).map((input, index) => {
          return (
            <FormControl key={index} className={classes["emp-form__input"]}>
              {/* */}
              {createInputs(input, inputHandler)}
            </FormControl>
          );
        })}
      </Grid>

      <Button variant="contained" color="primary" className={classes.submit}>
        Submit
      </Button>
    </form>
  );
}
export default Home;
