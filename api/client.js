import finalHandler from './final.js';

export default async function handler(req, res) {
  let statusCode = 200;
  const headers = {};
  let body = '';

  const proxy = {
    setHeader(name, value) { headers[name] = value; },
    status(code) { statusCode = code; return proxy; },
    send(value) { body = String(value ?? ''); return proxy; }
  };

  await finalHandler(req, proxy);

  const replacements = [
    ['первый городское сообщество', 'первое городское сообщество'],
    ['первый местное сообщество', 'первое местное сообщество'],
    ['первый городское', 'первое городское'],
    ['первый местное', 'первое местное'],
    ['<b>1 тест</b>', '<b>1 размещение</b>'],
    ['Пробный музыкальный вечер: ориентир 3–10 тыс. ₽.', 'Пробный музыкальный вечер: примерные расходы 3–10 тыс. ₽.'],
    ['Instagram Reels и VK Клипы', 'короткое видео в Instagram и VK Клипы'],
    ['Первая база уже собрана', 'Первый список уже собран']
  ];

  for (const [from, to] of replacements) {
    body = body.split(from).join(to);
  }

  Object.entries(headers).forEach(([name, value]) => res.setHeader(name, value));
  res.setHeader('Cache-Control', 'public, s-maxage=30, stale-while-revalidate=300');
  res.status(statusCode).send(body);
}
