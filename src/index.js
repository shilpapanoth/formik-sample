import React from "react";
import ReactDOM from "react-dom";
import "./styles.css";
import FormikForm from "./FormikForm";
// import BasicForm from "./BasicForm";
// import WithFormik from "./WithFormik";

function App() {
  return (
    <>
      {/* <WithFormik/> */}
      {/* <BasicForm /> */}
      <FormikForm />
    </>
  );
}

const rootElement = document.getElementById("root");
ReactDOM.render(<App />, rootElement);
