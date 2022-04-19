import fs from 'fs'
import path from 'path'

export const buildFeedbackPath = () => path.join(process.cwd(), 'data', 'feedback.json')

export const extractFeedback = path => {
    const fileData = fs.readFileSync(path)
    return JSON.parse(fileData)
}

const handler = (req, res) => {
    if(req.method === 'POST'){
        const { email, text } = req.body

        const newFeedback = {
            id: new Date().toISOString(),
            email,
            text
        }

        const filePath = buildFeedbackPath()
        const data = extractFeedback(filePath)
        data.push(newFeedback)
        fs.writeFileSync(filePath, JSON.stringify(data))
        res.status(201).json({ message: 'Success', feedback: newFeedback })
    } else {
        const filePath = buildFeedbackPath()
        const fileData = fs.readFileSync(filePath)
        const data = JSON.parse(fileData)
        res.status(201).json({ feedback: data })
    }
}

export default handler