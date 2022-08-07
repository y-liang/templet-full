import fs from 'fs';
import { load } from 'cheerio';
import { WESTEAST_FILE_PATH, WEST_FIELDS, EAST_FIELDS, WORD_WEST, ABSOLUTE_UNLOAD_PATH } from '../utils/constant.js';


const modifier = ({ type, otherFilePath, fields }) => {
    const templateHtml = fs.readFileSync(otherFilePath).toString();
    let $tpl$ = load(templateHtml);
    let fieldNames = type == WORD_WEST ? WEST_FIELDS : EAST_FIELDS;

    // field - class name - pass in data
    fieldNames.forEach(name => {
        let type = name.substring(name.lastIndexOf('_') + 1);

        // variables not set yet
        switch (type) {
            case 'link':
                // link could be on image and button
                $tpl$(`.${name}`).each((i, el) => {
                    const $el = $tpl$(el);
                    $el.attr('href', fields[name]);
                });
                break;
            case 'image':
                $tpl$(`.${name}`).attr('src', fields[name]);
                break;
            case 'title':
                $tpl$(`.${name}`).append(`<span>${fields[name]}</span>`);
                break;
            case 'text':
                $tpl$(`.${name}`).append(`<span>${fields[name]}</span>`);
                break;
            default:
                break;
        }
    });

    fs.writeFileSync(ABSOLUTE_UNLOAD_PATH + WESTEAST_FILE_PATH, $tpl$.html());
};

export default modifier;