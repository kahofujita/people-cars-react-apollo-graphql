import { useQuery } from "@apollo/client";
import { Divider } from "antd";
import { List } from "antd";
import { GET_PEOPLE } from "../../queries";
import PersonCard from "../listitems/PersonCard";

const getStyles = () => ({
  title: {
    fontSize: 20,
    fontWeight: "bold",
    paddingLeft: "30px",
    paddingRight: "30px",
    marginBottom: "10px",
  },
  list: {
    display: "flex",
    justifyContent: "center",
  },
});

const PeopleList = () => {
  const styles = getStyles();

  const { loading, error, data } = useQuery(GET_PEOPLE);

  if (loading) return "Loading...";
  if (error) return `Error! ${error.message}`;

  return (
    <div>
      <Divider plain style={styles.title}>
        Records
      </Divider>
      <List grid={{ gutter: 20, column: 1 }} style={styles.list}>
        {data.people.map(({ id, firstName, lastName }) => (
          <List.Item key={id}>
            <PersonCard
              key={id}
              id={id}
              firstName={firstName}
              lastName={lastName}
            />
          </List.Item>
        ))}
      </List>
    </div>
  );
};

export default PeopleList;
