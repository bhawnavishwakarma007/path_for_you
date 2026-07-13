const db = require('../../config/db');

const User = {
    create: async (name, email, password, contact, user_type) => {
        const query = 'INSERT INTO tp_users (tp_uname, tp_uemail, tp_upassword, tp_ucontact, tp_uuser_type) VALUES (?, ?, ?, ?, ?)';
        return db.execute(query, [name, email, password, contact, user_type]);
    },
    findByEmail: async (email) => {
        const query = 'SELECT * FROM tp_users WHERE tp_uemail = ?';
        const [rows] = await db.execute(query, [email]);
        return rows[0];
    },
    findById: async (id) => {
        const query = 'SELECT * FROM tp_users WHERE tp_uid = ?';
        const [rows] = await db.execute(query, [id]);
        return rows[0];
    },
    update: async (id, name, email, password, contact, user_type) => {
        const query = 'UPDATE tp_users SET tp_uname = ?, tp_uemail = ?, tp_upassword = ?, tp_ucontact = ?, tp_uuser_type = ? WHERE tp_uid = ?';
        return db.execute(query, [name, email, password, contact, user_type, id]);
    }
};  

module.exports = User;