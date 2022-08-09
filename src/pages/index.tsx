import React from 'react';
import Layout from '../components/layout';

export default function HomePage(): JSX.Element {
  return (
    <>
      <section>
        <header>
          <h1 className="mb-6 text-5xl font-extrabold">
            Welcome to <code>RetroPilot</code> on <code>Next.js</code>!
          </h1>
        </header>
      </section>
      <section>
        <header>
          <h2 className="mt-9 mb-3 text-4xl font-bold dark:text-gray-200">
            Hello, world
          </h2>
        </header>
      </section>
    </>
  );
}

HomePage.getLayout = (page: React.ReactNode) => (
  <Layout>{page}</Layout>
);
