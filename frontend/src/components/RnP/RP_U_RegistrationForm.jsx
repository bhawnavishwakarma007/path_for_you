import React, { useState } from "react";
import Select from "react-select";
import { Country, State } from "country-state-city";
import { FaUserPlus } from "react-icons/fa";
import axios from "axios"; // Import axios
import '../../css/RnP/RP_U_RegistrationForm.css'; // Import the unique CSS for the registration form

const RP_Registration = () => {
  const [selectedCountry, setSelectedCountry] = useState(null);
  const [selectedState, setSelectedState] = useState(null);
  const [userType, setUserType] = useState(null);
  const [formData, setFormData] = useState({
    rp_fullname: "",
    rp_email: "",
    rp_contact: "",
    rp_password: "",
    rp_confirmPassword: "",
    rp_gender: "",
    rp_category_type: "",
    rp_qualification: "",
    rp_branch: "",
    rp_specialization: "",
    rp_passingyear: "",
    rp_university: "",
    rp_lastUniversity: "",
    rp_researcharea: "",
    rp_requirementtype: "",
    rp_synopsis: "",
    rp_researchpapers: "",
    rp_researchpresentation: "",
    rp_profilepic: "",
    rp_username: "", // Added username to state
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.post(
        "http://localhost:5000/api/rp/rp_registration", // ✅ Corrected API endpoint
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data", // ✅ For file uploads
          },
        }
      );
  
      console.log(response.data);
      alert("User Registered Successfully!"); // ✅ Success message
      setFormData(initialFormState); // ✅ Form reset after successful submission
      setSelectedCountry(null);
      setSelectedState(null);
      setUserType(null)
    } catch (error) {
      console.error("Error registering user", error);
      alert("Registration Failed. Check Console."); // ✅ Error handling
    }
  };

  const countryOptions = Country.getAllCountries().map((country) => ({
    value: country.isoCode,
    label: (
      <div style={{ display: "flex", alignItems: "center" }}>
        <img
          src={`https://flagcdn.com/w40/${country.isoCode.toLowerCase()}.png`}
          alt={`${country.name} flag`}
          style={{ width: "20px", marginRight: "10px" }}
        />
        {country.name}
      </div>
    ),
  }));

  const stateOptions =
    selectedCountry &&
    State.getStatesOfCountry(selectedCountry.value).map((state) => ({
      value: state.isoCode,
      label: state.name,
    }));

  const userTypeOptions = [
    { value: "technical", label: "Technical" },
    { value: "non-technical", label: "Non-Technical" },
  ];
  const handleFileChange = (e) => {
    setFormData({
      ...formData,
      rp_profilepic: e.target.files[0], // File object stored in state
    });
  };  

  return (
    <div className="registration-page">
      <div className="registration-form">
        <div className="form-header text-center">
          <FaUserPlus size={40} color="#001F3F" />
          <h2>Create an Account</h2>
          <p>Join our community today</p>
        </div>
        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <input
              type="text"
              placeholder="Enter Your Full Name"
              className="form-control"
              name="rp_fullname"
              value={formData.rp_fullname}
              onChange={handleInputChange}
              required
            />
          </div>
          <div className="form-group">
            <input
              type="email"
              placeholder="Enter Email Address"
              className="form-control"
              name="rp_email"
              value={formData.rp_email}
              onChange={handleInputChange}
              required
            />
          </div>
          <div className="form-group">
            <input
              type="text"
              placeholder="Enter Contact Number"
              className="form-control"
              name="rp_contact"
              value={formData.rp_contact}
              onChange={handleInputChange}
              required
            />
          </div>
          {/* Country Dropdown */}
          <div className="form-group">
            <Select
              options={countryOptions}
              placeholder="Select Country"
              value={selectedCountry}
              onChange={(value) => setSelectedCountry(value)}
              className="react-select"
            />
          </div>
          {/* State Dropdown */}
          <div className="form-group">
            <Select
              options={stateOptions}
              placeholder="Select State"
              value={selectedState}
              onChange={(value) => setSelectedState(value)}
              isDisabled={!selectedCountry}
              className="react-select"
            />
          </div>
          <div className="form-group">
          <input
              type="text"
              placeholder="Enter Your City Name"
              className="form-control"
              name="rp_qualification"
              value={formData.rp_qualification}
              onChange={handleInputChange}
            />
          </div>
          {/* User Type Dropdown */}
          <div className="form-group">
            <Select
              options={userTypeOptions}
              placeholder="Select Your Field of Interest"
              value={userType}
              onChange={(value) => setUserType(value)}
              className="react-select"
            />
          </div>
          {/* Other Fields */}
          <div className="form-group">
            <input
              type="text"
              placeholder="Enter Your Last Qualification"
              className="form-control"
              name="rp_qualification"
              value={formData.rp_qualification}
              onChange={handleInputChange}
            />
          </div>
          <div className="form-group">
            <input
              type="text"
              placeholder="Enter Your Branch"
              className="form-control"
              name="rp_branch"
              value={formData.rp_branch}
              onChange={handleInputChange}
            />
          </div>
         {/* Research and Publication Type Selection */}
        <div className="form-group">
          <label htmlFor="rp_task" className="form-label">Select Research Task</label>
          <select
            id="rp_task"
            className="form-control"
            name="rp_task"
            value={formData.rp_task}
            onChange={handleInputChange}
            required
          >
            <option value="">Select Task Type</option>
            <option value="Thesis">Thesis</option>
            <option value="Synopsis">Synopsis</option>
            <option value="Paper">Research Paper</option>
            <option value="PPT">Presentation (PPT)</option>
          </select>
        </div>

          <div className="form-group">
            <input
              type="text"
              placeholder="Enter Specialization"
              className="form-control"
              name="rp_specialization"
              value={formData.rp_specialization}
              onChange={handleInputChange}
            />
          </div>
          <div className="form-group">
            <input
              type="text"
              placeholder="Enter University Name"
              className="form-control"
              name="rp_university"
              value={formData.rp_university}
              onChange={handleInputChange}
            />
          </div>
          {/* Profile Picture */}
        <div className="form-group">
        <label htmlFor="rp_profilepic" className="form-label">
             Upload Your Profile Picture
        </label>
        <input
             type="file"
             id="rp_profilepic"
             className="form-control"
             name="rp_profilepic"
             onChange={handleFileChange}
            />
        </div>
          {/* Username and Password */}
          {/* Password and Confirm Password */}
      <div className="form-group">
       <input
             type="password"
             placeholder="Create a Password"
             className="form-control"
             name="rp_password"
             value={formData.rp_password}
             onChange={handleInputChange}
             required
          />
      </div>
      <div className="form-group">
           <input
              type="password"
              placeholder="Confirm Password"
              className="form-control"
              name="rp_confirmPassword"
              value={formData.rp_confirmPassword}
              onChange={handleInputChange}
              required
             />
           </div>
        
          <button type="submit" className="btn btn-primary">
            Register
          </button>
        </form>
      </div>
    </div>
  );
};

export default RP_Registration;

