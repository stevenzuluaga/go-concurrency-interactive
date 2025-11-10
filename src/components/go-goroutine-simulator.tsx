'use client';

import React, { useState, useEffect } from 'react';
import { Play, Pause, RotateCcw, Plus, Minus } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';

interface Goroutine {
  id: number;
  progress: number;
  blocked: boolean;
}

export function GoGoroutineSimulator() {
  const [numGoroutines, setNumGoroutines] = useState(5);
  const [isRunning, setIsRunning] = useState(false);
  const [goroutines, setGoroutines] = useState<Goroutine[]>([]);
  const [completed, setCompleted] = useState(0);
  const [osThreads, setOsThreads] = useState(4);

  // Inicializar
  useEffect(() => {
    setGoroutines(
      Array.from({ length: numGoroutines }, (_, i) => ({
        id: i,
        progress: 0,
        blocked: false,
      }))
    );
  }, [numGoroutines]);

  // Simular ejecución
  useEffect(() => {
    if (!isRunning) return;

    const interval = setInterval(() => {
      setGoroutines((prev) => {
        let tasksCompleted = 0;
        const updated = prev.map((g) => {
          if (g.progress === 0) {
            // Inicia si hay probabilidad
            if (Math.random() < 0.3) {
              return { ...g, progress: 1 };
            }
            return g;
          }

          if (g.progress > 0 && g.progress < 100) {
            let newProgress = g.progress + Math.random() * 3;

            // Simular bloqueo ocasional (I/O)
            if (newProgress > 30 && newProgress < 70 && !g.blocked && Math.random() < 0.05) {
              return { ...g, blocked: true, progress: newProgress };
            }

            // Desbloquear
            if (g.blocked && Math.random() < 0.3) {
              newProgress += 5;
              return { ...g, blocked: false, progress: newProgress };
            }

            if (newProgress >= 100) {
              tasksCompleted++;
              return { ...g, progress: 0, blocked: false };
            }

            return { ...g, progress: newProgress };
          }

          return g;
        });

        if (tasksCompleted > 0) {
          setCompleted((c) => c + tasksCompleted);
        }

        return updated;
      });
    }, 150);

    return () => clearInterval(interval);
  }, [isRunning]);

  const reset = () => {
    setIsRunning(false);
    setGoroutines(
      Array.from({ length: numGoroutines }, (_, i) => ({
        id: i,
        progress: 0,
        blocked: false,
      }))
    );
    setCompleted(0);
  };

  const activeCount = goroutines.filter((g) => g.progress > 0 && g.progress < 100).length;
  const blockedCount = goroutines.filter((g) => g.blocked).length;

  return (
    <div className="space-y-6">
      {/* Controles */}
      <Card>
        <CardHeader>
          <CardTitle>Simulador de Go Goroutines</CardTitle>
          <CardDescription>Goroutines multiplexadas en OS threads</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid gap-4 md:grid-cols-2">
            <div>
              <label className="block text-sm font-medium mb-2">Goroutines: {numGoroutines}</label>
              <div className="flex items-center gap-2">
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => setNumGoroutines((n) => Math.max(1, n - 1))}
                  disabled={isRunning}
                >
                  <Minus className="h-4 w-4" />
                </Button>
                <input
                  type="range"
                  min="1"
                  max="50"
                  value={numGoroutines}
                  onChange={(e) => setNumGoroutines(parseInt(e.target.value))}
                  disabled={isRunning}
                  className="flex-1"
                />
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => setNumGoroutines((n) => Math.min(50, n + 1))}
                  disabled={isRunning}
                >
                  <Plus className="h-4 w-4" />
                </Button>
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium mb-2">OS Threads: {osThreads}</label>
              <div className="flex items-center gap-2">
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => setOsThreads((n) => Math.max(1, n - 1))}
                  disabled={isRunning}
                >
                  <Minus className="h-4 w-4" />
                </Button>
                <input
                  type="range"
                  min="1"
                  max="16"
                  value={osThreads}
                  onChange={(e) => setOsThreads(parseInt(e.target.value))}
                  disabled={isRunning}
                  className="flex-1"
                />
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => setOsThreads((n) => Math.min(16, n + 1))}
                  disabled={isRunning}
                >
                  <Plus className="h-4 w-4" />
                </Button>
              </div>
            </div>
          </div>

          <div className="flex gap-2">
            <Button
              onClick={() => setIsRunning(!isRunning)}
              variant={isRunning ? 'default' : 'outline'}
              className="flex-1"
            >
              {isRunning ? <Pause className="mr-2 h-4 w-4" /> : <Play className="mr-2 h-4 w-4" />}
              {isRunning ? 'Pausar' : 'Iniciar'}
            </Button>
            <Button onClick={reset} variant="outline" className="flex-1">
              <RotateCcw className="h-4 w-4" />
            </Button>
          </div>
        </CardContent>
      </Card>

      {/* Stats */}
      <div className="grid gap-4 md:grid-cols-4">
        <Card>
          <CardContent className="pt-6">
            <div className="text-2xl font-bold">{activeCount}</div>
            <p className="text-xs text-muted-foreground">Activas</p>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="pt-6">
            <div className="text-2xl font-bold">{blockedCount}</div>
            <p className="text-xs text-muted-foreground">Bloqueadas (I/O)</p>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="pt-6">
            <div className="text-2xl font-bold">{completed}</div>
            <p className="text-xs text-muted-foreground">Completadas</p>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="pt-6">
            <div className="text-2xl font-bold">{numGoroutines - activeCount - blockedCount}</div>
            <p className="text-xs text-muted-foreground">Esperando</p>
          </CardContent>
        </Card>
      </div>

      {/* Goroutines */}
      <Card>
        <CardHeader>
          <CardTitle className="text-sm">Goroutines ({numGoroutines})</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-2 max-h-60 overflow-y-auto">
            {goroutines.map((g) => (
              <div key={g.id}>
                <div className="flex justify-between items-center mb-0.5 text-xs">
                  <span>#{g.id}</span>
                  <span className="text-muted-foreground">
                    {g.blocked ? '🟡 I/O' : g.progress > 0 ? '🟢' : '⚪'}
                  </span>
                </div>
                <div className="h-3 bg-muted rounded overflow-hidden">
                  {g.progress > 0 && (
                    <div
                      className="h-full bg-purple-500"
                      style={{ width: `${Math.min(100, g.progress)}%`, opacity: g.blocked ? 0.5 : 1 }}
                    />
                  )}
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Info */}
      <Card className="border-l-4 border-purple-500">
        <CardContent className="pt-6 text-sm">
          <p className="mb-2">
            💡 Intenta: Aumenta goroutines a 30+, mantén OS threads en 4. Observa cómo el runtime 
            las distribuye automáticamente.
          </p>
          <p className="text-muted-foreground text-xs">
            Go puede ejecutar millones de goroutines simultáneamente, algo imposible con OS threads.
          </p>
        </CardContent>
      </Card>
    </div>
  );
}
