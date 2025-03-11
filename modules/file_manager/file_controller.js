import fs from 'fs';
import {FileSystemError} from '../core/error/file_error.js';
import {Result} from '../core/result/result.js';
import {EventEmitter} from 'events';

class FileController {


  static async readFile(filePath) {
    try {
      const data = await fs.promises.readFile(filePath, 'utf8');
      return new Result({data: data, error: null, stackTrace: null});
    } catch (err) {
      const fileError = new FileSystemError(
        `Dosya okuma hatası: ${err.message}`,
        'Dosya Okuma Hatası',
        '404',
        filePath
      );

      return new Result({
        data: null,
        error: fileError,
        stackTrace: err.stack
      });
    }
  }

  static writeFile(filePath, content) {
    fs.writeFile(filePath, content, 'utf8', (err) => {
      if (err) {
        console.error('Bir hata oluştu:', err);
      } else {
        console.log('Dosya yazıldı.');
      }
    });
  }

  static async deleteFile(filePath) {
    fs.unlink(filePath, (err) => {
      if (err) {
        console.error('Bir hata oluştu:', err);
      } else {
        console.log('Dosya silindi.');
      }
    });
  }
}

export {FileController};
