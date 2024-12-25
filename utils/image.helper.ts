export const getFileNameFromUri = (uri: string) => {
  const uriParts = uri.split('/');
  return uriParts[uriParts.length - 1];
};

export function hashNameToColorHex(name: string): string {
  let hash = 0;
  for (let i = 0; i < name.length; i++) {
    hash = name.charCodeAt(i) + ((hash << 5) - hash);
  }
  let color = '#';
  for (let i = 0; i < 3; i++) {
    const value = (hash >> (i * 8)) & 0xff;
    color += ('00' + value.toString(16)).substr(-2);
  }
  return color;
}
