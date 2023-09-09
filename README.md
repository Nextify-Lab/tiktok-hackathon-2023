# ThriftTogether: Groupbuy with friends on TikTok Shop

![Screenshot 1](public/showcaseImages/Screenshot%202023-09-09%20145236.png)
![Screenshot 2](public/showcaseImages/Screenshot%202023-09-09%20145317.png)
![Screenshot 3](public/showcaseImages/Screenshot%202023-09-09%20145335.png)
![Screenshot 4](public/showcaseImages/Screenshot%202023-09-09%20145341.png)

## Microservice Architecture

![Microservice Architecture](public\showcaseImages\Tiktokhackathon.jpg)

## Sequence Diagram

![Sequence Diagram](public\showcaseImages\sequence)

## Entity Relationship Diagram

![Entity Relationship Diagram](public\showcaseImages\entity.png)

## Inspiration

Ever found yourself drooling over a late-night food TikTok, wishing you could instantly share a meal with friends beside you? The craving is real, but the process? Cumbersome. Between coordinating orders, calculating shared costs, and navigating multiple payment methods, the journey from seeing that mouth-watering dish to actually enjoying it with friends is often longer and more complicated than it should be.

## What it does

ThriftTogether is here to change that. It streamlines the entire process, making it easy to initiate group buys directly from TikTok. See a dish you like? Share it with friends using a QR code or a direct link. The platform automatically clusters users based on location, ensuring everyone gets their food hot and fresh. No more manual calculations or separate payments; ThriftTogether handles it all.

## How we built it

Our tech stack includes NextJS for the frontend and Firebase for the backend, ensuring a responsive and scalable application. We've also designed RESTful APIs, allowing ThriftTogether to be easily integrated as a microservice into other platforms or e-commerce systems.

## Challenges we ran into

One significant challenge was determining the exact moment a user becomes part of a group buy. Should it be when they click the link or after they've completed the payment? After much deliberation, we chose the latter. This ensures that only genuinely interested parties are counted, leading to a smoother user experience and more successful group buys.

## Accomplishments that we're proud of

We're incredibly proud of bringing ThriftTogether to life in just two days. This platform not only simplifies group buying but also enhances the social shopping experience on TikTok, making it more interactive and user-friendly.

## What we learned

This journey taught us the intricacies of implementing RESTful APIs, the nuances of web development, and the importance of user experience in e-commerce solutions. Every challenge was a learning opportunity, and we've come out richer in knowledge and experience.

## What's next for ThriftTogether: Groupbuy with friends on TikTok Shop

Given the potential of ThriftTogether, we're considering launching it as a standalone app. The future looks promising, and we're excited to see where ThriftTogether goes next!

This is a [Next.js](https://nextjs.org/) project bootstrapped with [`create-next-app`](https://github.com/vercel/next.js/tree/canary/packages/create-next-app).

## Getting Started

First, run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

You can start editing the page by modifying `pages/index.tsx`. The page auto-updates as you edit the file.

[API routes](https://nextjs.org/docs/api-routes/introduction) can be accessed on [http://localhost:3000/api/hello](http://localhost:3000/api/hello). This endpoint can be edited in `pages/api/hello.ts`.

The `pages/api` directory is mapped to `/api/*`. Files in this directory are treated as [API routes](https://nextjs.org/docs/api-routes/introduction) instead of React pages.

This project uses [`next/font`](https://nextjs.org/docs/basic-features/font-optimization) to automatically optimize and load Inter, a custom Google Font.

## Learn More

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js/) - your feedback and contributions are welcome!

## Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out our [Next.js deployment documentation](https://nextjs.org/docs/deployment) for more details.
