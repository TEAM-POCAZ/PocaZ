import dotenv from 'dotenv';
dotenv.config();

function required(
  key: string,
  defaultValue?: undefined | number
): string | number {
  const value = process.env[key] || defaultValue;
  if (value == null) {
    throw new Error(`Key ${key} is undefined`);
  }
  return value;
}

export const config = {
  host: {
    port: required('HOST_PORT'),
  },
};
