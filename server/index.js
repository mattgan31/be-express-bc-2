import 'dotenv/config';
import express from 'express';
import cors from 'cors';
import compression from 'compression';
import cookieParser from 'cookie-parser';
import helmet from 'helmet';
import models, { sequelize } from './models/init-models.js';
import routes from './routes/indexRoute.js';

const port = process.env.PORT || 3300;

const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());
app.use(helmet());
app.use(compression());
app.use(cors());
app.use(async (req, res, next) => {
    req.context = { models }
    next();
})

app.use('/regions', routes.regionRoute);
app.use('/countries', routes.countryRoute);
app.use('/locations', routes.locationRoute);
app.use('/departments', routes.departmentRoute);
app.use('/jobs', routes.jobRoute);
app.use('/job-history', routes.jobHistoryRoute);
app.use('/employees', routes.employeesRoute);

const dropDatabaseSync = false;
sequelize.sync({ force: dropDatabaseSync }).then(async () => {
    if (dropDatabaseSync) {
        console.log("Database dont drop");
    }
    app.listen(port, () => {
        console.log(`Server is listening on port ${port}`);
    })
})

export default app;
