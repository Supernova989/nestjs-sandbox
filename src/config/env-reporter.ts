export const envReporter = ({ errors }) => {
  if (Object.keys(errors).length > 0) {
    const errorDetails = Object.entries(errors).reduce(
      (acc, currValue: [string, any]) => {
        const [key, value] = currValue;
        acc[key] = value.message;
        return acc;
      },
      {},
    );
    throw new Error(JSON.stringify(errorDetails));
  }
};
