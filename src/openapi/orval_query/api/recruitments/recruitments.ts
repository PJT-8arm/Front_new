/**
 * Generated by orval v6.25.0 🍺
 * Do not edit manually.
 * COMMERCE
 * COMMERCE REST API DOC
 * OpenAPI spec version: 1.0.0
 */
import {
  useInfiniteQuery,
  useMutation,
  useQuery
} from '@tanstack/react-query'
import type {
  InfiniteData,
  MutationFunction,
  QueryFunction,
  QueryKey,
  UseInfiniteQueryOptions,
  UseInfiniteQueryResult,
  UseMutationOptions,
  UseQueryOptions,
  UseQueryResult
} from '@tanstack/react-query'
import type {
  RecruitmentCreateRequestDto,
  RecruitmentCreateResponseDto,
  RecruitmentListDetailResponseDto,
  RecruitmentListResponseDto,
  RecruitmentUpdateResponseDto
} from '../../model'
import { axiosInstance } from '../../../../utils/axiosInstance';

type AwaitedInput<T> = PromiseLike<T> | T;

      type Awaited<O> = O extends AwaitedInput<infer T> ? T : never;


type SecondParameter<T extends (...args: any) => any> = Parameters<T>[1];


export const recruitmentUpdate = (
    id: number,
    recruitmentCreateRequestDto: RecruitmentCreateRequestDto,
 options?: SecondParameter<typeof axiosInstance>,) => {
      
      
      return axiosInstance<RecruitmentUpdateResponseDto>(
      {url: `/api/recruitments/update/${id}`, method: 'PUT',
      headers: {'Content-Type': 'application/json', },
      data: recruitmentCreateRequestDto
    },
      options);
    }
  


export const getRecruitmentUpdateMutationOptions = <TError = unknown,
    TContext = unknown>(options?: { mutation?:UseMutationOptions<Awaited<ReturnType<typeof recruitmentUpdate>>, TError,{id: number;data: RecruitmentCreateRequestDto}, TContext>, request?: SecondParameter<typeof axiosInstance>}
): UseMutationOptions<Awaited<ReturnType<typeof recruitmentUpdate>>, TError,{id: number;data: RecruitmentCreateRequestDto}, TContext> => {
 const {mutation: mutationOptions, request: requestOptions} = options ?? {};

      


      const mutationFn: MutationFunction<Awaited<ReturnType<typeof recruitmentUpdate>>, {id: number;data: RecruitmentCreateRequestDto}> = (props) => {
          const {id,data} = props ?? {};

          return  recruitmentUpdate(id,data,requestOptions)
        }

        


   return  { mutationFn, ...mutationOptions }}

    export type RecruitmentUpdateMutationResult = NonNullable<Awaited<ReturnType<typeof recruitmentUpdate>>>
    export type RecruitmentUpdateMutationBody = RecruitmentCreateRequestDto
    export type RecruitmentUpdateMutationError = unknown

    export const useRecruitmentUpdate = <TError = unknown,
    TContext = unknown>(options?: { mutation?:UseMutationOptions<Awaited<ReturnType<typeof recruitmentUpdate>>, TError,{id: number;data: RecruitmentCreateRequestDto}, TContext>, request?: SecondParameter<typeof axiosInstance>}
) => {

      const mutationOptions = getRecruitmentUpdateMutationOptions(options);

      return useMutation(mutationOptions);
    }
    /**
 * @summary 모집 글 작성
 */
export const recruitmentAdd = (
    recruitmentCreateRequestDto: RecruitmentCreateRequestDto,
 options?: SecondParameter<typeof axiosInstance>,) => {
      
      
      return axiosInstance<RecruitmentCreateResponseDto>(
      {url: `/api/recruitments/write`, method: 'POST',
      headers: {'Content-Type': 'application/json', },
      data: recruitmentCreateRequestDto
    },
      options);
    }
  


