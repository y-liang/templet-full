import fs from 'fs';
import { load } from 'cheerio';
import { ABSOLUTE_UNLOAD_PATH, SOUTH_FILE_PATH } from '../utils/constant.js';

const modifier = ({ sourcePath, targetPath, footerPath }) => {
    const source = fs.readFileSync(sourcePath).toString(); // html
    const target = fs.readFileSync(targetPath).toString(); // html
    const footer = fs.readFileSync(footerPath).toString(); // html

    // source - get a tags' href
    let $src$ = load(source);

    // href array
    let href = [];
    $src$('.action-button').children('a').toArray().forEach(el => href.push(el.attribs.href));

    let count = 0;

    // target - wrap button with a tag above
    let $tgt$ = load(target);
    $tgt$('img').filter((i, el) => {
        // this === el
        return el.attribs.src === 'https://t.contentsvr.com/1980181091214740259550/viewListing.gif';
    }).each((i, el) => {
        let link = `<a href=${href[count++]}></a>`;
        const $el = $tgt$(el);
        $el.wrap(link);
    });

    $tgt$('.cbR-logopadding').children('div').replaceWith(footer);

    fs.writeFileSync(ABSOLUTE_UNLOAD_PATH + SOUTH_FILE_PATH, $tgt$.html());
};


export default modifier;