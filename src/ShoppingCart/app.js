// state or data
let product = [];

// DOM
const $priceValue = document.querySelectorAll('.price-value');
const $minusBtn = document.querySelectorAll('.minus-btn');
const $plusBtn = document.querySelectorAll('.plus-btn');
const $countState = document.querySelectorAll('.count-state');

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
  const currValue = [...$countState].find(
    item => item.id === target.nextElementSibling.id
  );

  const inputValue = +currValue.value;
  if (inputValue === 0) {
    return;
  }

  currValue.value = inputValue - 1;
};

// 수량 증가 함수
const handlePlusBtn = ({ target }) => {
  const currValue = [...$countState].find(
    item => item.id === target.previousElementSibling.id
  );

  const inputValue = +currValue.value;

  if (inputValue >= 15) {
    return;
  }

  currValue.value = inputValue + 1;

  const currProduct = product.find(
    item => item.id === +target.previousElementSibling.id
  );

  currProduct.price *= currValue.value;
};

// DOM이 전부 만들어지면 실행하는 함수
window.addEventListener('load', () => {
  request.get('http://localhost:3000/product');

  $minusBtn.forEach(item => {
    item.onclick = handleMinusBtn;
  });

  $plusBtn.forEach(item => {
    item.onclick = handlePlusBtn;
  });
});
