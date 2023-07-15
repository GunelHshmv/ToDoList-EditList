const enterItem = document.querySelector("#enterItem");
const addBtn = document.querySelector("#addBtn");
const ul = document.querySelector("#ul");
const firstCard = document.querySelector("#firstCard");
const a = document.querySelector("#a");
const icon = document.querySelector("#icon");
const secondCard = document.querySelector("#secondCard");
const btnAll = document.querySelector("#btnAll");
const searchInp = document.querySelector("#searchInp");
const editBtn = document.getElementById("editBtn");

addBtn.addEventListener("click", addData);
secondCard.addEventListener("click", deletItem);
btnAll.addEventListener("click", deleteAll);
searchInp.addEventListener("keyup", filtering);
ul.addEventListener("click", edit);

let listArr = [];

function addData(e) {
  const itemVal = enterItem.value.trim();
  if (itemVal == null || itemVal == "") {
    alert("Bos deyer olamz");
  } else {
    showLi();
    showAdd();
    addStorage(enterItem.value);
    enterItem.value = "";
  }
  e.preventDefault();
}
function showLi() {
  const li = document.createElement("li");
  li.textContent = enterItem.value;
  li.className = "list-group-item d-flex justify-content-between";
  const a = document.createElement("a");
  a.href = "#";
  const i = document.createElement("i");
  i.className = "fa-regular fa-circle-xmark";
  i.style = "line-height: inherit;font-size: 20px;";
  a.appendChild(i);
  li.appendChild(a);
  ul.appendChild(li);
  const editI = document.createElement("i");
  editI.className = "fa-solid fa-pen-to-square";
  editI.style = "line-height: inherit;font-size: 20px;";
  a.appendChild(editI);
  a.appendChild(i);
  li.appendChild(a);
  ul.appendChild(li);
}
function showAdd() {
  const div = document.createElement("div");
  div.className =
    "bg-primary-subtle  p-3 mt-4 border border-info-subtle rounded";
  div.textContent = `${enterItem.value} is adding`;
  firstCard.appendChild(div);
  setTimeout(() => {
    div.remove();
  }, 2500);
}
function deletItem(e) {
  if (e.target.className === "fa-regular fa-circle-xmark") {
    const todo = e.target.parentElement.parentElement;
    todo.remove();
  }
}
function deleteAll(e) {
  if (e.target.className === "btn btn-primary mt-3") {
    const todo = ul;
    console.log(todo);
    todo.remove();
  }
}
function filtering(e) {
  const filteredVal = e.target.value.toLowerCase().trim();
  const allList = document.querySelectorAll(".list-group-item");
  if (allList.length > 0) {
    allList.forEach((item) => {
      if (item.textContent.toLowerCase().trim().includes(filteredVal)) {
        item.style.display = "block";
      } else {
        item.setAttribute("style", "display:none !important");
      }
    });
  } else {
    error();
  }
}
function error() {
  const errorDiv = document.createElement("div");
  errorDiv.className = "card d-flex border border-danger mt-2 px-3";
  errorDiv.textContent = "There is not item as you write";
  secondCard.insertBefore(errorDiv, secondCard.children[1]);
}
function addStorage(newList) {
  checkArr();
  listArr.push(newList);
  localStorage.setItem("listArr", JSON.stringify(listArr));
}
function checkArr() {
  if (localStorage.getItem("listArr") === null) {
    listArr = [];
  } else {
    listArr = JSON.parse(localStorage.getItem("listArr"));
  }
}

function edit(e) {
  console.log(e.target.parentElement.parentElement.textContent);
  let editingWord = e.target.parentElement.parentElement.textContent;
  if (e.target.className === "fa-solid fa-pen-to-square") {
    enterItem.value = editingWord;
    editBtn.addEventListener("click", () => {
      e.target.parentElement.parentElement.remove();
      showLi();
      enterItem.value = "";
    });
  }
}
