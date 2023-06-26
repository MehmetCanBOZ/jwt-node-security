import { NextFunction, Request, Response } from "express";
import {
  getAllUsers,
  Roles,
  getUser,
  createUser,
  updateUser,
  deleteUser,
} from "../state/users";
import { ForbiddenError } from "../exceptions/forbiddenError";
import { ClientError } from "../exceptions/clientError";
import { CustomRequest } from "../middleware/checkJwt";

class UserController {
  static listAll = async (req: Request, res: Response, next: NextFunction) => {
    const users = getAllUsers();

    res.status(200).type("json").send(users);
  };

  static getOneById = async (
    req: Request,
    res: Response,
    next: NextFunction
  ) => {
    const id: string = req.params.id;

    if (
      (req as CustomRequest).token.payload.role === Roles.USER &&
      req.params.id !== (req as CustomRequest).token.payload.userId
    ) {
      throw new ForbiddenError("Not enough permissions");
    }

    const user = getUser(id);

    res.status(200).type("json").send(user);
  };

  static newUser = async (req: Request, res: Response, next: NextFunction) => {
    let { username, password } = req.body;

    const user = await createUser(username, password, Roles.USER);

    res.status(201).type("json").send(user);
  };

  static editUser = async (req: Request, res: Response, next: NextFunction) => {
    const id = req.params.id;

    if (
      (req as CustomRequest).token.payload.role === Roles.USER &&
      req.params.id !== (req as CustomRequest).token.payload.userId
    ) {
      throw new ForbiddenError("Not enough permissions");
    }

    const { username, role } = req.body;

    if (
      (req as CustomRequest).token.payload.role === Roles.USER &&
      role === Roles.ADMIN
    ) {
      throw new ForbiddenError("Not enough permissions");
    } else if (!Object.values(Roles).includes(role))
      throw new ClientError("Invalid role");

    const user = getUser(id);
    const updatedUser = updateUser(
      id,
      username || user.username,
      role || user.role
    );

    res.status(204).type("json").send(updatedUser);
  };

  static deleteUser = async (
    req: Request,
    res: Response,
    next: NextFunction
  ) => {
    const id = req.params.id;

    deleteUser(id);

    res.status(204).type("json").send();
  };
}

export default UserController;
