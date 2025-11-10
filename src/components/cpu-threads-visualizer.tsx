'use client';

import React, { useState, useEffect } from 'react';
import { Play, Pause, RotateCcw, Plus, Minus } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';

export function CPUThreadsVisualizer() {
  const [numThreads, setNumThreads] = useState(2);
  const [isRunning, setIsRunning] = useState(false);
  const [taskQueue, setTaskQueue] = useState<number[]>([]);
  const [threadProgress, setThreadProgress] = useState<Record<number, number>>({});
  const [completed, setCompleted] = useState(0);

  // Inicializar threads
  useEffect(() => {
    setThreadProgress(
      Object.fromEntries(Array.from({ length: numThreads }, (_, i) => [i, 0]))
    );
  }, [numThreads]);

  // Simular ejecución
  useEffect(() => {
    if (!isRunning || taskQueue.length === 0) return;

    const interval = setInterval(() => {
      setThreadProgress((prev) => {
        const updated = { ...prev };
        let tasksToRemove = 0;

        Object.keys(updated).forEach((key) => {
          const threadId = parseInt(key);
          if (updated[threadId] > 0 && updated[threadId] < 100) {
            updated[threadId] += Math.random() * 20;
            if (updated[threadId] >= 100) {
              updated[threadId] = 0;
              tasksToRemove++;
            }
          } else if (updated[threadId] === 0 && taskQueue.length > tasksToRemove) {
            updated[threadId] = 1;
          }
        });

        if (tasksToRemove > 0) {
          setCompleted((c) => c + tasksToRemove);
          setTaskQueue((q) => q.slice(tasksToRemove));
        }

        return updated;
      });
    }, 200);

    return () => clearInterval(interval);
  }, [isRunning, taskQueue]);

  const addTasks = () => {
    setTaskQueue((q) => [...q, ...Array(5).fill(0).map((_, i) => Date.now() + i)]);
  };

  const reset = () => {
    setIsRunning(false);
    setTaskQueue([]);
    setThreadProgress(
      Object.fromEntries(Array.from({ length: numThreads }, (_, i) => [i, 0]))
    );
    setCompleted(0);
  };

  return (
    <div className="space-y-6">
      {/* Controles */}
      <Card>
        <CardHeader>
          <CardTitle>Simulador de Threads del CPU</CardTitle>
          <CardDescription>Cómo el CPU ejecuta múltiples tareas con threads</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex flex-col gap-3 md:flex-row md:items-end md:gap-3">
            <div>
              <label className="block text-sm font-medium mb-2">Threads: {numThreads}</label>
              <div className="flex items-center gap-2">
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => setNumThreads((n) => Math.max(1, n - 1))}
                  disabled={isRunning}
                >
                  <Minus className="h-4 w-4" />
                </Button>
                <span className="w-8 text-center font-semibold">{numThreads}</span>
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => setNumThreads((n) => Math.min(8, n + 1))}
                  disabled={isRunning}
                >
                  <Plus className="h-4 w-4" />
                </Button>
              </div>
            </div>

            <div className="flex gap-2 flex-1 md:flex-none">
              <Button
                onClick={() => setIsRunning(!isRunning)}
                variant={isRunning ? 'default' : 'outline'}
              >
                {isRunning ? <Pause className="mr-2 h-4 w-4" /> : <Play className="mr-2 h-4 w-4" />}
                {isRunning ? 'Pausar' : 'Iniciar'}
              </Button>
              <Button onClick={addTasks} variant="outline">
                + 5 Tareas
              </Button>
              <Button onClick={reset} variant="outline">
                <RotateCcw className="h-4 w-4" />
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Stats */}
      <div className="grid gap-4 md:grid-cols-3">
        <Card>
          <CardContent className="pt-6">
            <div className="text-3xl font-bold">{completed}</div>
            <p className="text-sm text-muted-foreground">Completadas</p>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="pt-6">
            <div className="text-3xl font-bold">{taskQueue.length}</div>
            <p className="text-sm text-muted-foreground">En cola</p>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="pt-6">
            <div className="text-3xl font-bold">
              {Object.values(threadProgress).filter((p) => p > 0).length}/{numThreads}
            </div>
            <p className="text-sm text-muted-foreground">Threads activos</p>
          </CardContent>
        </Card>
      </div>

      {/* Threads */}
      <Card>
        <CardHeader>
          <CardTitle className="text-lg">Estado de Threads</CardTitle>
        </CardHeader>
        <CardContent className="space-y-3">
          {Array.from({ length: numThreads }).map((_, idx) => (
            <div key={idx}>
              <div className="flex justify-between items-center mb-1">
                <span className="text-sm font-medium">Thread {idx}</span>
                <span className="text-xs text-muted-foreground">
                  {Math.round(threadProgress[idx] || 0)}%
                </span>
              </div>
              <div className="h-6 bg-muted rounded overflow-hidden">
                {(threadProgress[idx] || 0) > 0 && (
                  <div
                    className="h-full bg-blue-500"
                    style={{ width: `${Math.min(100, threadProgress[idx] || 0)}%` }}
                  />
                )}
              </div>
            </div>
          ))}
        </CardContent>
      </Card>

      {/* Cola */}
      {taskQueue.length > 0 && (
        <Card>
          <CardHeader>
            <CardTitle className="text-sm">Cola: {taskQueue.length} tareas esperando</CardTitle>
          </CardHeader>
        </Card>
      )}
    </div>
  );
}
