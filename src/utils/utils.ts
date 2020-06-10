// eslint-disable-next-line import/prefer-default-export
export const joinErrors = (errors: {text: string}[]) => {
  const errorStrings = errors.map((error) => error.text);
  return errorStrings.join('\n');
};
