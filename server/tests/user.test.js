const {registerUser, loginUser} = require('../controllers/UserController')
const {User} = require('../models/associations')
const bcrypt = require('bcryptjs')

// Mock response object
const mockRes = () => {
    const res = {}
    res.status = jest.fn().mockReturnValue(res)
    res.json = jest.fn().mockReturnValue(res)
    return res
}

// Mock User methods
jest.mock('../models/associations', () => ({
    User: {
        createUser: jest.fn(),
        findUser: jest.fn()
    }
}))

// Mock JWT generation
const mockCreateJWT = () => 'mocked_jwt_token'

describe("UserController", () => {
    
    beforeEach(() => {
        jest.clearAllMocks()
    })

    test("registerUser should return 200 and token", async () => {
        const req = {
            body: {
                username: "ivan",
                email: "ivan@gmail.com",
                password: "12345",
                firstname: "ivan",
                lastname: "arcega"
            }
        }
        const res = mockRes()

        const mockUser = {
            id: 1,
            username: req.body.username,
            email: req.body.email,
            createJWT: jest.fn(() => mockCreateJWT())
        }

        User.createUser.mockResolvedValue(mockUser)

        await registerUser(req, res)

        expect(User.createUser).toHaveBeenCalledWith(req.body)
        expect(mockUser.createJWT).toHaveBeenCalled()
        expect(res.status).toHaveBeenCalledWith(200)
        expect(res.json).toHaveBeenCalledWith({ user: mockUser, token: "mocked_jwt_token" })
    })

    test("loginUser should return 200 and token if password is correct", async () => {
        const req = {
            body: {
                username: "ivan",
                password: "12345"
            }
        }
        const res = mockRes()

        const mockUser = {
            id: 1,
            username: "ivan",
            password: await bcrypt.hash("12345", 10),
            createJWT: jest.fn(() => mockCreateJWT())
        }

        User.findUser.mockResolvedValue(mockUser)

        await loginUser(req, res)

        expect(User.findUser).toHaveBeenCalledWith("ivan")
        expect(res.status).toHaveBeenCalledWith(200)
        expect(res.json).toHaveBeenCalledWith({ user: mockUser, token: "mocked_jwt_token" })
    })

    test("loginUser should return 400 if password is incorrect", async () => {
        const req = {
            body: {
                username: "ivan",
                password: "wrongpassword"
            }
        }
        const res = mockRes()

        const mockUser = {
            username: "ivan",
            password: await bcrypt.hash("12345", 10),
            createJWT: jest.fn(() => mockCreateJWT())
        }

        User.findUser.mockResolvedValue(mockUser)

        await loginUser(req, res)

        expect(res.status).toHaveBeenCalledWith(400)
        expect(res.json).toHaveBeenCalledWith({ message: "Incorrect password" })
    })
})
