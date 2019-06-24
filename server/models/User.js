import dbQuery from '../services/query';

const User = {
  async create(data) {
    const createQuery = `INSERT INTO
    users(email, username, password)
    VALUES($1, $2, $3)
    returning *`;
    const values = [data.email, data.username, data.password];
    const rows = await dbQuery.query(createQuery, values);
    return rows;
  },

  async getEmail(email) {
    const createQuery = `SELECT 
    (SELECT email FROM users WHERE email = $1) AS email;`;
    const rows = await dbQuery.query(createQuery, [email]);
    return rows.email;
  },
};

export default User;
