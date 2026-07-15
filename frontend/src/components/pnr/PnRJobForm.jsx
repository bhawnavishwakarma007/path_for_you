import React, { useState } from 'react';
import { applyJob } from '../../services/pnr/api'; // Import API function
import '../../css/pnr/PnRjobform1.css';

const JobForm = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    dob: '',
    gender: '',
    qualification: '',
    specialization: '',
    passing_year: '',
    university: '',
    work_experience: '',
    skills: '',
    resume: null,
    aadhar_no: '',
    photo: null,
    state: '',
    district: '',
    city: '',
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleFileChange = (e) => {
    const { name, files } = e.target;
    setFormData({ ...formData, [name]: files[0] });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const data = new FormData();
    for (const key in formData) {
      data.append(key, formData[key]);
      console.log(`Appending key: ${key}, value: ${formData[key]}`);
    }

    try {
      const response = await applyJob(data); // Call API function
      console.log('Job application submitted:', response);
      alert('Job application submitted successfully!');
    } catch (error) {
      if (error.response) {
        console.error('Error submitting job application:', error.response.data);
        console.error('Status code:', error.response.status);
      } else {
        console.error('Error submitting job application:', error);
      }
      alert('Error submitting job application!');
    }
  };

  return (
    <form className="job-form" onSubmit={handleSubmit}>
      <h2>Job Application Form</h2>

      <h3>Personal Information</h3>
      <div className="form-group">
        <label>Name <span className="required">*</span></label>
        <input type="text" name="name" value={formData.name} onChange={handleChange} required />
      </div>
      <div className="form-group">
        <label>Email <span className="required">*</span></label>
        <input type="email" name="email" value={formData.email} onChange={handleChange} required />
      </div>
      <div className="form-group">
        <label>Phone <span className="required">*</span></label>
        <input type="text" name="phone" value={formData.phone} onChange={handleChange} required />
      </div>
      <div className="form-group">
        <label>Date of Birth <span className="required">*</span></label>
        <input type="date" name="dob" value={formData.dob} onChange={handleChange} required />
      </div>
      <div className="form-group">
        <label>Gender <span className="required">*</span></label>
        <select name="gender" value={formData.gender} onChange={handleChange} required>
          <option value="">Select</option>
          <option value="Male">Male</option>
          <option value="Female">Female</option>
          <option value="Other">Other</option>
        </select>
      </div>

      <h3>Qualification</h3>
      <div className="form-group">
        <label>Qualification <span className="required">*</span></label>
        <input type="text" name="qualification" value={formData.qualification} onChange={handleChange} required />
      </div>
      <div className="form-group">
        <label>Specialization <span className="required">*</span></label>
        <input type="text" name="specialization" value={formData.specialization} onChange={handleChange} required />
      </div>
      <div className="form-group">
        <label>Passing Year <span className="required">*</span></label>
        <input type="text" name="passing_year" value={formData.passing_year} onChange={handleChange} required />
      </div>
      <div className="form-group">
        <label>University <span className="required">*</span></label>
        <input type="text" name="university" value={formData.university} onChange={handleChange} required />
      </div>
      <div className="form-group">
        <label>Work Experience <span className="required">*</span></label>
        <input type="text" name="work_experience" value={formData.work_experience} onChange={handleChange} required />
      </div>
      <div className="form-group">
        <label>Skills <span className="required">*</span></label>
        <input type="text" name="skills" value={formData.skills} onChange={handleChange} required />
      </div>

      <h3>Document Upload</h3>
      <div className="form-group">
        <label>Resume <span className="required">*</span></label>
        <input type="file" name="resume" onChange={handleFileChange} required />
      </div>
      <div className="form-group">
        <label>Photo <span className="required">*</span></label>
        <input type="file" name="photo" onChange={handleFileChange} required />
      </div>
      <div className="form-group">
        <label>Aadhar Number <span className="required">*</span></label>
        <input type="text" name="aadhar_no" value={formData.aadhar_no} onChange={handleChange} required />
      </div>

      <h3>Address</h3>
      <div className="form-group">
        <label>State * </label>
        <input type="text" name="state" value={formData.state} onChange={handleChange} required />
      </div>
      <div className="form-group">
        <label>District * </label>
        <input type="text" name="district" value={formData.district} onChange={handleChange} required />
      </div>
      <div className="form-group">
        <label>City <span className="required">*</span></label>
        <input type="text" name="city" value={formData.city} onChange={handleChange} required />
      </div>

      <button type="submit">Submit</button>
    </form>
  );
};

export default JobForm;
