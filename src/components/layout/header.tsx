export function Header() {
  return (
    <header className="h-14 border-b bg-card flex items-center justify-between px-6">
      <div className="md:hidden font-bold text-primary">Process Automation</div>
      <div className="flex items-center gap-4 ml-auto">
        <span className="text-sm text-muted-foreground">
          Plateforme d'aide a la decision
        </span>
      </div>
    </header>
  );
}