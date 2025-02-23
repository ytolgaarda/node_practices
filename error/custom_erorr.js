class ServerFailure extends Error {
  constructor(message, title = 'Server Error ', code = '500') {
    super(message);
    this.name = 'Server Failure'
    this.title = title;
    this.code = code;
  }
}


export {ServerFailure}