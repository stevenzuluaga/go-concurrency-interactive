"use client"

export default function GoroutinesPage() {
  return (
    <div className="flex flex-col gap-8 p-8">
      <div className="space-y-2">
        <h1 className="text-4xl font-bold text-foreground">Goroutines</h1>
        <p className="text-lg text-muted-foreground">
          Las goroutines son la forma de Go para ejecutar funciones de forma concurrente
        </p>
      </div>

      {/* Definición */}
      <div className="space-y-4 rounded-lg border border-border bg-card p-6">
        <h2 className="text-2xl font-semibold text-foreground">¿Qué es una Goroutine?</h2>
        <p className="text-muted-foreground">
          Una goroutine es un thread gestionado por el runtime de Go. Son extremadamente ligeras:
          puedes tener miles o millones ejecutándose simultáneamente. Están multiplexadas en
          múltiples threads del SO, lo que permite que Go ejecute código concurrente de forma
          eficiente.
        </p>
      </div>

      {/* Ejemplo básico */}
      <div className="space-y-4 rounded-lg border border-border bg-card p-6">
        <h2 className="text-2xl font-semibold text-foreground">Ejemplo Básico</h2>
        <div className="space-y-4">
          <div className="rounded-lg bg-card-foreground/5 p-4 font-mono text-sm">
            <div className="text-foreground">
              <span className="text-primary">package</span> main
            </div>
            <div className="text-foreground">
              <span className="text-primary">import</span> "fmt"
            </div>
            <div className="text-foreground" />
            <div className="text-foreground">
              <span className="text-primary">func</span> <span className="text-accent">main</span>() {"{"}
            </div>
            <div className="ml-4 text-muted-foreground">
              <span className="text-primary">go</span> <span className="text-foreground">greet</span>("Mundo")
            </div>
            <div className="ml-4 text-foreground">
              fmt.<span className="text-accent">Println</span>("Hola")
            </div>
            <div className="text-foreground">{"}"}</div>
          </div>
          <p className="text-sm text-muted-foreground">
            La palabra clave <code className="rounded bg-muted px-2 py-1">go</code> antes de una
            función la ejecuta en una nueva goroutine.
          </p>
        </div>
      </div>

      {/* Características */}
      <div className="grid gap-6 md:grid-cols-2">
        <div className="space-y-4 rounded-lg border border-border bg-card p-6">
          <h3 className="text-xl font-semibold text-foreground">Ligeras</h3>
          <ul className="space-y-2 text-sm text-muted-foreground">
            <li>✓ ~2KB cada una</li>
            <li>✓ Miles de goroutines sin problema</li>
            <li>✓ Gestión automática de memoria</li>
            <li>✓ Cambio de contexto muy rápido</li>
          </ul>
        </div>

        <div className="space-y-4 rounded-lg border border-border bg-card p-6">
          <h3 className="text-xl font-semibold text-foreground">Fáciles de Usar</h3>
          <ul className="space-y-2 text-sm text-muted-foreground">
            <li>✓ Sintaxis simple: solo <code className="rounded bg-muted px-1">go</code></li>
            <li>✓ No necesitas gestionar threads</li>
            <li>✓ El scheduler las gestiona automáticamente</li>
            <li>✓ Ideal para operaciones I/O</li>
          </ul>
        </div>

        <div className="space-y-4 rounded-lg border border-border bg-card p-6">
          <h3 className="text-xl font-semibold text-foreground">Multiplexadas</h3>
          <ul className="space-y-2 text-sm text-muted-foreground">
            <li>✓ Múltiples goroutines en 1 thread</li>
            <li>✓ Redistribución dinámica</li>
            <li>✓ Aprovecha todos los núcleos</li>
            <li>✓ Balance automático</li>
          </ul>
        </div>

        <div className="space-y-4 rounded-lg border border-border bg-card p-6">
          <h3 className="text-xl font-semibold text-foreground">Concurrentes</h3>
          <ul className="space-y-2 text-sm text-muted-foreground">
            <li>✓ Se ejecutan simultáneamente</li>
            <li>✓ Orden de ejecución no determinista</li>
            <li>✓ Requieren sincronización</li>
            <li>✓ Usa channels para comunicación</li>
          </ul>
        </div>
      </div>

      {/* Ciclo de vida */}
      <div className="space-y-4 rounded-lg border border-border bg-card p-6">
        <h2 className="text-2xl font-semibold text-foreground">Ciclo de Vida</h2>
        <div className="space-y-3">
          <div className="flex gap-4">
            <div className="flex h-8 w-8 items-center justify-center rounded-full bg-primary text-primary-foreground font-bold text-sm">
              1
            </div>
            <div className="flex-1">
              <h4 className="font-semibold text-foreground">Creación</h4>
              <p className="text-sm text-muted-foreground">
                Se crea con <code className="rounded bg-muted px-1">go function()</code>
              </p>
            </div>
          </div>
          <div className="flex gap-4">
            <div className="flex h-8 w-8 items-center justify-center rounded-full bg-primary text-primary-foreground font-bold text-sm">
              2
            </div>
            <div className="flex-1">
              <h4 className="font-semibold text-foreground">Ejecución</h4>
              <p className="text-sm text-muted-foreground">
                El scheduler la coloca en un thread disponible y comienza a ejecutarse
              </p>
            </div>
          </div>
          <div className="flex gap-4">
            <div className="flex h-8 w-8 items-center justify-center rounded-full bg-primary text-primary-foreground font-bold text-sm">
              3
            </div>
            <div className="flex-1">
              <h4 className="font-semibold text-foreground">Finalización</h4>
              <p className="text-sm text-muted-foreground">
                La goroutine se termina cuando la función retorna
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Buenas prácticas */}
      <div className="space-y-4 rounded-lg border border-border bg-card p-6">
        <h2 className="text-2xl font-semibold text-foreground">Buenas Prácticas</h2>
        <ul className="space-y-3 text-muted-foreground">
          <li className="flex gap-2">
            <span className="text-primary font-bold">•</span>
            Siempre espera a que terminen las goroutines antes de que main() salga
          </li>
          <li className="flex gap-2">
            <span className="text-primary font-bold">•</span>
            Usa channels o sync.WaitGroup para sincronización
          </li>
          <li className="flex gap-2">
            <span className="text-primary font-bold">•</span>
            Evita condiciones de carrera con mutex si compartes datos
          </li>
          <li className="flex gap-2">
            <span className="text-primary font-bold">•</span>
            Usa goroutines para operaciones I/O o CPU-bound que se pueden paralelizar
          </li>
        </ul>
      </div>
    </div>
  )
}
