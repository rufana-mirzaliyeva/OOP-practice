class Product {
    //title = 'DEFAULT';
    //imageUrl;
    //description;
    //price

    constructor(title, imageUrl, description, price){
        this.title = title;
        this.imageUrl = imageUrl;
        this.description = description;
        this.price = price;
    }
}
class ElemetAttribute{
    constructor(attrName, attrValue){
        this.name = attrName;
        this.value = attrValue;

    }
}

class Component {
    constructor(renderHookId, shouldRender = true){
        this.hookId = renderHookId;
        if(shouldRender){
            this.render()
        }
    }

    render(){

    }


    createRootElement(tag, cssClasses, attributes){
        const rootElement = document.createElement(tag);
        if(cssClasses){
            rootElement.className = cssClasses;
        }
        if(attributes && attributes.length > 0){
            for ( const attr of attributes) {
                rootElement.setAttribute(attr.name, attr.value);
            }
        }
        document.getElementById(this.hookId).append(rootElement);
        return rootElement;
    }
}

class ShoppingCart extends Component{
    items = [];

    set cartItems(value) {
        this.items = value;
        this.totalOutpul.innerHTML = `
        <h2>Total: \$${this.totalAmount.toFixed(2)}</h2>
        `
    }
    get totalAmount(){
        const sum = this.items.reduce((prevValue, curItem) => {
            return prevValue + curItem.price;
        }, 0
        );
        return sum;
    }

    constructor(renderHookId){
        super(renderHookId, false);
        this.orderProducts = () => {
            console.log('Ordering...');
            console.log(this.items)
    };
    this.render();
    }

    addProduct(product){
      const updatedItems = [...this.items];
      updatedItems.push(product);
      this.cartItems= updatedItems;
       
    }




    render(){
        const cartEl = this.createRootElement('section', 'cart');
        cartEl.innerHTML = `
        <h2>Total: \$${0}</h2>
        <button>Order Now!</button>
        `;
        const orderButton = cartEl.querySelector('button');
       // orderButton.addEventListener('click', () => this.orderProducts());
        orderButton.addEventListener('click', () => this.orderProducts());
        this.totalOutpul = cartEl.querySelector('h2')
     
    }
}
class ProductItem extends Component{
    constructor(product, renderHookId) {
        super(renderHookId, false);
        this.product = product;
        this.render();

    }

    addToCart(){
        App.addProductToCart(this.product);

    }

    render(){
        const prodEl = this.createRootElement('li', 'product-item')
                prodEl.innerHTML = `
                <div>
                <img src="${this.product.imageUrl}" alt="${this.product.title}">
                <div class="product-item_content">
                  <h2>${this.product.title}</h2>
                  <h3>\$${this.product.price}</h3>
                  <p>${this.product.description}</p>
                  <button> Add to Cart </button>
                </div>
              </div>
                `;

                const addCartButton = prodEl.querySelector('button');
                addCartButton.addEventListener('click',this.addToCart.bind(this));
                
    }
}

class ProductList extends Component {
    products = [];

    constructor(renderHookId) {
        super(renderHookId);
        this.fetchProducts();
     }

     fetchProducts(){
        this.products = [
            new Product(  
                ' A Pillow',
                'https://m.media-amazon.com/images/I/81a2oGhhmaL._AC_SL1500_.jpg',
                'A soft pillow!',
                19.90
                ),
         
            new Product (
                ' A Carpet',
                'https://upload.wikimedia.org/wikipedia/commons/thumb/7/71/Ardabil_Carpet.jpg/397px-Ardabil_Carpet.jpg',
                'A modern carpet!',
                100.90,
            )
        ];
        this.renderProducts();
     }

     renderProducts(){
        for (const prod of this.products){
            new ProductItem(prod, 'prod-list');  
         }
     }

        render() {
            this.createRootElement('ul', 'product-list', 
            [new ElemetAttribute('id', 'prod-list')
        ]);
        if(this.products && this.products.length > 0){
            this.renderProducts();
        }
           

        }
    }

class Shop {
    constructor(){
        this.render();
    }
    render(){
        this.cart = new ShoppingCart('app');
         new ProductList('app'); 
    }

}

class App {
    static cart;
    static init(){
        const shop = new Shop();
        this.cart = shop.cart;
    }
    
    static addProductToCart(product){
        this.cart.addProduct(product)
    }
}

App.init();

