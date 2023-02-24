import { useMutation } from "@apollo/client";
import { Input } from "antd";
import { Button } from "antd";
import { Divider } from "antd";
import { Form } from "antd";
import FormItem from "antd/es/form/FormItem";
import { useEffect, useState } from "react";
import { v4 as uuidv4 } from "uuid";
import { ADD_PERSON, GET_PEOPLE } from "../../queries";

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

const AddPerson = () => {
  const [id] = useState(uuidv4());
  const [addPerson] = useMutation(ADD_PERSON);
  const [form] = Form.useForm();
  const [, forceUpdate] = useState();

  const styles = getStyles();

  useEffect(() => {
    forceUpdate([]);
  }, []);

  const onFinish = (values) => {
    const { firstName, lastName } = values;

    addPerson({
      variables: {
        id,
        firstName,
        lastName,
      },
      update: (cache, { data: { addPerson } }) => {
        const data = cache.readQuery({ query: GET_PEOPLE });
        cache.writeQuery({
          query: GET_PEOPLE,
          data: {
            ...data,
            people: [...data.people, addPerson],
          },
        });
      },
    });
  };

  return (
    <div>
      <Divider plain style={styles.title}>
        Add Person
      </Divider>
      <Form
        name="add-person-form"
        form={form}
        layout="inline"
        onFinish={onFinish}
        size="large"
        style={styles.form}
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
                form.getFieldsError().filter(({ errors }) => errors.length)
                  .length
              }
            >
              Add Person
            </Button>
          )}
        </FormItem>
      </Form>
    </div>
  );
};

export default AddPerson;
