/* global React, ReactDOM */
const slideMap = {
  cover: window.CoverSlide,
  agenda: window.AgendaSlide,
  problem: window.ProblemSlide,
  survey: window.SurveySlide,
  differentiator: window.DifferentiatorSlide,
  goals: window.GoalsSlide,
  actors: window.ActorsSlide,
  processFlow: window.ProcessFlowSlide,
  der: window.DERSlide,
  demoVocacional: window.DemoVocationalSlide,
  screensUser: window.ScreensUserSlide,
  screensAdmin: window.ScreensAdminSlide,
  demoVoice: window.DemoVoiceSlide,
  architecture: window.ArchitectureSlide,
  stack: window.StackSlide,
  rag: window.RagSlide,
  scope: window.ScopeSlide,
  metrics: window.MetricsSlide,
  timeline: window.TimelineSlide,
  closing: window.ClosingSlide,
};

document.querySelectorAll('[data-react-root]').forEach(el => {
  const key = el.getAttribute('data-slide');
  const Comp = slideMap[key];
  if (Comp) {
    const root = ReactDOM.createRoot(el);
    root.render(React.createElement(Comp));
  }
});
