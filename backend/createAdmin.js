// Import necessary modules
const bcryptjs = require('bcryptjs');
const Admin = require('./models/adminModel'); // Assuming your admin model is in the models directory

// Define the admin data
const adminData = {
  email: 'admin@example.com',  // Set the email for the new admin
  password: 'admin123',         // Set the plain text password
  name: 'Admin Name',           // Set the admin's name
};

// Hash the password and insert into the database
const createAdmin = async () => {
  try {
    // Hash the password
    const hashedPassword = await bcryptjs.hash(adminData.password, 10);

    // Create the admin data object with the hashed password
    const admin = {
      email: adminData.email,
      passwordHash: hashedPassword,
      name: adminData.name,
    };

    // Insert the admin into the database
    const adminId = await Admin.create(admin);

    console.log('Admin created successfully with ID:', adminId);
  } catch (error) {
    console.error('Error creating admin:', error.message);
  }
};

// Call the function to create the admin
createAdmin();
