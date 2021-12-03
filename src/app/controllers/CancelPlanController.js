import * as Yup from 'yup';
import pagarme from 'pagarme';

import User from '../models/User';

class CancelPlanController {
  async store(req, res) {
    const schema = Yup.object().shape({
      subscription_id: Yup.string().required(),
    });

    if (!(await schema.isValid(req.body))) {
      return res.status(400).json({ error: 'Validation fails' });
    }
    const { subscription_id } = req.body;

    const check_user = await User.findByPk(req.userId);

    async function AlterarUsuario() {
      const user = await User.findByPk(req.userId);

      user.premium = false;
      user.subscription_id = null;
      user.cancelpremium = new Date();
      user.activitypremium = null;

      await user.save();
    }
    pagarme.client
      .connect({ api_key: 'ak_test_mZMdCsQ1dggXrIvncyfdAGhtRvmjj4' })
      .then(client =>
        client.subscriptions.cancel({ id: check_user.subscription_id })
      )
      .then(subscription => {
        console.log(subscription);
        if (subscription.status === 'canceled') {
          AlterarUsuario();
          return res.json('cancelado');
        }
      })
      .catch(e => console.log(e.response));
  }
}

export default new CancelPlanController();
