
import { CPUThreadsVisualizer } from '@/components/cpu-threads-visualizer';
import { ThreadEducation } from '@/components/thread-education';
import { ThreadingComparison } from '@/components/threading-comparison';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';

export default function ThreadsPage() {
    return (
        <div className="min-h-screen bg-background">
            <main className="space-y-8 p-6">
                {/* Header */}
                <div className="space-y-2">
                    <h1 className="text-4xl font-bold tracking-tight">Threads & Concurrencia</h1>
                    <p className="text-lg text-muted-foreground">
                        Aprende interactivamente cómo funcionan los threads del CPU, multitarea y cómo Go
                        maneja la concurrencia de forma superior
                    </p>
                </div>

                {/* Tabs */}
                <Tabs defaultValue="education" className="w-full">
                    <TabsList className="grid w-full grid-cols-4">
                        <TabsTrigger value="education">Conceptos</TabsTrigger>
                        <TabsTrigger value="comparison">Comparativa</TabsTrigger>
                        <TabsTrigger value="cpu-threads">CPU Threads</TabsTrigger>
                    </TabsList>

                    {/* Tab: Educación */}
                    <TabsContent value="education" className="space-y-6">
                        <ThreadEducation />

                        <Card className="border-l-4 border-green-500 bg-green-50 dark:bg-green-950/20">
                            <CardHeader>
                                <CardTitle className="text-lg">¿Por qué Go es diferente?</CardTitle>
                            </CardHeader>
                            <CardContent className="space-y-3 text-sm">
                                <p>
                                    Go fue diseñado desde cero para la programación concurrente. Su sistema de runtime
                                    proporciona goroutines y canales, permitiendo escribir código concurrente de forma
                                    simple y elegante.
                                </p>
                                <div className="rounded bg-white/50 dark:bg-black/20 p-3 space-y-2">
                                    <p className="font-medium">Características principales:</p>
                                    <ul className="list-disc list-inside space-y-1 text-xs">
                                        <li>Goroutines: Threads ligeros sin el overhead de OS threads</li>
                                        <li>Canales: Comunicación segura entre goroutines</li>
                                        <li>Async-await implícito: Sin palabras clave especiales necesarias</li>
                                        <li>GC optimizado: Garbage collection concurrente y eficiente</li>
                                    </ul>
                                </div>
                            </CardContent>
                        </Card>
                    </TabsContent>

                    {/* Tab: Comparativa */}
                    <TabsContent value="comparison" className="space-y-6">
                        <ThreadingComparison />
                    </TabsContent>

                    {/* Tab: CPU Threads */}
                    <TabsContent value="cpu-threads">
                        <div className="space-y-6">
                            <Card>
                                <CardHeader>
                                    <CardTitle>Simulador de CPU Threads</CardTitle>
                                    <CardDescription>
                                        Observa cómo un CPU con múltiples threads maneja la ejecución de tareas.
                                        Cada thread del CPU puede ejecutar una tarea a la vez.
                                    </CardDescription>
                                </CardHeader>
                                <CardContent>
                                    <p className="mb-4 text-sm text-muted-foreground">
                                        Ajusta el número de threads, agrega tareas y observa cómo se distribuye el trabajo.
                                        La utilización muestra qué porcentaje del CPU está siendo usado.
                                    </p>
                                </CardContent>
                            </Card>

                            <CPUThreadsVisualizer />

                            <Card className="border-l-4 border-blue-500">
                                <CardHeader>
                                    <CardTitle className="text-base">Observaciones importantes</CardTitle>
                                </CardHeader>
                                <CardContent className="space-y-2 text-sm">
                                    <p>
                                        ✓ Con más threads, el CPU maneja más tareas en paralelo (en máquinas multi-core)
                                    </p>
                                    <p>
                                        ✓ La cola de tareas crece cuando hay más trabajo que capacidad de threads
                                    </p>
                                    <p>
                                        ✗ Crear demasiados OS threads es costoso en memoria y rendimiento
                                    </p>
                                    <p>
                                        ✓ Esto es lo que motiva a lenguajes como Go a usar abstracciones más ligeras
                                    </p>
                                </CardContent>
                            </Card>
                        </div>
                    </TabsContent>


                </Tabs>


            </main>
        </div>
    );
}
