const uuid = require('uuid/v4')
const fs = require('fs')
const path = require('path')

class Course {
    constructor(title, price, img) {
        this.title = title
        this.price = price
        this.img = img
        this.id = uuid()
    }

    static writeToBase = (courses) => {
            return new Promise((resolve, reject) => {
            fs.writeFile(path.join(__dirname, '..', 'data', 'courses.json'), JSON.stringify(courses), (err) => {
                if (err) {
                    reject(err)
                } else {
                    resolve()
                }
                
            })
        })
        // .catch((error) => {
        //     console.log(`Save Error ${error}`)
        // })
    }

    static async update(course) {
        const courses = await Course.getAll()

        const idx = courses.findIndex(c => c.id === course.id)
        courses[idx] = course

        await Course.writeToBase(courses)
        .catch(e => {throw e})
       
    }

    async save() {
        const courses = await Course.getAll()
        courses.push(this.toJSON())
        console.log(courses)

        await Course.writeToBase(courses)
        
    }

    toJSON() {
        return {
            title: this.title,
            price: this.price,
            img: this.img,
            id: this.id
        }
    }



    static getAll() {
        return new Promise((resolve, reject) => {
            fs.readFile(path.join(__dirname, '..', 'data', 'courses.json'), 'utf-8', (err, content) => {
                if (err) {
                    reject(err)
                } else {
                    resolve(JSON.parse(content))
                }
               
    
            })
        }).catch(error => {
            console.log(`getAll error ${error}`)
        })
    }

    static async getById(id) {
        const courses = await Course.getAll()
        return courses.find(c => c.id === id)
    }
}

module.exports = Course