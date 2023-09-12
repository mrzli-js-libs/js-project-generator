export const KINDS_OF_TEMPLATE_APP = ['react', 'nest', 'cli'] as const;

export type TemplateAppKind = (typeof KINDS_OF_TEMPLATE_APP)[number];

export interface TemplateAppDataBase {
  readonly kind: TemplateAppKind;
}

export interface TemplateAppDataReact extends TemplateAppDataBase {
  readonly kind: 'react';
}

export interface TemplateAppDataNest extends TemplateAppDataBase {
  readonly kind: 'nest';
}

export interface TemplateAppDataCli extends TemplateAppDataBase {
  readonly kind: 'cli';
  readonly commandName: string;
}

export type TemplateAppDataAny =
  | TemplateAppDataReact
  | TemplateAppDataNest
  | TemplateAppDataCli;
