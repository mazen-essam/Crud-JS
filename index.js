var productName = document.getElementById("exampleFormControlInput1");
var productPrice = document.getElementById("exampleFormControlInput2");
var productCategory = document.getElementById("exampleFormControlInput3");
var productDescription = document.getElementById("exampleFormControlInput4");
var count = document.getElementById("exampleFormControlInput5");
var multiply = document.getElementById("exampleFormControlInput6");
var products;

if (localStorage.user == null) {
   products = [];
} else {
   products = JSON.parse(localStorage.user);
   displayProduct();
}

function addProduct() {
   var product_items = {
      name: productName.value,
      price: productPrice.value,
      category: productCategory.value,
      description: productDescription.value,
      count: count.value,
      multiply: multiply.value,
   };
   if (product_items.count < 1) {
      products.push(product_items);
   } else {
      for (var i = 0; i < product_items.count; i++) {
         products.push(product_items);
      }
   }
   // console.log(product_items);
   localStorage.setItem("user", JSON.stringify(products));
   displayProduct();
   clear();
}

function displayProduct() {
   var display = "";
   var Total_price = 0;
   var multy_products;
   for (var i = 0; i < products.length; i++) {
      // code for multi products

      // if (products[i].multiply > 1) {
      //    for (var j = 0; j < products[i].multiply; j++) {
      //       multy_products[j] = `
      //       <tr>
      //           <td>${i + 1}</td>
      //           <td>${products[i].name}</td>
      //           <td>${products[i].price}</td>
      //           <td>${products[i].category}</td>
      //           <td>${products[i].description}</td>
      //           <td>${products[i].multiply}</td>

      //           <td><button class="btn btn-warning" id="Edit" onclick="Edit(${i})">Edit</button></td>
      //           <td><button class="btn btn-danger" id="Delete" onclick="DEL(${i})">Delete</button></td>
      //       </tr>`;
      //    }
      // }

      display += `
        <tr>
            <td>${i + 1}</td>
            <td>${products[i].name}</td>
            <td>${products[i].price}</td>
            <td>${products[i].category}</td>
            <td>${products[i].description}</td>
            <td>${products[i].multiply}</td>
            <td><button class="btn btn-warning" id="Edit" onclick="Edit(${i})">Edit</button></td>
            <td><button class="btn btn-danger" id="Delete" onclick="DEL(${i})">Delete</button></td>
            <td><button class="btn btn-primary" id="add" onclick="add(${i})">+</button></td>

        </tr>`;
      Total_price += +products[i].price;
   }
   console.log(Total_price);
   display += `
   <tr>
   <td>...</td>
   <td>...</td>
   <td>Total price : ${Total_price}</td>
   <td>...</td>
   <td>...</td>
   <td>...</td>
   <td>...</td>
   <td>...</td>
   <td>...</td>
   </tr>
   `;
   document.getElementById("tbody").innerHTML = display;
}
console.log(products);

function clear() {
   productCategory.value = "";
   productDescription.value = "";
   productName.value = "";
   productPrice.value = "";
   count.value = "";
   multiply.value = "";
}

function deleteAll() {
   products.splice(0, products.length);
   // localStorage.user = null;
   localStorage.setItem("user", JSON.stringify(products));
   displayProduct();
}

function DEL(count) {
   if (products[count].multiply > 1) {
      products[count].multiply -= 1;
      localStorage.setItem("user", JSON.stringify(products));
   } else {
      products.splice(count, 1);
      localStorage.setItem("user", JSON.stringify(products));
   }

   // console.log(products);

   displayProduct();
}

function Search(term) {
   var display = "";
   for (var i = 0; i < products.length; i++) {
      if (products[i].name.includes(term.trim()) == true) {
         display += `
        <tr>
            <td>${i + 1}</td>
            <td>${products[i].name}</td>
            <td>${products[i].price}</td>
            <td>${products[i].category}</td>
            <td>${products[i].description}</td>
            <td>${products[i].multiply}</td>
            <td><button class="btn btn-warning" id="Edit" onclick="Edit(${i})">Edit</button></td>
            <td><button class="btn btn-danger" id="Delete" onclick="DEL(${i})">Delete</button></td>
            <td><button class="btn btn-primary" id="add" onclick="add(${i})">+</button></td>
         </tr>`;
      }
      document.getElementById("tbody").innerHTML = display;
   }
}

function Edit(num) {
   var product_items = {
      name: productName.value,
      price: productPrice.value,
      category: productCategory.value,
      description: productDescription.value,
      count: count.value,
      multiply: multiply.value,
   };
   products[num].name = product_items.name;
   products[num].price = product_items.price;
   products[num].category = product_items.category;
   products[num].description = product_items.description;
   products[num].multiply = product_items.multiply;
   localStorage.setItem("user", JSON.stringify(products));
   displayProduct();
   clear();
}

function add(number) {
   products[number].multiply += +1;
   localStorage.setItem("user", JSON.stringify(products));
   displayProduct();
}
