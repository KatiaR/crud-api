/** @format */
import { IncomingMessage, ServerResponse } from 'http';

export type RequestHandler = (
  req: IncomingMessage,
  res: ServerResponse
) => void;

export interface User {
  id: string;
  username: string;
  age: number;
  hobbies: string[];
}

export interface RouteHandlers {
  [key: string]: RequestHandler;
}

export interface ExtendedIncomingMessage extends IncomingMessage {
  body?: any;
}

export type Handler = (
  req: ExtendedIncomingMessage,
  res: ServerResponse
) => void;
