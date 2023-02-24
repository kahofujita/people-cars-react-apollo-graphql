import AddCar from "../forms/AddCar";
import AddPerson from "../forms/AddPerson";
import Title from "../layout/Title";
import PeopleList from "../lists/PeopleList";

const HomeScreen = () => {
  return (
    <div className="Home">
      <Title />
      <AddPerson />
      <AddCar />
      <PeopleList />
    </div>
  );
};

export default HomeScreen;
