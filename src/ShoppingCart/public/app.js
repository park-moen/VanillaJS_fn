// state or data
let product = [];

// DOM
const $priceValue = document.querySelectorAll('.price-value');
const $minusBtn = document.querySelectorAll('.minus-btn');
const $plusBtn = document.querySelectorAll('.plus-btn');
const $countState = document.querySelectorAll('.count-state');
const $cartBtn = document.querySelectorAll('.cart-btn');
const $cartIcon = document.querySelector('.cart-icon');

// data를 HTML에 삽입하는 함수
const render = () => {
  const price = product.map(item => item.price);

  price.forEach((price, i) => {
    $priceValue[i].textContent = `${price.toLocaleString()}원`;
  });
};

// 서버와 통신하기 위한 함수
const fetchProducts = promise => {
  promise
    .then(res => res.json())
    .then(_product => {
      product = _product;
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
        body: JSON.stringify(payload),
      }),
    );
  },
  patch(url, payload) {
    return fetchProducts(
      fetch(url, {
        method: 'PATCH',
        headers: { 'content-Type': 'application/json' },
        body: JSON.stringify(payload),
      }),
    );
  },
  delete(url) {
    return fetchProducts(
      fetch(url, {
        method: 'DELETE',
      }),
    );
  },
};

// 현재 사용되는 상품을 찾는 함수
const findProduct = siblingElem => product.find(item => item.id === +siblingElem.id);

// 수량, 가격 변경으로 새롭게 변한 결과로 product값 변경하는 함수
const replaceProduct = currValue => {
  product.forEach((item, i, arr) => {
    if (item.id === currValue.id) {
      arr[i] = currValue;
    }
  });

  return product;
};

// 수량 감소 함수
const handleMinusBtn = ({ target }) => {
  const currValue = [...$countState].find(item => item.id === target.nextElementSibling.id);

  const inputValue = +currValue.value;

  if (inputValue === 1) {
    return;
  }

  currValue.value = inputValue - 1;

  const currProduct = findProduct(target.nextElementSibling);

  const HARD_PRICE = currProduct.price / currProduct.count;

  currProduct.count -= 1;
  currProduct.price -= HARD_PRICE;

  replaceProduct(currProduct);

  render();
};

// 수량 증가 함수
const handlePlusBtn = ({ target }) => {
  const currValue = [...$countState].find(item => item.id === target.previousElementSibling.id);

  const inputValue = +currValue.value;

  if (inputValue >= 15) {
    return;
  }

  currValue.value = inputValue + 1;

  const currProduct = findProduct(target.previousElementSibling);

  const HARD_PRICE = currProduct.price / currProduct.count;

  currProduct.count += 1;
  currProduct.price += HARD_PRICE;

  replaceProduct(currProduct);

  render();
};

// 장바구니에 넣는 함수
const insertItem = ({ target }) => {
  const parentId = target.closest('li').id;

  request.post('http://localhost:3000/userItem/', product[parentId - 1]);
};

// 카트 아이콘 클릭 시 장바구지 페이지로 이동
$cartIcon.onclick = () => {
  // e.preventDefault();
};

// DOM이 전부 만들어지면 실행하는 함수
window.addEventListener('DOMContentLoaded', () => {
  request.get('http://localhost:8001/product');

  $minusBtn.forEach(item => {
    item.onclick = handleMinusBtn;
  });

  $plusBtn.forEach(item => {
    item.onclick = handlePlusBtn;
  });

  $cartBtn.forEach(item => {
    item.onclick = insertItem;
  });
});
