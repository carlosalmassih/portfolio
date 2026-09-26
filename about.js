(() => {
  'use strict';
  document.title = 'About Me — ' + window.PORTFOLIO.name;
  document.querySelector('meta[name="description"]').content = window.PORTFOLIO.about;
  const list = document.querySelector('#education-list');
  const make = (tag, text, cls) => { const el = document.createElement(tag); el.textContent = text || ''; if(cls)el.className=cls; return el; };
  (window.EDUCATION || []).forEach(item => {
    const row = make('article', '', 'experience-row');
    const detail = make('div');
    detail.append(make('h3', item.degree), make('span', item.institution));
    row.append(make('p', item.dates), detail, make('p', [item.specialization, item.location].filter(Boolean).join(' · ')));
    list.append(row);
  });
})();
