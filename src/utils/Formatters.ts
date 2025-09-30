export const formatFecha = (fechaStr: string) => {
  const fecha = new Date(fechaStr);
  const hoy = new Date();

  if (
    fecha.getDate() === hoy.getDate() &&
    fecha.getMonth() === hoy.getMonth() &&
    fecha.getFullYear() === hoy.getFullYear()
  ) {
    return "Hoy";
  }

  const ayer = new Date();
  ayer.setDate(hoy.getDate() - 1);
  if (
    fecha.getDate() === ayer.getDate() &&
    fecha.getMonth() === ayer.getMonth() &&
    fecha.getFullYear() === ayer.getFullYear()
  ) {
    return "Ayer";
  }

  return fecha.toLocaleDateString("es-ES", {
    day: "2-digit",
    month: "short",
    year: "numeric",
  });
};

export const formatHora = (fechaStr: string) => {
  const fecha = new Date(fechaStr);
  return fecha.toLocaleTimeString("es-ES", {
    hour: "2-digit",
    minute: "2-digit",
  });
};
