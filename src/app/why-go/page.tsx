"use client"

export default function WhyGoPage() {
  return (
    <div className="flex flex-col gap-6 p-8">
      <div className="space-y-2">
        <h1 className="text-4xl font-bold text-foreground">¿Por qué Go para Concurrencia?</h1>
        <p className="text-lg text-muted-foreground">
          Descubre por qué Go es uno de los lenguajes más poderosos para programación concurrente
        </p>
      </div>

      <div className="grid gap-6 md:grid-cols-2">
        {/* Card 1 */}
        <div className="space-y-4 rounded-lg border border-border bg-card p-6">
          <div className="flex items-center gap-3">
            <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-primary/10">
              <span className="text-lg font-bold text-primary">⚡</span>
            </div>
            <h2 className="text-xl font-semibold text-foreground">Simplicidad</h2>
          </div>
          <p className="text-muted-foreground">
            Go fue diseñado específicamente para la concurrencia. La sintaxis es simple y clara,
            permitiendo escribir código concurrente sin complicaciones.
          </p>
        </div>

        {/* Card 2 */}
        <div className="space-y-4 rounded-lg border border-border bg-card p-6">
          <div className="flex items-center gap-3">
            <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-primary/10">
              <span className="text-lg font-bold text-primary">🚀</span>
            </div>
            <h2 className="text-xl font-semibold text-foreground">Rendimiento</h2>
          </div>
          <p className="text-muted-foreground">
            Las goroutines son extremadamente ligeras (miles o millones pueden ejecutarse
            simultáneamente). El compilador de Go produce código muy eficiente.
          </p>
        </div>

        {/* Card 3 */}
        <div className="space-y-4 rounded-lg border border-border bg-card p-6">
          <div className="flex items-center gap-3">
            <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-primary/10">
              <span className="text-lg font-bold text-primary">🔧</span>
            </div>
            <h2 className="text-xl font-semibold text-foreground">Herramientas Integradas</h2>
          </div>
          <p className="text-muted-foreground">
            Go incluye herramientas de testing, profiling y análisis de rendimiento en la librería
            estándar. No necesitas dependencias externas complejas.
          </p>
        </div>

        {/* Card 4 */}
        <div className="space-y-4 rounded-lg border border-border bg-card p-6">
          <div className="flex items-center gap-3">
            <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-primary/10">
              <span className="text-lg font-bold text-primary">🌍</span>
            </div>
            <h2 className="text-xl font-semibold text-foreground">Multiplataforma</h2>
          </div>
          <p className="text-muted-foreground">
            Compila a un único binario ejecutable que funciona en Linux, macOS, Windows y otros
            sistemas operativos sin cambios en el código.
          </p>
        </div>
      </div>

      <div className="space-y-4 rounded-lg border border-border bg-card p-6">
        <h2 className="text-2xl font-semibold text-foreground">Comparativa con otros lenguajes</h2>
        <div className="grid gap-4 md:grid-cols-3">
          <div className="space-y-2">
            <h3 className="font-semibold text-foreground">Python</h3>
            <p className="text-sm text-muted-foreground">
              Python tiene el GIL (Global Interpreter Lock) que limita la concurrencia real.
              Go no tiene esta limitación.
            </p>
          </div>
          <div className="space-y-2">
            <h3 className="font-semibold text-foreground">Java/C++</h3>
            <p className="text-sm text-muted-foreground">
              Los threads son más pesados y complejos de manejar. Las goroutines de Go son
              órdenes de magnitud más ligeras.
            </p>
          </div>
          <div className="space-y-2">
            <h3 className="font-semibold text-foreground">Rust</h3>
            <p className="text-sm text-muted-foreground">
              Rust es poderoso pero con una curva de aprendizaje más pronunciada. Go es más
              accesible para principiantes.
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}
