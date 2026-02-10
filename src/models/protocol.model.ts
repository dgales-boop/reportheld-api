/**
 * Protocol Model
 * Represents a standardized procedure or workflow in Reportheld
 */

export interface ProtocolStep {
  order: number;
  title: string;
  description: string;
  required: boolean;
  estimatedMinutes?: number;
}

export interface Protocol {
  id: string;
  name: string;
  type: "inspection" | "maintenance" | "emergency" | "audit" | "training";
  description: string;
  steps: ProtocolStep[];
  estimatedDuration: string;
  requiredCertification?: string;
  active: boolean;
  createdAt: string;
  updatedAt: string;
}
