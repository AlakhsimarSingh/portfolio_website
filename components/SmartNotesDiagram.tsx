import styles from "./SmartNotesDiagram.module.css";

type BoxProps = { x: number; y: number; w: number; h: number; title: string; lines?: string[] };

function Box({ x, y, w, h, title, lines = [] }: BoxProps) {
  return (
    <g>
      <rect className={styles.box} x={x} y={y} width={w} height={h} rx={3} />
      <text className={styles.title} x={x + 14} y={y + 24}>{title}</text>
      {lines.map((line, i) => (
        <text key={line} className={styles.line} x={x + 14} y={y + 46 + i * 18}>{line}</text>
      ))}
    </g>
  );
}

function Label({ x, y, children, anchor = "start" }: { x: number; y: number; children: string; anchor?: "start" | "end" }) {
  return <text className={styles.label} x={x} y={y} textAnchor={anchor}>{children}</text>;
}

// Three Node processes (API, collab server, worker) sharing one Postgres database.
// Layout: browser and LLM APIs on the left, processes in the middle, Postgres on the right.
export default function SmartNotesDiagram() {
  return (
    <figure className={styles.figure}>
      <div className={styles.scroll}>
        <svg
          className={styles.svg}
          viewBox="0 0 960 490"
          role="img"
          aria-labelledby="sn-diagram-title sn-diagram-desc"
        >
          <title id="sn-diagram-title">Smart Notes Platform architecture</title>
          <desc id="sn-diagram-desc">
            The Next.js client talks to a NestJS API over HTTP and Socket.IO, and to a separate
            Hocuspocus collaboration server over a Yjs WebSocket. The API enqueues jobs in Redis
            for a BullMQ worker that summarizes, chunks and embeds notes, then notifies the API.
            All three processes persist to PostgreSQL. The API and worker call Groq and Cohere.
          </desc>
          <defs>
            <marker id="sn-arrow" viewBox="0 0 10 10" refX="9" refY="5" markerWidth="7" markerHeight="7" orient="auto-start-reverse">
              <path className={styles.head} d="M0,0 L10,5 L0,10 z" />
            </marker>
          </defs>

          <Box x={20} y={130} w={200} h={200} title="Browser · Next.js" lines={["TipTap editor", "Hocuspocus provider", "Socket.IO client", "3D graph (Three.js)"]} />
          <Box x={20} y={380} w={200} h={90} title="LLM APIs" lines={["Groq · Llama 3.3 70B", "Cohere rerank-v3.5"]} />

          <Box x={330} y={20} w={230} h={100} title="Collab server · Hocuspocus" lines={["JWT check · read-only viewers", "debounced Yjs persistence"]} />
          <Box x={330} y={170} w={230} h={100} title="API · NestJS" lines={["REST · JWT · sharing · RAG chat", "Socket.IO gateway"]} />
          <Box x={330} y={300} w={110} h={40} title="Redis · BullMQ" />
          <Box x={330} y={370} w={230} h={100} title="AI worker · BullMQ" lines={["summarize → chunk 200w / 40", "MiniLM 384-d embeddings"]} />

          <Box x={700} y={20} w={240} h={450} title="PostgreSQL · Prisma" lines={["notes (HTML)", "yjsState (binary)", "note chunks + embeddings", "shares · roles", "chat history"]} />

          <g className={styles.arrows} markerEnd="url(#sn-arrow)">
            <path d="M220,170 H300 V70 H330" />
            <path d="M220,220 H330" />
            <path d="M330,250 H220" />
            <path d="M560,70 H700" />
            <path d="M560,220 H700" />
            <path d="M560,420 H700" />
            <path d="M385,270 V300" />
            <path d="M385,340 V370" />
            <path d="M520,370 V270" />
            <path d="M345,270 V285 H275 V400 H220" />
            <path d="M330,440 H220" />
          </g>

          <Label x={229} y={160}>Yjs · WS</Label>
          <Label x={229} y={212}>HTTP · stream</Label>
          <Label x={229} y={266}>Socket.IO push</Label>
          <Label x={269} y={345} anchor="end">RAG calls</Label>
          <Label x={229} y={432}>summarize</Label>
          <Label x={570} y={62}>Yjs state + HTML</Label>
          <Label x={570} y={212}>Prisma</Label>
          <Label x={570} y={412}>summary · chunks</Label>
          <Label x={392} y={290}>enqueue</Label>
          <Label x={527} y={325}>notify</Label>
        </svg>
      </div>
      <figcaption className={styles.caption}>
        Three Node processes share one database. Collaboration runs in its own WebSocket server;
        AI work runs off the request path in a queue worker.
      </figcaption>
    </figure>
  );
}