export const getRecruitmentAddMutationOptions = <TError = unknown,
    TContext = unknown>(options?: { mutation?:UseMutationOptions<Awaited<ReturnType<typeof recruitmentAdd>>, TError,{data: RecruitmentCreateRequestDto}, TContext>, request?: SecondParameter<typeof axiosInstance>}
): UseMutationOptions<Awaited<ReturnType<typeof recruitmentAdd>>, TError,{data: RecruitmentCreateRequestDto}, TContext> => {
 const {mutation: mutationOptions, request: requestOptions} = options ?? {};

      


      const mutationFn: MutationFunction<Awaited<ReturnType<typeof recruitmentAdd>>, {data: RecruitmentCreateRequestDto}> = (props) => {
          const {data} = props ?? {};

          return  recruitmentAdd(data,requestOptions)
        }

        


   return  { mutationFn, ...mutationOptions }}

    export type RecruitmentAddMutationResult = NonNullable<Awaited<ReturnType<typeof recruitmentAdd>>>
    export type RecruitmentAddMutationBody = RecruitmentCreateRequestDto
    export type RecruitmentAddMutationError = unknown

    /**
 * @summary 모집 글 작성
 */
export const useRecruitmentAdd = <TError = unknown,
    TContext = unknown>(options?: { mutation?:UseMutationOptions<Awaited<ReturnType<typeof recruitmentAdd>>, TError,{data: RecruitmentCreateRequestDto}, TContext>, request?: SecondParameter<typeof axiosInstance>}
) => {

      const mutationOptions = getRecruitmentAddMutationOptions(options);

      return useMutation(mutationOptions);
    }
    /**
 * @summary 모집 글 목록
 */
export const recruitmentList = (
    
 options?: SecondParameter<typeof axiosInstance>,signal?: AbortSignal
) => {
      
      
      return axiosInstance<RecruitmentListResponseDto[]>(
      {url: `/api/recruitments/list`, method: 'GET', signal
    },
      options);
    }
  

export const getRecruitmentListQueryKey = () => {
    return [`/api/recruitments/list`] as const;
    }

    
export const getRecruitmentListInfiniteQueryOptions = <TData = InfiniteData<Awaited<ReturnType<typeof recruitmentList>>>, TError = unknown>( options?: { query?:Partial<UseInfiniteQueryOptions<Awaited<ReturnType<typeof recruitmentList>>, TError, TData>>, request?: SecondParameter<typeof axiosInstance>}
) => {

const {query: queryOptions, request: requestOptions} = options ?? {};

  const queryKey =  queryOptions?.queryKey ?? getRecruitmentListQueryKey();

  

    const queryFn: QueryFunction<Awaited<ReturnType<typeof recruitmentList>>> = ({ signal }) => recruitmentList(requestOptions, signal);

      

      

   return  { queryKey, queryFn,   staleTime: 10000,  ...queryOptions} as UseInfiniteQueryOptions<Awaited<ReturnType<typeof recruitmentList>>, TError, TData> & { queryKey: QueryKey }
}

export type RecruitmentListInfiniteQueryResult = NonNullable<Awaited<ReturnType<typeof recruitmentList>>>
export type RecruitmentListInfiniteQueryError = unknown

/**
 * @summary 모집 글 목록
 */
export const useRecruitmentListInfinite = <TData = InfiniteData<Awaited<ReturnType<typeof recruitmentList>>>, TError = unknown>(
  options?: { query?:Partial<UseInfiniteQueryOptions<Awaited<ReturnType<typeof recruitmentList>>, TError, TData>>, request?: SecondParameter<typeof axiosInstance>}

  ):  UseInfiniteQueryResult<TData, TError> & { queryKey: QueryKey } => {

  const queryOptions = getRecruitmentListInfiniteQueryOptions(options)

  const query = useInfiniteQuery(queryOptions) as  UseInfiniteQueryResult<TData, TError> & { queryKey: QueryKey };

  query.queryKey = queryOptions.queryKey ;

  return query;
}



