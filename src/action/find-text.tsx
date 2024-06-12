// 'use server';

import axios from 'axios';

export const findText = async (text: string) => {
    // const res = await axios.get('http://localhost:3000/find-bm/?text=' + text);
    // console.log(res)
    const res = await axios.get('/api/find-bm/?text=' + text);
    return res.data;
}
