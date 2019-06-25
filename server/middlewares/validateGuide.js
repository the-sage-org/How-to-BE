import helper from '../utilities/helper';
import db from '../models/Guide';

export const getArticleData = (input, add) => ({
  ...input,
  ...add,
});

const GuideValidations = {
  getSpecificGuide(req, res, next) {
    const { id } = req.params;

    if (!id || !Number(id)) {
      return res.status(400).send({ status: 400, error: 'Please enter a valid Guide id' });
    }
    req.guideId = Number(id);
    return next();
  },

  createGuide(req, res, next) {
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

  async updateName(req, res, next) {
    // const obj = {
    //   name: 'ded',
    //   neededItems: 'ded',
    //   keywords: 'ded',
    //   steps: 'ded',
    // };
    const { ...guideData } = req.body;
    const userId = req.user.id;

    const { id } = req.params;
    const errors = [];

    // if (guideData) {
    // }

    if (!Number(id)) {
      errors.push({ error: 'Please enter a valid Guide Id' });
    }
    if (errors.length >= 1) {
      return res.status(400).send({
        status: 400,
        errors,
      });
    }

    const currentGuideData = await db.getSpecificGuide(Number(id));

    if (currentGuideData === undefined) {
      return res.status(404).send({ status: 404, error: 'Guide was not found' });
    }

    if (currentGuideData.userid !== userId) {
      return res.status(404).send({ status: 403, error: 'You are not the author of this Guide' });
    }

    // const newGuideData = getArticleData(currentGuideData, guideData);

    req.guideData = guideData;
    req.guideId = id;
    return next();
  },
};

export default GuideValidations;
