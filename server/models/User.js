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

  async getUserByEmail(email) {
    const createQuery = 'SELECT * FROM users WHERE email = $1;';
    const rows = await dbQuery.query(createQuery, [email]);
    return rows;
  },

  async checkUsername(username) {
    const findAllQuery = 'select username from users where username = $1;';
    const rows = await dbQuery.queryAll(findAllQuery, [username]);
    const found = rows.some(ele => ele.username === username);
    if (found) {
      return 'duplicate';
    }

    return 'safe';
  },
};

export default User;
