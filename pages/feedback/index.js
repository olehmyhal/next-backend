import { useState } from 'react'

import { buildFeedbackPath, extractFeedback } from "../api/feedback"

const FeedbackPage = (props) => {
    const [feedbackData, setFeedbackData] = useState()

    const loadFeedbackHandler = id => {
        fetch(`/api/${id}`)
            .then(res => res.json())
            .then(data => setFeedbackData(data.feedback))
    }

    return <>
        {feedbackData && feedbackData.email}
        <ul>
            {props.feedbackItems.map(item => (
                <li key={item.id}>
                    {item.text} <button onClick={() => loadFeedbackHandler(item.id)}>Show Details</button>
                </li>
            ))}
        </ul>
    </>
}

export async function getStaticProps(){
    const filePath = buildFeedbackPath()
    const data = extractFeedback(filePath)

    return {
        props: {
            feedbackItems: data
        }
    }
}

export default FeedbackPage