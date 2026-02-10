/**
 * Item Model
 * Represents a physical asset or equipment tracked in Reportheld
 */

export interface ItemAssignee {
  id: string;
  name: string;
}

export interface ItemMetadata {
  manufacturer?: string;
  model?: string;
  serialNumber?: string;
  purchaseDate?: string;
  warrantyExpiry?: string;
  [key: string]: string | undefined;
}

export interface Item {
  id: string;
  name: string;
  type:
    | "safety-equipment"
    | "machinery"
    | "tool"
    | "vehicle"
    | "facility"
    | "other";
  serialNumber?: string;
  location: string;
  status: "operational" | "maintenance" | "retired" | "damaged" | "missing";
  lastInspection: string | null;
  nextInspection: string | null;
  assignedTo?: ItemAssignee;
  metadata: ItemMetadata;
  createdAt: string;
  updatedAt: string;
}
