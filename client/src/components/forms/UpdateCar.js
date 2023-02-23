import { useMutation } from "@apollo/client";
import { Input } from "antd";
import { InputNumber } from "antd";
import { Button } from "antd";
import { Form } from "antd";
import { useEffect, useState } from "react";
import { UPDATE_CAR } from "../../queries";

const UpdateCar = (props) => {
  const [form] = Form.useForm();
  const [, forceUpdate] = useState();
  const [id] = useState(props.id);
  const [year, setYear] = useState(props.year);
  const [make, setMake] = useState(props.make);
  const [model, setModel] = useState(props.model);
  const [price, setPrice] = useState(props.price);

  const [updateCar] = useMutation(UPDATE_CAR);

  useEffect(() => {
    forceUpdate();
  }, []);

  const onFinish = (values) => {
    const { year, make, model, price, personId } = values;
    updateCar({
      variables: {
        id,
        year,
        make,
        model,
        price,
        personId,
      },
    });
    props.onButtonClick();
  };

  const updateStateVariable = (variable, value) => {
    props.updateStateVariable(variable, value);
    switch (variable) {
      case "year":
        setYear(value);
        break;
      case "make":
        setMake(value);
        break;
      case "model":
        setModel(value);
        break;
      case "price":
        setPrice(value);
        break;
      default:
        break;
    }
  };

  return (
    <Form
      form={form}
      name="update-car-form"
      layout="inline"
      onFinish={onFinish}
      size="large"
      initialValues={{
        year: year,
        make: make,
        model: model,
        price: price,
      }}
    >
      <Form.Item
        label="Year: "
        name="year"
        rules={[{ required: true, message: "Please input year!" }]}
      >
        <InputNumber
          placeholder="Year"
          onChange={(e) => updateStateVariable("year", e.target.value)}
        />
      </Form.Item>
      <Form.Item
        label="Make: "
        name="make"
        rules={[{ required: true, message: "Please input make!" }]}
      >
        <Input
          placeholder="Make"
          onChange={(e) => updateStateVariable("make", e.target.value)}
        />
      </Form.Item>
      <Form.Item
        label="Model: "
        name="model"
        rules={[{ required: true, message: "Please input model!" }]}
      >
        <Input
          placeholder="Model"
          onChange={(e) => updateStateVariable("model", e.target.value)}
        />
      </Form.Item>
      <Form.Item
        label="Price: "
        name="price"
        rules={[{ required: true, message: "Please input price!" }]}
      >
        <InputNumber
          prefix="$"
          placeholder="Price"
          onChange={(e) => updateStateVariable("price", e.target.value)}
        />
      </Form.Item>
      <Form.Item shouldUpdate={true}>
        {() => (
          <Button
            type="primary"
            htmlType="submit"
            disabled={
              (!form.isFieldTouched("year") &&
                !form.isFieldTouched("make") &&
                !form.isFieldTouched("model") &&
                !form.isFieldTouched("price")) ||
              form.getFieldsError().filter(({ errors }) => errors.length).length
            }
          >
            Update Person
          </Button>
        )}
      </Form.Item>
      <Button onClick={props.onButtonClick}>Cancel</Button>
    </Form>
  );
};

export default UpdateCar;
