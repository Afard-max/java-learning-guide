import { useState, useEffect, useRef } from "react";

const phases = [
  {
    id: "0",
    emoji: "0️⃣",
    color: "#f59e0b",
    label: "Fase 0",
    title: "Fundamentos Absolutos",
    duration: "0–1 mes",
    topics: [
      { title: "¿Qué es programar?", desc: "Dar instrucciones a una máquina para que realice tareas. Como escribir una receta de cocina paso a paso.", icon: "💡" },
      { title: "¿Por qué Java?", desc: "Portabilidad (WORA), ecosistema maduro (Spring, Hibernate), rendimiento JIT y soporte LTS.", icon: "☕" },
      { title: "Instalación del entorno", desc: "JDK 21, IntelliJ IDEA Community o VS Code, Maven. Verifica con java -version y mvn -v.", icon: "⚙️" },
      { title: "¿Cómo funciona la JVM?", desc: "Class Loader, Bytecode, JIT Compiler y Garbage Collector. La cocina que procesa tus instrucciones.", icon: "🔬" },
    ],
  },
  {
    id: "1",
    emoji: "1️⃣",
    color: "#10b981",
    label: "Fase 1",
    title: "Fundamentos del Lenguaje",
    duration: "0–1 mes",
    topics: [
      { title: "Sintaxis básica", desc: "Java es case-sensitive. Cada archivo .java contiene una clase pública. Sistema.out.println para salida estándar.", icon: "📝" },
      { title: "Tipos de datos", desc: "byte, short, int, long, float, double, char, boolean, String. Tipado estático y fuerte.", icon: "🔢" },
      { title: "Estructuras de control", desc: "if/else, switch, for, while, do-while, break, continue. Controla el flujo del programa.", icon: "🔀" },
      { title: "POO – Clases y Objetos", desc: "Encapsulamiento, herencia, polimorfismo, interfaces. Los 4 pilares de la orientación a objetos.", icon: "🏗️" },
    ],
  },
  {
    id: "2",
    emoji: "2️⃣",
    color: "#3b82f6",
    label: "Fase 2",
    title: "Maven y Ecosistema",
    duration: "1–3 meses",
    topics: [
      { title: "Maven: gestión de dependencias", desc: "Descarga automáticamente Spring, JPA y sus transitivas desde Maven Central. mvn clean install.", icon: "📦" },
      { title: "Ciclo de vida del build", desc: "validate → compile → test → package → verify → install → deploy. Cada fase tiene un propósito.", icon: "🔄" },
      { title: "Perfiles (profiles)", desc: "Conjunto de configuraciones activables por condición. -Dspring.profiles.active=prod", icon: "🎭" },
      { title: "Estructura de proyecto", desc: "src/main/java, src/test/java, pom.xml. Convención sobre configuración.", icon: "📁" },
    ],
  },
  {
    id: "3",
    emoji: "3️⃣",
    color: "#8b5cf6",
    label: "Fase 3",
    title: "Spring Boot & APIs REST",
    duration: "3–6 meses",
    topics: [
      { title: "Spring Boot MVC", desc: "@RestController, @GetMapping, @PostMapping. Patrón Modelo-Vista-Controlador para APIs.", icon: "🌐" },
      { title: "JPA / Hibernate", desc: "@Entity, @Repository, Spring Data JPA. ORM para mapear clases Java a tablas de base de datos.", icon: "🗄️" },
      { title: "Seguridad básica", desc: "Spring Security, JWT, autenticación y autorización. Diferentes filtros por perfil dev/prod.", icon: "🔒" },
      { title: "Tests con JUnit 5", desc: "@Test, @SpringBootTest, @MockBean, AssertJ. TDD y cobertura de código.", icon: "🧪" },
    ],
  },
  {
    id: "4",
    emoji: "4️⃣",
    color: "#ef4444",
    label: "Fase 4",
    title: "Proyecto Completo + DevOps",
    duration: "6–12 meses",
    topics: [
      { title: "CRUD completo", desc: "API REST con Spring Boot + PostgreSQL. Arquitectura limpia, capas Service/Repository/Controller.", icon: "🏆" },
      { title: "Docker & Contenedores", desc: "Dockerfile multi-stage, perfiles Maven, imágenes específicas por entorno (dev/prod).", icon: "🐳" },
      { title: "CI/CD GitHub Actions", desc: "Pipeline automático: build → test → push a GHCR en cada push al branch main.", icon: "🚀" },
      { title: "Observabilidad", desc: "Spring Boot Actuator, Micrometer → Prometheus y Jaeger para métricas y trazas.", icon: "📊" },
    ],
  },
];

const roadmap = [
  { time: "0–1 mes", phase: "Fase 0 + Fase 1", result: "Comprender conceptos de programación y dominar la sintaxis básica de Java." },
  { time: "1–3 meses", phase: "Fase 2", result: "Manejar Maven, crear proyectos estructurados y entender el ciclo de vida de construcción." },
  { time: "3–6 meses", phase: "Fase 3", result: "Construir APIs REST con Spring Boot, aplicar MVC, JPA y seguridad básica." },
  { time: "6–12 meses", phase: "Fase 4", result: "Desarrollar un proyecto completo (CRUD) y aplicar buenas prácticas de arquitectura limpia y pruebas." },
  { time: "Continuo", phase: "Práctica constante", result: "Consolidar conocimientos, obtener certificaciones y participar en proyectos reales." },
];

