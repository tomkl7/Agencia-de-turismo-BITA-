const estado = {
  favoritos: JSON.parse(localStorage.getItem('bitaFavoritos')) || [],
  carrito: JSON.parse(localStorage.getItem('bitaCarrito')) || [],
  destinoSeleccionado: '', usuario: null, reservas: []
};
const $ = (selector) => document.querySelector(selector);
const $$ = (selector) => [...document.querySelectorAll(selector)];
const tarjetas = $$('.tarjeta-destino');
const datosDestinos = {
  'Polonia': { titulo: 'Polonia esencial', descripcion: 'Recorré Varsovia y Cracovia entre castillos, barrios históricos y una gastronomía que sorprende en cada parada.', precio: 1200, duracion: '8 días', tipo: 'Cultural' },
  'Bolivia': { titulo: 'Bolivia: Salar de Uyuni', descripcion: 'Explorá el altiplano, La Paz y el Salar de Uyuni: un paisaje inmenso y único, con cultura andina en cada recorrido.', precio: 990, duracion: '7 días', tipo: 'Aventura' },
  'Suiza': { titulo: 'Suiza alpina', descripcion: 'Viajá entre lagos turquesa, pueblos de montaña y trenes panorámicos que conectan algunas de las postales más lindas de Europa.', precio: 2100, duracion: '9 días', tipo: 'Naturaleza' },
  'Japón': { titulo: 'Japón esencial', descripcion: 'Viví el contraste entre la energía de Tokio, los templos de Kioto y una cultura donde tradición y tecnología conviven a diario.', precio: 2850, duracion: '12 días', tipo: 'Cultural' },
  'Brasil': { titulo: 'Brasil: Río y playas', descripcion: 'Combiná la energía de Río de Janeiro con playas, música y sabores locales en una escapada llena de color y ritmo.', precio: 780, duracion: '7 días', tipo: 'Relax' },
  'Italia': { titulo: 'Italia entre sabores', descripcion: 'Descubrí Roma, Florencia y Venecia a través de su arte, sus plazas y la cocina que convirtió a Italia en un clásico del viaje.', precio: 1950, duracion: '10 días', tipo: 'Gastronomía' },
  'México': { titulo: 'México Caribe', descripcion: 'Descansá frente al mar y sumá cenotes, ruinas mayas y gastronomía mexicana en una experiencia ideal para desconectar.', precio: 1050, duracion: '8 días', tipo: 'Relax' },
  'Egipto': { titulo: 'Misterios de Egipto', descripcion: 'Navegá entre historia y desierto: pirámides, templos y el Nilo en un recorrido por una de las civilizaciones más fascinantes del mundo.', precio: 2300, duracion: '10 días', tipo: 'Cultural' },
  'Australia': { titulo: 'Australia salvaje', descripcion: 'Recorré ciudades vibrantes, costas inmensas y paisajes naturales únicos, desde la bahía de Sídney hasta la Great Ocean Road.', precio: 3400, duracion: '14 días', tipo: 'Naturaleza' },
  'Tailandia': { titulo: 'Tailandia esencial', descripcion: 'Pasá de templos dorados y mercados llenos de aromas a playas tropicales, con la hospitalidad tailandesa como protagonista.', precio: 1690, duracion: '9 días', tipo: 'Cultural' },
  'Corea del Sur': { titulo: 'Corea del Sur', descripcion: 'Conocé Seúl, palacios históricos y barrios modernos en un viaje que mezcla cultura ancestral, diseño y gastronomía contemporánea.', precio: 2490, duracion: '11 días', tipo: 'Cultural' },
  'Marruecos': { titulo: 'Colores de Marruecos', descripcion: 'Perdete entre medinas, zocos y dunas del Sahara en un circuito de aromas, arquitectura y noches bajo el cielo del desierto.', precio: 1780, duracion: '9 días', tipo: 'Aventura' },
  'Kenia': { titulo: 'Safari en Kenia', descripcion: 'Viví safaris fotográficos en la sabana y observá fauna salvaje en libertad, con paisajes abiertos que definen África oriental.', precio: 3150, duracion: '10 días', tipo: 'Safari' },
  'Nueva Zelanda': { titulo: 'Nueva Zelanda épica', descripcion: 'Atravesá fiordos, glaciares y rutas panorámicas de película en un destino creado para viajeros que buscan naturaleza en grande.', precio: 3650, duracion: '14 días', tipo: 'Aventura' }
};
const guiasDestinos = {
  'Polonia': { circuito: 'Varsovia · Cracovia · Wieliczka', incluye: ['Alojamiento seleccionado', 'Desayunos diarios', 'Traslados principales', 'Guía en español'], destacados: ['Llegada y bienvenida en Varsovia', 'Visita histórica por Varsovia', 'Traslado a Cracovia y recorrido guiado', 'Día libre y regreso'] },
  'Bolivia': { circuito: 'La Paz · Uyuni · Salar de Uyuni', incluye: ['Alojamiento seleccionado', 'Desayunos diarios', 'Traslados principales', 'Excursión al Salar de Uyuni'], destacados: ['Llegada a La Paz y aclimatación', 'Ciudad de La Paz y miradores', 'Excursión por el Salar de Uyuni', 'Regreso y fin del programa'] },
  'Suiza': { circuito: 'Zúrich · Lucerna · Interlaken', incluye: ['Alojamiento seleccionado', 'Desayunos diarios', 'Traslados principales', 'Trayecto panorámico en tren'], destacados: ['Llegada a Zúrich', 'Recorrido por Lucerna', 'Paisajes alpinos en Interlaken', 'Día libre y regreso'] },
  'Japón': { circuito: 'Tokio · Kioto · Osaka', incluye: ['Alojamiento seleccionado', 'Desayunos diarios', 'Traslados principales', 'Excursión cultural guiada'], destacados: ['Llegada y primera noche en Tokio', 'Tokio entre tradición y tecnología', 'Tren hacia Kioto y templos', 'Tiempo libre y regreso'] },
  'Brasil': { circuito: 'Río de Janeiro · Costa Verde', incluye: ['Alojamiento seleccionado', 'Desayunos diarios', 'Traslados principales', 'Excursión urbana en Río'], destacados: ['Llegada a Río de Janeiro', 'Cristo Redentor y panorámicas', 'Día de playa o Costa Verde', 'Tiempo libre y regreso'] },
  'Italia': { circuito: 'Roma · Florencia · Venecia', incluye: ['Alojamiento seleccionado', 'Desayunos diarios', 'Traslados principales', 'Visitas guiadas seleccionadas'], destacados: ['Llegada a Roma', 'Historia y plazas de Roma', 'Arte y sabores de Florencia', 'Venecia y regreso'] },
  'México': { circuito: 'Cancún · Riviera Maya · Tulum', incluye: ['Alojamiento seleccionado', 'Desayunos diarios', 'Traslados principales', 'Excursión a cenotes o Tulum'], destacados: ['Llegada al Caribe mexicano', 'Día libre de playa', 'Cenotes y cultura maya', 'Tiempo libre y regreso'] },
  'Egipto': { circuito: 'El Cairo · Luxor · Asuán', incluye: ['Alojamiento seleccionado', 'Desayunos diarios', 'Traslados principales', 'Visitas a sitios arqueológicos'], destacados: ['Llegada a El Cairo', 'Pirámides de Giza', 'Templos y Nilo', 'Tiempo libre y regreso'] },
  'Australia': { circuito: 'Sídney · Melbourne · Great Ocean Road', incluye: ['Alojamiento seleccionado', 'Desayunos diarios', 'Traslados principales', 'Excursión por Great Ocean Road'], destacados: ['Llegada a Sídney', 'Ciudad y bahía de Sídney', 'Melbourne y costa australiana', 'Tiempo libre y regreso'] },
  'Tailandia': { circuito: 'Bangkok · Chiang Mai · Phuket', incluye: ['Alojamiento seleccionado', 'Desayunos diarios', 'Traslados principales', 'Visita a templos seleccionados'], destacados: ['Llegada a Bangkok', 'Templos y mercados locales', 'Naturaleza y cultura del norte', 'Playas y regreso'] },
  'Corea del Sur': { circuito: 'Seúl · Gyeongju · Busan', incluye: ['Alojamiento seleccionado', 'Desayunos diarios', 'Traslados principales', 'Recorrido cultural guiado'], destacados: ['Llegada a Seúl', 'Palacios y barrios tradicionales', 'Historia de Gyeongju', 'Busan y regreso'] },
  'Marruecos': { circuito: 'Marrakech · Ait Ben Haddou · Desierto', incluye: ['Alojamiento seleccionado', 'Desayunos diarios', 'Traslados principales', 'Noche de campamento en el desierto'], destacados: ['Llegada a Marrakech', 'Medina y zocos', 'Ruta hacia el desierto', 'Amanecer y regreso'] },
  'Kenia': { circuito: 'Nairobi · Masái Mara · Lago Naivasha', incluye: ['Alojamiento seleccionado', 'Desayunos diarios', 'Traslados principales', 'Safaris fotográficos programados'], destacados: ['Llegada a Nairobi', 'Traslado a Masái Mara', 'Safari de día completo', 'Regreso y fin del programa'] },
  'Nueva Zelanda': { circuito: 'Auckland · Queenstown · Milford Sound', incluye: ['Alojamiento seleccionado', 'Desayunos diarios', 'Traslados principales', 'Excursión panorámica seleccionada'], destacados: ['Llegada a Auckland', 'Vuelo o traslado a Queenstown', 'Fiordos y paisajes de Milford Sound', 'Tiempo libre y regreso'] }
};
const temporadasRecomendadas = {
  'Polonia': ['abril-junio', 'julio-septiembre'], 'Bolivia': ['abril-junio', 'julio-septiembre'], 'Suiza': ['abril-junio', 'julio-septiembre'], 'Japón': ['abril-junio', 'octubre-diciembre'], 'Brasil': ['enero-marzo', 'octubre-diciembre'], 'Italia': ['abril-junio', 'julio-septiembre'], 'México': ['enero-marzo', 'abril-junio'], 'Egipto': ['enero-marzo', 'octubre-diciembre'], 'Australia': ['enero-marzo', 'octubre-diciembre'], 'Tailandia': ['enero-marzo', 'octubre-diciembre'], 'Corea del Sur': ['abril-junio', 'octubre-diciembre'], 'Marruecos': ['abril-junio', 'octubre-diciembre'], 'Kenia': ['enero-marzo', 'julio-septiembre'], 'Nueva Zelanda': ['enero-marzo', 'octubre-diciembre']
};
let temporizadorAviso;
let monedaARS = false;
let cotizacionDolarARS = Number(localStorage.getItem('bitaCotizacionDolarARS')) || 0;
const contextoChat = { presupuesto: null, tipo: '', duracion: null, ultimaRecomendacion: [] };
let chatRespondiendo = false;
let fechaCotizacionDolar = localStorage.getItem('bitaFechaCotizacionDolar') || '';
let cotizacionDolarDesactualizada = false;
let cotizacionEsRespaldo = false;
const DURACION_CACHE_COTIZACION = 30 * 60 * 1000;
function dinero(valor) { const monto = Number(valor); return monedaARS ? `ARS ${(monto * cotizacionDolarARS).toLocaleString('es-AR', { maximumFractionDigits: 0 })}` : `USD ${monto.toLocaleString('es-AR')}`; }
function actualizarEstadoCotizacion(mensaje = '') { const estadoCotizacion = $('#estado-cotizacion'); if (!estadoCotizacion) return; if (!monedaARS) { estadoCotizacion.textContent = 'USD · ver precios en ARS'; return; } const fecha = fechaCotizacionDolar ? new Date(fechaCotizacionDolar).toLocaleString('es-AR', { day: '2-digit', month: '2-digit', hour: '2-digit', minute: '2-digit' }) : ''; estadoCotizacion.textContent = mensaje || (cotizacionEsRespaldo ? `Respaldo · ${fecha}` : cotizacionDolarDesactualizada ? `Última publicación · ${fecha}` : fecha ? `Venta · ${fecha}` : 'Consultando venta…'); }
async function cargarCotizacionDolar(forzar = false) {
  const tasaGuardada = Number(localStorage.getItem('bitaCotizacionDolarARS'));
  const fechaGuardada = localStorage.getItem('bitaFechaCotizacionDolar') || '';
  const ultimaConsulta = Number(localStorage.getItem('bitaCotizacionConsultadaEn'));
  const edadCache = Number.isFinite(ultimaConsulta) ? Date.now() - ultimaConsulta : Infinity;
  if (!forzar && tasaGuardada > 0 && fechaGuardada && Number.isFinite(Date.parse(fechaGuardada)) && Number.isFinite(edadCache) && edadCache >= 0 && edadCache < DURACION_CACHE_COTIZACION) { cotizacionDolarARS = tasaGuardada; fechaCotizacionDolar = fechaGuardada; cotizacionDolarDesactualizada = Date.now() - Date.parse(fechaGuardada) >= 24 * 60 * 60 * 1000; cotizacionEsRespaldo = false; actualizarEstadoCotizacion(); return cotizacionDolarARS; }
  actualizarEstadoCotizacion('Consultando cotización…');
  const controller = new AbortController(); const limiteConsulta = setTimeout(() => controller.abort(), 8000);
  try {
    const respuesta = await fetch('https://dolarapi.com/v1/dolares/oficial', { cache: 'no-store', signal: controller.signal });
    if (!respuesta.ok) throw new Error(`Respuesta ${respuesta.status}`);
    const datos = await respuesta.json(); const venta = Number(datos.venta);
    if (datos.moneda !== 'USD' || datos.casa !== 'oficial' || !Number.isFinite(venta) || venta <= 0 || !datos.fechaActualizacion || Number.isNaN(Date.parse(datos.fechaActualizacion))) throw new Error('La respuesta de cotización no es válida.');
    cotizacionDolarARS = venta; fechaCotizacionDolar = datos.fechaActualizacion; cotizacionDolarDesactualizada = Date.now() - Date.parse(fechaCotizacionDolar) >= 24 * 60 * 60 * 1000; cotizacionEsRespaldo = false;
    localStorage.setItem('bitaCotizacionDolarARS', String(venta)); localStorage.setItem('bitaFechaCotizacionDolar', fechaCotizacionDolar); localStorage.setItem('bitaCotizacionConsultadaEn', String(Date.now()));
    actualizarEstadoCotizacion(); return venta;
  } catch (error) {
    const fechaCache = fechaGuardada ? Date.parse(fechaGuardada) : NaN;
    if (tasaGuardada > 0 && Number.isFinite(fechaCache) && Date.now() - fechaCache < 24 * 60 * 60 * 1000) { cotizacionDolarARS = tasaGuardada; fechaCotizacionDolar = fechaGuardada; cotizacionDolarDesactualizada = false; cotizacionEsRespaldo = true; actualizarEstadoCotizacion(); return cotizacionDolarARS; }
    actualizarEstadoCotizacion('Cotización no disponible'); return null;
  } finally { clearTimeout(limiteConsulta); }
}
let reservaEnPago = null;
let metodoPagoActual = 'tarjeta';
let resultadoReservaActual = '';
const LOCAL_DATA_KEY = 'bitaLocalAppData';
const LOCAL_USER_KEY = 'bitaLocalCurrentUser';
const LOCAL_PRICES = new Map(Object.values(datosDestinos).map(({ titulo, precio }) => [titulo, precio]));
const ALIAS_PAQUETES_ANTERIORES = { 'Escapada Polonia': 'Polonia esencial', 'España Premium': 'Japón esencial', 'Bolivia - Oferta relámpago': 'Bolivia: Salar de Uyuni' };
estado.carrito = estado.carrito.map((item) => { const nombre = ALIAS_PAQUETES_ANTERIORES[item.nombre] || item.nombre; const destino = Object.values(datosDestinos).find((viaje) => viaje.titulo === nombre); return destino ? { ...item, nombre: destino.titulo, precio: destino.precio, noches: destino.duracion } : null; }).filter(Boolean);
function localReadData() {
  try { return JSON.parse(localStorage.getItem(LOCAL_DATA_KEY)) || { users: [], reservations: [], attempts: [] }; }
  catch { return { users: [], reservations: [], attempts: [] }; }
}
function localSaveData(data) { localStorage.setItem(LOCAL_DATA_KEY, JSON.stringify(data)); }
function localToday(date = new Date()) { const parts = new Intl.DateTimeFormat('en-CA', { timeZone: 'America/Argentina/Buenos_Aires', year: 'numeric', month: '2-digit', day: '2-digit' }).formatToParts(date); const values = Object.fromEntries(parts.map((part) => [part.type, part.value])); return `${values.year}-${values.month}-${values.day}`; }
function localId() { return crypto.randomUUID ? crypto.randomUUID() : `${Date.now()}-${Math.random().toString(16).slice(2)}`; }
async function localPasswordHash(password) {
  if (crypto.subtle) { const buffer = await crypto.subtle.digest('SHA-256', new TextEncoder().encode(password)); return [...new Uint8Array(buffer)].map((value) => value.toString(16).padStart(2, '0')).join(''); }
  let hash = 2166136261; for (const character of password) hash = Math.imul(hash ^ character.charCodeAt(0), 16777619); return `local-${(hash >>> 0).toString(16)}`;
}
function localSafeUser(user) { return { id: user.id, nombre: user.full_name, correo: user.email, telefono: user.phone || '', rol: user.role }; }
function localFail(status, message, code = 'request_error') { const error = new Error(message); error.status = status; error.code = code; throw error; }
async function localEnsureStaff(data) {
  if (data.users.some((user) => user.email === 'asesora@bita.local')) return;
  data.users.push({ id: localId(), full_name: 'Asesora BITA', email: 'asesora@bita.local', phone: '', password_hash: await localPasswordHash('Bita2026!'), role: 'staff' });
  localSaveData(data);
}
function localReservation(data, id, ownerId = null) { return data.reservations.find((item) => item.id === id && (!ownerId || item.user_id === ownerId)); }
function localPlanPreview(reservation, code, count, depositMinor) {
  const today = localToday();
  if (code === 'full') return [{ sequence: 1, kind: 'full', amountMinor: reservation.totalMinor, dueAt: today }];
  const payments = count - 1; const end = new Date(`${reservation.salida}T12:00:00Z`); end.setUTCDate(end.getUTCDate() - 30);
  const remaining = reservation.totalMinor - depositMinor; const each = Math.floor(remaining / payments); let assigned = 0;
  const rows = [{ sequence: 1, kind: 'deposit', amountMinor: depositMinor, dueAt: today }];
  for (let index = 0; index < payments; index += 1) { const due = new Date(end); due.setUTCDate(due.getUTCDate() - (payments - index - 1) * 30); const amountMinor = index === payments - 1 ? remaining - assigned : each; assigned += amountMinor; rows.push({ sequence: index + 2, kind: index === payments - 1 ? 'balance' : 'installment', amountMinor, dueAt: due.toISOString().slice(0, 10) }); }
  return rows;
}
function localPlans(reservation) {
  const days = Math.floor((Date.parse(`${reservation.salida}T12:00:00Z`) - Date.parse(`${localToday()}T12:00:00Z`)) / 86400000);
  const plans = [{ code: 'full', label: 'Pagar todo ahora', count: 1, depositMinor: reservation.totalMinor, available: true }];
  for (const payments of [1, 2, 3]) { const depositMinor = Math.ceil(reservation.totalMinor * .3); const available = days >= 45 + payments * 30; plans.push({ code: `deposit_${payments}`, label: `Seña + ${payments} ${payments === 1 ? 'pago' : 'pagos'} manuales`, count: payments + 1, depositMinor, available, message: available ? '' : 'No hay tiempo suficiente antes de la salida para este cronograma.' }); }
  return { currency: 'USD', departureDate: reservation.salida, automaticAvailable: false, plans: plans.map((plan) => ({ ...plan, totalMinor: reservation.totalMinor, preview: localPlanPreview(reservation, plan.code, plan.count, plan.depositMinor) })) };
}
async function api(ruta, opciones = {}) {
  const method = opciones.method || 'GET'; const body = opciones.body ? JSON.parse(opciones.body) : {}; const data = localReadData(); await localEnsureStaff(data);
  const currentId = localStorage.getItem(LOCAL_USER_KEY); const current = data.users.find((user) => user.id === currentId) || null;
  if (ruta === '/api/auth/session' && method === 'GET') return { user: current ? localSafeUser(current) : null };
  if (ruta === '/api/auth/register' && method === 'POST') {
    const name = String(body.name || '').trim(); const email = String(body.email || '').trim().toLowerCase(); const password = String(body.password || '');
    if (name.length < 3 || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email) || password.length < 8 || !/[A-Z]/.test(password) || !/\d/.test(password)) localFail(422, 'Usá nombre, correo válido y una contraseña de 8 caracteres, con una mayúscula y un número.', 'invalid_registration');
    if (data.users.some((user) => user.email === email)) localFail(409, 'Ya existe una cuenta con ese correo.', 'email_exists');
    const user = { id: localId(), full_name: name, email, phone: String(body.phone || ''), newsletter_consent: Boolean(body.newsletter), password_hash: await localPasswordHash(password), role: 'customer' };
    data.users.push(user); localSaveData(data); localStorage.setItem(LOCAL_USER_KEY, user.id); return { user: localSafeUser(user) };
  }
  if (ruta === '/api/auth/login' && method === 'POST') {
    const user = data.users.find((item) => item.email === String(body.email || '').trim().toLowerCase());
    if (!user || user.password_hash !== await localPasswordHash(String(body.password || ''))) localFail(401, 'Correo o contraseña incorrectos.', 'invalid_credentials');
    localStorage.setItem(LOCAL_USER_KEY, user.id); return { user: localSafeUser(user) };
  }
  if (ruta === '/api/auth/logout' && method === 'POST') { localStorage.removeItem(LOCAL_USER_KEY); return { ok: true }; }
  if (ruta === '/api/account' && method === 'PATCH') {
    if (!current) localFail(401, 'Iniciá sesión para continuar.'); current.full_name = String(body.name || '').trim(); current.phone = String(body.phone || '').trim(); localSaveData(data); return { user: localSafeUser(current) };
  }
  if (ruta === '/api/reservations' && method === 'GET') {
    if (!current) localFail(401, 'Iniciá sesión para continuar.');
    const reservations = data.reservations.filter((item) => item.user_id === current.id);
    reservations.forEach((reservation) => {
      const next = reservation.cronograma.find((row) => !['paid', 'cancelled'].includes(row.status));
      if (next && next.due_at < localToday() && ['due', 'scheduled'].includes(next.status)) { next.status = 'overdue'; reservation.estado = 'overdue'; }
    });
    localSaveData(data); return { reservations: reservations.sort((a, b) => b.creadoEl.localeCompare(a.creadoEl)) };
  }
  if (ruta === '/api/reservations' && method === 'POST') {
    if (!current) localFail(401, 'Iniciá sesión para continuar.');
    if (current.role !== 'customer') localFail(403, 'La cuenta asesora solo puede gestionar solicitudes desde el panel BITA.');
    const departure = String(body.departure || ''); const passengers = Number(body.passengers); const room = String(body.room || '');
    if (!/^\d{4}-\d{2}-\d{2}$/.test(departure) || departure < localToday() || !Number.isInteger(passengers) || passengers < 1 || passengers > 12) localFail(422, 'Revisá la fecha de salida y la cantidad de pasajeros.', 'invalid_trip');
    if (!['Doble', 'Triple', 'Individual'].includes(room) || !Array.isArray(body.items) || !body.items.length) localFail(422, 'Completá los datos del viaje.', 'invalid_trip');
    const items = body.items.map((item) => { const name = String(item.name || '').trim(); const price = LOCAL_PRICES.get(name); const quantity = Number(item.quantity); if (!price || !Number.isInteger(quantity) || quantity < 1 || quantity > 8) localFail(422, `No pudimos validar el precio de ${name || 'un viaje'}.`, 'price_changed'); return { name, unitPriceMinor: price * 100, quantity }; });
    const subtotalMinor = items.reduce((sum, item) => sum + item.unitPriceMinor * item.quantity, 0) * passengers; const taxMinor = Math.round(subtotalMinor * .08); const totalMinor = subtotalMinor + taxMinor;
    current.phone = String(body.phone || current.phone || '').trim();
    if (current.phone.length < 6) localFail(422, 'Ingresá un WhatsApp válido para coordinar la reserva.', 'invalid_phone');
    const reservation = { id: localId(), user_id: current.id, codigo: `BITA-${Math.random().toString(16).slice(2, 10).toUpperCase()}`, items, salida: departure, pasajeros: passengers, habitacion: room, comentarios: String(body.comments || ''), moneda: 'USD', subtotalMinor, impuestosMinor: taxMinor, totalMinor, estado: 'pending_review', asesor: null, aprobadaEl: null, notaBITA: '', plan: null, modoCobro: null, creadoEl: new Date().toISOString(), cliente: { nombre: current.full_name, correo: current.email, telefono: current.phone }, pagadoMinor: 0, saldoMinor: totalMinor, cronograma: [], transacciones: [] };
    data.reservations.push(reservation); localSaveData(data); return { reservation };
  }
  const plansMatch = ruta.match(/^\/api\/reservations\/([\w-]+)\/plans$/);
  if (plansMatch && method === 'GET') { const reservation = localReservation(data, plansMatch[1], current?.id); if (!reservation) localFail(404, 'No encontramos la reserva.'); if (reservation.estado !== 'approved_waiting_plan') localFail(409, 'BITA todavía no aprobó esta solicitud.'); return localPlans(reservation); }
  const planMatch = ruta.match(/^\/api\/reservations\/([\w-]+)\/plan$/);
  if (planMatch && method === 'POST') {
    const reservation = localReservation(data, planMatch[1], current?.id); if (!reservation) localFail(404, 'No encontramos la reserva.'); if (reservation.estado !== 'approved_waiting_plan') localFail(409, 'La reserva todavía no está habilitada para un plan.');
    const plan = localPlans(reservation).plans.find((item) => item.code === body.planCode); if (!plan?.available) localFail(422, plan?.message || 'Elegí un plan válido.');
    reservation.cronograma = plan.preview.map((item) => ({ id: localId(), sequence_no: item.sequence, kind: item.kind, amount_minor: item.amountMinor, due_at: item.dueAt, status: item.dueAt <= localToday() ? 'due' : 'scheduled' })); reservation.plan = plan.code; reservation.modoCobro = 'manual'; reservation.estado = 'awaiting_deposit'; localSaveData(data); return { reservation };
  }
  const reviewMatch = ruta.match(/^\/api\/staff\/reservations\/([\w-]+)\/decision$/);
  if (reviewMatch && method === 'POST') {
    if (!current || !['staff', 'admin'].includes(current.role)) localFail(current ? 403 : 401, 'Ingresá con la cuenta del equipo BITA.');
    const reservation = localReservation(data, reviewMatch[1]); if (!reservation || reservation.estado !== 'pending_review') localFail(409, 'No encontramos una solicitud pendiente.');
    const note = String(body.note || '').trim(); if (body.decision === 'reject' && note.length < 5) localFail(422, 'Escribí el motivo del rechazo.');
    if (body.decision === 'approve') { const amount = Number(body.finalAmount); if (!Number.isSafeInteger(amount) || amount * 100 < reservation.subtotalMinor) localFail(422, 'Ingresá un total aprobado igual o mayor al subtotal.'); reservation.totalMinor = amount * 100; reservation.impuestosMinor = reservation.totalMinor - reservation.subtotalMinor; reservation.saldoMinor = reservation.totalMinor; reservation.estado = 'approved_waiting_plan'; }
    else if (body.decision === 'reject') reservation.estado = 'rejected'; else localFail(422, 'Elegí aprobar o rechazar.');
    reservation.asesor = current.full_name; reservation.aprobadaEl = new Date().toISOString(); reservation.notaBITA = note; localSaveData(data); return { reservation };
  }
  const confirmationMatch = ruta.match(/^\/api\/staff\/payments\/([\w-]+)\/(confirm|reject)$/);
  if (confirmationMatch && method === 'POST') {
    if (!current || !['staff', 'admin'].includes(current.role)) localFail(current ? 403 : 401, 'Ingresá con la cuenta del equipo BITA.');
    const reservation = data.reservations.find((item) => item.transacciones.some((payment) => payment.id === confirmationMatch[1]));
    const attempt = reservation?.transacciones.find((payment) => payment.id === confirmationMatch[1]);
    if (!reservation || !attempt || attempt.status !== 'pending_confirmation') localFail(409, 'Ese pago ya fue revisado o no existe.');
    if (confirmationMatch[2] === 'reject') { attempt.status = 'rejected'; attempt.confirmed_by = current.full_name; attempt.confirmed_at = new Date().toISOString(); localSaveData(data); return { reservation, attempt }; }
    const schedule = reservation.cronograma.find((row) => row.id === attempt.schedule_id);
    if (!schedule || schedule.status === 'paid') localFail(409, 'La cuota ya figura como acreditada.');
    const next = reservation.cronograma.find((row) => !['paid', 'cancelled'].includes(row.status));
    if (next?.id !== schedule.id) localFail(409, 'Primero debe acreditarse la cuota anterior.');
    schedule.status = 'paid'; attempt.status = 'succeeded'; attempt.confirmed_by = current.full_name; attempt.confirmed_at = new Date().toISOString();
    reservation.pagadoMinor = reservation.cronograma.filter((row) => row.status === 'paid').reduce((sum, row) => sum + row.amount_minor, 0);
    reservation.saldoMinor = Math.max(0, reservation.totalMinor - reservation.pagadoMinor); reservation.estado = reservation.saldoMinor ? 'payment_partial' : 'paid';
    localSaveData(data); return { reservation, attempt };
  }
  if (ruta === '/api/staff/reservations' && method === 'GET') {
    if (!current || !['staff', 'admin'].includes(current.role)) localFail(current ? 403 : 401, 'Ingresá con la cuenta del equipo BITA.');
    return { user: localSafeUser(current), reservations: [...data.reservations].sort((a, b) => a.estado === 'pending_review' ? -1 : b.estado === 'pending_review' ? 1 : b.creadoEl.localeCompare(a.creadoEl)) };
  }
  const paymentMatch = ruta.match(/^\/api\/schedule\/([\w-]+)\/pay$/);
  if (paymentMatch && method === 'POST') {
    if (!current) localFail(401, 'Iniciá sesión para continuar.'); const reservation = data.reservations.find((item) => item.user_id === current.id && item.cronograma.some((row) => row.id === paymentMatch[1])); const schedule = reservation?.cronograma.find((row) => row.id === paymentMatch[1]);
    if (!reservation || !schedule) localFail(404, 'No encontramos esa cuota.');
    if (schedule.status === 'paid') return { status: 'succeeded', attemptId: reservation.transacciones.find((item) => item.schedule_id === schedule.id)?.id, reservation, demo: true };
    const next = reservation.cronograma.find((row) => !['paid', 'cancelled'].includes(row.status)); if (next?.id !== schedule.id) localFail(409, 'Pagá primero la cuota anterior.');
    const repeated = data.attempts.find((item) => item.idempotency_key === body.idempotencyKey); if (repeated) { if (repeated.schedule_id !== schedule.id) localFail(409, 'El intento ya se usó para otro pago.'); return { status: repeated.status, attemptId: repeated.id, reservation, demo: true }; }
    schedule.status = 'paid'; reservation.pagadoMinor = reservation.cronograma.filter((row) => row.status === 'paid').reduce((sum, row) => sum + row.amount_minor, 0); reservation.saldoMinor = Math.max(0, reservation.totalMinor - reservation.pagadoMinor); reservation.estado = reservation.saldoMinor ? 'payment_partial' : 'paid';
    const attempt = { id: localId(), schedule_id: schedule.id, idempotency_key: body.idempotencyKey, amount_minor: schedule.amount_minor, currency: 'USD', method: 'Tarjeta', status: 'succeeded', created_at: new Date().toISOString() }; data.attempts.push(attempt); reservation.transacciones.unshift(attempt); localSaveData(data); return { status: 'succeeded', attemptId: attempt.id, reservation, demo: true };
  }
  const paymentRequestMatch = ruta.match(/^\/api\/schedule\/([\w-]+)\/request$/);
  if (paymentRequestMatch && method === 'POST') {
    if (!current) localFail(401, 'Iniciá sesión para continuar.');
    const reservation = data.reservations.find((item) => item.user_id === current.id && item.cronograma.some((row) => row.id === paymentRequestMatch[1]));
    const schedule = reservation?.cronograma.find((row) => row.id === paymentRequestMatch[1]);
    if (!reservation || !schedule) localFail(404, 'No encontramos esa cuota.');
    const next = reservation.cronograma.find((row) => !['paid', 'cancelled'].includes(row.status));
    if (next?.id !== schedule.id) localFail(409, 'Pagá primero la cuota anterior.');
    const methodName = body.method === 'mercadopago' ? 'Mercado Pago' : body.method === 'transferencia' ? 'Transferencia bancaria' : '';
    if (!methodName) localFail(422, 'Elegí un método de pago válido.');
    const existing = reservation.transacciones.find((item) => item.schedule_id === schedule.id && item.status === 'pending_confirmation' && item.method === methodName);
    if (existing) return { status: existing.status, attemptId: existing.id, reservation };
    const attempt = { id: localId(), schedule_id: schedule.id, amount_minor: schedule.amount_minor, currency: 'USD', method: methodName, status: 'pending_confirmation', created_at: new Date().toISOString() };
    data.attempts.push(attempt); reservation.transacciones.unshift(attempt); localSaveData(data);
    return { status: attempt.status, attemptId: attempt.id, reservation };
  }
  localFail(404, 'No encontramos esa opción.');
}
async function actualizarReservasServidor() { if (!estado.usuario) { estado.reservas = []; return; } const datos = await api('/api/reservations'); estado.reservas = datos.reservations || []; }
async function iniciarSesionServidor() { try { const datos = await api('/api/auth/session'); estado.usuario = datos.user; await actualizarReservasServidor(); } catch { estado.usuario = null; estado.reservas = []; } actualizarUsuario(); }
function guardarEstado() { localStorage.setItem('bitaFavoritos', JSON.stringify(estado.favoritos)); localStorage.setItem('bitaCarrito', JSON.stringify(estado.carrito)); }
function guardarSesion() { actualizarUsuario(); }
async function cerrarSesion() { try { await api('/api/auth/logout', { method: 'POST', body: '{}' }); } catch {} estado.usuario = null; estado.reservas = []; actualizarUsuario(); }
function mostrarAviso(mensaje) { clearTimeout(temporizadorAviso); $('#aviso').textContent = mensaje; $('#aviso').classList.add('visible'); temporizadorAviso = setTimeout(() => $('#aviso').classList.remove('visible'), 3200); }
function validarFormulario(formulario, mensajeSelector = '') { if (formulario.checkValidity()) return true; const campo = formulario.querySelector(':invalid'); const etiqueta = campo?.labels?.[0]?.textContent?.replace(/\s+/g, ' ').trim() || 'los campos obligatorios'; if (mensajeSelector) $(mensajeSelector).textContent = `Revisá ${etiqueta}.`; campo?.classList.add('campo-invalido'); campo?.focus(); formulario.reportValidity(); return false; }
function estadoCargaBoton(boton, texto, duracion = 500) { if (!boton || boton.disabled) return; const original = boton.textContent; boton.disabled = true; boton.classList.add('cargando'); boton.textContent = texto; window.setTimeout(() => { boton.disabled = false; boton.classList.remove('cargando'); boton.textContent = original; }, duracion); }
document.addEventListener('input', (evento) => { if (evento.target.matches('input, select, textarea')) evento.target.classList.remove('campo-invalido'); });
const focoAnteriorDeCapa = new WeakMap();
function abrir(selector) { const capa = $(selector); if (!capa) return; if (!capa.classList.contains('abierto')) focoAnteriorDeCapa.set(capa, document.activeElement); capa.classList.add('abierto'); capa.setAttribute('aria-hidden', 'false'); const primerControl = capa.querySelector('.cerrar-panel, button:not(:disabled), a[href], input:not(:disabled), select:not(:disabled), textarea:not(:disabled)'); primerControl?.focus({ preventScroll: true }); }
function cerrar(selector) { const capa = $(selector); if (!capa) return; capa.classList.remove('abierto'); capa.setAttribute('aria-hidden', 'true'); if (capa.id === 'chat') $('.chat-boton')?.setAttribute('aria-expanded', 'false'); const focoAnterior = focoAnteriorDeCapa.get(capa); if (focoAnterior?.isConnected) focoAnterior.focus({ preventScroll: true }); }
function capaModalSuperior() { return $$('.modal.abierto,.buscador-panel.abierto,.modal-auth.abierto,.carrito.abierto,#panel-cuenta.abierto,#chat.abierto').sort((a, b) => (Number.parseInt(getComputedStyle(a).zIndex, 10) || 0) - (Number.parseInt(getComputedStyle(b).zIndex, 10) || 0)).at(-1); }
document.addEventListener('keydown', (evento) => {
  const capa = capaModalSuperior();
  if (!capa) { if (evento.key === 'Escape' && $('.menu-principal').classList.contains('abierto')) { $('.menu-principal').classList.remove('abierto'); $('.boton-menu').setAttribute('aria-expanded', 'false'); $('.boton-menu').focus(); } return; }
  if (evento.key === 'Escape') { evento.preventDefault(); cerrar(`#${capa.id}`); return; }
  if (evento.key !== 'Tab' || capa.getAttribute('aria-modal') !== 'true') return;
  const controles = [...capa.querySelectorAll('a[href],button:not(:disabled),input:not(:disabled),select:not(:disabled),textarea:not(:disabled),[tabindex]:not([tabindex="-1"])')].filter((control) => control.getClientRects().length > 0);
  if (!controles.length) { evento.preventDefault(); return; }
  const primero = controles[0]; const ultimo = controles.at(-1);
  if (evento.shiftKey && (document.activeElement === primero || !capa.contains(document.activeElement))) { evento.preventDefault(); ultimo.focus(); }
  else if (!evento.shiftKey && (document.activeElement === ultimo || !capa.contains(document.activeElement))) { evento.preventDefault(); primero.focus(); }
});
function actualizarFavoritos() { $('#contador-favoritos').textContent = estado.favoritos.length; tarjetas.forEach((tarjeta) => { const activo = estado.favoritos.includes(tarjeta.dataset.destino); const boton = tarjeta.querySelector('.corazon'); boton.textContent = activo ? '♥' : '♡'; boton.classList.toggle('seleccionado', activo); boton.setAttribute('aria-pressed', String(activo)); boton.setAttribute('aria-label', `${activo ? 'Quitar' : 'Agregar'} ${tarjeta.dataset.destino} ${activo ? 'de' : 'a'} favoritos`); }); }
function actualizarUsuario() { const esPersonal = ['staff', 'admin'].includes(estado.usuario?.rol); document.body.classList.toggle('sesion-personal', esPersonal); $$('[data-cuenta-acceso]').forEach((boton) => { const nombre = estado.usuario?.nombre?.split(' ')[0]; boton.dataset.accion = estado.usuario ? 'abrir-cuenta' : 'abrir-login'; boton.setAttribute('aria-label', esPersonal ? 'Abrir gestión de solicitudes BITA' : estado.usuario ? 'Abrir mi cuenta' : 'Iniciar sesión o crear una cuenta'); const texto = boton.querySelector('.texto-cuenta'); if (texto) texto.textContent = boton.classList.contains('boton-cuenta') ? (esPersonal ? 'Área BITA' : nombre ? `Hola, ${nombre}` : 'Mi cuenta') : (estado.usuario ? 'Mi cuenta' : 'Cuenta'); }); }
function actualizarCarrito() {
  const cantidad = estado.carrito.reduce((total, item) => total + item.cantidad, 0); const subtotal = estado.carrito.reduce((total, item) => total + item.precio * item.cantidad, 0); const impuestos = Math.round(subtotal * 0.08);
  $('#contador-carrito').textContent = cantidad; $('#subtotal-carrito').textContent = dinero(subtotal); $('#impuestos-carrito').textContent = dinero(impuestos); $('#total-carrito').textContent = dinero(subtotal + impuestos);
  $('#cantidad-resumen-carrito').textContent = cantidad ? `${cantidad} ${cantidad === 1 ? 'viaje seleccionado' : 'viajes seleccionados'} · precio por persona` : 'Todavía no agregaste viajes';
  $$('[data-accion="checkout"], [data-accion="vaciar-carrito"]').forEach((boton) => { boton.disabled = !cantidad; });
  $('#items-carrito').innerHTML = estado.carrito.length ? estado.carrito.map((item, indice) => `<article class="item-carrito"><div><h3>${item.nombre}</h3><p>${item.noches} · ${dinero(item.precio)} por persona</p><div class="cantidad"><button type="button" data-accion="restar" data-indice="${indice}">−</button><span>${item.cantidad}</span><button type="button" data-accion="sumar" data-indice="${indice}">+</button></div></div><button type="button" class="eliminar-item" data-accion="eliminar" data-indice="${indice}" aria-label="Eliminar ${item.nombre}">×</button></article>`).join('') : '<div class="carrito-vacio"><span>✈</span><h3>Tu carrito está vacío</h3><p>Agregá un paquete y empezá a organizar tu próxima aventura.</p></div>';
  guardarEstado();
}
function agregarCarrito(paquete) { if (['staff', 'admin'].includes(estado.usuario?.rol)) { mostrarAviso('La cuenta asesora solo puede gestionar solicitudes desde el panel BITA.'); return; } const existente = estado.carrito.find((item) => item.nombre === paquete.nombre); if (existente) existente.cantidad += 1; else estado.carrito.push({ ...paquete, cantidad: 1 }); actualizarCarrito(); mostrarAviso(`${paquete.nombre} se agregó al carrito.`); }
function abrirDetalle(destino, precio) { const datos = datosDestinos[destino]; const guia = guiasDestinos[destino]; if (!datos || !guia) return; estado.destinoSeleccionado = destino; const precioVisible = dinero(datos.precio || Number(precio)); $('#modal-titulo').textContent = datos.titulo; $('#modal-texto').innerHTML = `<div class="encabezado-ficha-viaje"><span>${guia.circuito}</span><strong>Desde ${precioVisible}</strong><small>${datos.duracion} · ${datos.tipo} · Precio por persona</small></div><p class="descripcion-ficha-viaje">${datos.descripcion}</p><p class="ficha-demo-aviso">El precio final, las fechas, los servicios incluidos y las condiciones se detallan en la cotización, sujetos a disponibilidad.</p><div class="bloques-ficha-viaje"><section><h3>Servicios incluidos</h3><ul>${guia.incluye.map((item) => `<li>${item}</li>`).join('')}</ul></section><section><h3>Servicios no incluidos</h3><ul><li>Vuelos internacionales, salvo indicación</li><li>Comidas no especificadas</li><li>Gastos personales y propinas</li><li>Seguro opcional y visados, si aplican</li></ul></section></div><section class="itinerario-ficha-viaje"><h3>Recorrido orientativo</h3><ol>${guia.destacados.map((item, indice) => `<li><span>Etapa ${indice + 1}</span>${item}</li>`).join('')}</ol></section>`; abrir('#modal'); }
function prepararTarjetasDestinos() { tarjetas.forEach((tarjeta) => { const datos = datosDestinos[tarjeta.dataset.destino]; if (!datos) return; tarjeta.dataset.precio = datos.precio; tarjeta.dataset.noches = datos.duracion; const info = tarjeta.querySelector('.info-destino'); info.querySelector('h3').textContent = datos.titulo; info.querySelector('p').textContent = datos.descripcion; const precio = info.querySelector('span:not(.chip)'); precio.classList.add('precio-destino'); precio.textContent = `Desde ${dinero(datos.precio)}`; precio.dataset.usd = datos.precio; let meta = info.querySelector('.meta-destino'); if (!meta) { meta = document.createElement('small'); meta.className = 'meta-destino'; precio.before(meta); } meta.textContent = `${datos.duracion} · ${datos.tipo}`; const favorito = tarjeta.querySelector('.corazon'); favorito.setAttribute('aria-label', `Agregar ${tarjeta.dataset.destino} a favoritos`); const acciones = tarjeta.querySelector('.acciones-tarjeta'); if (!acciones.querySelector('.comprar-destino')) { const comprar = document.createElement('button'); comprar.type = 'button'; comprar.className = 'comprar-destino'; comprar.textContent = 'Agregar viaje'; comprar.setAttribute('aria-label', `Agregar ${tarjeta.dataset.destino} al carrito`); acciones.prepend(comprar); } }); }
function activarAuth(tipo) {
  const esLogin = tipo === 'login'; const esRegistro = tipo === 'registro';
  $$('.pestana').forEach((p) => { const activa = p.dataset.auth === tipo; p.classList.toggle('activa', activa); p.setAttribute('aria-selected', String(activa)); });
  $('#form-login').classList.toggle('oculto', !esLogin); $('#form-registro').classList.toggle('oculto', !esRegistro); $('#form-recuperar').classList.toggle('oculto', tipo !== 'recuperar');
  const primerCampo = esLogin ? '#email-login' : esRegistro ? '#nombre-registro' : '#email-recuperar';
  $(primerCampo).focus();
}
function mensajeAuth(id, mensaje, tipo = '') { const elemento = $(id); elemento.textContent = mensaje; elemento.className = `mensaje-auth ${tipo}`; }
function abrirAuth(tipo = 'login') { abrir('#modal-auth'); activarAuth(tipo); }
function normalizar(texto = '') { return texto.normalize('NFD').replace(/[\u0300-\u036f]/g, '').toLowerCase().trim(); }
function destinosFiltrados(consulta = '', tipo = '', presupuesto = '', temporada = '') { const termino = normalizar(consulta); const sinonimos = { playa: ['Brasil', 'México', 'Tailandia'], europa: ['Polonia', 'Suiza', 'Italia'], america: ['Bolivia', 'Brasil', 'México'], asia: ['Japón', 'Tailandia', 'Corea del Sur'], africa: ['Egipto', 'Marruecos', 'Kenia'], oceania: ['Australia', 'Nueva Zelanda'], aventura: ['Bolivia', 'Marruecos', 'Nueva Zelanda'], cultura: ['Polonia', 'Japón', 'Egipto', 'Corea del Sur', 'Tailandia'], relax: ['Brasil', 'México', 'Tailandia'], naturaleza: ['Suiza', 'Australia', 'Nueva Zelanda'] };
  return Object.entries(datosDestinos).filter(([destino, datos]) => { const textoDestino = normalizar(`${destino} ${datos.titulo} ${datos.descripcion} ${datos.tipo}`); const coincideTexto = !termino || textoDestino.includes(termino) || (sinonimos[termino] || []).includes(destino); const coincideTipo = !tipo || datos.tipo === tipo; const coincidePrecio = !presupuesto || datos.precio <= Number(presupuesto); const coincideTemporada = !temporada || (temporadasRecomendadas[destino] || []).includes(temporada); return coincideTexto && coincideTipo && coincidePrecio && coincideTemporada; });
}
function renderizarSugerencias() { const consulta = $('#destino').value; const resultados = destinosFiltrados(consulta).slice(0, 5); const contenedor = $('#sugerencias-busqueda'); if (!consulta.trim()) { contenedor.innerHTML = ''; return; } contenedor.innerHTML = resultados.length ? resultados.map(([destino, datos]) => `<button type="button" role="option" data-destino-sugerido="${destino}"><span>${datos.titulo}</span><small>${datos.duracion} · ${dinero(datos.precio)}</small></button>`).join('') : '<p>No encontramos coincidencias. Probá con “playa”, “aventura” o un país.</p>';
}
function renderizarResultadosBusqueda(resultados, consulta = '') { const contenedor = $('#resultado-busqueda'); if (!resultados.length) { contenedor.innerHTML = `<div class="sin-resultados"><strong>No encontramos viajes con esos filtros.</strong><span>Probá cambiar el presupuesto o elegir otra experiencia.</span></div>`; return; }
  contenedor.innerHTML = `<p class="titulo-resultados">${consulta ? `Resultados para “${consulta}”` : 'Viajes recomendados'} <span>${resultados.length}</span></p><div class="lista-resultados-busqueda">${resultados.map(([destino, datos]) => `<article><div><strong>${datos.titulo}</strong><p>${datos.descripcion}</p><small>${datos.duracion} · ${datos.tipo}</small></div><div><b>${dinero(datos.precio)}</b><button type="button" data-resultado-destino="${destino}">Ver viaje</button></div></article>`).join('')}</div>`;
}
function destinosNombradosEnChat(texto) {
  const consulta = normalizar(texto);
  const alias = { 'corea': 'Corea del Sur', 'corea del sur': 'Corea del Sur', 'uyuni': 'Bolivia', 'salar': 'Bolivia', 'rio': 'Brasil', 'río': 'Brasil', 'caribe': 'México', 'tokio': 'Japón', 'kioto': 'Japón', 'varsovia': 'Polonia', 'cracovia': 'Polonia', 'marrakech': 'Marruecos', 'masai mara': 'Kenia', 'nairobi': 'Kenia', 'milford sound': 'Nueva Zelanda', 'great ocean road': 'Australia' };
  const nombres = Object.keys(datosDestinos).filter((nombre) => consulta.includes(normalizar(nombre)));
  Object.entries(alias).forEach(([nombre, destino]) => { if (consulta.includes(normalizar(nombre)) && !nombres.includes(destino)) nombres.push(destino); });
  return [...new Set(nombres)].map((nombre) => [nombre, datosDestinos[nombre]]).filter(([, datos]) => datos);
}
function extraerMontoChat(texto) {
  const consulta = normalizar(texto);
  const coincide = consulta.match(/(?:usd|u\$s|dolares?|presupuesto|hasta|menos de)?\s*(\d{1,3}(?:[.,]\d{3})+|\d{3,5})\s*(mil|k)?/i);
  if (!coincide) return null;
  let monto = Number(coincide[1].replace(/[.,]/g, ''));
  if (coincide[2]) monto *= 1000;
  return Number.isFinite(monto) && monto >= 100 ? monto : null;
}
function responderChat(texto) {
  const consulta = normalizar(texto);
  const todos = Object.entries(datosDestinos);
  const porPrecio = [...todos].sort(([, a], [, b]) => a.precio - b.precio);
  const nombrados = destinosNombradosEnChat(consulta);
  const monto = extraerMontoChat(consulta);
  const montoUSD = monto && /ars|pesos?/.test(consulta) && cotizacionDolarARS ? Math.floor(monto / cotizacionDolarARS) : monto;
  const tipoBuscado = /\b(playa|mar|caribe|relax)\b/.test(consulta) ? 'playa' : /\b(aventura|trekking|safari|adrenalina)\b/.test(consulta) ? 'aventura' : /\b(cultura|historia|museo|arte|templo)\b/.test(consulta) ? 'cultural' : /\b(naturaleza|montana|paisaje|fiordo)\b/.test(consulta) ? 'naturaleza' : /\b(gastronomia|comida|sabores)\b/.test(consulta) ? 'gastronomia' : '';
  const duracionMatch = consulta.match(/(\d{1,2})\s*dias?/);
  const duracionMax = /fin de semana|escapada corta/.test(consulta) ? 4 : duracionMatch ? Number(duracionMatch[1]) : null;
  if (montoUSD) contextoChat.presupuesto = montoUSD;
  if (tipoBuscado) contextoChat.tipo = tipoBuscado;
  if (duracionMax) contextoChat.duracion = duracionMax;

  const destinosPorPreferencia = (fuente = todos) => fuente.filter(([destino, datos]) => {
    const dentroDelPresupuesto = contextoChat.presupuesto == null || datos.precio <= contextoChat.presupuesto;
    const tipoCoincide = !contextoChat.tipo || (contextoChat.tipo === 'playa' ? ['Brasil', 'México', 'Tailandia'].includes(destino) : contextoChat.tipo === 'aventura' ? datos.tipo === 'Aventura' || datos.tipo === 'Safari' : contextoChat.tipo === 'cultural' ? datos.tipo === 'Cultural' : contextoChat.tipo === 'naturaleza' ? datos.tipo === 'Naturaleza' : datos.tipo === 'Gastronomía');
    const duracionCoincide = !contextoChat.duracion || Number.parseInt(datos.duracion, 10) <= contextoChat.duracion;
    return dentroDelPresupuesto && tipoCoincide && duracionCoincide;
  });
  const seleccionar = (fuente) => fuente.slice().sort(([, a], [, b]) => a.precio - b.precio).slice(0, 3);
  const tarjetaTexto = (viajes) => viajes.map(([, datos]) => `${datos.titulo} (${datos.duracion}, desde ${dinero(datos.precio)} por persona)`).join('; ');
  const respuesta = (mensaje, viajes = [], acciones = []) => { contextoChat.ultimaRecomendacion = viajes.map(([destino]) => destino); return { mensaje, viajes, acciones }; };

  if (/^(hola|buenas|buen dia|buenas tardes|buenas noches)\b/.test(consulta)) return respuesta(`¡Hola${estado.usuario?.nombre ? `, ${estado.usuario.nombre.split(' ')[0]}` : ''}! Te ayudo a comparar destinos, ver qué incluye un viaje y entender cómo reservar. ¿Qué tenés en mente?`, seleccionar(porPrecio));
  if (/^(gracias|muchas gracias)\b/.test(consulta)) return respuesta('¡De nada! Si me contás presupuesto, duración o estilo de viaje, te acerco opciones concretas.');
  if (/^(no|ninguno|ninguna|no se|no sé)$/.test(consulta)) return respuesta('Está bien. Podemos empezar por algo simple: ¿preferís playa, naturaleza, cultura o aventura?');

  if (/recuperar|olvide mi clave|olvide mi contrasena|contrasena/.test(consulta)) return respuesta('Para recuperar el acceso, abrí Mi cuenta y elegí “¿Olvidaste tu contraseña?”. Se prepara un correo para que BITA te ayude a restablecerla.');
  if (/mi cuenta|mis viajes|mis reservas|estado de mi reserva|ver mi reserva/.test(consulta)) {
    const reserva = estado.usuario && !['staff', 'admin'].includes(estado.usuario.rol) ? estado.reservas[0] : null;
    if (reserva) return respuesta(`Tu solicitud más reciente es ${reserva.codigo}: ${etiquetaEstadoReserva(reserva.estado)}. ${reserva.estado === 'pending_review' ? 'BITA todavía está revisando disponibilidad y precio.' : `El viaje es ${reserva.items.map((item) => item.name).join(' + ')} y sale el ${new Date(`${reserva.salida}T12:00:00`).toLocaleDateString('es-AR')}.`}`, [], [{ etiqueta: 'Abrir Mi cuenta', accion: 'cuenta' }]);
    return respuesta(estado.usuario && !['staff', 'admin'].includes(estado.usuario.rol) ? 'Desde Mi cuenta podés revisar tus solicitudes, ver la decisión de BITA, elegir el plan de pago y consultar el saldo y el historial.' : 'Abrí “Mi cuenta” en la parte superior. Iniciá sesión para consultar reservas, pagos y datos de tu perfil.', [], [{ etiqueta: estado.usuario ? 'Abrir Mi cuenta' : 'Ingresar', accion: 'cuenta' }]);
  }
  if (/(metodo|forma|medio|opcion|opciones|tarjeta|transferencia|mercado pago|mercadopago)/.test(consulta) && /pago|cuota|pagar|aceptan|disponible/.test(consulta)) return respuesta('Una vez aprobada la reserva, podés elegir tarjeta, transferencia o Mercado Pago en el paso de pago de Mi cuenta. Para transferencia o Mercado Pago, el pago queda pendiente hasta que BITA confirme la acreditación.', [], [{ etiqueta: 'Ir a Mi cuenta', accion: 'cuenta' }]);
  if (/pago|cuota|sena|seña|cronograma|saldo/.test(consulta) && estado.usuario && !['staff', 'admin'].includes(estado.usuario.rol)) {
    const reservaConSaldo = estado.reservas.find((reserva) => reserva.saldoMinor > 0 && reserva.cronograma?.length);
    const pendiente = reservaConSaldo?.cronograma.find((cuota) => !['paid', 'cancelled'].includes(cuota.status));
    if (reservaConSaldo && pendiente) return respuesta(`En ${reservaConSaldo.codigo}, el próximo pago es ${pendiente.kind === 'deposit' ? 'la seña' : pendiente.kind === 'full' ? 'el pago total' : `la cuota ${pendiente.sequence_no}`} por ${formatearMinor(pendiente.amount_minor, reservaConSaldo.moneda)}. Vence ${new Date(`${pendiente.due_at}T12:00:00`).toLocaleDateString('es-AR')}; el saldo total pendiente es ${formatearMinor(reservaConSaldo.saldoMinor, reservaConSaldo.moneda)}.`, [], [{ etiqueta: 'Abrir Mi cuenta', accion: 'cuenta' }]);
  }
  if (/pagar|pago|cuota|sena|seña|cronograma/.test(consulta)) return respuesta('Primero enviás la solicitud de reserva. Cuando BITA aprueba disponibilidad y precio, desde Mi cuenta elegís pago total o seña con cuotas manuales. Cada vencimiento se paga desde esa cuenta; no hay débitos automáticos.', [], [{ etiqueta: 'Ver pasos de reserva', accion: 'reserva' }, { etiqueta: 'Ir a Mi cuenta', accion: 'cuenta' }]);
  if (/reserva|reservar|comprar|carrito/.test(consulta)) return respuesta('Elegí un viaje y agregalo al carrito. Luego iniciá sesión, completá fecha y pasajeros y enviá la solicitud. BITA revisa disponibilidad y precio; después de aprobarla vas a poder elegir cómo pagar.', [], [{ etiqueta: 'Buscar un viaje', accion: 'buscar' }]);
  if (/disponibilidad|hay lugar|hay cupo|cupos/.test(consulta)) return respuesta('La disponibilidad cambia según fecha y proveedor. Enviá una solicitud con tu fecha estimada y cantidad de pasajeros; BITA revisará los cupos y te responderá con una cotización.');
  if (/incluye|incluido|incluidos|hotel|alojamiento|vuelo|comida|desayuno|traslado/.test(consulta) && nombrados.length) {
    const [destino, datos] = nombrados[0]; const guia = guiasDestinos[destino];
    return respuesta(`${datos.titulo}: la propuesta incluye ${guia.incluye.join(', ').toLowerCase()}. Los vuelos internacionales, comidas no especificadas, gastos personales, seguro y visados no se incluyen salvo que la cotización lo indique.`, nombrados.slice(0, 1));
  }
  if (/incluye|incluido|incluidos|hotel|alojamiento|vuelo|comida|desayuno|traslado/.test(consulta)) return respuesta('Cada ficha de viaje muestra servicios incluidos y no incluidos. Decime qué destino estás mirando y te detallo su propuesta.');
  if (/dolar|peso|ars|cotizacion|moneda/.test(consulta)) return respuesta(`El selector “Moneda” muestra una conversión orientativa a pesos argentinos${cotizacionDolarARS ? `, con una cotización de referencia de ARS ${cotizacionDolarARS.toLocaleString('es-AR')} por USD` : ''}. El precio y la moneda finales se confirman en la propuesta aprobada por BITA.`);
  if (/cancel|cambio|devol|reembolso/.test(consulta)) return respuesta('Los cambios, cancelaciones y posibles cargos dependen de la tarifa y los proveedores. Revisá las condiciones de la propuesta aprobada antes de elegir el plan de pago.');
  if (/visa|documento|pasaporte|requisito/.test(consulta)) return respuesta('Los requisitos dependen de tu nacionalidad y del destino. Consultá fuentes oficiales antes de viajar; BITA puede orientarte durante la planificación.');
  if (/contacto|whatsapp|telefono|email|mail|asesor/.test(consulta)) return respuesta('Podés escribir a reservasbita@gmail.com o comunicarte por WhatsApp al +54 11 4321-7890. El horario informado es de lunes a viernes, de 9 a 18 h.', [], [{ etiqueta: 'Ir a contacto', accion: 'contacto' }]);
  if (/pareja|romantico|luna de miel/.test(consulta)) { const viajes = ['Italia', 'Suiza', 'México'].map((destino) => [destino, datosDestinos[destino]]); return respuesta(`Para viajar en pareja, te propongo opciones distintas: ${tarjetaTexto(viajes)}. ¿Preferís playa, ciudades o montaña?`, viajes); }
  if (/familia|ninos|menores|chicos/.test(consulta)) { const viajes = ['México', 'Brasil', 'Australia'].map((destino) => [destino, datosDestinos[destino]]); return respuesta(`Para una salida en familia, podés comparar ${tarjetaTexto(viajes)}. En la solicitud indicá las edades de los menores y cuántos viajan para ajustar habitación y servicios.`, viajes); }
  if (/solo|sola|viajo sin/.test(consulta)) { const viajes = ['Japón', 'Polonia', 'Tailandia'].map((destino) => [destino, datosDestinos[destino]]); return respuesta(`Si viajás por tu cuenta, mirá ${tarjetaTexto(viajes)}. El precio publicado es por persona; la habitación individual puede modificar la cotización.`, viajes); }

  if (nombrados.length) {
    const viajes = nombrados.slice(0, 3);
    if (viajes.length === 1) { const [destino, datos] = viajes[0]; const guia = guiasDestinos[destino]; return respuesta(`${datos.titulo} dura ${datos.duracion} y es una propuesta ${datos.tipo.toLowerCase()}. Parte desde ${dinero(datos.precio)} por persona. El recorrido incluye ${guia.circuito}; la ficha detalla servicios e itinerario.`, viajes); }
    return respuesta(`Puedo comparar estos destinos: ${tarjetaTexto(viajes)}. Decime cuál te interesa más o qué estilo preferís.`, viajes);
  }

  if (/mas barato|mas economico|opcion mas accesible/.test(consulta)) { const viajes = seleccionar(porPrecio); return respuesta(`Las opciones de menor precio son ${tarjetaTexto(viajes)}. Son valores estimados por persona.`, viajes); }
  if (/otra opcion|otras opciones|algo distinto|mas opciones|algo mas|otra recomendacion/.test(consulta) && contextoChat.ultimaRecomendacion.length) {
    const opciones = seleccionar(todos.filter(([destino]) => !contextoChat.ultimaRecomendacion.includes(destino)));
    if (!opciones.length) return respuesta('Ya te mostré las opciones que mejor encajaban. Si querés, cambiamos el presupuesto o el estilo y busco una nueva combinación.', [], [{ etiqueta: 'Empezar de nuevo', accion: 'reiniciar' }]);
    return respuesta(`Claro, también podés mirar ${tarjetaTexto(opciones)}.`, opciones);
  }

  if (/que podes hacer|que sabes|como me podes ayudar|ayuda/.test(consulta)) return respuesta('Puedo recomendar y comparar destinos del catálogo, orientarte con precios y duración, contarte qué incluye un paquete y explicarte cómo reservar o consultar tus pagos. ¿Por dónde empezamos?', [], [{ etiqueta: 'Buscar un viaje', accion: 'buscar' }, { etiqueta: 'Cómo reservar', accion: 'reserva' }]);
  if (/me conviene|que me recomendas|recomendame|recomendas/.test(consulta) && !tipoBuscado && !montoUSD && !nombrados.length) return respuesta('Para recomendarte algo que encaje con vos, decime al menos una preferencia: playa, naturaleza, cultura o aventura. Si ya tenés un presupuesto o una duración en mente, sumalos también.');

  if (tipoBuscado || montoUSD || duracionMax || contextoChat.presupuesto || contextoChat.tipo || contextoChat.duracion) {
    const viajes = seleccionar(destinosPorPreferencia());
    if (viajes.length) {
      const criterios = [contextoChat.tipo ? `estilo ${contextoChat.tipo}` : '', contextoChat.presupuesto ? `hasta ${dinero(contextoChat.presupuesto)}` : '', contextoChat.duracion ? `hasta ${contextoChat.duracion} días` : ''].filter(Boolean).join(', ');
      return respuesta(`Con ${criterios || 'lo que me contaste'}, estas opciones encajan mejor: ${tarjetaTexto(viajes)}. Los precios son por persona y pueden variar según fecha y disponibilidad.`, viajes);
    }
    const alternativas = seleccionar(todos);
    return respuesta(`No encontré un viaje que cumpla todos esos criterios juntos. Lo más cercano por precio es ${tarjetaTexto(alternativas)}. ¿Qué preferís flexibilizar: presupuesto, estilo o duración?`, alternativas);
  }
  const opciones = seleccionar(porPrecio);
  return respuesta('Puedo orientarte por destino, presupuesto, duración o estilo. Por ejemplo, escribí “playa hasta USD 1.200”, “Japón” o “viajo en familia”.', opciones);
}
function agregarMensajeChat(texto, propio = false, clase = '') { const burbuja = document.createElement('p'); burbuja.textContent = texto; burbuja.className = `${propio ? 'mensaje-propio' : 'mensaje-asistente'} ${clase}`.trim(); $('#chat-mensajes').append(burbuja); $('#chat-mensajes').scrollTop = $('#chat-mensajes').scrollHeight; return burbuja; }
function mostrarRespuestaChat(respuesta) {
  agregarMensajeChat(respuesta.mensaje);
  if (respuesta.viajes?.length) {
    const lista = document.createElement('div'); lista.className = 'chat-recomendaciones';
    respuesta.viajes.forEach(([destino, datos]) => {
      const tarjeta = document.createElement('article'); tarjeta.className = 'chat-recomendacion';
      const titulo = document.createElement('strong'); titulo.textContent = datos.titulo;
      const detalle = document.createElement('small'); detalle.textContent = `${datos.duracion} · ${datos.tipo} · desde ${dinero(datos.precio)} por persona`;
      const acciones = document.createElement('div'); acciones.className = 'chat-acciones-viaje';
      const ver = document.createElement('button'); ver.type = 'button'; ver.dataset.destinoChat = destino; ver.dataset.chatAccion = 'ver'; ver.textContent = 'Ver viaje';
      const sumar = document.createElement('button'); sumar.type = 'button'; sumar.dataset.destinoChat = destino; sumar.dataset.chatAccion = 'agregar'; sumar.textContent = 'Agregar';
      acciones.append(ver, sumar); tarjeta.append(titulo, detalle, acciones); lista.append(tarjeta);
    });
    $('#chat-mensajes').append(lista);
  }
  if (respuesta.acciones?.length) {
    const acciones = document.createElement('div'); acciones.className = 'chat-acciones-respuesta';
    respuesta.acciones.forEach((item) => { const boton = document.createElement('button'); boton.type = 'button'; boton.dataset.chatAccion = item.accion; boton.textContent = item.etiqueta; acciones.append(boton); });
    $('#chat-mensajes').append(acciones);
  }
  $('#chat-mensajes').scrollTop = $('#chat-mensajes').scrollHeight;
}

