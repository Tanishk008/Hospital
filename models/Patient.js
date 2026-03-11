const mongoose = require('mongoose');
const { v4: uuidv4 } = require('uuid');

const patientSchema = new mongoose.Schema(
  {
    patientId: {
      type: String,
      default: uuidv4,
      unique: true,
    },
    fullName: {
      type: String,
      required: [true, 'Full name is required'],
      trim: true,
    },
    email: {
      type: String,
      required: [true, 'Email is required'],
      unique: true,
      trim: true,
      lowercase: true,
    },
    phoneNumber: {
      type: String,
      required: [true, 'Phone number is required'],
      trim: true,
    },
    age: {
      type: Number,
      required: [true, 'Age is required'],
      min: [0, 'Age must be a positive number'],
    },
    gender: {
      type: String,
      enum: ['Male', 'Female', 'Other'],
      default: 'Other',
    },
    disease: {
      type: String,
      required: [true, 'Disease/Diagnosis is required'],
      trim: true,
    },
    doctorAssigned: {
      type: String,
      required: [true, 'Doctor assigned is required'],
      trim: true,
    },
    admissionDate: {
      type: Date,
      default: Date.now,
    },
    roomNumber: {
      type: String,
      trim: true,
    },
    patientType: {
      type: String,
      enum: ['Inpatient', 'Outpatient'],
      default: 'Inpatient',
    },
    status: {
      type: String,
      enum: ['Admitted', 'Discharged'],
      default: 'Admitted',
    },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model('Patient', patientSchema);
