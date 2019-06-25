import dbQuery from '../services/query';

const Group = {
  async create(data) {
    const createQuery = `INSERT INTO
      guides(name, keywords, neededitems, steps, userid)
      VALUES($1, $2, $3, $4, $5)
      returning *`;

    const values = [data.name, data.keywords, data.neededItems, data.steps, data.userId];
    const rows = await dbQuery.query(createQuery, values);

    return rows;
  },

  async checkGuideName(groupName) {
    const findAllQuery = 'select name from guides where name = $1;';
    const rows = await dbQuery.queryAll(findAllQuery, [groupName]);
    const found = rows.some(ele => ele.name === groupName);
    if (found) {
      return 'duplicate';
    }

    return 'safe';
  },
  async getSpecificGuide(guideId) {
    const findAllQuery = `SELECT * FROM guides 
    WHERE id = $1`;
    const rows = await dbQuery.query(findAllQuery, [guideId]);
    return rows;
  },
  async getAllGuides() {
    const findAllQuery = 'SELECT * FROM guides';
    const rows = await dbQuery.dbquery(findAllQuery);
    return rows;
  },
};

export default Group;