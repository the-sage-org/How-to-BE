import db from '../models/Guide';

const Guide = {
  async create(req, res) {
    const {
      name, keywords, neededItems, steps,
    } = req.body;
    const { id } = req.user;
    const guideData = {
      name,
      keywords,
      neededItems,
      steps,
      userId: id,
    };

    const nameCheck = await db.checkGuideName(name, id);

    if (nameCheck === 'duplicate') {
      return res
        .status(400)
        .send({ status: 400, error: `Sorry Guide name ${req.body.name} already exists.` });
    }

    const newGuide = await db.create(guideData);
    return res.status(201).send({
      status: 201,
      message: `Group ${newGuide.name} has been created.`,
      data: {
        id: newGuide.id,
        name: newGuide.name,
        keywords: newGuide.keywords,
        neededItems: newGuide.neededItems,
        steps: newGuide.steps,
        userId: newGuide.adminid,
      },
    });
  },

  async getGuides(req, res) {
    const data = await db.getAllGuides();
    return res.status(200).send({
      status: 200,
      data,
    });
  },

  async getSpecificGuide(req, res) {
    const { guideId } = req;
    const data = await db.getSpecificGuide(guideId);
    return res.status(200).send({
      status: 200,
      data,
    });
  },
};

export default Guide;
