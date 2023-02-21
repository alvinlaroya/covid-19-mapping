export default class Announcement {
  constructor(
    data = {
      id: 0,
      announcement: "",
      createdDate: "",
    }
  ) {
    this.id = data.id;
    this.announcement = data.announcement;
    this.createdDate = data.createdDate;
  }
  isValidWithoudId() {
    return this.announcement && this.createdDate;
  }
}
