import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import * as db from "./db";
import { User } from "../models/user";
import { register, login } from "../controllers/user/userController";

beforeAll(async () => await db.connect());
afterEach(async () => await db.clearDatabase());
afterAll(async () => await db.disconnect());

const mockRequest = (body) => ({
  body,
});

const mockResponse = () => {
  const res = {};
  res.status = jest.fn().mockReturnValue(res);
  res.send = jest.fn().mockReturnValue(res);
  return res;
};

describe("register", () => {
  test("should 400 if firstname is missing from body", async () => {
    const req = mockRequest({
      firstName: "",
      lastName: "lastName",
      email: "email@test.com",
      password: "ee2Tsd$TPo23*4Er",
    });

    const res = mockResponse();

    await register(req, res);

    expect(res.status).toHaveBeenCalledWith(400);
  });

  test("should 400 if lastName is missing from body", async () => {
    const req = mockRequest({
      firstName: "firstName",
      lastName: "",
      email: "email@test.com",
      password: "ee2Tsd$TPo23*4Er",
    });

    const res = mockResponse();

    await register(req, res);

    expect(res.status).toHaveBeenCalledWith(400);
  });

  test("should 400 if email is missing from body", async () => {
    const req = mockRequest({
      firstName: "firstName",
      lastName: "lastName",
      email: "",
      password: "ee2Tsd$TPo23*4Er",
    });

    const res = mockResponse();

    await register(req, res);

    expect(res.status).toHaveBeenCalledWith(400);
  });

  test("should 400 if password is missing from body", async () => {
    const req = mockRequest({
      firstName: "firstName",
      lastName: "lastName",
      email: "email@test.com",
      password: "",
    });

    const res = mockResponse();

    await register(req, res);

    expect(res.status).toHaveBeenCalledWith(400);
  });

  test("should 400 if password is less than 8 characters", async () => {
    const req = mockRequest({
      firstName: "",
      lastName: "lastName",
      email: "email@test.com",
      password: "ee2$T",
    });

    const res = mockResponse();

    await register(req, res);

    expect(res.status).toHaveBeenCalledWith(400);
  });

  test("should 409 with message if user with given email already exists", async () => {
    User.findOne = jest.fn().mockReturnValueOnce({
      email: "email@test.com",
    });

    User.prototype.save = jest.fn().mockImplementation(() => {});

    const req = mockRequest({
      firstName: "firstName",
      lastName: "lastName",
      email: "email@test.com",
      password: "ee2Tsd$TPo23*4Er",
    });

    const res = mockResponse();

    await register(req, res);

    expect(res.send).toHaveBeenCalledWith({
      message: "User with given email already exists.",
    });
    expect(res.status).toHaveBeenCalledWith(409);
  });

  test("should 201 with message if input is valid and user does not exist", async () => {
    const req = mockRequest({
      firstName: "firstName",
      lastName: "lastName",
      email: "email@test.com",
      password: "ee2Tsd$TPo23*4Er",
    });

    const res = mockResponse();

    await register(req, res);

    expect(res.send).toHaveBeenCalledWith({
      message: "User created successfully.",
    });
    expect(res.status).toHaveBeenCalledWith(201);
  });
});

describe("login", () => {
  test("should 400 if email is missing from body", async () => {
    const req = mockRequest({
      email: "",
      password: "ee2Tsd$TPo23*4Er",
    });

    const res = mockResponse();

    await login(req, res);

    expect(res.status).toHaveBeenCalledWith(400);
  });

  test("should 400 if password is missing from body", async () => {
    const req = mockRequest({
      email: "email@test.com",
      password: "",
    });

    const res = mockResponse();

    await login(req, res);

    expect(res.status).toHaveBeenCalledWith(400);
  });

  test("should 401 with message if user does not exist", async () => {
    const req = mockRequest({
      email: "emewe@test.com",
      password: "ee2Tsd$TPo23*4Er",
    });

    const res = mockResponse();

    await login(req, res);

    expect(res.send).toHaveBeenCalledWith({ message: "Invalid credentials." });
    expect(res.status).toHaveBeenCalledWith(401);
  });

  test("should 401 if password is wrong", async () => {
    User.findOne = jest.fn().mockReturnValueOnce({
      _id: "63556472f047bfbbd6799d66",
      email: "email@test.com",
      password: "ee2Tsd$TPo23*4Er",
    });

    User.prototype.save = jest.fn().mockImplementation(() => {});

    const req = mockRequest({
      email: "email@test.com",
      password: "ee2Tsd$TPo23*4",
    });

    const res = mockResponse();

    await login(req, res);

    expect(res.send).toHaveBeenCalledWith({ message: "Invalid credentials." });
    expect(res.status).toHaveBeenCalledWith(401);
  });

  test("should 200 with token if good credentials", async () => {
    const salt = await bcrypt.genSalt(Number(process.env.BCRYPT_SALT));
    const hashPassword = await bcrypt.hash("ee2Tsd$TPo23*4Er", salt);
    let token;

    User.findOne = jest.fn().mockReturnValueOnce({
      _id: "63556472f047bfbbd6799d66",
      email: "email@test.com",
      password: hashPassword,
    });

    User.generateAuthToken = jest.fn().mockImplementation(() => {
      token = jwt.sign(
        { _id: "63556472f047bfbbd6799d66" },
        process.env.JWT_PRIVATE_KEY,
        {
          expiresIn: "7d",
        }
      );
      return token;
    });

    User.prototype.save = jest.fn().mockImplementation(() => {});

    const req = mockRequest({
      email: "email@test.com",
      password: "ee2Tsd$TPo23*4Er",
    });

    const res = mockResponse();

    await login(req, res);

    expect(res.send).toHaveBeenCalledWith({
      data: token,
      message: "Logged in successfully.",
    });
    expect(res.status).toHaveBeenCalledWith(200);
  });
});
