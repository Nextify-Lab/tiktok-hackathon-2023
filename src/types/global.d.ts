class Buyer {
  id: string;
  username: string;
  age: number;
  address: string;
  deleted: boolean;

  constructor(
    id: string,
    username: string,
    age: number,
    address: string,
    deleted: boolean
  ) {
    this.id = id;
    this.username = username.trim();
    this.age = age;
    this.address = address.trim();
    this.deleted = deleted;
  }
}

class Shop {
  id: string;
  tiktokUsername: string;
  groupBuys: GroupBuy[];
  items: Item[];
  rating: number;

  constructor(
    id: string,
    tiktokUsername: string,
    groupBuys: GroupBuy[],
    items: Item[],
    rating: number
  ) {
    this.id = id;
    this.tiktokUsername = tiktokUsername.trim(); // Sanitize the tiktokUsername by removing leading/trailing whitespaces
    this.groupBuys = groupBuys;
    this.items = items;
    this.rating = rating;
  }
}

class Item {
  productName: string;
  shop: Shop;
  buyer: Buyer;
  stock: number;
  price: number;
  description: string;

  constructor(
    productName: string,
    shop: Shop,
    buyer: Buyer,
    stock: number,
    price: number,
    description: string
  ) {
    this.productName = productName.trim(); // Sanitize the productName by removing leading/trailing whitespaces
    this.shop = shop;
    this.buyer = buyer;
    this.stock = Math.abs(stock); // Ensure stock is a positive value
    this.price = Math.abs(price); // Ensure price is a positive value
    this.description = description;
  }
}

interface GroupBuy {
  id: string;
  buyers: Buyer[];
  shop: Shop;
  messages?: Message[]; // Optional
}

class GroupBuy {
  id: string;
  buyers: Buyer[];
  shop: Shop;
  messages?: Message[]; // Optional

  constructor(id: string, buyers: Buyer[], shop: Shop, messages?: Message[]) {
    this.id = id;
    this.buyers = buyers;
    this.shop = shop;
    this.messages = messages;
  }
}

class Message {
  time: Date;
  sender: string;
  receiver: string;
  msgStr: string;

  constructor(time: Date, sender: string, receiver: string, msgStr: string) {
    this.time = time;
    this.sender = sender.trim(); // Sanitize the sender by removing leading/trailing whitespaces
    this.receiver = receiver.trim(); // Sanitize the receiver by removing leading/trailing whitespaces
    this.msgStr = msgStr.trim(); // Sanitize the message by removing leading/trailing whitespaces
  }
}
