import { validate as uuidValidate } from 'uuid';

export const isIdValid = (id: string): boolean => {
  return !uuidValidate(id);
};

export const successfulResponse = (res, data, code = 200) => {
  res.writeHead(code, { 'Content-Type': 'application/json' });
  res.end(JSON.stringify(data));
};

export const unsuccessfulResponse = (res, errCode, msg) => {
  res.writeHead(errCode, { 'Content-Type': 'text/plain' });
  res.end(msg);
};

export const validateUserId = (res, userId) => {
  if (!isIdValid(userId)) {
    unsuccessfulResponse(res, 400, 'Invalid userId');
    return;
  }
};
