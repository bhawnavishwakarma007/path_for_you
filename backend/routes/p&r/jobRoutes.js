// routes/p&r/jobRoutes.js

const express = require('express');
const router = express.Router();
const jobController = require('../../controllers/module1Controller/jobController');

// 1. GET    /api/getjobs                 → all jobs
router.get('/getjobs', jobController.getAllJobs);

// 2. GET    /api/getjobs/type/:type      → all jobs by type
router.get('/getjobs/type/:type', jobController.getJobByType);

// 3. GET    /api/getjobs/type/:type/:id  → single job by type & id
router.get('/getjobs/type/:type/:id', jobController.getJobByTypeById);

// 4. GET    /api/getjobs/id/:id          → single job by id
router.get('/getjobs/id/:id', jobController.getJobById);

// 5. POST   /api/createjobs               → create job without type
router.post('/createjobs', jobController.createJob);

// 6. POST   /api/createjobs/type/:type    → create job and force jobType
router.post('/createjobs/type/:type', jobController.createJobByType);

// 7. PUT    /api/updatejobs/:id           → update job by id
router.put('/updatejobs/:id', jobController.updateJob);

// 8. DELETE /api/deletejobs/:id           → delete job by id
router.delete('/deletejobs/:id', jobController.deleteJob);

module.exports = router;
