/* global React */
const { useState, useEffect, useRef, useMemo } = React;

/* ─────────── design tokens ─────────── */
const TOKENS = {
  bg: '#F5F3EC',
  bg2: '#EAE6DB',
  ink: '#0E0E0C',
  ink2: '#2B2A27',
  mute: '#6E6B63',
  line: '#CDC8B8',
  accent: '#E2512A',
  blue: '#0A2540',
  sand: '#D9CFB5',
  ok: '#2F7D4E',
};

const TYPE = {
  title: 132,
  sectionTitle: 96,
  slideTitle: 76,
  subtitle: 48,
  body: 32,
  small: 26,
  mono: 22,
  eyebrow: 20,
};
const SPACE = { pageX: 112, pageY: 96, gap: 40, titleGap: 56 };

/* ─────────── shared chrome ─────────── */
function Chrome({ index, total, label }) {
  return (
    <div className="deckchrome">
      <div className="row">
        <div className="mark">
          <div className="sq" />
          <span>Tesis · ITCA-FEPADE</span>
        </div>
        <div style={{ display: 'flex', gap: 24 }}>
          <span>{label}</span>
          <span style={{ color: TOKENS.ink }}>
            {String(index).padStart(2, '0')} / {String(total).padStart(2, '0')}
          </span>
        </div>
      </div>
      <div className="row">
        <span>Prototipo interactivo · v1.0</span>
        <span>Abril 2026</span>
      </div>
    </div>
  );
}

/* ─────────── SLIDE 1 — COVER ─────────── */
function CoverSlide() {
  const [t, setT] = useState(0);
  useEffect(() => {
    let raf, start;
    const loop = (ts) => {
      if (!start) start = ts;
      setT((ts - start) / 1000);
      raf = requestAnimationFrame(loop);
    };
    raf = requestAnimationFrame(loop);
    return () => cancelAnimationFrame(raf);
  }, []);

  // animated waveform representing voice interface
  const bars = 48;
  return (
    <div style={{ width: '100%', height: '100%', background: TOKENS.bg, position: 'relative', overflow: 'hidden' }}>
      <Chrome index={1} total={16} label="Portada" />

      {/* big display number/letter block */}
      <div style={{
        position: 'absolute', top: 0, right: 0, bottom: 0, width: '42%',
        background: TOKENS.ink, color: TOKENS.bg,
        display: 'flex', flexDirection: 'column', justifyContent: 'space-between',
        padding: '96px 80px',
      }}>
        <div style={{ fontFamily: 'JetBrains Mono, monospace', fontSize: 24, letterSpacing: '0.14em', color: 'rgba(245,243,236,0.6)' }}>
          A THESIS PROTOTYPE · 2026
        </div>

        {/* animated waveform */}
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'flex-start', gap: 6, height: 220 }}>
          {Array.from({ length: bars }).map((_, i) => {
            const phase = i * 0.22;
            const h = 30 + 90 * Math.abs(Math.sin(t * 2 + phase)) + 30 * Math.abs(Math.sin(t * 0.9 + phase * 0.5));
            const isAccent = i % 7 === 0;
            return (
              <div key={i} style={{
                width: 6, height: h,
                background: isAccent ? TOKENS.accent : 'rgba(245,243,236,0.85)',
                borderRadius: 3,
              }}/>
            );
          })}
        </div>

        <div style={{ display: 'flex', justifyContent: 'space-between', fontFamily: 'JetBrains Mono, monospace', fontSize: 18, color: 'rgba(245,243,236,0.55)' }}>
          <span>●  LIVE VOICE AGENT</span>
          <span>RAG + LLM + STT + TTS</span>
        </div>
      </div>

      {/* left side */}
      <div style={{ position: 'absolute', left: SPACE.pageX, top: 140, right: '45%' }}>
        <div style={{ display: 'flex', gap: 14, alignItems: 'center', marginBottom: 44 }}>
          <span className="chip"><span className="dot" /> PROYECTO DE TESIS</span>
        </div>

        <div className="display" style={{ fontSize: 132, lineHeight: 0.94, color: TOKENS.ink }}>
          Orientación<br/>
          <span className="italic" style={{ color: TOKENS.accent }}>vocacional</span><br/>
          con voz <span style={{ fontFamily: 'JetBrains Mono, monospace', fontSize: 68, verticalAlign: 'middle' }}>&</span> IA.
        </div>

        <div style={{ marginTop: 44, fontSize: 28, lineHeight: 1.4, color: TOKENS.ink2, maxWidth: 720 }}>
          Plataforma web adaptativa que evalúa el perfil del aspirante y recomienda carreras de ITCA-FEPADE con voz natural en tiempo real.
        </div>
      </div>

      {/* bottom-left author block */}
      <div style={{ position: 'absolute', left: SPACE.pageX, bottom: 140, display: 'flex', gap: 80 }}>
        <div>
          <div style={{ fontFamily: 'JetBrains Mono, monospace', fontSize: 14, letterSpacing: '0.16em', color: TOKENS.mute, textTransform: 'uppercase', marginBottom: 8 }}>AUTOR</div>
          <div style={{ fontSize: 24, color: TOKENS.ink, fontWeight: 500 }}>D. Orellana</div>
        </div>
        <div>
          <div style={{ fontFamily: 'JetBrains Mono, monospace', fontSize: 14, letterSpacing: '0.16em', color: TOKENS.mute, textTransform: 'uppercase', marginBottom: 8 }}>INSTITUCIÓN</div>
          <div style={{ fontSize: 24, color: TOKENS.ink, fontWeight: 500 }}>ITCA-FEPADE · Santa Tecla</div>
        </div>
        <div>
          <div style={{ fontFamily: 'JetBrains Mono, monospace', fontSize: 14, letterSpacing: '0.16em', color: TOKENS.mute, textTransform: 'uppercase', marginBottom: 8 }}>ENTREGA</div>
          <div style={{ fontSize: 24, color: TOKENS.ink, fontWeight: 500 }}>Ciclo 01 · 2026</div>
        </div>
      </div>
    </div>
  );
}

