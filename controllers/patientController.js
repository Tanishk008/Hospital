const Patient = require('../models/Patient');

// @desc    Register a new patient
// @route   POST /patients
// @access  Public
const registerPatient = async (req, res, next) => {
    try {
        const patient = await Patient.create(req.body);
        res.status(201).json({ success: true, data: patient });
    } catch (err) {
        next(err);
    }
};

// @desc    Get all patients
// @route   GET /patients
// @access  Public
const getAllPatients = async (req, res, next) => {
    try {
        const patients = await Patient.find();
        res.status(200).json({ success: true, count: patients.length, data: patients });
    } catch (err) {
        next(err);
    }
};

// @desc    Search patients by name or disease
// @route   GET /patients/search?name=xyz&disease=xyz
// @access  Public
const searchPatients = async (req, res, next) => {
    try {
        const { name, disease } = req.query;

        if (!name && !disease) {
            return res.status(400).json({
                success: false,
                error: 'Please provide a name or disease query parameter',
            });
        }

        const query = {};
        if (name) {
            query.fullName = { $regex: name, $options: 'i' };
        }
        if (disease) {
            query.disease = { $regex: disease, $options: 'i' };
        }

        const patients = await Patient.find(query);
        res.status(200).json({ success: true, count: patients.length, data: patients });
    } catch (err) {
        next(err);
    }
};

// @desc    Get a single patient by ID
// @route   GET /patients/:id
// @access  Public
const getPatientById = async (req, res, next) => {
    try {
        const patient = await Patient.findById(req.params.id);

        if (!patient) {
            return res.status(404).json({ success: false, error: 'Patient not found' });
        }

        res.status(200).json({ success: true, data: patient });
    } catch (err) {
        next(err);
    }
};

// @desc    Update patient details
// @route   PUT /patients/:id
// @access  Public
const updatePatient = async (req, res, next) => {
    try {
        const patient = await Patient.findByIdAndUpdate(req.params.id, req.body, {
            new: true,
            runValidators: true,
        });

        if (!patient) {
            return res.status(404).json({ success: false, error: 'Patient not found' });
        }

        res.status(200).json({ success: true, data: patient });
    } catch (err) {
        next(err);
    }
};

// @desc    Delete a patient
// @route   DELETE /patients/:id
// @access  Public
const deletePatient = async (req, res, next) => {
    try {
        const patient = await Patient.findByIdAndDelete(req.params.id);

        if (!patient) {
            return res.status(404).json({ success: false, error: 'Patient not found' });
        }

        res.status(200).json({ success: true, message: 'Patient deleted successfully', data: {} });
    } catch (err) {
        next(err);
    }
};

module.exports = {
    registerPatient,
    getAllPatients,
    searchPatients,
    getPatientById,
    updatePatient,
    deletePatient,
};
