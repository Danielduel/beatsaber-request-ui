declare module "*.gif" {
  const value: any;
  export = value;
}

declare module "*.svg" {
  const value: any;
  export = value;
}

type TranslationFunction = (translation: string) => string;
