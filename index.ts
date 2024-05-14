const express = require('express');
require('dotenv').config();
const app = express();
const userRouteV2 = require('./src/Api/Routes/UserRoutesV2')
const userRoute = require('./src/Api/Routes/UserRoutes')
const roleRoute = require('./src/Api/Routes/RoleRoutes')
const swaggerUi = require('swagger-ui-express')
const swaggerFile = require('./swagger_output.json')

const PORT = process.env.PORT;
app.use(express.json());    

app.use("/api/user/v2", userRouteV2);
app.use("/api", roleRoute);
app.use("/api", userRoute);

app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerFile))
app.use('/uploads', express.static('uploads'));
app.listen(PORT, '0.0.0.0', () => {
    console.log(`Server is runnit at port: ${PORT}`);
})

