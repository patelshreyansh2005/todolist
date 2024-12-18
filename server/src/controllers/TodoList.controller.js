import User from '../models/User.js';
import { statusCode } from '../utils/constants.js';
import { jsonGenerate } from '../utils/helper.js';

export const GetTodos = async (req, res) => {

    try {
        let list = await User.findById(req.userId)
            .select("-password")
            .populate("todos")
            .exec();
        var tempList = list.todos;
        var notCompleted = [];
        var completed = [];
        tempList.forEach(element => {
            if (element.isCompleted == false) {
                notCompleted.push(element);
            } else {
                completed.push(element);
            }
        });
        notCompleted.sort((a, b) => {
            const timeA = new Date(b.date);
            const timeB = new Date(a.date);
            return timeA - timeB;
        });
        completed.sort((a, b) => {
            const timeA = new Date(b.date);
            const timeB = new Date(a.date);
            return timeA - timeB;
        });
        tempList = notCompleted;
        completed.forEach((element) => {
            tempList.push(element);
        });
        list.todos = tempList;
        return res.json(jsonGenerate(statusCode.SUCCESS, "All todo list", list));
    } catch (error) {
        return res.json(jsonGenerate(statusCode.UNPROCESSABLE_ENTITY, "Error", error));
    }
}