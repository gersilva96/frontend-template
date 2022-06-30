const getEnvOrError = (varName: string): void => {
  throw new Error(`Environment variable "${varName}" is not defined.`);
};

export const CONFIG = {
  SERVICES: {
    EXAMPLE: {
      BASE_URL:
        process.env.NEXT_PUBLIC_EXAMPLE_SERVICE_URL ||
        getEnvOrError("NEXT_PUBLIC_EXAMPLE_SERVICE_URL")
    }
  }
};
