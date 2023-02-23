import { useMutation } from "@apollo/client";
import { Input } from "antd";
import { Button } from "antd";
import { Form } from "antd";
import FormItem from "antd/es/form/FormItem";
import { useState } from "react";
import { v4 as uuidv4 } from "uuid";

const AddPerson = () => {
  const [id] = useState(uuidv4());
  //   const [addPerson] = useMutation()
  const [form] = Form.useForm();

  return (
    <Form
      name="add-person-form"
      form={form}
      layout="inline"
    //   onFinish={onFinish}
      size="large"
      style={{ marginBottom: "40px" }}
    >
      <FormItem
        label="First Name: "
        name="firstName"
        rules={[{ required: true, message: "Please input your first name!" }]}
      >
        <Input placeholder="First Name" />
      </FormItem>
      <FormItem
        label="Last Name: "
        name="lastName"
        rules={[{ required: true, message: "Please input your last name!" }]}
      >
        <Input placeholder="Last Name" />
      </FormItem>
      <FormItem shouldUpdate={true}>
        {() => (
          <Button
            type="primary"
            htmlType="submit"
            disabled={
              !form.isFieldsTouched(true) ||
              form.getFieldsError().filter(({ errors }) => errors.length).length
            }
          >
            Add Person
          </Button>
        )}
      </FormItem>
    </Form>
  );
};

export default AddPerson;
