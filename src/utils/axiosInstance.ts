import Axios, { AxiosError, AxiosRequestConfig } from 'axios';

export const AXIOS_INSTANCE = Axios.create({
    baseURL: "https://app.genj.me",
    withCredentials: true // 여기에 withCredentials 옵션을 추가하여 모든 요청에 적용
  });

export const axiosInstance = <T>(
    config: AxiosRequestConfig,
    options?: AxiosRequestConfig,
    ): Promise<T> => {

    const source = Axios.CancelToken.source();
        const promise = AXIOS_INSTANCE({
            ...config,
        ...options,
        cancelToken: source.token,
        withCredentials: true, // 개별 요청에도 withCredentials를 명시적으로 적용
    }).then(({data}) => data);

    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-expect-error
    promise.cancel = () => {
            source.cancel('Query was cancelled');
    };

        return promise;
};