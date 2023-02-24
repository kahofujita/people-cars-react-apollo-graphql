import "./App.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { ApolloClient, InMemoryCache, ApolloProvider } from "@apollo/client";
import HomeScreen from "./components/screens/HomeScreen";
import ShowScreen from "./components/screens/ShowScreen";

const client = new ApolloClient({
  uri: "http://localhost:4000/graphql",
  cache: new InMemoryCache(),
});

const App = () => {
  return (
    <ApolloProvider client={client}>
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