$$('[data-accion="mostrar-buscador"]').forEach((boton) => boton.addEventListener('click', () => { abrir('#buscador'); $('#destino').focus(); renderizarResultadosBusqueda(destinosFiltrados()); }));
$('[data-accion="cerrar-buscador"]').addEventListener('click', () => cerrar('#buscador'));
$('[data-accion="cerrar-modal"]').addEventListener('click', () => cerrar('#modal'));
$("[data-accion=\"agregar-desde-detalle\"]").addEventListener('click', () => { const datos = datosDestinos[estado.destinoSeleccionado]; if (!datos) return; agregarCarrito({ nombre: datos.titulo, precio: datos.precio, noches: datos.duracion }); cerrar('#modal'); abrir('#carrito'); });
$$('[data-accion="abrir-carrito"]').forEach((boton) => boton.addEventListener('click', () => abrir('#carrito')));
$('[data-accion="cerrar-carrito"]').addEventListener('click', () => cerrar('#carrito'));
$('[data-accion="cerrar-auth"]').addEventListener('click', () => cerrar('#modal-auth'));
prepararTarjetasDestinos();
$$('.paquete').forEach((paquete) => { const datos = Object.values(datosDestinos).find((viaje) => viaje.titulo === paquete.dataset.paquete); if (!datos) return; paquete.dataset.precio = datos.precio; paquete.dataset.noches = datos.duracion; const precio = paquete.querySelector('.paquete-pie strong'); precio.dataset.usd = datos.precio; precio.textContent = dinero(datos.precio); });
$$('[data-accion="ir-destinos"]').forEach((boton) => boton.addEventListener('click', () => { $('#destinos').scrollIntoView({ behavior: 'smooth' }); mostrarAviso('Explorá los destinos destacados y elegí tu próxima aventura.'); }));
let regionSeleccionada = 'todos';
function aplicarFiltrosDestinos() { const presupuesto = $('#filtro-precio').value; const duracion = $('#filtro-duracion').value; const tipo = $('#filtro-tipo').value; let visibles = 0; tarjetas.forEach((tarjeta) => { const datos = datosDestinos[tarjeta.dataset.destino]; const dias = Number.parseInt(datos.duracion, 10); const coincideRegion = regionSeleccionada === 'todos' || tarjeta.dataset.region === regionSeleccionada; const coincidePresupuesto = presupuesto === 'todos' || datos.precio <= Number(presupuesto); const coincideDuracion = duracion === 'todos' || (duracion === 'corta' && dias <= 7) || (duracion === 'media' && dias >= 8 && dias <= 10) || (duracion === 'larga' && dias > 10); const coincideTipo = tipo === 'todos' || datos.tipo === tipo; const visible = coincideRegion && coincidePresupuesto && coincideDuracion && coincideTipo; tarjeta.classList.toggle('oculta', !visible); if (visible) visibles += 1; }); $('#estado-filtros').textContent = visibles ? `${visibles} ${visibles === 1 ? 'viaje encontrado' : 'viajes encontrados'} · precios por persona.` : 'No encontramos viajes con esos filtros. Probá ampliar tu búsqueda.'; }
$$('.filtro').forEach((boton) => { boton.setAttribute('aria-pressed', String(boton.classList.contains('activo'))); boton.addEventListener('click', () => { $$('.filtro').forEach((item) => { item.classList.remove('activo'); item.setAttribute('aria-pressed', 'false'); }); boton.classList.add('activo'); boton.setAttribute('aria-pressed', 'true'); regionSeleccionada = boton.dataset.filtro; aplicarFiltrosDestinos(); }); });
$$('#filtro-precio, #filtro-duracion, #filtro-tipo').forEach((control) => control.addEventListener('change', aplicarFiltrosDestinos));
$('[data-accion="limpiar-filtros"]').addEventListener('click', () => { regionSeleccionada = 'todos'; $$('.filtro').forEach((boton) => { const activo = boton.dataset.filtro === 'todos'; boton.classList.toggle('activo', activo); boton.setAttribute('aria-pressed', String(activo)); }); $('#filtro-precio').value = 'todos'; $('#filtro-duracion').value = 'todos'; $('#filtro-tipo').value = 'todos'; aplicarFiltrosDestinos(); });
$('[data-accion="mostrar-todos-destinos"]').addEventListener('click', () => { $('[data-accion="limpiar-filtros"]').click(); mostrarAviso('Mostrando los 14 viajes disponibles.'); });
aplicarFiltrosDestinos();
tarjetas.forEach((tarjeta) => { tarjeta.querySelector('.corazon').addEventListener('click', () => { const destino = tarjeta.dataset.destino; estado.favoritos = estado.favoritos.includes(destino) ? estado.favoritos.filter((item) => item !== destino) : [...estado.favoritos, destino]; guardarEstado(); actualizarFavoritos(); mostrarAviso(`${destino} ${estado.favoritos.includes(destino) ? 'se agregó a' : 'se quitó de'} tus favoritos.`); }); tarjeta.querySelector('.detalle').addEventListener('click', () => abrirDetalle(tarjeta.dataset.destino, tarjeta.dataset.precio)); tarjeta.querySelector('.comprar-destino').addEventListener('click', (evento) => { const datos = datosDestinos[tarjeta.dataset.destino]; estadoCargaBoton(evento.currentTarget, 'Agregado ✓'); agregarCarrito({ nombre: datos.titulo, precio: datos.precio, noches: datos.duracion }); abrir('#carrito'); }); });
$('[data-accion="ver-favoritos"]').addEventListener('click', () => mostrarAviso(estado.favoritos.length ? `Tus favoritos: ${estado.favoritos.join(', ')}.` : 'Todavía no agregaste destinos a favoritos.'));
$('#destino').addEventListener('input', renderizarSugerencias);
$('#sugerencias-busqueda').addEventListener('click', (evento) => { const boton = evento.target.closest('[data-destino-sugerido]'); if (!boton) return; $('#destino').value = boton.dataset.destinoSugerido; $('#sugerencias-busqueda').innerHTML = ''; $('#form-busqueda').requestSubmit(); });
$$('[data-busqueda]').forEach((boton) => boton.addEventListener('click', () => { $('#destino').value = boton.dataset.busqueda; $('#form-busqueda').requestSubmit(); }));
$('[data-accion="limpiar-busqueda"]').addEventListener('click', () => { $('#form-busqueda').reset(); $('#sugerencias-busqueda').innerHTML = ''; renderizarResultadosBusqueda(destinosFiltrados()); $('#destino').focus(); });
$('#form-busqueda').addEventListener('submit', (evento) => { evento.preventDefault(); const formulario = evento.currentTarget; const boton = formulario.querySelector('[type="submit"]'); const consulta = $('#destino').value.trim(); const resultados = destinosFiltrados(consulta, $('#tipo-buscador').value, $('#presupuesto-buscador').value, $('#mes').value); estadoCargaBoton(boton, 'Buscando…', 300); $('#sugerencias-busqueda').innerHTML = ''; window.setTimeout(() => renderizarResultadosBusqueda(resultados, consulta), 140); });
$('#resultado-busqueda').addEventListener('click', (evento) => { const boton = evento.target.closest('[data-resultado-destino]'); if (!boton) return; const destino = boton.dataset.resultadoDestino; cerrar('#buscador'); abrirDetalle(destino, datosDestinos[destino].precio); });
$$('.consultar').forEach((boton) => boton.addEventListener('click', () => { if (['staff', 'admin'].includes(estado.usuario?.rol)) return mostrarAviso('La cuenta asesora solo puede gestionar solicitudes desde el panel BITA.'); cerrar('#modal'); $('#contacto').scrollIntoView({ behavior: 'smooth' }); $('#contacto-consulta').value = `Me interesa recibir información sobre ${boton.dataset.destino || estado.destinoSeleccionado}.`; mostrarAviso('Contanos tus fechas y te orientamos por WhatsApp.'); }));
$('#form-contacto').addEventListener('submit', (evento) => { evento.preventDefault(); if (['staff', 'admin'].includes(estado.usuario?.rol)) return mostrarAviso('La cuenta asesora solo puede gestionar solicitudes desde el panel BITA.'); const formulario = evento.currentTarget; if (!validarFormulario(formulario, '#mensaje-contacto')) return; const nombre = $('#contacto-nombre').value.trim(); const consulta = $('#contacto-consulta').value.trim(); const mensaje = `Hola BITA, soy ${nombre}. ${consulta}`; $('#mensaje-contacto').textContent = 'Abrimos WhatsApp con tu consulta lista para enviar.'; window.open(`https://wa.me/541143217890?text=${encodeURIComponent(mensaje)}`, '_blank', 'noopener'); formulario.reset(); });
$$('.boton-agregar').forEach((boton) => boton.addEventListener('click', () => { const paquete = boton.closest('.paquete'); agregarCarrito({ nombre: paquete.dataset.paquete, precio: Number(paquete.dataset.precio), noches: paquete.dataset.noches }); }));
$('#items-carrito').addEventListener('click', (evento) => { const boton = evento.target.closest('button'); if (!boton) return; const indice = Number(boton.dataset.indice); if (boton.dataset.accion === 'sumar') estado.carrito[indice].cantidad += 1; if (boton.dataset.accion === 'restar') { estado.carrito[indice].cantidad -= 1; if (!estado.carrito[indice].cantidad) estado.carrito.splice(indice, 1); } if (boton.dataset.accion === 'eliminar') estado.carrito.splice(indice, 1); actualizarCarrito(); });
$('[data-accion="vaciar-carrito"]').addEventListener('click', () => { if (!estado.carrito.length) return mostrarAviso('El carrito ya está vacío.'); estado.carrito = []; actualizarCarrito(); mostrarAviso('Se vació el carrito.'); });
function obtenerTotalCarrito(pasajeros = 1) { const subtotalPorPersona = estado.carrito.reduce((total, item) => total + item.precio * item.cantidad, 0); const cantidadPasajeros = Math.max(1, Number(pasajeros) || 1); const subtotal = Math.round(subtotalPorPersona * cantidadPasajeros); const impuestos = Math.round(subtotal * 0.08); return { subtotalPorPersona, pasajeros: cantidadPasajeros, subtotal, impuestos, total: subtotal + impuestos }; }
function obtenerMonedaPago() { const tasa = cotizacionDolarARS; const moneda = monedaARS ? 'ARS' : 'USD'; return { moneda, tasa, convertir: (montoUSD) => moneda === 'ARS' ? Math.round(montoUSD * tasa) : Math.round(montoUSD) }; }
function formatearMonedaFija(monto, moneda = 'USD') { return `${moneda} ${Number(monto || 0).toLocaleString('es-AR', { maximumFractionDigits: 0 })}`; }
function formatearTotalReserva(reserva) { return formatearMonedaFija(reserva.total, reserva.monedaPago || 'USD'); }
function actualizarResumenCheckout() { const pasajeros = Number($('#pasajeros-checkout').value) || 1; const totales = obtenerTotalCarrito(pasajeros); const formato = (valor) => dinero(valor); const viajes = estado.carrito.reduce((cantidad, item) => cantidad + item.cantidad, 0); $('#resumen-checkout').innerHTML = `<div class="resumen-checkout-titulo"><span>Tu selección</span><b>${viajes} ${viajes === 1 ? 'viaje' : 'viajes'} · ${pasajeros} ${pasajeros === 1 ? 'pasajero' : 'pasajeros'}</b></div><div class="resumen-checkout-items">${estado.carrito.map((item) => `<p><span>${item.cantidad}× ${item.nombre}<small>${item.noches} · ${formato(item.precio * item.cantidad)} por persona</small></span><strong>${formato(item.precio * item.cantidad * pasajeros)}</strong></p>`).join('')}</div><div class="resumen-checkout-total"><p><span>Subtotal · ${pasajeros} ${pasajeros === 1 ? 'pasajero' : 'pasajeros'}</span><strong>${formato(totales.subtotal)}</strong></p><p><span>Gestión y coordinación (8%)</span><strong>${formato(totales.impuestos)}</strong></p><p class="total"><span>Total estimado</span><strong>${formato(totales.total)}</strong></p></div><small class="aclaracion-checkout">Importes estimados por persona multiplicados por ${pasajeros} ${pasajeros === 1 ? 'pasajero' : 'pasajeros'}. Disponibilidad, conceptos incluidos y precio final se detallarán en la cotización.</small>`; }
function abrirCheckout() { const hoy = new Date(Date.now() - new Date().getTimezoneOffset() * 60000).toISOString().split('T')[0]; $('#salida-checkout').min = hoy; $('#nombre-checkout').value = estado.usuario?.nombre || ''; $('#email-checkout').value = estado.usuario?.correo || ''; $('#telefono-checkout').value = estado.usuario?.telefono || ''; $('#pasajeros-checkout').value = '1'; $('#mensaje-checkout').textContent = ''; actualizarResumenCheckout(); abrir('#checkout'); }
$("[data-accion=\"checkout\"]").addEventListener('click', () => { if (!estado.carrito.length) return mostrarAviso('Agregá al menos un paquete para continuar.'); if (!estado.usuario) { cerrar('#carrito'); abrirAuth('login'); mostrarAviso('Iniciá sesión para continuar con la reserva.'); } else { cerrar('#carrito'); abrirCheckout(); } });
document.addEventListener('click', async (evento) => { const boton = evento.target.closest('[data-accion="abrir-login"], [data-accion="abrir-cuenta"]'); if (!boton) return; if (boton.dataset.accion === 'abrir-login') abrirAuth('login'); else if (['staff', 'admin'].includes(estado.usuario?.rol)) abrirPanelAgente(); else { try { await actualizarReservasServidor(); mostrarCuenta(); } catch (error) { mostrarAviso(error.message); } } });
$$('.pestana').forEach((boton) => boton.addEventListener('click', () => activarAuth(boton.dataset.auth)));
$$('[data-accion="ir-registro"]').forEach((boton) => boton.addEventListener('click', () => activarAuth('registro')));
$$('[data-accion="ir-login"]').forEach((boton) => boton.addEventListener('click', () => activarAuth('login')));
$$('.ver-clave').forEach((boton) => boton.addEventListener('click', () => { const campo = $(`#${boton.dataset.clave}`); const visible = campo.type === 'text'; campo.type = visible ? 'password' : 'text'; boton.textContent = visible ? 'Mostrar' : 'Ocultar'; boton.setAttribute('aria-label', visible ? 'Mostrar contraseña' : 'Ocultar contraseña'); }));
$('#form-login').addEventListener('submit', async (evento) => {
  evento.preventDefault(); const formulario = evento.currentTarget;
  if (!validarFormulario(formulario, '#mensaje-login')) return;
  try { const datos = await api('/api/auth/login', { method: 'POST', body: JSON.stringify({ email: $('#email-login').value.trim(), password: $('#clave-login').value }) }); estado.usuario = datos.user; await actualizarReservasServidor(); guardarSesion(); cerrar('#modal-auth'); formulario.reset(); mostrarAviso(`¡Qué bueno verte de nuevo, ${estado.usuario.nombre.split(' ')[0]}!`); }
  catch (error) { mensajeAuth('#mensaje-login', error.message, 'error'); }
});
$('#form-registro').addEventListener('submit', async (evento) => {
  evento.preventDefault(); const formulario = evento.currentTarget;
  if (!validarFormulario(formulario, '#mensaje-registro')) return;
  const nombre = $('#nombre-registro').value.trim(); const correo = $('#email-registro').value.trim().toLowerCase(); const clave = $('#clave-registro').value; const confirmar = $('#confirmar-clave').value;
  const telefono = $('#telefono-registro').value.trim(); const digitosTelefono = telefono.replace(/\D/g, '');
  if (telefono && (!/^\+?[\d\s().-]+$/.test(telefono) || digitosTelefono.length < 8 || digitosTelefono.length > 15)) { const campoTelefono = $('#telefono-registro'); campoTelefono.setAttribute('aria-invalid', 'true'); campoTelefono.classList.add('campo-invalido'); mensajeAuth('#mensaje-registro', 'Revisá el WhatsApp: ingresá entre 8 y 15 dígitos e incluí el código de país.', 'error'); campoTelefono.focus(); return; }
  if (!/[A-Z]/.test(clave) || !/\d/.test(clave)) return mensajeAuth('#mensaje-registro', 'Tu contraseña debe incluir una mayúscula y un número.', 'error');
  if (clave !== confirmar) return mensajeAuth('#mensaje-registro', 'Las contraseñas no coinciden. Revisalas e intentá otra vez.', 'error');
  try { const datos = await api('/api/auth/register', { method: 'POST', body: JSON.stringify({ name: nombre, email: correo, phone: $('#telefono-registro').value.trim(), password: clave, newsletter: $('#novedades-bita').checked }) }); estado.usuario = datos.user; estado.reservas = []; guardarSesion(); cerrar('#modal-auth'); formulario.reset(); mensajeAuth('#mensaje-registro', ''); mostrarAviso(`¡Tu cuenta está lista, ${estado.usuario.nombre.split(' ')[0]}! Ya podés empezar a planear tu viaje.`); }
  catch (error) { mensajeAuth('#mensaje-registro', error.message, 'error'); }
});
$('#telefono-registro').addEventListener('input', (evento) => { const campo = evento.currentTarget; campo.removeAttribute('aria-invalid'); campo.classList.remove('campo-invalido'); if ($('#mensaje-registro').textContent.includes('WhatsApp')) mensajeAuth('#mensaje-registro', ''); });
$('[data-accion="recuperar-clave"]').addEventListener('click', () => activarAuth('recuperar'));
$('#form-recuperar').addEventListener('submit', (evento) => { evento.preventDefault(); const formulario = evento.currentTarget; if (!validarFormulario(formulario, '#mensaje-recuperar')) return; const correo = $('#email-recuperar').value.trim(); mensajeAuth('#mensaje-recuperar', `Prepará un correo a reservasbita@gmail.com e incluí la dirección ${correo} para identificar tu cuenta.`, ''); window.location.href = `mailto:reservasbita@gmail.com?subject=${encodeURIComponent('Recuperar acceso a BITA')}&body=${encodeURIComponent(`Hola, necesito recuperar mi cuenta BITA. Mi correo registrado es: ${correo}`)}`; });
$('[data-accion="mostrar-asistencia"]').addEventListener('click', () => { if (['staff', 'admin'].includes(estado.usuario?.rol)) return mostrarAviso('La cuenta asesora solo puede gestionar solicitudes desde el panel BITA.'); $('#contacto').scrollIntoView({ behavior: 'smooth' }); mostrarAviso('Nuestro equipo está disponible para ayudarte.'); });
$('.boton-menu').addEventListener('click', (evento) => { const menu = $('.menu-principal'); menu.classList.toggle('abierto'); evento.currentTarget.setAttribute('aria-expanded', menu.classList.contains('abierto')); });
$$('.menu-principal a').forEach((enlace) => enlace.addEventListener('click', () => { $('.menu-principal').classList.remove('abierto'); $('.boton-menu').setAttribute('aria-expanded', 'false'); }));
actualizarFavoritos(); actualizarCarrito(); actualizarUsuario(); actualizarEstadoCotizacion(); iniciarSesionServidor();

