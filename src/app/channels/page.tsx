"use client"

export default function ChannelsPage() {
  return (
    <div className="flex flex-col gap-8 p-8">
      <div className="space-y-2">
        <h1 className="text-4xl font-bold text-foreground">Channels</h1>
        <p className="text-lg text-muted-foreground">
          Los channels son tuberías para comunicación segura entre goroutines
        </p>
      </div>

      {/* Definición */}
      <div className="space-y-4 rounded-lg border border-border bg-card p-6">
        <h2 className="text-2xl font-semibold text-foreground">¿Qué es un Channel?</h2>
        <p className="text-muted-foreground">
          Un channel es un mecanismo de comunicación entre goroutines. Permite enviar y recibir
          valores de forma sincronizada y segura. Los channels garantizan que un valor enviado
          por una goroutine sea recibido correctamente por otra sin problemas de concurrencia.
        </p>
      </div>

      {/* Tipos de Channels */}
      <div className="grid gap-6 md:grid-cols-2">
        <div className="space-y-4 rounded-lg border border-border bg-card p-6">
          <h3 className="text-xl font-semibold text-foreground">Unbuffered Channels</h3>
          <div className="space-y-3 text-sm text-muted-foreground">
            <p>
              No tienen capacidad. El envío se bloquea hasta que alguien recibe, y la recepción
              se bloquea hasta que alguien envía.
            </p>
            <div className="rounded-lg bg-card-foreground/5 p-3 font-mono">
              <div>ch := <span className="text-accent">make</span>(chan int)</div>
            </div>
            <ul className="space-y-1 ml-4">
              <li>✓ Sincronización perfecta</li>
              <li>✓ Sin buffer de datos</li>
              <li>✓ Útil para coordinación</li>
            </ul>
          </div>
        </div>

        <div className="space-y-4 rounded-lg border border-border bg-card p-6">
          <h3 className="text-xl font-semibold text-foreground">Buffered Channels</h3>
          <div className="space-y-3 text-sm text-muted-foreground">
            <p>
              Tienen capacidad. El envío se bloquea solo cuando el buffer está lleno, la recepción
              se bloquea solo cuando está vacío.
            </p>
            <div className="rounded-lg bg-card-foreground/5 p-3 font-mono">
              <div>ch := <span className="text-accent">make</span>(chan int, 5)</div>
            </div>
            <ul className="space-y-1 ml-4">
              <li>✓ Buffer de datos</li>
              <li>✓ Desacoplamiento</li>
              <li>✓ Menos bloqueos</li>
            </ul>
          </div>
        </div>
      </div>

      {/* Operaciones */}
      <div className="space-y-4 rounded-lg border border-border bg-card p-6">
        <h2 className="text-2xl font-semibold text-foreground">Operaciones Básicas</h2>
        <div className="grid gap-4 md:grid-cols-3">
          <div className="space-y-2">
            <h4 className="font-semibold text-foreground">Enviar</h4>
            <div className="rounded-lg bg-card-foreground/5 p-3 font-mono text-sm">
              ch &lt;- value
            </div>
            <p className="text-xs text-muted-foreground">
              Envía un valor al channel
            </p>
          </div>
          <div className="space-y-2">
            <h4 className="font-semibold text-foreground">Recibir</h4>
            <div className="rounded-lg bg-card-foreground/5 p-3 font-mono text-sm">
              value &lt;- ch
            </div>
            <p className="text-xs text-muted-foreground">
              Recibe un valor del channel
            </p>
          </div>
          <div className="space-y-2">
            <h4 className="font-semibold text-foreground">Cerrar</h4>
            <div className="rounded-lg bg-card-foreground/5 p-3 font-mono text-sm">
              close(ch)
            </div>
            <p className="text-xs text-muted-foreground">
              Cierra el channel
            </p>
          </div>
        </div>
      </div>

      {/* Select */}
      <div className="space-y-4 rounded-lg border border-border bg-card p-6">
        <h2 className="text-2xl font-semibold text-foreground">Select Statement</h2>
        <p className="text-muted-foreground">
          <code className="rounded bg-muted px-2 py-1">select</code> permite esperar múltiples
          operaciones de channel simultáneamente. Es como un switch para channels.
        </p>
        <div className="rounded-lg bg-card-foreground/5 p-4 font-mono text-sm">
          <div className="text-foreground">
            <span className="text-primary">select</span> {"{"}
          </div>
          <div className="ml-4 text-foreground">
            <span className="text-primary">case</span> msg := &lt;-ch1:
          </div>
          <div className="ml-8 text-muted-foreground">fmt.Println(msg)</div>
          <div className="ml-4 text-foreground">
            <span className="text-primary">case</span> msg := &lt;-ch2:
          </div>
          <div className="ml-8 text-muted-foreground">fmt.Println(msg)</div>
          <div className="ml-4 text-foreground">
            <span className="text-primary">default</span>:
          </div>
          <div className="ml-8 text-muted-foreground">fmt.Println("Sin datos")</div>
          <div className="text-foreground">{"}"}</div>
        </div>
      </div>

      {/* Patrones comunes */}
      <div className="space-y-4 rounded-lg border border-border bg-card p-6">
        <h2 className="text-2xl font-semibold text-foreground">Patrones Comunes</h2>
        <div className="space-y-4">
          <div className="space-y-2">
            <h4 className="font-semibold text-foreground">1. Pipeline</h4>
            <p className="text-sm text-muted-foreground">
              Conectar múltiples goroutines donde la salida de una es la entrada de otra
            </p>
          </div>
          <div className="space-y-2">
            <h4 className="font-semibold text-foreground">2. Fan-out, Fan-in</h4>
            <p className="text-sm text-muted-foreground">
              Distribuir trabajo entre múltiples goroutines (fan-out) y recopilar resultados
              (fan-in)
            </p>
          </div>
          <div className="space-y-2">
            <h4 className="font-semibold text-foreground">3. Worker Pool</h4>
            <p className="text-sm text-muted-foreground">
              Un número fijo de workers recibiendo trabajo de un channel
            </p>
          </div>
          <div className="space-y-2">
            <h4 className="font-semibold text-foreground">4. Rate Limiting</h4>
            <p className="text-sm text-muted-foreground">
              Controlar la velocidad de procesamiento usando un channel ticker
            </p>
          </div>
        </div>
      </div>

      {/* Errores comunes */}
      <div className="space-y-4 rounded-lg border border-border bg-card p-6">
        <h2 className="text-2xl font-semibold text-foreground">Errores Comunes</h2>
        <div className="space-y-3">
          <div className="flex gap-3">
            <span className="text-destructive font-bold">✗</span>
            <div>
              <h4 className="font-semibold text-foreground">Enviar a un channel cerrado</h4>
              <p className="text-sm text-muted-foreground">Causa panic (error crítico)</p>
            </div>
          </div>
          <div className="flex gap-3">
            <span className="text-destructive font-bold">✗</span>
            <div>
              <h4 className="font-semibold text-foreground">Olvidar cerrar channels</h4>
              <p className="text-sm text-muted-foreground">Puede causar goroutine leaks</p>
            </div>
          </div>
          <div className="flex gap-3">
            <span className="text-destructive font-bold">✗</span>
            <div>
              <h4 className="font-semibold text-foreground">Deadlock</h4>
              <p className="text-sm text-muted-foreground">
                Cuando goroutines esperan indefinidamente entre sí
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
