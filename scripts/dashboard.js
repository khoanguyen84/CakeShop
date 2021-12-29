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

(function ready(){
    showCake();
})();