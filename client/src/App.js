import "./App.css";
import Title from "./components/layout/Title";
import AddPerson from "./components/forms/AddPerson";
import AddCar from "./components/forms/AddCar";
import { ApolloClient, InMemoryCache, ApolloProvider } from "@apollo/client";
import PeopleList from "./components/lists/PeopleList";

const client = new ApolloClient({
  uri: "http://localhost:4000/graphql",
  cache: new InMemoryCache(),
});

const App = () => {
  return (
    <ApolloProvider client={client}>
      <div className="App">
        <Title />
        <AddPerson />
        <AddCar />
        <PeopleList />
      </div>
    </ApolloProvider>
  );
};

export default App;
