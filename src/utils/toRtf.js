export const toRtf = (date) => {
  if (!date) return date;
  let time = Number.parseInt((new Date(date) - new Date()) / 1000 / 60 / 60 / 24);

  let multipliers = [
    { name: 'day', value: -1 },
    { name: 'week', value: -168 },
    { name: 'month', value: -720 },
    { name: 'year', value: -8760 },
  ];

  let multiplier = multipliers.find((m, i) =>
    time < m.value && time > multipliers[i + 1]?.value
  );

  if (!multiplier) multiplier = multipliers[multipliers.length - 1];
  if (time > multipliers[0].value) return 'Hace un momento';

  time = Math.round(time / multiplier.value);

  return new Intl.RelativeTimeFormat('es-ES', { numeric: 'auto' }).format(time * -1, multiplier.name);
};