enum METHOD {
    GET = 'GET',
    POST = 'POST',
    PUT = 'PUT',
    //PATCH = 'PATCH',
    DELETE = 'DELETE'
};

type Options = {
    method: METHOD;
    data?: any;
    headers?: Record<string, string>;
};

type OptionsWithoutMethod = Omit<Options, 'method'>;

class HTTPTransport {
    get(url: string, options: OptionsWithoutMethod = {}): Promise<XMLHttpRequest> {
        return this.request(url, { ...options, method: METHOD.GET });
    }

    post(url: string, options: OptionsWithoutMethod = {}): Promise<XMLHttpRequest> {
        return this.request(url, { ...options, method: METHOD.POST });
    }

    put(url: string, options: OptionsWithoutMethod = {}): Promise<XMLHttpRequest> {
        return this.request(url, { ...options, method: METHOD.PUT });
    }

    delete(url: string, options: OptionsWithoutMethod = {}): Promise<XMLHttpRequest> {
        return this.request(url, { ...options, method: METHOD.DELETE });
    }

    request(url: string, options: Options = { method: METHOD.GET }): Promise<XMLHttpRequest> {
        const { method, data, headers = { 'Content-Type': 'application/json' } } = options;

        return new Promise((resolve, reject) => {
            const xhr = new XMLHttpRequest();
            xhr.open(method, this.constructURL(url, method === METHOD.GET ? data : undefined));

            Object.keys(headers).forEach(key => {
                xhr.setRequestHeader(key, headers[key]);
            });

            xhr.onload = function() {
                resolve(xhr);
            };

            const handleError = (err: Event) => {
                reject(new Error(`Request failed: ${err.type}`));
            };

            xhr.onabort = handleError;
            xhr.onerror = handleError;
            xhr.ontimeout = handleError;

            if (method === METHOD.GET || !data) {
                xhr.send();
            } else {
                xhr.send(JSON.stringify(data));
            }
        });
    }

    private constructURL(url: string, params?: Record<string, any>): string {
        if (!params) return url;

        const queryParams = new URLSearchParams(params).toString();
        return `${url}?${queryParams}`;
    }
}

export default HTTPTransport;
