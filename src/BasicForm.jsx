import React from "react";

const BasicForm = () => {
  const [values, setValues] = React.useState({
    firstName: "",
    lastName: "",
  });

  const handleChange = event => {
    setValues(prevValues => ({
      ...prevValues,
      [event.target.name]: event.target.value
    }));
  }

  return (
    <form>
      <label htmlFor="firstName">First Name</label>
      <input
        id="firstName"
        name="firstName"
        type="text"
        onChange={handleChange}
        value={values.firstName}
      />

      <label htmlFor="lastName">Last Name</label>
      <input
        id="lastName"
        name="lastName"
        type="text"
        onChange={handleChange}
        value={values.lastName}
      />
      <br/>
      <button type="submit">Submit</button>
    </form>
  )
}

export default BasicForm;