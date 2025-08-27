import { logout } from '../services/apiAuth'; // تابعی که کش را پاک و به لاگین هدایت می‌کند

let isRefreshing = false;
let failedQueue = [];

const processQueue = (error, token = null) => {
    failedQueue.forEach(prom => {
        if (error) {
            prom.reject(error);
        } else {
            prom.resolve(token);
        }
    });
    failedQueue = [];
};

async function authFetch(url, options = {}) {
    options.credentials = 'include';
    
    let response = await fetch(url, options);

    if (response.status === 401 && !response.url.includes('login')) {
        if (!isRefreshing) {
            isRefreshing = true;

            try {
                const refreshResponse = await fetch(`${import.meta.env.VITE_API_URL}/api/auth/refresh`, {
                    method: 'POST',
                    credentials: 'include',
                });

                if (!refreshResponse.ok) {
                    processQueue(new Error('Session expired. Please log in again.'), null);
                    logout();
                    return Promise.reject(new Error('Session expired.'));
                }

                isRefreshing = false;
                processQueue(null, 'new-token-is-in-cookie');

                return fetch(url, options);

            } catch (error) {
                isRefreshing = false;
                processQueue(error, null);
                logout();
                return Promise.reject(error);
            }
        } else {
            return new Promise((resolve, reject) => {
                failedQueue.push({ resolve: () => resolve(fetch(url, options)), reject });
            });
        }
    }

    return response;
}

export default authFetch;