class FileSystemError extends Error {
  constructor(message, title = 'File System Error', code = '500', filePath = '') {
    super(message);
    this.name = 'FileSystemFailure';
    this.title = title;
    this.code = code;
    this.filePath = filePath;

  }
}
export {FileSystemError};