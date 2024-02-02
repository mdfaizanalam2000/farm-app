import './App.css';
import { useState } from 'react';

function App() {
  const [intern_data, setInternData] = useState({
    name: "",
    hometown: "",
    email: "",
    domain: ""
  })
  const [alert, setAlert] = useState(false)

  const handleSubmit = async (e) => {
    e.preventDefault();
    const response = await fetch("http://127.0.0.1:8000/addIntern", {
      method: "POST",
      headers: {
        "Content-Type": "appilication/json"
      },
      body: JSON.stringify(intern_data)
    })
    const parsedResponse = await response.json()
    if (parsedResponse.message === "success") {
      setAlert(true)
      setInterval(() => {
        setAlert(false)
      }, 3000);
      setInternData({
        name: "",
        hometown: "",
        email: "",
        domain: ""
      })
    } else {
      alert("Internal server issue, Try again later!")
    }
  }

  const handleChange = (e) => {
    setInternData({ ...intern_data, [e.target.name]: e.target.value })
  }

  return (
    <div className="container">
      <form onSubmit={handleSubmit}>
        <h1 className='text-center'>Intern Registration Form</h1>
        <div className="mb-3">
          <label htmlFor="name" className="form-label">Full name</label>
          <input type="text" className="form-control" id="name" name='name' onChange={handleChange} autoComplete='off' value={intern_data.name} required />
        </div>
        <div className="mb-3">
          <label htmlFor="hometown" className="form-label">Hometown</label>
          <input type="text" className="form-control" id="hometown" name='hometown' onChange={handleChange} autoComplete='off' value={intern_data.hometown} required />
        </div>
        <div className="mb-3">
          <label htmlFor="email" className="form-label">Email address</label>
          <input type="email" className="form-control" id="email" aria-describedby="emailHelp" name='email' onChange={handleChange} autoComplete='off' value={intern_data.email} required />
          <div id="emailHelp" className="form-text">We'll never share your email with anyone else.</div>
        </div>
        <div className="mb-3">
          <label htmlFor="domain" className="form-label">Domain</label>
          <input type="text" className="form-control" id="domain" name='domain' onChange={handleChange} autoComplete='off' value={intern_data.domain} required />
        </div>
        <button type="submit" className="btn btn-primary">Submit</button>
      </form>
      {alert && <div className="alert alert-success" role="alert">
        Intern data saved permanently
      </div>}
    </div>
  );
}

export default App;
