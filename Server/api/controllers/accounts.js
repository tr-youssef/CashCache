import jwt from "jsonwebtoken";
import Accounts from "../models/accounts.js";

export const getAccounts = async (req, res) => {
  const token = req.headers.authorization.split(" ")[1];
  if (token) {
    let decodedData = jwt.verify(token, process.env.HASHCODE);
    req.userId = decodedData?.id;
  }
  try {
    const accounts = await Accounts.find({
      userId: req.userId,
    });
    res.status(200).json(accounts);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

export const getAccountById = async (req, res) => {
  const { id } = req.params;
  const token = req.headers.authorization.split(" ")[1];
  if (token) {
    let decodedData = jwt.verify(token, process.env.HASHCODE);
    req.userId = decodedData?.id;
  }
  try {
    const account = await Accounts.findOne({
      _id: id,
      userId: req.userId,
    });
    account ? res.status(200).json(account) : res.status(404).send({ message: `No Account with id: ${id}` });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

export const addAccount = async (req, res) => {
  const newAccount = req.body;
  console.log("newAccount", newAccount);
  const token = req.headers.authorization.split(" ")[1];
  if (token) {
    let decodedData = jwt.verify(token, process.env.HASHCODE);
    req.userId = decodedData?.id;
  }
  try {
    const accountCreated = await Accounts.create({
      name: newAccount.name,
      initialAmount: newAccount.initialAmount,
      userId: req.userId,
    });
    res.status(201).json(accountCreated);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

export const deleteAccount = async (req, res) => {
  const { id } = req.params;
  const token = req.headers.authorization.split(" ")[1];
  if (token) {
    let decodedData = jwt.verify(token, process.env.HASHCODE);
    req.userId = decodedData?.id;
  }
  try {
    const accountDeleted = await Accounts.deleteOne({
      _id: id,
      userId: req.userId,
    });
    accountDeleted.deletedCount > 0 ? res.status(200).json({ message: "Account deleted" }) : res.status(404).json({ message: `No Account with id: ${id}` });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

export const updateAccount = async (req, res) => {
  const { id } = req.params;
  const newAccount = req.body;
  try {
    const oldAccount = await Accounts.updateOne(
      {
        _id: id,
      },
      {
        name: newAccount.name,
        initialAmount: newAccount.initialAmount,
      }
    );
    if (oldAccount.modifiedCount > 0) {
      const accountUpdated = await Accounts.findOne({
        _id: id,
      });
      res.status(201).json(accountUpdated);
    } else {
      res.status(404).json({ message: `No Account with id: ${id}` });
    }
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
