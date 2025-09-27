export const formatearRut = (valor: string): string => {
  let clean = valor.replace(/\./g, "").replace(/-/g, "").toUpperCase();

  if (clean.length === 0) return "";

  // Separar solo los números del cuerpo y el último carácter como DV
  const cuerpoNumeros = clean.slice(0, -1).replace(/[^0-9]/g, "");
  const dv = clean.slice(-1).replace(/[^0-9K]/, ""); // DV solo número o K

  let cuerpoFormateado = "";
  let contador = 0;

  for (let i = cuerpoNumeros.length - 1; i >= 0; i--) {
    cuerpoFormateado = cuerpoNumeros[i] + cuerpoFormateado;
    contador++;
    if (contador === 3 && i !== 0) {
      contador = 0;
    }
  }

  return dv ? `${cuerpoFormateado}-${dv}` : cuerpoFormateado;
};


export const validarRut = (rut: string): boolean => {
  const clean = rut.replace(/\./g, "").replace(/-/g, "").toUpperCase();
  if (!/^[0-9]+[0-9K]$/.test(clean)) return false;

  const cuerpo = clean.slice(0, -1);
  const dv = clean.slice(-1);

  let suma = 0;
  let multiplo = 2;

  for (let i = cuerpo.length - 1; i >= 0; i--) {
    suma += parseInt(cuerpo[i], 10) * multiplo;
    multiplo = multiplo === 7 ? 2 : multiplo + 1;
  }

  const dvEsperado = 11 - (suma % 11);
  let dvFinal = dvEsperado === 11 ? "0" : dvEsperado === 10 ? "K" : dvEsperado.toString();

  return dv === dvFinal;
};
