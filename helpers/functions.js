
const esFechaValida = (fechaStr) =>{
  // Validar formato exacto YYYY-MM-DD
  const regex = /^\d{4}-\d{2}-\d{2}$/;
  if (!regex.test(fechaStr)) return false;
  

  // Validar que sea una fecha real
  const fecha = new Date(fechaStr);
  const [anio, mes, dia] = fechaStr.split('-').map(Number);
  
  return (
    fecha.getUTCFullYear() === anio &&
    fecha.getUTCMonth() + 1 === mes &&
    fecha.getUTCDate() === dia
  );
}

module.exports =  {esFechaValida}