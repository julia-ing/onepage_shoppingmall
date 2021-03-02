
//Fetch the items from the JSON file
function loadItems() {
    return fetch('data/data.json')
        .then(response => response.json())  //response를 json형태로 변환
        .then(json => json.items);  //뭐가 뭔지 잘 모르겠을 땐 무조건 consloe.log로 찍어보자
}

//Update the list with the given items
function displayItems(items) {
    const container = document.querySelector('.items');  //html에 items라고 저장해둔 것을 끌고 와 저장
    container.innerHTML = items.map(item => createHTMLString(item))  //받아 온 아이템들을 li로 만들어서 container에 추가, innerHTML에 업데이트
}

//Create HTML list item from the given items
function createHTMLString(item) {
    return `
    <li class="item">
        <img src="${item.image}" alt="${item.type}" class="item_thumbnail">
        <span class="item_description">${item.gender}, ${item.size}</span>
    </li>
    `;
}

//Handle button click
function onButtonClick(event, items) {
    const dataset = event.target.dataset;
    const key = dataset.key;
    const value = dataset.value;

    if(key == null || value == null) {
        return;
    }
    displayItems(items.filter(item => item[key] === value))
}

//Filtering
function setEventListeners(items) {
    const logo = document.querySelector('.logo');
    const buttons = document.querySelector('.buttons');
    logo.addEventListener('click', () => displayItems(items));
    buttons.addEventListener('click', event => onButtonClick(event, items))
}

//main
loadItems() 
    .then(items =>{
        displayItems(items);      //보여줌
        setEventListeners(items)  //필터링
})   //성공적 호출 시
.catch(console.log);  //에러 났을 시