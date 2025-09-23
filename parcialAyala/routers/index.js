import userRouter from './userRouter.js';
import signosRouter from './signosRouter.js';
import horoscopoRouter from './horoscoposRouter.js';

const routerAPI = ( app) =>{
    app.use('/api/users', userRouter);
    app.use('/api/signos', signosRouter);
    app.use('/api/horoscopos', horoscopoRouter);
}

export default routerAPI;