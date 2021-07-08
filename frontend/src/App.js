import { BrowserRouter as Router, Route } from "react-router-dom";
import { Container } from "react-bootstrap";

import Header from "./components/layout/Header";
import Footer from "./components/layout/Footer";
import Home from "./components/Home";
import ProductDetails from "./components/product/ProductDetails";

import "./App.css";

function App() {
  return (
    <Router>
      <div className="App">
        <Header />
        <Container fluid>
          <Route path="/" component={Home} exact />
          <Route path="/search/:keyword" component={Home} />
          <Route path="/product/:id" component={ProductDetails} exact />
        </Container>
        <Footer />
      </div>
    </Router>
  );
}

export default App;
