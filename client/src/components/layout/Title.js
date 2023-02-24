import { Divider } from "antd";

const getStyles = () => ({
  title: {
    textAlign: "center",
    fontSize: 20,
    paddingLeft: "30px",
    paddingRight: "30px",
    marginBottom: "30px",
  },
});

const Title = () => {
  const styles = getStyles();

  return (
    <div>
      <h1 style={styles.title}>PEOPLE AND THEIR CARS</h1>
      <Divider />
    </div>
  );
};

export default Title;
