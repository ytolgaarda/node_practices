import {User} from '../models/user.js';
import {ServerFailure} from '../error/custom_erorr.js';



class UserService {
  _userEndPoint = 'https://jsonplaceholder.typicode.com/users';
  async fetchUserData() {
    try {
      const response = await fetch(this._userEndPoint);
      if (!response.ok) {
        throw new ServerFailure('Error while fetching user lidst ', 'Fetching Error', 300,);
      }
      const userList = await response.json();

      if (userList.length == 0) {
        throw new ServerFailure('Veri tabanında kullanıcı bulunamadı', 'Server Error', '404');
      }
      userList.forEach(userData => {
        const newUser = User.fromMap(userData);
        console.log(newUser.getUserInfo());
      });

    } catch (error) {
      if (error instanceof ServerFailure) {
        console.error(`${error.title} (${error.code}): ${error.message}`);
      } else {
        console.error("Beklenmeyen Hata:", error.message);
      }
      console.log(error)
    }
  }
}

export {UserService};