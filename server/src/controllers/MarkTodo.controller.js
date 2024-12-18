import { statusCode } from "../utils/constants.js";
import { jsonGenerate } from "../utils/helper.js";
import Todo from "../models/Todo.js";
const MarkTodo = async (req, res) => {
    try {
        const todo = await Todo.findOneAndUpdate(
            {
                _id: req.body.todo_id,
                userId: req.userId,
            },
            [
                {
                    $set: {
                        isCompleted: {
                            $eq: [false, "$isCompleted"]
                        }
                    }
                }
            ]
        );

        if (todo) {
            return res.json(jsonGenerate(statusCode.SUCCESS, "updated", todo));
        }
    } catch (error) {
        return res.json(jsonGenerate(statusCode.UNPROCESSABLE_ENTITY, "could not update", null));
    }
}

export default MarkTodo;