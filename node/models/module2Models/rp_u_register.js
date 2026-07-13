const db = require("../../config/db");

class RP_Registration {
  // Create a new user
  static async create({
    fullname, email, contact, password, gender, category_type, qualification,
    branch, specialization, passingyear, university, lastUniversity, researcharea,
    requirementtype, synopsis, researchpapers, researchpresentation, profilepic
  }) {
    const [result] = await db.query(
      `INSERT INTO rp_registration (
        rp_fullname, rp_email, rp_contact, rp_password, rp_gender, rp_category_type, 
        rp_qualification, rp_branch, rp_specialization, rp_passingyear, rp_university, 
        rp_lastUniversity, rp_researcharea, rp_requirementtype, rp_synopsis, 
        rp_researchpapers, rp_researchpresentation, rp_profilepic
      ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`,
      [
        fullname, email, contact, password, gender, category_type, qualification, branch,
        specialization, passingyear, university, lastUniversity, researcharea, requirementtype,
        synopsis, researchpapers, researchpresentation, profilepic
      ]
    );
    return result.insertId;
  }

  // Get all users
  static async getAllUsers() {
    const [rows] = await db.query("SELECT * FROM rp_registration");
    return rows;
  }

  // Find a user by email
  static async findByEmail(email) {
    const [rows] = await db.query("SELECT * FROM rp_registration WHERE rp_email = ?", [email]);
    return rows[0];
  }

  // Find a user by ID
  static async findById(id) {
    const [rows] = await db.query("SELECT * FROM rp_registration WHERE rp_uid = ?", [id]);
    return rows.length ? rows[0] : null; // Check if user exists
  }

  // Update a user
  static async updateUser(id, updateData) {
    const columns = Object.keys(updateData).map(key => `${key} = ?`).join(", ");
    const values = Object.values(updateData);
    values.push(id);

    const [result] = await db.query(
      `UPDATE rp_registration SET ${columns} WHERE rp_uid = ?`, values
    );
    return result.affectedRows;
  }

  // Delete a user
  static async deleteUser(id) {
    const [result] = await db.query("DELETE FROM rp_registration WHERE rp_uid = ?", [id]);
    return result.affectedRows;
  }
}

module.exports = RP_Registration;


// create table rp_registration (
//     rp_uid int auto_increment primary key, -- unique id for each user
//     rp_fullname varchar(100) not null, -- user's full name
//     rp_email varchar(100) unique not null, -- user's email (unique)
//     rp_contact varchar(15) not null, -- user's contact number
//     rp_password varchar(255) not null, -- user's password (hashed)
//     rp_gender enum('male', 'female', 'other') null, -- gender
//     rp_category_type enum('technical', 'non-technical') not null,
//     rp_qualification varchar(50) null, -- qualification
//     rp_branch varchar(50) null, -- branch
//     rp_specialization varchar(100) null, -- specialization
//     rp_passingyear year null, -- year of passing
//     rp_university varchar(100) null, -- university
//     rp_lastUniversity varchar(100) null,
//     rp_researcharea text null, -- area of research or publication focus
//     rp_requirementtype enum('thesis', 'synopsis', 'paper publication', 'presentation') not null, -- type of requirement
//     rp_synopsis text null, -- synopsis of research
//     rp_researchpapers text null, -- list of research papers published
//     rp_researchpresentation text null, -- research presentations given
//     rp_profilepic varchar(255) -- path/url for profile picture
    
// );