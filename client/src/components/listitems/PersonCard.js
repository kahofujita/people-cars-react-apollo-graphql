import { EditOutlined } from "@ant-design/icons";
import { Button } from "antd";
import { Card } from "antd";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import RemovePerson from "../buttons/RemovePerson";
import UpdatePerson from "../forms/UpdatePerson";
import CarList from "../lists/CarList";

const getStyles = () => ({
  card: {
    width: "90vw",
    textAlign: "left",
  },
});

const PersonCard = (props) => {
  const [id] = useState(props.id);
  const [firstName, setFirstName] = useState(props.firstName);
  const [lastName, setLastName] = useState(props.lastName);
  const [editMode, setEditMode] = useState(false);

  const styles = getStyles();

  const navigate = useNavigate();

  const handleEditButtonClick = () => {
    setEditMode(!editMode);
  };

  const handleLinkButtonClick = () => {
    navigate(`/people/${id}`);
  };

  const goBackButtonClick = () => {
    navigate("/");
  };

  const updateStateVariable = (variable, value) => {
    switch (variable) {
      case "firstName":
        setFirstName(value);
        break;
      case "lastName":
        setLastName(value);
        break;
      default:
        break;
    }
  };

  return (
    <div>
      {editMode ? (
        <UpdatePerson
          id={props.id}
          firstName={props.firstName}
          lastName={props.lastName}
          onButtonClick={handleEditButtonClick}
          updateStateVariable={updateStateVariable}
        />
      ) : (
        <Card
          title={`${firstName} ${lastName}`}
          style={styles.card}
          actions={[
            <EditOutlined key="edit" onClick={handleEditButtonClick} />,
            <RemovePerson id={id} />,
          ]}
        >
          <CarList id={id} />
          <Button type="link" onClick={handleLinkButtonClick}>
            LEARN MORE
          </Button>
          <Button type="link" onClick={goBackButtonClick}>
            GO BACK HOME
          </Button>
        </Card>
      )}
    </div>
  );
};

export default PersonCard;
