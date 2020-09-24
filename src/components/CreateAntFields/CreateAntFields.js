import React from "react";
import { Form, Input, Select } from "antd";
import CreateReport from "../../pages/createReport";
const { Option } = Select;
const Item = Form.Item;
const { TextArea } = Input;
//NOTE TO SELF, NEXTIME JUST WRITE YOUR OWN FORM
const CreateAntField = (AntComponent) => ({
  field,
  form,
  hasFeedback,
  lable,
  selectOptions,
  submitCount,
  type,
  ...props
}) => {
  const touched = form.touched[field.name];
  const submitted = submitCount > 0;
  const hasError = form.errors[field.name];
  const submittedError = hasError && submitted;
  const touchedError = hasError && touched;
  const onInputChange = ({ target: { value } }) =>
    form.setFieldValue(field.name, value);
  const onChange = (value) => form.setFieldValue(field.name, value);
  const onBlur = () => form.setFieldTouched(field.name, true);
  return (
    <div className="field-container">
      <Item
        // label={label}
        hasFeedback={
          (hasFeedback && submitted) || (hasFeedback && touched) ? true : false
        }
        help={submittedError || touchedError ? hasError : false}
        validateStatus={submittedError || touchedError ? "error" : "success"}
      >
        <AntComponent
          {...field}
          {...props}
          onBlur={onBlur}
          onChange={type ? onInputChange : onChange}
        >
          {selectOptions &&
            selectOptions.map((name) => <Option key={name}>{name}</Option>)}
        </AntComponent>
      </Item>
    </div>
  );
};

export const AntSelect = CreateAntField(Select);
export const AntTextArea = CreateAntField(TextArea);
export const AntInput = CreateAntField(Input);
