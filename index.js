
import {FileController} from './modules/file_manager/file_controller.js';


const filePath = 'test_file.txt';




function deleteFile() {
  FileController.deleteFile(filePath);

} deleteFile();