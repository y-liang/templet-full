import { useEffect, useState } from 'react';
import { BASE_URL } from '../utils/variable';

// cleanup
const Remover = () => {
    const [count, setCount] = useState();

    useEffect(() => {
        (async () => {
            try {
                let res = await fetch(`${BASE_URL}/cleanup`, {
                    method: 'GET'
                });
                let data = await res.json();
                setCount(data);
            } catch (err) {
                console.error('Error:', err);
            }
        })();
    }, []);


    const handleRemover = async () => {
        try {
            let res = await fetch(`${BASE_URL}/cleanup`, {
                method: 'POST'
            });
            let data = res.json();
            setCount(data);
        } catch (err) {
            console.error('Error:', err);
        }
    };

    return (
        <>
            <h1> clean up files </h1>
            <button onClick={handleRemover}>clean up</button>

            <h3> unload file count </h3>
            {count?.unload}
            <h3> upload file count </h3>
            {count?.upload}
        </>
    );
};

export default Remover;