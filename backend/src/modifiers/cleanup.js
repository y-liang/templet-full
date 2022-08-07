import fs from 'fs';
import path from 'path';
import { ABSOLUTE_UNLOAD_PATH, ABSOLUTE_UPLOAD_PATH } from '../utils/constant.js';

const dirUnload = ABSOLUTE_UNLOAD_PATH;
const dirUpload = ABSOLUTE_UPLOAD_PATH;

// get /cleanup
export const countFiles = () => {
    let count = {}; // file count

    count.unload = fs.readdirSync(dirUnload).length;
    count.upload = fs.readdirSync(dirUpload).length;

    return count;
};

// post cleanup
export const removeFiles = () => {
    fs.readdir(dirUnload, (err, files) => {
        if (err) throw err;

        for (const file of files) {
            fs.unlink(path.join(dirUnload, file), err => {
                if (err) throw err;
            });
        }
    });


    fs.readdir(dirUpload, (err, files) => {
        if (err) throw err;

        for (const file of files) {
            fs.unlink(path.join(dirUpload, file), err => {
                if (err) throw err;
            });
        }
    });
};


