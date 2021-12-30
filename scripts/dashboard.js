class Cake {
    constructor(id, name, photo, price, quantity) {
        this.id = id;
        this.cakeName = name;
        this.photo = photo;
        this.quantity = quantity;
        this.price = price;
    }
}

let cakes = [
    new Cake(1, "Bông lan", "https://i.pravatar.cc/70?img=3", 5000, 5),
    new Cake(2, "Trứng muối", "https://i.pravatar.cc/70?img=4", 15000, 15),
    new Cake(3, "Ga tô", "https://i.pravatar.cc/70?img=5", 150000, 50),
    new Cake(4, "Socola", "https://i.pravatar.cc/70?img=6", 25000, 25),
    new Cake(5, "Cuộn", "https://i.pravatar.cc/70?img=6", 25000, 25),
    new Cake(6, "Bánh trứng", "https://i.pravatar.cc/70?img=6", 25000, 25),
]

function showCake() {
    let tbCake = document.querySelector('#tbCake');
    tbCake.innerHTML = "";
    sortCakeById();
    cakes.forEach(function (cake, index) {
        tbCake.innerHTML += `
                            <tr id="tr_${cake.id}">
                                <td class="text-center">${cake.id}</td>
                                <td>${cake.cakeName}</td>
                                <td class="text-center">
                                    <img class="img-circle" src="${cake.photo}" alt="">
                                </td>
                                <td class="text-right">${cake.price}</td>
                                <td class="text-right">${cake.quantity}</td>
                                <td class="text-right">
                                    <button class="btn btn-warning" onclick="getCake(${cake.id})">Edit</button>
                                    <button class="btn btn-primary d-none" onclick="update(${cake.id})">Update</button>
                                    <button class="btn btn-warning d-none" onclick="reset(${cake.id})">Cancel</button>
                                    <button class="btn btn-danger" onclick='remove(${cake.id})'>Remove</button>
                                </td>
                            </tr>
                            `;
    })
}

function findLastestId() {
    // let tmp = [... cakes];
    // tmp.sort(function(cake1, cake2){
    //     return cake2.id - cake1.id;
    // });
    // return tmp[0].id;
    return cakes.length >0 ? cakes[0].id : 0;
}

function sortCakeById(direction = 'desc') {
    cakes.sort(function (cake1, cake2) {
        return direction == 'desc' ? cake2.id - cake1.id : cake1.id - cake2.id;
    });
}

function save() {
    // 1. lấy dữ liệu từ các inputs
    let cakeName = document.querySelector("#cakeName").value;
    let photo = `https://i.pravatar.cc/70?img=${Math.floor(Math.random() * 70 + 1)}`;//document.querySelector("#photo").value;
    let quantity = Number(document.querySelector("#quantity").value);
    let price = Number(document.querySelector("#price").value);
    let id = findLastestId() + 1;
    // 2. kiểm tra tinh hợp lệ của dữ liệu
    if (!isValid(cakeName, photo, quantity, price)) {
        alert("Fields are required");
        return;
    }
    // 3. tạo ra 1 đối tượng cake
    let cake = new Cake(id, cakeName, photo, price, quantity);
    // 4. lưu vào mảng cakes
    cakes.push(cake);
    // 5. hiển thị dữ liệu
    showCake();
    // 6. xóa form
    clearForm();
}

function clearForm() {
    document.querySelector("#cakeName").value = "";
    document.querySelector("#photo").value = "";
    document.querySelector("#quantity").value = "";
    document.querySelector("#price").value = "";
}

function isValid() {
    for (let i = 0; i < arguments.length; i++) {
        if (arguments[i] == null || arguments[i] == "")
            return false;
    }
    return true;
}

function findIndexById(id) {
    return cakes.findIndex(function (cake) {
        return cake.id == id;
    })
}

function remove(id) {
    //1. xác nhận xem người dùng có thật sự muốn xóa ko?
    let confirmed = window.confirm("Are you sure to want to remove this cake?");
    //2 . Khi người dùng thật sự muốn xóa
    if (confirmed) {
        //2.1 Dựa vào Id của Cake trả về index của Cake trong Cakes
        let index = findIndexById(id);
        //2.2 xác định index tồn tại?
        if (index != -1) {
            //2.2.1 Xóa phần tử tại vị trí index trong Cakes
            cakes.splice(index, 1);
            //2.2.2 Hiển thị lại dữ liệu
            showCake();
        }
    }
}

function getCake(id) {
    //1. Dựa vào id lấy về index trong cakes
    let index = findIndexById(id);
    //2. Dựa vào index lấy về cake tại vị trí index đó
    let cake = cakes[index];
    let tr = document.querySelector(`#tr_${id}`);
    tr.querySelector("td:nth-child(2)").innerHTML =
                            `<input id="name_${id}" class='input-md' type='text' value='${cake.cakeName}'>`;
    tr.querySelector("td:nth-child(3)").innerHTML =
        `<input id="photo_${id}" class='input-md' type='text' value='${cake.photo}'>`;
    tr.querySelector("td:nth-child(4)").innerHTML =
        `<input id="price_${id}" class='input-sm' type='number' value='${cake.price}'>`;
    tr.querySelector("td:nth-child(5)").innerHTML =
        `<input id="quantity_${id}" class='input-sm' type='number' value='${cake.quantity}'>`;
    let tdActions = tr.querySelector("td:nth-child(6)");
    tdActions.children[0].classList.add('d-none');
    tdActions.children[1].classList.remove('d-none');
    tdActions.children[2].classList.remove('d-none');
}


function reset(id){
    let index = findIndexById(id);
    let cake = cakes[index];
    let tr = document.querySelector(`#tr_${id}`);
    tr.querySelector("td:nth-child(2)").innerText = cake.cakeName;
    tr.querySelector("td:nth-child(3)").innerHTML = `<img class="img-circle" src="${cake.photo}" alt="">`;
    tr.querySelector("td:nth-child(4)").innerText = cake.price;
    tr.querySelector("td:nth-child(5)").innerText = cake.quantity;
    let tdActions = tr.querySelector("td:nth-child(6)");
    tdActions.children[0].classList.remove('d-none');
    tdActions.children[1].classList.add('d-none');
    tdActions.children[2].classList.add('d-none');
}

function update(id){
    let index = findIndexById(id);
    let cake = cakes[index];
    cake.cakeName = document.querySelector(`#name_${id}`).value;
    cake.photo = document.querySelector(`#photo_${id}`).value;
    cake.price = Number(document.querySelector(`#price_${id}`).value);
    cake.quantity = Number(document.querySelector(`#quantity_${id}`).value);
    alert('Cake has been updated successfully!')
    showCake();
}

(function ready() {
    showCake();
})();