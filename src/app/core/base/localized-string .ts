export class LocalizedString {
  arabic?: string;
  english?: string;
  local?: string;

  constructor(arabic?: string, english?: string, local?: string) {
    this.arabic = arabic;
    this.english = english;
    this.local = local;
  }
}
