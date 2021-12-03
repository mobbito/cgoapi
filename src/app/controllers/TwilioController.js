import twilio from 'twilio';
import ngrok from 'ngrok';

const { AccessToken } = twilio.jwt;
const { VideoGrant } = AccessToken;

class TwilioController {
  async index(req, res) {
    if (!req.params.username) {
      return res.status(400).send('Username parameter is required');
    }
    const accessToken = new AccessToken(
      process.env.ACCOUNT_SID,
      process.env.API_KEY_SID,
      process.env.API_KEY_SECRET,
      { identity: req.params.username }
    );
    // Grant access to Video
    const grant = new VideoGrant();
    accessToken.addGrant(grant);

    // Serialize the token as a JWT
    const jwt = accessToken.toJwt();
    console.log(jwt);
    return res.send(jwt);
  }
}

export default new TwilioController();
