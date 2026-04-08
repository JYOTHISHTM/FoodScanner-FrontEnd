import { defineConfig } from 'vite'
import tailwindcss from '@tailwindcss/vite'

export default defineConfig({
  plugins: [
    tailwindcss(),
  ]
})

// import { defineConfig } from 'vite'
// import react from '@vitejs/plugin-react'
// import basicSsl from '@vitejs/plugin-basic-ssl'

// export default defineConfig({
//   plugins: [react(), basicSsl()],
//   server: {
//     host: true,
//     proxy: {
//       "/api": {
//         target: "http://localhost:4000",
//         changeOrigin: true,
//         secure: false,
//       },
//     },
//   },
// })