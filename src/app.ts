import express, { Application, Request, Response } from "express"
import cors from "cors"
import { StudentRoutes } from "./app/modules/student/student.route"
// const express = require('express')
const app: Application = express()
// const port = 3000


// parsers
app.use(express.json())
app.use(cors())

// application routes
app.use("/api/v1/students", StudentRoutes);

app.get('/', (req: Request, res: Response) => {
    const a = "hellow world";
  res.send(a)
})

export default app;