$$('.pregunta').forEach((pregunta, indice) => { const respuesta = pregunta.nextElementSibling; respuesta.id = `respuesta-faq-${indice + 1}`; respuesta.setAttribute('role', 'region'); respuesta.setAttribute('aria-labelledby', `pregunta-faq-${indice + 1}`); pregunta.id = `pregunta-faq-${indice + 1}`; pregunta.setAttribute('aria-controls', respuesta.id); pregunta.setAttribute('aria-expanded', 'false'); pregunta.addEventListener('click', () => { const abrirEsta = !pregunta.classList.contains('abierta'); $$('.pregunta').forEach((item) => { item.classList.remove('abierta'); item.setAttribute('aria-expanded', 'false'); item.nextElementSibling.classList.remove('visible'); item.querySelector('span').textContent = '+'; }); if (abrirEsta) { pregunta.classList.add('abierta'); pregunta.setAttribute('aria-expanded', 'true'); respuesta.classList.add('visible'); pregunta.querySelector('span').textContent = '−'; } }); });
function actualizarMoneda() { document.querySelectorAll('.paquete-pie strong,.info-destino>span,.ficha-cabecera strong').forEach((elemento) => { if (!elemento.dataset.usd) { const numero = elemento.textContent.replace(/[^0-9]/g, ''); elemento.dataset.usd = numero || '0'; } elemento.textContent = dinero(Number(elemento.dataset.usd)); }); renderizarResultadosBusqueda(destinosFiltrados($('#destino').value, $('#tipo-buscador').value, $('#presupuesto-buscador').value, $('#mes').value), $('#destino').value.trim()); if ($('#comparar-a').value && $('#comparar-b').value) actualizarComparacion(); }
$('[data-accion="cambiar-moneda"]').addEventListener('click', async (e) => {
  const boton = e.currentTarget; if (boton.disabled) return;
  const volverAUSD = monedaARS; boton.disabled = true; boton.setAttribute('aria-busy', 'true');
  if (volverAUSD) monedaARS = false;
  else { boton.querySelector('b').textContent = '…'; const tasa = await cargarCotizacionDolar(); if (!tasa) { actualizarEstadoCotizacion('Cotización no disponible'); boton.querySelector('b').textContent = 'USD'; boton.disabled = false; boton.removeAttribute('aria-busy'); return mostrarAviso('No pudimos consultar la cotización. Seguimos mostrando los precios en USD.'); } monedaARS = true; }
  actualizarMoneda(); actualizarCarrito(); actualizarEstadoCotizacion(); boton.querySelector('b').textContent = monedaARS ? 'ARS' : 'USD'; boton.disabled = false; boton.removeAttribute('aria-busy');
  mostrarAviso(monedaARS ? `Precios orientativos convertidos a ARS con el dólar oficial de venta: ${cotizacionDolarARS.toLocaleString('es-AR')} ARS por USD. La reserva y el pago se confirman en USD.` : 'Precios mostrados en dólares estadounidenses.');
});
function actualizarComparacion() {
  const destinoA = $('#comparar-a').value; const destinoB = $('#comparar-b').value; const resultado = $('#resultado-comparador');
  if (!destinoA || !destinoB) { resultado.innerHTML = '<p>Elegí dos destinos para comenzar.</p>'; return; }
  if (destinoA === destinoB) { resultado.innerHTML = '<p class="comparacion-aviso">Elegí dos destinos distintos para poder compararlos.</p>'; return; }
  const viajeA = datosDestinos[destinoA]; const viajeB = datosDestinos[destinoB]; const diasA = Number.parseInt(viajeA.duracion, 10); const diasB = Number.parseInt(viajeB.duracion, 10);
  const masEconomico = viajeA.precio === viajeB.precio ? 'Ambos tienen el mismo precio estimado.' : viajeA.precio < viajeB.precio ? `${viajeA.titulo} es ${dinero(viajeB.precio - viajeA.precio)} más económico.` : `${viajeB.titulo} es ${dinero(viajeA.precio - viajeB.precio)} más económico.`;
  const masCorto = diasA === diasB ? 'Los dos tienen la misma duración.' : diasA < diasB ? `${viajeA.titulo} requiere menos días.` : `${viajeB.titulo} requiere menos días.`;
  const tarjeta = (viaje) => `<article><h4>${viaje.titulo}</h4><p><span>Desde</span><strong>${dinero(viaje.precio)}</strong></p><p><span>Duración</span><b>${viaje.duracion}</b></p><p><span>Tipo</span><b>${viaje.tipo}</b></p></article>`;
  resultado.innerHTML = `<div class="comparacion-resultado"><div class="comparacion-tarjetas">${tarjeta(viajeA)}${tarjeta(viajeB)}</div><div class="comparacion-conclusion"><strong>Resumen rápido</strong><p>${masEconomico} ${masCorto}</p></div></div>`;
}
$$('[data-accion="comparar"]').forEach((boton) => boton.addEventListener('click', actualizarComparacion));
$('[data-accion="intercambiar-comparacion"]').addEventListener('click', () => { const primero = $('#comparar-a').value; $('#comparar-a').value = $('#comparar-b').value; $('#comparar-b').value = primero; actualizarComparacion(); });
$$('[data-accion="ver-mapa"]').forEach((boton) => boton.addEventListener('click', () => window.open('https://www.google.com/maps/search/?api=1&query=Av.%20Corrientes%201043%2C%20CABA', '_blank', 'noopener')));
$('[data-accion="oferta"]').addEventListener('click', () => { const bolivia = datosDestinos.Bolivia; agregarCarrito({ nombre: bolivia.titulo, precio: bolivia.precio, noches: bolivia.duracion }); abrir('#carrito'); });
$('[data-accion="cerrar-checkout"]').addEventListener('click', () => cerrar('#checkout'));
$('#pasajeros-checkout').addEventListener('input', actualizarResumenCheckout);
$('#form-checkout').addEventListener('submit', async (e) => {
  e.preventDefault(); const formulario = e.currentTarget;
  if (!validarFormulario(formulario, '#mensaje-checkout')) return;
  if (!estado.carrito.length) return $('#mensaje-checkout').textContent = 'Tu selección está vacía. Volvé al carrito para elegir un viaje.';
  const pasajeros = Number($('#pasajeros-checkout').value);
  try {
    const { reservation: reserva } = await api('/api/reservations', { method: 'POST', body: JSON.stringify({ departure: $('#salida-checkout').value, passengers: pasajeros, room: $('#habitacion-checkout').value, phone: $('#telefono-checkout').value.trim(), comments: $('#comentarios-checkout').value.trim(), items: estado.carrito.map((item) => ({ name: item.nombre, quantity: item.cantidad })) }) });
    estado.reservas.unshift(reserva); estado.carrito = []; guardarEstado(); actualizarCarrito(); cerrar('#checkout');
    $('#icono-confirmacion').textContent = '✓'; $('#titulo-confirmacion').textContent = 'Enviá tu solicitud a BITA';
  $('#etiqueta-confirmacion').textContent = `Solicitud ${reserva.codigo}`;
  $('#texto-confirmacion').textContent = 'Revisá los datos de tu solicitud y enviala a nuestro equipo para consultar disponibilidad y recibir tu cotización.';
  $('#aviso-confirmacion').textContent = 'Todavía no se realizó ningún pago. La reserva se confirma una vez aprobados la disponibilidad, el precio y las condiciones.';
    $('#resumen-confirmacion').innerHTML = `<p><span>Estado</span><strong>${etiquetaEstadoReserva(reserva.estado)}</strong></p><p><span>Viaje</span><strong>${reserva.items.map((item) => item.name).join(' + ')}</strong></p><p><span>Fecha estimada</span><strong>${new Date(`${reserva.salida}T12:00:00`).toLocaleDateString('es-AR')}</strong></p><p><span>Pasajeros</span><strong>${reserva.pasajeros}</strong></p><p><span>Total estimado</span><strong>${formatearMinor(reserva.totalMinor, reserva.moneda)}</strong></p>`;
    const mensajeReserva = `Hola BITA, quiero consultar mi solicitud de reserva ${reserva.codigo}. Viaje: ${reserva.items.map((item) => item.name).join(' + ')}. Salida: ${new Date(`${reserva.salida}T12:00:00`).toLocaleDateString('es-AR')}. Pasajeros: ${reserva.pasajeros}.`;
    const botonWhatsApp = $('#enviar-reserva-whatsapp'); botonWhatsApp.href = `https://wa.me/541143217890?text=${encodeURIComponent(mensajeReserva)}`; botonWhatsApp.hidden = false;
    abrir('#confirmacion'); formulario.reset(); actualizarResumenCheckout();
  } catch (error) { $('#mensaje-checkout').textContent = error.message; }
});
  $('[data-accion="cerrar-confirmacion"]').addEventListener('click', () => { cerrar('#confirmacion'); if (estado.usuario) { actualizarReservasServidor().then(() => mostrarCuenta('reservas')).catch((error) => mostrarAviso(error.message)); } });

