import React, { useState } from "react";
import "./signup.css";
const SignupForm = () => {
  const [name, setName] = useState("");
  const [age, setAge] = useState(0);
  const [selectedBatch, setSelectedBatch] = useState("");
  const [formError, setFormError] = useState("");
  const [enrollmentSuccess, setEnrollmentSuccess] = useState(false);

  const handleSubmit = (event) => {
    event.preventDefault();

    // if ((!name, !age, !selectedBatch)) {
    //   setFormError("Please fill out all the fields.");
    //   return;
    // }

    // if (age < 18 || age > 65) {
    //   setFormError("Sorry, you must be between 18 and 65 years old to enroll.");
    //   return;
    // }

    // if (!["6-7AM", "7-8AM", "8-9AM", "5-6PM"].includes(selectedBatch)) {
    //   setFormError("Please select a valid batch.");
    //   return;
    // }

    // Make API call to process enrollment request...

    setFormError("");
    setEnrollmentSuccess(true);
  };

  const PostData = async (e) => {
    e.preventDefault();

    const sname = name;
    const sage = age;
    const sbatch = selectedBatch;

    const res = await fetch("/user", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        name: sname,
        age: sage,
        batch: sbatch,
      }),
    });
    const data = await res.json();
    console.log(data);
    if (!data.error) {
      return window.alert("successfull registration");
    } else {
      window.alert(`Sorry, registration unsuccessfull.
        1. check whether all details are completely filled 
        2. check your age, it must be between 18 and 65 years old to enroll`);
    }
    // console.log(data);
  };

  return (
    <>
      <div className="position-absolute top-50 start-50 translate-middle ">
        <form onSubmit={handleSubmit} className="flexbox p-4">
          <label>
            Name:
            <input className="p-1 ms-2 bordercss"
              type="text"
              value={name}
              onChange={(event) => setName(event.target.value)}
            />
          </label>
          <label>
            Age:
            <input className="p-1 ms-4 bordercss"
              // type="number"
              value={age}
              onChange={(event) => setAge(event.target.value)}
            />
          </label>
          <label>
            {/* Batch: */}
            <select 
              className="form-select p-2 m-2"
              value={selectedBatch}
              onChange={(event) => setSelectedBatch(event.target.value)}
            >
              <option value="">Select a batch</option>
              <option value="6-7AM">6-7AM</option>
              <option value="7-8AM">7-8AM</option>
              <option value="8-9AM">8-9AM</option>
              <option value="5-6PM">5-6PM</option>
            </select>
          </label>
          {formError && <p>{formError}</p>}
          <input
            type="submit"
            className="btn btn-primary"
            value="Submit"
            onClick={PostData}
          />
        </form>
      </div>
    </>
  );
};

export default SignupForm;
