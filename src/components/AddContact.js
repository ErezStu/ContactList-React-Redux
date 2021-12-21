import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useHistory } from "react-router-dom";
import { toast } from "react-toastify";

const AddContact = () => {
  const contacts = useSelector((state) => state);
  const dispatch = useDispatch();
  const history = useHistory();

  console.log(contacts);

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");

  const submitHandler = (e) => {
    e.preventDefault();
    //CHECKS!
    const emailCheck = contacts.find(
      (contact) => contact.email === email && email
    );

    const phoneNumberCheck = contacts.find(
      (contact) => contact.phoneNumber === +phoneNumber && phoneNumber
    );

    //Validations!
    if (!email || !phoneNumber || !name) {
      return toast.warning("One or more of the fields is not filled in");
    }
    if (emailCheck) {
      return toast.error("This email address is already in use!");
    }

    if (phoneNumberCheck) {
      return toast.error("This number phone is already in use!");
    }

    const data = {
      id: contacts[contacts.length - 1].id + 1,
      name,
      email,
      phoneNumber,
    };
    dispatch({ type: "ADD_CONTACT", payload: data });
    toast.success("the contact added succefully!");
    history.push("/");
  };

  return (
    <div className="container">
      <h1 className="display-3 my-2 text-center">Add Contact</h1>
      <div className="row">
        <div className="col-md-6 shadow mx-auto p-5">
          <form onSubmit={submitHandler}>
            <div className="form-group">
              <input
                type="text"
                placeholder="Name"
                className="form-control my-2"
                value={name}
                onChange={(e) => setName(e.target.value)}
              />
            </div>
            <div className="form-group">
              <input
                type="email"
                placeholder="Email"
                className="form-control my-2"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>
            <div className="form-group">
              <input
                type="number"
                placeholder="Phone Number"
                className="form-control my-2"
                value={phoneNumber}
                onChange={(e) => setPhoneNumber(e.target.value)}
              />
            </div>
            <div className="form-group">
              <input
                type="submit"
                value="Add"
                className="btn btn-block btn-success"
              />
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default AddContact;
