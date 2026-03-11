const express = require('express');
const router = express.Router();

const {
    registerPatient,
    getAllPatients,
    searchPatients,
    getPatientById,
    updatePatient,
    deletePatient,
} = require('../controllers/patientController');

// IMPORTANT: /search must be registered BEFORE /:id to avoid "search" being treated as an ID
router.get('/search', searchPatients);

router.route('/').post(registerPatient).get(getAllPatients);

router.route('/:id').get(getPatientById).put(updatePatient).delete(deletePatient);

module.exports = router;
