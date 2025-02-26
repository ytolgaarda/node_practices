import {EventEmitter} from 'events';
import {UserService} from '../service/user_service.js';
import {ServerFailure} from '../core/error/custom_erorr.js';

class UserController extends EventEmitter {
  constructor() {
    super();
    this.userService = new UserService();
  }


  async fetchUserListData() {
    const result = await this.userService.fetchUserData();

    if (!result) {
      this.emit('failureState', 'Beklenmeyen hata: Sonuç döndürülemedi');
      return;
    }

    if (result.data) {
      this.emit('succesState', 'User Listesi başarı ile getirildi');
    }

    if (result.error) {
      if (result.error instanceof ServerFailure) {
        this.emit('failureState', `${result.error.title} (${result.error.code}): ${result.error.message}`);
      } else {
        this.emit('failureState', 'Beklenmeyen hata: ' + result.error.message);
      }
    }
  }
}

export {UserController};