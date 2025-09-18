import userRouter from './userRouter.js';
import signosRouter from './signosRouter.js';

const routerAPI = ( app) =>{
    app.use('/api/users', userRouter);
    app.use('/api/signos', signosRouter);
}

export default routerAPI;