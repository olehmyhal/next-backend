import { buildFeedbackPath, extractFeedback } from "./feedback"

const handler = (req, res) => {
    const { feedbackId } = req.query

    const filePath = buildFeedbackPath()
    const data = extractFeedback(filePath)

    const selectedItem = data.find(item => item.id === feedbackId)

    res.status(200).json({ feedback: selectedItem })
}

export default handler