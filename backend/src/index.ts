import { Hono } from 'hono'
import { userRoute } from './routes/user.route'
import { dashBoardRoute } from './routes/dashboard.route';

const app = new Hono()

app.route('/api/v1/users' , userRoute) ;
app.route('/api/v1/dashboard' , dashBoardRoute) ;   


export default app
