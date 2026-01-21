import Link from "next/link";

export default function Home() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-r from-blue-500 to-purple-600">
      <div className="text-center text-white">
        <h1 className="text-4xl font-bold mb-4">Vítejte na Auth FE</h1>
        <p className="text-xl mb-8">Jednoduchý systém autentifikace s Next.js a Prisma</p>
        
        <div className="space-x-4">
          <Link
            href="/register"
            className="bg-white text-blue-500 px-6 py-3 rounded-lg font-bold hover:bg-gray-100 transition inline-block"
          >
            Registrovat se
          </Link>
          <Link
            href="/login"
            className="bg-transparent border-2 border-white text-white px-6 py-3 rounded-lg font-bold hover:bg-white hover:text-blue-500 transition inline-block"
          >
            Přihlásit se
          </Link>
        </div>
      </div>
    </div>
  );
}
