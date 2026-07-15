import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Container, Row, Col, Form, Button, Alert, Spinner } from 'react-bootstrap';
import jobApi from '../../api/jobApi';
import '../../css/masteradmin/MasterJobsManagement.css';
import '../../css/pnr/PnRJobDetails.css';

const MasterAddNewJob = () => {
  const navigate = useNavigate();

  const [jobDetails, setJobDetails] = useState({
    jobtitle: '',
    job_company: '',
    jobLocation: '',
    salary_LPA: '',
    experience: '',
    working_home: '',
    description: '',
    responsibility: '',
    requirements: '',
    qualification: '',
    hra: '',
    pf: '',
    esic: '',
    insurance: '',
    accommodation: '',
    other_facility: '',
    contactEmail: '',
    contactPhone: '',
    jobType: '',
    applyStartDate: '',
    deadline: ''
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [errorMsg, setErrorMsg] = useState(null);

  const handleChange = (e) => {
    setJobDetails((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setErrorMsg(null);
    setIsSubmitting(true);

    try {
      const payload = {
        jobtitle: jobDetails.jobtitle,
        job_company: jobDetails.job_company,
        jobLocation: jobDetails.jobLocation,
        salary_LPA: jobDetails.salary_LPA,
        experience: jobDetails.experience,
        working_home: jobDetails.working_home,
        description: jobDetails.description,
        responsibility: jobDetails.responsibility,
        requirements: jobDetails.requirements,
        qualification: jobDetails.qualification,
        hra: jobDetails.hra === 'Yes' ? 'Yes' : 'No',
        pf: jobDetails.pf === 'Yes' ? 'Yes' : 'No',
        esic: jobDetails.esic === 'Yes' ? 'Yes' : 'No',
        insurance: jobDetails.insurance === 'Yes' ? 'Yes' : 'No',
        accommodation: jobDetails.accommodation === 'Yes' ? 'Yes' : 'No',
        other_facility: jobDetails.other_facility,
        contactEmail: jobDetails.contactEmail,
        contactPhone: jobDetails.contactPhone,
        jobType: jobDetails.jobType,
        applyStartDate: jobDetails.applyStartDate,
        deadline: jobDetails.deadline
      };

      await jobApi.createJob(payload);
      // Navigate back to the jobs management list under /master
      navigate('/master/jobsmanagement');
    } catch (err) {
      console.error('Create job error:', err.response?.data || err.message);
      setErrorMsg(
        err.response?.data?.error || 'Something went wrong while saving the job.'
      );
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <Container className="py-4">
      <Row className="justify-content-center">
        <Col md={8}>
          <div className="bg-white p-4 rounded shadow">
            <h2 className="text-center mb-4">Add New Job</h2>

            {errorMsg && <Alert variant="danger">{errorMsg}</Alert>}

            <Form onSubmit={handleSubmit}>
              <h4 className="mb-3">Basic Information</h4>

              <Row>
                <Col md={6}>
                  <Form.Group className="mb-3">
                    <Form.Label>Job Title</Form.Label>
                    <Form.Control
                      type="text"
                      name="jobtitle"
                      value={jobDetails.jobtitle}
                      onChange={handleChange}
                      placeholder="Enter job title"
                      required
                    />
                  </Form.Group>
                </Col>
                <Col md={6}>
                  <Form.Group className="mb-3">
                    <Form.Label>Company</Form.Label>
                    <Form.Control
                      type="text"
                      name="job_company"
                      value={jobDetails.job_company}
                      onChange={handleChange}
                      placeholder="Enter company name"
                      required
                    />
                  </Form.Group>
                </Col>
              </Row>

              <Row>
                <Col md={6}>
                  <Form.Group className="mb-3">
                    <Form.Label>Location</Form.Label>
                    <Form.Control
                      type="text"
                      name="jobLocation"
                      value={jobDetails.jobLocation}
                      onChange={handleChange}
                      placeholder="e.g. New Delhi"
                      required
                    />
                  </Form.Group>
                </Col>
                <Col md={6}>
                  <Form.Group className="mb-3">
                    <Form.Label>Salary (LPA)</Form.Label>
                    <Form.Control
                      type="number"
                      step="0.01"
                      name="salary_LPA"
                      value={jobDetails.salary_LPA}
                      onChange={handleChange}
                      placeholder="e.g. 5.50"
                    />
                  </Form.Group>
                </Col>
              </Row>

              <Row>
                <Col md={6}>
                  <Form.Group className="mb-3">
                    <Form.Label>Experience Required</Form.Label>
                    <Form.Control
                      type="text"
                      name="experience"
                      value={jobDetails.experience}
                      onChange={handleChange}
                      placeholder="e.g. 2-4 years"
                    />
                  </Form.Group>
                </Col>
                <Col md={6}>
                  <Form.Group className="mb-3">
                    <Form.Label>Work From Home</Form.Label>
                    <Form.Select
                      name="working_home"
                      value={jobDetails.working_home}
                      onChange={handleChange}
                      required
                    >
                      <option value="">Select Option</option>
                      <option value="Yes">Yes</option>
                      <option value="No">No</option>
                      <option value="Hybrid">Hybrid</option>
                    </Form.Select>
                  </Form.Group>
                </Col>
              </Row>

              <Form.Group className="mb-3">
                <Form.Label>Job Description</Form.Label>
                <Form.Control
                  as="textarea"
                  rows={3}
                  name="description"
                  value={jobDetails.description}
                  onChange={handleChange}
                  placeholder="Describe the role..."
                  required
                />
              </Form.Group>

              <Form.Group className="mb-3">
                <Form.Label>Responsibilities</Form.Label>
                <Form.Control
                  as="textarea"
                  rows={3}
                  name="responsibility"
                  value={jobDetails.responsibility}
                  onChange={handleChange}
                  placeholder="List key responsibilities..."
                />
              </Form.Group>

              <Form.Group className="mb-3">
                <Form.Label>Requirements</Form.Label>
                <Form.Control
                  as="textarea"
                  rows={3}
                  name="requirements"
                  value={jobDetails.requirements}
                  onChange={handleChange}
                  placeholder="List mandatory skills/requirements..."
                />
              </Form.Group>

              <Form.Group className="mb-3">
                <Form.Label>Qualification</Form.Label>
                <Form.Control
                  type="text"
                  name="qualification"
                  value={jobDetails.qualification}
                  onChange={handleChange}
                  placeholder="e.g. B.Tech in Computer Science"
                />
              </Form.Group>

              <h4 className="mb-3 mt-4">Benefits</h4>
              <Row>
                <Col md={6}>
                  <Form.Group className="mb-3">
                    <Form.Label>HRA</Form.Label>
                    <Form.Select
                      name="hra"
                      value={jobDetails.hra}
                      onChange={handleChange}
                    >
                      <option value="">Select Option</option>
                      <option value="Yes">Yes</option>
                      <option value="No">No</option>
                    </Form.Select>
                  </Form.Group>
                </Col>
                <Col md={6}>
                  <Form.Group className="mb-3">
                    <Form.Label>PF</Form.Label>
                    <Form.Select
                      name="pf"
                      value={jobDetails.pf}
                      onChange={handleChange}
                    >
                      <option value="">Select Option</option>
                      <option value="Yes">Yes</option>
                      <option value="No">No</option>
                    </Form.Select>
                  </Form.Group>
                </Col>
              </Row>

              <Row>
                <Col md={6}>
                  <Form.Group className="mb-3">
                    <Form.Label>ESIC</Form.Label>
                    <Form.Select
                      name="esic"
                      value={jobDetails.esic}
                      onChange={handleChange}
                    >
                      <option value="">Select Option</option>
                      <option value="Yes">Yes</option>
                      <option value="No">No</option>
                    </Form.Select>
                  </Form.Group>
                </Col>
                <Col md={6}>
                  <Form.Group className="mb-3">
                    <Form.Label>Insurance</Form.Label>
                    <Form.Select
                      name="insurance"
                      value={jobDetails.insurance}
                      onChange={handleChange}
                    >
                      <option value="">Select Option</option>
                      <option value="Yes">Yes</option>
                      <option value="No">No</option>
                    </Form.Select>
                  </Form.Group>
                </Col>
              </Row>

              <Form.Group className="mb-3">
                <Form.Label>Accommodation</Form.Label>
                <Form.Select
                  name="accommodation"
                  value={jobDetails.accommodation}
                  onChange={handleChange}
                >
                  <option value="">Select Option</option>
                  <option value="Yes">Yes</option>
                  <option value="No">No</option>
                </Form.Select>
              </Form.Group>

              <Form.Group className="mb-3">
                <Form.Label>Other Facilities (if any)</Form.Label>
                <Form.Control
                  type="text"
                  name="other_facility"
                  value={jobDetails.other_facility}
                  onChange={handleChange}
                  placeholder="e.g. Canteen, Hostel"
                />
              </Form.Group>

              <h4 className="mb-3 mt-4">Contact Information</h4>
              <Row>
                <Col md={6}>
                  <Form.Group className="mb-3">
                    <Form.Label>Email</Form.Label>
                    <Form.Control
                      type="email"
                      name="contactEmail"
                      value={jobDetails.contactEmail}
                      onChange={handleChange}
                      placeholder="contact@example.com"
                    />
                  </Form.Group>
                </Col>
                <Col md={6}>
                  <Form.Group className="mb-3">
                    <Form.Label>Phone</Form.Label>
                    <Form.Control
                      type="tel"
                      name="contactPhone"
                      value={jobDetails.contactPhone}
                      onChange={handleChange}
                      placeholder="+91XXXXXXXXXX"
                    />
                  </Form.Group>
                </Col>
              </Row>

              <Form.Group className="mb-3">
                <Form.Label>Job Type</Form.Label>
                <Form.Select
                  name="jobType"
                  value={jobDetails.jobType}
                  onChange={handleChange}
                  required
                >
                  <option value="">Select</option>
                  <option value="Technical">Technical</option>
                  <option value="Non-Technical">Non-Technical</option>
                </Form.Select>
              </Form.Group>

              <Row>
                <Col md={6}>
                  <Form.Group className="mb-3">
                    <Form.Label>Apply Start Date</Form.Label>
                    <Form.Control
                      type="date"
                      name="applyStartDate"
                      value={jobDetails.applyStartDate}
                      onChange={handleChange}
                      required
                    />
                  </Form.Group>
                </Col>
                <Col md={6}>
                  <Form.Group className="mb-3">
                    <Form.Label>Deadline</Form.Label>
                    <Form.Control
                      type="date"
                      name="deadline"
                      value={jobDetails.deadline}
                      onChange={handleChange}
                      required
                    />
                  </Form.Group>
                </Col>
              </Row>

              <div className="d-flex justify-content-end gap-2 mt-4">
                <Button
                  variant="secondary"
                  onClick={() => navigate('/master/jobsmanagement')}
                  disabled={isSubmitting}
                >
                  Cancel
                </Button>
                <Button variant="primary" type="submit" disabled={isSubmitting}>
                  {isSubmitting ? (
                    <>
                      <Spinner
                        as="span"
                        animation="border"
                        size="sm"
                        role="status"
                        aria-hidden="true"
                      />{' '}
                      Saving...
                    </>
                  ) : (
                    'Save Job'
                  )}
                </Button>
              </div>
            </Form>
          </div>
        </Col>
      </Row>
    </Container>
  );
};

export default MasterAddNewJob;
