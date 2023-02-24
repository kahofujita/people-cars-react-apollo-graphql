import { useQuery } from "@apollo/client";
import { Button } from "antd";
import { Card } from "antd";
import { useLocation, useNavigate } from "react-router-dom";
import { GET_PERSON_WITH_CARS } from "../../queries";

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

const PersonWithCars = () => {
  const styles = getStyles();
  const navigate = useNavigate();
  const location = useLocation();

  const goBackButtonClick = () => {
    navigate("/");
  };

  const { loading, error, data } = useQuery(GET_PERSON_WITH_CARS, {
    variables: { personId: location.state.id },
  });

  if (loading) return "Loading...";
  if (error) return `Error! ${error.message}`;

  return (
    <div>
      <Card
        title={`${data.person.firstName} ${data.person.lastName}`}
        style={styles.title}
      >
        {data.personWithCars.map(({ id, year, make, model, price }) => (
          <Card
            key={id}
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
