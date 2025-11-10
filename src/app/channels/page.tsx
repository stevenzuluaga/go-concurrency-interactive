"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";

interface Message {
  id: number;
  from: string;
  content: string;
  status: "pending" | "in-transit" | "delivered";
  timestamp: number;
}

export default function ChannelsPage() {
  const [messages, setMessages] = useState<Message[]>([]);
  const [isRunning, setIsRunning] = useState(false);
  const [producerCount, setProducerCount] = useState(3);
  const [consumerCount, setConsumerCount] = useState(2);
  const [mode, setMode] = useState<"unbuffered" | "buffered">("unbuffered");

  const runChannelSimulation = async () => {
    setIsRunning(true);
    setMessages([]);

    const channelBuffer: Message[] = [];
    let messageId = 0;

    // Producers: goroutines que envían datos
    const producers = Array.from({ length: producerCount }, async (_, idx) => {
      for (let i = 0; i < 3; i++) {
        await new Promise((resolve) =>
          setTimeout(resolve, Math.random() * 1000 + 500),
        );

        messageId++;
        const message: Message = {
          id: messageId,
          from: `Productor ${idx + 1}`,
          content: `Mensaje ${i + 1}`,
          status: "pending",
          timestamp: Date.now(),
        };

        setMessages((prev) => [...prev, message]);

        // Simular envío al channel
        setTimeout(() => {
          setMessages((prev) =>
            prev.map((m) =>
              m.id === message.id ? { ...m, status: "in-transit" } : m,
            ),
          );

          if (mode === "buffered") {
            // Buffered: almacenar en buffer
            channelBuffer.push(message);
          }
        }, 300);

        await new Promise((resolve) => setTimeout(resolve, 500));
      }
    });

    // Consumers: goroutines que reciben datos
    const consumers = Array.from({ length: consumerCount }, async (_, idx) => {
      while (true) {
        // En unbuffered, esperar que haya un productor
        // En buffered, procesar del buffer
        await new Promise((resolve) =>
          setTimeout(resolve, Math.random() * 800 + 400),
        );

        const message = channelBuffer.shift();
        if (message) {
          setMessages((prev) =>
            prev.map((m) =>
              m.id === message.id
                ? {
                    ...m,
                    status: "delivered",
                    from: `${m.from} → Consumidor ${idx + 1}`,
                  }
                : m,
            ),
          );
        }

        if (messageId >= producerCount * 3 && channelBuffer.length === 0) {
          break;
        }
      }
    });

    await Promise.all([...producers, ...consumers]);

    setIsRunning(false);
  };

  const reset = () => {
    setMessages([]);
    setIsRunning(false);
  };

  const getStatusColor = (status: Message["status"]) => {
    switch (status) {
      case "pending":
        return "bg-blue-300";
      case "in-transit":
        return "bg-yellow-400 animate-pulse";
      case "delivered":
        return "bg-green-500";
      default:
        return "bg-gray-300";
    }
  };

  const getStatusLabel = (status: Message["status"]) => {
    switch (status) {
      case "pending":
        return "Preparado";
      case "in-transit":
        return "En el channel";
      case "delivered":
        return "Entregado";
    }
  };

  return (
    <div className="flex flex-col gap-8 p-8">
      <h1 className="text-4xl font-bold text-foreground">
        Channels: Cómo se comunican las Goroutines
      </h1>
      <p>
        Los channels en Go son como buzones postales que permiten a las
        goroutines enviarse mensajes entre sí de forma segura y sincronizada.
      </p>
      {/* Patrones comunes */}
      <div className="space-y-4 rounded-lg border border-border bg-card p-6">
        <h2 className="text-2xl font-semibold">Ejemplos del mundo real</h2>
        <div className="grid gap-4 md:grid-cols-2">
          <div className="space-y-2">
            <h4 className="font-semibold text-blue-600">
              📦 Sistema de cola (Pipeline)
            </h4>
            <p className="text-sm text-muted-foreground">
              Un panadero recibe harina → hace pan → el repartidor recoge el
              pan. Cada paso usa un buzón diferente.
            </p>
          </div>
          <div className="space-y-2">
            <h4 className="font-semibold text-green-600">
              👥 Distribuidora de trabajo
            </h4>
            <p className="text-sm text-muted-foreground">
              Un jefe deja tareas en el buzón. 5 trabajadores las reciben y
              trabajan en paralelo.
            </p>
          </div>
          <div className="space-y-2">
            <h4 className="font-semibold text-purple-600">
              📅 Help desk (Mesa de ayuda)
            </h4>
            <p className="text-sm text-muted-foreground">
              3 asesores atienden un buzón de solicitudes. Cada uno coge una
              cuando puede.
            </p>
          </div>
          <div className="space-y-2">
            <h4 className="font-semibold text-orange-600">
              ⏱️ Control de velocidad
            </h4>
            <p className="text-sm text-muted-foreground">
              Una tienda controla cuánta gente entra a la vez. Max 5 personas →
              buzón con límite.
            </p>
          </div>
        </div>
      </div>

      {/* Controles */}
      <div className="space-y-4 rounded-lg border border-border bg-card p-6">
        <p className="text-lg text-muted-foreground">
          Imagina un buzón postal donde unas personas dejan mensajes y otros los
          reciben
        </p>
        <h2 className="text-2xl font-semibold mb-4">
          Simulación: Buzón de Mensajes
        </h2>

        <div className="grid gap-4 md:grid-cols-3 mb-4">
          <div>
            <label className="text-sm font-semibold mb-2 block">
              Personas que dejan mensajes: {producerCount}
            </label>
            <input
              type="range"
              min="1"
              max="5"
              value={producerCount}
              onChange={(e) => setProducerCount(parseInt(e.target.value))}
              disabled={isRunning}
              className="w-full"
            />
          </div>
          <div>
            <label className="text-sm font-semibold mb-2 block">
              Personas que leen mensajes: {consumerCount}
            </label>
            <input
              type="range"
              min="1"
              max="5"
              value={consumerCount}
              onChange={(e) => setConsumerCount(parseInt(e.target.value))}
              disabled={isRunning}
              className="w-full"
            />
          </div>
          <div>
            <label className="text-sm font-semibold mb-2 block">
              Tipo de Buzón:
            </label>
            <select
              value={mode}
              onChange={(e) =>
                setMode(e.target.value as "unbuffered" | "buffered")
              }
              disabled={isRunning}
              className="w-full px-3 py-2 border border-border rounded bg-card"
            >
              <option value="unbuffered">
                Buzón Directo (Persona a Persona)
              </option>
              <option value="buffered">
                Buzón Compartido (Almacena mensajes)
              </option>
            </select>
          </div>
        </div>

        <div className="flex gap-2">
          <Button
            onClick={runChannelSimulation}
            disabled={isRunning}
            className="bg-blue-600 hover:bg-blue-700"
          >
            ▶ Iniciar
          </Button>
          <Button onClick={reset} variant="outline" disabled={isRunning}>
            Reiniciar
          </Button>
        </div>

        {/* Descripción del modo */}
        <div className="mt-4 p-4 bg-muted rounded-lg">
          <p className="text-sm text-muted-foreground">
            {mode === "unbuffered" ? (
              <>
                <strong>Buzón Directo:</strong> Quien deja el mensaje debe
                esperar a que alguien lo reciba inmediatamente. Es como una
                llamada telefónica: ambos deben estar presentes al mismo tiempo.
              </>
            ) : (
              <>
                <strong>Buzón Compartido:</strong> Quien deja el mensaje no
                espera. Los mensajes se guardan en el buzón hasta que alguien
                los recoja. Es como un buzón postal normal.
              </>
            )}
          </p>
        </div>
      </div>

      {/* Visualización de mensajes */}
      {messages.length > 0 && (
        <div className="space-y-4 rounded-lg border border-border bg-card p-6">
          <h3 className="text-xl font-semibold">
            Flujo de Mensajes ({messages.length} en total)
          </h3>

          <div className="space-y-3 max-h-[400px] overflow-y-auto">
            {messages.map((msg) => (
              <div
                key={msg.id}
                className="p-3 rounded-lg border border-border bg-muted/30"
              >
                <div className="flex items-center justify-between mb-2">
                  <div className="flex items-center gap-2">
                    <div
                      className={`w-3 h-3 rounded-full ${getStatusColor(msg.status)}`}
                    />
                    <span className="font-mono text-sm font-semibold">
                      Msg #{msg.id}
                    </span>
                    <span className="text-sm font-medium">{msg.from}</span>
                  </div>
                  <span className="text-xs bg-primary/20 text-primary px-2 py-1 rounded">
                    {getStatusLabel(msg.status)}
                  </span>
                </div>
                <p className="text-sm text-muted-foreground">
                  💬 "{msg.content}"
                </p>
              </div>
            ))}
          </div>

          <div className="grid gap-4 md:grid-cols-3 pt-4 border-t border-border">
            <div>
              <p className="text-sm text-muted-foreground">Total de mensajes</p>
              <p className="text-2xl font-bold">{messages.length}</p>
            </div>
            <div>
              <p className="text-sm text-muted-foreground">✓ Entregados</p>
              <p className="text-2xl font-bold text-green-600">
                {messages.filter((m) => m.status === "delivered").length}
              </p>
            </div>
            <div>
              <p className="text-sm text-muted-foreground">
                ⏳ Esperando o en camino
              </p>
              <p className="text-2xl font-bold text-yellow-600">
                {messages.filter((m) => m.status !== "delivered").length}
              </p>
            </div>
          </div>
        </div>
      )}

      {/* Explicación conceptual */}
      <div className="grid gap-6 md:grid-cols-2">
        <div className="space-y-4 rounded-lg border border-blue-600 bg-blue-600/10 p-6">
          <h3 className="text-xl font-semibold text-blue-700">
            📤 Quién deja mensajes
          </h3>
          <div className="space-y-2 text-sm">
            <p>
              Estas son las personas que{" "}
              <strong>escriben y dejan mensajes</strong> en el buzón.
            </p>
            <div className="rounded bg-black/10 p-3 font-mono text-xs space-y-1">
              <div>Juan: "Hola, ¿cómo estás?"</div>
              <div>María: "Necesito ayuda"</div>
              <div>Pedro: "¿Nos vemos?"</div>
            </div>
            <p className="text-muted-foreground">
              Pueden trabajar independientemente. Cada uno deja sus mensajes
              cuando quiere.
            </p>
          </div>
        </div>

        <div className="space-y-4 rounded-lg border border-green-600 bg-green-600/10 p-6">
          <h3 className="text-xl font-semibold text-green-700">
            📥 Quién lee mensajes
          </h3>
          <div className="space-y-2 text-sm">
            <p>
              Estas son las personas que{" "}
              <strong>leen y reciben los mensajes</strong> del buzón.
            </p>
            <div className="rounded bg-black/10 p-3 font-mono text-xs space-y-1">
              <div>Ana: Lee el mensaje de Juan</div>
              <div>Carlos: Lee el mensaje de María</div>
            </div>
            <p className="text-muted-foreground">
              Procesan los mensajes conforme están disponibles. No se estorban
              entre sí.
            </p>
          </div>
        </div>
      </div>

      {/* Diferencia unbuffered vs buffered */}
      <div className="grid gap-6 md:grid-cols-2">
        <div className="space-y-4 rounded-lg border border-orange-600 bg-orange-600/10 p-6">
          <h3 className="text-xl font-semibold text-orange-700">
            🤝 Buzón Directo (Persona a Persona)
          </h3>
          <div className="space-y-3 text-sm">
            <div>
              <p className="font-semibold">¿Cómo funciona?</p>
              <p className="text-muted-foreground">
                Juan entrega el mensaje directamente a Ana. Juan espera hasta
                que Ana lo reciba. Es un intercambio directo, cara a cara.
              </p>
            </div>
            <div className="space-y-1">
              <p className="font-semibold text-xs">Ventajas:</p>
              <ul className="text-xs text-muted-foreground list-disc list-inside">
                <li>Garantía de que llega el mensaje</li>
                <li>Comunicación sincronizada</li>
                <li>Sin confusiones</li>
              </ul>
            </div>
          </div>
        </div>

        <div className="space-y-4 rounded-lg border border-purple-600 bg-purple-600/10 p-6">
          <h3 className="text-xl font-semibold text-purple-700">
            � Buzón Compartido (Almacena)
          </h3>
          <div className="space-y-3 text-sm">
            <div>
              <p className="font-semibold">¿Cómo funciona?</p>
              <p className="text-muted-foreground">
                Juan deja el mensaje en el buzón compartido sin esperar. Ana lo
                recoge cuando quiere. Como un buzón postal normal en la calle.
              </p>
            </div>
            <div className="space-y-1">
              <p className="font-semibold text-xs">Ventajas:</p>
              <ul className="text-xs text-muted-foreground list-disc list-inside">
                <li>Mayor libertad</li>
                <li>No hay esperas</li>
                <li>Más flexible</li>
              </ul>
            </div>
          </div>
        </div>
      </div>

      {/* Errores comunes */}
      <div className="space-y-4 rounded-lg border border-destructive/50 bg-destructive/5 p-6">
        <h2 className="text-2xl font-semibold text-destructive">
          ⚠️ Errores comunes que debes evitar
        </h2>
        <div className="space-y-3">
          <div className="flex gap-3">
            <span className="text-destructive font-bold text-xl">✗</span>
            <div>
              <h4 className="font-semibold">Enviar a un buzón cerrado</h4>
              <p className="text-sm text-muted-foreground">
                El sistema hace "crash". Es como dejar un mensaje en un buzón
                que fue demolido.
              </p>
            </div>
          </div>
          <div className="flex gap-3">
            <span className="text-destructive font-bold text-xl">✗</span>
            <div>
              <h4 className="font-semibold">Espera infinita (Deadlock)</h4>
              <p className="text-sm text-muted-foreground">
                Juan espera a Ana, pero Ana está esperando a Juan. Nunca pasa
                nada.
              </p>
            </div>
          </div>
          <div className="flex gap-3">
            <span className="text-destructive font-bold text-xl">✗</span>
            <div>
              <h4 className="font-semibold">Goroutines que no terminan</h4>
              <p className="text-muted-foreground">
                Olvidar cerrar el buzón = trabajadores que nunca se van a casa.
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Tips */}
      <div className="space-y-4 rounded-lg border border-green-600 bg-green-600/10 p-6">
        <h2 className="text-2xl font-semibold text-green-700">
          💡 Reglas de Oro
        </h2>
        <ul className="space-y-2 text-sm">
          <li className="flex gap-2">
            <span className="text-green-600">✓</span>
            <span>
              <strong>Quien crea el buzón lo cierra:</strong> Si abres el buzón,
              tú lo cierras.
            </span>
          </li>
          <li className="flex gap-2">
            <span className="text-green-600">✓</span>
            <span>
              <strong>Solo quien pone mensajes los cierra:</strong> Quien deja
              mensajes cierra el buzón, no quien los lee.
            </span>
          </li>
          <li className="flex gap-2">
            <span className="text-green-600">✓</span>
            <span>
              <strong>Usa buzón compartido para más libertad:</strong> Si
              productores y consumidores van a distintas velocidades, usa
              buffers.
            </span>
          </li>
          <li className="flex gap-2">
            <span className="text-green-600">✓</span>
            <span>
              <strong>Siempre ten un tiempo máximo:</strong> No esperes
              indefinidamente. Pon un límite de tiempo para evitar bloqueos.
            </span>
          </li>
        </ul>
      </div>
    </div>
  );
}