export const getRecruitmentListQueryOptions = <TData = Awaited<ReturnType<typeof recruitmentList>>, TError = unknown>( options?: { query?:Partial<UseQueryOptions<Awaited<ReturnType<typeof recruitmentList>>, TError, TData>>, request?: SecondParameter<typeof axiosInstance>}
) => {

const {query: queryOptions, request: requestOptions} = options ?? {};

  const queryKey =  queryOptions?.queryKey ?? getRecruitmentListQueryKey();

  

    const queryFn: QueryFunction<Awaited<ReturnType<typeof recruitmentList>>> = ({ signal }) => recruitmentList(requestOptions, signal);

      

      

   return  { queryKey, queryFn,   staleTime: 10000,  ...queryOptions} as UseQueryOptions<Awaited<ReturnType<typeof recruitmentList>>, TError, TData> & { queryKey: QueryKey }
}

export type RecruitmentListQueryResult = NonNullable<Awaited<ReturnType<typeof recruitmentList>>>
export type RecruitmentListQueryError = unknown

/**
 * @summary 모집 글 목록
 */
export const useRecruitmentList = <TData = Awaited<ReturnType<typeof recruitmentList>>, TError = unknown>(
  options?: { query?:Partial<UseQueryOptions<Awaited<ReturnType<typeof recruitmentList>>, TError, TData>>, request?: SecondParameter<typeof axiosInstance>}

  ):  UseQueryResult<TData, TError> & { queryKey: QueryKey } => {

  const queryOptions = getRecruitmentListQueryOptions(options)

  const query = useQuery(queryOptions) as  UseQueryResult<TData, TError> & { queryKey: QueryKey };

  query.queryKey = queryOptions.queryKey ;

  return query;
}



/**
 * @summary 모집 글 상세
 */
export const recruitmentDetails = (
    id: number,
 options?: SecondParameter<typeof axiosInstance>,signal?: AbortSignal
) => {
      
      
      return axiosInstance<RecruitmentListDetailResponseDto>(
      {url: `/api/recruitments/list/${id}`, method: 'GET', signal
    },
      options);
    }
  

export const getRecruitmentDetailsQueryKey = (id: number,) => {
    return [`/api/recruitments/list/${id}`] as const;
    }

    
export const getRecruitmentDetailsInfiniteQueryOptions = <TData = InfiniteData<Awaited<ReturnType<typeof recruitmentDetails>>>, TError = unknown>(id: number, options?: { query?:Partial<UseInfiniteQueryOptions<Awaited<ReturnType<typeof recruitmentDetails>>, TError, TData>>, request?: SecondParameter<typeof axiosInstance>}
) => {

const {query: queryOptions, request: requestOptions} = options ?? {};

  const queryKey =  queryOptions?.queryKey ?? getRecruitmentDetailsQueryKey(id);

  

    const queryFn: QueryFunction<Awaited<ReturnType<typeof recruitmentDetails>>> = ({ signal }) => recruitmentDetails(id, requestOptions, signal);

      

      

   return  { queryKey, queryFn, enabled: !!(id),  staleTime: 10000,  ...queryOptions} as UseInfiniteQueryOptions<Awaited<ReturnType<typeof recruitmentDetails>>, TError, TData> & { queryKey: QueryKey }
}

export type RecruitmentDetailsInfiniteQueryResult = NonNullable<Awaited<ReturnType<typeof recruitmentDetails>>>
export type RecruitmentDetailsInfiniteQueryError = unknown

/**
 * @summary 모집 글 상세
 */
