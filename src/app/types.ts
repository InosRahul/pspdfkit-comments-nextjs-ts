// File: src/types.ts
import PSPDFKit from 'pspdfkit';

export interface AiFinding {
  id: number;
  rfxId: number;
  docId: number;
  requirementId: number;
  organizationId: number;
  embeddingId: number;
  name: string;
  summary: string;
  rawText: string;
  cleanedText: string;
  pageNumber: number;
  coordinates: any;
  similarityScore: number;
  createdAt: Date;
  updatedAt: Date;
  deletedAt: Date | null;
  embedding: {
    id: number;
    cleanedText: string;
  };
  requirement: {
    id: number;
    name: string;
  };
}
