import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default ({
  plugins: [react()],
  question: {
    input: 'http://localhost:8080/posts/api-docs',
    output: {
        mode: 'tags-split',
        target: 'src/openapi/question/api',
        schemas: 'src/openapi/question/model',
        client: 'react-query',
        mock: false,
        override: {
            mutator: {
                path: './src/axios.ts',
                name: 'axiosInstance',
            },
            query: {
                useQuery: true,
                useInfinite: true,
                useInfiniteQueryParam: 'page', // 다음 페이지 데이터를 가져오는 데 사용될 쿼리 파라미터
                options: {
                    staleTime: 10000, // 캐시 데이터의 신선도 유지 시간
                },
                signal: true, // 요청 취소 기능 활성화
            },
        },
    },
}
})


