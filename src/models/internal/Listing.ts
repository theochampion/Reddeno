export interface ListingData {
  kind: string;
  data: {
    modhash: string;
    dist: number;
    children: Array<Record<string, unknown>>;
    after: string;
    before: string;
  };
}

export default class Listing {
  kind = "Listing";
  data!: {
    modhash: string;
    dist: number;
    children: null;
    after: string;
    before: string;
  };

  constructor(data: ListingData) {
    Object.assign(this, data);
  }
}
