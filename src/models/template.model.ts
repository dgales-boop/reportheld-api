/**
 * Template Model
 * Represents a reusable report template in Reportheld
 */

export interface TemplateField {
  name: string;
  type: "text" | "number" | "select" | "date" | "checkbox" | "textarea";
  required: boolean;
  options?: string[];
  defaultValue?: string | number | boolean;
}

export interface Template {
  id: string;
  name: string;
  category: "safety" | "quality" | "maintenance" | "compliance" | "general";
  description: string;
  version: string;
  fields: TemplateField[];
  active: boolean;
  createdAt: string;
  updatedAt: string;
}
