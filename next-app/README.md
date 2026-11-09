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

- Com mouse/trackpad como apontador principal (`pointer: fine`) e suporte a hover: apresentação desktop. A largura, o zoom e o redimensionamento da janela não trocam o computador para a página mobile. Os efeitos e o layout internos continuam respeitando seus próprios breakpoints e as preferências de acessibilidade.
- Com interação principal por toque ou sem suporte a hover: versão mobile, com rolagem nativa e controles de toque. Tablets continuam nessa versão em paisagem, mesmo com viewport maior que 1024 px, quando o apontador principal é o toque.
- Notebooks com tela sensível ao toque continuam no desktop quando o apontador principal é mouse/trackpad. A seleção considera as capacidades de interação, sem depender do nome do aparelho; um tablet que se apresente ao navegador como mouse/trackpad também pode receber o desktop.
- A preferência por movimento reduzido é respeitada pelos efeitos da apresentação desktop e não troca a versão da página.
- A seleção acompanha mudanças do apontador principal e do suporte a hover, sem depender da largura ou orientação. O CSS da primeira renderização e a consulta em `src/lib/experience.ts` devem permanecer iguais para evitar um flash da versão errada antes da hidratação.

## Learn More

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js) - your feedback and contributions are welcome!

## Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out our [Next.js deployment documentation](https://nextjs.org/docs/app/building-your-application/deploying) for more details.
