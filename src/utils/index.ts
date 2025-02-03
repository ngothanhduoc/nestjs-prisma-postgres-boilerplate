// Exclude keys from user
export function exclude(arr: object[], keys: string[]) {
  for (const key of keys) {
    delete arr[key];
  }
  return arr;
}

export function parseSearchParams(s: any, key: string, operator = '$eq') {
  const result = s.filter((condition: any) => condition[`${key}`]).map((condition: any) => condition[`${key}`][operator])[0];
  if (result === '') {
    return undefined;
  }
  return result;
}

export function parseSearchParamsContL(s: any, key: string) {
  return s.filter((condition: any) => condition[`${key}`]).map((condition: any) => condition[`${key}`].$contL)[0];
}

export function capitalizeFirstLetter(text: string): string {
  return text.toLowerCase().replace(/\b[a-z]/g, letter => {
    return letter.toUpperCase();
  });
}

export function getDMY() {
  const date = new Date();
  const day = date.getDate();
  const month = date.getMonth() + 1;
  const year = date.getFullYear();
  return `${day}/${month}/${year}`;
}

export function FindUrlUploadImage(imagesData: any, imageType: string) {
  return imagesData[imageType]?.[0]?.response?.url ?? undefined;
}

export function formatDate(dateStr: string): Date {
  const date = new Date(dateStr);
  const year = date.getFullYear();
  const month = (date.getMonth() + 1).toString().padStart(2, '0');
  const day = date.getDate().toString().padStart(2, '0');

  const formattedDate = `${year}-${month}-${day}`;

  return new Date(formattedDate);
}

export function formatDateRange(startDateStr: string, endDateStr: string): { startDate: Date; endDate: Date } {
  const startDate = new Date(startDateStr);
  const endDate = new Date(endDateStr);

  startDate.setHours(0, 0, 0, 0);
  endDate.setHours(23, 59, 59, 999);

  return { startDate: new Date(startDate), endDate: new Date(endDate) };
}

export function generatePaymentVoucherId() {
  return `${Math.floor(Math.random() * 100) + 1}${new Date().getTime()}`;
}

export async function delay(milliseconds: number) {
  return new Promise(resolve => {
    setTimeout(resolve, milliseconds);
  });
}
