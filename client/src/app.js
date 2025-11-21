import './index.css';
import Alpine from 'alpinejs';

window.Alpine = Alpine;

window.app = function() {
  return {
    vista: 'cargando',
    auth: { user: null, email: '', password: '' },
    toast: { visible: false, tipo: 'info', mensaje: '' },
    nivelUsuario: 'Cadete',
    mensajeCarga: 'Inicializando sistemas...',
    cargandoAuth: false,
    sesionGuardada: false,
    subject: null,
    subjects: [
      { id: 'technical', name: 'Technical Exam', description: 'B787 Systems & Maintenance' },
      { id: 'amos', name: 'AMOS System', description: 'Maintenance Management Software' },
      { id: 'english', name: 'Technical English', description: 'Aviation Terminology & Procedures' }
    ],
    ataSeleccionado: '',
    atas: [
      { id: 21, nombre: 'Air Conditioning' },
      { id: 24, nombre: 'Electrical Power' },
      { id: 27, nombre: 'Flight Controls' },
      { id: 29, nombre: 'Hydraulic Power' },
      { id: 32, nombre: 'Landing Gear' }
    ],
    preguntas: [],
    stats: { correctas: 0, incorrectas: 0, racha: 0 },
    progresoPorcentaje: 0,
    preguntaActual: null,
    bloqueado: false,
    mostrarSiguiente: false,
    porcentajeAcierto: 0,

    initApp() {
      setTimeout(() => {
        this.vista = 'login';
      }, 1500);
    },

    login() {
      this.cargandoAuth = true;
      setTimeout(() => {
        this.cargandoAuth = false;
        this.auth.user = { name: 'User' };
        this.vista = 'subjects';
        this.showToast('success', 'Bienvenido a la plataforma');
      }, 1000);
    },

    loginAnonimo() {
      this.auth.user = { name: 'Guest' };
      this.vista = 'subjects';
    },

    selectSubject(id) {
      this.subject = this.subjects.find(s => s.id === id);
      this.vista = 'menu';
    },

    logout() {
      this.auth.user = null;
      this.subject = null;
      this.vista = 'login';
    },

    cargarPreguntas(filtro) {
      this.mensajeCarga = 'Cargando banco de preguntas...';
      this.vista = 'cargando';
      setTimeout(() => {
        // Mock questions
        this.preguntas = Array(5).fill(null).map((_, i) => ({
          numero: i + 1,
          texto: '¿Cuál es la función principal del sistema seleccionado en condiciones normales de operación?',
          opciones: ['A', 'B', 'C', 'D']
        }));
        this.vista = 'quiz';
        this.siguientePregunta();
      }, 1000);
    },

    recuperarSesion() {
      this.cargarPreguntas('recuperar');
    },

    pausarQuiz() {
      if(confirm('¿Salir al menú?')) this.vista = 'menu';
    },

    siguientePregunta() {
      this.preguntaActual = this.preguntas[Math.floor(Math.random() * this.preguntas.length)];
      this.bloqueado = false;
      this.mostrarSiguiente = false;
    },

    responder(letra) {
      if(this.bloqueado) return;
      this.bloqueado = true;
      this.mostrarSiguiente = true;
      this.stats.correctas++;
      this.progresoPorcentaje += 20;
    },

    claseBoton(letra) {
      if (!this.bloqueado) return 'border-slate-700 hover:border-indigo-500 hover:bg-slate-800';
      return letra === 'A' ? 'border-emerald-500 bg-emerald-500/10' : 'border-slate-700 opacity-50';
    },

    estiloLetra(letra) {
      if (!this.bloqueado) return 'bg-slate-800 text-slate-400 group-hover:text-indigo-400';
      return letra === 'A' ? 'bg-emerald-500 text-white' : 'bg-slate-800 text-slate-500';
    },

    obtenerTextoOpcion(letra) {
      const opciones = {
        'A': 'Opción Correcta: Mantiene la integridad del sistema.',
        'B': 'Opción Incorrecta: Causa sobrepresión.',
        'C': 'Opción Incorrecta: Desactiva las bombas.',
        'D': 'Opción Incorrecta: No tiene efecto.'
      };
      return opciones[letra];
    },
    
    volverAlMenu() {
      this.vista = 'menu';
    },

    volverASubjects() {
      this.subject = null;
      this.vista = 'subjects';
    },

    handleTeclado(e) {},

    showToast(tipo, mensaje) {
      this.toast = { visible: true, tipo, mensaje };
      setTimeout(() => this.toast.visible = false, 3000);
    }
  }
}

Alpine.start();
