import { Form, Field, FieldArray, ErrorMessage, withFormik } from "formik";
import React from "react";
import * as Yup from "yup";

const BasicForm = ({ values, errors, handleChange, isSubmitting, handleReset }) => {
  return (
    <Form>
      <label htmlFor="firstName">First Name</label>
      <Field name="firstName" type="text"/>
      <ErrorMessage name="firstName">
        {msg => (
          <label className="error"> {msg} </label>
        )}
      </ErrorMessage>
      <label htmlFor="lastName">Last Name</label>
      <Field name="lastName" type="text"/>
      <ErrorMessage name="lastName">
        {msg => (
          <label className="error"> {msg} </label>
        )}
      </ErrorMessage>
      <label htmlFor="lastName">Friends</label>
      <FieldArray name="friends">
        {({ push, remove } ) => (
          <>
            {values.friends && values.friends.length && values.friends.map((friend, index) => (
              <div key={index} className="row">
                <div className="col">
                  <Field name={`friends[${index}].name`} type="text" placeholder="Sinto"/>
                  <ErrorMessage name={`friends[${index}].name`}>
                    {msg => (
                      <label className="error"> {msg} </label>
                    )}
                  </ErrorMessage>
                </div>
                <div className="col">
                  <Field name={`friends[${index}].email`} type="email" placeholder="sinto@example.com"/>
                  <ErrorMessage name={`friends[${index}].email`}>
                    {msg => (
                      <label className="error"> {msg} </label>
                    )}
                  </ErrorMessage>
                </div>
                <button type="button" onClick={() => remove(index)}> X </button>
              </div>
            )) }
            <button type="button" className="secondary" onClick={() => push({ name: "", email: ""})}>Add friend</button>
          </>
        )}
      </FieldArray>
      <button type="submit" disabled={isSubmitting}>Submit</button>
    </Form>
  )
}

const FormikForm = withFormik({
  mapPropsToValues:() => ({
    firstName: "",
    lastName: "",
    friends: [{
      name: "",
      email: ""
    }]
  }),
  handleSubmit:(values) => {
    setTimeout(() => {
      alert(JSON.stringify(values));
    }, 1000);
  },
  // validateOnChange: false,
  // validate: (values) => {
  //   var errors = {};
  //   if(!values.firstName.length) {
  //     errors.firstName = "First name is required";
  //   }
  //   if(!values.lastName.length) {
  //     errors.lastName = "Last name is required";
  //   }
  //   return errors;
  // },
  validationSchema: Yup.object().shape({
    firstName: Yup.string().required("First name is required"),
    lastName: Yup.string().required("Last name is required"),
    friends: Yup.array().of(
      Yup.object().shape({
        name: Yup.string().required("Name is required"),
        email: Yup.string().email("Invalid email").required("Email is required")
      })
    )
  })
}
)(BasicForm)

export default FormikForm;