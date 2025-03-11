class User {
  constructor(id, name, email, address) {
    this.id = id;
    this.name = name;
    this.email = email;
    this.address = address;
  }

  getUserInfo() {
    return `${this.id}, İsim: ${this.name}, Eposta: ${this.email}, Adress: ${this.address.city}`;
  }

  static fromMap(mapData) {
    const address = mapData.address ? Address.fromMap(mapData.address) : null;
    return new User(
      mapData.id,
      mapData.name,
      mapData.email,
      address,
    );
  }


}

class Address {
  constructor(street, city, geo) {
    this.street = street;
    this.city = city;
    this.geo = geo;
  }

  static fromMap(mapData) {
    const geo = mapData.geo ? Geo.fromMap(mapData.geo) : null;
    return new Address(
      mapData.street,
      mapData.city,
      geo,
    );
  }
}

class Geo {
  constructor(lat, lng) {
    this.lat = lat;
    this.lng = lng;
  }

  static fromMap(mapData) {
    return new Geo(
      mapData.lat,
      mapData.lng,
    );
  }

}


export {User, Address, Geo}