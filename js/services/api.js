const API_URL = 'https://api.openweathermap.org';

const apiRequest = async (url, method, data) => {
    let response;

    if (method == 'GET') {
        response = await fetch(`${API_URL}${url}`);
    } else {
        response = await fetch(`${API_URL}${url}`, {
            method,
            headers: {
                'COntent-Type': 'application/json',
            },
            body: data ? JSON.stringify(data) : undefined,
        });
    }

    if (response.status >= 400 && response.status < 600) {
        throw new Error(`Error status: ${response.status}. Error message: ${response.message}`)
    }

    const responseData = await response.json();

    return responseData;
};