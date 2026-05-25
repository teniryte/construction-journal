'use client';

import { useEffect, useState } from 'react';

type TestUserResponse = {
  name: string;
};

export default function Home() {
  const [name, setName] = useState<string | null>(null);

  useEffect(() => {
    const apiUrl = process.env.NEXT_PUBLIC_API_URL;

    async function loadUser() {
      const response = await fetch(`${apiUrl}/test`);

      const data: TestUserResponse = await response.json();

      setName(data.name);
    }

    void loadUser();
  }, []);

  return (
    <div className="flex flex-1 items-center justify-center bg-zinc-50 font-sans dark:bg-black">
      <main className="rounded-2xl bg-white px-10 py-8 shadow-sm dark:bg-zinc-900">
        {name && (
          <h1 className="text-3xl font-semibold text-black dark:text-zinc-50">
            Hello, {name}!
          </h1>
        )}
      </main>
    </div>
  );
}
