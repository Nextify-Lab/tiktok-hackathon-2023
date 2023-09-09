// Take note db schema might differ
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
  products?: Product[];

  constructor(
    id: string,
    storeName: string,
    tiktokUsername: string,
    groupBuyIds: string[],
    productIds: string[],
    rating: number,
    deleted: boolean,
    products?: Product[]
  ) {
    this.id = id;
    this.storeName = storeName.trim();
    this.tiktokUsername = tiktokUsername.trim();
    this.groupBuyIds = groupBuyIds;
    this.productIds = productIds;
    this.rating = rating;
    this.deleted = deleted;
    this.products = products;
  }
}

class Product {
  id: string;
  shopId: string;
  price: number;
  description: string;
  stock: number;
  productName: string;

  constructor(
    shopId: string,
    price: number,
    description: string,
    stock: number,
    productName: string
  ) {
    this.shopId = shopId;
    this.price = Math.abs(price);
    this.description = description;
    this.stock = stock;
    this.productName = productName.trim();
  }
}

class Transaction {
  buyerId: string;
  itemIds: string[];

  constructor(buyerId: string, itemIds: string[]) {
    this.buyerId = buyerId;
    this.itemIds = itemIds;
  }
}

class GroupBuy {
  id: string;
  shopId: string;
  buyerIds: string[];
  TransactionIds: string[];
  location: {
    longitude: string;
    latitude: string;
  };

  constructor(
    id: string,
    buyerIds: string[],
    shopId: string,
    location: { longitude: string; latitude: string }
  ) {
    this.id = id;
    this.buyers = buyerIds;
    this.shop = shop;
    this.TransactionIds = [];
    this.location = location;
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

interface SelectionDetail {
  [key: string]: number; // Represents the nested object within the selections
}

interface Selections {
  [key: string]: SelectionDetail; // Represents the selections object
}

interface GroupBuyFE {
  id: string;
  shopId: string;
  selections: Selections;
  status: string;
}
