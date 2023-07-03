import { validate as uuidValidate } from 'uuid';

export const isIdValid = (id: string): boolean => {
  return uuidValidate(id);
};

export const successfulResponse = (res, data, code = 200) => {
  res.writeHead(code, { 'Content-Type': 'application/json' });
  res.end(JSON.stringify(data));
};

export const unsuccessfulResponse = (res, errCode, msg) => {
  res.writeHead(errCode, { 'Content-Type': 'application/json' });
  res.end(JSON.stringify({ error: msg }));
};

export const validateUserId = (res, userId) => {
  if (!isIdValid(userId)) {
    unsuccessfulResponse(res, 400, 'Invalid userId. Must be a valid UUID');
    return;
  }
};
