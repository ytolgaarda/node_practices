import {User} from '../models/user.js';
import {ServerFailure} from '../../core/error/server_failure.js';
import {asyncTryCatch} from '../../core/result/result.js'
import {Result} from '../../core/result/result.js'



class UserService {
  _userEndPoint = 'https://jsonplaceholder.typicode.com/users';


  async fetchUserData() {
    const result = await asyncTryCatch(fetch(this._userEndPoint));

    // Success State
    if (result.data) {
      try {
        const userList = await result.data.json();

        if (!Array.isArray(userList)) {
          return new Result({
            error: new ServerFailure('Beklenmeyen veri formatı alındı', 'Veri Hatası', '500'),
          });
        }

        if (userList.length === 0) {
          return new Result({
            error: new ServerFailure('Veri tabanında kullanıcı bulunamadı', 'Server Error', '404'),
          });
        }
        userList.forEach(userData => {
          const newUser = User.fromMap(userData);
          console.log(newUser.getUserInfo());
        });

        return new Result({data: userList});
      } catch (error) {
        return new Result({
          error: new ServerFailure('Veri işleme hatası', 'JSON Parse Error', '500'),
        });
      }
    }

    // Error State
    if (result.error) {
      return new Result({
        error: result.error instanceof ServerFailure ? result.error : new ServerFailure(result.error.message),
      });
    }
  }
}

export {UserService};




/* 
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
  } */