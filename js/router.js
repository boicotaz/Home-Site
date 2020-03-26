import App from "../components/router.jsx"
console.log("ABOUT TO RENDER APP!!!");

ReactDOM.render(
    <App> </App>, document.getElementById('navbar')
);


var routerInit = () => {
    console.log("ABOUT TO RENDER APP!!!");
}

export{routerInit}