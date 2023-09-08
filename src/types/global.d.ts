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
  storeName: string;
  tiktokUsername: string;
  groupBuyIds: string[];
  productIds: string[];
  rating: number;
  deleted: boolean;

  constructor(
    id: string,
    storeName: string,
    tiktokUsername: string,
    groupBuyIds: string[],
    productIds: string[],
    rating: number,
    deleted: boolean
  ) {
    this.id = id;
    this.storeName = storeName.trim();
    this.tiktokUsername = tiktokUsername.trim();
    this.groupBuyIds = groupBuyIds;
    this.productIds = productIds;
    this.rating = rating;
    this.deleted = deleted;
  }
}

class Product {
  shopId: string;
  price: number;
  description: string;
  stock: number;
  productName: string;
  itemSerialNumbers: string[];

  constructor(
    shopId: string,
    price: number,
    description: string,
    stock: number,
    productName: string,
    itemSerialNumbers: string[]
  ) {
    this.shopId = shopId;
    this.price = Math.abs(price);
    this.description = description;
    this.stock = stock;
    this.productName = productName.trim();
    this.itemSerialNumbers = itemSerialNumbers;
  }
}

class Item {
  productId: string;
  productName: string;
  shopId: string;
  buyerID: string | null;
  price: number;
  description: string;
  deleted: boolean;

  constructor(
    productId: string,
    productName: string,
    shopId: string,
    buyerID: string | null,
    price: number,
    description: string,
    deleted: boolean = false
  ) {
    this.productId = productId;
    this.productName = productName.trim();
    this.shopId = shopId;
    this.buyerID = buyerID;
    this.price = Math.abs(price);
    this.description = description;
    this.deleted = deleted;
  }
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

interface Video {
  url: string;
  profilePic: string;
  username: string;
  description: string;
  song: string;
  likes: number | string; // As you have used a string for likes in one video
  comments: number;
  saves: number;
  shares: number;
  productId: string;
}
