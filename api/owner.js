export default async function handler(req, res) {
  const sourceUrl = 'https://raw.githubusercontent.com/kava-studia/waffles-audit/main/index.html';
  const upstream = await fetch(sourceUrl, { headers: { 'User-Agent': 'waffles-audit-owner-layer' } });

  if (!upstream.ok) {
    res.status(502).send('Страница временно недоступна');
    return;
  }

  let html = await upstream.text();

  const replace = (from, to) => { html = html.split(from).join(to); };

  // --- Главная: никакого профессионального словаря ---
  replace('КОФЕ ВАФЛИ — конкретный growth audit: цифры, каналы, первые тесты, бюджет, KPI и решение собственника.',
          'КОФЕ ВАФЛИ — понятный план продвижения на 30 дней: что делаем, где продвигаемся, сколько это стоит и как измеряем результат.');
  replace('<title>КОФЕ ВАФЛИ — Growth Audit 2026</title>', '<title>КОФЕ ВАФЛИ — План продвижения на 30 дней</title>');
  replace('КОФЕ ВАФЛИ · AUDIT 2026', 'КОФЕ ВАФЛИ · ПЛАН ПРОДВИЖЕНИЯ');
  replace('Growth audit · версия к утверждению собственником', 'План продвижения · версия для согласования');
  replace('Сергиев Посад · 14 августа 2026', 'Сергиев Посад · 17 августа 2026');
  replace('Рабочий аудит KAVA SMM OS', 'План на первые 30 дней');
  replace('Посмотреть первый трафик', 'Кого будем привлекать');
  replace('>Трафик<', '>Реклама и блогеры<');

  // --- Верхние цифры: Telegram больше не выставляем как приоритет роста ---
  replace('<div class="metric"><b>245</b><span>Telegram · подписчики</span></div>',
          '<div class="metric"><b>55</b><span>MAX · подписчики</span></div>');

  // --- Главный вывод ---
  replace('нет единого контент-банка, измеримых внешних тестов и системы возврата.',
          'нет единого запаса фото и видео, понятных рекламных тестов и системы возврата гостей.');
  replace('<article class="card"><small>Проблема</small><h3>Telegram проседает</h3><p>245 подписчиков, около 40 просмотров и 5 реакций на пост. За месяц база снизилась примерно с 250 до 245 — канал нужно не бросать, а вернуть в общий контур.</p></article>',
          '<article class="card"><small>Решение собственника</small><h3>Основной канал сообщений — MAX</h3><p>Учредитель подтвердил: Telegram целенаправленно не продвигаем из-за неудобства для аудитории. Большинство постоянных читателей постепенно переходят в MAX. Сейчас в официальном MAX-канале 55 подписчиков.</p></article>');
  replace('<article class="card"><small>Проблема P0</small><h3>Расходятся телефоны</h3>',
          '<article class="card"><small>Важно проверить</small><h3>Расходятся телефоны</h3>');
  replace('Съёмка → упаковка → органика → паблик №1 → creators → повторный визит → второй тест → отчёт «было → стало».',
          'Съёмка → оформление площадок → свои соцсети → первый городской паблик → блогеры → повторный визит → второй тест → отчёт «было → стало».');

  // --- Площадки: переписываем Telegram и MAX целиком ---
  html = html.replace(
    /<article class="channel">\s*<div class="channel-top"><h3>Telegram<\/h3>[\s\S]*?<\/article>/,
    `<article class="channel">
        <div class="channel-top"><h3>Telegram</h3><div class="current"><b>245</b><span>подписчиков</span></div></div>
        <div class="channel-body">
          <div class="channel-line"><b>Роль</b><span>Дополнительный канал для тех, кому Telegram по-прежнему удобен.</span></div>
          <div class="channel-line"><b>Что делаем</b><span>Не тратим бюджет на рост Telegram и не заставляем аудиторию пользоваться VPN. Дублируем только важные новости, акции и события.</span></div>
          <div class="channel-line"><b>Цель</b><span>Сохранить связь с существующими подписчиками. Отдельную цель по росту не ставим.</span></div>
        </div>
      </article>`
  );

  html = html.replace(
    /<article class="channel">\s*<div class="channel-top"><h3>MAX<\/h3>[\s\S]*?<\/article>/,
    `<article class="channel">
        <div class="channel-top"><h3>MAX</h3><div class="current"><b>55</b><span>подписчиков сейчас</span></div></div>
        <div class="channel-body">
          <div class="channel-line"><b>Статус</b><span>Официальный канал подтверждён учредителем: max.ru/channel_coffee_waffles.</span></div>
          <div class="channel-line"><b>Роль</b><span>Основной канал быстрых сообщений для постоянной аудитории: новости, акции, события и поводы вернуться.</span></div>
          <div class="channel-line"><b>Что делаем</b><span>Приводим оформление в порядок, публикуем полезные короткие сообщения, переводим туда постоянных гостей естественно — без навязчивого «подпишитесь везде».</span></div>
          <div class="channel-line"><b>Что считаем</b><span>Рост подписчиков, просмотры сообщений, реакции и реальные визиты после акций.</span></div>
          <div class="target"><i>Первый месяц</i> фиксируем реальную активность и после этого ставим точную цель роста</div>
        </div>
      </article>`
  );

  // --- Внутренняя кухня публикаций не показывается собственнику ---
  replace('<div class="fact"><b>VK</b><span>подключён к Postmypost</span></div>',
          '<div class="fact"><b>Контент</b><span>ведём по единому плану</span></div>');
  html = html.replace(
    /<article class="channel">\s*<div class="channel-top"><h3>Postmypost<\/h3>[\s\S]*?<\/article>/,
    `<article class="channel">
        <div class="channel-top"><h3>Все площадки — по одному плану</h3><div class="current"><b>4</b><span>социальные площадки</span></div></div>
        <div class="channel-body">
          <div class="channel-line"><b>Где работаем</b><span>VK + Instagram + MAX + Telegram. Яндекс ведём отдельно как карточку, где человек уже ищет место.</span></div>
          <div class="channel-line"><b>Как работаем</b><span>Одна съёмка даёт материалы сразу для всех площадок. Не снимаем четыре раза одно и то же.</span></div>
          <div class="channel-line"><b>Результат</b><span>Единый календарь публикаций, понятные темы и одна общая картина по результатам месяца.</span></div>
        </div>
      </article>`
  );

  // --- Переводим маркетинговый язык на человеческий ---
  const plainLanguage = [
    ['Ориентир «Усиление»', 'Цель на 30 дней'],
    ['средний feed-охват', 'средний охват публикации'],
    ['среднего feed-охвата', 'среднего охвата публикации'],
    ['feed-публикаций', 'публикаций'],
    ['охват feed', 'охват публикаций'],
    ['Highlights', 'актуальные сторис'],
    ['Creators / блогеры', 'Блогеры'],
    ['Creators', 'Блогеры'],
    ['creators', 'блогеры'],
    ['creator', 'блогер'],
    ['UGC-отметки гостей', 'Отметки и публикации гостей'],
    ['UGC', 'отметки гостей'],
    ['контент-банк', 'запас фото и видео'],
    ['контент-пак', 'набор материалов'],
    ['контент-контур', 'единый план публикаций'],
    ['издательский контур', 'система публикаций'],
    ['P1', 'нужно обновить'],
    ['ER 4,16%', 'вовлечённость 4,16%'],
    ['ER 2,79%', 'вовлечённость 2,79%'],
    ['ER 2,72%', 'вовлечённость 2,72%'],
    ['редакционный заход', 'предложить обзор / материал'],
    ['нативного теста', 'рекламного теста'],
    ['нативный семейный визит', 'естественный семейный обзор'],
    ['KPI', 'цели'],
    ['Growth Audit', 'План продвижения'],
    ['Growth audit', 'План продвижения']
  ];
  plainLanguage.forEach(([from, to]) => replace(from, to));

  replace('A<br>найти контакт', 'контакт<br>уточнить');
  replace('A<br>бартер / обзор', 'контакт<br>бартер / обзор');
  replace('A<br>редакционный заход', 'контакт<br>предложить материал');

  // --- 30 дней: делаем формулировки понятнее ---
  replace('2 сильнейших Reels / Clips', '2 сильнейших коротких видео: Reels и VK Клипы');
  replace('2–3 интеграции / бартер', '2–3 размещения у блогеров / бартер');
  replace('UGC и Stories с геометкой', 'отметки гостей и Stories с геометкой');
  replace('паблик №2 или лучший creator', 'второй городской паблик или лучший блогер');
  replace('контент-банк закрывает 10–14 дней минимум.', 'запаса фото и видео хватает минимум на 10–14 дней.');

  // --- Бюджет ---
  replace('Усиление', 'Рекомендуемый');
  replace('Оптимальный режим:', 'Рекомендуемый вариант:');
  replace('SMM-ведение отдельно.', 'Стоимость нашей работы оплачивается отдельно.');

  // --- Таблица результатов: Telegram-growth заменяем на MAX как основной канал ---
  html = html.replace(
    /<div class="kpi-row"><div>Telegram · подписчики<\/div>[\s\S]*?<\/div><\/div>/,
    '<div class="kpi-row"><div>MAX · подписчики</div><div class="big">55</div><div class="big good">рост</div><div class="why">Основной канал быстрых сообщений. В первый месяц сначала фиксируем реальную активность.</div></div>'
  );
  replace('Рабочие ориентиры для рекомендуемого режима «Рекомендуемый». Это не обещание результата — это планка, по которой оцениваем гипотезы.',
          'Это не обещание красивых цифр. Это понятные показатели, по которым через 30 дней смотрим: стало лучше или нет.');

  // --- Форма: вопрос про Telegram больше не нужен, решение уже принято ---
  replace(
`      <div class="field" data-label="4. @coffeewaffles — официальный Telegram">
        <label class="legend">4. @coffeewaffles — официальный Telegram?</label>
        <div class="options">
          <label class="opt"><input type="radio" name="tg" value="Да"><span>Да</span></label>
          <label class="opt"><input type="radio" name="tg" value="Нет"><span>Нет</span></label>
          <label class="opt"><input type="radio" name="tg" value="Нужно уточнить"><span>Нужно уточнить</span></label>
        </div>
      </div>`,
`      <div class="field" data-label="4. Как используем MAX">
        <label class="legend">4. MAX используем как основной канал новостей и акций?</label>
        <div class="hint">Учредитель уже подтвердил переход аудитории в MAX — здесь фиксируем финальный режим.</div>
        <div class="options">
          <label class="opt"><input type="radio" name="maxrole" value="Да, основной канал"><span>Да, основной</span></label>
          <label class="opt"><input type="radio" name="maxrole" value="Вместе с VK"><span>Вместе с VK</span></label>
          <label class="opt"><input type="radio" name="maxrole" value="Другой вариант"><span>Другой вариант</span></label>
        </div>
      </div>`
  );

  // --- Нижняя часть: убираем внутренние названия процесса ---
  replace('Ответы → финальная смета → пожимаем руки → открываем РУКИ → запускаем 30-дневный цикл.',
          'Ответы → финальная смета → согласование → запускаем план на 30 дней.');
  replace('Decision<br>before<br>production', 'Сначала<br>решение<br>потом запуск');
  replace('КОФЕ ВАФЛИ · WAFFLES AUDIT', 'КОФЕ ВАФЛИ · ПЛАН ПРОДВИЖЕНИЯ');

  // --- Telegram-кнопка для отправки ответов Каве ---
  replace(
    '<p class="lede">После формы не нужно писать отдельное сообщение. Кнопка сама собирает ответы, копирует их и открывает чат Кавы в Telegram.</p>',
    '<p class="lede">После формы ничего переписывать не нужно. Кнопка сама соберёт ответы и откроет личные сообщения @kava_studia с готовым текстом.</p>'
  );
  replace(
    '<p>Кнопка соберёт все ответы в одно сообщение, скопирует его в буфер и сразу откроет указанный чат Telegram. Останется вставить сообщение и нажать «Отправить».</p>',
    '<p>Кнопка соберёт ответы и откроет личные сообщения @kava_studia уже с готовым текстом. Останется только нажать «Отправить».</p>'
  );

  // Safety net: внутренний инструмент никогда не должен появиться в клиентской версии.
  html = html.replace(/Postmypost/gi, 'система публикаций');
  html = html.replace(/channel_coffee_waffles/gi, 'официальный канал MAX');

  const telegramOverride = `
<script>
document.addEventListener('DOMContentLoaded', function () {
  const oldButton = document.getElementById('sendTelegram');
  if (!oldButton) return;

  const button = oldButton.cloneNode(true);
  oldButton.replaceWith(button);

  button.addEventListener('click', async function () {
    const text = collectAnswers();
    await copyText(text);
    const telegramUrl = 'https://t.me/kava_studia?text=' + encodeURIComponent(text);
    statusEl.textContent = 'Открываю личные сообщения @kava_studia с готовым текстом.';
    flash('Открываю Telegram');
    const opened = window.open(telegramUrl, '_blank', 'noopener');
    if (!opened) window.location.href = telegramUrl;
  });
});
</script>`;

  html = html.replace('</body>', telegramOverride + '\n</body>');

  res.setHeader('Content-Type', 'text/html; charset=utf-8');
  res.setHeader('Cache-Control', 'public, s-maxage=30, stale-while-revalidate=300');
  res.status(200).send(html);
}