const jvmComponents = [
  { name: "Class Loader", desc: "Carga los archivos .class (bytecode) en memoria.", color: "#f59e0b" },
  { name: "Bytecode", desc: "Código intermedio que la JVM interpreta o compila en tiempo de ejecución.", color: "#10b981" },
  { name: "JIT Compiler", desc: "Convierte bytecode en código máquina nativo para acelerar la ejecución.", color: "#3b82f6" },
  { name: "Garbage Collector", desc: "Libera memoria que ya no se usa, evitando fugas de memoria.", color: "#8b5cf6" },
];

const resources = [
  { label: "Java SE 21 API Docs", url: "https://docs.oracle.com/en/java/javase/21/docs/api/", tag: "Oficial" },
  { label: "Head First Java", url: "https://www.oreilly.com/library/view/head-first-java/9781492072508/", tag: "Libro" },
  { label: "Coursera Java", url: "https://www.coursera.org/specializations/java-programming", tag: "Curso" },
  { label: "OpenJDK", url: "https://openjdk.org", tag: "OpenSource" },
  { label: "Certificación Oracle", url: "https://education.oracle.com/oracle-certified-associate-java-se-21/", tag: "Cert" },
  { label: "Spring Guides", url: "https://spring.io/guides", tag: "Framework" },
];

const nextSteps = [
  { topic: "Docker Compose Dev", action: "Añade un servicio PostgreSQL y monta volúmenes para hot-reload del código." },
  { topic: "Kubernetes", action: "Crea Deployment y Service que apunten a la imagen :latest. Usa ConfigMap/Secret." },
  { topic: "Spring Cloud Config", action: "Centraliza la configuración de todos los micro-servicios en un servidor Config." },
  { topic: "Observabilidad", action: "Integra Actuator y Micrometer → exporta métricas a Prometheus y trazas a Jaeger." },
  { topic: "Testing avanzado", action: "Implementa pruebas de integración con Testcontainers para base de datos real." },
  { topic: "Seguridad JWT", action: "Añade Spring Security con JWT y configura filtros por perfil dev/prod." },
];

function useInView(threshold = 0.15) {
  const ref = useRef(null);
  const [visible, setVisible] = useState(false);
  useEffect(() => {
    const obs = new IntersectionObserver(([e]) => { if (e.isIntersecting) setVisible(true); }, { threshold });
    if (ref.current) obs.observe(ref.current);
    return () => obs.disconnect();
  }, []);
  return [ref, visible];
}

function FadeIn({ children, delay = 0, className = "" }) {
  const [ref, visible] = useInView();
  return (
    <div
      ref={ref}
      className={className}
      style={{
        opacity: visible ? 1 : 0,
        transform: visible ? "translateY(0)" : "translateY(28px)",
        transition: `opacity 0.65s ease ${delay}ms, transform 0.65s ease ${delay}ms`,
      }}
    >
      {children}
    </div>
  );
}

