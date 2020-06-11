export const joinErrors = (errors: {text: string}[]) => {
  const errorStrings = errors.map((error) => error.text);
  return errorStrings.join('\n');
};

export const formatRFC3339DateString = (dateString: string) => {
  const splitDateString = dateString.split('T');
  return splitDateString[0].replace(/-/g, '/');
};
