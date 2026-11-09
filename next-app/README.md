This is a [Next.js](https://nextjs.org) project bootstrapped with [`create-next-app`](https://nextjs.org/docs/app/api-reference/cli/create-next-app).

## Getting Started

First, run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

You can start editing the page by modifying `app/page.tsx`. The page auto-updates as you edit the file.

This project uses [`next/font`](https://nextjs.org/docs/app/building-your-application/optimizing/fonts) to automatically optimize and load [Geist](https://vercel.com/font), a new font family for Vercel.

## Versões responsivas

- Viewport com largura a partir de 1024 px: apresentação web com efeitos de rolagem e cursor, independentemente de mouse, toque ou emulação de dispositivos. Uma viewport de 1839 × 1271 px recebe a versão web.
- Viewport com largura abaixo de 1024 px: versão mobile, com rolagem nativa e controles de toque, mesmo quando houver mouse conectado.
- A seleção depende exclusivamente da largura disponível em pixels CSS, sem identificar o tipo de aparelho. Tablets grandes também recebem a versão web quando atingirem 1024 px de largura.
- A preferência por movimento reduzido é respeitada pelos efeitos da apresentação desktop e não troca a versão da página.
- A seleção acompanha mudanças de largura, inclusive ao redimensionar a janela, girar o aparelho ou alterar o zoom. O CSS da primeira renderização e a consulta em `src/lib/experience.ts` devem permanecer iguais para evitar um flash da versão errada antes da hidratação.

## Learn More

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js) - your feedback and contributions are welcome!

## Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out our [Next.js deployment documentation](https://nextjs.org/docs/app/building-your-application/deploying) for more details.
