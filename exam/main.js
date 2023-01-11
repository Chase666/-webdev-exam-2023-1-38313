function loadRoutes() {
    let xhr = new XMLHttpRequest();
    xhr.open("GET", "http://exam-2023-1-api.std-900.ist.mospolytech.ru/api/routes?api_key=c788fe7f-cd11-4692-9f74-218ee8898480");
    xhr.responseType = "json";
    xhr.send();

    xhr.onload = function() {
        console.log(xhr.response);
        renderRoutes(xhr.response,1);
        displayPagination(xhr.response);
    }
}

function createMainObj(route) {
    let mainObj = document.createElement("div");
    mainObj.className = "col-lg-3 border border-black";
    mainObj.textContent = route.mainObject;
    return mainObj;
}

function createDesc(route) {
    let description = document.createElement("div");
    description.className = "col-lg-3 border border-black";
    description.textContent = route.description;
    return description;
}

function createName(route) {
    let name = document.createElement("div");
    name.className = "col-lg-3 d-flex border border-black justify-content-center align-items-center";
    name.textContent = route.name;
    return name;
}

function createButton(route) {
    let btn = document.createElement("div");
    let a = document.createElement("a");
    a.setAttribute("href","#guidesBlock");
    btn.className = "col-lg-3 border d-flex border-black justify-content-center align-items-center";
    let button = document.createElement("button");
    button.className = "order-route-btn";
    button.textContent = "Выбрать";
    button.setAttribute("route-idntf", route.id);
    a.append(button);
    btn.append(a);
    btn.onclick = function() {
        
        loadGuides(button.getAttribute("route-idntf"));
    }
    return btn;
}

function createListItemElem(route) {
    let div = document.createElement("div");
    div.className = "row";
    div.append(createName(route));
    div.append(createDesc(route));
    div.append(createMainObj(route));
    div.append(createButton(route));
    return div;
}

function renderRoutes(routes, page) {
    page--;
    let routesList = document.querySelector(".routes-list");
    let row = document.createElement("div");
    row.className = "row";
    let cl0 = document.createElement("div");
    cl0.className = "col-lg-3 border border-black text-center";
    cl0.innerText = "Название";
    let cl1 = document.createElement("div");
    cl1.className = "col-lg-3 border border-black text-center";
    cl1.innerText = "Описание";
    let cl2 = document.createElement("div");
    cl2.className = "col-lg-3 border border-black text-center";
    cl2.innerText = "Основные объекты";
    let cl3 = document.createElement("div");
    cl3.className = "col-lg-3 border border-black text-center";
    cl3.innerText = "";
    row.append(cl0,cl1,cl2,cl3);
    routesList.innerHTML = "";
    routesList.append(row);
    let start = 10 * page;
    let end = start + 10;
    paginatedData = routes.slice(start,end);
    paginatedData.forEach((route) => {
        routesList.append(createListItemElem(route));
    })
}

function displayPagination(routes){
    let pg = document.querySelector(".pagination");
    let pagesCount = Math.ceil(routes.length / 10);
    for (let i = 0; i < pagesCount; i++) {
        let li = displayPaginationButtons(i+1);
        pg.appendChild(li);
    }
    function displayPaginationButtons(page){
        let li = document.createElement("li");
        let a = document.createElement("a");
        li.className = "page-item";
        a.className = "page-link";
        a.innerText = page;
        a.setAttribute("href","#routesBlock");
        li.append(a);
        li.addEventListener('click', () => {
            renderRoutes(routes,page);
        })
        return li;
}
}

function loadGuides(route) {
    let xhr = new XMLHttpRequest();
    xhr.open("GET", "http://exam-2023-1-api.std-900.ist.mospolytech.ru/api/routes/"+ route + "/guides?api_key=c788fe7f-cd11-4692-9f74-218ee8898480");
    xhr.responseType = "json";
    xhr.send();

    xhr.onload = function() {
        console.log(xhr.response);
        renderGuides(xhr.response);
    }
}

function createGuideName(guide) {
    let guideName = document.createElement("div");
    guideName.className = "col-3 col-sm-2 border border-black d-flex justify-content-center align-items-center";
    guideName.textContent = guide.name;
    return guideName;
}

function createGuideLanguages(guide) {
    let guideLanguages = document.createElement("div");
    guideLanguages.className = "col-3 col-sm-2 border border-black d-flex justify-content-center align-items-center";
    guideLanguages.textContent = guide.language;
    return guideLanguages;
}

function createGuideExperience(guide) {
    let guideExperience = document.createElement("div");
    guideExperience.className = "col border border-black d-flex justify-content-center align-items-center";
    guideExperience.textContent = guide.workExperience;
    return guideExperience;
}

function createGuidePrice(guide) {
    let guidePrice = document.createElement("div");
    guidePrice.className = "col border border-black d-flex justify-content-center align-items-center";
    guidePrice.textContent = guide.pricePerHour;
    return guidePrice;
}

function createGuideButton() {
    let orderButton = document.createElement("div");
    orderButton.className = "col border d-flex border-black justify-content-center align-items-center";
    let button = document.createElement("button");
    button.className = "order-guide-btn";
    button.textContent = "Выбрать";
    orderButton.append(button);
    orderButton.onclick = function() {
        
    }
    return orderButton;
}

function createGuideIcon(){
    let guideIconDiv = document.createElement("div");
    guideIconDiv.className = "d-none d-sm-flex col border border-black d-flex justify-content-center align-items-center";
    let guideIcon = document.createElement("img");
    guideIcon.className = "img-fluid";
    guideIcon.setAttribute("src", "images/icon.png");
    guideIcon.setAttribute("style", "width:30px;height:30px;");
    guideIconDiv.append(guideIcon);
    return guideIconDiv;

}
function createGuidesListItem(guide) {
    let div = document.createElement("div");
    div.className = "row";
    div.append(createGuideIcon());
    div.append(createGuideName(guide));
    div.append(createGuideLanguages(guide));
    div.append(createGuideExperience(guide));
    div.append(createGuidePrice(guide));
    div.append(createGuideButton(guide));
    return div;
}


function renderGuides(guides) {
    let header = document.querySelector(".guides-header");
    let h2 = document.createElement("h2");
    h2.innerText = "Доступные гиды по маршруту";
    header.innerText = "";
    header.append(h2);
    let guidesList = document.querySelector(".guides-list");
    let row = document.createElement("div");
    row.className = "row";
    let cl0 = document.createElement("div");
    cl0.className = "col-2 d-none d-sm-flex border border-black";
    cl0.innerText = "";
    let cl1 = document.createElement("div");
    cl1.className = "col-3 col-sm-2 border border-black text-center";
    cl1.innerText = "ФИО";
    let cl2 = document.createElement("div");
    cl2.className = "col-3 col-sm-2 border border-black text-center";
    cl2.innerText = "Языки";
    let cl3 = document.createElement("div");
    cl3.className = "col-3 col-sm-2 border border-black text-center";
    cl3.innerText = "Опыт работы (лет)";
    let cl4 = document.createElement("div");
    cl4.className = "col-3 col-sm-2 border border-black text-center";
    cl4.innerText = "Стоимость услуг в час";
    let cl5 = document.createElement("div");
    cl5.className = "col-2 d-none d-sm-flex border border-black";
    cl5.innerText = "";
    row.append(cl0,cl1,cl2,cl3,cl4,cl5);
    guidesList.innerHTML = "";
    guidesList.append(row);
    for (let guide of guides) {
        guidesList.append(createGuidesListItem(guide));
        
    }
    
}

window.onload = function() {
    loadRoutes();
}