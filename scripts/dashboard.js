class Cake{
    constructor(id, name, photo, price, quatity){
        this.id = id;
        this.cakeName = name;
        this.photo = photo;
        this.quatity = quatity;
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

function showCake(){
    let tbCake = document.querySelector('#tbCake');
    tbCake.innerHTML = "";
    sortCakeById();
    cakes.forEach(function(cake, index){
        tbCake.innerHTML += `
                            <tr>
                                <td class="text-center">${cake.id}</td>
                                <td>${cake.cakeName}</td>
                                <td class="text-center">
                                    <img class="img-circle" src="${cake.photo}" alt="">
                                </td>
                                <td class="text-right">${cake.price}</td>
                                <td class="text-right">${cake.quatity}</td>
                                <td class="text-right">
                                    <button class="btn btn-warning">Edit</button>
                                    <button class="btn btn-danger">Remove</button>
                                </td>
                            </tr>
                            `;
    })
}

function findLastestId(){
    // let tmp = [... cakes];
    // tmp.sort(function(cake1, cake2){
    //     return cake2.id - cake1.id;
    // });
    // return tmp[0].id;
    return cakes[0].id;
}

function sortCakeById(direction = 'desc'){
    cakes.sort(function(cake1, cake2){
        return direction == 'desc' ? cake2.id - cake1.id : cake1.id - cake2.id;
    });
}

function save(){
    // 1. lấy dữ liệu từ các inputs
    let cakeName = document.querySelector("#cakeName").value;
    let photo = `https://i.pravatar.cc/70?img=${Math.floor(Math.random()*70 + 1)}`;//document.querySelector("#photo").value;
    let quantity = Number(document.querySelector("#quantity").value);
    let price = Number(document.querySelector("#price").value);
    let id = findLastestId() + 1;
    // 2. kiểm tra tinh hợp lệ của dữ liệu
    if(!isValid(cakeName, photo, quantity, price)){
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

function clearForm(){
    document.querySelector("#cakeName").value = "";
    document.querySelector("#photo").value = "";
    document.querySelector("#quantity").value = "";
    document.querySelector("#price").value = "";
}

function isValid(){
    for(let i=0; i< arguments.length; i++){
        if(arguments[i] == null || arguments[i]=="")
            return false;
    }
    return true;
}

(function ready(){
    showCake();
})();