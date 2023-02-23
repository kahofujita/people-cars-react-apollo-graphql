import { useQuery } from "@apollo/client";
import { List } from "antd";
import { useState } from "react";
import { GET_CARS } from "../../queries";
import CarCard from "../listitems/CarCard";

const getStyles = () => ({
  list: {
    display: "flex",
    justifyContent: "center",
  },
});

const CarList = (props) => {
  const [id] = useState(props.id);
  const styles = getStyles();

  const { loading, error, data } = useQuery(GET_CARS);

  if (loading) return "Loading...";
  if (error) return `Error! ${error.message}`;

  return (
    <List grid={{ gutter: 20, column: 1 }} style={styles.list}>
      {data.cars
        .filter((car) => car.personId === id)
        .map(({ id, year, make, model, price }) => (
          <List.Item key={id}>
            <CarCard
              key={id}
              id={id}
              year={year}
              make={make}
              model={model}
              price={price}
            />
          </List.Item>
        ))}
    </List>
  );
};

export default CarList;
