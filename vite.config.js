import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import tailwindcss from '@tailwindcss/vite';

// https://vite.dev/config/
export default defineConfig({
    plugins: [react(), tailwindcss()],

<<<<<<< HEAD
  publicDir: "public"
});
=======
    publicDir: 'static',
});
>>>>>>> b3b5912df0fc9e16da6610ca0add2bb5c0719291
