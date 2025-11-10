"use client";

import React, { useState, useEffect } from "react";
import { Play, RotateCcw } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

export function ThreadingComparison() {
  const [isRunning, setIsRunning] = useState(false);
  const [progress, setProgress] = useState({ seq: 0, con: 0, par: 0 });

  useEffect(() => {
    if (!isRunning) return;

    const interval = setInterval(() => {
      setProgress((p) => ({
        seq: Math.min(100, p.seq + 0.5),
        con: Math.min(100, p.con + 1.5),
        par: Math.min(100, p.par + 3),
      }));
    }, 50);

    if (progress.seq >= 100) setIsRunning(false);
    return () => clearInterval(interval);
  }, [isRunning, progress.seq]);

  const reset = () => {
    setIsRunning(false);
    setProgress({ seq: 0, con: 0, par: 0 });
  };

  const scenarios = [
    {
      key: "seq",
      title: "Secuencial",
      desc: "1 thread, uno tras otro",
      color: "bg-red-500",
    },
    {
      key: "con",
      title: "Concurrente",
      desc: "1 thread, alternando",
      color: "bg-yellow-500",
    },
    {
      key: "par",
      title: "Paralelo",
      desc: "4 threads simultáneos",
      color: "bg-blue-500",
    },
  ];

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle>Comparativa de Ejecución</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex gap-2">
            <Button
              onClick={() => setIsRunning(!isRunning)}
              variant={isRunning ? "default" : "outline"}
            >
              <Play className="mr-2 h-4 w-4" />
              {isRunning ? "Ejecutando..." : "Comenzar"}
            </Button>
            <Button onClick={reset} variant="outline">
              <RotateCcw className="mr-2 h-4 w-4" />
            </Button>
          </div>
        </CardContent>
      </Card>

      <div className="grid gap-6 md:grid-cols-3">
        {scenarios.map((s) => (
          <Card key={s.key}>
            <CardHeader>
              <CardTitle className="text-base">{s.title}</CardTitle>
              <p className="text-xs text-muted-foreground">{s.desc}</p>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <div className="flex justify-between text-sm mb-1">
                  <span>Progreso</span>
                  <span>
                    {Math.round(progress[s.key as keyof typeof progress])}%
                  </span>
                </div>
                <div className="h-3 bg-muted rounded overflow-hidden">
                  <div
                    className={`h-full ${s.color} transition-all`}
                    style={{
                      width: `${progress[s.key as keyof typeof progress]}%`,
                    }}
                  />
                </div>
              </div>

              <div className="bg-muted p-2 rounded text-center">
                <div className="text-xl font-bold">
                  {s.key === "seq" && "1x"}
                  {s.key === "con" && "2x"}
                  {s.key === "par" && "4x"}
                </div>
                <div className="text-xs text-muted-foreground">Speedup</div>
              </div>

              <div className="text-xs space-y-1 font-mono">
                {s.key === "seq" && (
                  <>
                    <div>[T1]</div>
                    <div>[T2]</div>
                    <div>[T3]</div>
                    <div>[T4]</div>
                  </>
                )}
                {s.key === "con" && <div>[T1▸T2▸T3▸T4]</div>}
                {s.key === "par" && (
                  <>
                    <div>[T1] [T2]</div>
                    <div>[T3] [T4]</div>
                  </>
                )}
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      <Card className="border-l-4 border-blue-500">
        <CardContent className="pt-6 space-y-2 text-sm">
          <p>
            <strong>Secuencial:</strong> Las tareas se ejecutan una tras otra.
          </p>
          <p>
            <strong>Concurrente:</strong> Un thread alterna entre tareas
            rápidamente.
          </p>
          <p>
            <strong>Paralelo:</strong> Múltiples threads ejecutan al mismo
            tiempo.
          </p>
          <p className="text-xs text-muted-foreground pt-2">
            Go combina ambos: millones de goroutines ejecutándose en paralelo en
            múltiples cores.
          </p>
        </CardContent>
      </Card>
    </div>
  );
}
