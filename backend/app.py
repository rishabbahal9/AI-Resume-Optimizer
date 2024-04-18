from flask import Flask, render_template, request
from openai import OpenAI
from flask_cors import CORS, cross_origin
import json

client = OpenAI()

app = Flask(__name__)
CORS(app)


@app.route('/')
def index():
    return render_template('index.html')


@app.get("/working")
def get_working():
    return {"working": True}


@app.post("/optimize-resume")
def optimize_resume():
    request_data = request.get_json()
    completion = client.chat.completions.create(
        model="gpt-3.5-turbo",
        response_format={"type": "json_object"},
        messages=[
            {"role": "system", "content": "You are a professional resume writer. You have been given a job description and a resume. You need to optimize the resume for the job description."},
            {"role": "user", "content": """
            Job Description:
            """ + request_data['jobDescription']},
            {"role": "user", "content": """My Resume:""" +
                request_data['currentResume']},
            {"role": "user", "content": """
            Analyze the job description to identify key skills, qualifications, and experiences that are emphasized, and then modify the current resume to highlight these aspects, ensuring it is better tailored to pass through ATS filters.

The function should perform the following steps:

Extract Keywords: Use natural language processing to parse the job description and identify the most important words and phrases, such as required skills, qualifications, preferred experiences, and industry-specific terminology.
Analyze Resume: Check the current resume for the presence of these keywords and phrases. Evaluate which sections of the resume (e.g., summary, work experience, skills) already contain relevant terms and which are lacking.
Modify Resume: Update the resume to include missing keywords in a natural and contextually appropriate way. This might involve rewriting bullet points under job experiences, adding new skills, or adjusting the summary to reflect the terminology found in the job description.
Optimization Feedback: Optionally, the function could generate a brief report highlighting changes made and suggesting further improvements that could be made manually, such as structural changes or additional details that could strengthen the resume.
Return Updated Resume: Output the revised version of the resume as a string.
Include error handling to manage cases where input strings are empty or do not contain enough information to perform a meaningful analysis.
             
              Return the response in json format.
             Example response json format:
             {"optimizedResume": "Updated Resume text..."}
             """},
            {"role": "user", "content": request_data['customInstructions']},
        ]
    )
    return {"answer": json.loads(completion.choices[0].message.content)}


if __name__ == "__main__":
    app.run(host='localhost', debug=True)
