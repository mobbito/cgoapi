import Company from '../models/Company';

class LoadCompanyController {
  async index(req, res) {
    const company = await Company.findAll({
      where: { id: req.params.companyId },
    });

    return res.json(company);
  }
}

export default new LoadCompanyController();
