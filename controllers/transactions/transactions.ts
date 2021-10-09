import { Response } from 'express';
import Transaction from '../../models/transaction';
import { RequestWithUser } from '../../types';

export const getTransactions = async (req: RequestWithUser, res: Response) => {
  const { userId } = req;
  const transactions = await Transaction.get(userId);
  res.send(transactions);
};

interface AddTransactionRequest extends RequestWithUser {
  body: {
    title: string;
    categoryId: number;
    price: number;
    date: string;
  };
}

export const addTransaction = async (req: AddTransactionRequest, res: Response) => {
  const { body, userId } = req;
  const transaction = await Transaction.add({ ...body, userId });
  res.send(transaction);
};

export interface DeleteTransactionRequest extends RequestWithUser {
  params: {
    id: string;
  }
}

export const deleteTransaction = async (req: DeleteTransactionRequest, res: Response) => {
  const { body: { id }, userId } = req;
  const transaction = await Transaction.delete(+id, userId);
  res.send(transaction);
};

export interface EditTransactionRequest extends RequestWithUser {
  body: {
    id: number;
    title: string;
    categoryId: number;
    price: number;
    date: string;
  };
}

export const editTransaction = async (req: EditTransactionRequest, res: Response) => {
  const { body, userId } = req;
  const transaction = await Transaction.edit({ ...body, userId });
  res.send(transaction);
};
