# VanillaJS_fn

## Infinite Carousel 구현 중 유용한 event 및 function


### parseInt()

---

```
parseInt(string, 진수설정); // 10진수, 2진수 ...
```

첫 번째 인수로 전달한 문자열의 두 번째 문자부터 해당 진수를 나타내는 숫자가 아닌 문자와 마주치면 이 문자와 계속되는 문자들은 전부 무시되며 해석된 정수값만 반환한다.

```
parseInt('500px', 10) // 500 반환
```


### Window.getComputedStyle()

---

`Window.getComputedStyle()` 메소드는 인자로 전달받은 요소의 모든 CSS 속성값을 담은 객체를 회신합니다.

```
const style = window.Window.getComputedStyle(element, [,pseudoElt])
```

- Element: 속성값을 얻으려하는 Element


- pseudoElt(option): 일치시킬 의사요소(pseudo element)를 지정하는 문자열. 보통의 요소들에 대해서는 생략되거나 null이어야 함.

<img src="/Users/parkmoen/Library/Application Support/typora-user-images/image-20210314195401834.png" alt="image-20210314195401834" style="zoom:80%;" />

<img src="/Users/parkmoen/Library/Application Support/typora-user-images/image-20210314195510335.png" alt="image-20210314195510335" style="zoom:40%;" />



