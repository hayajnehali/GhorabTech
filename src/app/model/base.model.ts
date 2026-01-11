export abstract class ModelBase {
  id: string | undefined;
  createStamp: Date | null;
  updateStamp: Date | null;
  createdBy?: string;
  updatedBy: number | null | undefined;
  isDeleted: boolean | null = false;
  isActive: boolean | null = true;

  constructor() {
    this.createStamp = new Date(); // Set to current date
    this.updateStamp = new Date(); // Set to current date
    this.isDeleted = false; // Default value
    this.isActive = true; // Default value
  }
}
