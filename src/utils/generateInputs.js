import {
  TextField,
  TextareaAutosize,
  Select,
  MenuItem,
} from "@material-ui/core";

export const createInputs = (dataInput, inputHandler, abc) => {
  const {
    type,
    name,
    value,
    lable,
    placeholder,
    validations,
    rows,
    options,
    error,
  } = dataInput;

  console.log(name);

  if (!dataInput.error) {
    dataInput.error = "";
  }

  // validation
  let required;
  let alphaNumber;
  let minLength;

  for (let validation of validations) {
    required = validation.required ? validation.required : false;
    alphaNumber = validation.alphaNumber ? validation.alphaNumber : null;
    minLength = validation.minLength ? validation.minLength : null;
  }

  console.log("::NAME", name);
  console.log("required", required);
  console.log("alphaNumber", alphaNumber);
  console.log("minLength", minLength);

  const inputClassName = `emp-form${name}`;

  switch (type) {
    case "text":
    case "number": {
      return (
        <>
          <TextField
            type={type}
            name={name}
            value={value}
            label={lable}
            placeholder={placeholder}
            required={required}
            minLength={minLength}
            className={inputClassName}
            onChange={(e) => inputHandler(e, "USER_INPUT")}
            onBlur={(e) => inputHandler(e, "USER_INPUT_BLUR")}
          />
          {error === "required" && (
            <small className="input-error">{lable} is required </small>
          )}
          {error === "minLength" && (
            <small className="input-error">
              {lable} must have {minLength}
            </small>
          )}{" "}
          {error === "alphaNumeric" && (
            <small className="input-error">
              {lable} must is alphaNumber asda@32{" "}
            </small>
          )}
        </>
      );
    }

    case "textarea": {
      return (
        <>
          <TextareaAutosize
            type={type}
            name={name}
            value={value}
            label={lable}
            placeholder={placeholder}
            required={required}
            minRows={rows}
            className={inputClassName}
            onChange={(e) => inputHandler(e, "USER_INPUT")}
          />
          {error === "required" && (
            <small className="input-error">{lable} is required </small>
          )}
        </>
      );
    }

    case "select": {
      return (
        <>
          {" "}
          <Select
            name={name}
            value={value}
            required={required}
            placeholder={placeholder}
            className={inputClassName}
            onChange={(e) => inputHandler(e, "USER_INPUT")}
          >
            {options.map((option, i) => {
              return (
                <MenuItem key={i} value={option.value}>
                  {option.label}
                </MenuItem>
              );
            })}
          </Select>
          {error === "required" && (
            <small className="input-error">{lable} is required </small>
          )}
        </>
      );
    }
  }
};
