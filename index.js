
import {User} from './models/user.js';
import {UserService} from './service/user_service.js';
import {UserController} from './controller/user_controller.js'


const userController = new UserController();


userController.on('succesState', (message) => {
  console.log(message);
})


userController.on('failureState', (errorMessage) => {
  console.error(errorMessage);
});





userController.fetchUserListData();

