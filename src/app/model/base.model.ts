 
export abstract class ModelBase {
    id: number | undefined;
    createStamp: Date | null;
    updateStamp: Date | null; 
    createdBy: number | null | undefined;
    updatedBy: number | null | undefined; 
    isDeleted: boolean | null;
    isActive: boolean | null;

    constructor() {
        this.createStamp = new Date(); // Set to current date
        this.updateStamp = new Date(); // Set to current date
        this.isDeleted = false; // Default value
        this.isActive = true; // Default value
    }
}