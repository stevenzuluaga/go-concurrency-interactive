"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"

export default function VisualizationPage() {
  const [concurrentTasks, setConcurrentTasks] = useState<
    Array<{ id: number; status: "pending" | "running" | "completed"; progress: number }>
  >([])
  const [isRunning, setIsRunning] = useState(false)

  const startVisualization = async () => {
    setIsRunning(true)
    const tasks: Array<{ id: number; status: "pending" | "running" | "completed"; progress: number }> = Array.from(
      { length: 6 },
      (_, i) => ({
        id: i,
        status: "pending",
        progress: 0,
      })
    )
    setConcurrentTasks(tasks)

    // Simulamos ejecución concurrente
    for (let i = 0; i < tasks.length; i++) {
      tasks[i] = { ...tasks[i], status: "running" }
      setConcurrentTasks([...tasks])

      // Simulamos trabajo
      const duration = Math.random() * 3000 + 1000
      await new Promise((resolve) => setTimeout(resolve, duration))

      tasks[i] = { ...tasks[i], status: "completed", progress: 100 }
      setConcurrentTasks([...tasks])
    }

    setIsRunning(false)
  }

  const reset = () => {
    setConcurrentTasks([])
    setIsRunning(false)
  }

  return (
    <div className="flex flex-col gap-8 p-8">
      <div className="space-y-2">
        <h1 className="text-4xl font-bold text-foreground">Visualización de Concurrencia</h1>
        <p className="text-lg text-muted-foreground">
          Ve cómo múltiples tareas se ejecutan de forma concurrente
        </p>
      </div>

      <div className="space-y-4 rounded-lg border border-border bg-card p-6">
        <div className="flex gap-2">
          <Button
            onClick={startVisualization}
            disabled={isRunning}
            className="bg-primary hover:bg-primary/90"
          >
            Iniciar Simulación
          </Button>
          <Button onClick={reset} variant="outline" disabled={isRunning}>
            Reiniciar
          </Button>
        </div>

        <div className="space-y-4 pt-6">
          {concurrentTasks.map((task) => (
            <div key={task.id} className="space-y-2">
              <div className="flex items-center justify-between">
                <span className="font-medium text-foreground">Tarea {task.id + 1}</span>
                <span className="text-sm text-muted-foreground">
                  {task.status === "pending" && "Pendiente"}
                  {task.status === "running" && "Ejecutando"}
                  {task.status === "completed" && "Completada"}
                </span>
              </div>
              <div className="h-2 w-full overflow-hidden rounded-full bg-muted">
                <div
                  className={`h-full transition-all duration-300 ${
                    task.status === "completed"
                      ? "bg-primary"
                      : task.status === "running"
                        ? "bg-accent animate-pulse"
                        : "bg-muted-foreground/30"
                  }`}
                  style={{
                    width:
                      task.status === "pending"
                        ? "0%"
                        : task.status === "running"
                          ? "50%"
                          : "100%",
                  }}
                />
              </div>
            </div>
          ))}
        </div>
      </div>

      <div className="grid gap-6 md:grid-cols-2">
        <div className="space-y-4 rounded-lg border border-border bg-card p-6">
          <h2 className="text-xl font-semibold text-foreground">Ejecución Secuencial</h2>
          <div className="space-y-3">
            <div className="flex items-center gap-2 text-sm">
              <div className="h-3 w-3 rounded-full bg-primary" />
              <span>Tarea 1: 2s</span>
            </div>
            <div className="flex items-center gap-2 text-sm">
              <div className="h-3 w-3 rounded-full bg-primary" />
              <span>Tarea 2: 2s (después de Tarea 1)</span>
            </div>
            <div className="flex items-center gap-2 text-sm">
              <div className="h-3 w-3 rounded-full bg-primary" />
              <span>Tiempo total: ~12s</span>
            </div>
          </div>
        </div>

        <div className="space-y-4 rounded-lg border border-border bg-card p-6">
          <h2 className="text-xl font-semibold text-foreground">Ejecución Concurrente</h2>
          <div className="space-y-3">
            <div className="flex items-center gap-2 text-sm">
              <div className="h-3 w-3 rounded-full bg-accent" />
              <span>Todas las tareas en paralelo</span>
            </div>
            <div className="flex items-center gap-2 text-sm">
              <div className="h-3 w-3 rounded-full bg-accent" />
              <span>Se ejecutan simultáneamente</span>
            </div>
            <div className="flex items-center gap-2 text-sm">
              <div className="h-3 w-3 rounded-full bg-accent" />
              <span>Tiempo total: ~2s</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
