const mongoose = require("mongoose")
const supertest = require("supertest")
const app = require("../app")
const Blog = require("../models/blog")
const listhelper = require("../utils/list_helper")

const api = supertest(app)

beforeEach( async()=>{
    await Blog.deleteMany({})

    let blogObject = new Blog(listhelper.initialBlogs[0])
    await blogObject.save()

    blogObject = new Blog(listhelper.initialBlogs[1])
    await blogObject.save()
})

test("I can get the notes I want", async() =>{
    await api
        .get("/api/blogs")
        .expect(200)
        .expect('Content-Type', /application\/json/)
})

test("The unique identifier ID is defined right", async() =>{
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

test("making a POST request works fine", async()=>{

    
    const blogTest= {
        title:"ugamaga",
        author:"luli",
        url:"luizi.com",
        likes: 3
    }

     await api
        .post("/api/blogs")
        .send(blogTest)
        .expect(200)

    const blogsAtEnd = await listhelper.blogsInDB()
    expect(blogsAtEnd).toHaveLength(listhelper.initialBlogs.length+1)

    const content= blogsAtEnd.map(blog=>blog.title)
    expect(content).toContain("ugamaga")    
})

test("if like property is missing, then we add 0", async()=>{
    const blogTest= {
        title:"ugamaga",
        author:"luli",
        url:"luizi.com"
    }

    const response =await api
        .post("/api/blogs")
        .send(blogTest)
        .expect(200)

    console.log(response.body)
    expect(response.body.likes).toBeDefined()
})

test("if title or url is missing, then we get error 400", async()=>{
    const blogTest={
        title:"yolo",
        author:"lulilo",
        likes:5
    }

    await api
        .post("/api/blogs")
        .send(blogTest)
        .expect(400)       
})

test("deleting a blog works fine", async()=>{
    const blogsAtStart = await listhelper.blogsInDB()
    const blogToBeRemoved = blogsAtStart[0]
    await api
        .delete(`/api/blogs/${blogToBeRemoved.id}`)
        .expect(204)

    const blogsAtEnd = await listhelper.blogsInDB()
    expect(blogsAtEnd.length).toBe(blogsAtStart.length-1)
})

test("updating a blog works fine", async()=>{
    const blogsAtStart= await listhelper.blogsInDB()
    const blogToBeUpdated = blogsAtStart[0]

    const UpdatedBlog ={
        title:"SSJVEGETA",
        author:"luli",
        url:"luizi.com",
        likes: 3,
        id: blogToBeUpdated.id
    }

    const response = await api
        .put(`/api/blogs/${blogToBeUpdated.id}`)
        .send(UpdatedBlog)
    expect(response.body).toEqual(UpdatedBlog)
})

test("adding a user works good in testing", async()=>{
    const user ={
        name:"Fiorentino",
        username:"SSJVegeta",
        password:"highfive"
    }

    await api
        .post("/api/users")
        .send(user)
        .expect(200)
})

test("logging an user gives me the token I desire the most", async()=>{

    const userToLogin={
        username:"SSJVegeta",
        password:"highfive"
    }

    const tokenToGet= await api
        .post("/api/login")
        .send(userToLogin)
        .expect(200)
    console.log(tokenToGet.body)
})


test.only("Posting a blog with a token works good", async()=>{
    const token = "bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VybmFtZSI6IlNTSlZlZ2V0YSIsImlkIjoiNjA4OWIzYzRiYmEwMGIxYjE0ODk5MGM1IiwiaWF0IjoxNjE5NjM3Mzc0fQ.ZzPT8hxohgB-Bp0x3b1Nq1oclrwiUpn6wpOeubeDb6I"
    const blogToTest={
        title:"Im making this blog with a token in JEST",
        author:"SSJVegeta",
        url:"vanced.com"
    }

    await api
        .post("/api/blogs")
        .set("Authorization" , token)
        .send(blogToTest)
        .expect(200)

})
test("adding a blog with a user adds the blog to the user too", async()=>{
    const blog=
        {
            title:"user-blog-test",
            author:"williams",
            url: "google.com",
            likes:"5",
            user: "60886d9c2843551f688e4a10"
        }
    
    const response = await api
        .post("/api/blogs")
        .send(blog)
        .expect(200)
    

})


afterAll(()=> mongoose.connection.close())