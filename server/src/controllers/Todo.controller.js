import User from "../models/User.js";
import Todo from "../models/Todo.js";
import { statusCode } from "../utils/constants.js";
import { jsonGenerate } from "../utils/helper.js";

export const createTodo = async (req, res) => {

    try {
        const result = await Todo.create({
            userId: req.userId,
            desc: req.body.desc,
        });
        if (result) {
            await User.findOneAndUpdate(
                { _id: req.userId },
                { $push: { todos: result._id } }
            );
        }
        return res.json(jsonGenerate(statusCode.SUCCESS, "Todo created successfully", result));
    }
    catch (error) {
        return res.json(jsonGenerate(statusCode.UNPROCESSABLE_ENTITY, "something went wrong", error));
    }
};