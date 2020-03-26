import App from "../components/navbar/AppComponent.jsx";

var renderApp = () => {
  ReactDOM.render(
    <App></App>,
    document.getElementById("app")
  );
};

renderApp();