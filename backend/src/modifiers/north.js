import fs from 'fs';
import { load } from 'cheerio';
import { ABSOLUTE_UNLOAD_PATH, NORTH_FILE_PATH } from '../utils/constant.js';

const modifier = ({ templateFilePath, informationFilePath, link, image, clock }) => {
    const templateHtml = fs.readFileSync(templateFilePath).toString(); // email html
    const informationJson = fs.readFileSync(informationFilePath); // json array

    const tableContent = makeTable(informationJson);

    // pass in fields
    let $tpl$ = load(templateHtml);

    // add values for cta link, header image, countdown clock
    $tpl$('.cta-link').attr('href', link);
    $tpl$('.header-image').attr('src', image);
    $tpl$('.countdown-clock').attr('src', clock);

    // add table content
    $tpl$('.table-content').append(tableContent);

    // output
    fs.writeFileSync(ABSOLUTE_UNLOAD_PATH + NORTH_FILE_PATH, $tpl$.html());
};


const priceFormat = new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',

    // These options are needed to round to whole numbers if that's what you want.
    minimumFractionDigits: 0,
    maximumFractionDigits: 0,
});

const makeTable = (jsonArray) => (
    '' + JSON.parse(jsonArray).map(unit => `
        <tr class="data-row" data-name="${unit[1]}"
        style="color: #808080; font-size: 14px; font-family: Avenir, Helvetica, Arial, sans-serif;">
        <td align="center" style="border-right: 1px solid #D3D3D3">&nbsp;&nbsp;&nbsp;&nbsp; <a href="
        ${unit[4]}
        " style="color: #2E8DDD;"><span style="color: #2E8DDD;display: block;"> ${unit[0]}
            </span> </a> &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
        </td>
        <td align="center" style="border-right: 1px solid #D3D3D3">&nbsp;&nbsp;&nbsp;&nbsp; <span>
            ${unit[1]}
        </span> &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
        </td>
        <td align="center" style="border-right: 1px solid #D3D3D3">&nbsp;&nbsp;&nbsp;&nbsp; <span>  ${unit[2]}
        </span> &nbsp;&nbsp;&nbsp;&nbsp;</td>
        <td align="center">&nbsp;&nbsp;&nbsp;&nbsp; <span> ${priceFormat.format(unit[3])} </span> &nbsp;&nbsp;&nbsp;&nbsp;</td>
        </tr >
            <tr>
                <td class="data-spacer" style="border-right: 1px solid #D3D3D3">&nbsp;&nbsp;&nbsp;&nbsp;</td>
                <td class="data-spacer" style="border-right: 1px solid #D3D3D3">&nbsp;&nbsp;&nbsp;&nbsp;</td>
                <td class="data-spacer" style="border-right: 1px solid #D3D3D3">&nbsp;&nbsp;&nbsp;&nbsp;</td>
            </tr>
        `).join('')
);

export default modifier;