const listItems = [
  'Item 1',
  'Item 2',
  'Item 3',
  'Item 4',
  'Item 5',
  'Item 6',
  'Item 7',
  'Item 8',
  'Item 9',
  'Item 10',
  'Item 11',
  'Item 12',
  'Item 13',
  'Item 14',
  'Item 15',
  'Item 16',
  'Item 17',
  'Item 18',
  'Item 19',
  'Item 20',
  'Item 21',
  'Item 22',
  'Item 23',
  'Item 24',
  'Item 25',
];

const $list = document.querySelector('.list');
const $pagination = document.querySelector('.pagenumbers');

let currentPage = 1;
const row = 5;

function displayList(items, wrapper, row, page) {
  wrapper.innerHTML = '';
  page--;

  const start = row * page;
  const end = start + row;

  const paginatedItems = items.slice(start, end);

  for (let i = 0; i < paginatedItems.length; i++) {
    const item = paginatedItems[i];
    const $item = document.createElement('div');

    $item.classList.add('item');
    $item.textContent = item;

    wrapper.appendChild($item);
  }
}

function paginationButton(page, items) {
  const $button = document.createElement('button');
  $button.textContent = page;

  if (currentPage === page) $button.classList.add('active');

  $button.addEventListener('click', () => {
    currentPage = page;
    displayList(items, $list, row, currentPage);

    const $currentBtn = $pagination.querySelector('button.active');
    $currentBtn.classList.remove('active');

    $button.classList.add('active');
  });

  return $button;
}

function setPagination(items, wrapper, row) {
  wrapper.innerHTML = '';

  const pageCount = Math.ceil(items.length / row);
  const $fragment = document.createDocumentFragment();

  for (let i = 1; i <= pageCount; i++) {
    const btn = paginationButton(i, items);
    $fragment.appendChild(btn);
  }

  wrapper.appendChild($fragment);
}

displayList(listItems, $list, row, currentPage);
setPagination(listItems, $pagination, row);
