'use client';

import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';

export function ThreadEducation() {
  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle>¿Qué son los Threads?</CardTitle>
          <CardDescription>Conceptos fundamentales de la concurrencia</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="space-y-3">
            <div className="rounded-lg border border-border bg-muted/50 p-4">
              <h4 className="font-semibold mb-2">Thread (Hilo)</h4>
              <p className="text-sm text-muted-foreground">
                Un thread es la unidad más pequeña de ejecución dentro de un proceso. Cada thread puede ejecutar código de forma independiente, pero comparte memoria con otros threads del mismo proceso.
              </p>
            </div>

            <div className="rounded-lg border border-border bg-muted/50 p-4">
              <h4 className="font-semibold mb-2">CPU Core (Núcleo)</h4>
              <p className="text-sm text-muted-foreground">
                Un núcleo de CPU puede ejecutar un thread a la vez. Una CPU moderna tiene múltiples núcleos, permitiendo true parallelism (paralelismo real).
              </p>
            </div>

            <div className="rounded-lg border border-border bg-muted/50 p-4">
              <h4 className="font-semibold mb-2">Context Switching</h4>
              <p className="text-sm text-muted-foreground">
                Cuando hay más threads que núcleos, el sistema operativo cambia entre threads rápidamente para dar la ilusión de ejecución simultánea. Esto se llama multitarea concurrente.
              </p>
            </div>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Concurrencia vs Paralelismo</CardTitle>
        </CardHeader>
        <CardContent>
          <Tabs defaultValue="concurrency" className="w-full">
            <TabsList className="grid w-full grid-cols-2">
              <TabsTrigger value="concurrency">Concurrencia</TabsTrigger>
              <TabsTrigger value="parallelism">Paralelismo</TabsTrigger>
            </TabsList>

            <TabsContent value="concurrency" className="space-y-4">
              <div className="space-y-3">
                <p className="text-sm font-medium">
                  Múltiples tareas pueden comenzar, ejecutarse y completarse en orden solapado.
                </p>
                <div className="space-y-2 font-mono text-xs">
                  <div>CPU Core:</div>
                  <div className="rounded bg-muted p-3">
                    <div>T1 ──────┐</div>
                    <div>    T2 ──────┐</div>
                    <div>        T3 ──────┐</div>
                    <div>──────────────────→ Tiempo</div>
                  </div>
                </div>
                <p className="text-sm text-muted-foreground">
                  Un solo CPU core alternando rápidamente entre tareas. Útil para I/O operations (red, disco).
                </p>
              </div>
            </TabsContent>

            <TabsContent value="parallelism" className="space-y-4">
              <div className="space-y-3">
                <p className="text-sm font-medium">
                  Múltiples tareas se ejecutan simultáneamente en diferentes núcleos.
                </p>
                <div className="space-y-2 font-mono text-xs">
                  <div>Core 1: T1 ─────────────→</div>
                  <div>Core 2: T2 ─────────────→</div>
                  <div>Core 3: T3 ─────────────→</div>
                  <div>───────────────────────→ Tiempo</div>
                </div>
                <p className="text-sm text-muted-foreground">
                  Múltiples núcleos ejecutando tareas al mismo tiempo. Ideal para CPU-bound operations.
                </p>
              </div>
            </TabsContent>
          </Tabs>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Modelo de Hilos OS vs Go Goroutines</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid gap-4 md:grid-cols-2">
            <div className="space-y-3 rounded-lg border border-border bg-muted/50 p-4">
              <h4 className="font-semibold">OS Threads (Pesados)</h4>
              <ul className="space-y-2 text-sm text-muted-foreground">
                <li>✓ Controlados por el SO (Sistema Operativo)</li>
                <li>✗ Consumen mucha memoria (~1-2 MB por thread)</li>
                <li>✗ Crear/destruir es costoso</li>
                <li>✗ Context switching es lento</li>
                <li>✓ True paralelismo en múltiples cores</li>
                <li>✓ Usado en Java, C++, etc.</li>
              </ul>
            </div>

            <div className="space-y-3 rounded-lg border border-border bg-green-50 p-4 dark:bg-green-950/20">
              <h4 className="font-semibold">Go Goroutines (Ligeros)</h4>
              <ul className="space-y-2 text-sm text-muted-foreground">
                <li>✓ Controlados por Go runtime</li>
                <li>✓ Consumen poca memoria (~2 KB por goroutine)</li>
                <li>✓ Crear/destruir es muy rápido</li>
                <li>✓ Context switching es ultra rápido</li>
                <li>✓ Puede haber millones de goroutines</li>
                <li>✓ Green threads: multiplexados en OS threads</li>
              </ul>
            </div>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Ejemplo: Hilos OS vs Goroutines</CardTitle>
          <CardDescription>Visualización teórica de uso de recursos</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div>
              <div className="mb-2 flex justify-between text-sm">
                <span className="font-medium">1,000 OS Threads</span>
                <span className="text-muted-foreground">~2 GB de memoria</span>
              </div>
              <div className="h-3 overflow-hidden rounded-full bg-red-100 dark:bg-red-950">
                <div className="h-full w-full bg-red-500" />
              </div>
            </div>

            <div>
              <div className="mb-2 flex justify-between text-sm">
                <span className="font-medium">1,000 Goroutines</span>
                <span className="text-muted-foreground">~2 MB de memoria</span>
              </div>
              <div className="h-3 overflow-hidden rounded-full bg-green-100 dark:bg-green-950">
                <div className="h-full w-1/4 bg-green-500" />
              </div>
            </div>

            <div>
              <div className="mb-2 flex justify-between text-sm">
                <span className="font-medium">1,000,000 Goroutines</span>
                <span className="text-muted-foreground">~2 GB de memoria</span>
              </div>
              <div className="h-3 overflow-hidden rounded-full bg-green-100 dark:bg-green-950">
                <div className="h-full w-full bg-green-500" />
              </div>
            </div>
          </div>

          <p className="mt-4 text-xs text-muted-foreground">
            Go runtime scheduler automáticamente multiplexea goroutines en OS threads disponibles,
            proporcionando un modelo de programación concurrente ultra-eficiente.
          </p>
        </CardContent>
      </Card>
    </div>
  );
}
