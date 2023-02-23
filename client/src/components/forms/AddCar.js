import { useMutation } from "@apollo/client";
import { Input } from "antd";
import { Button } from "antd";
import { Form } from "antd";
import FormItem from "antd/es/form/FormItem";
import { useState } from "react";
import { v4 as uuidv4 } from "uuid";

const AddCar = () => {
  const [id] = useState(uuidv4());
  //   const [addPerson] = useMutation()
  const [form] = Form.useForm();

  return (
    <Form
      name="add-car-form"
      form={form}
      layout="inline"
      //   onFinish={onFinish}
      size="large"
      style={{ marginBottom: "40px" }}
    >
      <FormItem
        label="Year: "
        name="year"
        rules={[{ required: true, message: "Please input year!" }]}
      >
        <Input placeholder="Year" />
      </FormItem>
      <FormItem
        label="Make: "
        name="make"
        rules={[{ required: true, message: "Please input make!" }]}
      >
        <Input placeholder="Make" />
      </FormItem>
      <FormItem
        label="Model: "
        name="model"
        rules={[{ required: true, message: "Please input model!" }]}
      >
        <Input placeholder="Model" />
      </FormItem>
      <FormItem
        label="Price: "
        name="price"
        rules={[{ required: true, message: "Please input price!" }]}
      >
        <Input placeholder="Price" />
      </FormItem>
      <FormItem
        label="Person: "
        name="person"
        rules={[{ required: true, message: "Please input person!" }]}
      >
        <Input placeholder="Person" />
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
            Add Car
          </Button>
        )}
      </FormItem>
    </Form>
  );
};

export default AddCar;
