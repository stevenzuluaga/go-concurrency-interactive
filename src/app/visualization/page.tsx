"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";

interface User {
  id: number;
  name: string;
  status: "waiting" | "requesting" | "processing" | "completed";
  startTime: number;
  endTime?: number;
  responseTime?: number;
}

export default function VisualizationPage() {
  const [users, setUsers] = useState<User[]>([]);
  const [isRunning, setIsRunning] = useState(false);
  const [totalTime, setTotalTime] = useState(0);
  const [userCount, setUserCount] = useState(10);
  const [mode, setMode] = useState<"sequential" | "concurrent">("concurrent");

  const simulateUserRequest = async (userId: number, delayPerUser: number) => {
    return new Promise<number>((resolve) => {
      const startTime = Date.now();

      // Simular envío de solicitud
      setTimeout(() => {
        setUsers((prev) =>
          prev.map((u) =>
            u.id === userId ? { ...u, status: "requesting" } : u,
          ),
        );
      }, 0);

      // Simular procesamiento del servidor (500-1500ms)
      setTimeout(() => {
        setUsers((prev) =>
          prev.map((u) =>
            u.id === userId ? { ...u, status: "processing" } : u,
          ),
        );
      }, delayPerUser + 200);

      // Simular recepción de respuesta
      setTimeout(() => {
        const endTime = Date.now();
        const responseTime = endTime - startTime;

        setUsers((prev) =>
          prev.map((u) =>
            u.id === userId
              ? { ...u, status: "completed", endTime: endTime, responseTime }
              : u,
          ),
        );
        resolve(responseTime);
      }, delayPerUser + 800);
    });
  };

  const runSequential = async () => {
    setIsRunning(true);
    setMode("sequential");
    setTotalTime(0);

    const newUsers: User[] = Array.from({ length: userCount }, (_, i) => ({
      id: i + 1,
      name: `Usuario ${i + 1}`,
      status: "waiting",
      startTime: Date.now(),
    }));
    setUsers(newUsers);

    const overallStart = Date.now();

    // Ejecución secuencial: una por una
    for (let i = 0; i < userCount; i++) {
      await simulateUserRequest(i + 1, 0);
      await new Promise((resolve) => setTimeout(resolve, 100));
    }

    const overallEnd = Date.now();
    setTotalTime(overallEnd - overallStart);
    setIsRunning(false);
  };

  const runConcurrent = async () => {
    setIsRunning(true);
    setMode("concurrent");
    setTotalTime(0);

    const newUsers: User[] = Array.from({ length: userCount }, (_, i) => ({
      id: i + 1,
      name: `Usuario ${i + 1}`,
      status: "waiting",
      startTime: Date.now(),
    }));
    setUsers(newUsers);

    const overallStart = Date.now();

    // Ejecución concurrente: todas simultáneamente
    const promises = newUsers.map(
      (user, index) => simulateUserRequest(user.id, index * 30), // Pequeño delay para visualización
    );

    await Promise.all(promises);

    const overallEnd = Date.now();
    setTotalTime(overallEnd - overallStart);
    setIsRunning(false);
  };

  const reset = () => {
    setUsers([]);
    setIsRunning(false);
    setTotalTime(0);
  };

  const getStatusColor = (status: User["status"]) => {
    switch (status) {
      case "waiting":
        return "bg-gray-300";
      case "requesting":
        return "bg-blue-400 animate-pulse";
      case "processing":
        return "bg-yellow-400 animate-pulse";
      case "completed":
        return "bg-green-500";
      default:
        return "bg-gray-300";
    }
  };

  const getStatusLabel = (status: User["status"]) => {
    switch (status) {
      case "waiting":
        return "Esperando";
      case "requesting":
        return "Enviando solicitud";
      case "processing":
        return "Procesando";
      case "completed":
        return "Completado";
    }
  };

  return (
    <div className="flex flex-col gap-8 p-8">
      <div className="space-y-2">
        <h1 className="text-4xl font-bold text-foreground">
          Simulación: Usuarios Haciendo Solicitudes
        </h1>
        <p className="text-lg text-muted-foreground">
          Compara cómo se procesan solicitudes simultáneamente vs
          secuencialmente
        </p>
      </div>

      <div className="space-y-4 rounded-lg border border-border bg-card p-6">
        <div className="space-y-4">
          <div>
            <label className="text-sm font-semibold mb-2 block">
              Cantidad de usuarios: {userCount}
            </label>
            <input
              type="range"
              min="5"
              max="50"
              value={userCount}
              onChange={(e) => setUserCount(parseInt(e.target.value))}
              disabled={isRunning}
              className="w-full"
            />
          </div>

          <div className="flex gap-2 flex-wrap">
            <Button
              onClick={runConcurrent}
              disabled={isRunning}
              className="bg-green-600 hover:bg-green-700"
            >
              ▶ Ejecutar Concurrentemente
            </Button>
            <Button
              onClick={runSequential}
              disabled={isRunning}
              className="bg-orange-600 hover:bg-orange-700"
            >
              ▶ Ejecutar Secuencialmente
            </Button>
            <Button onClick={reset} variant="outline" disabled={isRunning}>
              Reiniciar
            </Button>
          </div>
        </div>

        {users.length > 0 && (
          <div className="space-y-4 pt-6 border-t border-border">
            <div className="flex items-center justify-between mb-4">
              <h3 className="font-semibold">
                {mode === "concurrent"
                  ? "Ejecución Concurrente"
                  : "Ejecución Secuencial"}
              </h3>
              <div className="text-right">
                <p className="text-sm text-muted-foreground">Tiempo total</p>
                <p className="text-2xl font-bold">
                  {totalTime > 0
                    ? `${totalTime}ms`
                    : isRunning
                      ? "En progreso..."
                      : ""}
                </p>
              </div>
            </div>

            <div className="space-y-3 max-h-[600px] overflow-y-auto">
              {users.map((user) => (
                <div key={user.id} className="space-y-1">
                  <div className="flex items-center justify-between">
                    <span className="text-sm font-medium">{user.name}</span>
                    <span className="text-xs bg-muted px-2 py-1 rounded">
                      {getStatusLabel(user.status)}
                    </span>
                  </div>
                  <div className="flex items-center gap-2">
                    <div className="h-6 w-full bg-muted rounded overflow-hidden">
                      <div
                        className={`h-full w-full transition-all ${getStatusColor(user.status)}`}
                      />
                    </div>
                    {user.responseTime && (
                      <span className="text-xs font-mono text-muted-foreground min-w-fit">
                        {user.responseTime}ms
                      </span>
                    )}
                  </div>
                </div>
              ))}
            </div>

            {totalTime > 0 && (
              <div className="grid gap-4 md:grid-cols-3 pt-4 border-t border-border">
                <div className="space-y-1">
                  <p className="text-sm text-muted-foreground">
                    Total de usuarios
                  </p>
                  <p className="text-2xl font-bold">{userCount}</p>
                </div>
                <div className="space-y-1">
                  <p className="text-sm text-muted-foreground">Tiempo total</p>
                  <p className="text-2xl font-bold">{totalTime}ms</p>
                </div>
                <div className="space-y-1">
                  <p className="text-sm text-muted-foreground">
                    Promedio por usuario
                  </p>
                  <p className="text-2xl font-bold">
                    {Math.round(totalTime / userCount)}ms
                  </p>
                </div>
              </div>
            )}
          </div>
        )}
      </div>

      <div className="grid gap-6 md:grid-cols-2">
        <div className="space-y-4 rounded-lg border border-green-600 bg-green-600/10 p-6">
          <h2 className="text-xl font-semibold text-green-700">
            ✅ Concurrencia (Go)
          </h2>
          <div className="space-y-3 text-sm">
            <div>
              <p className="font-semibold mb-1">¿Cómo funciona?</p>
              <p className="text-muted-foreground">
                Todos los usuarios envían sus solicitudes al mismo tiempo. El
                servidor procesa múltiples solicitudes simultáneamente.
              </p>
            </div>
            <div>
              <p className="font-semibold mb-1">Ejemplo con 10 usuarios:</p>
              <p className="text-muted-foreground font-mono">
                Tiempo total: ~800ms
                <br />
                (no ~8 segundos)
              </p>
            </div>
            <div>
              <p className="font-semibold mb-1">Ventaja:</p>
              <p className="text-muted-foreground">
                Mucho más rápido. El servidor usa eficientemente sus recursos.
              </p>
            </div>
          </div>
        </div>

        <div className="space-y-4 rounded-lg border border-orange-600 bg-orange-600/10 p-6">
          <h2 className="text-xl font-semibold text-orange-700">
            ⚠️ Secuencial
          </h2>
          <div className="space-y-3 text-sm">
            <div>
              <p className="font-semibold mb-1">¿Cómo funciona?</p>
              <p className="text-muted-foreground">
                Cada usuario espera a que el anterior termine. Las solicitudes
                se procesan una por una, incluso si el servidor está libre.
              </p>
            </div>
            <div>
              <p className="font-semibold mb-1">Ejemplo con 10 usuarios:</p>
              <p className="text-muted-foreground font-mono">
                Tiempo total: ~8000ms
                <br />
                (10 usuarios × 800ms)
              </p>
            </div>
            <div>
              <p className="font-semibold mb-1">Desventaja:</p>
              <p className="text-muted-foreground">
                Muy lento. El servidor desperdicia tiempo esperando sin hacer
                nada.
              </p>
            </div>
          </div>
        </div>
      </div>

      <div className="space-y-4 rounded-lg border border-border bg-card p-6">
        <h2 className="text-xl font-semibold">
          ¿Por qué Go es mejor para esto?
        </h2>
        <div className="grid gap-4 md:grid-cols-3">
          <div>
            <h3 className="font-semibold mb-2 text-green-600">Goroutines</h3>
            <p className="text-sm text-muted-foreground">
              Millones de "usuarios virtuales" pueden ejecutarse simultáneamente
              en una sola máquina.
            </p>
          </div>
          <div>
            <h3 className="font-semibold mb-2 text-green-600">Bajo overhead</h3>
            <p className="text-sm text-muted-foreground">
              Cada goroutine usa solo ~2 KB de memoria. Python thread usa ~8 MB.
            </p>
          </div>
          <div>
            <h3 className="font-semibold mb-2 text-green-600">
              Sintaxis simple
            </h3>
            <p className="text-sm text-muted-foreground">
              Solo una palabra clave:{" "}
              <code className="bg-muted px-1 rounded">go</code>. Sin callbacks
              ni promesas complejas.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
