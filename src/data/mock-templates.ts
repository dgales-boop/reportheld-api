import { Template } from "../models/template.model";

/**
 * Mock template data for Week 1 testing
 * In production, this would come from a database or Reportheld service
 */

export const mockTemplates: Template[] = [
  {
    id: "tmpl-001",
    name: "Safety Inspection Template",
    category: "safety",
    description: "Standard template for workplace safety inspections",
    version: "2.1",
    fields: [
      {
        name: "location",
        type: "text",
        required: true,
      },
      {
        name: "inspectorName",
        type: "text",
        required: true,
      },
      {
        name: "hazardLevel",
        type: "select",
        required: true,
        options: ["low", "medium", "high", "critical"],
      },
      {
        name: "findings",
        type: "textarea",
        required: true,
      },
      {
        name: "actionRequired",
        type: "checkbox",
        required: false,
        defaultValue: false,
      },
    ],
    active: true,
    createdAt: "2025-06-15T08:00:00Z",
    updatedAt: "2026-01-20T14:30:00Z",
  },
  {
    id: "tmpl-002",
    name: "Equipment Maintenance Template",
    category: "maintenance",
    description: "Template for routine equipment maintenance checks",
    version: "1.5",
    fields: [
      {
        name: "equipmentId",
        type: "text",
        required: true,
      },
      {
        name: "maintenanceType",
        type: "select",
        required: true,
        options: ["preventive", "corrective", "predictive"],
      },
      {
        name: "hoursOperated",
        type: "number",
        required: false,
      },
      {
        name: "conditionNotes",
        type: "textarea",
        required: true,
      },
      {
        name: "nextMaintenanceDate",
        type: "date",
        required: true,
      },
    ],
    active: true,
    createdAt: "2025-08-10T09:00:00Z",
    updatedAt: "2025-12-05T11:15:00Z",
  },
  {
    id: "tmpl-003",
    name: "Quality Control Checklist",
    category: "quality",
    description: "Standard quality control inspection checklist",
    version: "3.0",
    fields: [
      {
        name: "productBatch",
        type: "text",
        required: true,
      },
      {
        name: "inspectionDate",
        type: "date",
        required: true,
      },
      {
        name: "visualInspection",
        type: "select",
        required: true,
        options: ["pass", "fail", "conditional"],
      },
      {
        name: "measurements",
        type: "textarea",
        required: false,
      },
      {
        name: "approved",
        type: "checkbox",
        required: true,
        defaultValue: false,
      },
    ],
    active: true,
    createdAt: "2025-04-20T10:30:00Z",
    updatedAt: "2026-02-01T08:45:00Z",
  },
  {
    id: "tmpl-004",
    name: "Compliance Audit Template",
    category: "compliance",
    description: "Template for regulatory compliance audits",
    version: "1.2",
    fields: [
      {
        name: "auditArea",
        type: "text",
        required: true,
      },
      {
        name: "regulatoryStandard",
        type: "text",
        required: true,
      },
      {
        name: "complianceStatus",
        type: "select",
        required: true,
        options: ["compliant", "non-compliant", "partial", "not-applicable"],
      },
      {
        name: "findings",
        type: "textarea",
        required: true,
      },
      {
        name: "correctiveActions",
        type: "textarea",
        required: false,
      },
    ],
    active: true,
    createdAt: "2025-09-05T13:00:00Z",
    updatedAt: "2025-11-18T16:20:00Z",
  },
  {
    id: "tmpl-005",
    name: "General Incident Report",
    category: "general",
    description: "General template for incident reporting",
    version: "2.3",
    fields: [
      {
        name: "incidentDate",
        type: "date",
        required: true,
      },
      {
        name: "incidentTime",
        type: "text",
        required: true,
      },
      {
        name: "location",
        type: "text",
        required: true,
      },
      {
        name: "description",
        type: "textarea",
        required: true,
      },
      {
        name: "severity",
        type: "select",
        required: true,
        options: ["minor", "moderate", "major", "critical"],
      },
      {
        name: "witnessesPresent",
        type: "checkbox",
        required: false,
        defaultValue: false,
      },
    ],
    active: true,
    createdAt: "2025-03-12T07:30:00Z",
    updatedAt: "2026-01-28T12:10:00Z",
  },
];
