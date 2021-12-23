import { Component } from "react";
import "./App.css";
import Footer from "./components/Footer/Footer";
import Header from "./components/Header/Header";

import { BrowserRouter } from "react-router-dom";
import Routes from "./routes/Routes";
class App extends Component {
  render() {
    return (
      <BrowserRouter>
        <Header />
        <div className="container"></div>
        <Routes />
        <Footer />
      </BrowserRouter>
    );
  }
}

export default App;
