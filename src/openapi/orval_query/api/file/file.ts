/**
 * Generated by orval v6.25.0 🍺
 * Do not edit manually.
 * COMMERCE
 * COMMERCE REST API DOC
 * OpenAPI spec version: 1.0.0
 */
import {
  useInfiniteQuery,
  useQuery
} from '@tanstack/react-query'
import type {
  InfiniteData,
  QueryFunction,
  QueryKey,
  UseInfiniteQueryOptions,
  UseInfiniteQueryResult,
  UseQueryOptions,
  UseQueryResult
} from '@tanstack/react-query'
import type {
  GetPreSignedUrlParams,
  PreSignedUrlDto
} from '../../model'
import { axiosInstance } from '../../../../utils/axiosInstance';

type AwaitedInput<T> = PromiseLike<T> | T;

      type Awaited<O> = O extends AwaitedInput<infer T> ? T : never;


type SecondParameter<T extends (...args: any) => any> = Parameters<T>[1];


export const getPreSignedUrl = (
    params: GetPreSignedUrlParams,
 options?: SecondParameter<typeof axiosInstance>,signal?: AbortSignal
) => {
      
      
      return axiosInstance<PreSignedUrlDto>(
      {url: `/api/file/upload/url`, method: 'GET',
        params, signal
    },
      options);
    }
  

export const getGetPreSignedUrlQueryKey = (params: GetPreSignedUrlParams,) => {
    return [`/api/file/upload/url`, ...(params ? [params]: [])] as const;
    }

    
export const getGetPreSignedUrlInfiniteQueryOptions = <TData = InfiniteData<Awaited<ReturnType<typeof getPreSignedUrl>>, GetPreSignedUrlParams['page']>, TError = unknown>(params: GetPreSignedUrlParams, options?: { query?:Partial<UseInfiniteQueryOptions<Awaited<ReturnType<typeof getPreSignedUrl>>, TError, TData, Awaited<ReturnType<typeof getPreSignedUrl>>, QueryKey, GetPreSignedUrlParams['page']>>, request?: SecondParameter<typeof axiosInstance>}
) => {

const {query: queryOptions, request: requestOptions} = options ?? {};

  const queryKey =  queryOptions?.queryKey ?? getGetPreSignedUrlQueryKey(params);

  

    const queryFn: QueryFunction<Awaited<ReturnType<typeof getPreSignedUrl>>, QueryKey, GetPreSignedUrlParams['page']> = ({ signal, pageParam }) => getPreSignedUrl({...params, page: pageParam || params?.['page']}, requestOptions, signal);

      

      

   return  { queryKey, queryFn,   staleTime: 10000,  ...queryOptions} as UseInfiniteQueryOptions<Awaited<ReturnType<typeof getPreSignedUrl>>, TError, TData, Awaited<ReturnType<typeof getPreSignedUrl>>, QueryKey, GetPreSignedUrlParams['page']> & { queryKey: QueryKey }
}

export type GetPreSignedUrlInfiniteQueryResult = NonNullable<Awaited<ReturnType<typeof getPreSignedUrl>>>
export type GetPreSignedUrlInfiniteQueryError = unknown

export const useGetPreSignedUrlInfinite = <TData = InfiniteData<Awaited<ReturnType<typeof getPreSignedUrl>>, GetPreSignedUrlParams['page']>, TError = unknown>(
 params: GetPreSignedUrlParams, options?: { query?:Partial<UseInfiniteQueryOptions<Awaited<ReturnType<typeof getPreSignedUrl>>, TError, TData, Awaited<ReturnType<typeof getPreSignedUrl>>, QueryKey, GetPreSignedUrlParams['page']>>, request?: SecondParameter<typeof axiosInstance>}

  ):  UseInfiniteQueryResult<TData, TError> & { queryKey: QueryKey } => {

  const queryOptions = getGetPreSignedUrlInfiniteQueryOptions(params,options)

  const query = useInfiniteQuery(queryOptions) as  UseInfiniteQueryResult<TData, TError> & { queryKey: QueryKey };

  query.queryKey = queryOptions.queryKey ;

  return query;
}



export const getGetPreSignedUrlQueryOptions = <TData = Awaited<ReturnType<typeof getPreSignedUrl>>, TError = unknown>(params: GetPreSignedUrlParams, options?: { query?:Partial<UseQueryOptions<Awaited<ReturnType<typeof getPreSignedUrl>>, TError, TData>>, request?: SecondParameter<typeof axiosInstance>}
) => {

const {query: queryOptions, request: requestOptions} = options ?? {};

  const queryKey =  queryOptions?.queryKey ?? getGetPreSignedUrlQueryKey(params);

  

    const queryFn: QueryFunction<Awaited<ReturnType<typeof getPreSignedUrl>>> = ({ signal }) => getPreSignedUrl(params, requestOptions, signal);

      

      

   return  { queryKey, queryFn,   staleTime: 10000,  ...queryOptions} as UseQueryOptions<Awaited<ReturnType<typeof getPreSignedUrl>>, TError, TData> & { queryKey: QueryKey }
}

export type GetPreSignedUrlQueryResult = NonNullable<Awaited<ReturnType<typeof getPreSignedUrl>>>
export type GetPreSignedUrlQueryError = unknown

export const useGetPreSignedUrl = <TData = Awaited<ReturnType<typeof getPreSignedUrl>>, TError = unknown>(
 params: GetPreSignedUrlParams, options?: { query?:Partial<UseQueryOptions<Awaited<ReturnType<typeof getPreSignedUrl>>, TError, TData>>, request?: SecondParameter<typeof axiosInstance>}

  ):  UseQueryResult<TData, TError> & { queryKey: QueryKey } => {

  const queryOptions = getGetPreSignedUrlQueryOptions(params,options)

  const query = useQuery(queryOptions) as  UseQueryResult<TData, TError> & { queryKey: QueryKey };

  query.queryKey = queryOptions.queryKey ;

  return query;
}



