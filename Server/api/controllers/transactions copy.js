import jwt from "jsonwebtoken";
import Transactions from "../models/transactions.js";
import mongoose from "mongoose";

export const getTransactions = async (req, res) => {
  const token = req.headers.authorization.split(" ")[1];
  if (token) {
    let decodedData = jwt.verify(token, process.env.HASHCODE);
    req.userId = decodedData?.id;
  }
  try {
    const transactions = await Transactions.aggregate([
      {
        $match: {
          userId: new mongoose.Types.ObjectId(req.userId),
        },
      },
      {
        $lookup: {
          from: "categories",
          localField: "categoryId",
          foreignField: "_id",
          as: "category",
        },
      },
      {
        $lookup: {
          from: "categories",
          localField: "categoryId",
          foreignField: "subcategories._id",
          as: "subcategoryCategory",
        },
      },

      { $group: { _id: { $dateToString: { format: "%Y-%m-%d", date: "$tranDate" } }, transaction: { $push: "$$ROOT" } } },

      {
        $sort: {
          _id: -1, // Sort by tranDate in ascending order
        },
      },
    ]);

    res.status(200).json(transactions);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

export const addTransaction = async (req, res) => {
  const newTransaction = req.body;
  const token = req.headers.authorization.split(" ")[1];
  if (token) {
    let decodedData = jwt.verify(token, process.env.HASHCODE);
    req.userId = decodedData?.id;
  }
  try {
    const transactionCreated = await Transactions.create({
      amount: newTransaction.amount,
      tranDate: newTransaction.tranDate,
      note: newTransaction.note,
      userId: newTransaction.userId,
      categoryId: newTransaction.categoryId,
      accountId: newTransaction.accountId,
      tags: newTransaction.tags,
    });
    res.status(201).json(transactionCreated);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

export const addTransactions = async (req, res) => {
  const transactionArray = req.body;
  const token = req.headers.authorization.split(" ")[1];
  if (token) {
    let decodedData = jwt.verify(token, process.env.HASHCODE);
    req.userId = decodedData?.id;
  }
  let resultArr = [];
  try {
    for (const newTransaction of transactionArray) {
      const transactionCreated = await Transactions.create({
        amount: newTransaction.amount,
        tranDate: newTransaction.tranDate,
        note: newTransaction.note,
        userId: newTransaction.userId,
        categoryId: newTransaction.categoryId,
        accountId: newTransaction.accountId,
        tags: newTransaction.tags,
      });
      resultArr.push(transactionCreated);
    }

    res.status(201).json(resultArr);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

export const deleteTransaction = async (req, res) => {
  const { id } = req.params;
  const token = req.headers.authorization.split(" ")[1];
  if (token) {
    let decodedData = jwt.verify(token, process.env.HASHCODE);
    req.userId = decodedData?.id;
  }
  try {
    const transactionDeleted = await Transactions.deleteOne({
      _id: id,
      userId: req.userId,
    });
    transactionDeleted.deletedCount > 0 ? res.status(200).json({ message: "Transaction deleted" }) : res.status(404).json({ message: `No Transaction with id: ${id}` });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

export const updateTransaction = async (req, res) => {
  const { id } = req.params;
  const newTransaction = req.body;
  try {
    const oldTransaction = await Transactions.updateOne(
      {
        _id: id,
      },
      {
        amount: newTransaction.amount,
        tranDate: newTransaction.tranDate,
        note: newTransaction.note,
        categoryId: newTransaction.categoryId,
        accountId: newTransaction.accountId,
      }
    );
    if (oldTransaction.modifiedCount > 0) {
      const transactionUpdated = await Transactions.findOne({
        _id: id,
      });
      res.status(201).json(transactionUpdated);
    } else {
      res.status(404).json({ message: `No Transaction with id: ${id}` });
    }
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
