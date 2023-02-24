import { DeleteOutlined } from "@ant-design/icons";
import { useMutation } from "@apollo/client";
import { GET_CARS, GET_PEOPLE, REMOVE_CAR, REMOVE_PERSON } from "../../queries";
import filter from "lodash.filter";

const RemovePerson = ({ id }) => {
  const [removePerson] = useMutation(REMOVE_PERSON, {
    update(cache, { data: { removePerson } }) {
      const { people } = cache.readQuery({ query: GET_PEOPLE });
      cache.writeQuery({
        query: GET_PEOPLE,
        data: {
          people: filter(people, (c) => {
            return c.id !== removePerson.id;
          }),
        },
      });
    },
  });

  const [removeCar] = useMutation(REMOVE_CAR, {
    update: (cache, { data: { removeCar } }) => {
      const { cars } = cache.readQuery({ query: GET_CARS });
      cache.writeQuery({
        query: GET_CARS,
        data: {
          cars: filter(cars, (c) => {
            return c.personId !== id;
          }),
        },
      });
    },
  });

  const handleDeleteButtonClick = () => {
    let result = window.confirm("Are you sure you want to delete this person?");

    if (result) {
      removePerson({
        variables: {
          id,
        },
      });
      removeCar();
    }
  };

  return (
    <DeleteOutlined
      key="delete"
      style={{ color: "red" }}
      onClick={handleDeleteButtonClick}
    />
  );
};

export default RemovePerson;
