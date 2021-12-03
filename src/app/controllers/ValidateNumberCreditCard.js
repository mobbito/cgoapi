import pagarme from 'pagarme';

class ValidateNumberCreditCardController {
  async index(req, res) {
    const check = pagarme.validate({
      card: { card_number: req.params.number },
    });
    res.json(check);
    // console.log(pagarme.validate({ cpf: '976.773.371-04' }));
  }
}

export default new ValidateNumberCreditCardController();
