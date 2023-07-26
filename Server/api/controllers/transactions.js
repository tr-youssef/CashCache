import jwt from "jsonwebtoken";
import Transactions from "../models/transactions.js";
import Accounts from "../models/accounts.js";
import mongoose from "mongoose";
import mongodb from "mongoose";

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
          as: "subCategory",
        },
      },
      {
        $lookup: {
          from: "accounts",
          localField: "accountId",
          foreignField: "_id",
          as: "account",
        },
      },
      {
        $group: {
          _id: { $dateToString: { format: "%Y-%m-%d", date: "$tranDate" } },
          transaction: { $push: "$$ROOT" },
        },
      },

      {
        $sort: {
          _id: -1,
        },
      },
    ]);

    res.status(200).json(transactions);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const updateAccountBalance = async (accountId, transactionAmount) => {
  const account = await Accounts.findOne({
    _id: accountId,
  });

  if (!account) {
    console.error("Account not found.");
    return;
  }

  const value = Number(transactionAmount);
  if (account.type === "debit") {
    account.balance -= value;
  } else if (account.type === "credit") {
    account.balance += value;
  } else {
    console.error("Invalid account type.");
    return;
  }
  await account.save();
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
      userId: req.userId,
      categoryId: newTransaction.categoryId,
      accountId: newTransaction.accountId,
    });
    updateAccountBalance(newTransaction.accountId, newTransaction.amount);
    res.status(201).json(transactionCreated);
  } catch (error) {
    console.log("error", error);
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
      updateAccountBalance(newTransaction.accountId, newTransaction.amount);
    }

    res.status(201).json(resultArr);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

export const ExpensesByCategoryForDateRange = async (req, res) => {
  let startDate = new Date(`${req.query.startDate}`);
  let endDate = new Date(`${req.query.endDate}`);
  const token = req.headers.authorization.split(" ")[1];
  if (token) {
    let decodedData = jwt.verify(token, process.env.HASHCODE);
    req.userId = decodedData?.id;
  }

  const tranAgg = Transactions.aggregate([
    {
      $match: {
        tranDate: {
          $gte: startDate,
          $lt: endDate,
        },
        userId: {
          $eq: new mongoose.Types.ObjectId(`${req.userId}`),
        },
      },
    },
    {
      $lookup: {
        from: "categories",
        localField: "categoryId",
        foreignField: "_id",
        as: "categories",
      },
    },
    {
      $addFields: {
        category: {
          $arrayElemAt: ["$categories", 0],
        },
        subcategory: {
          $arrayElemAt: ["$categories.subcategories", 0],
        },
      },
    },
    {
      $project: {
        categoryName: "$category.name",
        subcategoryName: "$subcategory.name",
        amount: 1,
        categoryType: "$category.type",
      },
    },
    {
      $match: {
        categoryType: {
          $eq: "Expense",
        },
      },
    },
    {
      $group: {
        _id: "$categoryName",
        categoryName: {
          $first: "$categoryName",
        },
        subCategoryName: {
          $first: "$categoryName",
        },
        subcategoryName: {
          $first: "$subcategoryName",
        },
        categoryType: {
          $first: "$categoryType",
        },
        amount: {
          $sum: "$amount",
        },
      },
    },
  ]);

  try {
    const results = await tranAgg.exec();
    const chartData = results.map((elem) => ({
      value: elem.amount,
      name: elem.categoryName,
    }));
    res.status(200).json(chartData);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

export const ExpenseTrendForDateRange = async (req, res) => {
  let startDate = new Date(`${req.query.startDate}`);
  let endDate = new Date(`${req.query.endDate}`);

  const token = req.headers.authorization.split(" ")[1];
  if (token) {
    let decodedData = jwt.verify(token, process.env.HASHCODE);
    req.userId = decodedData?.id;
  }

  const tranAgg = Transactions.aggregate([
    {
      $match: {
        tranDate: {
          $gte: startDate,
          $lt: endDate,
        },
        userId: {
          $eq: new mongoose.Types.ObjectId(`${req.userId}`),
        },
      },
    },
    {
      $lookup: {
        from: "categories",
        localField: "categoryId",
        foreignField: "_id",
        as: "categories",
      },
    },
    {
      $addFields: {
        category: {
          $arrayElemAt: ["$categories", 0],
        },
      },
    },
    {
      $project: {
        tranDate: 1,
        amount: 1,
        categoryType: "$category.type",
      },
    },
    {
      $match: {
        categoryType: {
          $eq: "Expense",
        },
      },
    },
    {
      $group: {
        _id: {
          year: { $year: "$tranDate" },
          month: { $month: "$tranDate" },
        },
        amount: {
          $sum: "$amount",
        },
      },
    },
    { $sort: { year: 1, month: 1 } },
    {
      $project: {
        year: "$_id.year",
        month: "$_id.month",
        amount: "$amount",
        _id: 0,
      },
    },
  ]);

  try {
    const results = await tranAgg.exec();
    res.status(200).json(results);
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
    //find the Tx so we can reverse the amount on the account
    const Tx = await Transactions.findOne({
      _id: id,
      userId: req.userId,
    });
    await updateAccountBalance(Tx.accountId, -Tx.amount);

    //then delete it
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
    const oldTransaction = await Transactions.findOne({
      _id: id,
    });
    if (!oldTransaction) {
      res.status(404).json({ message: `No Transaction with id: ${id}` });
      exit;
    }

    const updateResult = await Transactions.updateOne(
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

    await updateAccountBalance(newTransaction.accountId, newTransaction.amount);
    await updateAccountBalance(oldTransaction.accountId, -oldTransaction.amount);

    if (updateResult.modifiedCount > 0) {
      res.status(201).json(newTransaction);
    } else {
      res.status(404).json({ message: `No Transaction with id: ${id}` });
    }
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
