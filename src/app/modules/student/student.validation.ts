import Joi from "joi"
const userNameSchema = Joi.object({
    firstName: Joi.string().required().alphanum(),
    middleName: Joi.string().optional().allow(''),
    lastName: Joi.string().required().alphanum(),
  });
  
  const guardianSchema = Joi.object({
    fatherName: Joi.string().required(),
    fatherOccupation: Joi.string().required(),
    fatherContactNo: Joi.string().required().pattern(/^\d{10}$/, 'must be a 10-digit phone number'), // Improved validation with pattern
    motherName: Joi.string().required(),
    motherOccupation: Joi.string().required(),
    motherConctactNo: Joi.string().required().pattern(/^\d{10}$/, 'must be a 10-digit phone number'),
  });
  
  const localGuardianSchema = Joi.object({
    name: Joi.string().required(),
    occupation: Joi.string().required(),
    contactNo: Joi.string().required().pattern(/^\d{10}$/, 'must be a 10-digit phone number'),
    address: Joi.string().required(),
  });
  
  const studentSchema = Joi.object({
    id: Joi.string().required(), // Ensure unique identifier format (consider using a library like uuid for generation)
    name: userNameSchema.required(),
    gender: Joi.string().required().valid('male', 'female'),
    dateOfBirth: Joi.date().required(),
    email: Joi.string().required().email(), // Improved email validation
    conactNumber: Joi.string().required().pattern(/^\d{10}$/, 'must be a 10-digit phone number'),
    emergencyConcactNo: Joi.string().required().pattern(/^\d{10}$/, 'must be a 10-digit phone number'),
    bloodGroup: Joi.string().required().valid('A+', 'A-', 'B+', 'B-', 'AB+', 'AB-', 'O+', 'O-'),
    presentAddress: Joi.string().required(),
    permanantAddress: Joi.string().required(),
    guardian: guardianSchema.required(),
    localGuardian: localGuardianSchema.required(),
    profileImg: Joi.string().optional().allow(''), // Allow for optional profile image
    isActive: Joi.string().required().valid('active', 'blocked'),
  });

  export default studentSchema;