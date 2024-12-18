import { statusCode } from "../utils/constants.js";
import { jsonGenerate } from "../utils/helper.js";
import Todo from "../models/Todo.js";
import User from "../models/User.js";
const RemoveTodo = async (req, res) => {
    try {
        const result = await Todo.findOneAndDelete(
            {
                userId: req.userId,
                _id: req.body.todo_id
            }
        );
        if (result) {
            const user = await User.findOneAndUpdate(
                {
                    _id: req.userId,
                },
                {
                    $pull: {
                        todos: req.body.todo_id
                    }
                }
            );
            return res.json(jsonGenerate(statusCode.SUCCESS,"Todo deleted successfully",null));
        }
    } catch (error) {
        return res.json(jsonGenerate(statusCode.UNPROCESSABLE_ENTITY,"Could not delete",null));
    }
}

export default RemoveTodo;