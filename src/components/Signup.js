import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'

const Signup = (props) => {
  document.body.style = 'background: #eee;';
  const [credentials, setCredentials] = useState({ name: "", email: "", password: "", cpassword: "" })
  let navigate = useNavigate();

  const { name, email, password } = credentials;
  const handleSignup = async (e) => {
    e.preventDefault();
    const response = await fetch('http://localhost:5000/api/auth/createUser', {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ name: name.toString(), email: email.toString(), password: password.toString() }),
    });

    const json = await response.json();
    console.log(json)
    if (json.success) {
      // Save the token and redirect
      localStorage.setItem('token', json.authToken);
      props.showAlert('Registered to cloudbook successfully', 'success')
      navigate('/');
    } else {
      props.showAlert('Invalid Details', 'danger')
    }
  }

  const onChange = (e) => {
    setCredentials({ ...credentials, [e.target.name]: [e.target.value] })
  }
  return (
    <div>
      <div className="container mt-2">
        <div className="row d-flex justify-content-center align-items-center">
          <div className="col-lg-1 col-xl-11">
            <div className="card text-black" style={{ borderRadius: '25px' }}>
              <div className="card-body p-md-5">
                <div className="row justify-content-center">
                  <div className="col-md-10 col-lg-6 col-xl-5 order-2 order-lg-1">

                    <p className="text-center h1 fw-bold mb-5 mx-1 mx-md-4 mt-4">SIGN UP</p>

                    <form onSubmit={handleSignup} className="mx-1 mx-md-4">

                      <div className="d-flex flex-row align-items-center mb-4">
                        <i className="fas fa-user fa-lg me-3 fa-fw"></i>
                        <div className="form-outline flex-fill mb-0">
                          <input type="text" id="name" name="name" placeholder="Your Name" onChange={onChange} className="form-control" minLength={3} required />
                        </div>
                      </div>

                      <div className="d-flex flex-row align-items-center mb-4">
                        <i className="fas fa-envelope fa-lg me-3 fa-fw"></i>
                        <div className="form-outline flex-fill mb-0">
                          <input type="email" id="email" name="email" placeholder="Your Email" onChange={onChange} className="form-control" required />
                        </div>
                      </div>

                      <div className="d-flex flex-row align-items-center mb-4">
                        <i className="fas fa-lock fa-lg me-3 fa-fw"></i>
                        <div className="form-outline flex-fill mb-0">
                          <input type="password" id="password" name="password" placeholder="Password" onChange={onChange} className="form-control" minLength={5} required />
                        </div>
                      </div>

                      <div className="d-flex flex-row align-items-center mb-4">
                        <i className="fas fa-key fa-lg me-3 fa-fw"></i>
                        <div className="form-outline flex-fill mb-0">
                          <input type="password" id="cpassword" name="cpassword" placeholder="Repeat your password" onChange={onChange} className="form-control" minLength={5} required />
                        </div>
                      </div>

                      <div className="form-check d-flex justify-content-center mb-5">
                        <input className="form-check-input me-2" type="checkbox" value="" id="form2Example3c" />
                        <label className="form-check-label" htmlFor="form2Example3">
                          I agree all statements in <a href="#!">Terms of service</a>
                        </label>
                      </div>

                      <div className="d-flex justify-content-center mx-4 mb-3 mb-lg-4">
                        <button type="submit" className="btn btn-info btn-lg">Register to CloudBook</button>
                      </div>

                    </form>

                  </div>
                  <div className="col-md-8 col-lg-5 col-xl-6 d-flex align-items-center order-1 order-lg-2">

                    <img src="https://mdbcdn.b-cdn.net/img/Photos/new-templates/bootstrap-registration/draw1.webp"
                      className="img-fluid" alt="Sample image" />

                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Signup
