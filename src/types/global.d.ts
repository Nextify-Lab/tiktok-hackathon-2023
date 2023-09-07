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
  groupBuys: GroupBuy[];
  items: Item[];
  rating: number;
  deleted: boolean;

  constructor(
    id: string,
    storeName: string,
    tiktokUsername: string,
    groupBuys: GroupBuy[],
    items: Item[],
    rating: number,
    deleted: boolean
  ) {
    this.id = id;
    this.storeName = storeName.trim();
    this.tiktokUsername = tiktokUsername.trim();
    this.groupBuys = groupBuys;
    this.items = items;
    this.rating = rating;
    this.deleted = deleted;
  }
}

class Item {
  productId: string;
  productName: string;
  shop: Shop;
  buyer: Buyer;
  stock: number;
  price: number;
  description: string;

  constructor(
    productId: string,
    productName: string,
    shop: Shop,
    buyer: Buyer,
    stock: number,
    price: number,
    description: string
  ) {
    this.productId = productId;
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
}
