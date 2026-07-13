// routes/jobApplyRoutes.js
const express = require('express');
const JobApplyController = require('../../controllers/module1Controller/jobApplyController');
const uploadMiddleware = require('../../Middleware/module1Middleware/uploadMiddleware');
const router = express.Router();

router.post('/apply', uploadMiddleware.fields([{ name: 'resume' }, { name: 'photo' }]), JobApplyController.createJobApply);
router.get('/view', JobApplyController.getAllJobApplies);
router.get('/view/:id', JobApplyController.getJobApplyById); // Ensure `:id` matches
router.put('/:id/status', JobApplyController.updateJobApplyStatus);
router.delete('/:id', JobApplyController.deleteJobApply);


module.exports = router;