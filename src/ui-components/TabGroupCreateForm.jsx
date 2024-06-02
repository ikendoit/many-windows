/***************************************************************************
 * The contents of this file were generated with Amplify Studio.           *
 * Please refrain from making any modifications to this file.              *
 * Any changes to this file will be overwritten when running amplify pull. *
 **************************************************************************/

/* eslint-disable */
import * as React from "react";
import {
  Button,
  Flex,
  Grid,
  SwitchField,
  TextField,
} from "@aws-amplify/ui-react";
import { TabGroup } from "../models";
import { fetchByPath, getOverrideProps, validateField } from "./utils";
import { DataStore } from "aws-amplify";
export default function TabGroupCreateForm(props) {
  const {
    clearOnSuccess = true,
    onSuccess,
    onError,
    onSubmit,
    onValidate,
    onChange,
    overrides,
    ...rest
  } = props;
  const initialValues = {
    data: "",
    encrypted_with_password: false,
  };
  const [data, setData] = React.useState(initialValues.data);
  const [encrypted_with_password, setEncrypted_with_password] = React.useState(
    initialValues.encrypted_with_password
  );
  const [errors, setErrors] = React.useState({});
  const resetStateValues = () => {
    setData(initialValues.data);
    setEncrypted_with_password(initialValues.encrypted_with_password);
    setErrors({});
  };
  const validations = {
    data: [{ type: "Required" }],
    encrypted_with_password: [],
  };
  const runValidationTasks = async (
    fieldName,
    currentValue,
    getDisplayValue
  ) => {
    const value =
      currentValue && getDisplayValue
        ? getDisplayValue(currentValue)
        : currentValue;
    let validationResponse = validateField(value, validations[fieldName]);
    const customValidator = fetchByPath(onValidate, fieldName);
    if (customValidator) {
      validationResponse = await customValidator(value, validationResponse);
    }
    setErrors((errors) => ({ ...errors, [fieldName]: validationResponse }));
    return validationResponse;
  };
  return (
    <Grid
      as="form"
      rowGap="15px"
      columnGap="15px"
      padding="20px"
      onSubmit={async (event) => {
        event.preventDefault();
        let modelFields = {
          data,
          encrypted_with_password,
        };
        const validationResponses = await Promise.all(
          Object.keys(validations).reduce((promises, fieldName) => {
            if (Array.isArray(modelFields[fieldName])) {
              promises.push(
                ...modelFields[fieldName].map((item) =>
                  runValidationTasks(fieldName, item)
                )
              );
              return promises;
            }
            promises.push(
              runValidationTasks(fieldName, modelFields[fieldName])
            );
            return promises;
          }, [])
        );
        if (validationResponses.some((r) => r.hasError)) {
          return;
        }
        if (onSubmit) {
          modelFields = onSubmit(modelFields);
        }
        try {
          Object.entries(modelFields).forEach(([key, value]) => {
            if (typeof value === "string" && value === "") {
              modelFields[key] = null;
            }
          });
          await DataStore.save(new TabGroup(modelFields));
          if (onSuccess) {
            onSuccess(modelFields);
          }
          if (clearOnSuccess) {
            resetStateValues();
          }
        } catch (err) {
          if (onError) {
            onError(modelFields, err.message);
          }
        }
      }}
      {...getOverrideProps(overrides, "TabGroupCreateForm")}
      {...rest}
    >
      <TextField
        label="Data"
        isRequired={true}
        isReadOnly={false}
        value={data}
        onChange={(e) => {
          let { value } = e.target;
          if (onChange) {
            const modelFields = {
              data: value,
              encrypted_with_password,
            };
            const result = onChange(modelFields);
            value = result?.data ?? value;
          }
          if (errors.data?.hasError) {
            runValidationTasks("data", value);
          }
          setData(value);
        }}
        onBlur={() => runValidationTasks("data", data)}
        errorMessage={errors.data?.errorMessage}
        hasError={errors.data?.hasError}
        {...getOverrideProps(overrides, "data")}
      ></TextField>
      <SwitchField
        label="Encrypted with password"
        defaultChecked={false}
        isDisabled={false}
        isChecked={encrypted_with_password}
        onChange={(e) => {
          let value = e.target.checked;
          if (onChange) {
            const modelFields = {
              data,
              encrypted_with_password: value,
            };
            const result = onChange(modelFields);
            value = result?.encrypted_with_password ?? value;
          }
          if (errors.encrypted_with_password?.hasError) {
            runValidationTasks("encrypted_with_password", value);
          }
          setEncrypted_with_password(value);
        }}
        onBlur={() =>
          runValidationTasks("encrypted_with_password", encrypted_with_password)
        }
        errorMessage={errors.encrypted_with_password?.errorMessage}
        hasError={errors.encrypted_with_password?.hasError}
        {...getOverrideProps(overrides, "encrypted_with_password")}
      ></SwitchField>
      <Flex
        justifyContent="space-between"
        {...getOverrideProps(overrides, "CTAFlex")}
      >
        <Button
          children="Clear"
          type="reset"
          onClick={(event) => {
            event.preventDefault();
            resetStateValues();
          }}
          {...getOverrideProps(overrides, "ClearButton")}
        ></Button>
        <Flex
          gap="15px"
          {...getOverrideProps(overrides, "RightAlignCTASubFlex")}
        >
          <Button
            children="Submit"
            type="submit"
            variation="primary"
            isDisabled={Object.values(errors).some((e) => e?.hasError)}
            {...getOverrideProps(overrides, "SubmitButton")}
          ></Button>
        </Flex>
      </Flex>
    </Grid>
  );
}
