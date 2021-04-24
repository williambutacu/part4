const mongoose = require("mongoose")
const supertest = require("supertest")
const app = require("../app")

const api = supertest(app)

test("I can get the notes I want", async() =>{
    await api
        .get("/api/blogs")
        .expect(200)
        .expect('Content-Type', /application\/json/)
})

test.only("The unique identifier ID is defined right", async() =>{
    const blog = {
    title: "hallo",
    author: "NemTudom",
    url: "youtube.com",
    likes: 5
    }

    const awaitresponse = await api
        .post("/api/blogs")
        .send(blog)
        .expect(200)

    expect(awaitresponse.body.id).toBeDefined
        

    
})




afterAll(()=> mongoose.connection.close())