export default async function handler(req, res) {
  const sourceUrl = 'https://raw.githubusercontent.com/kava-studia/waffles-audit/main/index.html';
  const upstream = await fetch(sourceUrl, { headers: { 'User-Agent': 'waffles-audit-owner-layer' } });

  if (!upstream.ok) {
    res.status(502).send('Audit source temporarily unavailable');
    return;
  }

  let html = await upstream.text();

  html = html.replace(
    '<div class="fact"><b>VK</b><span>подключён к Postmypost</span></div>',
    '<div class="fact"><b>Контент</b><span>единый контент-контур</span></div>'
  );

  html = html.replace(
    '<div class="channel-line"><b>Что известно</b><span>Подключение channel_coffee_waffles в Postmypost активно.</span></div>',
    '<div class="channel-line"><b>Что известно</b><span>Площадка присутствует в контуре, но исходные метрики и публичную ссылку нужно подтвердить.</span></div>'
  );

  html = html.replace(
    /<article class="channel">\s*<div class="channel-top"><h3>Postmypost<\/h3>[\s\S]*?<\/article>/,
    `<article class="channel">
        <div class="channel-top"><h3>Единый контент-контур</h3><div class="current"><b>4</b><span>социальные площадки</span></div></div>
        <div class="channel-body">
          <div class="channel-line"><b>В контуре</b><span>VK + Instagram + Telegram + MAX. Яндекс ведём отдельно как карточку спроса и репутации.</span></div>
          <div class="channel-line"><b>Что получаем</b><span>Единый календарь, один контент-пак, контроль выходов и общую аналитику без дублирования производства.</span></div>
          <div class="channel-line"><b>Сейчас</b><span>Ничего не публикуем до согласования собственника.</span></div>
        </div>
      </article>`
  );

  html = html.replace(
    '<p class="lede">После формы не нужно писать отдельное сообщение. Кнопка сама собирает ответы, копирует их и открывает чат Кавы в Telegram.</p>',
    '<p class="lede">После формы не нужно писать отдельное сообщение. Кнопка сама собирает ответы и открывает личные сообщения @kava_studia в Telegram уже с готовым черновиком.</p>'
  );

  html = html.replace(
    '<p>Кнопка соберёт все ответы в одно сообщение, скопирует его в буфер и сразу откроет указанный чат Telegram. Останется вставить сообщение и нажать «Отправить».</p>',
    '<p>Кнопка соберёт все ответы, откроет личные сообщения @kava_studia и сразу подставит готовый текст. Останется только нажать «Отправить». Копия текста также сохранится в буфере как запасной вариант.</p>'
  );

  // Safety net: the owner-facing HTML must never expose the internal publishing tool name or internal channel handle.
  html = html.replace(/Postmypost/gi, 'единый контент-контур');
  html = html.replace(/channel_coffee_waffles/gi, 'публичный канал MAX');

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
    statusEl.textContent = 'Открываю личные сообщения @kava_studia в Telegram с уже готовым текстом.';
    flash('Открываю Telegram');
    const opened = window.open(telegramUrl, '_blank', 'noopener');
    if (!opened) window.location.href = telegramUrl;
  });
});
</script>`;

  html = html.replace('</body>', telegramOverride + '\n</body>');

  res.setHeader('Content-Type', 'text/html; charset=utf-8');
  res.setHeader('Cache-Control', 'public, s-maxage=60, stale-while-revalidate=86400');
  res.status(200).send(html);
}
