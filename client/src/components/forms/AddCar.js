import { Input } from "antd";
import { Button } from "antd";
import { InputNumber } from "antd";
import { Form } from "antd";
import FormItem from "antd/es/form/FormItem";
import { useEffect, useState } from "react";
import { v4 as uuidv4 } from "uuid";
import { useMutation } from "@apollo/client";
import { ADD_CAR, GET_CARS, GET_PEOPLE } from "../../queries";
import { Select } from "antd";
import { useQuery } from "@apollo/client";
import { Divider } from "antd";

const getStyles = () => ({
  title: {
    fontSize: 20,
    fontWeight: "bold",
    paddingLeft: "30px",
    paddingRight: "30px",
    marginBottom: "10px",
  },
  form: {
    marginBottom: "60px",
    display: "flex",
    justifyContent: "center",
  },
});

const AddCar = () => {
  const [id] = useState(uuidv4());
  const [addCar] = useMutation(ADD_CAR);
  const [form] = Form.useForm();
  const [, forceUpdate] = useState();
  const [, setValue] = useState("");

  const styles = getStyles();

  useEffect(() => {
    forceUpdate([]);
  }, []);

  const selectOptionArray = [];

  const { loading, error, data } = useQuery(GET_PEOPLE);

  if (loading) return "Loading...";
  if (error) return `Error! ${error.message}`;

  data.people.map(({ id, firstName, lastName }) =>
    selectOptionArray.push({ value: id, label: `${firstName} ${lastName}` })
  );

  const onChange = (value) => {
    setValue(value);
  };

  const onFinish = (values) => {
    const { year, make, model, price, personId } = values;

    addCar({
      variables: {
        id,
        year,
        make,
        model,
        price,
        personId,
      },
      update: (cache, { data: { addCar } }) => {
        const data = cache.readQuery({ query: GET_CARS });
        cache.writeQuery({
          query: GET_CARS,
          data: {
            ...data,
            cars: [...data.cars, addCar],
          },
        });
      },
    });
  };

  return selectOptionArray.length ? (
    <div>
      <Divider plain style={styles.title}>
        Add Car
      </Divider>
      <Form
        name="add-car-form"
        form={form}
        layout="inline"
        onFinish={onFinish}
        size="large"
        style={styles.form}
      >
        <FormItem
          label="Year: "
          name="year"
          rules={[{ required: true, message: "Please input year!" }]}
        >
          <InputNumber placeholder="Year" min={0} />
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
          <InputNumber
            prefix="$"
            placeholder="Price"
            min={0}
            formatter={(value) =>
              `${value}`.replace(/\B(?=(\d{3})+(?!\d))/g, ",")
            }
          />
        </FormItem>
        <FormItem
          label="Person: "
          name="personId"
          rules={[{ required: true, message: "Please select person!" }]}
        >
          <Select
            showSearch
            placeholder="Select a person"
            optionFilterProp="children"
            onChange={onChange}
            filterOption={(input, option) =>
              (option?.label ?? "").toLowerCase().includes(input.toLowerCase())
            }
            options={selectOptionArray}
          />
        </FormItem>
        <FormItem shouldUpdate={true}>
          {() => (
            <Button
              type="primary"
              htmlType="submit"
              disabled={
                !form.isFieldsTouched(true) ||
                form.getFieldsError().filter(({ errors }) => errors.length)
                  .length
              }
            >
              Add Car
            </Button>
          )}
        </FormItem>
      </Form>
    </div>
  ) : (
    <></>
  );
};

export default AddCar;
