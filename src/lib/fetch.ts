const BASE_URL = process.env.UNSPLASH_API_BASE_URL as string

const baseHeaders: HeadersInit = {
    'Content-Type': 'application/json',
    Accept: 'application/json',
}

const mergeOptions = (options: RequestInit = {}): RequestInit => ({
    ...options,
    headers: {
        ...baseHeaders,
        ...options.headers,
    },
})

interface RequestParams {
    body?: unknown
    options?: RequestInit
}

interface ApiError {
    status: number;
    message: string;
    details?: unknown;
}

const createHttpRequestFunction = (method: 'GET' | 'POST' | 'PUT' | 'PATCH' | 'DELETE') =>
    async function <T, E extends ApiError = ApiError>(endpoint: string, params?: RequestParams): Promise<T> {
        const { body, options } = params ?? {}
        const url = `${BASE_URL}${endpoint}`
        let formattedBody = body as string | FormData | undefined

        if (body !== undefined) {
            formattedBody = JSON.stringify(body)
        }

        const mergedOptions = mergeOptions({
            ...options,
            method,
            ...(body !== undefined && { body: formattedBody }),
        })

        try {
            const response = await fetch(url, mergedOptions)

            if (!response.ok) {
                const errorBody = await response.json().catch(() => ({}));
                const error = {
                    status: response.status,
                    message: response.statusText,
                    details: errorBody
                } as E;

                throw error;
            }

            return await response.json() as T
        } catch (error) {
            throw error
        }
    }

const get = createHttpRequestFunction('GET')
const post = createHttpRequestFunction('POST')
const put = createHttpRequestFunction('PUT')
const patch = createHttpRequestFunction('PATCH')
const del = createHttpRequestFunction('DELETE')

export { get, post, put, patch, del }
