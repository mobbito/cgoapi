import { Router } from 'express';
import Brute from 'express-brute';
import BruteRedis from 'express-brute-redis';
import multer from 'multer';
import multerConfig from './config/multer';

import CompanyController from './app/controllers/CompanyController';
import LocationController from './app/controllers/LocationController';
import HourController from './app/controllers/HourController';
import FileController from './app/controllers/FileController';
import UserController from './app/controllers/UserController';
import SessionController from './app/controllers/SessionController';
import ProviderController from './app/controllers/ProviderController';
import AppointmentController from './app/controllers/AppointmetController';
import ScheduleController from './app/controllers/ScheduleController';
import NotificationController from './app/controllers/NotificationController';
import AvailableController from './app/controllers/AvailableController';
import ServicesController from './app/controllers/ServicesController';
import LoadServiceController from './app/controllers/LoadServiceController';
import LoadCompanyController from './app/controllers/LoadCompanyController';
import CountCommentController from './app/controllers/CountCommentController';
import CardsController from './app/controllers/CardsController';

import ChannelController from './app/controllers/ChannelController';
import VideoController from './app/controllers/VideoController';
import VideoChannelController from './app/controllers/VideoChannelController';
import ViewVideoController from './app/controllers/ViewVideoController';
import LikesController from './app/controllers/LikesController';
import CommentsController from './app/controllers/CommentsController';
import SearchController from './app/controllers/SearchController';
import VideoCountController from './app/controllers/VideoCountController';
import ValidateNumberCreditCard from './app/controllers/ValidateNumberCreditCard';
import ContractPlanController from './app/controllers/ContractPlanController';
import CancelPlanController from './app/controllers/CancelPlanController';
import VideoDetachController from './app/controllers/VideoDetachController';
import VideoConsultController from './app/controllers/VideoConsultController';

// Clinic
import ClinicController from './app/controllers/ClinicController';
import NewsController from './app/controllers/NewsController';
import CovenantsController from './app/controllers/CovenantsController';
import SpecialtiesController from './app/controllers/SpecialtiesController';
import AdmUsersController from './app/controllers/AdmUsersController';
import AdmViewUsersController from './app/controllers/AdmViewUsersController';

import TwilioController from './app/controllers/TwilioController';

import authMiddleare from './app/middlewares/auth';

const routes = new Router();
const upload = multer(multerConfig);

const bruteStore = new BruteRedis({
  host: process.env.REDIS_HOST,
  port: process.env.REDIS_PORT,
});

const bruteForce = new Brute(bruteStore);

routes.get('/', (req, res) => res.send('Server Deubom - Teste'));

routes.get('/hours/:providerId', HourController.index);
routes.post('/hours', HourController.store);
routes.get('/locations', LocationController.index);
routes.get('/company', CompanyController.index);
routes.get('/loadcompany/:companyId', LoadCompanyController.index);
routes.post('/company', CompanyController.store);
routes.put('/company/:companyId', CompanyController.update);
routes.post('/users', UserController.store);

routes.post('/admusers', AdmUsersController.store);

routes.post('/sessions', SessionController.store);
// routes.post('/sessions', bruteForce.prevent, SessionController.store);
routes.get('/search/:text', SearchController.index);

routes.get('/gettoken/:username', TwilioController.index);

routes.use(authMiddleare);

routes.post('/channel', ChannelController.store);
routes.get('/channel', ChannelController.index);
routes.put('/channel/:channelId', ChannelController.update);
routes.delete('/channel/:channelId', ChannelController.delete);

routes.post('/video', VideoController.store);
routes.get('/video', VideoController.index);

routes.get('/videoconsult', VideoConsultController.index);

routes.get('/viewvideo/:video', ViewVideoController.index);

routes.get('/videochannel/:channelId', VideoChannelController.index);

routes.get('/likes/:video/:user', LikesController.index);
routes.post('/likes', LikesController.store);

routes.get('/comments/:video', CommentsController.index);
routes.post('/comments', CommentsController.store);

routes.get('/countcomment/:video', CountCommentController.index);

routes.put('/users', UserController.update);

routes.get('/services/:providerId', ServicesController.index);
routes.post('/services', ServicesController.store);
routes.put('/services/:serviceId', ServicesController.update);

routes.get('/loadservice/:serviceId', LoadServiceController.index);

routes.get('/providers', ProviderController.index);
routes.get('/providers/:providerId/available', AvailableController.index);

routes.get('/appointments', AppointmentController.index);
routes.post('/appointments', AppointmentController.store);
routes.delete('/appointments/:id', AppointmentController.delete);

routes.put('/countvideo/:video', VideoCountController.update);

routes.get('/validatecard/:number', ValidateNumberCreditCard.index);

routes.get('/cards', CardsController.index);
routes.post('/cards', CardsController.store);
routes.put('/cards', CardsController.update);

routes.post('/contract', ContractPlanController.store);
routes.post('/cancel', CancelPlanController.store);

routes.get('/schedule', ScheduleController.index);
routes.get('/detach', VideoDetachController.index);

routes.get('/notifications/:id', NotificationController.index);
routes.put('/notifications/:id', NotificationController.update);

// Clinic
routes.get('/clinic', ClinicController.index);
routes.post('/clinic', ClinicController.store);
routes.put('/clinic/:id', ClinicController.update);

routes.get('/covenants', CovenantsController.index);
routes.post('/covenants', CovenantsController.store);
routes.put('/covenants/:id', CovenantsController.update);
routes.delete('/covenants/:id', CovenantsController.delete);

routes.get('/specialties', SpecialtiesController.index);
routes.post('/specialties', SpecialtiesController.store);
routes.put('/specialties/:id', SpecialtiesController.update);
routes.delete('/specialties/:id', SpecialtiesController.delete);

routes.get('/admusers', AdmUsersController.index);
routes.get('/admviewusers/:idPaciente', AdmViewUsersController.index);

routes.get('/news', NewsController.index);
routes.post('/news', NewsController.store);
routes.put('/news/:id', NewsController.update);
routes.delete('/news/:id', NewsController.delete);

routes.post('/files', upload.single('file'), FileController.store);

export default routes;
