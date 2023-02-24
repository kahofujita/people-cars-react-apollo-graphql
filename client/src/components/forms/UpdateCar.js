import { useQuery } from "@apollo/client";
import { useMutation } from "@apollo/client";
import { Input } from "antd";
import { InputNumber } from "antd";
import { Select } from "antd";
import { Button } from "antd";
import { Form } from "antd";
import { useEffect, useState } from "react";
import { GET_PEOPLE, UPDATE_CAR } from "../../queries";

const getStyles = () => ({
  form: {
    display: "flex",
    justifyContent: "center",
  },
  button: {
    marginTop: "20px",
  },
});

const UpdateCar = (props) => {
  const [form] = Form.useForm();
  const [, forceUpdate] = useState();
  const [id] = useState(props.id);
  const [year, setYear] = useState(props.year);
  const [make, setMake] = useState(props.make);
  const [model, setModel] = useState(props.model);
  const [price, setPrice] = useState(props.price);
  const [personId, setPersonId] = useState(props.personId);
  const [updateCar] = useMutation(UPDATE_CAR);

  const styles = getStyles();

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
      case "personId":
        setPersonId(value);
        break;
      default:
        break;
    }
  };

  const selectOptionArray = [];

  const { loading, error, data } = useQuery(GET_PEOPLE);

  if (loading) return "Loading...";
  if (error) return `Error! ${error.message}`;

  data.people.map(({ id, firstName, lastName }) =>
    selectOptionArray.push({ value: id, label: `${firstName} ${lastName}` })
  );

  return (
    <Form
      form={form}
      name="update-car-form"
      layout="inline"
      onFinish={onFinish}
      size="large"
      style={styles.form}
      initialValues={{
        year: year,
        make: make,
        model: model,
        price: price,
        personId: personId,
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
      <Form.Item
        label="Person: "
        name="personId"
        rules={[{ required: true, message: "Please select person!" }]}
      >
        <Select
          showSearch
          placeholder="Select a person"
          optionFilterProp="children"
          onChange={(value) => updateStateVariable("personId", value)}
          filterOption={(input, option) =>
            (option?.label ?? "").toLowerCase().includes(input.toLowerCase())
          }
          options={selectOptionArray}
        />
      </Form.Item>
      <Form.Item shouldUpdate={true}>
        {() => (
          <Button
            type="primary"
            htmlType="submit"
            style={styles.button}
            disabled={
              (!form.isFieldTouched("year") &&
                !form.isFieldTouched("make") &&
                !form.isFieldTouched("model") &&
                !form.isFieldTouched("price") &&
                !form.isFieldTouched("personId")) ||
              form.getFieldsError().filter(({ errors }) => errors.length).length
            }
          >
            Update Car
          </Button>
        )}
      </Form.Item>
      <Button style={styles.button} onClick={props.onButtonClick}>
        Cancel
      </Button>
    </Form>
  );
};

export default UpdateCar;
