import { Router } from 'express';

import bodyParser from 'body-parser';
import multer from 'multer';

import { ABSOLUTE_UNLOAD_PATH, NORTH_FILE_PATH, SOUTH_FILE_PATH, WESTEAST_FILE_PATH, WORD_NORTH, WORD_SOUTH, WORD_WEST, WORD_EAST } from '../utils/constant.js';
import modNorth from '../modifiers/north.js';
import modSouth from '../modifiers/south.js';
import modWestEast from '../modifiers/westeast.js';

const router = Router();

// parse req body
router.use(bodyParser.json()); // for parsing application/json
router.use(bodyParser.urlencoded({ extended: true })); // for parsing application/x-www-form-urlencoded

// process file
const upload = multer({ dest: 'uploads/' });

router.get('/', (req, res) => {
    res.send('combine home page');
});

/**
 * { templateFilePath, informationFilePath, link, image, clock }
 * req.files and req.body
 * 
 */


// north, south, west, east
router.post('/:type', upload.any(), (req, res) => {
    // console.log('param', req.params);
    // console.log('files', req.files);
    // console.log('body', req.body);

    const { type } = req.params;
    const fields = req.body; // an object with all fields key and value

    // console.log(fields);
    switch (type) {
        case WORD_NORTH:
            const templateFilePath = req.files[0].path;
            const informationFilePath = req.files[1].path;
            const filePaths = { templateFilePath, informationFilePath };
            modNorth({ ...filePaths, ...fields });
            res.sendFile(ABSOLUTE_UNLOAD_PATH + NORTH_FILE_PATH);
            break;

        case WORD_SOUTH:
            const sourcePath = req.files[0].path;
            const targetPath = req.files[1].path;
            const footerPath = req.files[2].path;
            modSouth({ sourcePath, targetPath, footerPath });
            res.sendFile(ABSOLUTE_UNLOAD_PATH + SOUTH_FILE_PATH);
            break;

        case WORD_WEST:
        case WORD_EAST:
            const otherFilePath = req.files[0].path;
            modWestEast({ type, otherFilePath, fields });
            res.sendFile(ABSOLUTE_UNLOAD_PATH + WESTEAST_FILE_PATH);
            break;

        default:
            break;
    }
});

export default router;