function formatearMinor(amountMinor, currency = 'USD') { return formatearMonedaFija(Number(amountMinor || 0) / 100, currency); }
function etiquetaEstadoReserva(status) { return ({ pending_review: 'Pendiente de revisión', rejected: 'Solicitud rechazada', approved_waiting_plan: 'Aprobada · elegí un plan', awaiting_deposit: 'Seña pendiente', payment_partial: 'Pago parcial · saldo pendiente', paid: 'Pagada', overdue: 'Pago atrasado', cancelled_nonpayment: 'Cancelada por falta de pago' })[status] || status; }
function etiquetaCuota(status) { return ({ due: 'Vence ahora', scheduled: 'Programada', paid: 'Acreditada', processing: 'En proceso', failed: 'Reintentar pago', overdue: 'Atrasada', cancelled: 'Cancelada' })[status] || status; }
function etiquetaTransaccion(status) { return ({ succeeded: 'Pago registrado', pending_confirmation: 'Esperando confirmación de BITA', failed: 'No se completó', rejected: 'Rechazado' })[status] || status; }
const checklistPreparacion = [
  ['documento', 'Verificar pasaporte o documento vigente'],
  ['requisitos', 'Revisar requisitos de ingreso y visado del destino'],
  ['seguro', 'Preparar seguro de viaje y asistencia'],
  ['comprobantes', 'Tener a mano las confirmaciones de transporte y alojamiento']
];
function leerChecklistPreparacion(reservaId) {
  try { return JSON.parse(localStorage.getItem(`bita-viaje-check-${reservaId}`) || '{}'); } catch { return {}; }
}
function renderizarPreparacionViaje(reserva) {
  if (reserva.estado !== 'paid') return '';
  const checklist = leerChecklistPreparacion(reserva.id);
  const rutas = reserva.items.map((item) => {
    const nombre = String(item.name || '');
    const lower = nombre.toLocaleLowerCase('es-AR');
    const destino = Object.keys(guiasDestinos).find((key) => lower.includes(key.toLocaleLowerCase('es-AR')) || lower.includes((datosDestinos[key]?.titulo || '').toLocaleLowerCase('es-AR')));
    const guia = destino ? guiasDestinos[destino] : null;
    return `<article class="ruta-viaje"><div class="ruta-viaje-cabecera"><span>RUTA DEL VIAJE</span><h4>${escaparHTML(nombre)}</h4></div>${guia ? `<p class="ruta-viaje-ciudades">${escaparHTML(guia.circuito)}</p><ol>${guia.destacados.map((etapa) => `<li>${escaparHTML(etapa)}</li>`).join('')}</ol><div class="incluye-viaje"><b>Servicios del programa</b><ul>${guia.incluye.map((servicio) => `<li>${escaparHTML(servicio)}</li>`).join('')}</ul></div>` : '<p class="ruta-viaje-ciudades">El itinerario detallado se incorporará a la documentación de tu viaje.</p>'}</article>`;
  }).join('');
  const list = checklistPreparacion.map(([key, label]) => `<label class="item-check-viaje"><input type="checkbox" data-preparacion="${key}" ${checklist[key] ? 'checked' : ''}><span>${label}</span></label>`).join('');
  const listos = checklistPreparacion.filter(([key]) => checklist[key]).length;
  return `<section class="preparacion-viaje" aria-labelledby="titulo-preparacion-${escaparHTML(reserva.id)}"><div class="preparacion-cabecera"><div><span class="preparacion-etiqueta">¡Tu viaje está listo!</span><h4 id="titulo-preparacion-${escaparHTML(reserva.id)}">Prepará tu viaje</h4><p>Revisá la ruta y marcá lo que ya tenés organizado.</p></div><button type="button" class="boton-comprobante" data-accion="imprimir-comprobante" data-reserva="${escaparHTML(reserva.id)}">Descargar comprobante</button></div><div class="preparacion-rutas">${rutas}</div><div class="checklist-viaje" data-checklist-reserva="${escaparHTML(reserva.id)}"><div class="checklist-viaje-titulo"><b>Documentación y preparativos</b><span class="progreso-checklist">${listos} de ${checklistPreparacion.length} listos</span></div>${list}</div></section>`;
}
function imprimirComprobanteReserva(reserva) {
  if (!reserva) return;
  const ventana = window.open('', '_blank');
  if (!ventana) return mostrarAviso('Permití las ventanas emergentes para imprimir el comprobante.');
  const fechaSalida = new Date(`${reserva.salida}T12:00:00`).toLocaleDateString('es-AR');
  const fechaEmision = new Date().toLocaleDateString('es-AR');
  const viajes = reserva.items.map((item) => `<li>${escaparHTML(item.name)}${item.quantity > 1 ? ` × ${item.quantity}` : ''}</li>`).join('');
  const pagos = reserva.transacciones.map((pago) => `<tr><td>${new Date(pago.created_at).toLocaleDateString('es-AR')}</td><td>${escaparHTML(pago.id)}</td><td>${formatearMinor(pago.amount_minor, pago.currency)}</td><td>${pago.status === 'succeeded' ? 'Acreditado' : escaparHTML(pago.status)}</td></tr>`).join('');
  ventana.document.write(`<!doctype html><html lang="es"><head><meta charset="utf-8"><meta name="viewport" content="width=device-width,initial-scale=1"><title>Comprobante ${escaparHTML(reserva.codigo)} · BITA</title><style>body{margin:0;padding:40px;background:#f7f5fb;color:#302342;font:15px Arial,sans-serif}.hoja{max-width:720px;margin:auto;padding:42px;border:1px solid #e8def2;border-radius:18px;background:white}.marca{color:#6035a5;font-size:24px;font-weight:900;letter-spacing:4px}.estado{display:inline-block;margin:26px 0 10px;padding:7px 12px;border-radius:999px;background:#e9f7ee;color:#267447;font-size:12px;font-weight:bold}h1{margin:0 0 8px;font-size:26px}.sub{color:#756987}.resumen{display:grid;grid-template-columns:1fr 1fr;gap:18px;margin:28px 0;padding:20px;border-radius:12px;background:#faf8fc}.resumen span{display:block;margin-bottom:5px;color:#7f718d;font-size:12px}.resumen strong{font-size:14px}h2{margin:28px 0 12px;font-size:17px}ul{padding-left:20px;line-height:1.8}table{width:100%;border-collapse:collapse;font-size:12px}th,td{padding:10px 8px;border-bottom:1px solid #eee8f3;text-align:left}th{color:#705c87}.total{margin-top:22px;padding-top:18px;border-top:1px solid #e8def2;text-align:right}.total span{display:block;color:#756987;font-size:12px}.total strong{color:#6035a5;font-size:24px}.pie{margin-top:30px;color:#81748e;font-size:11px;line-height:1.5}.acciones{display:flex;justify-content:center;margin-top:28px}.acciones button{padding:12px 20px;border:0;border-radius:9px;color:white;background:#6638b0;font-weight:bold;cursor:pointer}@media print{body{padding:0;background:white}.hoja{max-width:none;padding:20px;border:0;border-radius:0}.acciones{display:none}}</style></head><body><main class="hoja"><div class="marca">BITA</div><span class="estado">VIAJE PAGADO</span><h1>Comprobante de viaje</h1><p class="sub">Emitido el ${fechaEmision} · Código de reserva ${escaparHTML(reserva.codigo)}</p><div class="resumen"><div><span>Pasajero titular</span><strong>${escaparHTML(reserva.cliente?.nombre || estado.usuario?.nombre || 'Viajero BITA')}</strong></div><div><span>Fecha de salida</span><strong>${fechaSalida}</strong></div><div><span>Pasajeros</span><strong>${reserva.pasajeros}</strong></div><div><span>Estado</span><strong>Pago completo</strong></div></div><h2>Viajes incluidos</h2><ul>${viajes}</ul><h2>Pagos acreditados</h2><table><thead><tr><th>Fecha</th><th>Comprobante</th><th>Importe</th><th>Estado</th></tr></thead><tbody>${pagos || `<tr><td colspan="4">Pago completo · ${formatearMinor(reserva.pagadoMinor, reserva.moneda)}</td></tr>`}</tbody></table><div class="total"><span>Total pagado</span><strong>${formatearMinor(reserva.pagadoMinor || reserva.totalMinor, reserva.moneda)}</strong></div><p class="pie">Este comprobante resume el estado de pago de tu reserva. Conservá el código ${escaparHTML(reserva.codigo)} para consultas sobre el viaje.</p><div class="acciones"><button onclick="window.print()">Imprimir o guardar como PDF</button></div></main></body></html>`);
  ventana.document.close();
}
async function abrirSelectorPlan(reserva) {
  try {
    const datos = await api(`/api/reservations/${reserva.id}/plans`);
    const opciones = datos.plans.map((plan) => `<article class="opcion-plan-pago ${plan.available ? '' : 'deshabilitada'}"><div class="opcion-plan-top"><h3>${escaparHTML(plan.label)}</h3><strong>${formatearMinor(plan.totalMinor, datos.currency)}</strong></div>${plan.code === 'full' ? `<p>Un único pago hoy. No quedan pagos pendientes.</p>` : `<p>Hoy abonás <b>${formatearMinor(plan.depositMinor, datos.currency)}</b> de seña y el resto en ${plan.count - 1} pagos manuales.</p>`}<ul class="vista-previa-cronograma">${plan.preview.map((pago) => `<li><span>${pago.sequence === 1 && pago.kind === 'deposit' ? 'Hoy · seña' : pago.kind === 'full' ? 'Hoy · pago total' : `Pago ${pago.sequence} · ${new Date(`${pago.dueAt}T12:00:00`).toLocaleDateString('es-AR')}`}</span><strong>${formatearMinor(pago.amountMinor, datos.currency)}</strong></li>`).join('')}</ul>${plan.available ? `<button type="button" class="boton boton-modal" data-accion="elegir-plan" data-reserva="${reserva.id}" data-plan="${plan.code}">Elegir este plan</button>` : `<p class="plan-no-disponible">${escaparHTML(plan.message)}</p>`}</article>`).join('');
    $('#opciones-plan-pagos').innerHTML = `<p class="plan-total-reserva"><span>Total aprobado por BITA</span><strong>${formatearMinor(reserva.totalMinor, reserva.moneda)}</strong></p><div class="lista-opciones-plan">${opciones}</div><p class="nota-modo-manual">Vas a ver las fechas y los importes antes de confirmar. Cada vencimiento se paga manualmente desde Mi cuenta.</p>`;
    abrir('#modal-plan-pagos');
  } catch (error) { mostrarAviso(error.message); }
}
function abrirPagoCuota(reserva, cuota) {
  if (!reserva || !cuota || !['awaiting_deposit','payment_partial','overdue'].includes(reserva.estado)) return;
  reservaEnPago = { reserva, cuota };
  $('#texto-pago-simulacion').textContent = `${reserva.codigo} · ${etiquetaCuota(cuota.status)}. Vas a pagar únicamente esta cuota.`;
  const tipoCuota = cuota.kind === 'deposit' ? 'Seña' : cuota.kind === 'full' ? 'Pago total' : cuota.kind === 'balance' ? 'Saldo final' : 'Cuota';
  $('#resumen-pago-simulacion').innerHTML = `<p><span>Viaje</span><strong>${reserva.items.map((item) => escaparHTML(item.name)).join(' + ')}</strong></p><p><span>Concepto</span><strong>${tipoCuota} ${tipoCuota === 'Pago total' ? '' : `· ${cuota.sequence_no}`}</strong></p><p><span>Vencimiento</span><strong>${new Date(`${cuota.due_at}T12:00:00`).toLocaleDateString('es-AR')}</strong></p><p class="total-pago"><span>Importe de esta cuota</span><strong>${formatearMinor(cuota.amount_minor, reserva.moneda)}</strong></p><p class="aprobacion-pago"><span>Reserva aprobada por</span><strong>${escaparHTML(reserva.asesor || 'Equipo BITA')}</strong></p>`;
  $('#mensaje-pago').textContent = ''; $('#form-pago-tarjeta').reset(); $$('#form-pago-tarjeta input').forEach((input) => input.removeAttribute('aria-invalid')); $('#codigo-tarjeta').type = 'password'; $('#ver-codigo-tarjeta').textContent = 'Ver'; $('#ver-codigo-tarjeta').setAttribute('aria-pressed', 'false'); $('#ver-codigo-tarjeta').setAttribute('aria-label', 'Mostrar código de seguridad'); $('#boton-total-pago').textContent = formatearMinor(cuota.amount_minor, reserva.moneda); seleccionarMetodoPago('tarjeta'); actualizarVistaTarjeta(); abrir('#pago-simulacion');
}
function seleccionarMetodoPago(metodo) {
  if (!['tarjeta', 'transferencia', 'mercadopago'].includes(metodo)) return;
  metodoPagoActual = metodo;
  $$('[data-metodo-pago]').forEach((boton) => { const activo = boton.dataset.metodoPago === metodo; boton.classList.toggle('activo', activo); boton.setAttribute('aria-pressed', String(activo)); });
  $$('.metodo-pago-panel').forEach((panel) => { panel.hidden = panel.id !== `panel-metodo-${metodo}`; });
  $$('#panel-metodo-tarjeta input').forEach((input) => { input.disabled = metodo !== 'tarjeta'; input.required = metodo === 'tarjeta'; if (metodo !== 'tarjeta') { input.value = ''; input.removeAttribute('aria-invalid'); } });
  const tipo = reservaEnPago?.cuota?.kind;
  const nombreCuota = tipo === 'full' ? 'total' : tipo === 'deposit' ? 'seña' : 'cuota';
  const etiquetas = { tarjeta: `Pagar ${nombreCuota}`, transferencia: 'Solicitar datos de transferencia', mercadopago: 'Solicitar enlace de Mercado Pago' };
  $('#etiqueta-boton-pago').textContent = etiquetas[metodo];
  $('#mensaje-pago').textContent = '';
  actualizarVistaTarjeta();
}
$$('[data-metodo-pago]').forEach((boton) => boton.addEventListener('click', () => seleccionarMetodoPago(boton.dataset.metodoPago)));
function actualizarVistaTarjeta() {
  const titular = $('#titular-tarjeta').value.trim();
  $('#vista-titular-tarjeta').textContent = titular ? titular.toLocaleUpperCase('es-AR') : 'NOMBRE DEL TITULAR';
  $('#vista-numero-tarjeta').textContent = $('#numero-tarjeta').value || '•••• •••• •••• ••••';
  $('#vista-vencimiento-tarjeta').textContent = $('#vencimiento-tarjeta').value || 'MM/AA';
}
$('#titular-tarjeta').addEventListener('input', actualizarVistaTarjeta);
$('#numero-tarjeta').addEventListener('input', (evento) => { const input = evento.currentTarget; input.value = input.value.replace(/\D/g, '').slice(0, 19).replace(/(.{4})(?=\d)/g, '$1 ').trim(); actualizarVistaTarjeta(); });
$('#vencimiento-tarjeta').addEventListener('input', (evento) => { const input = evento.currentTarget; const digits = input.value.replace(/\D/g, '').slice(0, 4); input.value = digits.length > 2 ? `${digits.slice(0, 2)}/${digits.slice(2)}` : digits; actualizarVistaTarjeta(); });
$('#codigo-tarjeta').addEventListener('input', (evento) => { evento.currentTarget.value = evento.currentTarget.value.replace(/\D/g, '').slice(0, 4); });
$('#form-pago-tarjeta').addEventListener('input', (evento) => { if (evento.target.matches('input')) { evento.target.removeAttribute('aria-invalid'); if ($('#mensaje-pago').textContent) $('#mensaje-pago').textContent = ''; } });
$('#ver-codigo-tarjeta').addEventListener('click', (evento) => { const boton = evento.currentTarget; const input = $('#codigo-tarjeta'); const mostrar = input.type === 'password'; input.type = mostrar ? 'text' : 'password'; boton.textContent = mostrar ? 'Ocultar' : 'Ver'; boton.setAttribute('aria-label', mostrar ? 'Ocultar código de seguridad' : 'Mostrar código de seguridad'); boton.setAttribute('aria-pressed', String(mostrar)); });
$('#form-pago-tarjeta').addEventListener('submit', async (evento) => {
  evento.preventDefault(); const formulario = evento.currentTarget;
  if (!validarFormulario(formulario, '#mensaje-pago')) return;
  if (!reservaEnPago?.cuota?.id) return $('#mensaje-pago').textContent = 'No encontramos la cuota. Cerrá esta ventana y volvé a abrirla desde Mi cuenta.';
  const { reserva, cuota } = reservaEnPago; const storageKey = `bita-pay-key-${cuota.id}`;
  if (metodoPagoActual !== 'tarjeta') {
    const nombreMetodo = metodoPagoActual === 'transferencia' ? 'transferencia bancaria' : 'Mercado Pago';
    const ventanaWhatsApp = window.open('about:blank', '_blank');
    if (ventanaWhatsApp) ventanaWhatsApp.opener = null;
    let solicitud;
    try { solicitud = await api(`/api/schedule/${cuota.id}/request`, { method: 'POST', body: JSON.stringify({ method: metodoPagoActual }) }); }
    catch (error) { ventanaWhatsApp?.close(); $('#mensaje-pago').textContent = error.message; return; }
    const pedido = `Hola BITA, quiero pagar la reserva ${reserva.codigo} (${cuota.kind === 'deposit' ? 'seña' : cuota.kind === 'full' ? 'pago total' : `cuota ${cuota.sequence_no}`}) por ${formatearMinor(cuota.amount_minor, reserva.moneda)} mediante ${nombreMetodo}. ¿Me comparten los datos o el enlace de pago?`;
    const enlaceWhatsApp = `https://wa.me/541143217890?text=${encodeURIComponent(pedido)}`;
    if (ventanaWhatsApp) ventanaWhatsApp.location.href = enlaceWhatsApp;
    await actualizarReservasServidor();
    $('#mensaje-pago').innerHTML = `Solicitud registrada (${escaparHTML(solicitud.attemptId.slice(0, 8))}). La cuota sigue pendiente hasta que BITA confirme el pago. ${ventanaWhatsApp ? 'Se abrió WhatsApp para continuar.' : `<a href="${enlaceWhatsApp}" target="_blank" rel="noopener noreferrer">Abrir WhatsApp</a>`}`;
    return;
  }
  const idempotencyKey = sessionStorage.getItem(storageKey) || localId(); sessionStorage.setItem(storageKey, idempotencyKey);
  const boton = formulario.querySelector('[type="submit"]'); boton.disabled = true; boton.querySelector('span').textContent = 'Registrando…';
  try {
    const result = await api(`/api/schedule/${cuota.id}/pay`, { method: 'POST', body: JSON.stringify({ idempotencyKey }) });
    if (result.status !== 'succeeded') throw new Error('El pago todavía se está confirmando. Revisá el estado en Mis viajes antes de reintentar.');
    sessionStorage.removeItem(storageKey); await actualizarReservasServidor();
    formulario.reset(); cerrar('#pago-simulacion'); reservaEnPago = null;
    $('#icono-confirmacion').textContent = '✓'; $('#etiqueta-confirmacion').textContent = 'Comprobante'; $('#titulo-confirmacion').textContent = 'Pago registrado';
    $('#enviar-reserva-whatsapp').hidden = true;
    $('#texto-confirmacion').textContent = 'La cuota quedó registrada en tu cuenta.';
    $('#aviso-confirmacion').textContent = '';
    $('#resumen-confirmacion').innerHTML = `<p><span>Reserva</span><strong>${reserva.codigo}</strong></p><p><span>Cuota acreditada</span><strong>${formatearMinor(cuota.amount_minor, reserva.moneda)}</strong></p><p><span>Comprobante</span><strong>${escaparHTML(result.attemptId)}</strong></p><p><span>Estado del viaje</span><strong>${etiquetaEstadoReserva(result.reservation.estado)}</strong></p>`;
    abrir('#confirmacion');
  } catch (error) { $('#mensaje-pago').textContent = error.message; }
  finally { boton.disabled = false; boton.querySelector('span').textContent = $('#etiqueta-boton-pago').textContent || 'Pagar cuota'; }
});
$$('[data-accion="cerrar-simulacion-pago"]').forEach((boton) => boton.addEventListener('click', () => { $('#form-pago-tarjeta').reset(); $('#codigo-tarjeta').type = 'password'; $('#ver-codigo-tarjeta').textContent = 'Ver'; $('#ver-codigo-tarjeta').setAttribute('aria-pressed', 'false'); $('#mensaje-pago').textContent = ''; cerrar('#pago-simulacion'); reservaEnPago = null; }));
$$('[data-accion="cerrar-plan-pagos"]').forEach((boton) => boton.addEventListener('click', () => cerrar('#modal-plan-pagos')));
$('#opciones-plan-pagos').addEventListener('click', async (evento) => { const boton = evento.target.closest('[data-accion="elegir-plan"]'); if (!boton) return; boton.disabled = true; const original = boton.textContent; boton.textContent = 'Creando cronograma…'; try { await api(`/api/reservations/${boton.dataset.reserva}/plan`, { method: 'POST', body: JSON.stringify({ planCode: boton.dataset.plan, billingMode: 'manual' }) }); cerrar('#modal-plan-pagos'); await actualizarReservasServidor(); mostrarCuenta('reservas'); mostrarAviso('Cronograma creado. Ya podés pagar la primera cuota.'); } catch (error) { mostrarAviso(error.message); boton.disabled = false; boton.textContent = original; } });
function enviarConsultaChat(texto) { if (['staff', 'admin'].includes(estado.usuario?.rol)) return mostrarAviso('La cuenta asesora solo puede gestionar solicitudes desde el panel BITA.'); const consulta = texto.trim(); if (!consulta || chatRespondiendo) return; chatRespondiendo = true; const botonEnviar = $('#form-chat button[type="submit"]'); const botonReiniciar = $('[data-accion="reiniciar-chat"]'); botonEnviar.disabled = true; botonReiniciar.disabled = true; $('#mensaje-chat').disabled = true; agregarMensajeChat(consulta, true); $('#mensaje-chat').value = ''; const indicador = agregarMensajeChat('Estoy revisando opciones…', false, 'mensaje-escribiendo'); window.setTimeout(() => { indicador.remove(); mostrarRespuestaChat(responderChat(consulta)); chatRespondiendo = false; botonEnviar.disabled = false; botonReiniciar.disabled = false; $('#mensaje-chat').disabled = false; $('#mensaje-chat').focus(); }, 380); }
$('.chat-boton').addEventListener('click', () => { abrir('#chat'); $('.chat-boton').setAttribute('aria-expanded', 'true'); $('#mensaje-chat').focus(); });
$('[data-accion="cerrar-chat"]').addEventListener('click', () => { cerrar('#chat'); $('.chat-boton').setAttribute('aria-expanded', 'false'); });
$('#form-chat').addEventListener('submit', (e) => { e.preventDefault(); enviarConsultaChat($('#mensaje-chat').value); });
$$('[data-chat]').forEach((boton) => boton.addEventListener('click', () => enviarConsultaChat(boton.dataset.chat)));
$('#chat-mensajes').addEventListener('click', (evento) => {
  const boton = evento.target.closest('[data-chat-accion]'); if (!boton) return;
  const accion = boton.dataset.chatAccion; const destino = boton.dataset.destinoChat;
  if (accion === 'ver' && destino && datosDestinos[destino]) { cerrar('#chat'); abrirDetalle(destino, datosDestinos[destino].precio); }
  if (accion === 'agregar' && destino && datosDestinos[destino]) { agregarCarrito({ nombre: datosDestinos[destino].titulo, precio: datosDestinos[destino].precio, noches: datosDestinos[destino].duracion }); cerrar('#chat'); abrir('#carrito'); }
  if (accion === 'buscar') { cerrar('#chat'); abrir('#buscador'); $('#destino').focus(); renderizarResultadosBusqueda(destinosFiltrados()); }
  if (accion === 'cuenta') { cerrar('#chat'); if (estado.usuario && !['staff', 'admin'].includes(estado.usuario.rol)) mostrarCuenta('reservas'); else abrirAuth('login'); }
  if (accion === 'contacto') { cerrar('#chat'); $('#contacto').scrollIntoView({ behavior: 'smooth' }); $('#contacto-nombre').focus({ preventScroll: true }); }
  if (accion === 'reserva') enviarConsultaChat('¿Cómo hago una reserva?');
  if (accion === 'reiniciar') $('[data-accion="reiniciar-chat"]').click();
});
$$('[data-accion="reiniciar-chat"]').forEach((boton) => boton.addEventListener('click', () => { contextoChat.presupuesto = null; contextoChat.tipo = ''; contextoChat.duracion = null; contextoChat.ultimaRecomendacion = []; $('#chat-mensajes').innerHTML = ''; agregarMensajeChat('¡Hola! Te ayudo a elegir un viaje y a entender cómo reservar.'); agregarMensajeChat('Contame destino, presupuesto, duración o con quién viajás. Por ejemplo: “playa hasta USD 1.200” o “quiero conocer Japón”.'); $('#mensaje-chat').focus(); }));
function mostrarCuenta(tab = 'reservas') {
  if (!estado.usuario) { abrirAuth('login'); return; }
  if (['staff', 'admin'].includes(estado.usuario.rol)) { abrirPanelAgente(); return; }
  const reservasUsuario = estado.reservas;
  const favoritos = estado.favoritos.map((destino) => [destino, datosDestinos[destino]]).filter(([, datos]) => datos);
  $('#nombre-cuenta').textContent = estado.usuario.nombre;
  if (tab === 'reservas') $('#contenido-cuenta').innerHTML = reservasUsuario.length ? `<div class="lista-reservas">${reservasUsuario.map((reserva) => {
    const siguiente = reserva.cronograma.find((cuota) => !['paid','cancelled'].includes(cuota.status));
    const items = reserva.items.map((item) => escaparHTML(item.name)).join(' + ');
    const solicitudPagoPendiente = reserva.transacciones.find((pago) => pago.status === 'pending_confirmation');
    const solicitudPagoRechazada = reserva.transacciones.find((pago) => pago.status === 'rejected');
    const siguienteFecha = siguiente ? new Date(`${siguiente.due_at}T12:00:00`).toLocaleDateString('es-AR') : '';
    const etiquetaTotalReserva = reserva.estado === 'pending_review' ? 'Total estimado' : 'Total aprobado';
    const cuotas = reserva.cronograma.length ? `<div class="cronograma-reserva"><h4>Cronograma de pagos</h4>${reserva.cronograma.map((cuota) => `<div class="fila-cuota"><span><b>${cuota.sequence_no}. ${cuota.kind === 'deposit' ? 'Seña' : cuota.kind === 'full' ? 'Pago total' : cuota.kind === 'balance' ? 'Saldo final' : 'Cuota'}</b><small>Vence ${new Date(`${cuota.due_at}T12:00:00`).toLocaleDateString('es-AR')} · ${etiquetaCuota(cuota.status)}</small></span><strong>${formatearMinor(cuota.amount_minor, reserva.moneda)}</strong>${siguiente?.id === cuota.id && ['awaiting_deposit','payment_partial','overdue'].includes(reserva.estado) ? `<button type="button" class="boton-pagar-cuota" data-accion="pagar-cuota" data-reserva="${reserva.id}" data-cuota="${cuota.id}"><span class="texto-accion-pago">${cuota.kind === 'deposit' ? 'Pagar seña' : cuota.kind === 'full' ? 'Pagar total' : 'Pagar siguiente cuota'}</span><span class="importe-accion-pago">${formatearMinor(cuota.amount_minor, reserva.moneda)}</span></button>` : ''}</div>`).join('')}<p class="progreso-pagos">Pagado ${formatearMinor(reserva.pagadoMinor, reserva.moneda)} · resta ${formatearMinor(reserva.saldoMinor, reserva.moneda)}</p></div>` : '';
    const botonPlan = reserva.estado === 'approved_waiting_plan' ? `<button type="button" class="accion-reserva-demo" data-accion="abrir-planes" data-reserva="${reserva.id}">Elegir cómo pagar</button>` : '';
    const preparacion = renderizarPreparacionViaje(reserva);
    return `<article class="reserva-cuenta"><span class="estado-reserva">${etiquetaEstadoReserva(reserva.estado)}</span><h3>${items}</h3><p>Código ${escaparHTML(reserva.codigo)} · Salida: ${new Date(`${reserva.salida}T12:00:00`).toLocaleDateString('es-AR')} · ${reserva.pasajeros} ${reserva.pasajeros === 1 ? 'pasajero' : 'pasajeros'}</p>${reserva.asesor ? `<p>Revisó ${escaparHTML(reserva.asesor)} · ${new Date(reserva.aprobadaEl).toLocaleString('es-AR')}</p>` : ''}${reserva.notaBITA ? `<p>Nota de BITA: ${escaparHTML(reserva.notaBITA)}</p>` : ''}<div class="totales-viaje"><span>${etiquetaTotalReserva}</span><strong>${formatearMinor(reserva.totalMinor, reserva.moneda)}</strong></div>${reserva.estado === 'pending_review' ? '<p>El equipo BITA revisa disponibilidad y precio. Todavía no tenés que pagar.</p>' : ''}${reserva.estado === 'rejected' ? '<p>BITA no pudo aprobar esta solicitud. Contactanos si querés revisar otra fecha.</p>' : ''}${siguiente && reserva.saldoMinor > 0 ? `<p class="resumen-proximo-pago"><b>Próximo vencimiento:</b> ${siguienteFecha} · ${formatearMinor(siguiente.amount_minor, reserva.moneda)}. <b>Saldo pendiente:</b> ${formatearMinor(reserva.saldoMinor, reserva.moneda)}.</p>` : ''}${solicitudPagoPendiente ? `<p class="pago-pendiente-confirmacion">${escaparHTML(solicitudPagoPendiente.method)} · solicitud enviada el ${new Date(solicitudPagoPendiente.created_at).toLocaleString('es-AR')}. El pago se acreditará cuando BITA lo confirme.</p>` : ''}${solicitudPagoRechazada && !solicitudPagoPendiente ? '<p class="pago-rechazado">No pudimos acreditar tu último pago. Revisá con BITA y volvé a intentar cuando tengas los datos correctos.</p>' : ''}${botonPlan}${cuotas}${preparacion}${reserva.transacciones.length ? `<details class="historial-pagos"><summary>Historial de pagos (${reserva.transacciones.length})</summary>${reserva.transacciones.map((pago) => `<p>${new Date(pago.created_at).toLocaleString('es-AR')} · ${formatearMinor(pago.amount_minor, pago.currency)} · ${etiquetaTransaccion(pago.status)}${pago.method ? ` · ${escaparHTML(pago.method)}` : ''} · Ref. ${escaparHTML(pago.id)}</p>`).join('')}</details>` : ''}</article>`;
  }).join('')}</div>` : '<p>No tenés solicitudes todavía.</p><p>Cuando BITA apruebe un viaje, vas a poder elegir la seña y el cronograma desde acá.</p>';
  if (tab === 'guardados') $('#contenido-cuenta').innerHTML = favoritos.length ? `<div class="guardados-cuenta">${favoritos.map(([destino, datos]) => `<article><div><h3>${datos.titulo}</h3><p>${datos.duracion} · ${datos.tipo}</p><strong>Desde ${dinero(datos.precio)}</strong></div><div><button type="button" data-accion="ver-guardado" data-destino="${destino}">Ver viaje</button><button type="button" data-accion="quitar-guardado" data-destino="${destino}">Quitar</button></div></article>`).join('')}</div>` : '<p>No guardaste destinos todavía.</p><p>Usá el corazón en cualquier viaje para verlo rápidamente desde acá.</p>';
  if (tab === 'perfil') $('#contenido-cuenta').innerHTML = `<form id="form-perfil" class="form-perfil"><label for="perfil-nombre">Nombre y apellido<input id="perfil-nombre" required minlength="3" value="${escaparHTML(estado.usuario.nombre)}"></label><label for="perfil-telefono">WhatsApp<input id="perfil-telefono" type="tel" value="${escaparHTML(estado.usuario.telefono || '')}" placeholder="+54 9 11 1234 5678"></label><p><b>Correo:</b> ${escaparHTML(estado.usuario.correo)}</p><button class="boton boton-modal" type="submit">Guardar cambios</button><button class="link-form" type="button" data-accion="cerrar-sesion">Cerrar sesión</button></form>`;
  abrir('#panel-cuenta');
}
$('#contenido-cuenta').addEventListener('click', async (evento) => {
  const boton = evento.target.closest('button[data-accion]'); if (!boton) return; const destino = boton.dataset.destino;
  if (boton.dataset.accion === 'ver-guardado') { cerrar('#panel-cuenta'); abrirDetalle(destino, datosDestinos[destino].precio); }
  if (boton.dataset.accion === 'quitar-guardado') { estado.favoritos = estado.favoritos.filter((item) => item !== destino); guardarEstado(); actualizarFavoritos(); mostrarCuenta('guardados'); mostrarAviso(`${destino} se quitó de tus guardados.`); }
  if (boton.dataset.accion === 'abrir-planes') { const reserva = estado.reservas.find((item) => item.id === boton.dataset.reserva); if (reserva) abrirSelectorPlan(reserva); }
  if (boton.dataset.accion === 'pagar-cuota') { const reserva = estado.reservas.find((item) => item.id === boton.dataset.reserva); const cuota = reserva?.cronograma.find((item) => item.id === boton.dataset.cuota); abrirPagoCuota(reserva, cuota); }
  if (boton.dataset.accion === 'imprimir-comprobante') { const reserva = estado.reservas.find((item) => item.id === boton.dataset.reserva); imprimirComprobanteReserva(reserva); }
});
$('#contenido-cuenta').addEventListener('change', (evento) => {
  const control = evento.target.closest('input[data-preparacion]'); if (!control) return;
  const checklist = leerChecklistPreparacion(control.closest('[data-checklist-reserva]').dataset.checklistReserva);
  checklist[control.dataset.preparacion] = control.checked;
  localStorage.setItem(`bita-viaje-check-${control.closest('[data-checklist-reserva]').dataset.checklistReserva}`, JSON.stringify(checklist));
  const panel = control.closest('[data-checklist-reserva]'); const marcados = panel.querySelectorAll('input[data-preparacion]:checked').length;
  panel.querySelector('.progreso-checklist').textContent = `${marcados} de ${checklistPreparacion.length} listos`;
});
$('#contenido-cuenta').addEventListener('submit', async (evento) => {
  if (evento.target.id !== 'form-perfil') return; evento.preventDefault(); const formulario = evento.target; if (!validarFormulario(formulario)) return;
  try { const datos = await api('/api/account', { method: 'PATCH', body: JSON.stringify({ name: $('#perfil-nombre').value.trim(), phone: $('#perfil-telefono').value.trim() }) }); estado.usuario = datos.user; guardarSesion(); mostrarCuenta('perfil'); mostrarAviso('Tu perfil se actualizó correctamente.'); }
  catch (error) { mostrarAviso(error.message); }
});
document.addEventListener('click', (e) => { const b = e.target.closest('[data-accion="cerrar-sesion"]'); if (b && b.closest('#panel-cuenta')) { cerrarSesion(); cerrar('#panel-cuenta'); mostrarAviso('Sesión cerrada.'); } });
$$('.tabs-cuenta button').forEach((b) => b.addEventListener('click', () => mostrarCuenta(b.dataset.tab)));
$('[data-accion="cerrar-cuenta"]').addEventListener('click', () => cerrar('#panel-cuenta'));
function escaparHTML(valor) { return String(valor ?? '').replace(/[&<>"']/g, (caracter) => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' })[caracter]); }
async function renderizarColaAgente() {
  const { reservations, user } = await api('/api/staff/reservations');
  $('#identidad-agente').textContent = `Sesión activa: ${user?.nombre || estado.usuario?.nombre || 'Personal BITA'}`;
  const solicitudes = reservations.filter((reserva) => reserva.estado === 'pending_review'); const historial = reservations.filter((reserva) => reserva.estado !== 'pending_review');
  const pagosPendientes = reservations.flatMap((reserva) => reserva.transacciones.filter((pago) => pago.status === 'pending_confirmation').map((pago) => ({ ...pago, reserva, cuota: reserva.cronograma.find((item) => item.id === pago.schedule_id) })));
  $('#cola-solicitudes').innerHTML = `${solicitudes.length ? `<h3 class="titulo-cola">Pendientes de revisión <span>${solicitudes.length}</span></h3>${solicitudes.map((reserva) => `<article class="solicitud-agente" data-reserva="${reserva.id}"><div class="solicitud-agente-top"><span>${escaparHTML(reserva.codigo)}</span><small>Recibida ${new Date(reserva.creadoEl).toLocaleString('es-AR')}</small></div><h3>${reserva.items.map((item) => escaparHTML(item.name)).join(' + ')}</h3><p><b>Cliente:</b> ${escaparHTML(reserva.cliente?.nombre)} · ${escaparHTML(reserva.cliente?.correo)} · ${escaparHTML(reserva.cliente?.telefono)}</p><p><b>Salida:</b> ${new Date(`${reserva.salida}T12:00:00`).toLocaleDateString('es-AR')} · ${reserva.pasajeros} pasajeros · ${escaparHTML(reserva.habitacion)}</p><p><b>Pedido:</b> ${escaparHTML(reserva.comentarios || 'Sin comentarios')}</p><p class="estimacion-agente"><b>Estimación:</b> subtotal ${formatearMinor(reserva.subtotalMinor, reserva.moneda)} + gestión ${formatearMinor(reserva.impuestosMinor, reserva.moneda)} = ${formatearMinor(reserva.totalMinor, reserva.moneda)}.</p><label>Total final aprobado (USD)<input class="total-final-agente" type="number" min="${Math.ceil(reserva.subtotalMinor / 100)}" step="1" value="${Math.ceil(reserva.totalMinor / 100)}" required></label><label>Nota para el cliente <span>(opcional al aprobar; obligatoria al rechazar)</span><textarea class="nota-agente" rows="2" maxlength="500" placeholder="Cupos confirmados, detalle del precio o motivo del rechazo"></textarea></label><div class="acciones-agente"><button type="button" data-decision="approve">Aprobar</button><button type="button" data-decision="reject">Rechazar</button></div></article>`).join('')}` : '<div class="cola-vacia"><strong>¡Todo al día!</strong><p>No hay solicitudes pendientes de revisión.</p></div>'}${historial.length ? `<details class="historial-agente"><summary>Actividad anterior (${historial.length})</summary>${historial.map((reserva) => `<article class="registro-historial-agente"><p><b>${escaparHTML(reserva.codigo)}</b> · ${etiquetaEstadoReserva(reserva.estado)}${reserva.asesor ? ` · ${escaparHTML(reserva.asesor)}` : ''}</p>${reserva.estado !== 'rejected' ? `<p>Total aprobado: ${formatearMinor(reserva.totalMinor, reserva.moneda)}</p>` : ''}${reserva.notaBITA ? `<p>Nota registrada: ${escaparHTML(reserva.notaBITA)}</p>` : ''}<small>${reserva.aprobadaEl ? new Date(reserva.aprobadaEl).toLocaleString('es-AR') : ''}</small></article>`).join('')}</details>` : ''}`;
  if (pagosPendientes.length) $('#cola-solicitudes').insertAdjacentHTML('afterbegin', `<section class="pagos-por-confirmar"><h3>Pagos para revisar <span>${pagosPendientes.length}</span></h3>${pagosPendientes.map(({ reserva, cuota, ...pago }) => `<article class="pago-agente-pendiente"><div><b>${escaparHTML(reserva.codigo)} · ${escaparHTML(reserva.cliente?.nombre)}</b><p>${escaparHTML(pago.method)} · ${cuota?.kind === 'deposit' ? 'Seña' : cuota?.kind === 'full' ? 'Pago total' : `Cuota ${cuota?.sequence_no}`} · ${formatearMinor(pago.amount_minor, pago.currency)}</p><small>Solicitado ${new Date(pago.created_at).toLocaleString('es-AR')}</small></div><div class="acciones-revision-pago"><button type="button" data-confirmar-pago="${escaparHTML(pago.id)}">Acreditar pago</button><button type="button" class="rechazar-pago" data-rechazar-pago="${escaparHTML(pago.id)}">Rechazar</button></div></article>`).join('')}</section>`);
  $('#cola-solicitudes').insertAdjacentHTML('afterbegin', '<label class="busqueda-asesor">Buscar solicitud o pago<input type="search" data-buscar-solicitud placeholder="Código, cliente o correo" autocomplete="off"></label>');
  $('#cola-solicitudes [data-buscar-solicitud]').addEventListener('input', (evento) => { const termino = normalizar(evento.currentTarget.value); $('#cola-solicitudes').querySelectorAll('.solicitud-agente,.pago-agente-pendiente,.historial-agente p').forEach((fila) => { fila.hidden = !normalizar(fila.textContent).includes(termino); }); });
}
async function abrirPanelAgente() { try { await renderizarColaAgente(); abrir('#panel-agente'); } catch (error) { mostrarAviso(error.status === 403 ? 'Ingresá con la cuenta de asesor BITA para revisar solicitudes.' : error.message); if (error.status === 401) abrirAuth('login'); } }
document.addEventListener('click', (evento) => { if (evento.target.closest('[data-accion="abrir-panel-agente"]')) abrirPanelAgente(); if (evento.target.closest('[data-accion="cerrar-panel-agente"]')) cerrar('#panel-agente'); });
document.addEventListener('click', async (evento) => { if (!evento.target.closest('[data-accion="cerrar-sesion-agente"]')) return; await cerrarSesion(); cerrar('#panel-agente'); mostrarAviso('Sesión cerrada.'); });
$('#cola-solicitudes').addEventListener('click', async (evento) => {
  const accionPago = evento.target.closest('[data-confirmar-pago],[data-rechazar-pago]');
  if (accionPago) {
    const rechazar = accionPago.hasAttribute('data-rechazar-pago'); const pagoId = rechazar ? accionPago.dataset.rechazarPago : accionPago.dataset.confirmarPago;
    accionPago.disabled = true; accionPago.textContent = rechazar ? 'Rechazando…' : 'Acreditando…';
    try { await api(`/api/staff/payments/${pagoId}/${rechazar ? 'reject' : 'confirm'}`, { method: 'POST', body: '{}' }); await renderizarColaAgente(); mostrarAviso(rechazar ? 'Solicitud de pago rechazada; el cliente puede elegir otro método.' : 'Pago acreditado y cronograma actualizado.'); }
    catch (error) { mostrarAviso(error.message); accionPago.disabled = false; accionPago.textContent = rechazar ? 'Rechazar' : 'Acreditar pago'; }
    return;
  }
  const boton = evento.target.closest('[data-decision]'); if (!boton) return; const fila = boton.closest('.solicitud-agente'); const note = fila.querySelector('.nota-agente').value.trim();
  const finalAmount = Number(fila.querySelector('.total-final-agente').value);
  if (boton.dataset.decision === 'reject' && note.length < 5) return mostrarAviso('Escribí el motivo para informar al cliente.');
  if (boton.dataset.decision === 'approve' && (!Number.isSafeInteger(finalAmount) || finalAmount < Number(fila.querySelector('.total-final-agente').min))) return mostrarAviso('Ingresá un total final válido, igual o mayor al subtotal.');
  boton.disabled = true;
  try { await api(`/api/staff/reservations/${fila.dataset.reserva}/decision`, { method: 'POST', body: JSON.stringify({ decision: boton.dataset.decision, finalAmount, note }) }); await renderizarColaAgente(); if (estado.usuario) await actualizarReservasServidor(); mostrarCuenta('reservas'); mostrarAviso(boton.dataset.decision === 'approve' ? 'Solicitud aprobada. El cliente ya puede elegir su plan de pago.' : 'Solicitud rechazada; BITA guardó el motivo.'); }
  catch (error) { mostrarAviso(error.message); boton.disabled = false; }
});
