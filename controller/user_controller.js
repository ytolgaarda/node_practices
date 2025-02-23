import {EventEmitter} from 'events';
import {UserService} from '../service/user_service.js';

class UserController extends EventEmitter {
  constructor() {
    super();
    this.userService = new UserService();
  }


  async fetchUserListData() {
    try {
      await this.userService.fetchUserData();

      this.emit('succesState', 'Users başarı ile getirildi');

    } catch (error) {
      if (error instanceof ServerFailure) {
        this.emit('failureState', error.message);
      } else {
        this.emit('failureState', 'Beklenmeyen hata: ' + error.message);
      }
    }
  }
}

export {UserController};