export const useRecruitmentDetailsInfinite = <TData = InfiniteData<Awaited<ReturnType<typeof recruitmentDetails>>>, TError = unknown>(
 id: number, options?: { query?:Partial<UseInfiniteQueryOptions<Awaited<ReturnType<typeof recruitmentDetails>>, TError, TData>>, request?: SecondParameter<typeof axiosInstance>}

  ):  UseInfiniteQueryResult<TData, TError> & { queryKey: QueryKey } => {

  const queryOptions = getRecruitmentDetailsInfiniteQueryOptions(id,options)

  const query = useInfiniteQuery(queryOptions) as  UseInfiniteQueryResult<TData, TError> & { queryKey: QueryKey };

  query.queryKey = queryOptions.queryKey ;

  return query;
}



export const getRecruitmentDetailsQueryOptions = <TData = Awaited<ReturnType<typeof recruitmentDetails>>, TError = unknown>(id: number, options?: { query?:Partial<UseQueryOptions<Awaited<ReturnType<typeof recruitmentDetails>>, TError, TData>>, request?: SecondParameter<typeof axiosInstance>}
) => {

const {query: queryOptions, request: requestOptions} = options ?? {};

  const queryKey =  queryOptions?.queryKey ?? getRecruitmentDetailsQueryKey(id);

  

    const queryFn: QueryFunction<Awaited<ReturnType<typeof recruitmentDetails>>> = ({ signal }) => recruitmentDetails(id, requestOptions, signal);

      

      

   return  { queryKey, queryFn, enabled: !!(id),  staleTime: 10000,  ...queryOptions} as UseQueryOptions<Awaited<ReturnType<typeof recruitmentDetails>>, TError, TData> & { queryKey: QueryKey }
}

export type RecruitmentDetailsQueryResult = NonNullable<Awaited<ReturnType<typeof recruitmentDetails>>>
export type RecruitmentDetailsQueryError = unknown

/**
 * @summary 모집 글 상세
 */
export const useRecruitmentDetails = <TData = Awaited<ReturnType<typeof recruitmentDetails>>, TError = unknown>(
 id: number, options?: { query?:Partial<UseQueryOptions<Awaited<ReturnType<typeof recruitmentDetails>>, TError, TData>>, request?: SecondParameter<typeof axiosInstance>}

  ):  UseQueryResult<TData, TError> & { queryKey: QueryKey } => {

  const queryOptions = getRecruitmentDetailsQueryOptions(id,options)

  const query = useQuery(queryOptions) as  UseQueryResult<TData, TError> & { queryKey: QueryKey };

  query.queryKey = queryOptions.queryKey ;

  return query;
}



export const recruitmentDelete = (
    id: number,
 options?: SecondParameter<typeof axiosInstance>,) => {
      
      
      return axiosInstance<string>(
      {url: `/api/recruitments/delete/${id}`, method: 'DELETE'
    },
      options);
    }
  


export const getRecruitmentDeleteMutationOptions = <TError = unknown,
    TContext = unknown>(options?: { mutation?:UseMutationOptions<Awaited<ReturnType<typeof recruitmentDelete>>, TError,{id: number}, TContext>, request?: SecondParameter<typeof axiosInstance>}
): UseMutationOptions<Awaited<ReturnType<typeof recruitmentDelete>>, TError,{id: number}, TContext> => {
 const {mutation: mutationOptions, request: requestOptions} = options ?? {};

      


      const mutationFn: MutationFunction<Awaited<ReturnType<typeof recruitmentDelete>>, {id: number}> = (props) => {
          const {id} = props ?? {};

          return  recruitmentDelete(id,requestOptions)
        }

        


   return  { mutationFn, ...mutationOptions }}

    export type RecruitmentDeleteMutationResult = NonNullable<Awaited<ReturnType<typeof recruitmentDelete>>>
    
    export type RecruitmentDeleteMutationError = unknown

    export const useRecruitmentDelete = <TError = unknown,
    TContext = unknown>(options?: { mutation?:UseMutationOptions<Awaited<ReturnType<typeof recruitmentDelete>>, TError,{id: number}, TContext>, request?: SecondParameter<typeof axiosInstance>}
) => {

      const mutationOptions = getRecruitmentDeleteMutationOptions(options);

      return useMutation(mutationOptions);
    }
    