/* ─────────── SLIDE 2 — AGENDA ─────────── */
function AgendaSlide() {
  const items = [
    ['01', 'Problema',     'Distancia, dispersión y elección sin criterio.'],
    ['02', 'Evidencia',    'Encuesta a estudiantes de primer año.'],
    ['03', 'Propuesta',    'Justificación y diferenciadores frente a sistemas tradicionales.'],
    ['04', 'Objetivos',    'General y tres específicos del proyecto.'],
    ['05', 'Actores',      'Aspirante, administrador y flujo de procesos.'],
    ['06', 'Demo',         'Prueba vocacional + asistente de voz en vivo.'],
    ['07', 'Prototipo',    'Pantallas del aspirante y del panel admin.'],
    ['08', 'Arquitectura', 'Diagrama, DER, stack tecnológico y pipeline RAG.'],
    ['09', 'Alcances',     'Capacidades, limitaciones y métricas de validación.'],
    ['10', 'Cierre',       'Cronograma de hitos y presupuesto de infraestructura.'],
  ];
  return (
    <div style={{ width: '100%', height: '100%', background: TOKENS.bg, position: 'relative', padding: SPACE.pageY + 'px ' + SPACE.pageX + 'px' }}>
      <Chrome index={2} total={20} label="Agenda" />
      <div style={{ display: 'grid', gridTemplateColumns: '560px 1fr', gap: 96, height: '100%' }}>
        <div style={{ display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>
          <div className="eyebrow" style={{ marginBottom: 40 }}>ÍNDICE</div>
          <div className="display" style={{ fontSize: 112, lineHeight: 0.98 }}>
            Lo que verán<br/>
            <span className="italic" style={{ color: TOKENS.accent }}>hoy.</span>
          </div>
        </div>

        <div style={{ display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>
          {items.map(([n, t, d], i) => (
            <div key={n} style={{
              display: 'grid', gridTemplateColumns: '70px 260px 1fr',
              alignItems: 'baseline', padding: '16px 0',
              borderTop: i === 0 ? '1px solid ' + TOKENS.line : 'none',
              borderBottom: '1px solid ' + TOKENS.line,
              gap: 28,
            }}>
              <div style={{ fontFamily: 'JetBrains Mono, monospace', fontSize: 18, color: TOKENS.mute }}>{n}</div>
              <div style={{ fontFamily: 'Instrument Serif, serif', fontSize: 38, color: TOKENS.ink, letterSpacing: '-0.01em' }}>{t}</div>
              <div style={{ fontSize: 20, color: TOKENS.ink2 }}>{d}</div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

/* ─────────── SLIDE 3 — PROBLEMA ─────────── */
function ProblemSlide() {
  return (
    <div style={{ width: '100%', height: '100%', background: TOKENS.bg, position: 'relative' }}>
      <Chrome index={3} total={16} label="Problema" />
      <div style={{ padding: `${SPACE.pageY}px ${SPACE.pageX}px`, height: '100%', display: 'flex', flexDirection: 'column' }}>
        <div className="eyebrow">01 · EL PROBLEMA</div>
        <div className="display" style={{ fontSize: 84, marginTop: 28, marginBottom: 64, maxWidth: 1400 }}>
          Dos obstáculos atacamos<span style={{ color: TOKENS.accent }}>:</span> la <span className="italic">distancia</span> y la <span className="italic">decisión sin criterio.</span>
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1px 1fr', gap: 48, flex: 1 }}>
          {/* Column 1 */}
          <div>
            <div style={{ display: 'flex', gap: 20, alignItems: 'center', marginBottom: 24 }}>
              <div style={{ fontFamily: 'JetBrains Mono, monospace', fontSize: 20, color: TOKENS.accent }}>A.</div>
              <div style={{ fontFamily: 'JetBrains Mono, monospace', fontSize: 18, letterSpacing: '0.12em', textTransform: 'uppercase', color: TOKENS.mute }}>ACCESO A LA INFORMACIÓN</div>
            </div>
            <div style={{ fontFamily: 'Instrument Serif, serif', fontSize: 48, lineHeight: 1.08, color: TOKENS.ink, marginBottom: 28 }}>
              Aspirantes viajan hasta <span style={{ color: TOKENS.accent }}>1h 30 min</span> desde el occidente sólo para resolver dudas básicas.
            </div>
            <div style={{ fontSize: TYPE.body, lineHeight: 1.4, color: TOKENS.ink2, maxWidth: 640 }}>
              El proceso actual depende del personal y de documentos estáticos en sitios web y redes sociales. La información queda dispersa, el primer contacto es costoso y limita el alcance institucional.
            </div>

            <div style={{ marginTop: 56, display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 16 }}>
              {[['~90 min','viaje promedio'],['24/7','disponibilidad hoy: no'],['N canales','información dispersa']].map(([n,l])=>(
                <div key={l} style={{ padding: '20px 24px', border: `1px solid ${TOKENS.line}`, background: 'rgba(255,255,255,0.35)' }}>
                  <div style={{ fontFamily: 'Instrument Serif, serif', fontSize: 36, color: TOKENS.ink }}>{n}</div>
                  <div style={{ fontFamily: 'JetBrains Mono, monospace', fontSize: 14, color: TOKENS.mute, textTransform: 'uppercase', letterSpacing: '0.08em', marginTop: 6 }}>{l}</div>
                </div>
              ))}
            </div>
          </div>

          <div style={{ background: TOKENS.line, width: 1 }} />

          {/* Column 2 */}
          <div>
            <div style={{ display: 'flex', gap: 20, alignItems: 'center', marginBottom: 24 }}>
              <div style={{ fontFamily: 'JetBrains Mono, monospace', fontSize: 20, color: TOKENS.accent }}>B.</div>
              <div style={{ fontFamily: 'JetBrains Mono, monospace', fontSize: 18, letterSpacing: '0.12em', textTransform: 'uppercase', color: TOKENS.mute }}>DECISIÓN VOCACIONAL</div>
            </div>
            <div style={{ fontFamily: 'Instrument Serif, serif', fontSize: 48, lineHeight: 1.08, color: TOKENS.ink, marginBottom: 28 }}>
              Estudiantes eligen carrera por el <span className="italic">nombre</span>, sin evaluar afinidad ni entender las materias.
            </div>
            <div style={{ fontSize: TYPE.body, lineHeight: 1.4, color: TOKENS.ink2, maxWidth: 640 }}>
              El resultado es un ciclo conocido: bajo rendimiento, desmotivación y deserción temprana — pérdida para el estudiante y para la institución.
            </div>

            <div style={{ marginTop: 56, display: 'flex', gap: 12, alignItems: 'stretch', height: 140 }}>
              {[
                { l: 'Curso', c: TOKENS.sand, h: 100 },
                { l: '1er año', c: TOKENS.accent, h: 72 },
                { l: '2do año', c: TOKENS.accent, h: 48 },
                { l: 'Graduado', c: TOKENS.blue, h: 38 },
              ].map(({l,c,h},i)=>(
                <div key={l} style={{ flex: 1, display: 'flex', flexDirection: 'column', justifyContent: 'flex-end' }}>
                  <div style={{ height: h + '%', background: c, transition: 'all .4s' }} />
                  <div style={{ fontFamily: 'JetBrains Mono, monospace', fontSize: 14, color: TOKENS.mute, marginTop: 10, letterSpacing: '0.08em', textTransform: 'uppercase' }}>{l}</div>
                </div>
              ))}
            </div>
            <div style={{ fontFamily: 'JetBrains Mono, monospace', fontSize: 14, color: TOKENS.mute, marginTop: 20, letterSpacing: '0.08em', textTransform: 'uppercase' }}>
              FIG · EMBUDO DE DESERCIÓN (ilustrativo)
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

/* ─────────── SLIDE 4 — ENCUESTA ─────────── */
function SurveySlide() {
  const [active, setActive] = useState(0);
  const data = [
    { label: 'Quisieron una herramienta digital de orientación', value: 25, of: 35, color: TOKENS.accent, detail: 'Indicaron que les hubiera gustado contar con una herramienta digital — especialmente con funciones interactivas como voz y evaluación adaptativa.' },
    { label: 'Considera importante la orientación vocacional', value: 33, of: 35, color: TOKENS.blue, detail: 'Casi todos los encuestados reconocen el valor de un proceso estructurado de orientación antes de elegir carrera.' },
  ];
  const d = data[active];
  const pct = Math.round((d.value / d.of) * 100);
  return (
    <div style={{ width: '100%', height: '100%', background: TOKENS.bg, position: 'relative' }}>
      <Chrome index={4} total={16} label="Evidencia" />
      <div style={{ padding: `${SPACE.pageY}px ${SPACE.pageX}px`, height: '100%' }}>
        <div className="eyebrow">02 · ENCUESTA DE NUEVO INGRESO</div>
        <div className="display" style={{ fontSize: 72, marginTop: 20, marginBottom: 16, maxWidth: 1600 }}>
          Encuesta aplicada a <span className="italic" style={{color:TOKENS.accent}}>35 estudiantes de nuevo ingreso.</span>
        </div>
        <div style={{ fontSize: 24, color: TOKENS.ink2, marginBottom: 48, maxWidth: 1100 }}>
          Los resultados confirman una demanda clara por una herramienta digital de orientación vocacional.
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: '420px 1fr', gap: 48, alignItems: 'stretch' }}>
          {/* Tabs */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: 14 }}>
            {data.map((r, i) => (
              <button key={i} onClick={()=>setActive(i)} style={{
                textAlign: 'left', padding: '22px 24px',
                border: `1px solid ${active === i ? r.color : TOKENS.line}`,
                background: active === i ? r.color : '#fff',
                color: active === i ? '#fff' : TOKENS.ink,
                borderRadius: 14, transition: 'all .3s',
                fontSize: 20, lineHeight: 1.35,
                cursor: 'pointer',
              }}>
                <div style={{ fontFamily: 'JetBrains Mono, monospace', fontSize: 14, letterSpacing: '0.12em', textTransform: 'uppercase', opacity: 0.7, marginBottom: 8 }}>
                  HALLAZGO 0{i+1}
                </div>
                <div style={{ fontFamily: 'Instrument Serif, serif', fontSize: 36, lineHeight: 1, marginBottom: 6 }}>
                  {r.value}<span style={{ opacity: 0.5, fontSize: 24 }}>/{r.of}</span>
                </div>
                <div style={{ fontSize: 19 }}>{r.label}</div>
              </button>
            ))}
            <div style={{ marginTop: 4, fontFamily: 'JetBrains Mono, monospace', fontSize: 13, color: TOKENS.mute, letterSpacing: '0.08em', textTransform: 'uppercase' }}>
              ↔  CLIC PARA CAMBIAR
            </div>
          </div>

          {/* Active card */}
          <div key={active} style={{
            padding: 56, background: d.color, color: '#fff', borderRadius: 18,
            display: 'flex', flexDirection: 'column', justifyContent: 'space-between',
            minHeight: 520,
          }}>
            <div style={{ fontFamily: 'JetBrains Mono, monospace', fontSize: 14, letterSpacing: '0.14em', textTransform: 'uppercase', opacity: 0.75 }}>
              RESPUESTA · N=35
            </div>
            <div>
              <div style={{ fontFamily: 'Instrument Serif, serif', fontSize: 280, lineHeight: 0.85 }}>
                {pct}<span style={{ fontSize: 80, opacity: 0.6 }}>%</span>
              </div>
              <div style={{ fontSize: 30, lineHeight: 1.3, maxWidth: 700, marginTop: 16 }}>
                {d.detail}
              </div>
            </div>
            <div>
              <div style={{ height: 4, background: 'rgba(255,255,255,0.25)', position: 'relative', overflow: 'hidden', borderRadius: 2 }}>
                <div style={{ position: 'absolute', left: 0, top: 0, height: '100%', width: pct + '%', background: '#fff', transition: 'width .7s' }} />
              </div>
              <div style={{ display: 'flex', justifyContent: 'space-between', marginTop: 10, fontFamily: 'JetBrains Mono, monospace', fontSize: 16 }}>
                <span>{d.value} de {d.of}</span>
                <span style={{ opacity: 0.75 }}>MUESTRA · NUEVO INGRESO 2026</span>
              </div>
            </div>
          </div>
        </div>

        <div style={{ marginTop: 32, fontFamily: 'JetBrains Mono, monospace', fontSize: 14, color: TOKENS.mute, letterSpacing: '0.08em', textTransform: 'uppercase' }}>
          FUENTE · ORELLANA, D. (2026). ENCUESTA APLICADA A ESTUDIANTES DE NUEVO INGRESO · MICROSOFT FORMS · N = 35
        </div>
      </div>
    </div>
  );
}

/* ─────────── SLIDE 5 — DIFERENCIADOR ─────────── */
function DifferentiatorSlide() {
  const rows = [
    ['Interfaz', 'Formulario estático', 'Voz + texto en tiempo real'],
    ['Evaluación', 'Respuestas predefinidas', 'Análisis dinámico de perfil'],
    ['Recomendación', 'Una carrera genérica', '≥ 3 carreras + % de afinidad'],
    ['Información', 'PDF separados en web', 'Asistente RAG sobre PDF institucionales'],
    ['Privacidad', 'Datos en APIs externas', 'IA ejecutada localmente'],
    ['Experiencia', 'Una sola sesión', 'Simulación de escenarios reales'],
  ];
  return (
    <div style={{ width: '100%', height: '100%', background: TOKENS.bg, position: 'relative' }}>
      <Chrome index={5} total={16} label="Diferenciador" />
      <div style={{ padding: `${SPACE.pageY}px ${SPACE.pageX}px`, height: '100%' }}>
        <div className="eyebrow">03 · JUSTIFICACIÓN Y PROPUESTA DE VALOR</div>
        <div className="display" style={{ fontSize: 76, marginTop: 28, marginBottom: 28, maxWidth: 1500 }}>
          Más que un CRUD<span style={{color:TOKENS.accent}}>.</span> Un <span className="italic">ecosistema de IA local</span> para decidir con criterio.
        </div>

        <div style={{ display:'grid', gridTemplateColumns:'1fr 1fr', gap:40, marginBottom:36 }}>
          <div style={{ fontSize:19, lineHeight:1.55, color:TOKENS.ink2 }}>
            El proceso actual depende del personal administrativo atendiendo consultas repetitivas, saturando recursos y limitando el alcance institucional. <strong>14 de 35 estudiantes</strong> de primer año no recibieron ningún apoyo vocacional previo.
          </div>
          <div style={{ fontSize:19, lineHeight:1.55, color:TOKENS.ink2 }}>
            La plataforma implementa IA local para evaluar perfiles, recomendar carreras con nivel de afinidad y responder consultas sobre documentación institucional — sin exponer datos a APIs externas.
          </div>
        </div>

        <div style={{ border: `1px solid ${TOKENS.line}`, background: 'rgba(255,255,255,0.4)' }}>
          <div style={{ display: 'grid', gridTemplateColumns: '280px 1fr 1fr', padding: '18px 32px', borderBottom: `1px solid ${TOKENS.line}`, fontFamily: 'JetBrains Mono, monospace', fontSize: 14, letterSpacing: '0.12em', textTransform: 'uppercase', color: TOKENS.mute }}>
            <div>DIMENSIÓN</div>
            <div>SISTEMA TRADICIONAL</div>
            <div style={{ color: TOKENS.accent }}>NUESTRA PLATAFORMA</div>
          </div>
          {rows.map(([dim, trad, ours], i) => (
            <div key={dim} style={{ display: 'grid', gridTemplateColumns: '280px 1fr 1fr', padding: '26px 32px', borderBottom: i < rows.length - 1 ? `1px solid ${TOKENS.line}` : 'none', alignItems: 'center' }}>
              <div style={{ fontFamily: 'Instrument Serif, serif', fontSize: 32, color: TOKENS.ink }}>{dim}</div>
              <div style={{ fontSize: 22, color: TOKENS.mute, textDecoration: 'line-through', textDecorationColor: TOKENS.accent }}>{trad}</div>
              <div style={{ fontSize: 24, color: TOKENS.ink, fontWeight: 500 }}>{ours}</div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

/* ─────────── SLIDE 6 — OBJETIVOS ─────────── */
function GoalsSlide() {
  const specs = [
    { n:'01', t:'Diagnóstico', d:'Analizar el proceso actual de orientación y diseñar una arquitectura de IA capaz de procesar documentación institucional y una evaluación adaptativa de afinidad.' },
    { n:'02', t:'Desarrollo', d:'Construir una plataforma web responsive integrando el asistente informativo de texto/voz, el sistema de evaluación y el módulo de captación de datos.' },
    { n:'03', t:'Implementación', d:'Desplegar el ecosistema de IA en la plataforma validando su precisión técnica y usabilidad mediante pruebas con usuarios reales.' },
  ];
  return (
    <div style={{ width: '100%', height: '100%', background: TOKENS.ink, color: TOKENS.bg, position: 'relative' }}>
      <div className="deckchrome" style={{ color: 'rgba(245,243,236,0.55)' }}>
        <div className="row">
          <div className="mark" style={{ color: 'rgba(245,243,236,0.55)' }}>
            <div className="sq" style={{ background: TOKENS.bg }} />
            <span>Tesis · ITCA-FEPADE</span>
          </div>
          <div style={{ display: 'flex', gap: 24 }}>
            <span>Objetivos</span>
            <span style={{ color: TOKENS.bg }}>06 / 20</span>
          </div>
        </div>
        <div className="row" style={{ color: 'rgba(245,243,236,0.55)' }}>
          <span>Prototipo interactivo · v1.0</span>
          <span>Abril 2026</span>
        </div>
      </div>
      <div style={{ padding: `${SPACE.pageY}px ${SPACE.pageX}px`, height: '100%' }}>
        <div style={{ fontFamily: 'JetBrains Mono, monospace', fontSize: 18, letterSpacing: '0.14em', textTransform: 'uppercase', color: 'rgba(245,243,236,0.55)' }}>04 · OBJETIVOS</div>

        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 96, marginTop: 56 }}>
          <div>
            <div style={{ fontFamily: 'JetBrains Mono, monospace', fontSize: 14, letterSpacing: '0.14em', textTransform: 'uppercase', color: TOKENS.accent, marginBottom: 32 }}>OBJETIVO GENERAL</div>
            <div className="display" style={{ fontSize: 84, color: TOKENS.bg, lineHeight: 1 }}>
              Desarrollar una plataforma web de orientación vocacional que integre un <span className="italic" style={{color: TOKENS.accent}}>modelo de evaluación dinámico con chat de voz.</span>
            </div>
          </div>

          <div>
            <div style={{ fontFamily: 'JetBrains Mono, monospace', fontSize: 14, letterSpacing: '0.14em', textTransform: 'uppercase', color: 'rgba(245,243,236,0.55)', marginBottom: 32 }}>OBJETIVOS ESPECÍFICOS</div>
            {specs.map((s,i)=>(
              <div key={s.n} style={{ display: 'grid', gridTemplateColumns: '70px 1fr', gap: 24, padding: '28px 0', borderTop: `1px solid rgba(245,243,236,0.15)`, borderBottom: i === specs.length - 1 ? `1px solid rgba(245,243,236,0.15)` : 'none' }}>
                <div style={{ fontFamily: 'JetBrains Mono, monospace', fontSize: 20, color: 'rgba(245,243,236,0.55)' }}>{s.n}</div>
                <div>
                  <div style={{ fontFamily: 'Instrument Serif, serif', fontSize: 42, color: TOKENS.bg, lineHeight: 1 }}>{s.t}</div>
                  <div style={{ marginTop: 12, fontSize: 22, color: 'rgba(245,243,236,0.75)', lineHeight: 1.4 }}>{s.d}</div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

/* ─────────── SLIDE 7 — ACTORES ─────────── */
function ActorsSlide() {
  const [active, setActive] = useState('aspirante');
  const [flowStep, setFlowStep] = useState(0);
  const [autoPlay, setAutoPlay] = useState(true);

  const data = {
    aspirante: {
      title: 'Aspirante',
      subtitle: 'Usuario final · busca orientación',
      desc: 'Accede a la plataforma web, realiza la prueba vocacional (texto o voz), consulta al asistente informativo RAG y recibe recomendaciones personalizadas con nivel de afinidad.',
      color: TOKENS.accent,
      icon: '🎓',
      flow: [
        { id:'entry', label:'Accede a la web', x:80, y:180, icon:'🌐' },
        { id:'quiz', label:'Prueba vocacional', x:280, y:140, icon:'📝' },
        { id:'voice', label:'Responde (voz/texto)', x:480, y:100, icon:'🎤' },
        { id:'llm', label:'IA analiza perfil', x:680, y:140, icon:'🧠' },
        { id:'result', label:'Recomendaciones', x:880, y:180, icon:'✨' },
      ],
      connections: [[0,1],[1,2],[2,3],[3,4]],
    },
    admin: {
      title: 'Administrador',
      subtitle: 'Gestión del sistema · backend',
      desc: 'Carga documentos institucionales (PDFs), gestiona la vectorización con pgvector, configura parámetros del modelo LLM y supervisa el pipeline RAG.',
      color: TOKENS.blue,
      icon: '⚙️',
      flow: [
        { id:'upload', label:'Sube PDFs', x:80, y:180, icon:'📄' },
        { id:'chunk', label:'Chunking automático', x:280, y:140, icon:'✂️' },
        { id:'embed', label:'Embeddings (vector)', x:480, y:100, icon:'🔢' },
        { id:'store', label:'pgvector almacena', x:680, y:140, icon:'💾' },
        { id:'rag', label:'RAG disponible', x:880, y:180, icon:'🔍' },
      ],
      connections: [[0,1],[1,2],[2,3],[3,4]],
    },
  };

  const actor = data[active];

  // Auto-advance flow animation
  useEffect(() => {
    if (!autoPlay) return;
    const t = setTimeout(() => {
      setFlowStep(s => (s + 1) % (actor.flow.length + 1));
    }, 1800);
    return () => clearTimeout(t);
  }, [flowStep, active, autoPlay, actor.flow.length]);

  // Reset flow when switching actor
  useEffect(() => {
    setFlowStep(0);
  }, [active]);

  return (
    <div style={{ width: '100%', height: '100%', background: TOKENS.bg, position: 'relative' }}>
      <Chrome index={7} total={16} label="Actores" />
      <div style={{ padding: `${SPACE.pageY}px ${SPACE.pageX}px`, height: '100%' }}>
        <div className="eyebrow">05 · ROLES Y FLUJOS</div>
        <div className="display" style={{ fontSize: 76, marginTop: 20, marginBottom: 40, maxWidth: 1500 }}>
          Dos actores<span style={{color:TOKENS.accent}}>,</span> un mismo <span className="italic">motor de IA.</span>
        </div>

        {/* Actor tabs */}
        <div style={{ display: 'flex', gap: 14, marginBottom: 32 }}>
          {Object.entries(data).map(([k, v]) => (
            <button key={k} onClick={()=>setActive(k)} style={{
              padding: '16px 32px', display: 'flex', alignItems: 'center', gap: 12,
              border: `2px solid ${active === k ? v.color : TOKENS.line}`,
              background: active === k ? v.color : '#fff',
              color: active === k ? '#fff' : TOKENS.ink,
              fontFamily: 'JetBrains Mono, monospace', fontSize: 16,
              letterSpacing: '0.08em', textTransform: 'uppercase',
              borderRadius: 16, transition: 'all .3s', cursor: 'pointer',
            }}>
              <span style={{ fontSize: 24 }}>{v.icon}</span>
              {v.title}
            </button>
          ))}
          <button onClick={()=>setAutoPlay(a=>!a)} style={{
            marginLeft: 'auto', padding: '16px 24px',
            border: `1px solid ${TOKENS.line}`, background: autoPlay ? TOKENS.bg : '#fff',
            borderRadius: 16, fontFamily: 'JetBrains Mono, monospace', fontSize: 13,
            letterSpacing: '0.08em', cursor: 'pointer', color: TOKENS.ink,
          }}>
            {autoPlay ? '❚❚ PAUSAR' : '▶ PLAY'}
          </button>
        </div>

        {/* Description */}
        <div style={{ marginBottom: 32, display: 'flex', alignItems: 'center', gap: 20 }}>
          <div style={{
            width: 80, height: 80, borderRadius: '50%',
            background: actor.color, color: '#fff',
            display: 'flex', alignItems: 'center', justifyContent: 'center',
            fontSize: 40, border: `3px solid ${actor.color}`,
          }}>
            {actor.icon}
          </div>
          <div style={{ flex: 1 }}>
            <div style={{ fontFamily: 'Instrument Serif, serif', fontSize: 36, color: TOKENS.ink, lineHeight: 1 }}>{actor.title}</div>
            <div style={{ fontFamily: 'JetBrains Mono, monospace', fontSize: 13, color: TOKENS.mute, letterSpacing: '0.08em', textTransform: 'uppercase', marginTop: 4 }}>{actor.subtitle}</div>
            <div style={{ fontSize: 20, color: TOKENS.ink2, lineHeight: 1.4, marginTop: 10, maxWidth: 900 }}>{actor.desc}</div>
          </div>
        </div>

        {/* Sequential flow — clean horizontal steps */}
        <div style={{ background: '#fff', border: `1px solid ${TOKENS.line}`, borderRadius: 20, padding: '36px 32px 28px', position: 'relative' }}>

          {/* Steps row */}
          <div style={{ display: 'flex', alignItems: 'flex-start', position: 'relative' }}>
            {actor.flow.map((node, i) => {
              const isActive = flowStep === i + 1;
              const isPast = flowStep > i + 1;
              const isLast = i === actor.flow.length - 1;

              return (
                <React.Fragment key={node.id}>
                  {/* Step card */}
                  <button onClick={() => { setFlowStep(i + 1); setAutoPlay(false); }} style={{
                    flex: 1, display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 10,
                    padding: '20px 10px', border: `2px solid ${isActive ? actor.color : isPast ? TOKENS.ok : TOKENS.line}`,
                    background: isActive ? actor.color : isPast ? 'rgba(47,125,78,0.06)' : TOKENS.bg,
                    borderRadius: 16, cursor: 'pointer', transition: 'all .35s',
                    transform: isActive ? 'translateY(-6px)' : 'none',
                    boxShadow: isActive ? `0 16px 40px ${actor.color}44` : 'none',
                    position: 'relative', zIndex: 1,
                  }}>
                    {/* Step number */}
                    <div style={{
                      fontFamily: 'JetBrains Mono, monospace', fontSize: 11,
                      letterSpacing: '0.14em',
                      color: isActive ? 'rgba(255,255,255,0.8)' : isPast ? TOKENS.ok : TOKENS.mute,
                    }}>
                      {String(i+1).padStart(2,'0')}
                    </div>

                    {/* Icon circle */}
                    <div style={{
                      width: 64, height: 64, borderRadius: '50%',
                      background: isActive ? 'rgba(255,255,255,0.2)' : isPast ? TOKENS.ok : actor.color + '14',
                      display: 'flex', alignItems: 'center', justifyContent: 'center',
                      fontSize: 28, transition: 'all .35s',
                      border: `2px solid ${isActive ? 'rgba(255,255,255,0.3)' : isPast ? TOKENS.ok : actor.color + '40'}`,
                    }}>
                      {isPast ? <span style={{ color: '#fff', fontSize: 22, fontWeight: 700 }}>✓</span> : node.icon}
                    </div>

                    {/* Label */}
                    <div style={{
                      fontSize: 15, fontWeight: 600, lineHeight: 1.2, textAlign: 'center',
                      color: isActive ? '#fff' : TOKENS.ink,
                    }}>
                      {node.label}
                    </div>

                    {/* Active pulse ring */}
                    {isActive && (
                      <div style={{
                        position: 'absolute', inset: -6, borderRadius: 20,
                        border: `2px solid ${actor.color}`,
                        animation: 'pulseRingActor 1.8s infinite',
                      }}/>
                    )}
                  </button>

                  {/* Arrow connector */}
                  {!isLast && (
                    <div style={{
                      display: 'flex', alignItems: 'center', padding: '0 4px', marginTop: 52,
                      flexShrink: 0,
                    }}>
                      <div style={{
                        width: 28, height: 3,
                        background: isPast ? TOKENS.ok : flowStep === i+1 ? actor.color : TOKENS.line,
                        transition: 'background .35s',
                      }}/>
                      <div style={{
                        width: 0, height: 0,
                        borderTop: '7px solid transparent',
                        borderBottom: '7px solid transparent',
                        borderLeft: `10px solid ${isPast ? TOKENS.ok : flowStep === i+1 ? actor.color : TOKENS.line}`,
                        transition: 'border-color .35s',
                      }}/>
                    </div>
                  )}
                </React.Fragment>
              );
            })}
          </div>

          {/* Active step description bar */}
          {flowStep > 0 && (
            <div key={flowStep} style={{
              marginTop: 24, padding: '16px 24px',
              background: actor.color + '12', border: `1px solid ${actor.color}40`,
              borderRadius: 12, display: 'flex', alignItems: 'center', gap: 16,
              animation: 'fadeIn .3s',
            }}>
              <span style={{ fontSize: 28 }}>{actor.flow[flowStep-1].icon}</span>
              <div style={{ flex: 1 }}>
                <span style={{ fontFamily: 'JetBrains Mono, monospace', fontSize: 11, color: actor.color, letterSpacing: '0.14em', textTransform: 'uppercase' }}>
                  PASO {flowStep} · {actor.title.toUpperCase()}
                </span>
                <div style={{ fontSize: 20, color: TOKENS.ink, fontWeight: 600, marginTop: 2 }}>
                  {actor.flow[flowStep-1].label}
                </div>
              </div>
              {/* Progress dots */}
              <div style={{ display: 'flex', gap: 6 }}>
                {actor.flow.map((_, i) => (
                  <div key={i} style={{
                    width: i < flowStep ? 18 : 8, height: 8, borderRadius: 4,
                    background: i < flowStep ? actor.color : TOKENS.line,
                    transition: 'all .3s',
                  }}/>
                ))}
              </div>
            </div>
          )}
        </div>

        <div style={{ marginTop: 20, fontFamily: 'JetBrains Mono, monospace', fontSize: 13, letterSpacing: '0.08em', textTransform: 'uppercase', color: TOKENS.mute }}>
          ↔  CLIC EN LOS PASOS PARA EXPLORAR · LA ANIMACIÓN SE REPRODUCE AUTOMÁTICAMENTE
        </div>
      </div>
      <style>{`
        @keyframes pulseRingActor{0%,100%{opacity:0.5;transform:scale(1)}50%{opacity:0;transform:scale(1.04)}}
        @keyframes fadeIn{from{opacity:0;transform:translateY(6px)}to{opacity:1;transform:translateY(0)}}
      `}</style>
    </div>
  );
}

/* ─────────── SLIDE 8 — DEMO Prueba Vocacional (interactive) ─────────── */
const VOCATIONAL_Qs = [
  { q: '¿Qué tipo de problema disfrutas más resolver?', opts: [
    { t: 'Diseñar algo visual y con estética', tags: { mkt: 3, dis: 3, soft: 1 } },
    { t: 'Depurar y hacer que un sistema funcione', tags: { soft: 3, red: 2, mec: 1 } },
    { t: 'Optimizar un proceso físico o mecánico', tags: { mec: 3, mec_auto: 3, ele: 1 } },
    { t: 'Organizar datos y entender patrones', tags: { soft: 2, red: 2, mkt: 2 } },
  ]},
  { q: 'Prefieres trabajar con…', opts: [
    { t: 'Código y lógica', tags: { soft: 3, red: 2 } },
    { t: 'Circuitos, motores, hardware', tags: { ele: 3, mec: 3, mec_auto: 2 } },
    { t: 'Personas, marcas y mensajes', tags: { mkt: 3, dis: 2 } },
    { t: 'Herramientas de diseño y creatividad', tags: { dis: 3, mkt: 1 } },
  ]},
  { q: 'Un día ideal termina cuando…', opts: [
    { t: 'Entregaste una interfaz que se siente bien', tags: { dis: 3, soft: 2 } },
    { t: 'Lograste que una máquina funcione sola', tags: { mec_auto: 3, ele: 2, mec: 2 } },
    { t: 'Aumentaste el alcance de una campaña', tags: { mkt: 3 } },
    { t: 'Dejaste una red sin fallos', tags: { red: 3, soft: 1 } },
  ]},
  { q: 'Te llama más la atención…', opts: [
    { t: 'La IA y los algoritmos', tags: { soft: 3, red: 1 } },
    { t: 'La robótica y automatización', tags: { mec_auto: 3, mec: 2, ele: 2 } },
    { t: 'Las marcas y lo audiovisual', tags: { mkt: 3, dis: 2 } },
    { t: 'La infraestructura y la seguridad', tags: { red: 3, ele: 1 } },
  ]},
];

const CAREERS = {
  soft: { name: 'Ing. en Desarrollo de Software', color: TOKENS.accent },
  red:  { name: 'Técnico en Redes Computacionales', color: TOKENS.blue },
  mec:  { name: 'Ing. en Mecatrónica', color: '#B54A1C' },
  mec_auto: { name: 'Ing. en Automatización', color: '#7A3A15' },
  ele:  { name: 'Técnico en Electrónica Industrial', color: '#3E5C74' },
  mkt:  { name: 'Mercadeo Digital', color: '#4E5D3A' },
  dis:  { name: 'Diseño Gráfico', color: '#8A5A2B' },
};

function DemoVocationalSlide() {
  const [mode, setMode] = useState('text'); // 'text' | 'voice'
  const [step, setStep] = useState(0);       // 0..Qs.length
  const [scores, setScores] = useState({ soft:0, red:0, mec:0, mec_auto:0, ele:0, mkt:0, dis:0 });
  const [listening, setListening] = useState(false);

  const isDone = step >= VOCATIONAL_Qs.length;
  const current = VOCATIONAL_Qs[step];
  const pct = Math.round((step / VOCATIONAL_Qs.length) * 100);

  const pick = (opt) => {
    const s = { ...scores };
    Object.entries(opt.tags).forEach(([k, v]) => { s[k] = (s[k]||0) + v; });
    setScores(s);
    setStep(step + 1);
  };

  const reset = () => { setStep(0); setScores({ soft:0, red:0, mec:0, mec_auto:0, ele:0, mkt:0, dis:0 }); };

  const top = useMemo(() => {
    const total = Object.values(scores).reduce((a,b)=>a+b,0) || 1;
    return Object.entries(scores)
      .map(([k,v]) => ({ k, pct: Math.round((v/total)*100), ...CAREERS[k] }))
      .sort((a,b)=>b.pct-a.pct)
      .slice(0,3);
  }, [scores]);

  // Fake voice listening animation
  useEffect(() => {
    if (mode !== 'voice' || isDone) return;
    if (!listening) return;
    const tm = setTimeout(()=>{
      setListening(false);
      // auto pick a random answer while in voice mode
      const r = Math.floor(Math.random() * current.opts.length);
      pick(current.opts[r]);
    }, 2600);
    return () => clearTimeout(tm);
  }, [listening, mode, step]);

  return (
    <div style={{ width: '100%', height: '100%', background: TOKENS.bg, position: 'relative' }}>
      <Chrome index={10} total={20} label="Demo · prueba vocacional" />
      <div style={{ padding: `${SPACE.pageY}px ${SPACE.pageX}px`, height: '100%', display: 'grid', gridTemplateColumns: '1fr 1.1fr', gap: 72 }}>

        {/* LEFT — explanation */}
        <div style={{ display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>
          <div className="eyebrow">08 · DEMO EN VIVO</div>
          <div className="display" style={{ fontSize: 92, marginTop: 28, lineHeight: 0.98 }}>
            Prueba<br/>
            <span className="italic" style={{color: TOKENS.accent}}>vocacional adaptativa.</span>
          </div>
          <div style={{ marginTop: 44, fontSize: 24, lineHeight: 1.45, color: TOKENS.ink2, maxWidth: 560 }}>
            El modelo evalúa respuestas por texto o voz, construye un vector de afinidad y devuelve al menos <b>3 carreras</b> alineadas con el perfil del aspirante.
          </div>

          <div style={{ marginTop: 40, fontFamily: 'JetBrains Mono, monospace', fontSize: 14, color: TOKENS.mute, letterSpacing: '0.08em', textTransform: 'uppercase' }}>
            ↓  CONTESTÁ EN EL PROTOTIPO
          </div>
        </div>

        {/* RIGHT — interactive prototype */}
        <div style={{
          background: '#fff',
          border: `1px solid ${TOKENS.line}`,
          borderRadius: 24,
          boxShadow: '0 30px 80px rgba(14,14,12,0.08), 0 4px 0 0 ' + TOKENS.line,
          display: 'flex', flexDirection: 'column', overflow: 'hidden',
        }}>
          {/* Header */}
          <div style={{ padding: '20px 28px', borderBottom: `1px solid ${TOKENS.line}`, display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
              <div style={{ width: 10, height: 10, borderRadius: 5, background: TOKENS.accent }} />
              <span style={{ fontFamily: 'JetBrains Mono, monospace', fontSize: 14, letterSpacing: '0.08em' }}>orientavoz.itca</span>
              <span style={{ color: TOKENS.mute, fontSize: 14 }}>/ prueba</span>
            </div>
            <div style={{ display: 'flex', gap: 6, background: TOKENS.bg, borderRadius: 999, padding: 4 }}>
              {['text','voice'].map(m => (
                <button key={m} onClick={()=>setMode(m)} style={{
                  padding: '8px 16px', border: 0, background: mode === m ? TOKENS.ink : 'transparent',
                  color: mode === m ? TOKENS.bg : TOKENS.ink, borderRadius: 999,
                  fontFamily: 'JetBrains Mono, monospace', fontSize: 13, letterSpacing: '0.08em', textTransform: 'uppercase',
                }}>
                  {m === 'text' ? 'Texto' : 'Voz'}
                </button>
              ))}
            </div>
          </div>

          {/* Progress */}
          <div style={{ height: 3, background: TOKENS.bg, position: 'relative' }}>
            <div style={{ position: 'absolute', left: 0, top: 0, height: '100%', width: (isDone ? 100 : pct) + '%', background: TOKENS.accent, transition: 'width .4s' }}/>
          </div>

          {!isDone ? (
            <div style={{ flex: 1, padding: '36px 36px 28px', display: 'flex', flexDirection: 'column' }}>
              <div style={{ fontFamily: 'JetBrains Mono, monospace', fontSize: 13, color: TOKENS.mute, letterSpacing: '0.12em', textTransform: 'uppercase' }}>
                PREGUNTA {step+1} / {VOCATIONAL_Qs.length}
              </div>
              <div style={{ fontFamily: 'Instrument Serif, serif', fontSize: 42, color: TOKENS.ink, lineHeight: 1.1, marginTop: 12, marginBottom: 28 }}>
                {current.q}
              </div>

              {mode === 'text' ? (
                <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
                  {current.opts.map((o, i) => (
                    <button key={i} onClick={()=>pick(o)} style={{
                      textAlign: 'left', padding: '20px 24px',
                      border: `1px solid ${TOKENS.line}`, background: '#fff',
                      borderRadius: 14, fontSize: 22, color: TOKENS.ink,
                      display: 'flex', alignItems: 'center', gap: 16,
                      transition: 'all .2s',
                    }}
                    onMouseEnter={(e)=>{ e.currentTarget.style.background = TOKENS.bg; e.currentTarget.style.borderColor = TOKENS.accent; }}
                    onMouseLeave={(e)=>{ e.currentTarget.style.background = '#fff'; e.currentTarget.style.borderColor = TOKENS.line; }}>
                      <span style={{ fontFamily: 'JetBrains Mono, monospace', fontSize: 14, color: TOKENS.mute }}>{String.fromCharCode(65+i)}</span>
                      {o.t}
                    </button>
                  ))}
                </div>
              ) : (
                <div style={{ flex: 1, display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', gap: 24 }}>
                  <button onClick={()=>setListening(true)} style={{
                    width: 140, height: 140, borderRadius: '50%',
                    border: 0, background: listening ? TOKENS.accent : TOKENS.ink,
                    color: '#fff', fontSize: 56, cursor: 'pointer',
                    transition: 'all .3s',
                    boxShadow: listening ? `0 0 0 12px rgba(226,81,42,0.2), 0 0 0 28px rgba(226,81,42,0.1)` : 'none',
                  }}>
                    {listening ? '●' : '🎙'}
                  </button>
                  {listening ? (
                    <div style={{ display: 'flex', gap: 4, alignItems: 'center', height: 40 }}>
                      {Array.from({length: 24}).map((_,i)=>(
                        <div key={i} style={{
                          width: 3, borderRadius: 2, background: TOKENS.accent,
                          height: 8 + 32 * Math.abs(Math.sin(Date.now()/200 + i)),
                          animation: 'pulse 0.9s ease-in-out infinite', animationDelay: (i*0.04)+'s'
                        }}/>
                      ))}
                    </div>
                  ) : (
                    <div style={{ fontFamily: 'JetBrains Mono, monospace', fontSize: 14, color: TOKENS.mute, letterSpacing: '0.1em' }}>
                      TOCA PARA RESPONDER
                    </div>
                  )}
                  <div style={{ fontSize: 18, color: TOKENS.mute, maxWidth: 420, textAlign: 'center' }}>
                    {listening ? 'Escuchando... "Me gusta diseñar interfaces y aplicaciones."' : 'Di tu respuesta en voz alta. El modelo Whisper transcribe y el LLM analiza.'}
                  </div>
                </div>
              )}

              <div style={{ marginTop: 'auto', paddingTop: 20, display: 'flex', justifyContent: 'space-between', fontFamily: 'JetBrains Mono, monospace', fontSize: 12, color: TOKENS.mute, letterSpacing: '0.08em', textTransform: 'uppercase' }}>
                <span>Progreso · {isDone ? 100 : pct}%</span>
                <span onClick={reset} style={{cursor:'pointer'}}>↺ Reiniciar</span>
              </div>
            </div>
          ) : (
            <div style={{ flex: 1, padding: '32px 36px 28px', display: 'flex', flexDirection: 'column', gap: 14 }}>
              <div style={{ fontFamily: 'JetBrains Mono, monospace', fontSize: 13, color: TOKENS.ok, letterSpacing: '0.12em', textTransform: 'uppercase' }}>
                ● ANÁLISIS COMPLETADO
              </div>
              <div style={{ fontFamily: 'Instrument Serif, serif', fontSize: 40, color: TOKENS.ink, lineHeight: 1.05 }}>
                Tus carreras <span className="italic" style={{ color: TOKENS.accent }}>con mayor afinidad:</span>
              </div>

              <div style={{ display: 'flex', flexDirection: 'column', gap: 12, marginTop: 8 }}>
                {top.map((c, i) => (
                  <div key={c.k} style={{
                    display: 'grid', gridTemplateColumns: '40px 1fr 120px',
                    alignItems: 'center', gap: 20,
                    padding: '18px 20px',
                    border: `1px solid ${i === 0 ? c.color : TOKENS.line}`,
                    background: i === 0 ? 'rgba(226,81,42,0.06)' : '#fff',
                    borderRadius: 12,
                  }}>
                    <div style={{ fontFamily: 'Instrument Serif, serif', fontSize: 40, color: c.color }}>
                      {String(i+1).padStart(2,'0')}
                    </div>
                    <div>
                      <div style={{ fontSize: 22, color: TOKENS.ink, fontWeight: 500 }}>{c.name}</div>
                      <div style={{ height: 4, background: TOKENS.bg, marginTop: 10, borderRadius: 2, overflow: 'hidden' }}>
                        <div style={{ width: c.pct + '%', height: '100%', background: c.color, transition: 'width .6s' }}/>
                      </div>
                    </div>
                    <div style={{ textAlign: 'right' }}>
                      <div style={{ fontFamily: 'Instrument Serif, serif', fontSize: 42, color: c.color, lineHeight: 1 }}>{c.pct}<span style={{fontSize:22}}>%</span></div>
                      <div style={{ fontFamily: 'JetBrains Mono, monospace', fontSize: 11, color: TOKENS.mute, letterSpacing: '0.08em', textTransform: 'uppercase' }}>AFINIDAD</div>
                    </div>
                  </div>
                ))}
              </div>

              <button onClick={reset} style={{
                marginTop: 'auto',
                padding: '12px 20px', background: TOKENS.ink, color: TOKENS.bg,
                border: 0, borderRadius: 999, alignSelf: 'flex-start',
                fontFamily: 'JetBrains Mono, monospace', fontSize: 13, letterSpacing: '0.08em', textTransform: 'uppercase'
              }}>
                ↺ Repetir prueba
              </button>
            </div>
          )}
        </div>
      </div>
      <style>{`@keyframes pulse{0%,100%{transform:scaleY(.4)}50%{transform:scaleY(1)}}`}</style>
    </div>
  );
}

/* ─────────── SLIDE 9 — DEMO Chat de Voz (pipeline animado) ─────────── */
function DemoVoiceSlide() {
  // Diálogo pregrabado que se reproduce automáticamente
  const SCRIPT = [
    { q: '¿Cuánto cuesta la carrera de Desarrollo de Software?',
      a: 'El plan cuatrimestral de Ingeniería en Desarrollo de Software es de 350 dólares por ciclo, con seis ciclos en total. El curso de admisión tiene un costo adicional de 45 dólares.',
      c: ['Folleto 2026.pdf · p.12', 'Admisión.pdf · p.4'] },
    { q: '¿Cuándo es el próximo examen de admisión?',
      a: 'El próximo examen de admisión está programado para el 22 de junio de 2026. Las inscripciones cierran el 5 de junio.',
      c: ['Calendario-admisión.pdf · p.1'] },
    { q: '¿Ofrecen becas?',
      a: 'Sí, hay becas del 25 al 100 por ciento de la colegiatura para aspirantes con alto rendimiento académico o situación económica comprobada.',
      c: ['Reglamento-becas.pdf · p.3'] },
  ];

  const [turn, setTurn] = useState(0);       // índice de pregunta activa
  const [phase, setPhase] = useState('mic'); // mic → stt → rag → llm → tts → done
  const [log, setLog] = useState([]);        // transcripciones acumuladas
  const [paused, setPaused] = useState(false);

  // Máquina de estados automática
  useEffect(() => {
    if (paused) return;
    const durations = { mic: 2200, stt: 900, rag: 1000, llm: 1400, tts: 3200, done: 800 };
    const next = { mic:'stt', stt:'rag', rag:'llm', llm:'tts', tts:'done', done:'next' };

    const t = setTimeout(() => {
      if (phase === 'stt') {
        setLog(l => [...l, { role: 'user', t: SCRIPT[turn].q }]);
      }
      if (phase === 'tts') {
        setLog(l => [...l, { role: 'assistant', t: SCRIPT[turn].a, cites: SCRIPT[turn].c }]);
      }
      if (phase === 'done') {
        const nt = (turn + 1) % SCRIPT.length;
        if (nt === 0) setLog([]);
        setTurn(nt);
        setPhase('mic');
      } else {
        setPhase(next[phase]);
      }
    }, durations[phase]);

    return () => clearTimeout(t);
  }, [phase, turn, paused]);

  const active = SCRIPT[turn];
  const phaseOrder = ['mic','stt','rag','llm','tts','done'];
  const activeIdx = phaseOrder.indexOf(phase);

  return (
    <div style={{ width: '100%', height: '100%', background: TOKENS.ink, color: TOKENS.bg, position: 'relative', overflow: 'hidden' }}>
      <Chrome index={11} total={20} label="Demo · chat de voz" />

      {/* grid background */}
      <div style={{ position: 'absolute', inset: 0, backgroundImage: `linear-gradient(rgba(245,243,236,0.04) 1px, transparent 1px), linear-gradient(90deg, rgba(245,243,236,0.04) 1px, transparent 1px)`, backgroundSize: '40px 40px', pointerEvents: 'none' }}/>

      <div style={{ padding: `${SPACE.pageY}px ${SPACE.pageX}px`, height: '100%', display: 'flex', flexDirection: 'column', position: 'relative' }}>
        {/* HEADER */}
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end', marginBottom: 20 }}>
          <div>
            <div style={{ fontFamily: 'JetBrains Mono, monospace', fontSize: 14, letterSpacing: '0.14em', textTransform: 'uppercase', color: TOKENS.accent }}>
              09 · CHAT DE VOZ · FLUJO DE DATOS EN VIVO
            </div>
            <div className="display" style={{ fontSize: 56, marginTop: 12, lineHeight: 1, color: TOKENS.bg }}>
              Pipeline <span className="italic" style={{color: TOKENS.accent}}>reactivo en tiempo real.</span>
            </div>
          </div>
          <div style={{ display: 'flex', gap: 10, alignItems: 'center' }}>
            <div style={{ padding: '8px 14px', border: `1px solid rgba(245,243,236,0.3)`, borderRadius: 999, fontFamily: 'JetBrains Mono, monospace', fontSize: 12, letterSpacing: '0.08em' }}>
              TURNO {turn+1}/{SCRIPT.length}
            </div>
            <div style={{ padding: '8px 14px', background: TOKENS.accent, borderRadius: 999, fontFamily: 'JetBrains Mono, monospace', fontSize: 12, letterSpacing: '0.08em', color: '#fff' }}>
              ▸ {phase.toUpperCase()}
            </div>
            <button onClick={()=>setPaused(p=>!p)} style={{
              padding: '8px 14px', border: `1px solid rgba(245,243,236,0.3)`, background: 'transparent', borderRadius: 999,
              fontFamily: 'JetBrains Mono, monospace', fontSize: 12, cursor: 'pointer', color: TOKENS.bg,
            }}>{paused ? '▶' : '❚❚'}</button>
          </div>
        </div>

        {/* SVG PIPELINE CANVAS — full width LINEAR */}
        <div style={{ flex: 1, position: 'relative', minHeight: 500 }}>
          <svg width="100%" height="100%" viewBox="0 0 1700 450" preserveAspectRatio="xMidYMid meet" style={{ position: 'absolute', inset: 0 }}>
            <defs>
              <filter id="glow" x="-50%" y="-50%" width="200%" height="200%">
                <feGaussianBlur stdDeviation="3" result="blur"/>
                <feMerge><feMergeNode in="blur"/><feMergeNode in="SourceGraphic"/></feMerge>
              </filter>
              <filter id="glowStrong" x="-50%" y="-50%" width="200%" height="200%">
                <feGaussianBlur stdDeviation="6" result="blur"/>
                <feMerge><feMergeNode in="blur"/><feMergeNode in="SourceGraphic"/></feMerge>
              </filter>
              <radialGradient id="nodeActive">
                <stop offset="0%" stopColor={TOKENS.accent} stopOpacity="1"/>
                <stop offset="70%" stopColor={TOKENS.accent} stopOpacity="0.9"/>
                <stop offset="100%" stopColor={TOKENS.accent} stopOpacity="0.4"/>
              </radialGradient>
              <radialGradient id="nodeActiveOk">
                <stop offset="0%" stopColor={TOKENS.ok} stopOpacity="1"/>
                <stop offset="70%" stopColor={TOKENS.ok} stopOpacity="0.9"/>
                <stop offset="100%" stopColor={TOKENS.ok} stopOpacity="0.4"/>
              </radialGradient>
            </defs>

            {/* GRID BG */}
            <g opacity="0.06">
              {Array.from({length:12}).map((_,i)=><line key={'h'+i} x1="0" y1={i*40} x2="1700" y2={i*40} stroke={TOKENS.bg} strokeWidth="0.5"/>)}
              {Array.from({length:43}).map((_,i)=><line key={'v'+i} x1={i*40} y1="0" x2={i*40} y2="450" stroke={TOKENS.bg} strokeWidth="0.5"/>)}
            </g>

            {/* === TWO LANES: TOP (ingesta) / BOTTOM (síntesis) === */}
            <rect x="30" y="80" width="1640" height="120" rx="8" fill="rgba(226,81,42,0.03)" stroke="rgba(226,81,42,0.15)" strokeWidth="1" strokeDasharray="4 6"/>
            <text x="50" y="110" fontSize="11" fontFamily="JetBrains Mono, monospace" fill={TOKENS.accent} letterSpacing="2" opacity="0.6">INGESTA · ASPIRANTE → SISTEMA</text>

            <rect x="30" y="260" width="1640" height="120" rx="8" fill="rgba(46,125,78,0.03)" stroke="rgba(46,125,78,0.15)" strokeWidth="1" strokeDasharray="4 6"/>
            <text x="50" y="290" fontSize="11" fontFamily="JetBrains Mono, monospace" fill={TOKENS.ok} letterSpacing="2" opacity="0.6">SÍNTESIS · SISTEMA → ASPIRANTE</text>

            {/* === PIPELINE NODES — todos en línea horizontal === */}
            {[
              { x:200, y:140, k:'MIC', name:'Micrófono', sub:'CAPTURA', active:phase==='mic', color:TOKENS.accent, lane:'top' },
              { x:450, y:140, k:'STT', name:'Whisper', sub:'SPEECH→TEXT', active:phase==='stt', color:TOKENS.accent, lane:'top' },
              { x:700, y:140, k:'RAG', name:'pgvector', sub:'RETRIEVAL', active:phase==='rag', color:TOKENS.accent, lane:'top' },
              { x:950, y:140, k:'LLM', name:'Qwen3', sub:'REASONING', active:phase==='llm', color:TOKENS.accent, lane:'top' },
              { x:1200, y:140, k:'GEN', name:'Generator', sub:'RESPUESTA', active:phase==='llm', color:TOKENS.accent, lane:'top' },
              
              { x:1200, y:320, k:'TTS', name:'Kokoro', sub:'TEXT→SPEECH', active:phase==='tts', color:TOKENS.ok, lane:'bottom' },
              { x:950, y:320, k:'MIX', name:'Audio Mix', sub:'MEZCLA', active:phase==='tts', color:TOKENS.ok, lane:'bottom' },
              { x:700, y:320, k:'ENC', name:'Encoder', sub:'STREAM', active:phase==='tts', color:TOKENS.ok, lane:'bottom' },
              { x:450, y:320, k:'NET', name:'WebRTC', sub:'TRANSPORTE', active:phase==='tts', color:TOKENS.ok, lane:'bottom' },
              { x:200, y:320, k:'SPK', name:'Altavoz', sub:'SALIDA', active:phase==='tts', color:TOKENS.ok, lane:'bottom' },
            ].map(n=>(
              <g key={n.k} transform={`translate(${n.x},${n.y})`}>
                {n.active && (
                  <>
                    <circle r="42" fill="none" stroke={n.color} strokeWidth="1.5" opacity="0.6">
                      <animate attributeName="r" values="42;72;42" dur="1.6s" repeatCount="indefinite"/>
                      <animate attributeName="opacity" values="0.6;0;0.6" dur="1.6s" repeatCount="indefinite"/>
                    </circle>
                    <circle r="42" fill="none" stroke={n.color} strokeWidth="1" opacity="0.4">
                      <animate attributeName="r" values="42;100;42" dur="1.6s" begin="0.4s" repeatCount="indefinite"/>
                      <animate attributeName="opacity" values="0.4;0;0.4" dur="1.6s" begin="0.4s" repeatCount="indefinite"/>
                    </circle>
                  </>
                )}
                <circle r="42"
                  fill={n.active ? (n.color===TOKENS.ok ? 'url(#nodeActiveOk)':'url(#nodeActive)') : 'rgba(14,14,12,0.6)'}
                  stroke={n.active ? n.color : 'rgba(245,243,236,0.15)'}
                  strokeWidth={n.active ? 2.5 : 1}
                  filter={n.active ? "url(#glowStrong)" : undefined}
                />
                <text textAnchor="middle" y="-4" fontSize="14" fontFamily="JetBrains Mono, monospace" fill={n.active ? '#fff' : 'rgba(245,243,236,0.75)'} fontWeight="700" letterSpacing="2">{n.k}</text>
                <text textAnchor="middle" y="12" fontSize="9" fontFamily="JetBrains Mono, monospace" fill={n.active ? 'rgba(255,255,255,0.95)' : 'rgba(245,243,236,0.45)'} letterSpacing="1">{n.name.toUpperCase()}</text>
                <text textAnchor="middle" y="72" fontSize="9" fontFamily="JetBrains Mono, monospace" fill={n.active ? n.color : 'rgba(245,243,236,0.35)'} letterSpacing="1.5">{n.sub}</text>
              </g>
            ))}

            {/* === CONNECTION LINES — top lane (ingesta) === */}
            {[
              {x1:242, x2:408, active: phase==='mic'||phase==='stt'},
              {x1:492, x2:658, active: phase==='stt'||phase==='rag'},
              {x1:742, x2:908, active: phase==='rag'||phase==='llm'},
              {x1:992, x2:1158, active: phase==='llm'},
            ].map((ln,i)=>(
              <g key={'top'+i}>
                <line x1={ln.x1} y1="140" x2={ln.x2} y2="140" stroke={TOKENS.accent} strokeWidth="3" opacity={ln.active ? 0.9 : 0.1}/>
                {ln.active && Array.from({length:5}).map((_,j)=>(
                  <circle key={j} r="5" fill={TOKENS.accent} filter="url(#glow)">
                    <animateMotion dur="1.2s" repeatCount="indefinite" begin={(j*0.24)+'s'} path={`M ${ln.x1} 140 L ${ln.x2} 140`}/>
                    <animate attributeName="opacity" values="0;1;1;0" dur="1.2s" repeatCount="indefinite" begin={(j*0.24)+'s'}/>
                  </circle>
                ))}
              </g>
            ))}

            {/* Vertical connector: LLM → TTS */}
            <line x1="1200" y1="182" x2="1200" y2="278" stroke={(phase==='llm'||phase==='tts') ? TOKENS.ok : 'rgba(245,243,236,0.1)'} strokeWidth="3" opacity={(phase==='llm'||phase==='tts') ? 0.9 : 0.15}/>
            {(phase==='llm' || phase==='tts') && Array.from({length:4}).map((_,i)=>(
              <circle key={'vert'+i} r="5" fill={TOKENS.ok} filter="url(#glow)">
                <animateMotion dur="1s" repeatCount="indefinite" begin={(i*0.25)+'s'} path="M 1200 182 L 1200 278"/>
                <animate attributeName="opacity" values="0;1;1;0" dur="1s" repeatCount="indefinite" begin={(i*0.25)+'s'}/>
              </circle>
            ))}

            {/* === CONNECTION LINES — bottom lane (síntesis) === */}
            {[
              {x1:1158, x2:992, active: phase==='tts'},
              {x1:908, x2:742, active: phase==='tts'},
              {x1:658, x2:492, active: phase==='tts'},
              {x1:408, x2:242, active: phase==='tts'},
            ].map((ln,i)=>(
              <g key={'bot'+i}>
                <line x1={ln.x1} y1="320" x2={ln.x2} y2="320" stroke={TOKENS.ok} strokeWidth="3" opacity={ln.active ? 0.9 : 0.1}/>
                {ln.active && Array.from({length:5}).map((_,j)=>(
                  <circle key={j} r="5" fill={TOKENS.ok} filter="url(#glow)">
                    <animateMotion dur="1.2s" repeatCount="indefinite" begin={(j*0.24)+'s'} path={`M ${ln.x1} 320 L ${ln.x2} 320`}/>
                    <animate attributeName="opacity" values="0;1;1;0" dur="1.2s" repeatCount="indefinite" begin={(j*0.24)+'s'}/>
                  </circle>
                ))}
              </g>
            ))}

            {/* Entry/exit arrows */}
            <text x="50" y="135" fontSize="11" fontFamily="JetBrains Mono, monospace" fill={TOKENS.accent} letterSpacing="1.5" opacity={(phase==='mic'||phase==='stt') ? 1 : 0.25}>▶ INICIO</text>
            <text x="1620" y="315" fontSize="11" fontFamily="JetBrains Mono, monospace" fill={TOKENS.ok} letterSpacing="1.5" textAnchor="end" opacity={phase==='tts' ? 1 : 0.25}>FIN ◀</text>

            {/* Phase indicator */}
            <g transform="translate(850,420)">
              <rect x="-110" y="-24" width="220" height="48" rx="24" fill="rgba(14,14,12,0.85)" stroke={phase==='tts' ? TOKENS.ok : TOKENS.accent} strokeWidth="2"/>
              <circle cx="-78" cy="0" r="7" fill={phase==='tts' ? TOKENS.ok : TOKENS.accent}>
                <animate attributeName="opacity" values="1;0.3;1" dur="1s" repeatCount="indefinite"/>
              </circle>
              <text x="-58" y="7" fontSize="14" fontFamily="JetBrains Mono, monospace" fill={TOKENS.bg} letterSpacing="2.5" fontWeight="600">
                {phase.toUpperCase()} · {phase==='tts' ? 'SÍNTESIS' : phase==='mic' ? 'CAPTURA' : 'PROCESAMIENTO'}
              </text>
            </g>
          </svg>
        </div>

        {/* TRANSCRIPTION COMPACT */}
        <div style={{ marginTop: 16, padding: 18, background: 'rgba(14,14,12,0.5)', border: `1px solid rgba(245,243,236,0.1)`, borderRadius: 14, minHeight: 70, display: 'flex', gap: 20, alignItems: 'center' }}>
          <div style={{ fontFamily: 'JetBrains Mono, monospace', fontSize: 10, letterSpacing: '0.14em', color: 'rgba(245,243,236,0.5)', writingMode: 'vertical-rl', transform: 'rotate(180deg)' }}>TRANSCRIPCIÓN</div>
          <div style={{ flex: 1, display: 'flex', gap: 18, overflow: 'hidden' }}>
            {log.slice(-2).map((m,i)=>(
              <div key={i} style={{ flex: 1, display: 'flex', alignItems: 'center', gap: 10 }}>
                <span style={{ fontFamily: 'JetBrains Mono, monospace', fontSize: 10, letterSpacing: '0.12em', color: m.role==='user' ? TOKENS.accent : TOKENS.ok, whiteSpace: 'nowrap' }}>
                  {m.role==='user' ? '🎤 ASPIRANTE' : '🔊 ASISTENTE'}
                </span>
                <span style={{ fontSize: 15, color: 'rgba(245,243,236,0.85)', fontStyle: 'italic', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>
                  "{m.t}"
                </span>
              </div>
            ))}
            {log.length===0 && <div style={{ fontSize: 13, color: 'rgba(245,243,236,0.4)', fontStyle: 'italic' }}>Iniciando conversación…</div>}
          </div>
        </div>
      </div>

      <style>{`
        @keyframes blink{0%,80%,100%{opacity:.3}40%{opacity:1}}
      `}</style>
    </div>
  );
}
/* ─────────── SLIDE 10 — ARQUITECTURA ─────────── */
function ArchitectureSlide() {
  const [flowActive, setFlowActive] = useState(0); // 0-4 flow steps
  const [autoPlay, setAutoPlay] = useState(true);

  // Auto-advance flow
  useEffect(() => {
    if (!autoPlay) return;
    const t = setTimeout(() => {
      setFlowActive(s => (s + 1) % 5);
    }, 2400);
    return () => clearTimeout(t);
  }, [flowActive, autoPlay]);

  const components = [
    // CLIENTE
    { id:'browser', x:100, y:150, w:180, h:70, label:'React App', sub:'WebRTC · UI', layer:'cliente', color:TOKENS.accent },
    { id:'user', x:100, y:270, w:180, h:70, label:'Usuario', sub:'🎤 Mic · 🔊 Speaker', layer:'cliente', color:TOKENS.mute },
    
    // ORQUESTACIÓN
    { id:'livekit', x:380, y:80, w:200, h:60, label:'LiveKit', sub:'Transport Layer', layer:'orq', color:TOKENS.blue },
    { id:'pipecat', x:380, y:170, w:200, h:60, label:'Pipecat', sub:'Pipeline Engine', layer:'orq', color:TOKENS.accent },
    { id:'django', x:380, y:260, w:200, h:60, label:'Django API', sub:'Auth · Sessions', layer:'orq', color:TOKENS.ink },
    
    // IA + DATA
    { id:'whisper', x:680, y:50, w:160, h:55, label:'Whisper', sub:'STT', layer:'ia', color:'#7C3AED' },
    { id:'llm', x:680, y:125, w:160, h:55, label:'Qwen3', sub:'LLM', layer:'ia', color:'#DC2626' },
    { id:'kokoro', x:680, y:200, w:160, h:55, label:'Kokoro', sub:'TTS', layer:'ia', color:'#059669' },
    { id:'pgvector', x:680, y:275, w:160, h:55, label:'pgvector', sub:'RAG Store', layer:'ia', color:'#0891B2' },
  ];

  // Flow paths (cada flujo es un camino entre componentes)
  const flows = [
    { step:0, name:'Usuario habla', from:'user', to:'browser', color:TOKENS.accent },
    { step:0, name:'WebRTC → LiveKit', from:'browser', to:'livekit', color:TOKENS.blue },
    { step:1, name:'Audio → Pipecat', from:'livekit', to:'pipecat', color:TOKENS.accent },
    { step:1, name:'Pipecat → Whisper', from:'pipecat', to:'whisper', color:'#7C3AED' },
    { step:2, name:'Transcripción → LLM', from:'whisper', to:'llm', color:'#DC2626' },
    { step:2, name:'RAG retrieval', from:'llm', to:'pgvector', color:'#0891B2' },
    { step:3, name:'LLM → Generación', from:'pgvector', to:'llm', color:'#DC2626' },
    { step:3, name:'Texto → Kokoro', from:'llm', to:'kokoro', color:'#059669' },
    { step:4, name:'Audio → Pipecat', from:'kokoro', to:'pipecat', color:TOKENS.accent },
    { step:4, name:'Pipecat → LiveKit', from:'pipecat', to:'livekit', color:TOKENS.blue },
    { step:4, name:'LiveKit → Browser', from:'livekit', to:'browser', color:TOKENS.accent },
    { step:4, name:'Speaker output', from:'browser', to:'user', color:TOKENS.ok },
  ];

  const activeFlows = flows.filter(f => f.step === flowActive);

  const getCenter = (id) => {
    const c = components.find(x => x.id === id);
    return c ? { x: c.x + c.w/2, y: c.y + c.h/2 } : {x:0,y:0};
  };

  return (
    <div style={{ width: '100%', height: '100%', background: TOKENS.ink, color:TOKENS.bg, position: 'relative' }}>
      <Chrome index={12} total={20} label="Arquitectura" />
      <div style={{ padding: `${SPACE.pageY}px ${SPACE.pageX}px`, height: '100%' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
          <div>
            <div className="eyebrow" style={{ color: 'rgba(245,243,236,0.5)' }}>10 · ARQUITECTURA DEL SISTEMA</div>
            <div className="display" style={{ fontSize: 68, marginTop: 20, lineHeight: 1, color: TOKENS.bg }}>
              Microservicios <span className="italic" style={{color:TOKENS.accent}}>orquestados</span><br/>en tiempo real.
            </div>
          </div>
          <button onClick={()=>setAutoPlay(a=>!a)} style={{
            padding: '14px 24px', border: `1px solid rgba(245,243,236,0.2)`,
            background: autoPlay ? 'rgba(245,243,236,0.1)' : 'transparent',
            color: TOKENS.bg, borderRadius: 12, fontFamily: 'JetBrains Mono, monospace',
            fontSize: 12, letterSpacing: '0.08em', cursor: 'pointer', marginTop: 60,
          }}>
            {autoPlay ? '❚❚ PAUSAR' : '▶ PLAY'}
          </button>
        </div>

        {/* Architecture Diagram */}
        <div style={{
          marginTop: 40, background: 'rgba(14,14,12,0.4)',
          border: `1px solid rgba(245,243,236,0.1)`, borderRadius: 20,
          padding: 40, position: 'relative', height: 520,
        }}>
          <svg width="100%" height="100%" viewBox="0 0 900 400" style={{ overflow: 'visible' }}>
            {/* Background layers */}
            <rect x="20" y="20" width="220" height="360" fill="rgba(226,81,42,0.04)" stroke="rgba(226,81,42,0.2)" strokeWidth="1" strokeDasharray="4 4" rx="8"/>
            <rect x="320" y="20" width="240" height="360" fill="rgba(59,130,246,0.04)" stroke="rgba(59,130,246,0.2)" strokeWidth="1" strokeDasharray="4 4" rx="8"/>
            <rect x="640" y="20" width="240" height="360" fill="rgba(168,85,247,0.04)" stroke="rgba(168,85,247,0.2)" strokeWidth="1" strokeDasharray="4 4" rx="8"/>

            {/* Layer labels */}
            <text x="130" y="15" textAnchor="middle" fontSize="10" fill="rgba(245,243,236,0.4)" fontFamily="JetBrains Mono, monospace" letterSpacing="1.5">CLIENTE</text>
            <text x="440" y="15" textAnchor="middle" fontSize="10" fill="rgba(245,243,236,0.4)" fontFamily="JetBrains Mono, monospace" letterSpacing="1.5">ORQUESTACIÓN</text>
            <text x="760" y="15" textAnchor="middle" fontSize="10" fill="rgba(245,243,236,0.4)" fontFamily="JetBrains Mono, monospace" letterSpacing="1.5">IA · DATOS</text>

            {/* Animated connection paths */}
            <defs>
              <filter id="glow2">
                <feGaussianBlur stdDeviation="3" result="coloredBlur"/>
                <feMerge>
                  <feMergeNode in="coloredBlur"/>
                  <feMergeNode in="SourceGraphic"/>
                </feMerge>
              </filter>
            </defs>

            {activeFlows.map((flow, fi) => {
              const from = getCenter(flow.from);
              const to = getCenter(flow.to);
              const midX = (from.x + to.x) / 2;
              const midY = (from.y + to.y) / 2 - 30;
              const pathData = `M ${from.x} ${from.y} Q ${midX} ${midY} ${to.x} ${to.y}`;
              
              return (
                <g key={fi}>
                  {/* Path glow */}
                  <path d={pathData} stroke={flow.color} strokeWidth="2" fill="none" opacity="0.3" filter="url(#glow2)"/>
                  <path d={pathData} stroke={flow.color} strokeWidth="1.5" fill="none" opacity="0.7"/>
                  
                  {/* Animated particles */}
                  {Array.from({length: 6}).map((_, pi) => (
                    <circle key={pi} r="4" fill={flow.color} filter="url(#glow2)">
                      <animateMotion dur="2s" repeatCount="indefinite" begin={(pi * 0.33) + 's'} path={pathData}/>
                      <animate attributeName="opacity" values="0;1;1;0" dur="2s" repeatCount="indefinite" begin={(pi * 0.33) + 's'}/>
                    </circle>
                  ))}
                </g>
              );
            })}

            {/* Component nodes */}
            {components.map((comp, ci) => {
              const isActive = activeFlows.some(f => f.from === comp.id || f.to === comp.id);
              const cx = comp.x + comp.w/2;
              const cy = comp.y + comp.h/2;

              return (
                <g key={comp.id}>
                  {/* Pulse rings on active */}
                  {isActive && (
                    <>
                      <rect x={comp.x} y={comp.y} width={comp.w} height={comp.h} rx="10" 
                        fill="none" stroke={comp.color} strokeWidth="2" opacity="0.5">
                        <animate attributeName="opacity" values="0.5;0;0.5" dur="1.5s" repeatCount="indefinite"/>
                        <animate attributeName="stroke-width" values="2;0;2" dur="1.5s" repeatCount="indefinite"/>
                      </rect>
                      <rect x={comp.x-8} y={comp.y-8} width={comp.w+16} height={comp.h+16} rx="14"
                        fill="none" stroke={comp.color} strokeWidth="1" opacity="0.3">
                        <animate attributeName="opacity" values="0.3;0;0.3" dur="1.5s" begin="0.3s" repeatCount="indefinite"/>
                      </rect>
                    </>
                  )}

                  {/* Main box */}
                  <rect x={comp.x} y={comp.y} width={comp.w} height={comp.h} rx="10"
                    fill={isActive ? comp.color : 'rgba(14,14,12,0.6)'}
                    stroke={isActive ? comp.color : 'rgba(245,243,236,0.2)'}
                    strokeWidth={isActive ? 2 : 1}
                    filter={isActive ? "url(#glow2)" : undefined}
                    style={{ transition: 'all 0.4s' }}
                  />

                  {/* Label */}
                  <text x={cx} y={cy - 8} textAnchor="middle" fontSize="15" fontWeight="600"
                    fill={isActive ? '#fff' : 'rgba(245,243,236,0.75)'} fontFamily="Inter">
                    {comp.label}
                  </text>
                  <text x={cx} y={cy + 10} textAnchor="middle" fontSize="11"
                    fill={isActive ? 'rgba(255,255,255,0.8)' : 'rgba(245,243,236,0.45)'}
                    fontFamily="JetBrains Mono, monospace" letterSpacing="0.5">
                    {comp.sub}
                  </text>
                </g>
              );
            })}
          </svg>

          {/* Flow step indicator */}
          <div style={{
            position: 'absolute', bottom: 30, left: 40, right: 40,
            display: 'flex', alignItems: 'center', gap: 16,
          }}>
            <div style={{ fontFamily: 'JetBrains Mono, monospace', fontSize: 11, color: 'rgba(245,243,236,0.5)', letterSpacing: '0.12em' }}>
              FLUJO
            </div>
            <div style={{ flex: 1, display: 'flex', gap: 8 }}>
              {['ENTRADA', 'CAPTURA', 'PROCESAMIENTO', 'SÍNTESIS', 'SALIDA'].map((label, i) => (
                <button key={i} onClick={() => { setFlowActive(i); setAutoPlay(false); }} style={{
                  flex: 1, padding: '10px 12px', border: `1px solid ${flowActive === i ? TOKENS.accent : 'rgba(245,243,236,0.15)'}`,
                  background: flowActive === i ? TOKENS.accent : 'rgba(14,14,12,0.3)',
                  color: flowActive === i ? '#fff' : 'rgba(245,243,236,0.6)',
                  borderRadius: 8, fontSize: 11, fontFamily: 'JetBrains Mono, monospace',
                  letterSpacing: '0.08em', cursor: 'pointer', transition: 'all .3s',
                }}>
                  {i+1}. {label}
                </button>
              ))}
            </div>
          </div>
        </div>

        <div style={{ marginTop: 20, fontSize: 13, color: 'rgba(245,243,236,0.5)', fontFamily: 'JetBrains Mono, monospace', letterSpacing: '0.08em' }}>
          ↔ CLIC EN LOS PASOS PARA EXPLORAR CADA FLUJO · LAS PARTÍCULAS MUESTRAN DATOS EN MOVIMIENTO
        </div>
      </div>
    </div>
  );
}

/* ─────────── SLIDE 11 — STACK ─────────── */
function StackSlide() {
  const [selected, setSelected] = useState(null);

  // Real brand logos as inline SVG
  const logos = {
    react: (
      <svg width="44" height="44" viewBox="-11.5 -10.232 23 20.463">
        <circle r="2.05" fill="#61DAFB"/>
        <g stroke="#61DAFB" strokeWidth="1" fill="none">
          <ellipse rx="11" ry="4.2"/>
          <ellipse rx="11" ry="4.2" transform="rotate(60)"/>
          <ellipse rx="11" ry="4.2" transform="rotate(120)"/>
        </g>
      </svg>
    ),
    livekit: (
      <svg width="44" height="24" viewBox="0 0 120 32">
        {/* LiveKit wordmark — faithful to the real logo */}
        <text fontFamily="'Arial Black', sans-serif" fontWeight="900" fontSize="26" fill="#111" letterSpacing="-1">
          <tspan>Live</tspan>
          {/* K with pixel gap */}
          <tspan>K</tspan>
          {/* i replaced by a pixel block */}
          <tspan fill="#111">i</tspan>
          <tspan>t</tspan>
        </text>
      </svg>
    ),
    pipecat: (
      /* Pipecat — geometric square cat face, exact style: right angles only */
      <svg width="44" height="44" viewBox="0 0 56 56">
        {/* Main face path with stepped ears at top corners */}
        <path d="
          M 10 48
          L 10 24
          L 6 24
          L 6 12
          L 20 12
          L 20 16
          L 36 16
          L 36 12
          L 50 12
          L 50 24
          L 46 24
          L 46 48
          Z"
          fill="none" stroke="#111" strokeWidth="3.5" strokeLinejoin="miter"/>
        {/* Eyes — two filled circles */}
        <circle cx="22" cy="33" r="3" fill="#111"/>
        <circle cx="34" cy="33" r="3" fill="#111"/>
        {/* Bottom bars — whisker lines outside the face */}
        <line x1="2" y1="45" x2="10" y2="45" stroke="#111" strokeWidth="3.5" strokeLinecap="square"/>
        <line x1="46" y1="45" x2="54" y2="45" stroke="#111" strokeWidth="3.5" strokeLinecap="square"/>
      </svg>
    ),
    django: (
      <svg width="44" height="44" viewBox="0 0 24 24">
        <rect width="24" height="24" rx="4" fill="#0C4B33"/>
        <path fill="#44B78B" d="M11.146 3h3.924v18.166c-2.013.382-3.491.535-5.096.535-4.791 0-7.288-2.166-7.288-6.32 0-4.002 2.65-6.6 6.753-6.6.637 0 1.121.05 1.707.203zm0 9.143a3.894 3.894 0 0 0-1.325-.204c-1.988 0-3.134 1.223-3.134 3.365 0 2.09 1.096 3.236 3.109 3.236.433 0 .79-.025 1.35-.102V12.142zM21.314 9.06v9.097c0 3.134-.229 4.638-.917 5.937-.637 1.249-1.478 2.039-3.211 2.905l-3.644-1.733c1.733-.815 2.574-1.529 3.109-2.625.56-1.121.739-2.421.739-5.835V9.059h3.924zM17.39 3.021h3.924v4.026H17.39z"/>
      </svg>
    ),
    openai: (
      <svg width="44" height="44" viewBox="0 0 41 41">
        <path d="M37.532 16.87a9.963 9.963 0 0 0-.856-8.184 10.078 10.078 0 0 0-10.855-4.835 9.964 9.964 0 0 0-6.131-3.358 10.079 10.079 0 0 0-11.183 4.91 9.964 9.964 0 0 0-6.67 4.834 10.079 10.079 0 0 0 1.24 11.817 9.965 9.965 0 0 0 .856 8.185 10.079 10.079 0 0 0 10.855 4.835 9.965 9.965 0 0 0 6.131 3.358 10.078 10.078 0 0 0 11.188-4.91 9.965 9.965 0 0 0 6.67-4.834 10.079 10.079 0 0 0-1.243-11.818zM22.498 37.886a7.474 7.474 0 0 1-4.799-1.735c.061-.033.168-.091.237-.134l7.964-4.6a1.294 1.294 0 0 0 .655-1.134V19.054l3.366 1.944a.12.12 0 0 1 .066.092v9.299a7.505 7.505 0 0 1-7.49 7.496zM6.392 31.006a7.471 7.471 0 0 1-.894-5.023c.06.036.162.099.237.141l7.964 4.6a1.297 1.297 0 0 0 1.308 0l9.724-5.614v3.888a.12.12 0 0 1-.048.103l-8.051 4.649a7.504 7.504 0 0 1-10.24-2.744zM4.297 13.62A7.469 7.469 0 0 1 8.2 10.333c0 .068-.004.19-.004.274v9.201a1.294 1.294 0 0 0 .654 1.132l9.723 5.614-3.366 1.944a.12.12 0 0 1-.114.012L7.044 23.86a7.504 7.504 0 0 1-2.747-10.24zm27.658 6.437l-9.724-5.615 3.367-1.943a.121.121 0 0 1 .114-.012l8.048 4.648a7.498 7.498 0 0 1-1.158 13.528v-9.476a1.293 1.293 0 0 0-.647-1.13zm3.35-5.043c-.059-.037-.162-.099-.236-.141l-7.965-4.6a1.298 1.298 0 0 0-1.308 0l-9.723 5.614v-3.888a.12.12 0 0 1 .048-.103l8.05-4.645a7.497 7.497 0 0 1 11.135 7.763zm-21.063 6.929l-3.367-1.944a.12.12 0 0 1-.065-.092v-9.299a7.497 7.497 0 0 1 12.293-5.756 6.94 6.94 0 0 0-.236.134l-7.965 4.6a1.294 1.294 0 0 0-.654 1.132l-.006 11.225zm1.829-3.943l4.33-2.501 4.332 2.497v4.998l-4.331 2.5-4.331-2.5z" fill="#10A37F"/>
      </svg>
    ),
    qwen: (
      <svg width="44" height="44" viewBox="0 0 44 44">
        <rect width="44" height="44" rx="8" fill="#6B21A8"/>
        <text x="22" y="30" textAnchor="middle" fontFamily="serif" fontWeight="900" fontSize="22" fill="#fff">Q</text>
        <path d="M14 34 L22 38 L30 34" stroke="#A855F7" strokeWidth="2" fill="none"/>
      </svg>
    ),
    kokoro: (
      <svg width="44" height="44" viewBox="0 0 44 44">
        <rect width="44" height="44" rx="8" fill="#059669"/>
        {/* Sound waves */}
        <circle cx="22" cy="22" r="5" fill="#fff"/>
        <path d="M14 15 Q8 22 14 29" stroke="#fff" strokeWidth="2.5" fill="none" strokeLinecap="round"/>
        <path d="M10 11 Q2 22 10 33" stroke="rgba(255,255,255,0.5)" strokeWidth="2" fill="none" strokeLinecap="round"/>
        <path d="M30 15 Q36 22 30 29" stroke="#fff" strokeWidth="2.5" fill="none" strokeLinecap="round"/>
        <path d="M34 11 Q42 22 34 33" stroke="rgba(255,255,255,0.5)" strokeWidth="2" fill="none" strokeLinecap="round"/>
      </svg>
    ),
    ollama: (
      /* Ollama — cute round alpaca/llama face, faithful to official logo */
      <svg width="44" height="44" viewBox="0 0 100 105">
        {/* Left ear */}
        <circle cx="30" cy="24" r="12" fill="#fff" stroke="#111" strokeWidth="5"/>
        {/* Right ear */}
        <circle cx="70" cy="24" r="12" fill="#fff" stroke="#111" strokeWidth="5"/>
        {/* Main head — large circle */}
        <circle cx="50" cy="62" r="38" fill="#fff" stroke="#111" strokeWidth="5"/>
        {/* Left eye — circle outline */}
        <circle cx="35" cy="58" r="9" fill="none" stroke="#111" strokeWidth="4.5"/>
        {/* Right eye — circle outline */}
        <circle cx="65" cy="58" r="9" fill="none" stroke="#111" strokeWidth="4.5"/>
        {/* Nose — small heart shape */}
        <path d="M47 76 C47 72 53 72 53 76 C53 80 50 83 50 83 C50 83 47 80 47 76Z" fill="#111"/>
      </svg>
    ),
    postgres: (
      <svg width="44" height="44" viewBox="0 0 24 24">
        <rect width="24" height="24" rx="4" fill="#336791"/>
        <path fill="#fff" fillOpacity="0.9" d="M17.128 0a4.272 4.272 0 0 1 2.992 1.218 4.255 4.255 0 0 1 1.218 2.99c0 1.25-.463 2.323-1.218 2.99L13.767 13.5l.037.003c.577.04 1.02.116 1.384.248.464.167.755.395.986.693.217.28.35.614.43.98.027.13.043.265.054.396h.018v.005c0 .003.003.005.003.005v.009c.015.113.02.23.02.344 0 .357-.055.702-.15 1.025v.002c-.187.657-.523 1.19-.944 1.559-.46.402-.989.6-1.538.6-.261 0-.527-.044-.79-.136l-.1-.038c-.255-.1-.481-.233-.69-.388-.208.156-.435.29-.69.388l-.1.038a2.717 2.717 0 0 1-.79.136c-.55 0-1.077-.198-1.538-.6-.421-.368-.757-.902-.944-1.559a3.573 3.573 0 0 1-.15-1.025c0-.114.005-.23.02-.344v-.009c0 0 .003-.002.003-.005v-.005h.018c.01-.131.027-.267.054-.395a2.682 2.682 0 0 1 .43-.981c.231-.298.522-.526.986-.693.364-.132.807-.208 1.384-.248l.037-.003L6.9 7.198A4.266 4.266 0 0 1 5.682 4.21c0-1.25.463-2.323 1.218-2.99A4.267 4.267 0 0 1 9.89 0c1.25 0 2.323.463 2.99 1.218L12 1.34l.12-.122A4.272 4.272 0 0 1 15.11 0h2.018zm-5.026 14.2c-.558.023-.99.09-1.306.2-.34.123-.503.274-.592.419a1.43 1.43 0 0 0-.207.492c-.018.086-.03.173-.036.26h4.274a2.077 2.077 0 0 0-.036-.26 1.43 1.43 0 0 0-.207-.492c-.09-.145-.252-.296-.592-.419-.317-.11-.748-.177-1.306-.2h-.992zm.499-5.45a.754.754 0 1 0 0 1.508.754.754 0 0 0 0-1.508zm5.026-7.5H9.891a3.022 3.022 0 0 0-2.118.857 3.007 3.007 0 0 0-.858 2.119c0 .888.332 1.645.858 2.119l5.878 5.878.35-.35 5.877-5.878a2.981 2.981 0 0 0 .858-2.119 3.003 3.003 0 0 0-.858-2.119 3.022 3.022 0 0 0-2.119-.857z"/>
      </svg>
    ),
  };

  const stack = [
    { 
      cat:'Frontend', name:'React', layer:'Cliente', color:'#61DAFB',
      logo: logos.react,
      desc:'Biblioteca JavaScript para construir interfaces de usuario declarativas y reactivas.',
      why:'Ideal para prototipos interactivos con estado complejo. Componentes reutilizables, virtual DOM, ecosistema maduro.'
    },
    { 
      cat:'Streaming', name:'LiveKit', layer:'Cliente', color:'#111',
      logo: logos.livekit,
      desc:'Plataforma open-source para audio/video en tiempo real con WebRTC.',
      why:'Latencia ultra-baja (<100ms), soporte nativo de WebRTC, escalable y confiable para conversaciones de voz.'
    },
    { 
      cat:'Orquestación', name:'Pipecat', layer:'Backend', color:'#111',
      logo: logos.pipecat,
      desc:'Framework de Python para pipelines de IA conversacional multimodal.',
      why:'Orquesta flujos STT→LLM→TTS, maneja estado de conversación, abstrae complejidad del pipeline de voz.'
    },
    { 
      cat:'Backend', name:'Django', layer:'Backend', color:'#0C4B33',
      logo: logos.django,
      desc:'Framework web de Python para desarrollo rápido y seguro.',
      why:'ORM robusto, admin panel integrado, autenticación built-in, perfecto para APIs REST y gestión de sesiones.'
    },
    { 
      cat:'STT', name:'Whisper', layer:'IA', color:'#10A37F',
      logo: logos.openai,
      desc:'Modelo de OpenAI para reconocimiento automático de voz (speech-to-text).',
      why:'Precisión excepcional (WER <5%), multilenguaje, funciona offline, optimizado para conversaciones naturales.'
    },
    { 
      cat:'LLM', name:'Modelo IA Local', layer:'IA', color:'#6B21A8',
      logo: (
        <svg width="44" height="44" viewBox="0 0 44 44">
          <rect width="44" height="44" rx="8" fill="#6B21A8"/>
          {/* Brain-circuit icon */}
          <circle cx="22" cy="22" r="10" fill="none" stroke="#fff" strokeWidth="2.5"/>
          <circle cx="22" cy="22" r="4" fill="#fff"/>
          <line x1="22" y1="8" x2="22" y2="12" stroke="#fff" strokeWidth="2.5" strokeLinecap="round"/>
          <line x1="22" y1="32" x2="22" y2="36" stroke="#fff" strokeWidth="2.5" strokeLinecap="round"/>
          <line x1="8" y1="22" x2="12" y2="22" stroke="#fff" strokeWidth="2.5" strokeLinecap="round"/>
          <line x1="32" y1="22" x2="36" y2="22" stroke="#fff" strokeWidth="2.5" strokeLinecap="round"/>
          <line x1="12" y1="12" x2="15" y2="15" stroke="#fff" strokeWidth="2" strokeLinecap="round"/>
          <line x1="29" y1="29" x2="32" y2="32" stroke="#fff" strokeWidth="2" strokeLinecap="round"/>
          <line x1="32" y1="12" x2="29" y2="15" stroke="#fff" strokeWidth="2" strokeLinecap="round"/>
          <line x1="15" y1="29" x2="12" y2="32" stroke="#fff" strokeWidth="2" strokeLinecap="round"/>
        </svg>
      ),
      desc:'Modelo de lenguaje de gran escala ejecutado localmente para razonamiento y análisis vocacional.',
      why:'Seleccionado según compatibilidad con el hardware disponible. Razonamiento avanzado, contexto largo, privacidad total — sin enviar datos a APIs externas.'
    },
    { 
      cat:'TTS', name:'Kokoro', layer:'IA', color:'#059669',
      logo: logos.kokoro,
      desc:'Modelo text-to-speech ultra ligero (82M parámetros) con voz natural.',
      why:'Latencia mínima (<200ms), calidad de voz humana, corre en CPU, perfecto para respuestas en tiempo real.'
    },
    { 
      cat:'Runtime', name:'Ollama', layer:'IA', color:'#111',
      logo: logos.ollama,
      desc:'Runtime para ejecutar LLMs localmente con optimización CUDA/Metal.',
      why:'Simplifica deployment de modelos, gestión automática de VRAM, API compatible con OpenAI, aceleración GPU.'
    },
    { 
      cat:'DB + RAG', name:'pgvector', layer:'Datos', color:'#336791',
      logo: logos.postgres,
      desc:'Extensión de PostgreSQL para búsqueda vectorial semántica (RAG).',
      why:'Embeddings + SQL en una sola DB, índices HNSW ultra-rápidos, mantiene consistencia ACID en datos relacionales.'
    },
  ];

  const tech = selected !== null ? stack[selected] : null;

  return (
    <div style={{ width: '100%', height: '100%', background: TOKENS.bg, position: 'relative' }}>
      <Chrome index={13} total={20} label="Stack tecnológico" />
      <div style={{ padding: `${SPACE.pageY}px ${SPACE.pageX}px`, height: '100%' }}>
        <div className="eyebrow">11 · STACK TECNOLÓGICO</div>
        <div className="display" style={{ fontSize: 68, marginTop: 20, marginBottom: 32, maxWidth: 1500 }}>
          9 tecnologías. <span className="italic" style={{color:TOKENS.accent}}>Todas locales, todas probadas.</span>
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: tech ? '1fr 1.2fr' : '1fr', gap: 48 }}>
          {/* Grid de tecnologías */}
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 14 }}>
            {stack.map((s, i) => {
              const isSelected = selected === i;
              return (
                <button key={s.name} onClick={() => setSelected(i)} style={{
                  padding: 20, border: `2px solid ${isSelected ? s.color : TOKENS.line}`,
                  background: isSelected ? s.color : '#fff',
                  color: isSelected ? '#fff' : TOKENS.ink,
                  display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 8,
                  minHeight: 140, borderRadius: 12, cursor: 'pointer',
                  transition: 'all .3s', position: 'relative', overflow: 'hidden',
                  transform: isSelected ? 'scale(1.05)' : 'scale(1)',
                }}>
                  {/* Logo/emoji */}
                  <div style={{ fontSize: 32, filter: isSelected ? 'brightness(1.3)' : 'none' }}>
                    {s.logo}
                  </div>
                  <div style={{ fontFamily: 'Instrument Serif, serif', fontSize: 24, lineHeight: 1, textAlign: 'center' }}>
                    {s.name}
                  </div>
                  <div style={{ fontFamily: 'JetBrains Mono, monospace', fontSize: 10, letterSpacing: '0.1em', textTransform: 'uppercase', opacity: isSelected ? 0.85 : 0.6 }}>
                    {s.cat}
                  </div>
                  {isSelected && (
                    <div style={{
                      position: 'absolute', inset: -4, border: `2px solid ${s.color}`,
                      borderRadius: 14, opacity: 0.4,
                      animation: 'pulseRing 1.6s infinite',
                    }}/>
                  )}
                </button>
              );
            })}
          </div>

          {/* Panel de detalles */}
          {tech && (
            <div key={selected} style={{
              padding: 40, background: tech.color, color: '#fff',
              borderRadius: 20, display: 'flex', flexDirection: 'column', gap: 24,
              position: 'relative', overflow: 'hidden',
              animation: 'slideInRight 0.4s cubic-bezier(0.2,0.8,0.2,1)',
            }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: 20 }}>
                <div style={{ fontSize: 64, filter: 'brightness(1.3) drop-shadow(0 4px 12px rgba(0,0,0,0.2))' }}>
                  {tech.logo}
                </div>
                <div>
                  <div style={{ fontFamily: 'Instrument Serif, serif', fontSize: 48, lineHeight: 1 }}>
                    {tech.name}
                  </div>
                  <div style={{ fontFamily: 'JetBrains Mono, monospace', fontSize: 13, letterSpacing: '0.12em', textTransform: 'uppercase', opacity: 0.8, marginTop: 6 }}>
                    {tech.cat} · {tech.layer}
                  </div>
                </div>
              </div>

              <div style={{ height: 1, background: 'rgba(255,255,255,0.25)' }}/>

              <div>
                <div style={{ fontFamily: 'JetBrains Mono, monospace', fontSize: 11, letterSpacing: '0.14em', textTransform: 'uppercase', opacity: 0.7, marginBottom: 10 }}>
                  ¿QUÉ ES?
                </div>
                <div style={{ fontSize: 22, lineHeight: 1.45, opacity: 0.95 }}>
                  {tech.desc}
                </div>
              </div>

              <div>
                <div style={{ fontFamily: 'JetBrains Mono, monospace', fontSize: 11, letterSpacing: '0.14em', textTransform: 'uppercase', opacity: 0.7, marginBottom: 10 }}>
                  ¿POR QUÉ LA ELEGIMOS?
                </div>
                <div style={{ fontSize: 22, lineHeight: 1.45, opacity: 0.95, fontStyle: 'italic' }}>
                  {tech.why}
                </div>
              </div>

              {/* Decorative circles */}
              <div style={{ position: 'absolute', top: -80, right: -80, width: 300, height: 300, borderRadius: '50%', background: 'rgba(255,255,255,0.05)', filter: 'blur(40px)' }}/>
              <div style={{ position: 'absolute', bottom: -100, left: -100, width: 400, height: 400, borderRadius: '50%', background: 'rgba(0,0,0,0.1)', filter: 'blur(60px)' }}/>
            </div>
          )}
        </div>

        <div style={{ marginTop: 24, fontFamily: 'JetBrains Mono, monospace', fontSize: 13, letterSpacing: '0.08em', textTransform: 'uppercase', color: TOKENS.mute }}>
          ↔  CLIC EN CADA TECNOLOGÍA PARA VER DETALLES, LOGO Y JUSTIFICACIÓN
        </div>
      </div>

      <style>{`
        @keyframes slideInRight {
          from { opacity: 0; transform: translateX(40px); }
          to { opacity: 1; transform: translateX(0); }
        }
        @keyframes pulseRing {
          0%, 100% { transform: scale(1); opacity: 0.4; }
          50% { transform: scale(1.08); opacity: 0.1; }
        }
      `}</style>
    </div>
  );
}

/* ─────────── SLIDE 14 — PANTALLAS ASPIRANTE ─────────── */
function ScreensUserSlide() {
  const [active, setActive] = useState(0);
  const screens = [
    { img: 'screenshots/image3.png', label: 'Homepage', num: '01', desc: 'Página principal con presentación de carreras y acceso al asistente.' },
    { img: 'screenshots/image4.png', label: 'Mini chat',  num: '02', desc: 'Widget flotante para consultas rápidas sin salir de la página.' },
    { img: 'screenshots/image5.png', label: 'Chat de voz', num: '03', desc: 'Interfaz de voz con visualización de onda de audio en tiempo real.' },
    { img: 'screenshots/image6.png', label: 'Chat dinámico', num: '04', desc: 'Conversación adaptativa con evaluación de perfil vocacional.' },
  ];
  const cur = screens[active];
  return (
    <div style={{ width:'100%', height:'100%', background:TOKENS.bg, position:'relative', overflow:'hidden' }}>
      <Chrome index={14} total={20} label="Prototipo · aspirante" />
      <div style={{ height:'100%', display:'grid', gridTemplateColumns:'1fr 1.35fr', gap:0 }}>

        {/* LEFT */}
        <div style={{ padding:`${SPACE.pageY}px ${SPACE.pageX}px`, display:'flex', flexDirection:'column', justifyContent:'center', borderRight:`1px solid ${TOKENS.line}` }}>
          <div className="eyebrow" style={{ marginBottom:20 }}>14 · MÓDULO ASPIRANTE</div>
          <div className="display" style={{ fontSize:72, lineHeight:0.96, marginBottom:28 }}>
            Interfaz del<br/>
            <span className="italic" style={{ color:TOKENS.accent }}>aspirante.</span>
          </div>
          <div style={{ fontSize:22, lineHeight:1.5, color:TOKENS.ink2, marginBottom:48, maxWidth:480 }}>
            {cur.desc}
          </div>

          {/* Thumbnail strip */}
          <div style={{ display:'flex', flexDirection:'column', gap:12 }}>
            {screens.map((s,i) => (
              <button key={i} onClick={()=>setActive(i)} style={{
                display:'flex', alignItems:'center', gap:16,
                padding:'14px 18px', border:`1px solid ${i===active ? TOKENS.accent : TOKENS.line}`,
                borderRadius:12, background: i===active ? 'rgba(226,81,42,0.06)' : 'rgba(255,255,255,0.4)',
                cursor:'pointer', textAlign:'left', transition:'all .2s',
              }}>
                <div style={{
                  width:48, height:36, borderRadius:6, overflow:'hidden', flexShrink:0,
                  border:`1px solid ${TOKENS.line}`, background:TOKENS.bg2,
                }}>
                  <img src={s.img} alt={s.label} style={{ width:'100%', height:'100%', objectFit:'contain', objectPosition:'top center' }} />
                </div>
                <div style={{ fontFamily:'JetBrains Mono, monospace', fontSize:11, letterSpacing:'0.1em', color:TOKENS.mute, marginBottom:3 }}>
                  {s.num}
                </div>
                <div style={{ fontSize:16, fontWeight: i===active ? 600 : 400, color: i===active ? TOKENS.ink : TOKENS.ink2 }}>
                  {s.label}
                </div>
                {i===active && <div style={{ marginLeft:'auto', width:6, height:6, borderRadius:3, background:TOKENS.accent }} />}
              </button>
            ))}
          </div>
        </div>

        {/* RIGHT — big preview */}
        <div style={{ position:'relative', overflow:'hidden', background:TOKENS.bg2, display:'flex', alignItems:'flex-start', justifyContent:'center', paddingTop:60 }}>
          {/* browser chrome mockup */}
          <div style={{
            width:'88%', height:'calc(100% - 80px)',
            background:'#fff', borderRadius:'14px 14px 0 0',
            border:`1px solid ${TOKENS.line}`, borderBottom:'none',
            boxShadow:'0 40px 100px rgba(14,14,12,0.14)',
            display:'flex', flexDirection:'column', overflow:'hidden',
          }}>
            {/* browser bar */}
            <div style={{ padding:'12px 20px', borderBottom:`1px solid ${TOKENS.line}`, display:'flex', alignItems:'center', gap:12, background:'#fafaf9', flexShrink:0 }}>
              <div style={{ display:'flex', gap:6 }}>
                {['#FF5F57','#FFBD2E','#28C840'].map(c=>(
                  <div key={c} style={{ width:10, height:10, borderRadius:5, background:c }} />
                ))}
              </div>
              <div style={{ flex:1, background:TOKENS.bg, borderRadius:6, padding:'5px 14px', fontFamily:'JetBrains Mono, monospace', fontSize:12, color:TOKENS.mute, letterSpacing:'0.04em' }}>
                orientavoz.itca / {cur.label.toLowerCase().replace(' ','-')}
              </div>
            </div>
            {/* screenshot */}
            <div style={{ flex:1, minHeight:0, overflow:'hidden', position:'relative', background:'#fff' }}>
              {screens.map((s,i)=>(
                <img key={i} src={s.img} alt={s.label} style={{
                  position:'absolute', top:0, left:0, width:'100%', height:'auto',
                  display:'block',
                  opacity: i===active ? 1 : 0,
                  transition:'opacity .4s cubic-bezier(.2,.8,.2,1)',
                }} />
              ))}
            </div>
          </div>
          {/* label pill */}
          <div style={{
            position:'absolute', bottom:28, left:'50%', transform:'translateX(-50%)',
            background:TOKENS.ink, color:TOKENS.bg, borderRadius:999,
            padding:'8px 20px', fontFamily:'JetBrains Mono, monospace', fontSize:13,
            letterSpacing:'0.1em', whiteSpace:'nowrap',
          }}>
            {cur.num} · {cur.label.toUpperCase()}
          </div>
        </div>
      </div>
    </div>
  );
}

/* ─────────── SLIDE 15 — PANTALLAS ADMIN ─────────── */
function ScreensAdminSlide() {
  const [active, setActive] = useState(0);
  const screens = [
    { img: 'screenshots/image7.png',  label: 'Login admin',      num: '01', desc: 'Acceso seguro al panel de administración con autenticación.' },
    { img: 'screenshots/image8.png',  label: 'Dashboard',        num: '02', desc: 'Vista general con métricas, conversaciones y actividad reciente.' },
    { img: 'screenshots/image9.png',  label: 'Agenda',           num: '03', desc: 'Calendario de sesiones de orientación programadas.' },
    { img: 'screenshots/image10.png', label: 'Conversaciones',   num: '04', desc: 'Historial completo de chats con aspirantes y análisis.' },
    { img: 'screenshots/image11.png', label: 'Horarios',         num: '05', desc: 'Configuración de horarios de atención del servicio.' },
    { img: 'screenshots/image12.png', label: 'Configuraciones',  num: '06', desc: 'Parámetros del asistente, prompts y ajustes del sistema.' },
  ];
  const cur = screens[active];
  return (
    <div style={{ width:'100%', height:'100%', background:TOKENS.ink, position:'relative', overflow:'hidden' }}>
      <Chrome index={15} total={20} label="Prototipo · administrador" />
      <div style={{ height:'100%', display:'grid', gridTemplateColumns:'1.35fr 1fr', gap:0 }}>

        {/* LEFT — big preview (dark theme) */}
        <div style={{ position:'relative', overflow:'hidden', background:'#0a0a0a', display:'flex', alignItems:'flex-start', justifyContent:'center', paddingTop:60 }}>
          <div style={{
            width:'88%', height:'calc(100% - 80px)',
            background:'#1a1a1a', borderRadius:'14px 14px 0 0',
            border:'1px solid rgba(255,255,255,0.08)', borderBottom:'none',
            boxShadow:'0 40px 100px rgba(0,0,0,0.5)',
            display:'flex', flexDirection:'column', overflow:'hidden',
          }}>
            {/* browser bar */}
            <div style={{ padding:'12px 20px', borderBottom:'1px solid rgba(255,255,255,0.07)', display:'flex', alignItems:'center', gap:12, background:'#111', flexShrink:0 }}>
              <div style={{ display:'flex', gap:6 }}>
                {['#FF5F57','#FFBD2E','#28C840'].map(c=>(
                  <div key={c} style={{ width:10, height:10, borderRadius:5, background:c }} />
                ))}
              </div>
              <div style={{ flex:1, background:'#222', borderRadius:6, padding:'5px 14px', fontFamily:'JetBrains Mono, monospace', fontSize:12, color:'rgba(255,255,255,0.3)', letterSpacing:'0.04em' }}>
                admin.orientavoz.itca / {cur.label.toLowerCase().replace(' ','-')}
              </div>
            </div>
            <div style={{ flex:1, minHeight:0, overflow:'hidden', position:'relative', background:'#111' }}>
              {screens.map((s,i)=>(
                <img key={i} src={s.img} alt={s.label} style={{
                  position:'absolute', top:0, left:0, width:'100%', height:'auto',
                  display:'block',
                  opacity: i===active ? 1 : 0,
                  transition:'opacity .4s cubic-bezier(.2,.8,.2,1)',
                }} />
              ))}
            </div>
          </div>
          <div style={{
            position:'absolute', bottom:28, left:'50%', transform:'translateX(-50%)',
            background:'rgba(255,255,255,0.08)', color:'rgba(255,255,255,0.7)', borderRadius:999,
            padding:'8px 20px', fontFamily:'JetBrains Mono, monospace', fontSize:13,
            letterSpacing:'0.1em', whiteSpace:'nowrap', backdropFilter:'blur(8px)',
          }}>
            {cur.num} · {cur.label.toUpperCase()}
          </div>
        </div>

        {/* RIGHT */}
        <div style={{ padding:`${SPACE.pageY}px ${SPACE.pageX}px`, display:'flex', flexDirection:'column', justifyContent:'center', borderLeft:'1px solid rgba(255,255,255,0.08)' }}>
          <div className="eyebrow" style={{ marginBottom:20, color:'rgba(245,243,236,0.4)' }}>15 · MÓDULO ADMIN</div>
          <div className="display" style={{ fontSize:72, lineHeight:0.96, marginBottom:28, color:TOKENS.bg }}>
            Panel de<br/>
            <span className="italic" style={{ color:TOKENS.accent }}>administración.</span>
          </div>
          <div style={{ fontSize:20, lineHeight:1.5, color:'rgba(245,243,236,0.65)', marginBottom:44, maxWidth:440 }}>
            {cur.desc}
          </div>

          {/* Thumbnail strip */}
          <div style={{ display:'grid', gridTemplateColumns:'1fr 1fr', gap:10 }}>
            {screens.map((s,i) => (
              <button key={i} onClick={()=>setActive(i)} style={{
                display:'flex', flexDirection:'column', gap:8,
                padding:'10px 12px', border:`1px solid ${i===active ? TOKENS.accent : 'rgba(255,255,255,0.1)'}`,
                borderRadius:10, background: i===active ? 'rgba(226,81,42,0.1)' : 'rgba(255,255,255,0.04)',
                cursor:'pointer', textAlign:'left', transition:'all .2s',
              }}>
                <div style={{
                  width:'100%', height:40, borderRadius:6, overflow:'hidden',
                  border:'1px solid rgba(255,255,255,0.08)', background:'#111',
                }}>
                  <img src={s.img} alt={s.label} style={{ width:'100%', height:'100%', objectFit:'contain', objectPosition:'top center' }} />
                </div>
                <div style={{ display:'flex', alignItems:'center', gap:8 }}>
                  <span style={{ fontFamily:'JetBrains Mono, monospace', fontSize:10, letterSpacing:'0.1em', color:'rgba(245,243,236,0.35)' }}>{s.num}</span>
                  <span style={{ fontSize:13, fontWeight: i===active ? 600 : 400, color: i===active ? TOKENS.bg : 'rgba(245,243,236,0.55)' }}>{s.label}</span>
                  {i===active && <div style={{ marginLeft:'auto', width:5, height:5, borderRadius:3, background:TOKENS.accent }} />}
                </div>
              </button>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

/* ─────────── SLIDE 12 — FLUJO RAG ─────────── */
function RagSlide() {
  const [t, setT] = useState(0);
  useEffect(()=>{
    let raf, s;
    const loop = (ts)=>{ if(!s)s=ts; setT(((ts-s)/1000)%12); raf=requestAnimationFrame(loop);} ;
    raf=requestAnimationFrame(loop);
    return ()=>cancelAnimationFrame(raf);
  }, []);

  const steps = [
    { n:'01', t:'Ingesta',      d:'Carga de PDFs por el administrador' },
    { n:'02', t:'Segmentación', d:'Split por secciones y párrafos' },
    { n:'03', t:'Embeddings',   d:'Vectorización semántica' },
    { n:'04', t:'Indexación',   d:'Almacenamiento en pgvector' },
    { n:'05', t:'Query',        d:'Pregunta del aspirante → vector' },
    { n:'06', t:'Retrieval',    d:'Top-K fragmentos más similares' },
    { n:'07', t:'Generación',   d:'LLM responde con contexto inyectado' },
  ];
  const active = Math.floor(t / (12 / steps.length));

  return (
    <div style={{ width: '100%', height: '100%', background: TOKENS.bg, position: 'relative' }}>
      <Chrome index={16} total={20} label="Pipeline RAG" />
      <div style={{ padding: `${SPACE.pageY}px ${SPACE.pageX}px`, height: '100%' }}>
        <div className="eyebrow">12 · DE PDF A RESPUESTA</div>
        <div className="display" style={{ fontSize: 76, marginTop: 28, marginBottom: 48, maxWidth: 1500 }}>
          Cada respuesta del asistente está<span style={{color:TOKENS.accent}}>:</span> <span className="italic">anclada a un documento real.</span>
        </div>

        <div style={{ display: 'flex', flexDirection: 'column', gap: 20 }}>
          {steps.map((s, i) => {
            const isActive = i === active;
            const isPast = i < active;
            return (
              <div key={s.n} style={{
                display: 'grid', gridTemplateColumns: '80px 240px 1fr 400px', alignItems: 'center', gap: 32,
                padding: '20px 28px',
                background: isActive ? TOKENS.ink : 'rgba(255,255,255,0.4)',
                color: isActive ? TOKENS.bg : TOKENS.ink,
                border: `1px solid ${isActive ? TOKENS.ink : TOKENS.line}`,
                borderRadius: 12, transition: 'all .3s cubic-bezier(.2,.8,.2,1)',
                transform: isActive ? 'translateX(12px)' : 'none',
                opacity: isPast ? 0.5 : 1,
              }}>
                <div style={{ fontFamily: 'JetBrains Mono, monospace', fontSize: 15, color: isActive ? TOKENS.accent : TOKENS.mute, letterSpacing: '0.08em' }}>{s.n}</div>
                <div style={{ fontFamily: 'Instrument Serif, serif', fontSize: 40 }}>{s.t}</div>
                <div style={{ fontSize: 22, color: isActive ? 'rgba(245,243,236,0.8)' : TOKENS.ink2 }}>{s.d}</div>
                <div style={{ display: 'flex', justifyContent: 'flex-end' }}>
                  {/* visual glyph per step */}
                  <div style={{ display: 'flex', gap: 4, alignItems: 'center' }}>
                    {i === 2 ? Array.from({length:12}).map((_,k)=>(
                      <div key={k} style={{width:8,height:8,background: isActive?TOKENS.accent:TOKENS.line,borderRadius:4}}/>
                    )) : i === 5 ? Array.from({length:5}).map((_,k)=>(
                      <div key={k} style={{width:14,height:14,border:`1px solid ${isActive?TOKENS.accent:TOKENS.line}`,background:k===1||k===3?isActive?TOKENS.accent:TOKENS.line:'transparent'}}/>
                    )) : Array.from({length:6}).map((_,k)=>(
                      <div key={k} style={{width:3,height:12+k*3,background:isActive?TOKENS.accent:TOKENS.line}}/>
                    ))}
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}

/* ─────────── SLIDE 13 — ALCANCES Y LIMITACIONES ─────────── */
function ScopeSlide() {
  const scopes = [
    'Interfaz híbrida voz + texto',
    'Conocimiento dinámico (RAG)',
    'STT/TTS en tiempo real',
    'Persistencia de sesión',
    'Gestión de conocimiento',
    'Privacidad local',
  ];
  const limits = [
    ['PDFs', 'No procesa escaneados sin OCR'],
    ['Concurrencia', 'Sujeta a capacidad del servidor'],
    ['Contexto', 'Ventana limitada por fragmento'],
    ['Red', 'Estabilidad de voz depende del internet'],
    ['Latencia RAG', '+500 ms a 2 s por recuperación'],
    ['Alucinaciones', 'Mitigadas con restricción de prompt'],
    ['Barge-in', 'Ruido puede interrumpir al TTS'],
    ['Términos técnicos', 'WER sube en vocabulario específico'],
  ];
  return (
    <div style={{ width: '100%', height: '100%', background: TOKENS.bg, position: 'relative' }}>
      <Chrome index={17} total={20} label="Alcances y limitaciones" />
      <div style={{ padding: `${SPACE.pageY}px ${SPACE.pageX}px`, height: '100%' }}>
        <div className="eyebrow">13 · ALCANCES · LIMITACIONES</div>
        <div className="display" style={{ fontSize: 76, marginTop: 28, marginBottom: 48, maxWidth: 1500 }}>
          Ser explícitos<span style={{color:TOKENS.accent}}>:</span> qué hace y qué <span className="italic">no hace</span> el sistema.
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1.2fr', gap: 60 }}>
          {/* Scopes — inside dark block */}
          <div style={{ background: TOKENS.ink, color: TOKENS.bg, padding: 40, borderRadius: 18, minHeight: 520 }}>
            <div style={{ fontFamily: 'JetBrains Mono, monospace', fontSize: 14, color: TOKENS.accent, letterSpacing: '0.12em', textTransform: 'uppercase', marginBottom: 24 }}>✓ ALCANCES</div>
            {scopes.map((s,i)=>(
              <div key={s} style={{ padding: '18px 0', borderTop: `1px solid rgba(245,243,236,0.1)`, borderBottom: i === scopes.length-1?`1px solid rgba(245,243,236,0.1)`:'none', display:'flex', alignItems:'baseline', gap:18 }}>
                <span style={{ fontFamily: 'JetBrains Mono, monospace', fontSize: 14, color: TOKENS.accent }}>{String(i+1).padStart(2,'0')}</span>
                <span style={{ fontSize: 26, fontFamily: 'Instrument Serif, serif' }}>{s}</span>
              </div>
            ))}
          </div>

          {/* Limits — light side */}
          <div>
            <div style={{ fontFamily: 'JetBrains Mono, monospace', fontSize: 14, color: TOKENS.mute, letterSpacing: '0.12em', textTransform: 'uppercase', marginBottom: 24 }}>⊘ LIMITACIONES</div>
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 0 }}>
              {limits.map(([h,d],i)=>(
                <div key={h} style={{
                  padding: '20px 20px 20px 0',
                  borderTop: i < 2 ? `1px solid ${TOKENS.line}` : 'none',
                  borderBottom: `1px solid ${TOKENS.line}`,
                  borderRight: i % 2 === 0 ? `1px solid ${TOKENS.line}` : 'none',
                  paddingLeft: i % 2 === 1 ? 20 : 0,
                }}>
                  <div style={{ fontFamily: 'Instrument Serif, serif', fontSize: 28, color: TOKENS.ink }}>{h}</div>
                  <div style={{ fontSize: 17, color: TOKENS.ink2, marginTop: 4, lineHeight: 1.35 }}>{d}</div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

/* ─────────── SLIDE 14 — MÉTRICAS ─────────── */
function MetricsSlide() {
  const groups = [
    {
      title: 'RAG · RAGAS',
      color: TOKENS.accent,
      metrics: [
        ['Faithfulness', '> 0.90', 'Respuesta derivada del contexto.'],
        ['Answer Relevance', '> 0.85', 'Pertinencia a la pregunta.'],
        ['Context Precision', '> 0.80', 'Precisión del retrieval.'],
      ],
    },
    {
      title: 'NLP · clasificación',
      color: TOKENS.blue,
      metrics: [
        ['Precision', '≥ 0.80', 'Recomendaciones correctas.'],
        ['Recall', '≥ 0.80', 'Perfiles detectados.'],
        ['F1-Score', '≥ 0.82', 'Balance global.'],
        ['WER (Whisper)', '< 6 %', 'Errores de transcripción.'],
      ],
    },
    {
      title: 'UX · latencia',
      color: TOKENS.ok,
      metrics: [
        ['TTFT', '< 1.5 s', 'Hasta primer token.'],
        ['Latencia E2E', '< 3 s', 'Voz → Voz completo.'],
        ['Tasa de interrupción', '> 90 %', 'Barge-in exitoso.'],
      ],
    },
  ];
  return (
    <div style={{ width: '100%', height: '100%', background: TOKENS.bg, position: 'relative' }}>
      <Chrome index={18} total={20} label="Métricas de validación" />
      <div style={{ padding: `${SPACE.pageY}px ${SPACE.pageX}px`, height: '100%' }}>
        <div className="eyebrow">14 · MÉTRICAS DE VALIDACIÓN</div>
        <div className="display" style={{ fontSize: 76, marginTop: 28, marginBottom: 48, maxWidth: 1500 }}>
          Lo que medimos<span style={{color:TOKENS.accent}}>,</span> antes de decir que <span className="italic">funciona.</span>
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 32 }}>
          {groups.map((g) => (
            <div key={g.title} style={{ border: `1px solid ${TOKENS.line}`, background: '#fff', padding: 28, borderRadius: 6 }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 24 }}>
                <div style={{ width: 10, height: 10, background: g.color, borderRadius: 5 }}/>
                <div style={{ fontFamily: 'JetBrains Mono, monospace', fontSize: 13, color: TOKENS.ink, letterSpacing: '0.1em', textTransform: 'uppercase' }}>{g.title}</div>
              </div>
              {g.metrics.map(([m, target, desc], i) => (
                <div key={m} style={{ padding: '16px 0', borderTop: i === 0 ? `1px solid ${TOKENS.line}` : 'none', borderBottom: `1px solid ${TOKENS.line}` }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline' }}>
                    <div style={{ fontFamily: 'Instrument Serif, serif', fontSize: 26, color: TOKENS.ink }}>{m}</div>
                    <div style={{ fontFamily: 'JetBrains Mono, monospace', fontSize: 16, color: g.color, fontWeight: 500 }}>{target}</div>
                  </div>
                  <div style={{ fontSize: 16, color: TOKENS.mute, marginTop: 4 }}>{desc}</div>
                </div>
              ))}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

/* ─────────── SLIDE 15 — CRONOGRAMA ─────────── */
function TimelineSlide() {
  const phases = [
    { n:'F0', t:'Presentación de idea',           w:2, done:true },
    { n:'F1', t:'Arquitectura de microservicios', w:2, done:true },
    { n:'F2', t:'Diseño de base de datos',        w:2, done:true },
    { n:'F3', t:'Documentación de anteproyecto',  w:1, done:true },
    { n:'F4', t:'Selección de modelos IA',        w:2, done:true },
    { n:'F5', t:'Diseño del frontend',            w:2, done:true },
    { n:'F6', t:'Autenticación y carga PDF',      w:3, done:'now' },
    { n:'F7', t:'Ingestión + pipeline RAG',       w:3, done:false },
    { n:'F8', t:'Integración STT/TTS',            w:2, done:false },
    { n:'F9', t:'Integración RAG + backend',      w:2, done:false },
    { n:'F10',t:'Máquinas virtuales en nube',     w:1, done:false },
    { n:'F11',t:'EKS · microservicios',           w:2, done:false },
    { n:'F12',t:'Despliegue de aplicación',       w:2, done:false },
  ];
  const total = phases.reduce((a,b)=>a+b.w,0);
  let offset = 0;
  return (
    <div style={{ width: '100%', height: '100%', background: TOKENS.bg, position: 'relative' }}>
      <Chrome index={19} total={20} label="Cronograma" />
      <div style={{ padding: `${SPACE.pageY}px ${SPACE.pageX}px`, height: '100%' }}>
        <div className="eyebrow">15 · HITOS TÉCNICOS</div>
        <div className="display" style={{ fontSize: 76, marginTop: 28, marginBottom: 24, maxWidth: 1500 }}>
          Cronograma<span style={{color:TOKENS.accent}}>.</span> <span className="italic">Actualmente en fase 6.</span>
        </div>

        {/* scale */}
        <div style={{ display: 'flex', justifyContent: 'space-between', fontFamily: 'JetBrains Mono, monospace', fontSize: 13, color: TOKENS.mute, letterSpacing: '0.08em', textTransform: 'uppercase', marginBottom: 12, marginTop: 32 }}>
          <span>SEMANA 01</span><span>S 06</span><span>S 12</span><span>S 18</span><span>S 24</span><span>SEMANA {total}</span>
        </div>
        <div style={{ height: 1, background: TOKENS.line, marginBottom: 24 }}/>

        <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
          {phases.map((p, i) => {
            const leftPct = (offset / total) * 100;
            const widthPct = (p.w / total) * 100;
            offset += p.w;
            const bg = p.done === true ? TOKENS.ink : p.done === 'now' ? TOKENS.accent : TOKENS.sand;
            const fg = p.done === true || p.done === 'now' ? '#fff' : TOKENS.ink;
            return (
              <div key={p.n} style={{ display: 'grid', gridTemplateColumns: '60px 300px 1fr', alignItems: 'center', gap: 20 }}>
                <div style={{ fontFamily: 'JetBrains Mono, monospace', fontSize: 14, color: TOKENS.mute }}>{p.n}</div>
                <div style={{ fontSize: 20, color: TOKENS.ink }}>{p.t}</div>
                <div style={{ position: 'relative', height: 34, background: 'rgba(205,200,184,0.2)' }}>
                  <div style={{
                    position: 'absolute', left: leftPct + '%', width: widthPct + '%',
                    top: 0, height: '100%',
                    background: bg, color: fg,
                    display: 'flex', alignItems: 'center', padding: '0 12px',
                    fontFamily: 'JetBrains Mono, monospace', fontSize: 12, letterSpacing: '0.08em',
                  }}>
                    {p.done === 'now' ? '● EN CURSO' : p.done === true ? '✓' : ''}
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}

/* ─────────── SLIDE 16 — PRESUPUESTO + CIERRE ─────────── */
function ClosingSlide() {
  const costs = [
    { t: 'VM Cloud', d: '4 vCPU · 16 GB RAM · Django + Ollama', c: '$11 – $20', color: TOKENS.accent },
    { t: 'Almacenamiento SSD', d: 'DB, modelos y PDFs institucionales', c: '$5', color: TOKENS.accent },
    { t: 'LLM · Whisper · Kokoro', d: 'Ejecución local vía Ollama', c: '$0', color: TOKENS.ok },
    { t: 'Django · React · Ollama · ChromaDB', d: 'Stack 100% open source', c: '$0', color: TOKENS.ok },
  ];
  return (
    <div style={{ width: '100%', height: '100%', background: TOKENS.bg, position: 'relative' }}>
      <Chrome index={20} total={20} label="Presupuesto · cierre" />
      <div style={{ padding: `${SPACE.pageY}px ${SPACE.pageX}px`, height: '100%', display: 'grid', gridTemplateColumns: '1.1fr 1fr', gap: 80 }}>

        <div>
          <div className="eyebrow">16 · PRESUPUESTO</div>
          <div className="display" style={{ fontSize: 100, marginTop: 28, lineHeight: 0.96 }}>
            Costo total mensual<span style={{color:TOKENS.accent}}>:</span>
          </div>

          <div style={{ marginTop: 36, display: 'flex', alignItems: 'baseline', gap: 20 }}>
            <div style={{ fontFamily: 'Instrument Serif, serif', fontSize: 260, color: TOKENS.ink, lineHeight: 0.9 }}>$25</div>
            <div style={{ fontFamily: 'JetBrains Mono, monospace', fontSize: 16, color: TOKENS.mute, letterSpacing: '0.1em', textTransform: 'uppercase' }}>MÁX ESTIMADO / MES</div>
          </div>

          <div style={{ marginTop: 40, display: 'flex', flexDirection: 'column', gap: 0 }}>
            {costs.map((c, i) => (
              <div key={c.t} style={{
                display: 'grid', gridTemplateColumns: '1fr 130px', alignItems: 'center', gap: 20,
                padding: '18px 0',
                borderTop: i === 0 ? `1px solid ${TOKENS.line}` : 'none',
                borderBottom: `1px solid ${TOKENS.line}`,
              }}>
                <div>
                  <div style={{ fontFamily: 'Instrument Serif, serif', fontSize: 26, color: TOKENS.ink }}>{c.t}</div>
                  <div style={{ fontSize: 15, color: TOKENS.mute, marginTop: 2 }}>{c.d}</div>
                </div>
                <div style={{ fontFamily: 'JetBrains Mono, monospace', fontSize: 20, color: c.color, textAlign: 'right' }}>{c.c}</div>
              </div>
            ))}
          </div>
        </div>

        <div style={{ background: TOKENS.ink, color: TOKENS.bg, padding: 56, borderRadius: 18, display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}>
          <div>
            <div style={{ fontFamily: 'JetBrains Mono, monospace', fontSize: 14, letterSpacing: '0.14em', textTransform: 'uppercase', color: TOKENS.accent, marginBottom: 24 }}>CIERRE</div>
            <div className="display" style={{ fontSize: 72, color: TOKENS.bg, lineHeight: 1 }}>
              Una plataforma<br/> que pone la <span className="italic" style={{color:TOKENS.accent}}>decisión</span><br/>en manos del aspirante.
            </div>
          </div>

          <div>
            <div style={{ fontFamily: 'JetBrains Mono, monospace', fontSize: 14, letterSpacing: '0.14em', textTransform: 'uppercase', color: 'rgba(245,243,236,0.5)', marginBottom: 16 }}>PREGUNTAS / CONTACTO</div>
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 24 }}>
              <div>
                <div style={{ fontSize: 14, color: 'rgba(245,243,236,0.5)', fontFamily: 'JetBrains Mono, monospace', letterSpacing: '0.1em' }}>AUTOR</div>
                <div style={{ fontSize: 22, marginTop: 4 }}>D. Orellana</div>
              </div>
              <div>
                <div style={{ fontSize: 14, color: 'rgba(245,243,236,0.5)', fontFamily: 'JetBrains Mono, monospace', letterSpacing: '0.1em' }}>INSTITUCIÓN</div>
                <div style={{ fontSize: 22, marginTop: 4 }}>ITCA-FEPADE</div>
              </div>
            </div>

            <div style={{ marginTop: 40, fontFamily: 'Instrument Serif, serif', fontSize: 52, color: TOKENS.accent, letterSpacing: '-0.02em' }}>
              Gracias.
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

/* ─────────── SLIDE 8 — DIAGRAMA DE PROCESOS ─────────── */
function ProcessFlowSlide() {
  const [mode, setMode] = useState('voice');   // 'voice' | 'text'
  const [ragOn, setRagOn] = useState(true);     // RAG active or not
  const [step, setStep] = useState(0);
  const [playing, setPlaying] = useState(true);
  const [selected, setSelected] = useState(null);
  // ─── Colors ───
  const VOZ_C = '#E2512A';
  const TEX_C = '#2F7D4E';
  const RAG_C_V = '#0A2540';
  const PROC = '#E8D5B0';
  const API_C = '#C97878';
  const DATA_C = '#D4A86A';
  const DEC_C = '#E8C99A';

  const nodes = [
    { id:'web',     x:640, y:20,  w:200,h:52, label:'Página Web',          sub:'Entrada del aspirante',  color:PROC,  shape:'rect', info:'El aspirante accede a la plataforma web desde cualquier dispositivo con internet.' },
    { id:'chat',    x:280, y:130, w:170,h:52, label:'Chat',                sub:'Consulta textual',       color:PROC,  shape:'rect', info:'Interfaz de chat de texto donde el aspirante escribe sus consultas directamente.' },
    { id:'reunion', x:620, y:130, w:200,h:52, label:'Reunión',             sub:'Sesión de voz',          color:PROC,  shape:'rect', info:'El aspirante inicia una sesión de voz con el asistente de orientación vocacional.' },
    { id:'form',    x:940, y:130, w:190,h:52, label:'Rellenar formulario', sub:'Datos de contacto',      color:PROC,  shape:'rect', info:'Si desea una cita presencial, completa un formulario con sus datos de contacto.' },
    { id:'correo',  x:940, y:230, w:190,h:68, label:'Enviar fecha',        sub:'Notificación por correo',color:PROC,  shape:'rect', info:'El sistema envía al correo del aspirante la próxima fecha disponible para reunirse.' },
    { id:'livekit', x:630, y:240, w:180,h:52, label:'LiveKit',             sub:'WebRTC · transporte',   color:PROC,  shape:'rect', info:'LiveKit gestiona el transporte de audio en tiempo real con latencia ultra-baja vía WebRTC.' },
    { id:'whisper', x:630, y:350, w:180,h:52, label:'Whisper (STT)',       sub:'Audio → Texto',          color:API_C, shape:'rect', info:'OpenAI Whisper convierte el audio del aspirante en texto con alta precisión (WER <5%).' },
    { id:'diamond', x:720, y:458, w:0,  h:0,  label:'¿Info institución?',  sub:'Decisión RAG',           color:DEC_C, shape:'diamond', info:'El sistema decide si la pregunta requiere buscar en los documentos (RAG activo) o responder directamente con el LLM.' },
    { id:'rag',     x:360, y:560, w:170,h:52, label:'API RAG',             sub:'Búsqueda semántica',     color:API_C, shape:'rect', info:'El servicio RAG busca los fragmentos de PDF más relevantes usando búsqueda semántica en pgvector.' },
    { id:'db',      x:100, y:560, w:210,h:68, label:'DB Vectorial',        sub:'pgvector · RAG Store',   color:DATA_C,shape:'rect', info:'PostgreSQL con pgvector almacena los embeddings de todos los documentos institucionales.' },
    { id:'union',   x:320, y:680, w:250,h:68, label:'Pregunta + contexto', sub:'Prompt enriquecido',     color:PROC,  shape:'rect', info:'La pregunta del usuario se une con los fragmentos del RAG para formar un prompt enriquecido.' },
    { id:'ollama',  x:620, y:620, w:180,h:52, label:'API Ollama (LLM)',    sub:'Razonamiento local',     color:API_C, shape:'rect', info:'Ollama ejecuta el modelo LLM localmente. Genera la respuesta con o sin contexto RAG.' },
    { id:'kokoro',  x:940, y:440, w:180,h:52, label:'Kokoro (TTS)',        sub:'Texto → Audio',          color:API_C, shape:'rect', info:'Kokoro-82M convierte la respuesta del LLM en audio natural con latencia mínima.' },
  ];

  // ─── Flows ───
  const voiceStepsRag    = ['web','reunion','livekit','whisper','diamond','rag','db','union','ollama','kokoro','livekit'];
  const voiceStepsDirect = ['web','reunion','livekit','whisper','diamond','ollama','kokoro','livekit'];
  const textStepsRag     = ['web','chat','diamond','rag','db','union','ollama','chat'];
  const textStepsDirect  = ['web','chat','diamond','ollama','chat'];

  const activeSteps = mode==='voice' ? (ragOn ? voiceStepsRag : voiceStepsDirect) : (ragOn ? textStepsRag : textStepsDirect);
  const totalSteps = activeSteps.length;
  const flowColor = mode==='voice' ? VOZ_C : TEX_C;

  useEffect(()=>{
    if (!playing) return;
    const t = setTimeout(()=>setStep(s=>(s+1)%totalSteps), 1800);
    return ()=>clearTimeout(t);
  }, [step, playing, totalSteps]);

  useEffect(()=>{ setStep(0); }, [mode, ragOn]);

  const activeNodeId = activeSteps[step];

  const getC = id => {
    const n = nodes.find(x=>x.id===id);
    if (!n) return {x:0,y:0};
    if (n.shape==='diamond') return {x:n.x, y:n.y};
    return {x:n.x+n.w/2, y:n.y+n.h/2};
  };

  const isArrowActive = (from, to) => {
    for (let i=0; i<step; i++) {
      if (activeSteps[i]===from && activeSteps[i+1]===to) return true;
    }
    return false;
  };

  const arrows = [
    {from:'web',     to:'chat',    label:'texto',   flow:'text'},
    {from:'web',     to:'reunion', label:'voz',     flow:'voice'},
    {from:'reunion', to:'form',    label:'cita',    flow:'none'},
    {from:'form',    to:'correo',  label:'',        flow:'none'},
    {from:'reunion', to:'livekit', label:'audio',   flow:'voice'},
    {from:'livekit', to:'whisper', label:'audio',   flow:'voice'},
    {from:'whisper', to:'diamond', label:'texto',   flow:'voice'},
    {from:'chat',    to:'diamond', label:'consulta',flow:'text'},
    {from:'diamond', to:'rag',     label:'si · RAG',flow:'rag'},
    {from:'rag',     to:'db',      label:'query',   flow:'rag'},
    {from:'db',      to:'rag',     label:'docs',    flow:'rag'},
    {from:'rag',     to:'union',   label:'',        flow:'rag'},
    {from:'union',   to:'ollama',  label:'prompt',  flow:'rag'},
    {from:'diamond', to:'ollama',  label:'no · RAG',flow:'direct'},
    {from:'ollama',  to:'kokoro',  label:'texto',   flow:'voice'},
    {from:'kokoro',  to:'livekit', label:'audio',   flow:'voice'},
  ];

  const sel = selected ? nodes.find(n=>n.id===selected) : null;

  return (
    <div style={{width:'100%',height:'100%',background:TOKENS.bg,position:'relative'}}>
      <Chrome index={8} total={20} label="Diagrama de procesos"/>
      <div style={{padding:`${SPACE.pageY}px ${SPACE.pageX}px`, height:'100%', display:'grid', gridTemplateColumns: sel ? '1fr 340px' : '1fr', gap:32}}>
        <div style={{display:'flex',flexDirection:'column'}}>

          <div style={{display:'flex',justifyContent:'space-between',alignItems:'flex-end',marginBottom:12}}>
            <div>
              <div className="eyebrow">06 · DIAGRAMA DE PROCESOS</div>
              <div className="display" style={{fontSize:54,marginTop:10,lineHeight:1}}>
                Flujo del sistema<span style={{color:TOKENS.accent}}>.</span>
              </div>
            </div>
            <div style={{display:'flex',gap:10,alignItems:'center'}}>
              <div style={{display:'flex',background:TOKENS.bg2,borderRadius:12,padding:4}}>
                {[['voice','🎤 Voz',VOZ_C],['text','💬 Texto',TEX_C]].map(([m,l,c])=>(
                  <button key={m} onClick={()=>setMode(m)} style={{
                    padding:'10px 20px',border:0,borderRadius:8,cursor:'pointer',
                    background:mode===m?c:'transparent',color:mode===m?'#fff':TOKENS.mute,
                    fontFamily:'JetBrains Mono, monospace',fontSize:13,transition:'all .2s',
                  }}>{l}</button>
                ))}
              </div>
              <button onClick={()=>setRagOn(r=>!r)} style={{
                padding:'10px 18px',border:`2px solid ${ragOn?RAG_C_V:TOKENS.line}`,
                background:ragOn?'rgba(10,37,64,0.1)':'transparent',
                color:ragOn?RAG_C_V:TOKENS.mute,
                borderRadius:10,fontFamily:'JetBrains Mono, monospace',fontSize:13,cursor:'pointer',transition:'all .2s',
              }}>{ragOn ? '● RAG ACTIVO' : '○ SIN RAG'}</button>
              <button onClick={()=>setPlaying(p=>!p)} style={{
                padding:'10px 14px',border:`1px solid ${TOKENS.line}`,background:'#fff',
                borderRadius:10,fontFamily:'JetBrains Mono, monospace',fontSize:14,cursor:'pointer',color:TOKENS.ink,
              }}>{playing ? '❚❚' : '▶'}</button>
            </div>
          </div>

          {/* Legend */}
          <div style={{display:'flex',gap:20,marginBottom:8,fontFamily:'JetBrains Mono, monospace',fontSize:12,letterSpacing:'0.06em'}}>
            <span style={{color:VOZ_C,display:'flex',alignItems:'center',gap:6}}><span style={{display:'inline-block',width:24,height:3,background:VOZ_C,verticalAlign:'middle'}}/> FLUJO VOZ</span>
            <span style={{color:TEX_C,display:'flex',alignItems:'center',gap:6}}><span style={{display:'inline-block',width:24,height:3,background:TEX_C,verticalAlign:'middle'}}/> FLUJO TEXTO</span>
            <span style={{color:RAG_C_V,display:'flex',alignItems:'center',gap:6}}><span style={{display:'inline-block',width:24,height:3,background:RAG_C_V,verticalAlign:'middle'}}/> FLUJO RAG</span>
            <span style={{marginLeft:'auto',color:TOKENS.ink,fontFamily:'JetBrains Mono, monospace',fontSize:12}}>
              PASO {step+1}/{totalSteps} · {activeNodeId?.toUpperCase()}
            </span>
          </div>

          {/* Canvas */}
          <div style={{flex:1,position:'relative',background:'rgba(255,255,255,0.55)',border:`1px solid ${TOKENS.line}`,borderRadius:16,overflow:'hidden'}}>
            <svg width="100%" height="100%" viewBox="0 0 1200 780" style={{position:'absolute',inset:0}}>
              <defs>
                <marker id="mV" markerWidth="9" markerHeight="7" refX="8" refY="3.5" orient="auto"><polygon points="0 0,9 3.5,0 7" fill="#E2512A"/></marker>
                <marker id="mT" markerWidth="9" markerHeight="7" refX="8" refY="3.5" orient="auto"><polygon points="0 0,9 3.5,0 7" fill="#2F7D4E"/></marker>
                <marker id="mR" markerWidth="9" markerHeight="7" refX="8" refY="3.5" orient="auto"><polygon points="0 0,9 3.5,0 7" fill="#0A2540"/></marker>
                <marker id="mG" markerWidth="9" markerHeight="7" refX="8" refY="3.5" orient="auto"><polygon points="0 0,9 3.5,0 7" fill="#999"/></marker>
                <filter id="gPF"><feGaussianBlur stdDeviation="3" result="b"/><feMerge><feMergeNode in="b"/><feMergeNode in="SourceGraphic"/></feMerge></filter>
              </defs>

              {/* Arrows */}
              {arrows.map((ar,i)=>{
                const act = isArrowActive(ar.from, ar.to);
                const f = getC(ar.from), t = getC(ar.to);
                const mx = (f.x+t.x)/2 - (ar.flow==='none'?0:15);
                const my = (f.y+t.y)/2 - 22;
                const clr = act ? (ar.flow==='rag'?RAG_C_V:ar.flow==='text'?TEX_C:ar.flow==='direct'?flowColor:VOZ_C) : TOKENS.line;
                const mkr = act ? (ar.flow==='rag'?'url(#mR)':ar.flow==='text'?'url(#mT)':'url(#mV)') : 'url(#mG)';
                const path = `M ${f.x} ${f.y} Q ${mx} ${my} ${t.x} ${t.y}`;
                return (
                  <g key={i}>
                    <path d={path} stroke={act?clr:'#CCC'} strokeWidth={act?2.5:1.5} fill="none" markerEnd={mkr} opacity={act?1:0.4}/>
                    {ar.label && <text x={mx} y={my-6} textAnchor="middle" fontSize="10" fontFamily="JetBrains Mono, monospace"
                      fill={act?clr:'#BBB'} letterSpacing="0.3">{ar.label}</text>}
                    {act && <circle r="5" fill={clr} filter="url(#gPF)">
                      <animateMotion dur="1.6s" repeatCount="indefinite" path={path}/>
                      <animate attributeName="opacity" values="0;1;1;0" dur="1.6s" repeatCount="indefinite"/>
                    </circle>}
                  </g>
                );
              })}

              {/* Text loop-back */}
              {mode==='text' && step >= totalSteps-1 && (
                <g>
                  <path d="M 620 646 L 40 646 L 40 156 L 280 156" stroke={TEX_C} strokeWidth="2" fill="none" markerEnd="url(#mT)" strokeDasharray="6 3"/>
                  <circle r="5" fill={TEX_C}><animateMotion dur="2.4s" repeatCount="indefinite" path="M 620 646 L 40 646 L 40 156 L 280 156"/></circle>
                </g>
              )}

              {/* Nodes */}
              {nodes.map(n=>{
                const isAct = n.id===activeNodeId;
                const wasPast = activeSteps.slice(0,step+1).includes(n.id);
                const isRagNode = ['rag','db','union'].includes(n.id);
                const nodeColor = isAct ? (isRagNode&&ragOn ? RAG_C_V : flowColor) : n.color;
                if (n.shape==='diamond') {
                  const s=50;
                  return (
                    <g key={n.id} onClick={()=>setSelected(n.id===selected?null:n.id)} style={{cursor:'pointer'}}>
                      {isAct && <polygon points={`${n.x},${n.y-s-10} ${n.x+s+10},${n.y} ${n.x},${n.y+s+10} ${n.x-s-10},${n.y}`} fill="none" stroke={ragOn?RAG_C_V:flowColor} strokeWidth="2" opacity="0.4"><animate attributeName="opacity" values="0.4;0;0.4" dur="1.2s" repeatCount="indefinite"/></polygon>}
                      <polygon points={`${n.x},${n.y-s} ${n.x+s},${n.y} ${n.x},${n.y+s} ${n.x-s},${n.y}`}
                        fill={isAct?(ragOn?RAG_C_V:flowColor):DEC_C}
                        stroke={isAct?(ragOn?RAG_C_V:flowColor):'#AAA'} strokeWidth={isAct?2.5:1.5}
                        filter={isAct?"url(#gPF)":undefined}/>
                      <text x={n.x} y={n.y-5} textAnchor="middle" fontSize="12" fontFamily="Inter" fontWeight="600" fill={isAct?'#fff':TOKENS.ink2}>¿Info</text>
                      <text x={n.x} y={n.y+11} textAnchor="middle" fontSize="12" fontFamily="Inter" fontWeight="600" fill={isAct?'#fff':TOKENS.ink2}>institución?</text>
                      <text x={n.x-s-15} y={n.y+4} textAnchor="end" fontSize="11" fontFamily="JetBrains Mono, monospace" fill={RAG_C_V} fontWeight="700">si</text>
                      <text x={n.x+s+8} y={n.y+4} fontSize="11" fontFamily="JetBrains Mono, monospace" fill={flowColor} fontWeight="700">no</text>
                    </g>
                  );
                }
                return (
                  <g key={n.id} onClick={()=>setSelected(n.id===selected?null:n.id)} style={{cursor:'pointer'}}>
                    {isAct && <rect x={n.x-6} y={n.y-6} width={n.w+12} height={n.h+12} rx="11" fill="none" stroke={nodeColor} strokeWidth="2" opacity="0.4"><animate attributeName="opacity" values="0.4;0;0.4" dur="1.2s" repeatCount="indefinite"/></rect>}
                    <rect x={n.x} y={n.y} width={n.w} height={n.h} rx="7"
                      fill={nodeColor}
                      stroke={isAct?nodeColor:'#CCC'} strokeWidth={isAct?2.5:1}
                      filter={isAct?"url(#gPF)":undefined}
                      opacity={!wasPast&&!isAct?0.55:1}/>
                    <text x={n.x+n.w/2} y={n.y+n.h/2-4} textAnchor="middle" fontSize="14" fontFamily="Inter"
                      fontWeight="600" fill={isAct?'#fff':TOKENS.ink2}>{n.label}</text>
                    <text x={n.x+n.w/2} y={n.y+n.h/2+11} textAnchor="middle" fontSize="9"
                      fontFamily="JetBrains Mono, monospace" fill={isAct?'rgba(255,255,255,0.75)':TOKENS.mute} letterSpacing="0.3">{n.sub}</text>
                  </g>
                );
              })}
            </svg>
          </div>

          <div style={{marginTop:10,display:'flex',alignItems:'center',gap:10}}>
            <div style={{flex:1,height:4,background:TOKENS.line,borderRadius:2,overflow:'hidden'}}>
              <div style={{height:'100%',background:flowColor,width:`${((step+1)/totalSteps)*100}%`,transition:'width .4s'}}/>
            </div>
            <span style={{fontFamily:'JetBrains Mono, monospace',fontSize:11,color:TOKENS.mute,letterSpacing:'0.08em'}}>↔ CLIC EN NODOS</span>
          </div>
        </div>

        {sel && (
          <div key={sel.id} style={{background:sel.color,borderRadius:18,padding:30,display:'flex',flexDirection:'column',gap:14,animation:'slideInRightProc .35s cubic-bezier(.2,.8,.2,1)'}}>
            <div style={{fontFamily:'JetBrains Mono, monospace',fontSize:11,letterSpacing:'0.14em',color:TOKENS.ink2,textTransform:'uppercase',opacity:0.7}}>COMPONENTE</div>
            <div style={{fontFamily:'Instrument Serif, serif',fontSize:32,color:TOKENS.ink,lineHeight:1}}>{sel.label}</div>
            <div style={{height:1,background:'rgba(0,0,0,0.1)'}}/>
            <div style={{fontSize:18,color:TOKENS.ink2,lineHeight:1.45}}>{sel.info}</div>
            <div style={{marginTop:'auto',fontFamily:'JetBrains Mono, monospace',fontSize:11,color:TOKENS.mute,letterSpacing:'0.08em'}}>{sel.sub?.toUpperCase()}</div>
            <button onClick={()=>setSelected(null)} style={{padding:'10px 0',background:'rgba(0,0,0,0.08)',border:0,borderRadius:8,fontFamily:'JetBrains Mono, monospace',fontSize:12,cursor:'pointer',color:TOKENS.ink}}>× CERRAR</button>
          </div>
        )}
      </div>
      <style>{`@keyframes slideInRightProc{from{opacity:0;transform:translateX(30px)}to{opacity:1;transform:translateX(0)}}`}</style>
    </div>
  );
}

/* ─────────── SLIDE 9 — DER (Arquitectura de Datos) ─────────── */
function DERSlide() {
  const [selected, setSelected] = useState(null);

  // Exact entities from the real DER diagram
  const EW = 210, EH = 34; // entity header width/height
  const ROW = 22;           // attribute row height

  const entities = [
    { id:'visitor',     x:440,  y:20,  w:EW, label:'VISITOR',
      color:'#C8D8E8', headerColor:'#7CA8C8',
      attrs:[{n:'id',t:'SERIAL',k:'PK'},{n:'name',t:'VARCHAR',k:''},{n:'email',t:'VARCHAR',k:''},{n:'created_at',t:'TIMESTAMP',k:''}],
      desc:'Aspirante que visita la plataforma. Es el actor principal del sistema.' },
    { id:'admin',       x:1000, y:20,  w:EW, label:'ADMIN_USERS',
      color:'#C8D8E8', headerColor:'#7CA8C8',
      attrs:[{n:'id',t:'SERIAL',k:'PK'},{n:'name',t:'VARCHAR',k:''},{n:'email',t:'VARCHAR',k:''},{n:'password',t:'VARCHAR',k:''},{n:'created_at',t:'TIMESTAMP',k:''}],
      desc:'Usuario administrador con acceso al panel de gestión de documentos y configuración del sistema.' },
    { id:'schedule',    x:60,   y:270, w:EW, label:'SCHEDULE',
      color:'#D8E8D0', headerColor:'#90B890',
      attrs:[{n:'id',t:'SERIAL',k:'PK'},{n:'visitor_id',t:'INT',k:'FK'},{n:'start_time',t:'TIMESTAMP',k:''},{n:'end_time',t:'TIMESTAMP',k:''},{n:'created_at',t:'TIMESTAMP',k:''}],
      desc:'Agenda de citas/reuniones del visitante con el equipo de orientación vocacional.' },
    { id:'conversations', x:440, y:270, w:EW, label:'CONVERSATIONS',
      color:'#D8E8D0', headerColor:'#90B890',
      attrs:[{n:'id',t:'SERIAL',k:'PK'},{n:'visitor_id',t:'INT',k:'FK'},{n:'started_at',t:'TIMESTAMP',k:''},{n:'source',t:'VARCHAR',k:''},{n:'schedule_id',t:'INT',k:'FK'}],
      desc:'Sesión de conversación del visitante con el asistente. Puede ser de tipo texto o voz.' },
    { id:'documents',   x:1000, y:270, w:EW, label:'DOCUMENTS',
      color:'#E8DCC8', headerColor:'#C8A870',
      attrs:[{n:'id',t:'SERIAL',k:'PK'},{n:'title',t:'VARCHAR',k:''},{n:'file_path',t:'TEXT',k:''},{n:'uploaded_by',t:'INT',k:'FK'},{n:'created_at',t:'TIMESTAMP',k:''}],
      desc:'Documento PDF institucional cargado por el administrador. Sirve como fuente del sistema RAG.' },
    { id:'messages',    x:290,  y:530, w:EW, label:'MESSAGES',
      color:'#E8D8E8', headerColor:'#C890C8',
      attrs:[{n:'id',t:'SERIAL',k:'PK'},{n:'conversation_id',t:'INT',k:'FK'},{n:'role',t:'VARCHAR',k:''},{n:'content',t:'TEXT',k:''},{n:'created_at',t:'TIMESTAMP',k:''}],
      desc:'Cada mensaje individual dentro de una conversación, con su rol (user/assistant) y contenido.' },
    { id:'doc_chunks',  x:880,  y:530, w:240, label:'DOCUMENT_CHUNKS',
      color:'#E8DCC8', headerColor:'#C8A870',
      attrs:[{n:'id',t:'SERIAL',k:'PK'},{n:'document_id',t:'INT',k:'FK'},{n:'content',t:'TEXT',k:''},{n:'embedding',t:'VECTOR',k:''},{n:'chunk_index',t:'INT',k:''}],
      desc:'Fragmento de un PDF con su embedding vectorial. Base del sistema RAG para búsqueda semántica.' },
    { id:'msg_context', x:570,  y:680, w:240, label:'MESSAGE_CONTEXT',
      color:'#E8D8C8', headerColor:'#C8A888',
      attrs:[{n:'id',t:'SERIAL',k:'PK'},{n:'message_id',t:'INT',k:'FK'},{n:'chunk_id',t:'INT',k:'FK'},{n:'similarity_score',t:'FLOAT',k:''}],
      desc:'Tabla de cruce que registra qué fragmentos de documentos fueron usados para generar cada mensaje.' },
  ];

  const rels = [
    {from:'visitor',       to:'conversations', label:'starts',     card:'1:N', ox:0,  oy:EH, tx:0,  ty:EH},
    {from:'visitor',       to:'schedule',      label:'has',        card:'1:N', ox:-10,oy:EH, tx:10, ty:EH},
    {from:'schedule',      to:'conversations', label:'',           card:'1:N', ox:EW, oy:EH, tx:-10,ty:EH},
    {from:'conversations', to:'messages',      label:'has',        card:'1:N', ox:30, oy:EH, tx:30, ty:0},
    {from:'admin',         to:'documents',     label:'uploads',    card:'1:N', ox:EW/2,oy:EH,tx:EW/2,ty:EH},
    {from:'documents',     to:'doc_chunks',    label:'has',        card:'1:N', ox:EW/2,oy:EH,tx:EW/2,ty:0},
    {from:'messages',      to:'msg_context',   label:'uses',       card:'1:N', ox:EW/2,oy:EH,tx:-10,ty:EH/2},
    {from:'doc_chunks',    to:'msg_context',   label:'referenced', card:'1:N', ox:60, oy:EH, tx:180, ty:0},
  ];

  const getPoint = (id, ox, oy) => {
    const e = entities.find(x=>x.id===id);
    const w = e.w || EW;
    return {x: e.x + (ox !== undefined ? ox : w/2), y: e.y + (oy !== undefined ? oy : EH/2)};
  };

  const sel = selected ? entities.find(e=>e.id===selected) : null;

  return (
    <div style={{ width:'100%', height:'100%', background:TOKENS.bg, position:'relative' }}>
      <Chrome index={9} total={20} label="Arquitectura de datos" />
      <div style={{ padding:`${SPACE.pageY}px ${SPACE.pageX}px`, height:'100%', display:'grid', gridTemplateColumns: sel ? '1fr 340px' : '1fr', gap:36 }}>
        <div style={{ display:'flex', flexDirection:'column' }}>
          <div className="eyebrow">07 · ARQUITECTURA DE DATOS · DER</div>
          <div className="display" style={{ fontSize:56, marginTop:12, marginBottom:16, lineHeight:1 }}>
            8 entidades<span style={{color:TOKENS.accent}}>.</span> <span className="italic">Un solo modelo relacional.</span>
          </div>

          <div style={{ flex:1, position:'relative', background:'rgba(255,255,255,0.7)', border:`1px solid ${TOKENS.line}`, borderRadius:16, overflow:'hidden' }}>
            <svg width="100%" height="100%" viewBox="0 0 1280 820" style={{position:'absolute',inset:0}}>
              <defs>
                <marker id="arrDer" markerWidth="10" markerHeight="7" refX="9" refY="3.5" orient="auto">
                  <polygon points="0 0, 10 3.5, 0 7" fill={TOKENS.mute+'99'}/>
                </marker>
                <marker id="arrDerActive" markerWidth="10" markerHeight="7" refX="9" refY="3.5" orient="auto">
                  <polygon points="0 0, 10 3.5, 0 7" fill={TOKENS.accent}/>
                </marker>
                <marker id="oneMarker" markerWidth="8" markerHeight="10" refX="1" refY="5" orient="auto">
                  <line x1="1" y1="0" x2="1" y2="10" stroke={TOKENS.mute+'99'} strokeWidth="1.5"/>
                </marker>
                <filter id="derGlow">
                  <feGaussianBlur stdDeviation="2" result="b"/>
                  <feMerge><feMergeNode in="b"/><feMergeNode in="SourceGraphic"/></feMerge>
                </filter>
              </defs>

              {/* Relationship lines with arrows */}
              {rels.map((r,i)=>{
                const f = getPoint(r.from, r.ox, r.oy);
                const t = getPoint(r.to, r.tx, r.ty);
                const mx = (f.x+t.x)/2;
                const my = (f.y+t.y)/2 - 18;
                const isAct = selected===r.from || selected===r.to;
                return (
                  <g key={i}>
                    <path d={`M ${f.x} ${f.y} Q ${mx} ${my} ${t.x} ${t.y}`}
                      stroke={isAct?TOKENS.accent:TOKENS.mute+'55'} strokeWidth={isAct?2.5:1.5} fill="none"
                      markerStart="url(#oneMarker)"
                      markerEnd={isAct?"url(#arrDerActive)":"url(#arrDer)"}/>
                    {r.label && <text x={mx} y={my-5} textAnchor="middle" fontSize="11" fontFamily="JetBrains Mono, monospace"
                      fill={isAct?TOKENS.accent:TOKENS.mute+'aa'} letterSpacing="0.5" fontStyle="italic">{r.label}</text>}
                    {r.card && <text x={(mx+f.x)/2} y={(my+f.y)/2-4} textAnchor="middle" fontSize="9" fontFamily="JetBrains Mono, monospace"
                      fill={isAct?TOKENS.accent:TOKENS.mute+'88'} letterSpacing="0.3">{r.card}</text>}
                  </g>
                );
              })}

              {/* Entity boxes */}
              {entities.map(e=>{
                const isSel = selected===e.id;
                const isRel = rels.some(r=>(r.from===selected||r.to===selected)&&(r.from===e.id||r.to===e.id));
                const ew = e.w||EW;
                const totalH = EH + e.attrs.length * ROW + 4;
                return (
                  <g key={e.id} onClick={()=>setSelected(e.id===selected?null:e.id)} style={{cursor:'pointer'}}>
                    {/* Shadow/highlight */}
                    {(isSel||isRel) && <rect x={e.x-3} y={e.y-3} width={ew+6} height={totalH+6} rx="7"
                      fill="none" stroke={TOKENS.accent} strokeWidth="2" opacity="0.5"
                      filter={isSel?"url(#derGlow)":undefined}/>}
                    {/* Entity body background */}
                    <rect x={e.x} y={e.y} width={ew} height={totalH} rx="5" fill="#fff" stroke={e.headerColor} strokeWidth={isSel?2:1}/>
                    {/* Header */}
                    <rect x={e.x} y={e.y} width={ew} height={EH} rx="5" fill={isSel?TOKENS.accent:e.headerColor}/>
                    <rect x={e.x} y={e.y+EH-6} width={ew} height={6} fill={isSel?TOKENS.accent:e.headerColor}/>
                    <text x={e.x+ew/2} y={e.y+EH-10} textAnchor="middle" fontSize="13" fontFamily="JetBrains Mono, monospace"
                      fontWeight="700" fill="#fff" letterSpacing="0.5">{e.label}</text>
                    {/* Attribute rows */}
                    {e.attrs.map((a,ai)=>(
                      <g key={ai}>
                        <rect x={e.x} y={e.y+EH+ai*ROW} width={ew} height={ROW}
                          fill={ai%2===0?'rgba(245,245,248,0.9)':'rgba(255,255,255,0.9)'}
                          stroke={TOKENS.line+'44'} strokeWidth="0.5"/>
                        {/* Type badge */}
                        <text x={e.x+8} y={e.y+EH+ai*ROW+14} fontSize="8" fontFamily="JetBrains Mono, monospace"
                          fill={TOKENS.mute+'bb'} letterSpacing="0.3">{a.t}</text>
                        {/* Name */}
                        <text x={e.x+54} y={e.y+EH+ai*ROW+14} fontSize="10" fontFamily="JetBrains Mono, monospace"
                          fill={a.k==='PK'?TOKENS.accent:a.k==='FK'?TOKENS.blue:TOKENS.ink} fontWeight={a.k?'600':'400'} letterSpacing="0.2">
                          {a.n}
                        </text>
                        {/* PK/FK badge */}
                        {a.k && (
                          <g>
                            <rect x={e.x+ew-28} y={e.y+EH+ai*ROW+4} width={22} height={14} rx="3"
                              fill={a.k==='PK'?'rgba(226,81,42,0.15)':'rgba(10,37,64,0.12)'}/>
                            <text x={e.x+ew-17} y={e.y+EH+ai*ROW+14} textAnchor="middle" fontSize="8"
                              fontFamily="JetBrains Mono, monospace" fontWeight="700"
                              fill={a.k==='PK'?TOKENS.accent:TOKENS.blue} letterSpacing="0.3">{a.k}</text>
                          </g>
                        )}
                      </g>
                    ))}
                  </g>
                );
              })}
            </svg>
          </div>

          <div style={{ marginTop:10, display:'flex', gap:24, fontFamily:'JetBrains Mono, monospace', fontSize:12, color:TOKENS.mute, letterSpacing:'0.08em' }}>
            <span><span style={{color:TOKENS.accent,fontWeight:700}}>PK</span> Clave primaria</span>
            <span><span style={{color:TOKENS.blue,fontWeight:700}}>FK</span> Clave foránea</span>
            <span><span style={{color:TOKENS.mute}}>→</span> Relación 1:N</span>
            <span style={{ marginLeft:'auto' }}>↔ CLIC EN ENTIDADES PARA VER ATRIBUTOS</span>
          </div>
        </div>

        {/* Detail panel */}
        {sel && (
          <div key={sel.id} style={{
            background:'#fff', borderRadius:18, padding:28, border:`2px solid ${sel.headerColor}`,
            display:'flex', flexDirection:'column', gap:14,
            animation:'slideInRight .35s cubic-bezier(.2,.8,.2,1)',
          }}>
            <div style={{ padding:'10px 14px', background:sel.headerColor, borderRadius:10 }}>
              <div style={{ fontFamily:'JetBrains Mono, monospace', fontSize:14, fontWeight:700, color:'#fff', letterSpacing:'0.1em' }}>
                {sel.label}
              </div>
            </div>
            <div style={{ fontSize:17, color:TOKENS.ink2, lineHeight:1.4 }}>{sel.desc}</div>
            <div style={{ height:1, background:TOKENS.line }}/>
            <div style={{ fontFamily:'JetBrains Mono, monospace', fontSize:11, letterSpacing:'0.12em', color:TOKENS.mute, textTransform:'uppercase', marginBottom:4 }}>
              ATRIBUTOS
            </div>
            {sel.attrs.map((a,i) => (
              <div key={i} style={{
                padding:'8px 12px',
                background: a.k==='PK' ? 'rgba(226,81,42,0.07)' : a.k==='FK' ? 'rgba(10,37,64,0.07)' : TOKENS.bg,
                borderRadius:6, fontFamily:'JetBrains Mono, monospace', fontSize:13,
                display:'grid', gridTemplateColumns:'60px 1fr auto', alignItems:'center', gap:8,
              }}>
                <span style={{ color:TOKENS.mute, fontSize:10 }}>{a.t}</span>
                <span style={{ color: a.k==='PK' ? TOKENS.accent : a.k==='FK' ? TOKENS.blue : TOKENS.ink, fontWeight: a.k?600:400 }}>{a.n}</span>
                {a.k && <span style={{ fontSize:10, color: a.k==='PK'?TOKENS.accent:TOKENS.blue, fontWeight:700, background: a.k==='PK'?'rgba(226,81,42,0.12)':'rgba(10,37,64,0.1)', padding:'2px 6px', borderRadius:4 }}>{a.k}</span>}
              </div>
            ))}
            <button onClick={()=>setSelected(null)} style={{ marginTop:'auto', padding:'10px 0', background:TOKENS.bg, border:`1px solid ${TOKENS.line}`, borderRadius:8, fontFamily:'JetBrains Mono, monospace', fontSize:12, cursor:'pointer', color:TOKENS.ink }}>
              × CERRAR
            </button>
          </div>
        )}
      </div>
    </div>
  );
}

function ThankYouSlide() {
  return (
    <div style={{
      width: '100%', height: '100%',
      background: TOKENS.ink,
      display: 'flex', flexDirection: 'column',
      alignItems: 'center', justifyContent: 'center',
      gap: 32, position: 'relative',
    }}>
      <div style={{ fontFamily: 'JetBrains Mono, monospace', fontSize: 13, letterSpacing: '0.2em', textTransform: 'uppercase', color: TOKENS.accent }}>
        FIN DE LA PRESENTACIÓN
      </div>
      <div style={{ fontFamily: 'Instrument Serif, serif', fontSize: 120, color: TOKENS.bg, lineHeight: 0.9, textAlign: 'center' }}>
        Gracias<span style={{ color: TOKENS.accent }}>.</span>
      </div>
      <div style={{ fontFamily: 'Instrument Serif, serif', fontSize: 28, color: 'rgba(245,243,236,0.6)', textAlign: 'center', maxWidth: 600, lineHeight: 1.5 }}>
        Este es nuestro proyecto — una plataforma de orientación vocacional para poner la decisión en manos del aspirante.
      </div>
      <div style={{ marginTop: 24, display: 'flex', gap: 48 }}>
        {[
          { label: 'AUTOR', value: 'D. Orellana' },
          { label: 'INSTITUCIÓN', value: 'ITCA-FEPADE' },
          { label: 'AÑO', value: '2025' },
        ].map(({ label, value }) => (
          <div key={label} style={{ textAlign: 'center' }}>
            <div style={{ fontFamily: 'JetBrains Mono, monospace', fontSize: 11, letterSpacing: '0.15em', color: 'rgba(245,243,236,0.4)', marginBottom: 6 }}>{label}</div>
            <div style={{ fontFamily: 'Instrument Serif, serif', fontSize: 22, color: TOKENS.bg }}>{value}</div>
          </div>
        ))}
      </div>
    </div>
  );
}

/* ─────────── export all to window for mount ─────────── */
Object.assign(window, {
  CoverSlide, AgendaSlide, ProblemSlide, SurveySlide, DifferentiatorSlide,
  GoalsSlide, ActorsSlide, ProcessFlowSlide, DERSlide, DemoVocationalSlide, DemoVoiceSlide,
  ArchitectureSlide, StackSlide, ScreensUserSlide, ScreensAdminSlide,
  RagSlide, ScopeSlide, MetricsSlide,
  TimelineSlide, ClosingSlide, ThankYouSlide
});
