import Link from "next/link";

export default function Home() {
  return (
    <main className="min-h-screen flex flex-col items-center justify-center bg-gray-100 p-6">
      <div className="bg-white shadow-lg rounded-2xl p-8 max-w-xl w-full text-center">
        <h1 className="text-3xl font-bold text-blue-600 mb-4">
          Canal de Ética
        </h1>

        <p className="text-gray-700 mb-6">
          Este é um espaço seguro para relatar situações de forma anônima e confidencial.
        </p>

        <Link
          href="/relato"
          className="bg-blue-600 hover:bg-blue-700 text-white font-semibold py-3 px-6 rounded-xl transition inline-block"
        >
          Fazer um relato
        </Link>
      </div>
    </main>
  );
}