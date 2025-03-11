
import {ServerFailure} from '../error/server_failure.js';

class Result {
  constructor({data, error, stackTrace}) {
    this.data = data;
    this.error = error; // ServerFailure class
  }
}


async function asyncTryCatch(promise) {
  try {
    const data = await promise;
    return new Result({data});
  } catch (error) {
    const serverError = error instanceof ServerFailure ? error : new ServerFailure(error);
    return new Result({error: serverError});

  }
}


export {Result, asyncTryCatch}