// state or data
let carts = [];

// DOM
const $lists = document.querySelector('.lists');
const $totalDelete = document.querySelector('.total-delete');
const $totalCost = document.querySelector('.total-cost');
const $moveShop = document.querySelector('.move-shop');

// HTML 속성 여러개 한번에 넣는 함수
const setAttributes = (el, attrs) => {
  Object.keys(attrs).forEach(key => el.setAttribute(key, attrs[key]));
};

// 현재 사용되는 상품을 찾는 함수
const findProduct = siblingElem => carts.find(item => item.id === +siblingElem.id.slice(-1));

// 수량, 가격 변경으로 새롭게 변한 결과로 product값 변경하는 함수
const replaceProduct = currValue => {
  carts.forEach((item, i, arr) => {
    if (item.id === currValue.id) {
      arr[i] = currValue;
    }
  });

  return carts;
};

// 상품 전체 금액 계산하는 함수
const getTotalCost = () => {
  const totalCost = carts.reduce((acc, cur) => acc + cur.price, 0);

  $totalCost.textContent = `${totalCost.toLocaleString()}원`;
};

// 콤마 제거 함수
const removeComma = elText => parseInt(elText.replace(/,/g, ''), 10);

// 서버에서 받은 상태를 화면에 보여주는 함수
const render = () => {
  console.log(carts);

  const $fragment = document.createDocumentFragment();

  carts.forEach(item => {
    const $li = document.createElement('li');
    const $imageContainer = document.createElement('div');
    const $img = document.createElement('img');
    const $section = document.createElement('section');
    const $h2 = document.createElement('h2');
    const $controlContainer = document.createElement('div');
    const $minusBtn = document.createElement('button');
    const $plusBtn = document.createElement('button');
    const $input = document.createElement('input');
    const $price = document.createElement('span');
    const $deleteBtn = document.createElement('button');
    const $icon = document.createElement('i');

    $imageContainer.setAttribute('class', 'item-image');
    $section.setAttribute('class', 'item-info');
    $h2.setAttribute('class', 'item-title');
    $controlContainer.setAttribute('class', 'buy-control');
    $minusBtn.setAttribute('class', 'minus-btn');
    $plusBtn.setAttribute('class', 'plus-btn');
    $price.setAttribute('class', 'total-price');
    $deleteBtn.setAttribute('class', 'delete-btn');
    $icon.setAttribute('class', 'fas fa-times');

    setAttributes($li, {
      id: `id-${item.id}`,
      class: 'item'
    });

    setAttributes($img, {
      src: item.image,
      alt: item.content
    });

    setAttributes($input, {
      type: 'text',
      value: item.count,
      class: 'count-state',
      id: `id-${item.id}`
    });

    $h2.textContent = item.content;
    $price.textContent = `${item.price.toLocaleString()}원`;

    $imageContainer.appendChild($img);
    $section.appendChild($h2);
    $section.appendChild($controlContainer);
    $section.appendChild($price);
    $section.appendChild($deleteBtn);

    $controlContainer.appendChild($minusBtn);
    $controlContainer.appendChild($input);
    $controlContainer.appendChild($plusBtn);

    $deleteBtn.appendChild($icon);

    $li.appendChild($imageContainer);
    $li.appendChild($section);

    $fragment.appendChild($li);

    $lists.appendChild($fragment);
  });

  // 수량 관리 버튼 이벤트 바인딩
  const $plusBtns = document.querySelectorAll('.plus-btn');
  const $minusBtns = document.querySelectorAll('.minus-btn');
  const $deleteBtns = document.querySelectorAll('.delete-btn');

  $minusBtns.forEach(item => {
    item.onclick = handleMinusBtn;
  });

  $plusBtns.forEach(item => {
    item.onclick = handlePlusBtn;
  });

  $deleteBtns.forEach(item => {
    item.onclick = removeItem;
  });

  getTotalCost();
};

// 서버와 통신하기 위한 함수
const fetchProducts = promise => {
  promise
    .then(res => res.json())
    .then(_carts => {
      carts = _carts;
    })
    .then(render)
    .catch(console.error);
};

const request = {
  get(url) {
    return fetchProducts(fetch(url));
  },
  post(url, payload) {
    return fetchProducts(
      fetch(url, {
        method: 'POST',
        headers: { 'content-Type': 'application/json' },
        body: JSON.stringify(payload)
      })
    );
  },
  patch(url, payload) {
    return fetchProducts(
      fetch(url, {
        method: 'PATCH',
        headers: { 'content-Type': 'application/json' },
        body: JSON.stringify(payload)
      })
    );
  },
  delete(url) {
    return fetchProducts(
      fetch(url, {
        method: 'DELETE'
      })
    );
  }
};

// 수량 감소 함수
const handleMinusBtn = ({ target }) => {
  const $countState = document.querySelectorAll('.count-state');
  const parentId = target.closest('li').id;
  const currPriceEl = document.querySelector(`#${parentId} span`);

  const currValue = [...$countState].find(item => item.id === target.nextElementSibling.id);

  const inputValue = +currValue.value;

  if (inputValue === 1) {
    return;
  }

  currValue.value = inputValue - 1;

  const currProduct = findProduct(target.nextElementSibling);
  const HARD_PRICE = removeComma(currPriceEl.textContent) / currProduct.count;

  currProduct.count -= 1;

  const price = `${(HARD_PRICE * currProduct.count).toLocaleString()}원`;

  currPriceEl.textContent = price;
  currProduct.price = removeComma(price);

  replaceProduct(currProduct);

  getTotalCost();
};

// 수량 증가 함수
const handlePlusBtn = ({ target }) => {
  const $countState = document.querySelectorAll('.count-state');
  const parentId = target.closest('li').id;
  const currPriceEl = document.querySelector(`#${parentId} span`);

  const currValue = [...$countState].find(item => item.id === target.previousElementSibling.id);

  const inputValue = +currValue.value;

  if (inputValue >= 15) {
    return;
  }

  currValue.value = inputValue + 1;

  const currProduct = findProduct(target.previousElementSibling);
  const HARD_PRICE = removeComma(currPriceEl.textContent) / currProduct.count;

  currProduct.count += 1;

  const price = `${(HARD_PRICE * currProduct.count).toLocaleString()}원`;
  currPriceEl.textContent = price;
  currProduct.price = removeComma(price);

  replaceProduct(currProduct);

  getTotalCost();
};

// 상품 제거
const removeItem = ({ target }) => {
  const parentId = target.closest('li');

  $lists.removeChild(parentId);
  carts = carts.filter(item => item.id !== +parentId.id.slice(-1));

  getTotalCost();
};

// 모든 상품 제거
const allRemoveItems = () => {
  const $items = document.querySelectorAll('.item');

  $items.forEach((_, i, arr) => {
    $lists.removeChild(arr[i]);
  });

  carts = [];

  getTotalCost();
};

// 홈으로 이동하면서 서버에 post 보내기
const postCart = e => {
  carts.forEach(item => {
    request.patch(`http://localhost:3000/userItem/${item.id}`, {
      price: item.price,
      count: item.count
    });
  });
};

window.addEventListener('load', () => {
  request.get('http://localhost:3000/userItem');

  $totalDelete.onclick = allRemoveItems;

  $moveShop.onclick = postCart;
});
