import Axios, { AxiosError, AxiosRequestConfig } from 'axios';

export const AXIOS_INSTANCE = Axios.create({ baseURL: "http://localhost:8080" });

export const axiosInstance = <T>(
    config: AxiosRequestConfig,
    options?: AxiosRequestConfig,
    ): Promise<T> => {

    const source = Axios.CancelToken.source();
        const promise = AXIOS_INSTANCE({
            ...config,
        ...options,
        cancelToken: source.token,
    }).then(({data}) => data);

    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-expect-error
    promise.cancel = () => {
            source.cancel('Query was cancelled');
    };

        return promise;
};