function ContinuoCard() {
  const [open, setOpen] = useState(false);
  const color = "#f59e0b";
  const items = [
    { icon: "🏅", title: "Oracle Certified Associate", desc: "Certifica tus conocimientos de Java SE 21 con el examen oficial de Oracle. Muy valorado en el mercado laboral." },
    { icon: "🌍", title: "Contribuir a proyectos reales", desc: "Participa en proyectos open source en GitHub. Lee issues, abre PRs y aplica lo aprendido en código real con feedback de la comunidad." },
    { icon: "🎓", title: "Spring Professional Certification", desc: "Certificación oficial de VMware para Spring Framework. Demuestra dominio avanzado de Spring Boot, MVC, Security y Data." },
    { icon: "🤝", title: "Participar en comunidades", desc: "Únete a foros (Stack Overflow, Reddit r/java), meetups locales y grupos de Discord. Aprender con otros acelera el crecimiento." },
  ];

  return (
    <FadeIn delay={phases.length * 80}>
      <div
        style={{
          background: "#0f1117",
          border: `1px solid ${open ? color : "#1e2130"}`,
          borderRadius: 16,
          overflow: "hidden",
          transition: "border-color 0.3s",
          cursor: "pointer",
        }}
        onClick={() => setOpen(!open)}
      >
        {/* Header */}
        <div style={{ padding: "24px 28px", display: "flex", alignItems: "center", gap: 16 }}>
          <div style={{
            width: 48, height: 48, borderRadius: 12,
            background: `${color}22`, border: `1px solid ${color}55`,
            display: "flex", alignItems: "center", justifyContent: "center",
            fontSize: 22, flexShrink: 0,
          }}>
            ∞
          </div>
          <div style={{ flex: 1 }}>
            <div style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: 11, color: color, textTransform: "uppercase", letterSpacing: "0.12em", marginBottom: 2 }}>
              Continuo · Sin fin
            </div>
            <h3 style={{ color: "#f1f5f9", fontFamily: "'Fraunces', serif", fontSize: 19, fontWeight: 700, margin: 0 }}>
              Práctica constante y certificaciones
            </h3>
          </div>
          <span style={{ color: open ? color : "#475569", fontSize: 20, transition: "color 0.3s, transform 0.3s", transform: open ? "rotate(180deg)" : "rotate(0deg)", display: "inline-block" }}>
            ⌄
          </span>
        </div>

        {/* Content */}
        <div style={{ maxHeight: open ? 600 : 0, overflow: "hidden", transition: "max-height 0.4s ease" }}>
          <div style={{ borderTop: `1px solid #1e2130`, padding: "20px 28px 28px", display: "grid", gridTemplateColumns: "1fr", gap: 14 }}>
            {items.map((item, i) => (
              <div key={i} style={{ background: "#131825", borderRadius: 10, padding: "18px 20px", border: "1px solid #1e2130", display: "flex", alignItems: "flex-start", gap: 16 }}>
                <div style={{ fontSize: 26, flexShrink: 0, marginTop: 2 }}>{item.icon}</div>
                <div>
                  <div style={{ color: "#e2e8f0", fontSize: 16, fontWeight: 600, marginBottom: 6 }}>{item.title}</div>
                  <div style={{ color: "#64748b", fontSize: 14, lineHeight: 1.6 }}>{item.desc}</div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </FadeIn>
  );
}

function PhaseCard({ phase, index }) {
  const [open, setOpen] = useState(false);
  return (
    <FadeIn delay={index * 80}>
      <div
        style={{
          background: "#0f1117",
          border: `1px solid ${open ? phase.color : "#1e2130"}`,
          borderRadius: 16,
          overflow: "hidden",
          transition: "border-color 0.3s",
          cursor: "pointer",
        }}
        onClick={() => setOpen(!open)}
      >
        {/* Header */}
        <div style={{ padding: "24px 28px", display: "flex", alignItems: "center", gap: 16 }}>
          <div
            style={{
              width: 48, height: 48, borderRadius: 12,
              background: `${phase.color}22`, border: `1px solid ${phase.color}55`,
              display: "flex", alignItems: "center", justifyContent: "center",
              fontSize: 22, flexShrink: 0,
            }}
          >
            {phase.emoji}
          </div>
          <div style={{ flex: 1 }}>
            <div style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 2 }}>
              <span style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: 11, color: phase.color, textTransform: "uppercase", letterSpacing: "0.12em" }}>
                {phase.label} · {phase.duration}
              </span>
            </div>
            <h3 style={{ color: "#f1f5f9", fontFamily: "'Fraunces', serif", fontSize: 19, fontWeight: 700, margin: 0 }}>
              {phase.title}
            </h3>
          </div>
          <span style={{ color: open ? phase.color : "#475569", fontSize: 20, transition: "color 0.3s, transform 0.3s", transform: open ? "rotate(180deg)" : "rotate(0deg)", display: "inline-block" }}>
            ⌄
          </span>
        </div>

        {/* Topics */}
        <div style={{
          maxHeight: open ? 400 : 0, overflow: "hidden",
          transition: "max-height 0.4s ease",
        }}>
          <div style={{ borderTop: `1px solid #1e2130`, padding: "20px 28px 28px", display: "grid", gridTemplateColumns: "1fr", gap: 14 }}>
            {phase.topics.map((t, i) => (
              <div key={i} style={{ background: "#131825", borderRadius: 10, padding: "18px 20px", border: "1px solid #1e2130", display: "flex", alignItems: "flex-start", gap: 16 }}>
                <div style={{ fontSize: 26, flexShrink: 0, marginTop: 2 }}>{t.icon}</div>
                <div>
                  <div style={{ color: "#e2e8f0", fontSize: 16, fontWeight: 600, marginBottom: 6 }}>{t.title}</div>
                  <div style={{ color: "#64748b", fontSize: 14, lineHeight: 1.6 }}>{t.desc}</div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </FadeIn>
  );
}

export default function JavaLandingPage() {
  const [activeTab, setActiveTab] = useState(0);
  const [counter, setCounter] = useState(0);
  const [mouse, setMouse] = useState({ x: -9999, y: -9999 });
  const [smoothMouse, setSmoothMouse] = useState({ x: -9999, y: -9999 });
  const [showScrollTop, setShowScrollTop] = useState(false);
  const rafRef = useRef(null);

  // Show scroll-to-top button after scrolling 400px
  useEffect(() => {
    const handleScroll = () => setShowScrollTop(window.scrollY > 400);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Track raw mouse position
  useEffect(() => {
    const handleMove = (e) => setMouse({ x: e.clientX, y: e.clientY });
    window.addEventListener("mousemove", handleMove);
    return () => window.removeEventListener("mousemove", handleMove);
  }, []);

  // Smooth lerp animation loop
  useEffect(() => {
    const lerp = (a, b, t) => a + (b - a) * t;
    const animate = () => {
      setSmoothMouse(prev => ({
        x: lerp(prev.x, mouse.x, 0.07),
        y: lerp(prev.y, mouse.y, 0.07),
      }));
      rafRef.current = requestAnimationFrame(animate);
    };
    rafRef.current = requestAnimationFrame(animate);
    return () => cancelAnimationFrame(rafRef.current);
  }, [mouse]);

  useEffect(() => {
    const interval = setInterval(() => {
      setCounter(c => (c + 1) % 3);
    }, 2000);
    return () => clearInterval(interval);
  }, []);

  const snippets = [
    `public class HolaMundo {
  public static void main(String[] args) {
    System.out.println("¡Hola, mundo!");
  }
}`,
    `@RestController
@RequestMapping("/api")
public class DemoController {
  @GetMapping("/saludo")
  public String saludo() {
    return "¡Hola desde Spring Boot!";
  }
}`,
    `mvn archetype:generate \\
  -DgroupId=com.ejemplo \\
  -DartifactId=mi-api \\
  -DarchetypeArtifactId=\\
    maven-archetype-quickstart`,
  ];

  return (
    <div style={{ background: "#080b12", color: "#cbd5e1", fontFamily: "'Inter', sans-serif", minHeight: "100vh", overflowX: "hidden" }}>

      {/* Global cursor-following glow */}
      <div style={{
        position: "fixed",
        top: 0, left: 0,
        width: "100vw", height: "100vh",
        pointerEvents: "none",
        zIndex: 9999,
        background: `radial-gradient(600px circle at ${smoothMouse.x}px ${smoothMouse.y}px, rgba(245,158,11,0.08) 0%, transparent 70%)`,
      }} />

      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Fraunces:ital,wght@0,400;0,700;0,900;1,400&family=JetBrains+Mono:wght@400;600&family=Inter:wght@300;400;500;600;700&display=swap');
        * { box-sizing: border-box; margin: 0; padding: 0; }
        ::-webkit-scrollbar { width: 6px; }
        ::-webkit-scrollbar-track { background: #0f1117; }
        ::-webkit-scrollbar-thumb { background: #1e293b; border-radius: 3px; }
        html { scroll-behavior: smooth; }
        .glow-amber { text-shadow: 0 0 40px rgba(245,158,11,0.4); }
        @keyframes pulse-dot { 0%,100% { opacity:1 } 50% { opacity:0.3 } }
        @keyframes float { 0%,100% { transform: translateY(0) } 50% { transform: translateY(-8px) } }
        @keyframes scan { 0% { top: 0 } 100% { top: 100% } }
        @keyframes blink { 0%,100% { opacity:1 } 50% { opacity:0 } }
      `}</style>

      {/* NAV */}
      <nav style={{ position: "sticky", top: 0, zIndex: 100, background: "rgba(8,11,18,0.92)", backdropFilter: "blur(12px)", borderBottom: "1px solid #1e2130", padding: "0 40px", height: 60, display: "flex", alignItems: "center", justifyContent: "space-between" }}>
        <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
          <span style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: 18, color: "#f59e0b", fontWeight: 600 }}>☕</span>
          <span style={{ fontFamily: "'Fraunces', serif", color: "#f1f5f9", fontWeight: 700, fontSize: 16 }}>Java 21 LTS</span>
          <span style={{ background: "#f59e0b22", color: "#f59e0b", fontSize: 10, padding: "2px 8px", borderRadius: 20, fontFamily: "'JetBrains Mono', monospace", border: "1px solid #f59e0b44" }}>GUÍA PRÁCTICA</span>
        </div>
        <div style={{ display: "flex", gap: 6 }}>
          {["Roadmap", "Fases", "DevOps", "Recursos"].map((item, i) => (
            <a key={i} href={`#${item.toLowerCase()}`} style={{ color: "#64748b", fontSize: 13, padding: "6px 14px", borderRadius: 8, textDecoration: "none", transition: "color 0.2s, background 0.2s" }}
              onMouseEnter={e => { e.target.style.color = "#f1f5f9"; e.target.style.background = "#1e2130"; }}
              onMouseLeave={e => { e.target.style.color = "#64748b"; e.target.style.background = "transparent"; }}>
              {item}
            </a>
          ))}
        </div>
      </nav>

      {/* HERO */}
      <header style={{ position: "relative", minHeight: "100vh", display: "flex", alignItems: "center", justifyContent: "center", overflow: "hidden", padding: "120px 40px 80px" }}>
        {/* Grid background */}
        <div style={{ position: "absolute", inset: 0, backgroundImage: "linear-gradient(rgba(245,158,11,0.04) 1px, transparent 1px), linear-gradient(90deg, rgba(245,158,11,0.04) 1px, transparent 1px)", backgroundSize: "60px 60px" }} />
        {/* Cursor-following glow — rendered via fixed so it works across the whole page */}

        <div style={{ maxWidth: 1100, width: "100%", position: "relative", zIndex: 1 }}>
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 60, alignItems: "center" }}>
            {/* Left */}
            <div>
              <div style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 24 }}>
                <span style={{ width: 8, height: 8, borderRadius: "50%", background: "#10b981", animation: "pulse-dot 2s infinite" }} />
                <span style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: 11, color: "#10b981", textTransform: "uppercase", letterSpacing: "0.2em" }}>
                  Principiantes absolutos · Desarrollo backend
                </span>
              </div>

              <h1 style={{ fontFamily: "'Fraunces', serif", fontSize: 56, fontWeight: 900, lineHeight: 1.05, color: "#f1f5f9", marginBottom: 20 }} className="glow-amber">
                Aprende<br />
                <span style={{ color: "#f59e0b", fontStyle: "italic" }}>Java 21</span><br />
                desde cero.
              </h1>

              <p style={{ fontSize: 16, color: "#64748b", lineHeight: 1.7, marginBottom: 32, maxWidth: 420 }}>
                Una guía estructurada en <strong style={{ color: "#94a3b8" }}>4 fases</strong>, desde los fundamentos absolutos hasta CI/CD con Docker y GitHub Actions. Diseñada para quienes nunca han escrito código.
              </p>

              <div style={{ background: "#0f1117", border: "1px solid #1e2130", borderLeft: "3px solid #f59e0b", borderRadius: 10, padding: "16px 20px", marginBottom: 32 }}>
                <p style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: 12, color: "#f59e0b", marginBottom: 6 }}>// consejo metodológico</p>
                <p style={{ fontSize: 13, color: "#94a3b8", lineHeight: 1.6 }}>
                  Dedica <strong style={{ color: "#f1f5f9" }}>1–2 horas al día</strong> a teoría + práctica. Usa el método{" "}
                  <em style={{ color: "#e2e8f0" }}>"leer – escribir – ejecutar – reflexionar"</em> para afianzar cada concepto.
                </p>
              </div>

              <div style={{ display: "flex", gap: 12 }}>
                <a href="#fases" style={{ background: "#f59e0b", color: "#000", padding: "12px 28px", borderRadius: 10, fontWeight: 700, fontSize: 14, textDecoration: "none", transition: "transform 0.2s, box-shadow 0.2s" }}
                  onMouseEnter={e => { e.target.style.transform = "translateY(-2px)"; e.target.style.boxShadow = "0 8px 24px rgba(245,158,11,0.3)"; }}
                  onMouseLeave={e => { e.target.style.transform = ""; e.target.style.boxShadow = ""; }}>
                  Comenzar ahora →
                </a>
                <a href="#roadmap" style={{ border: "1px solid #1e2130", color: "#94a3b8", padding: "12px 28px", borderRadius: 10, fontWeight: 500, fontSize: 14, textDecoration: "none", transition: "border-color 0.2s, color 0.2s" }}
                  onMouseEnter={e => { e.target.style.borderColor = "#f59e0b"; e.target.style.color = "#f59e0b"; }}
                  onMouseLeave={e => { e.target.style.borderColor = "#1e2130"; e.target.style.color = "#94a3b8"; }}>
                  Ver roadmap
                </a>
              </div>
            </div>

            {/* Right: Code terminal */}
            <div style={{ position: "relative" }}>
              <div style={{ background: "#0a0d14", border: "1px solid #1e2130", borderRadius: 16, overflow: "hidden", animation: "float 6s ease-in-out infinite", boxShadow: "0 32px 64px rgba(0,0,0,0.5)" }}>
                {/* Terminal bar */}
                <div style={{ background: "#111827", padding: "12px 16px", display: "flex", alignItems: "center", gap: 8, borderBottom: "1px solid #1e2130" }}>
                  <span style={{ width: 12, height: 12, borderRadius: "50%", background: "#ef4444" }} />
                  <span style={{ width: 12, height: 12, borderRadius: "50%", background: "#f59e0b" }} />
                  <span style={{ width: 12, height: 12, borderRadius: "50%", background: "#10b981" }} />
                  <span style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: 11, color: "#475569", marginLeft: 8 }}>
                    {counter === 0 ? "HolaMundo.java" : counter === 1 ? "DemoController.java" : "Terminal"}
                  </span>
                </div>
                {/* Code */}
                <div style={{ padding: "24px", fontFamily: "'JetBrains Mono', monospace", fontSize: 12.5, lineHeight: 2, minHeight: 200 }}>
                  <pre style={{ color: "#64748b", whiteSpace: "pre-wrap" }}>
                    {snippets[counter].split("\n").map((line, i) => {
                      const colored = line
                        .replace(/(public|class|static|void|return|new)/g, `<span style="color:#f59e0b">$1</span>`)
                        .replace(/(String|args|RestController|RequestMapping|GetMapping)/g, `<span style="color:#10b981">$1</span>`)
                        .replace(/(\/\/.*)/g, `<span style="color:#334155">$1</span>`)
                        .replace(/(".*?")/g, `<span style="color:#a78bfa">$1</span>`);
                      return (
                        <div key={i} style={{ display: "flex", gap: 16 }}>
                          <span style={{ color: "#1e2130", userSelect: "none", width: 20, textAlign: "right", flexShrink: 0 }}>{i + 1}</span>
                          <span dangerouslySetInnerHTML={{ __html: colored || "&nbsp;" }} style={{ color: "#94a3b8" }} />
                        </div>
                      );
                    })}
                    <span style={{ animation: "blink 1s infinite", color: "#f59e0b" }}>▌</span>
                  </pre>
                </div>
              </div>
              {/* Badges */}
              <div style={{ position: "absolute", top: -16, right: -16, background: "#131825", border: "1px solid #1e2130", borderRadius: 10, padding: "8px 14px", display: "flex", alignItems: "center", gap: 8 }}>
                <span style={{ fontSize: 18 }}>🏆</span>
                <div>
                  <div style={{ fontSize: 11, fontWeight: 700, color: "#f1f5f9" }}>0 – 12 meses</div>
                  <div style={{ fontSize: 10, color: "#475569" }}>de principiante a pro</div>
                </div>
              </div>
              <div style={{ position: "absolute", bottom: -16, left: -16, background: "#131825", border: "1px solid #1e2130", borderRadius: 10, padding: "8px 14px", display: "flex", alignItems: "center", gap: 8 }}>
                <span style={{ fontSize: 18 }}>🚀</span>
                <div>
                  <div style={{ fontSize: 11, fontWeight: 700, color: "#f1f5f9" }}>Spring Boot + Docker</div>
                  <div style={{ fontSize: 10, color: "#475569" }}>CI/CD con GitHub Actions</div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Scroll hint */}
        <div style={{ position: "absolute", bottom: 32, left: "50%", transform: "translateX(-50%)", display: "flex", flexDirection: "column", alignItems: "center", gap: 6, color: "#334155" }}>
          <span style={{ fontSize: 11, fontFamily: "'JetBrains Mono', monospace", letterSpacing: "0.15em" }}>SCROLL</span>
          <span style={{ fontSize: 20, animation: "float 2s ease-in-out infinite" }}>↓</span>
        </div>
      </header>

      {/* ROADMAP */}
      <section id="roadmap" style={{ padding: "100px 40px", maxWidth: 1100, margin: "0 auto" }}>
        <FadeIn>
          <div style={{ marginBottom: 60 }}>
            <div style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: 11, color: "#f59e0b", textTransform: "uppercase", letterSpacing: "0.2em", marginBottom: 12 }}>// roadmap_temporal.md</div>
            <h2 style={{ fontFamily: "'Fraunces', serif", fontSize: 44, fontWeight: 900, color: "#f1f5f9" }}>Roadmap estimado</h2>
          </div>
        </FadeIn>

        <div style={{ display: "flex", flexDirection: "column", gap: 0 }}>
          {roadmap.map((row, i) => (
            <FadeIn key={i} delay={i * 60}>
              <div style={{ display: "grid", gridTemplateColumns: "160px 200px 1fr", alignItems: "center", gap: 0, borderBottom: i < roadmap.length - 1 ? "1px solid #1e2130" : "none", padding: "28px 0", position: "relative" }}>
                {/* Time */}
                <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
                  <div style={{ width: 10, height: 10, borderRadius: "50%", background: ["#f59e0b","#10b981","#3b82f6","#ef4444","#8b5cf6"][i], flexShrink: 0, boxShadow: `0 0 12px ${["#f59e0b","#10b981","#3b82f6","#ef4444","#8b5cf6"][i]}66` }} />
                  <span style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: 13, color: ["#f59e0b","#10b981","#3b82f6","#ef4444","#8b5cf6"][i], fontWeight: 600 }}>{row.time}</span>
                </div>
                {/* Phase */}
                <div>
                  <span style={{ background: `${["#f59e0b","#10b981","#3b82f6","#ef4444","#8b5cf6"][i]}18`, border: `1px solid ${["#f59e0b","#10b981","#3b82f6","#ef4444","#8b5cf6"][i]}44`, color: ["#f59e0b","#10b981","#3b82f6","#ef4444","#8b5cf6"][i], padding: "4px 12px", borderRadius: 20, fontSize: 12, fontWeight: 600 }}>
                    {row.phase}
                  </span>
                </div>
                {/* Result */}
                <p style={{ color: "#64748b", fontSize: 14, lineHeight: 1.6 }}>{row.result}</p>
              </div>
            </FadeIn>
          ))}
        </div>
      </section>

      {/* JVM SECTION */}
      <section style={{ background: "#0a0d14", borderTop: "1px solid #1e2130", borderBottom: "1px solid #1e2130", padding: "80px 40px" }}>
        <div style={{ maxWidth: 1100, margin: "0 auto" }}>
          <FadeIn>
            <div style={{ marginBottom: 48 }}>
              <div style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: 11, color: "#3b82f6", textTransform: "uppercase", letterSpacing: "0.2em", marginBottom: 12 }}>// jvm_internals</div>
              <h2 style={{ fontFamily: "'Fraunces', serif", fontSize: 36, fontWeight: 900, color: "#f1f5f9" }}>¿Cómo funciona la JVM?</h2>
              <p style={{ color: "#64748b", marginTop: 8, fontSize: 15 }}>La máquina virtual que hace de Java un lenguaje "escríbelo una vez, ejecútalo en todas partes".</p>
            </div>
          </FadeIn>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(4, 1fr)", gap: 16 }}>
            {jvmComponents.map((c, i) => (
              <FadeIn key={i} delay={i * 70}>
                <div style={{ background: "#0f1117", border: `1px solid ${c.color}33`, borderRadius: 14, padding: "28px 24px", transition: "border-color 0.3s, transform 0.3s" }}
                  onMouseEnter={e => { e.currentTarget.style.borderColor = c.color; e.currentTarget.style.transform = "translateY(-4px)"; }}
                  onMouseLeave={e => { e.currentTarget.style.borderColor = `${c.color}33`; e.currentTarget.style.transform = ""; }}>
                  <div style={{ width: 40, height: 40, borderRadius: 10, background: `${c.color}18`, display: "flex", alignItems: "center", justifyContent: "center", marginBottom: 16, border: `1px solid ${c.color}33` }}>
                    <span style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: 11, color: c.color, fontWeight: 700 }}>{String(i + 1).padStart(2, "0")}</span>
                  </div>
                  <h4 style={{ color: c.color, fontWeight: 700, fontSize: 15, marginBottom: 8 }}>{c.name}</h4>
                  <p style={{ color: "#64748b", fontSize: 13, lineHeight: 1.6 }}>{c.desc}</p>
                </div>
              </FadeIn>
            ))}
          </div>
          <FadeIn delay={300}>
            <div style={{ marginTop: 32, background: "#0f1117", border: "1px solid #1e2130", borderRadius: 14, padding: "20px 24px", display: "flex", gap: 20, alignItems: "flex-start" }}>
              <span style={{ fontSize: 28, flexShrink: 0 }}>🍳</span>
              <div>
                <p style={{ color: "#94a3b8", fontSize: 13, lineHeight: 1.7 }}>
                  <strong style={{ color: "#f1f5f9" }}>Analogía:</strong> Piensa en la JVM como una cocina. El <span style={{ color: "#f59e0b" }}>Class Loader</span> es el chef que recibe los ingredientes (bytecode). El <span style={{ color: "#3b82f6" }}>JIT Compiler</span> cocina rápidamente la receta. Y el <span style={{ color: "#8b5cf6" }}>Garbage Collector</span> es el personal que limpia los platos y reutiliza los utensilios.
                </p>
              </div>
            </div>
          </FadeIn>
        </div>
      </section>

      {/* PHASES */}
      <section id="fases" style={{ padding: "100px 40px", maxWidth: 1100, margin: "0 auto" }}>
        <FadeIn>
          <div style={{ marginBottom: 60 }}>
            <div style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: 11, color: "#f59e0b", textTransform: "uppercase", letterSpacing: "0.2em", marginBottom: 12 }}>// learning_phases[]</div>
            <h2 style={{ fontFamily: "'Fraunces', serif", fontSize: 44, fontWeight: 900, color: "#f1f5f9" }}>Las 5 fases del aprendizaje</h2>
            <p style={{ color: "#64748b", marginTop: 10, fontSize: 15, maxWidth: 500 }}>Haz clic en cada fase para ver sus temas y conceptos clave. Cada fase construye sobre la anterior.</p>
          </div>
        </FadeIn>

        <div style={{ display: "grid", gridTemplateColumns: "1fr", gap: 16 }}>
          {phases.map((phase, i) => (
            <PhaseCard key={phase.id} phase={phase} index={i} />
          ))}

          {/* Continuo card — collapsible */}
          <ContinuoCard />
        </div>
      </section>

      {/* DEVOPS */}
      <section id="devops" style={{ background: "#0a0d14", borderTop: "1px solid #1e2130", padding: "100px 40px" }}>
        <div style={{ maxWidth: 1100, margin: "0 auto" }}>
          <FadeIn>
            <div style={{ marginBottom: 60 }}>
              <div style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: 11, color: "#ef4444", textTransform: "uppercase", letterSpacing: "0.2em", marginBottom: 12 }}>// docker_cicd.yml</div>
              <h2 style={{ fontFamily: "'Fraunces', serif", fontSize: 44, fontWeight: 900, color: "#f1f5f9" }}>Construcción & DevOps</h2>
            </div>
          </FadeIn>

          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr 1fr", gap: 16, marginBottom: 32 }}>
            {[
              { title: "Maven", color: "#f59e0b", icon: "📦", code: "mvn clean install -Pprod", desc: "Descarga librerías (Spring, JPA...) y sus transitivas desde Maven Central. Gestiona el ciclo de vida completo del build." },
              { title: "Spring Profiles", color: "#3b82f6", icon: "🎭", code: "-Dspring.profiles.active=prod", desc: "Configura el comportamiento por entorno (dev/prod). Separa base de datos, logging y seguridad sin duplicar código." },
              { title: "Docker + GitHub Actions", color: "#ef4444", icon: "🐳", code: "docker run -p 80:8080 demo:prod", desc: "Pipeline CI/CD que compila, testea y publica la imagen Docker en GHCR en cada push al branch main." },
            ].map((item, i) => (
              <FadeIn key={i} delay={i * 80}>
                <div style={{ background: "#0f1117", border: `1px solid ${item.color}33`, borderRadius: 16, padding: "28px 24px", height: "100%" }}>
                  <div style={{ fontSize: 28, marginBottom: 16 }}>{item.icon}</div>
                  <h3 style={{ color: "#f1f5f9", fontFamily: "'Fraunces', serif", fontSize: 18, fontWeight: 700, marginBottom: 10 }}>{item.title}</h3>
                  <p style={{ color: "#64748b", fontSize: 13, lineHeight: 1.6, marginBottom: 20 }}>{item.desc}</p>
                  <code style={{ display: "block", background: "#080b12", border: `1px solid ${item.color}22`, borderRadius: 8, padding: "10px 14px", fontFamily: "'JetBrains Mono', monospace", fontSize: 11, color: item.color }}>
                    {item.code}
                  </code>
                </div>
              </FadeIn>
            ))}
          </div>

          {/* Cheat sheet */}
          <FadeIn>
            <div style={{ background: "#0f1117", border: "1px solid #1e2130", borderRadius: 16, padding: "32px", overflow: "hidden" }}>
              <h3 style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: 12, color: "#64748b", marginBottom: 20, letterSpacing: "0.1em", textTransform: "uppercase" }}>// cheat_sheet – comandos esenciales</h3>
              <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 10 }}>
                {[
                  ["Construir imagen dev", "docker build --build-arg MAVEN_PROFILE=dev -t demo:dev ."],
                  ["Construir imagen prod", "docker build --build-arg MAVEN_PROFILE=prod -t demo:prod ."],
                  ["Ejecutar dev (8081)", "docker run -p 8081:8080 demo:dev"],
                  ["Ejecutar prod (80)", "docker run -p 80:8080 demo:prod"],
                  ["Cambiar perfil en runtime", "docker run -e SPRING_PROFILES_ACTIVE=prod ..."],
                  ["Variables de entorno DB", "docker run -e DB_USER=admin -e DB_PASS=secret ..."],
                ].map(([label, cmd], i) => (
                  <div key={i} style={{ display: "flex", gap: 12, alignItems: "flex-start", padding: "10px 0", borderBottom: i < 4 ? "1px solid #1e2130" : "none" }}>
                    <span style={{ color: "#475569", fontSize: 12, flexShrink: 0, marginTop: 1 }}>$</span>
                    <div>
                      <div style={{ color: "#64748b", fontSize: 11, marginBottom: 3 }}>{label}</div>
                      <code style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: 11, color: "#10b981" }}>{cmd}</code>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </FadeIn>
        </div>
      </section>

      {/* NEXT STEPS */}
      <section style={{ padding: "100px 40px", maxWidth: 1100, margin: "0 auto" }}>
        <FadeIn>
          <div style={{ marginBottom: 60 }}>
            <div style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: 11, color: "#8b5cf6", textTransform: "uppercase", letterSpacing: "0.2em", marginBottom: 12 }}>// next_steps[]</div>
            <h2 style={{ fontFamily: "'Fraunces', serif", fontSize: 44, fontWeight: 900, color: "#f1f5f9" }}>Próximos pasos</h2>
          </div>
        </FadeIn>
        <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: 14 }}>
          {nextSteps.map((step, i) => (
            <FadeIn key={i} delay={i * 60}>
              <div style={{ background: "#0f1117", border: "1px solid #1e2130", borderRadius: 14, padding: "22px 20px", transition: "border-color 0.3s" }}
                onMouseEnter={e => e.currentTarget.style.borderColor = "#8b5cf6"}
                onMouseLeave={e => e.currentTarget.style.borderColor = "#1e2130"}>
                <div style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: 10, color: "#8b5cf6", marginBottom: 8, letterSpacing: "0.1em" }}>PASO {String(i + 1).padStart(2, "0")}</div>
                <h4 style={{ color: "#e2e8f0", fontSize: 14, fontWeight: 700, marginBottom: 8 }}>{step.topic}</h4>
                <p style={{ color: "#64748b", fontSize: 12, lineHeight: 1.6 }}>{step.action}</p>
              </div>
            </FadeIn>
          ))}
        </div>
      </section>

      {/* RESOURCES */}
      <section id="recursos" style={{ background: "#0a0d14", borderTop: "1px solid #1e2130", padding: "100px 40px" }}>
        <div style={{ maxWidth: 1100, margin: "0 auto", textAlign: "center" }}>
          <FadeIn>
            <div style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: 11, color: "#10b981", textTransform: "uppercase", letterSpacing: "0.2em", marginBottom: 12 }}>// resources.json</div>
            <h2 style={{ fontFamily: "'Fraunces', serif", fontSize: 44, fontWeight: 900, color: "#f1f5f9", marginBottom: 48 }}>Recursos de formación continua</h2>
          </FadeIn>

          <div style={{ display: "flex", flexWrap: "wrap", gap: 14, justifyContent: "center", maxWidth: 760, margin: "0 auto" }}>
            {resources.map((r, i) => (
              <FadeIn key={i} delay={i * 50}>
                <a href={r.url} target="_blank" rel="noopener noreferrer"
                  style={{ background: "#0f1117", border: "1px solid #1e2130", borderRadius: 100, padding: "12px 24px", display: "flex", alignItems: "center", gap: 10, textDecoration: "none", transition: "border-color 0.25s, transform 0.25s, box-shadow 0.25s" }}
                  onMouseEnter={e => { e.currentTarget.style.borderColor = "#10b981"; e.currentTarget.style.transform = "translateY(-3px)"; e.currentTarget.style.boxShadow = "0 8px 24px rgba(16,185,129,0.15)"; }}
                  onMouseLeave={e => { e.currentTarget.style.borderColor = "#1e2130"; e.currentTarget.style.transform = ""; e.currentTarget.style.boxShadow = ""; }}>
                  <span style={{ background: "#10b98118", color: "#10b981", fontSize: 10, padding: "2px 8px", borderRadius: 20, fontFamily: "'JetBrains Mono', monospace", border: "1px solid #10b98133" }}>{r.tag}</span>
                  <span style={{ color: "#e2e8f0", fontSize: 14, fontWeight: 500 }}>{r.label}</span>
                  <span style={{ color: "#334155", fontSize: 12 }}>↗</span>
                </a>
              </FadeIn>
            ))}
          </div>
        </div>
      </section>

      {/* Scroll to top button */}
      <button
        onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
        style={{
          position: "fixed",
          bottom: 36,
          right: 36,
          zIndex: 10000,
          width: 48,
          height: 48,
          borderRadius: "50%",
          background: showScrollTop ? "#f59e0b" : "transparent",
          border: showScrollTop ? "none" : "none",
          boxShadow: showScrollTop ? "0 4px 24px rgba(245,158,11,0.35), 0 2px 8px rgba(0,0,0,0.4)" : "none",
          color: "#000",
          fontSize: 20,
          cursor: "pointer",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          opacity: showScrollTop ? 1 : 0,
          transform: showScrollTop ? "translateY(0) scale(1)" : "translateY(16px) scale(0.8)",
          transition: "opacity 0.35s ease, transform 0.35s ease, box-shadow 0.25s ease, background 0.25s ease",
          pointerEvents: showScrollTop ? "auto" : "none",
        }}
        onMouseEnter={e => {
          e.currentTarget.style.background = "#fbbf24";
          e.currentTarget.style.transform = "translateY(-3px) scale(1.1)";
          e.currentTarget.style.boxShadow = "0 8px 32px rgba(245,158,11,0.5), 0 2px 8px rgba(0,0,0,0.4)";
        }}
        onMouseLeave={e => {
          e.currentTarget.style.background = "#f59e0b";
          e.currentTarget.style.transform = "translateY(0) scale(1)";
          e.currentTarget.style.boxShadow = "0 4px 24px rgba(245,158,11,0.35), 0 2px 8px rgba(0,0,0,0.4)";
        }}
        title="Volver al inicio"
      >
        ↑
      </button>

      {/* FOOTER */}
      <footer style={{ borderTop: "1px solid #1e2130", padding: "40px", textAlign: "center" }}>
        <div style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: 11, color: "#334155", letterSpacing: "0.1em" }}>
          ☕ Java 21 LTS · Guía práctica para principiantes · Desarrollo web backend
        </div>
      </footer>
    </div>
  );
}