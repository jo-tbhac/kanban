export const joinErrors = (errors: {text: string}[]) => {
  const errorStrings = errors.map((error) => error.text);
  return errorStrings.join('\n');
};

export const formatRFC3339DateString = (dateString: string) => {
  const splitDateString = dateString.split('T');
  return splitDateString[0].replace(/-/g, '/');
};

export const dndItemType = {
  LIST: 'List',
  CARD: 'Card',
};

export const isMobile = (agent: string): boolean => (
  agent.search(/Android|Mobile|iPod|iPhone/) !== -1
);

export const isTablet = (agent: string): boolean => (
  agent.search(/Android|iPad/) !== -1
);

export const maxUploadFileSize = 8388608;

export const fontColorLight = '#333';
export const fontColorDark = '#fff';
