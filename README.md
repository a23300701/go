Backend
```
cd back
npm install
npm run start
```

http://localhost:3000/graphql".
La base de Neon está en `back/src/app.module.ts` 
- Correo: `admin@gomifyles.com`
- Contraseña: `Admin1234`

Front
```
cd front
npm install
copy .env.example .env
npm run dev
```
Abre http://localhost:4321

Configurar "Entrar con GitHub" (clientes)

1. En GitHub entra a **Settings → Developer settings → OAuth Apps → New OAuth App**.
2. Llena:
   - Application name: `Gomifyles`
   - Homepage URL: `http://localhost:4321`
   - Authorization callback URL: `http://localhost:4321/api/auth/github/callback`
3. Da clic en **Register application** y copia el **Client ID**. Ov23li9Pbn1IpkUYKb5m
4. Da clic en **Generate a new client secret** y copia el secreto (solo se ve una vez). 4bb4407777dd8835e08eda4105a9bfa2894211b9
5. Pégalos en `front/.env`:
   ```
   GITHUB_CLIENT_ID=tu-client-id
   GITHUB_CLIENT_SECRET=tu-client-secret
   ```
6. Reinicia `npm run dev`.

La `CLAVE_INTERNA` de `front/.env` debe ser igual a la constante `CLAVE_INTERNA` de `back/src/usuario/usuario.service.ts`.
Con ella el backend sabe que quien le pide crear una cuenta de GitHub es tu front.
