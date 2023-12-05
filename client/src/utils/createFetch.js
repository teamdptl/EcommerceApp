// Thay chữ fetch thành createFetch là ok
const createFetch = (url, init = {}) => {
    const accessToken = localStorage.getItem('accessToken');
    if (accessToken)
        return fetch(url, {
            ...init,
            headers: {
                ...init.headers,
                'Authorization': 'Bearer ' + accessToken
            }
        })
    return fetch(url, init);
}

export default createFetch;