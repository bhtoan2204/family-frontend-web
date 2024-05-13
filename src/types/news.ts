export type News = {
  title: string;
  link: string;
  pubDate: string;
  enclosure: {
    type: string;
    length: string;
    url: string;
  }
  content: string;
  contentSnippet: string;
  guid: string;
  isoDate: string;
}