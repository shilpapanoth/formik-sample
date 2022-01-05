import { Formik, Form, Field, FieldArray, ErrorMessage } from "formik";
import React from "react";
import * as Yup from "yup";

const BasicForm = () => {
  return (
    <Formik
      initialValues={{
        firstName: "",
        lastName: "",
        friends: [{
          name: "",
          email: ""
        }]
      }}
      onSubmit={(values) => {
        alert(JSON.stringify(values));
      }}
      // validateOnChange={false}
      // validate={(values) => {
      //   var errors = {};
      //   if(!values.firstName.length) {
      //     errors.firstName = "First name is required";
      //   }
      //   if(!values.lastName.length) {
      //     errors.lastName = "Last name is required";
      //   }
      //   return errors;
      // }}
      validationSchema={Yup.object().shape({
        firstName: Yup.string().required("First name is required"),
        lastName: Yup.string().required("Last name is required"),
        friends: Yup.array().of(
          Yup.object().shape({
            name: Yup.string().required("Name is required"),
            email: Yup.string().email("Invalid email").required("Email is required")
          })
        )
      })}
    >
      {({ values, handleChange }) => (
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
          <label htmlFor="friends">Friends</label>
          <FieldArray name="friends">
            {({ push, remove }) => (
              <>
                {
                  values.friends && values.friends.length > 0 && values.friends.map((friend, index) => (
                    <div className="row" key={index}>
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
                      <button className="secondary" type="button" onClick={() => remove(index)}>x</button>  
                    </div>
                  ))
                }
                <button className="secondary" type="button" onClick={() => push({ name: "", email: ""})}>Add Friend</button>  
              </>
            )}
          </FieldArray>
          <button type="submit">Submit</button>
        </Form>
      )}
    </Formik>
  )
}

export default BasicForm;