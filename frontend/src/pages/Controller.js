import { useState } from 'react';
import { NORTH_FIELDS, NORTH_FILES, WEST_FIELDS, WEST_FILES, SOUTH_FIELDS, SOUTH_FILES, EAST_FIELDS, EAST_FILES, WORD_NORTH, WORD_SOUTH, WORD_WEST, WORD_EAST } from '../utils/constant';
import { BASE_URL } from '../utils/variable';

// combine
const Controller = ({ type }) => {
    let fileNames, fieldNames;

    switch (type) {
        case WORD_NORTH:
            fileNames = NORTH_FILES;
            fieldNames = NORTH_FIELDS;
            break;
        case WORD_SOUTH:
            fileNames = SOUTH_FILES;
            fieldNames = SOUTH_FIELDS;
            break;
        case WORD_WEST:
            fileNames = WEST_FILES;
            fieldNames = WEST_FIELDS;
            break;
        case WORD_EAST:
            fileNames = EAST_FILES;
            fieldNames = EAST_FIELDS;
            break;
        default:
            break;
    }

    // files to upload
    const [files, setFiles] = useState();
    const [fields, setFields] = useState();

    // url to download the resulted file
    const [url, setUrl] = useState();

    // visual, file names
    // const [names, setNames] = useState();

    const handleFileChange = (e) => {
        const file = e.target.files[0];
        // console.log('size', file.size);

        if (file.size > 1024 * 1000) {
            alert('File size cannot exceed more than 1MB');
        } else {
            setFiles({ ...files, [e.target.name]: file });
            // setNames({ ...names, [e.target.name]: file.name }); // not necessary
        }
    };

    // input typing
    const handleFieldChange = (e) => {
        setFields({ ...fields, [e.target.name]: e.target.value.trim() });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        const formData = new FormData();
        // const { template } = files;
        // formData.append('template', template);
        // console.log('formData', formData.values().next());

        // file data from form
        if (files) {
            fileNames.forEach(name => formData.append(name, files[name]));
        }

        // field data from form
        if (fields) {
            fieldNames.forEach(name => formData.append(name, fields[name]));
        }

        try {
            let res = await fetch(`${BASE_URL}/combine/${type}`, {
                method: 'POST',
                body: formData
            });

            if (res.status != 200) {
                throw new Error('Bad server response');
            }
            let data = await res.blob();

            const url = window.URL.createObjectURL(data);
            setUrl(url);
        } catch (err) {
            console.error('Error:', err);
        }

    };

    const handleDownload = () => {
        // clean up after download
        setTimeout(() => {
            window.URL.revokeObjectURL(url);
            setUrl(null);
        }, 9000);

    };

    return (<>
        <form onSubmit={handleSubmit} encType='multipart/form-data'>
            <h1>{type} template</h1>
            <ul>
                {fileNames.map((file, index) => (
                    <li key={index}>
                        <label>
                            Upload {file}:
                            <input type='file' name={file} onChange={handleFileChange} />
                        </label>
                    </li>
                ))}
            </ul>

            <h3>...</h3>
            <ul>
                {fieldNames.map((field, index) => (field !== '...' ?
                    <li key={index}>
                        <label htmlFor={field}> {field} </label>
                        <textarea name={field} onChange={handleFieldChange} />
                    </li>
                    : <h3 key={index}> ... </h3>))}
            </ul>
            <input type='submit' value='Submit' />
        </form>

        {url ? <a href={url} download onClick={handleDownload}>
            Download the file here
        </a> : null}
    </>);
};


export default Controller;