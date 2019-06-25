import dbQuery from '../services/query';

const Guide = {
  async create(data) {
    const createQuery = `INSERT INTO
      guides(name, keywords, neededitems, steps, userid)
      VALUES($1, $2, $3, $4, $5)
      returning *`;

    const values = [data.name, data.keywords, data.neededItems, data.steps, data.userId];
    const rows = await dbQuery.query(createQuery, values);

    return rows;
  },

  async checkGuideName(guideName) {
    const findAllQuery = 'select name from guides where name = $1;';
    const rows = await dbQuery.queryAll(findAllQuery, [guideName]);
    const found = rows.some(ele => ele.name === guideName);
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

  async update(guideData, guideId) {
    let query = 'UPDATE guides SET ';
    let dataCount;

    const keys = Object.keys(guideData);
    const values = Object.values(guideData);

    keys.map((ele, indx, arr) => {
      if (arr.length !== indx + 1) {
        query += `${ele} = $${indx + 1}, `;
      } else {
        query += `${ele} = $${indx + 1}  `;
        dataCount = indx + 2;
      }
      return ele;
    });

    query += `WHERE id = $${dataCount};`;

    const guideIdNum = Number(guideId);
    values.push(guideIdNum);

    await dbQuery.queryAll(query, values);

    const returnValues = [guideIdNum];
    const returnQuery = `SELECT * FROM guides 
    WHERE id = $1`;
    const returnData = await dbQuery.query(returnQuery, returnValues);

    return returnData;
  },
  async deleteGuide(guideId) {
    const deleteQuery = `DELETE FROM guides
    WHERE id = $1;`;
    await dbQuery.query(deleteQuery, [guideId]);
  },
};

export default Guide;
