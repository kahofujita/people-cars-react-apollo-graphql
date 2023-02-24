import "./App.css";
import { BrowserRouter, Routes, Route, Switch } from "react-router-dom";
// import Title from "./components/layout/Title";
// import AddPerson from "./components/forms/AddPerson";
// import AddCar from "./components/forms/AddCar";
import { ApolloClient, InMemoryCache, ApolloProvider } from "@apollo/client";
import HomeScreen from "./components/screens/HomeScreen";
import PersonCard from "./components/listitems/PersonCard";
import ShowScreen from "./components/screens/ShowScreen";
// import PeopleList from "./components/lists/PeopleList";

const client = new ApolloClient({
  uri: "http://localhost:4000/graphql",
  cache: new InMemoryCache(),
});

const App = () => {
  return (
    <ApolloProvider client={client}>
      {/* <div className="App">
        <Title />
        <AddPerson />
        <AddCar />
        <PeopleList />
      </div> */}
      {/* <Switch>
        <Route exact path="/" component={HomeScreen} />
        <Route
          path="/people/:id"
          render={({ match }) => <PersonCard id={match.params.id} />}
        />
      </Switch> */}
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<HomeScreen />} />
          <Route path="/people/:id" element={<ShowScreen />} />
        </Routes>
      </BrowserRouter>
    </ApolloProvider>
  );
};

export default App;
