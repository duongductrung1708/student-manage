'use client';

import { AppButton } from "@app/components/app-button";
import { useRouter } from "next/navigation";

export default function Home() {
  const router = useRouter();
  const createNew = () => {
    router.push('/students/create');
  };
  const goToStudentsPage = () => {
    router.push('/students');
  };

  return (
    <main className="sticky top-0 z-50 min-h-screen bg-gradient-to-r from-black to-white text-white p-10">
      <div className="container mx-auto text-center">
        <h1 className="text-4xl font-bold mb-6 text-white">Welcome to User List</h1>
        <p className="text-lg mb-8 text-white">
          Show the list of users for ez manage.
        </p>
        <div className="flex justify-center space-x-4">
          <AppButton className="mr-2" color="white" onClick={goToStudentsPage}>
            Go to Students
          </AppButton>
          <AppButton color="black" onClick={createNew}>Register now</AppButton>
        </div>
      </div>
    </main>
  );
}
