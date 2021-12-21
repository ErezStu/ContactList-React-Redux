import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useHistory } from "react-router-dom";
import { Link, useParams } from "react-router-dom";
import { toast } from "react-toastify";

const EditContact = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");

  const history = useHistory();

  const contacts = useSelector((state) => state);
  const dispatch = useDispatch();

  const { id } = useParams();

  const currentId = contacts.find((contact) => contact.id === parseInt(id));

  useEffect(() => {
    if (currentId) {
      setName(currentId.name);
      setEmail(currentId.email);
      setPhoneNumber(currentId.phoneNumber);
    }
  }, [currentId]);

  const submitHandler = (e) => {
    e.preventDefault();
    //CHECKS!
    const emailCheck = contacts.find(
      (contact) => contact.id !== parseInt(id) && contact.email === email
    );

    const phoneNumberCheck = contacts.find(
      (contact) =>
        contact.id !== parseInt(id) && contact.phoneNumber === +phoneNumber
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
      id: parseInt(id),
      name,
      email,
      phoneNumber,
    };
    dispatch({ type: "UPDATE_CONTACT", payload: data });
    toast.success("Updated succefully!");
    history.push("/");
  };

  return (
    <div className="container">
      {currentId ? (
        <>
          <h1 className="display-3 my-2 text-center">
            <b> {contacts[id].name} </b>
          </h1>
          <div className="row">
            <div className="col-md-6 shadow mx-auto p-5">
              <form onSubmit={submitHandler}>
                <div className="form-group">
                  <input
                    className="form-control my-2"
                    type="text"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                  />
                </div>
                <div className="form-group">
                  <input
                    className="form-control my-2"
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                  />
                </div>
                <div className="form-group">
                  <input
                    className="form-control my-2"
                    type="number"
                    value={phoneNumber}
                    onChange={(e) => setPhoneNumber(e.target.value)}
                  />
                </div>
                <div className="form-group">
                  <input
                    type="submit"
                    value="Update"
                    className="btn btn-success"
                  />
                  <Link className="btn btn-danger m-3" to="/">
                    Cancel
                  </Link>
                </div>
              </form>
            </div>
          </div>
        </>
      ) : (
        <h1 className="display-3 my-5 text-center">No contact exists</h1>
      )}
    </div>
  );
};

export default EditContact;
