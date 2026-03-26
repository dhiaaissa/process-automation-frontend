import Link from "next/link";

export default function Home() {
  return (
    <div className="flex flex-col items-center justify-center min-h-[80vh] space-y-8">
      <div className="text-center space-y-4">
        <h1 className="text-4xl font-bold tracking-tight">
          Plateforme d'Automatisation des Processus
        </h1>
        <p className="text-xl text-muted-foreground max-w-2xl">
          Analysez vos processus metiers, evaluez leur potentiel d'automatisation
          et obtenez des recommandations personnalisees.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 w-full max-w-4xl">
        <Link
          href="/processes/new"
          className="flex flex-col items-center p-6 border rounded-lg hover:border-primary hover:shadow-lg transition-all"
        >
          <span className="text-3xl mb-3">📝</span>
          <h2 className="text-lg font-semibold">Nouveau Processus</h2>
          <p className="text-sm text-muted-foreground text-center mt-2">
            Saisissez un processus metier sous forme de texte
          </p>
        </Link>

        <Link
          href="/processes"
          className="flex flex-col items-center p-6 border rounded-lg hover:border-primary hover:shadow-lg transition-all"
        >
          <span className="text-3xl mb-3">📋</span>
          <h2 className="text-lg font-semibold">Mes Processus</h2>
          <p className="text-sm text-muted-foreground text-center mt-2">
            Consultez et gerez vos processus existants
          </p>
        </Link>

        <Link
          href="/dashboard"
          className="flex flex-col items-center p-6 border rounded-lg hover:border-primary hover:shadow-lg transition-all"
        >
          <span className="text-3xl mb-3">📊</span>
          <h2 className="text-lg font-semibold">Tableau de Bord</h2>
          <p className="text-sm text-muted-foreground text-center mt-2">
            Visualisez les statistiques et les scores
          </p>
        </Link>
      </div>
    </div>
  );
}