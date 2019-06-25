import helper from '../utilities/helper';

const GuideValidations = {
  async getSpecificGuide(req, res, next) {
    const { id } = req.params;

    if (!id || !Number(id)) {
      return res.status(400).send({ status: 400, error: 'Please enter a valid Guide id' });
    }
    req.guideId = Number(id);
    return next();
  },

  async createGuide(req, res, next) {
    const {
      name, neededItems, steps, keywords,
    } = req.body;
    const errors = [];

    if (!helper.isValidName(name) || !name) {
      errors.push({ error: 'Please enter a valid Guide name' });
    }
    if (!neededItems) {
      errors.push({ error: 'Please enter the needed items' });
    }
    if (!steps) {
      errors.push({ error: 'Please enter the steps' });
    }
    if (!keywords) {
      errors.push({ error: 'Please enter the keywords' });
    }
    if (errors.length >= 1) {
      return res.status(400).send({
        status: 400,
        errors,
      });
    }
    return next();
  },
};

export default GuideValidations;
