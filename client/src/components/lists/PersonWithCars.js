import { useQuery } from "@apollo/client";
import { Button } from "antd";
import { Card } from "antd";
import { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { GET_CARS } from "../../queries";

const getStyles = () => ({
  title: {
    paddingLeft: "30px",
    paddingRight: "30px",
    textAlign: "left",
  },
  card: {
    width: "90vw",
    textAlign: "left",
    marginBottom: "10px",
  },
});

const PersonWithCars = (props) => {
  const [firstName, setFirstName] = useState(props.firstName);
  const [lastName, setLastName] = useState(props.lastName);

  const styles = getStyles();
  const navigate = useNavigate();
  const location = useLocation();

  const goBackButtonClick = () => {
    navigate("/");
  };

  const { loading, error, data } = useQuery(GET_CARS);

  if (loading) return "Loading...";
  if (error) return `Error! ${error.message}`;

  console.log(location.state.id);

  return (
    <div>
      <Card title={`${props.firstName} ${props.lastName}`} style={styles.title}>
        {data.cars
          .filter((car) => car.personId === location.state.id)
          .map(({ id, year, make, model, price }) => (
            <Card
              type="inner"
              title={`${year} ${make} ${model} -> $ ${new Intl.NumberFormat().format(
                price
              )}`}
              style={styles.card}
            />
          ))}
        <Button type="link" onClick={goBackButtonClick}>
          GO BACK HOME
        </Button>
      </Card>
    </div>
  );
};

export default PersonWithCars;
