/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}", // 리액트 컴포넌트 파일 포함
  ],
  theme: {
    extend: {},
  },
  plugins: [require('daisyui')],
}